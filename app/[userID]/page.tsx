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

  const resolvedParams = use(params);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); 
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
    return null; 
  }

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
      <main className="mx-auto max-w-4xl px-4 sm:px-10 py-6 sm:py-10 mt-4 sm:mt-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          Welcome, {user.displayName || user.email?.split("@")[0]}
        </h1>
        <p className="text-quiz-dark-gray text-sm sm:text-base">
          This is your dashboard. Click on the choose subject button to choose
          your subjects and start your quiz.
        </p>

        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-quiz-light-gray rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Your Quizzes</h2>
            <p className="text-quiz-dark-gray text-sm sm:text-base">
              You haven't chosen any subject or started any quizzes yet.
            </p>
          </div>
          <div className="flex items-center">

            {/* choose subject button */}
            <Button 
               variant="primary"
               onClick={() => setShowStartTask(true)}
            >
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
