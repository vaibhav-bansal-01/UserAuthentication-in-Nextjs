import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/helpers/mailer";

connectToDatabase();

export async function POST(request: any) {
  try {
    console.log("Forgot password request");
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log("email:", email);
    const user = await User.findOne({ email });
    console.log("user:", user);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 },
      );
    }
    await sendEmail({
      email,
      emailType: "FORGOT_PASSWORD",
      userId: user._id,
    });
    return NextResponse.json({
      message: "Password reset email sent successfully",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
