import { NextResponse } from "next/server";
import db from "@/lib/db";
import Message from "@/models/message.model";
import Chat from "@/models/chat.model";
import { GoogleGenAI } from "@google/genai";

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

    const previousMessages = await Message.find({ chatId }).sort({ createdAt: 1 });

    const conversation = [
      ...previousMessages.map((msg: any) => [
        { role: "user", parts: [{ text: msg.message }] },
        { role: "model", parts: [{ text: msg.reply }] },
      ]).flat(),
      { role: "user", parts: [{ text: message }] },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: conversation,
    });

    const reply = await result.text;

    const newMessage = await Message.create({
      message,
      userId,
      chatId,
      reply,
    });

    return NextResponse.json(
      {
        message: "Message created successfully",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
