import { NextResponse } from "next/server";
import db from "@/utils/db";
import Chat from "@/models/chat.model";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY! });

export async function POST(req: Request) {
  await db();

  try {
    const userId = req.headers.get("userId");
    const { message } = await req.json();

    if (!userId) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Given the message: "${message}", generate a suitable chat name consisting of only 2 or 3 words. Respond with a single chat name only. Do not include any explanation, formatting, or additional suggestions.`,
    });

    const createChat = await Chat.create({
      userId: userId,
      chatName: response.text,
    });

    return NextResponse.json(
      {
        message: "Message created successfully",
        chat: createChat,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await db();

  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const getChat = await Chat.find({ userId }).sort({
      createdAt: -1,
    });
    if (!getChat) {
      return NextResponse.json({ chats: [] }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Message created successfully",
        chats: getChat,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
