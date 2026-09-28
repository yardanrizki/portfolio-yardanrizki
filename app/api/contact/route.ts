import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const subject =
      typeof body.subject === "string" ? body.subject.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const page = typeof body.page === "string" ? body.page.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        page: page || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: contactMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 }
    );
  }
}