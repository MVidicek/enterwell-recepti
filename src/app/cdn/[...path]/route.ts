import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

type RouteParams = {
  params: Promise<{ path: string[] }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { path: pathSegments } = await params;

    // Složi putanju do datoteke
    const filePath = path.join(
      process.cwd(),
      'public',
      'cdn',
      ...pathSegments
    );

    // Pročitaj datoteku
    const file = await readFile(filePath);

    // Odredi Content-Type prema ekstenziji
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';

    switch (ext) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
    }

    // Vrati datoteku s cache headerima
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Simulacija CDN cache headera
        'Cache-Control': 'public, max-age=31536000, immutable',
        'CDN-Cache-Control': 'max-age=31536000',
        'Surrogate-Control': 'max-age=31536000',
        // ETag za cache validaciju
        'ETag': `"${Buffer.from(filePath).toString('base64').slice(0, 16)}"`,
      },
    });
  } catch {
    // Datoteka nije pronađena
    return NextResponse.json(
      { error: 'Datoteka nije pronađena' },
      { status: 404 }
    );
  }
}
