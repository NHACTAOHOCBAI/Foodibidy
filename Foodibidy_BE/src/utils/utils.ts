import { format } from 'date-fns/format'
import { Timestamp } from 'firebase-admin/firestore'

export const handleFormatDate = (data: Date | undefined) => {
  let createdAt: string
  if (data instanceof Timestamp) {
    createdAt = format(data.toDate(), 'HH:mm:ss dd-MM-yyyy ')
  } else if (data instanceof Date) {
    createdAt = format(data as Date, 'HH:mm:ss dd-MM-yyyy ')
  } else {
    createdAt = ''
  }
  return createdAt
}
export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}
