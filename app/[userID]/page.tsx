"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { use } from "react";
import Button from "@/components/ui/button";
import StartTask from "@/app/starttask/page";

export default function UserDashboard({
  params,
}: {
  params: Promise<{ userID: string }>;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showStartTask, setShowStartTask] = useState(false);

  // Unwrap the params Promise (Next.js 15 recommendation)
  const resolvedParams = use(params);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // enforce authentication
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // will redirect in useEffect
  }

  // Optionally verify that the user ID in the url matches the authenticated user
  if (user.uid !== resolvedParams.userID) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unauthorized: You can only view your own dashboard.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl p-10 mt-10">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user.displayName || user.email?.split("@")[0]}!
        </h1>
        <h1 className="text-quiz-dark-gray">
          This is your dashboard. Click on the choose subject button to choose
          your subjects and start your quiz.
        </h1>

        {/* Further content can go here */}
        <div className="mt-8 p-6 bg-quiz-light-gray rounded-lg shadow-sm border md:flex justify-between border-gray-100">
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Quizzes</h2>
            <p className="text-quiz-dark-gray mb-3 ">
              You haven't choosen any subject or started any quizzes yet.
            </p>
          </div>
          <div className="flex items-center">
            <Button variant="primary" onClick={() => setShowStartTask(true)}>
              Choose Subject
            </Button>
          </div>
        </div>
      </main>

      {showStartTask && (
        <div className="overflow-hidden relative">
          <StartTask onClose={() => setShowStartTask(false)} />
        </div>
      )}
    </>
  );
}
