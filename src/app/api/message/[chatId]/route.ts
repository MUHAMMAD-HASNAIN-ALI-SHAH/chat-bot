import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Message from "@/models/message.model";
import Chat from "@/models/chat.model";

export async function GET(
  req: NextRequest,
  context: { params: { chatId: string } }
) {
  await db();
  try {
    const userId = req.headers.get("userId");

    if (!userId) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const chatId = context.params.chatId;

    const getChat = await Chat.findById(chatId);
    if (!getChat) {
      return NextResponse.json({ msg: "Chat not found" }, { status: 404 });
    }

    if (getChat.userId.toString() !== userId.toString()) {
      return NextResponse.json(
        { msg: "You are not authorized to access this chat" },
        { status: 403 }
      );
    }

    let messages = await Message.find({ chatId: getChat._id }).sort({
      createdAt: 1,
    });

    return NextResponse.json(messages ?? [], { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error getting record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
