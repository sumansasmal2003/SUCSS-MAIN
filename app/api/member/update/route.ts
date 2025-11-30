import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

export async function PUT(req: Request) {
  try {
    await dbConnect();

    // 1. Verify Authentication
    const cookieStore = await cookies();
    const memberId = cookieStore.get('member_id')?.value;

    if (!memberId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName, guardianName, username, phone,
      address, bloodGroup, dob
    } = body;

    // 2. Validate Username Uniqueness
    // Only check if the username is actually being changed
    const currentUser = await Member.findById(memberId);
    if (!currentUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (username && username !== currentUser.username) {
      const existingUser = await Member.findOne({ username });
      if (existingUser) {
        return NextResponse.json({ success: false, error: "Username is already taken" }, { status: 400 });
      }
    }

    // 3. Update Allowed Fields (Excluding Email)
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      {
        fullName,
        guardianName,
        username,
        phone,
        address,
        bloodGroup,
        dob
      },
      { new: true } // Return the updated document
    ).select('-password'); // Don't return the password

    return NextResponse.json({ success: true, data: updatedMember });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
