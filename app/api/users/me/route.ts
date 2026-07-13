import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 400 });
        }
        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            status: 200,
            user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
