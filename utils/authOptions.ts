import connectDB from "@/config/database";
import User, { UserType } from "@/models/User";
import type { Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface ProfileExtended extends Profile {
  picture: string;
  name: string;
}

export interface SessionExtended extends Session {
  user: Session["user"] & { id: string };
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoke on successful sign in
    async signIn({ profile }: { profile: ProfileExtended }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile?.email });
      if (!userExists) {
        // truncate user name if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile?.picture,
        });
      }
      return true;
    },

    // Modifies the session object so we can incorporate the user id to the session
    async session({ session }: { session: SessionExtended }) {
      const user = await User.findOne<UserType>({
        email: session.user?.email,
      });
      console.log("user?._id", user?._id);
      session.user.id = user?._id.toString() ?? "";
      return session;
    },
  },
};
