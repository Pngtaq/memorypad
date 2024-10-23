// /app/api/user/route.js
import User from "@/models/notes";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const data = await User.find();

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(String(err));
    }
  }
}

export async function POST(req: Request) {
  const { email, username, password } = await req.json();

  try {
    await connectToDB();
    console.log(email, username, password);
    return NextResponse.json(
      { message: "Successfully created" },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(String(err));
    }
  }
}
