import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Member from '@/models/Member';
import nodemailer from 'nodemailer';
import { getSpecialInvitationEmail } from '@/lib/emailTemplates';

// Helper: Password Generator (Same as before)
function generatePassword(name: string, dob: string | Date) {
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

  return `${firstLetter}${year}${randomLetters}${randomSpecial}`;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Generate Credentials
    // Note: We need DOB to generate the password pattern.
    // If Admin doesn't provide DOB, default to current year or handle gracefully.
    const dobDate = body.dob ? new Date(body.dob) : new Date();
    const rawPassword = generatePassword(body.fullName, dobDate);

    // Username: Firstname + last 4 phone digits (or random if no phone)
    const phoneSuffix = body.phone ? body.phone.slice(-4) : Math.floor(1000 + Math.random() * 9000).toString();
    const username = `${body.fullName.split(' ')[0].toLowerCase()}${phoneSuffix}`;

    // 2. Create Member Object (Status = Approved)
    const newMemberData = {
      ...body,
      status: "Approved",
      username: username,
      password: rawPassword, // Remember to hash in production!
      designation: body.designation || "Member",
      guardianName: body.guardianName || "N/A",
      address: body.address || "Sijgeria",
      phone: body.phone || "N/A",
      dob: dobDate,
    };

    const newMember = await Member.create(newMemberData);

    // 3. Send Special Email
    if (body.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"SUCSS Admin" <${process.env.EMAIL_USER}>`,
        to: body.email,
        subject: "Special Membership Invitation - SUCSS",
        html: getSpecialInvitationEmail(body.fullName, username, rawPassword),
      });
    }

    return NextResponse.json({ success: true, data: newMember });

  } catch (error: any) {
    console.error("Invite Error:", error);
    // Return specific error message if duplicate key (e.g. username/email exists)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to invite member" },
      { status: 500 }
    );
  }
}
