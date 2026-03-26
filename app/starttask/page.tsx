"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

const ALL_TOPICS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "Literature",
  "Agricultural Science",
  "Health Education",
  "Home Economics",
  "Civic Education",
];

interface PageProps {
  onClose?: () => void;
  searchParams?: any;
  params?: any;
}

export default function Page({ onClose }: PageProps) {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      // setSelectedTopics(selectedTopics.filter((t) => t !== topic));
       setSelectedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic])
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  return (
    <div className="relative px-10 mx-auto">
      {/* Page Close Button */}
      <button
        onClick={() => onClose ? onClose() : router.back()}
        className="absolute top-6 right-6 p-3 cursor-pointer"
      >
        <X className="w-8 h-8 text-quiz-dark-gray" />
      </button>

      <div className="mt-8">
        <h1 className="font-bold text-5xl text-center mb-5 ">
           Choose your favorite topic
        </h1>
        <p className="text-quiz-dark-gray text-center mb-10 text-lg">
          Select more than 5 topics to start quiz ({selectedTopics.length}{" "}
          selected)
        </p>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
          {ALL_TOPICS.map((topic) => {
            const isSelected = selectedTopics.includes(topic);

            return (
              <div
                key={topic}
                className={`cursor-pointer overflow-hidden flex flex-row items-stretch 
                    ${isSelected ? "bg-quiz-yellow" : "bg-quiz-light-gray"}
                `}
                onClick={() => {
                  if (!isSelected) toggleTopic(topic);
                }}
              >
                {/* Left Side (Topic Label) */}
                <div
                  className={`flex flex-col items-center justify-center py-[10px] px-[25px] ${isSelected ? "w-[80%]" : "w-full"}`}
                >
                  <span
                    className={`font-semibold text-center text-lg ${isSelected ? "text-black" : "text-quiz-dark-gray"}`}
                  >
                    {topic}
                  </span>
                </div>

                {/* Right Side (Close Button Edge) */}
                {isSelected && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopic(topic);
                    }}
                    className="w-[20%] min-w-[40px] flex flex-col items-center justify-center bg-black cursor-pointer"
                    aria-label={`Remove ${topic}`}
                    title="Remove topic"
                  >
                    <X className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end my-15">
        <Button
             variant="primary"
             label="Start Quiz"
        />
      </div>
    </div>
  );
}
