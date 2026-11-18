/** Last door that may be opened: today's date in December (all 24 after Christmas Eve), none before. */
export function openableDay(now: Date) {
  return now.getMonth() === 11 ? Math.min(now.getDate(), 24) : 0;
}
