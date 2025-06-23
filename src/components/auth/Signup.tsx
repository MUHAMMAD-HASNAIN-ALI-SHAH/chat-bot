"use client";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      toast.success("Signup successful! Please login.");
      router.push("/signin");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setEmail(e.target.value)
        }
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setPassword(e.target.value)
        }
        required
      />
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
