"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {Eye, EyeOff} from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; email?: string; password?: string; general?: string } = {};

    if (isSignupMode && !name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        if (isSignupMode) {
          const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(newUserCredential.user, { displayName: name });
          router.push("/" + newUserCredential.user.uid);
        } else {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          router.push("/" + userCredential.user.uid);
        }
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
          setErrors({ general: "Invalid email or password. If you don't have an account, please sign up." });
        } else if (error.code === 'auth/email-already-in-use') {
          setErrors({ email: "Email already in use. Please log in." });
        } else {
          setErrors({ general: error.message });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full mx-auto md:grid grid-cols-2">

      {/* text child div */}
      <div className="p-5 sm:p-8 flex flex-col gap-6 sm:gap-10">

        {/* logo */}
        <div className="mx-auto mt-15">
          <Image
            src="/svgs/logo.svg"
            alt="logo"
            width={350}
            height={100}
          />
        </div>

        {/* account creation part */}
        <p className="text-quiz-dark-gray text-center">
          {isSignupMode ? (
            <>
              Create an account! <br />
              Please sign up to get started.
            </>
          ) : (
            <>
              Welcome back! <br />
              Please log in to your account.
            </>
          )}
        </p>

        {/* form */}
        <form onSubmit={handleSubmit}>

          {/* NAME (Signup part) */}
          {isSignupMode && (
            <div className="mb-6">
              <Input
                type="text"
                value={name}
                placeholder="Adunade"
                label="User Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  setErrors((prev) => ({ ...prev, name: undefined }));
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* email (login part)*/}
          <div>
            <Input
              type="email"
              value={email}
              placeholder="adunade@gmail.com"
              label="Email address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD PART */}
          <div className="relative mt-4">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              label="Password"
              placeholder="********"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
              }}
            />

            {/* toggle eyeon/eyeoff icon */}
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-6 cursor-pointer "
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {errors.general && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {errors.general}
            </div>
          )}

          {/* signup/login buttons */}
          <div className="flex gap-12 mt-10">
            <Button type="submit" variant="primary" isLoading={isLoading}>
              {isSignupMode ? "Sign Up" : "Login"}
            </Button>

            <Button 
              variant="secondary" 
              type="button" 
              onClick={() => {
                setIsSignupMode(!isSignupMode);
                setErrors({});
              }}
              disabled={isLoading}
            >
              {isSignupMode ? "Login" : "Sign Up"}
            </Button>
          </div>
        </form>
      </div>

      {/* image child div */}
      <div className="items-center justify-center p-15 hidden md:grid w-full bg-miniground">
        <Image
          src="/svgs/Graduationcap.svg"
          alt="graduationcap image"
          width={400}
          height={300}
        />
      </div>
    </div>
  );
}