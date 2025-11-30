import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';

export async function GET() {
  try {
    await dbConnect();
    // Fetch newest images first
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch images" }, { status: 500 });
  }
}
