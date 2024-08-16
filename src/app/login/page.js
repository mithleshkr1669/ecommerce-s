"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const router = useRouter();
  useEffect(() => {
    // Fetch the JWT token from the cookie
    const token = Cookies.get("authToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e) {
    // isAuth()
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData, {
        withCredentials: true,
      });
      console.log("Finally responsing", response.data.msg); // Access the data property from the response
        // localStorage.setItem("isLoggedin", "yes")
        const token = Cookies.get("authToken");
        console.log("this is token on client side", token);
        if (token) {
          router.push("/");
        }
      
    } catch (error) {
      console.error("Error in logging:", error);
    }
  }

  return (
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
                name="email"
                id="email"
                type="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="grid gap-2">
              {/* <div className="flex items-center">
            </div> */}
              <Input
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                placeholder="password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-b from-green-300 to-green-700"
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account? Create a{" "}
            <Link href="/signup" className="text-blue-600">
              new account
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
