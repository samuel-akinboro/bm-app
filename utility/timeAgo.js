export default function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  
  // Calculate the time difference in milliseconds
  const timeDiff = now - date;
  
  // Calculate days, hours, and minutes
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        return "just now";
      }
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (days === 1) {
    return "yesterday";
  }
  if (days <= 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  return date.toDateString();
}