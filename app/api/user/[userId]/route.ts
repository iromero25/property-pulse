import User from "@/models/User";
import connectDB from "@/config/database";

// GET /api/user/:userId
export const GET = async (
  _request: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const user = await User.findById(userId);

    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
