import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const values = [
  {
    title: "Learn with clarity",
    description:
      "We design quizzes that focus on understanding, not just memorizing answers.",
  },
  {
    title: "Practice with confidence",
    description:
      "Timed sessions and instant feedback help students feel ready before exam day.",
  },
  {
    title: "Keep it simple",
    description:
      "A clean, distraction-free experience makes it easier to stay focused and consistent.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-4xl mx-auto px-5 py-14 space-y-14">
        <section className="text-center max-w-2xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl font-bold text-quiz-yellow leading-tight">
            Building smarter learners, one quiz at a time
          </h1>
          <p className="text-quiz-dark-gray leading-relaxed">
            Quiz with Adun is built to help students prepare better with focused
            practice, clear questions, and instant feedback. Our goal is to make
            learning feel structured, engaging, and achievable every day.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-5">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {value.title}
              </h2>
              <p className="text-sm text-quiz-dark-gray leading-relaxed">
                {value.description}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl bg-quiz-light-gray p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Why we exist</h2>
          <p className="text-quiz-dark-gray max-w-2xl mx-auto leading-relaxed">
            Many students want to practice but struggle to find a simple platform
            that feels like real exam preparation. Quiz with Adun closes that gap
            with topic-based quizzes, timed sessions,progress-focused
            learning, and is also free you don’t need to pay any money to use this platform.
          </p>
          <Link
            href="/login"
            className="inline-block mt-2 px-6 py-3 rounded-full bg-quiz-yellow text-black font-semibold hover:opacity-90 transition"
          >
            Start Practicing
          </Link>
        </section>
      </main>
    </div>
  );
}
