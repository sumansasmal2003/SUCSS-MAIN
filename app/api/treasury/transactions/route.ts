import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Member from '@/models/Member';
import { cookies } from 'next/headers';

// Helper: Verify Treasurer Access
async function checkTreasurerAccess() {
  const cookieStore = await cookies();
  const memberId = cookieStore.get('member_id')?.value;
  if (!memberId) return null;

  await dbConnect();
  const member = await Member.findById(memberId);

  // Only Treasurer (and maybe President) allowed
  if (member && ["Treasurer", "President"].includes(member.designation)) {
    return member;
  }
  return null;
}

// GET: Fetch all transactions (Ledger)
export async function GET() {
  try {
    const user = await checkTreasurerAccess();
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    // Sort by date descending (Newest first)
    const transactions = await Transaction.find({}).sort({ date: -1, createdAt: -1 });
    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Fetch failed" }, { status: 500 });
  }
}

// POST: Add new transaction
export async function POST(req: Request) {
  try {
    const user = await checkTreasurerAccess();
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    const body = await req.json();

    const transaction = await Transaction.create({
      ...body,
      recordedBy: user.fullName // Audit trail
    });

    return NextResponse.json({ success: true, data: transaction });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Transaction failed" }, { status: 500 });
  }
}

// DELETE: Remove transaction (Optional safety feature)
export async function DELETE(req: Request) {
  try {
    const user = await checkTreasurerAccess();
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });

    const { id } = await req.json();
    await Transaction.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
