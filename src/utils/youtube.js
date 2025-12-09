// --------------------------------------------------
// Extract YouTube Video ID from ANY URL
// --------------------------------------------------
export const extractYouTubeID = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|v\/|watch\?.*v=|live\/))([A-Za-z0-9_-]{11})/;

  const match = url.match(regExp);
  return match ? match[1] : null;
};

// --------------------------------------------------
// Detect YouTube Shorts
// --------------------------------------------------
export const isYouTubeShort = (url) => {
  if (!url) return false;
  return url.includes("/shorts/");
};