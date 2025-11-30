import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notice from '@/models/Notice';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

// Helper: Check if user is authorized (President or Secretary)
async function checkPermission() {
  const cookieStore = await cookies();
  const memberId = cookieStore.get('member_id')?.value;
  if (!memberId) return null;

  await dbConnect();
  const member = await Member.findById(memberId);

  if (member && ["President", "Secretary"].includes(member.designation)) {
    return member;
  }
  return null;
}

// GET: Fetch all notices (Public)
export async function GET() {
  try {
    await dbConnect();
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notices });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch notices" }, { status: 500 });
  }
}

// POST: Create a Notice (Protected)
export async function POST(req: Request) {
  try {
    const admin = await checkPermission();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 403 });
    }

    const body = await req.json();
    const notice = await Notice.create({
      ...body,
      postedBy: admin.fullName,
      designation: admin.designation
    });

    return NextResponse.json({ success: true, data: notice });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create notice" }, { status: 500 });
  }
}

// PUT: Edit Notice (Protected)
export async function PUT(req: Request) {
  try {
    const admin = await checkPermission();
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    const { id, title, content, isImportant } = await req.json();
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, content, isImportant },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedNotice });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}

// DELETE: Delete Notice (Protected)
export async function DELETE(req: Request) {
  try {
    const admin = await checkPermission();
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    const { id } = await req.json();
    await Notice.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
