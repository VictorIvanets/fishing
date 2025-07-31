function normalizeMongoDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/)
  if (!match) return ""

  const [, year, month, day, hours, minutes] = match
  return `${+hours + 3}:${minutes} ${day}/${month}/${year}`
}

export default normalizeMongoDate
