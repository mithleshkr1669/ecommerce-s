"use client";
import Link from "next/link";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

export default function signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const token = Cookies.get("authToken");
    console.log("this is token on client side", token);
    if (token) {
      router.push("/");
    }
  }, []);

  // useAppSelector((state: RootState) => console.log("app selector task", state.task))

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", formData, {
        withCredentials: true,
      });
      console.log("response", response.data.data); // Access the data property from the response
      const token = Cookies.get("authToken");
      console.log("this is token on client side", token);
      if (token) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  return (
    <main className="">
      <form
        onSubmit={handleSubmit}
        className="flex min-h-screen flex-col items-center justify-center"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Welcome to <span className="text-green-800">Store</span>!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  onChange={handleChange}
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  onChange={handleChange}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  onChange={handleChange}
                  name="password"
                  id="password"
                  placeholder="password"
                  type="password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-b from-green-300 to-green-700"
              >
                Sign up
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
