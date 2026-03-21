"use client"
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Image from "next/image";
import Button from "@/components/ui/button";


export default function Page() {
  return (
    <>
    <Navbar/>
    <main >
       {/* parent div */}
      <div className="md:flex mx-auto max-w-4xl p-2 gap-20 my-10">
        {/* Child div text part */}
        <div className="space-y-8 px-10 py-8">
           <h1 className="text-4xl font-bold leading-13 text-foreground"> Learn <br /> new concepts<br/> for each question </h1>
           <p className="text-quiz-dark-gray"> | We help you to prepare for exam and quizes</p>
             
           {/* button and text flex part */}
          <div className="flex gap-10 mt-8">
          <Button variant="primary">
           <Link href="/login" > start solving</Link>
          </Button>
          
           <Link href="/" className="text-quiz-yellow flex items-center"> know more </Link>
           
          </div>
        </div>

         {/* image part */}
        <div className=" flex justify-center px-5  mt-15 items-center">
          <Image
             src="/svgs/pic.svg"
             alt="Picture"
             width={400}
             height={300}
          />
        </div>
      </div>
    </main>
    </>
  );
}
