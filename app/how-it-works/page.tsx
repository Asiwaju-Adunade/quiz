
"use client";
import Navbar from "@/components/ui/navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-10 py-6 sm:py-10 space-y-6">
        
        {/* Title */}
        <h1 className="font-bold text-2xl sm:text-3xl mt-3 sm:mt-5 text-center text-quiz-yellow">
          How It Works
        </h1>

        <p className="text-quiz-dark-gray text-center text-base sm:text-lg">
          Learn how our quiz platform works step by step.
        </p>

        {/* Steps */}
        <div className="space-y-4 text-sm sm:text-lg text-gray-800">

          <p>
            1. Click on the <span className="font-semibold">“Start Solving”</span> or{" "}
            <span className="font-semibold">“Login”</span> button to begin.
          </p>

          <p>
            2. You will be taken to a page where you can enter your{" "}
            <span className="font-semibold">email</span> and{" "}
            <span className="font-semibold">password</span>.
          </p>

          <p>
            3. If you are a new user, click on{" "}
            <span className="font-semibold">“Sign Up”</span> and provide your{" "}
            username, email, and password.
          </p>

          <p>
            4. If you already have an account, simply log in using your email and
            password.
          </p>

          <p>
            5. After logging in, you will be redirected to the quiz dashboard.
            Click on{" "}
            <span className="font-semibold">“Choose Subject”</span>, select your
            preferred topics, and then click{" "}
            <span className="font-semibold">“Start Quiz”</span>.
          </p>

          <p>
            6. You will see quiz questions with multiple-choice options. Select
            the option you believe is correct. You have 30 seconds to answer each question.
          </p>

          <p>
            7. Use the navigation buttons:
            <br />
            • <span className="font-semibold">Previous</span> — go back to the previous question
            <br />
            • <span className="font-semibold">Skip</span> — skip a question if you’re unsure and did not know the answer
            <br />
            • <span className="font-semibold">Next</span> — move to the next question after selecting an answer
            <br />
            • <span className="font-semibold">Submit</span> — finish the quiz and view your score
          </p>

          <p>
            8. Once you submit, your score will be displayed at the end of the quiz.
          </p>

        </div>
      </div>
    </>
  );
}
