import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const applicationData = {
      ...body,
      designation: "Member", // <--- Enforce this
      status: "Pending"
    };

    // 1. Save to MongoDB
    const newMember = await Member.create(applicationData);

    // 2. Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Send Notification to Admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Member Application: ${body.fullName}`,
      text: `
        Name: ${body.fullName}
        Phone: ${body.phone}
        Address: ${body.address}
        Blood Group: ${body.bloodGroup}

        Login to dashboard to approve.
      `,
    });

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 });
  }
}
