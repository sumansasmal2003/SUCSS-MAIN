import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

// Helper: Check Permission
async function checkPermission() {
  const cookieStore = await cookies();
  const memberId = cookieStore.get('member_id')?.value;
  if (!memberId) return false;
  await dbConnect();
  const member = await Member.findById(memberId);
  return member && ["President", "Secretary"].includes(member.designation);
}

// GET: Public
export async function GET() {
  await dbConnect();
  const events = await Event.find({}).sort({ date: 1 }); // Sorted by date
  return NextResponse.json({ success: true, data: events });
}

// POST: Create Event (Protected)
export async function POST(req: Request) {
  if (!await checkPermission()) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

  try {
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Creation failed" }, { status: 500 });
  }
}

// PUT: Edit Event (Protected)
export async function PUT(req: Request) {
  if (!await checkPermission()) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

  try {
    const body = await req.json();
    const { _id, ...updateData } = body;
    const updatedEvent = await Event.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}

// DELETE: Remove Event (Protected)
export async function DELETE(req: Request) {
  if (!await checkPermission()) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

  try {
    const { id } = await req.json();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
