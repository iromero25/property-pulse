"use client";

import { PropertySchemaType } from "@/models/Property";
import { SessionExtended } from "@/utils/authOptions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

interface BookmarkButtonProps {
  property: PropertySchemaType;
}

export default function BookmarkButton({ property }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();
  const extendedSession = session as SessionExtended;

  // console.log("session", session);
  // console.log("user", userData);

  // this may be done at the parent component, and we can sent de user as prop
  useEffect(() => {
    if (!extendedSession?.user?.id) {
      setLoading(false);
      return;
    }

    // ckeck the user's bookmark when the component is mounted
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [extendedSession?.user?.id, property._id]);

  const handleClick = async () => {
    if (!extendedSession?.user?.id) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      disabled={loading}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      disabled={loading}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
}
