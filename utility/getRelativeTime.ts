export default function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays >= 365) {
    const years = Math.floor(diffInDays / 365);
    return `${years}년 전`;
  } else if (diffInDays >= 30) {
    const months = Math.floor(diffInDays / 30);
    return `${months}달 전`;
  } else {
    return `${diffInDays}일 전`;
  }
}
