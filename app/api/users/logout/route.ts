import { NextResponse } from "next/server";

export async function GET(request: any) {
  try {
    const response = await NextResponse.json({
      message: "User logged out successfully",
      success: true,
      status: 200,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
