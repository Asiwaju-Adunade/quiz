"use client";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

const features = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#FCC822" strokeWidth="1.8" />
                <path
                    d="M8 12l3 3 5-5"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        title: "Topic-Based Quizzes",
        description:
            "Choose from a wide range of subjects — from Mathematics and Science to History and Current Affairs. Every quiz is tailored to the topics you care about most.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
        title: "Live Countdown Timer",
        description:
            "Race against the clock with a built-in countdown for every quiz session. The pressure keeps you sharp — just like a real exam environment.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="3"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                />
                <path
                    d="M8 12h8M8 8h5M8 16h3"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
        title: "Instant Score Results",
        description:
            "See your performance the moment you finish. A detailed score card appears with your results so you can track how well you're progressing.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke="#FCC822" strokeWidth="1.8" />
                <path
                    d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
        title: "Secure Authentication",
        description:
            "Your account is protected with secure login and password recovery. Only you have access to your quiz history and progress — always safe, always private.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 12l2 2 4-4"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        title: "Adaptive Question Flow",
        description:
            "Navigate freely between questions. Skip tricky ones, revisit previous answers, and submit when you're confident — all at your own pace.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect
                    x="5"
                    y="2"
                    width="14"
                    height="20"
                    rx="2"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                />
                <path
                    d="M9 7h6M9 11h6M9 15h4"
                    stroke="#FCC822"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
            </svg>
        ),
        title: "Mobile Friendly",
        description:
            "Whether you're on a phone, tablet, or desktop, QuizWithJeff adapts perfectly to your screen — quizzing on the go has never been easier.",
    },
];

const stats = [
    { value: "15+", label: "Quiz Topics" },
    { value: "100%", label: "Free to Use" },
    { value: "Real-Time", label: "Live Questions" },
    { value: "Instant", label: "Score Feedback" },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen">

            <Navbar />
            {/* Hero Section*/}
            <section className="max-w-4xl mx-auto pt-16 pb-10 text-center">
                <span className="text-3xl font-bold text-quiz-yellow mb-10">
                    Why Quiz with Adun
                </span>
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-900  my-5">
                    Everything you need to{" "}
                    <span className="text-quiz-yellow">ace your exams</span>
                </h1>
                <p className="text-quiz-dark-gray text-lg max-w-xl mx-auto leading-relaxed">
                    A smarter way to prepare. Quiz with Adun gives you the tools, topics,
                    and timed environment to build real confidence before exam day.
                </p>
            </section>

            {/* Stats Strip */}
            <section className="max-w-4xl mx-auto px-5 mb-14">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center justify-center bg-quiz-light-gray rounded-2xl py-6 px-4"
                        >
                            <span className="text-3xl font-extrabold text-quiz-yellow">
                                {s.value}
                            </span>
                            <span className="text-sm text-quiz-dark-gray mt-1 font-medium">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feature Cards */}
            <section className="max-w-4xl mx-auto px-5 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="group border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-[#FCC822]/40 transition-all duration-300"
                        >
                            {/* Icon badge */}
                            <div className="w-12 h-12 rounded-xl bg-[#FCC82215] flex items-center justify-center mb-5 group-hover:bg-[#FCC82230] transition-colors duration-300">
                                {f.icon}
                            </div>

                            <h3 className="text-base font-bold text-gray-900 mb-2">
                                {f.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-quiz-yellow py-16">
                <div className="max-w-2xl mx-auto px-5 text-center">
                    <h2 className="text-3xl font-extrabold text-black mb-3">
                        Ready to start quizzing?
                    </h2>
                    <p className="text-black/70 mb-8 leading-relaxed">
                        Join thousands of students using quiz with Adun to practice smarter,
                        not harder. It's free, fast, and built for you.
                    </p>

                    <div className="border-2 border-white font-bold text-xl p-5  text-white! hover:bg-yellow-300 duration-300 rounded-full w-fit mx-auto">
                        <Link
                            href="/login">Get Started — It's Free
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
