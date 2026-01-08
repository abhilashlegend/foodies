import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    try {
        const filename = params.filename;
        // Check in uploads folder first (for new images), then fall back to public/images (for existing images)
        let filePath = path.join(process.cwd(), 'uploads', filename);
        
        if (!fs.existsSync(filePath)) {
            filePath = path.join(process.cwd(), 'public', 'images', filename);
        }
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return new NextResponse('Image not found', { status: 404 });
        }

        // Read the file
        const imageBuffer = fs.readFileSync(filePath);
        
        // Determine content type based on file extension
        const ext = path.extname(filename).toLowerCase();
        const contentTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
        };
        
        const contentType = contentTypes[ext] || 'image/jpeg';
        
        return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return new NextResponse('Error loading image', { status: 500 });
    }
}
