import bcrypt from "bcryptjs";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
import { users } from "@/lib/database/model/user";
import { NextResponse } from "next/server";
import dbConnection from "@/lib/database/connectDB";

const saltRounds = 10;
const secretkey = process.env.SECRET_KEY;
export async function POST(req) {
  const { email, password } = await req.json();

  try {
    await dbConnection();

    const result = await users.findOne({ email: email });
    console.log("this is existing email", result);
    const storedHashedPassword = result.password;
    console.log("storesHashedPassword", storedHashedPassword);
    const isAuth = await bcrypt.compare(password, storedHashedPassword);
    console.log("password is found", isAuth);
    if (isAuth) {
      const token = jwt.sign({ userEmail: result.email }, secretkey, {
        expiresIn: "2h",
      });
      const response = NextResponse.json({ msg: "Login successful" });

      // Set the cookie in the response
      response.cookies.set("authToken", token);
      return response;
    }
  } catch (error) {
    console.log("error in connecting db", error);
    return NextResponse.json({ msg: "error in connecting with db" });
  }
}
