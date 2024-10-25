// /app/api/user/route.js

import Notes from "@/models/notes";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const data = await Notes.find();

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
  const data = await req.json();
  const { title, content } = data;

  console.log("Received data:", title, content);

  try {
    await connectToDB();

    // Create a new note document
    const newNote = await Notes.create({ title, content });

    return NextResponse.json(
      { message: "Successfully created", note: newNote },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error creating note:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else {
      console.error("Unexpected error:", String(err));
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { id } = await req.json(); // Expecting the ID to be sent in the request body

    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note successfully deleted" },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error deleting note:", err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    } else {
      console.error("Unexpected error:", String(err));
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}

// Optionally, you can add a method handler for unsupported methods
// export async function METHOD_NOT_ALLOWED() {
//   return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
//     status: 405,
//   });
// }
