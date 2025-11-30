import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import Member from '@/models/Member';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    // 1. Check Authentication
    const cookieStore = await cookies();
    const memberId = cookieStore.get('member_id')?.value;
    if (!memberId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const member = await Member.findById(memberId);
    if (!member) return NextResponse.json({ success: false, error: "Member not found" }, { status: 401 });

    // 2. Process Form Data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    // 3. Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload to Cloudinary (using Promise wrapper)
    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "sucss_gallery" }, // Cloudinary folder name
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // 5. Save to MongoDB
    const newImage = await GalleryImage.create({
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      caption: caption,
      category: category,
      uploadedBy: member._id,
      uploaderName: member.fullName
    });

    return NextResponse.json({ success: true, data: newImage });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
