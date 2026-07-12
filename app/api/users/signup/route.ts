import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("username:", username);
    console.log("email:", email);
    console.log("password:", password);
    const user = await User.findOne({ email });
    console.log("user:", user);
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const salt = await bcrypt.genSalt(10);
    // A salt is a random string added to a password before hashing. It is used to prevent attackers from using pre-computed rainbow tables to crack passwords.
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      savedUser,
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
