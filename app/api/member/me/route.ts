import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const memberId = cookieStore.get('member_id')?.value;

    if (!memberId) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const member = await Member.findById(memberId).select('-password'); // Exclude password

    if (!member) {
      return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: member });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}
