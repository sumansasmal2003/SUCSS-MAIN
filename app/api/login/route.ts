import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    // 1. Find Member
    // Note: in a real app, use bcrypt to compare hashed passwords!
    const member = await Member.findOne({ username });

    if (!member) {
      return NextResponse.json({ success: false, error: "Invalid username" }, { status: 401 });
    }

    // 2. Check Password
    if (member.password !== password) {
      return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
    }

    // 3. Check Status (Only Approved members can login)
    if (member.status !== "Approved") {
      return NextResponse.json({ success: false, error: "Account not active" }, { status: 403 });
    }

    // 4. Set Session Cookie (Expires in 7 days)
    (await cookies()).set('member_id', member._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
