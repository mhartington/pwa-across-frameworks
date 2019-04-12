export function formatArtwork(url: string, dim: number): string {
    if (!url) return 'data:image/jpeg;base64,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'
    return (window as any).MusicKit.formatArtworkURL({ url }, dim, dim);
  }
