import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const uploads = await payload.find({ collection: 'data-uploads', limit: 1000 });
    
    let deletedCount = 0;
    for (const doc of uploads.docs) {
      await payload.delete({ collection: 'data-uploads', id: doc.id });
      deletedCount++;
    }
    
    return NextResponse.json({ success: true, message: `Wiped ${deletedCount} ghost records. Go back to your site, it should now load the massive 10,000+ row dataset!` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
