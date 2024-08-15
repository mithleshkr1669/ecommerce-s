import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import { users } from "@/lib/database/model/user";
import { NextResponse } from "next/server";
import dbConnection from "@/lib/database/connectDB";
import { disconnectDB } from "@/lib/database/connectDB";

const saltRounds = 10;
const secretkey = process.env.SECRET_KEY;
export async function POST(req = Request) {
  try {
    await dbConnection();
    const { fullName, email, password } = await req.json();
    console.log("mongodb is connected successfully");
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await users.create({
      FullName: fullName,
      email: email,
      password: hashedPassword,
    });
    // console.log("this is user", user);
    const userEmail = await users.findOne({ email: email });

    console.log("try to get user email:", userEmail.email);
    const token = jwt.sign({ userEmail: userEmail.email }, secretkey, {
      expiresIn: "2h",
    });
    const response = NextResponse.json({ msg: "Login successful" });

    // Set the cookie in the response
    response.cookies.set("authToken", token);
    return response;
  } catch (error) {
    console.log("error in connecting db", error);
    return NextResponse.json({ msg: "error in connecting with db" });
  }
}
