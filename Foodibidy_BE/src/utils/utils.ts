import { format } from 'date-fns/format'
import { Timestamp } from 'firebase-admin/firestore'

export const handleFormatDate = (data: Date | undefined) => {
  let created_at: string
  if (data instanceof Timestamp) {
    created_at = format(data.toDate(), 'HH:mm:ss dd-MM-yyyy ')
  } else if (data instanceof Date) {
    created_at = format(data as Date, 'HH:mm:ss dd-MM-yyyy ')
  } else {
    created_at = ''
  }
  return created_at
}
