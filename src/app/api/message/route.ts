import { NextResponse } from "next/server";
import db from "@/utils/db";
import Message from "@/models/message.model";
import { GoogleGenAI } from "@google/genai";
import Chat from "@/models/chat.model";
const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY! });

export async function POST(req: Request) {
  await db();

  let { message, userId, chatId } = await req.json();

  try {
    const checkChat = await Chat.findById(chatId);
    if (!checkChat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    chatId = checkChat._id;
    checkChat.totalChats += 1;

    await checkChat.save();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    });

    const newMessage = await Message.create({
      message,
      userId,
      chatId,
      reply: response.text,
    });

    return NextResponse.json(
      {
        message: "Message created successfully",
        data: newMessage,
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
