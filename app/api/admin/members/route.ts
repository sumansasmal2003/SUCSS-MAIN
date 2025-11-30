import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import nodemailer from 'nodemailer';
import { getApprovalEmail, getRejectionEmail } from '@/lib/emailTemplates';

// Helper: Password Generator
function generatePassword(name: string, dob: Date) {
  const firstName = name.trim().split(' ')[0];
  const firstLetter = firstName.charAt(0).toUpperCase();
  const year = new Date(dob).getFullYear();

  const chars = "abcdefghijklmnopqrstuvwxyz";
  const specialChars = "!@#$%&";

  let randomLetters = "";
  for (let i = 0; i < 3; i++) {
    randomLetters += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const randomSpecial = specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  // Format: NameFirstLetter + Year + 3Random + Special
  // Example: R1998abc#
  return `${firstLetter}${year}${randomLetters}${randomSpecial}`;
}

export async function GET() {
  await dbConnect();
  const members = await Member.find({}).sort({ status: 1, createdAt: -1 });
  return NextResponse.json({ success: true, data: members });
}

export async function PUT(req: Request) {
  await dbConnect();
  const { id, status } = await req.json();

  try {
    const member = await Member.findById(id);
    if (!member) return NextResponse.json({ success: false, error: "Member not found" }, { status: 404 });

    // Setup Email Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let updateData: any = { status };

    // --- LOGIC FOR APPROVAL ---
    if (status === "Approved" && member.status !== "Approved") {
      // 1. Generate Credentials
      const rawPassword = generatePassword(member.fullName, member.dob);
      // Generate Username: Firstname + last 4 digits of phone
      const username = `${member.fullName.split(' ')[0].toLowerCase()}${member.phone.slice(-4)}`;

      // 2. Update Data to Save
      updateData.username = username;
      updateData.password = rawPassword; // Note: In production, hash this before saving!

      // 3. Send Email
      if (member.email) {
        await transporter.sendMail({
          from: `"SUCSS Admin" <${process.env.EMAIL_USER}>`,
          to: member.email,
          subject: "Welcome to SUCSS - Membership Approved",
          html: getApprovalEmail(member.fullName, username, rawPassword),
        });
      }
    }

    // --- LOGIC FOR REJECTION ---
    else if (status === "Rejected") {
      if (member.email) {
        await transporter.sendMail({
          from: `"SUCSS Admin" <${process.env.EMAIL_USER}>`,
          to: member.email,
          subject: "Update on your SUCSS Membership Application",
          html: getRejectionEmail(member.fullName),
        });
      }
    }

    // Update Database
    const updatedMember = await Member.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, data: updatedMember });

  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
  }
}
