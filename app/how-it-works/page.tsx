import Navbar from "@/components/ui/navbar";
export default function Page() {
    return (
    <>
    <Navbar />
        <div className=" ml-10 max-w-5xl p-10 space-y-5">
            <h1 className="font-bold text-3xl mt-5 text-center text-quiz-yellow">How it works</h1>
            <h1 className="text-quiz-dark-gray text-center text-xl">Learn how our quiz platform works</h1>
            <h1 className=" text-lg"> You click on the start sloving button or the login button to login or signup.</h1>
            <h1 className=" text-lg"> After which it will take you to a page where you input your email and password. </h1>
            <h1 className=" text-lg"> If you are a new user you click on the sign up button, and you will be requested to input your name, email and password.</h1>
            <h1 className=" text-lg"> But if you are an existing user you click on the login button, then you input your email address and password. </h1>
            <h1 className=" text-lg"> After which it will take you to a page where you can start your quiz. Then you click on the choose subject button, after clicking on the choose subject button, you are to select the subjects you want to take your quiz on then click on start quiz button to start your quiz. </h1>
        </div>
    </>
    );
}