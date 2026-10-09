/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Extracts a YouTube Video ID from any standard or mobile YouTube URL.
 * Supports:
 * - https://www.youtube.com/watch?v=ID
 * - https://m.youtube.com/watch?v=ID&t=10s
 * - https://youtu.be/ID
 * - https://www.youtube.com/embed/ID
 * - https://www.youtube.com/v/ID
 * - Raw 11-character video IDs
 */
export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // If already a raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex covering standard, shortened, mobile, and embed YouTube URLs
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/i;

  const match = trimmed.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Validates whether a given string is a valid educational YouTube URL or ID.
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

/**
 * Converts timestamp strings into seconds.
 * Supports formats:
 * - "14:32" -> 872
 * - "02:15" -> 135
 * - "1:05:30" -> 3930
 * - "20:10 – 26:40" (range) -> 1210 (returns start timestamp)
 * - "45" -> 45
 */
export function parseTimestampToSeconds(timestamp: string): number {
  if (!timestamp || typeof timestamp !== 'string') return 0;

  // Handle ranges like "20:10 – 26:40" or "11:18 — 15:00" or "20:10 - 26:40"
  const startPart = timestamp.split(/[–—\-]/)[0].trim();

  const parts = startPart.split(':').map((p) => parseInt(p.trim(), 10));

  if (parts.some((p) => isNaN(p) || p < 0)) {
    return 0;
  }

  if (parts.length === 1) {
    return parts[0];
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return 0;
}

/**
 * Generates an accessible, privacy-enhanced YouTube embed URL with optional start timestamp.
 */
export function getYouTubeEmbedUrl(urlOrId: string, timestamp?: string): string {
  const videoId = extractYouTubeId(urlOrId) || 'JeznW_70ZVU';
  const startSeconds = timestamp ? parseTimestampToSeconds(timestamp) : 0;

  return `https://www.youtube-nocookie.com/embed/${videoId}?start=${startSeconds}&autoplay=1&rel=0`;
}
