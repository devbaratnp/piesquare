export function isUploadedImageSource(source: string | null | undefined): boolean {
  return typeof source === 'string' && source.startsWith('/media/uploads/');
}
