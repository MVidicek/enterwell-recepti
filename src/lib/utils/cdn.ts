export function getCdnUrl(cdnPath: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_CDN_BASE_URL || '';

  // Osiguraj da path počinje s /
  const normalizedPath = cdnPath.startsWith('/') ? cdnPath : `/${cdnPath}`;

  return `${baseUrl}${normalizedPath}`;
}

export function buildImagePath(slug: string, imageName: string = 'hero.jpg'): string {
  return `/recipes/${slug}/${imageName}`;
}
