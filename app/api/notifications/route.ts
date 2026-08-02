import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/notification";

// ======================================
// GET NOTIFICATIONS
// ======================================

export async function GET() {
  try {
    await connectDB();

    const notifications = await Notification.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        notifications: [],
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================
// CREATE NOTIFICATION
// ======================================

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const notification =
      await Notification.create({
        type: body.type,
        title: body.title,
        message: body.message,
        read: false,
      });

    return NextResponse.json({
      success: true,
      notification,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create notification",
      },
      {
        status: 500,
      }
    );
  }
}