import { format } from 'date-fns/format'
import { Timestamp } from 'firebase-admin/firestore'
import { ErrorWithStatus } from '~/models/errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { CollectionReference } from 'firebase-admin/firestore'

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

export async function validateFieldMatchById<T extends Record<string, any>>(
  getDataById: (id: string) => Promise<T>,
  id: string | undefined,
  field: string,
  expectedValue: T[string],
  notFoundMessage: string
) {
  if (!id)
    throw new ErrorWithStatus({
      message: `Not found ${String(field)} id`,
      status: HTTP_STATUS.NOT_FOUND
    })
  const data = await getDataById(id)

  if (!data || data[field] !== expectedValue) {
    throw new ErrorWithStatus({
      message: notFoundMessage,
      status: HTTP_STATUS.NOT_FOUND
    })
  }
}

export async function updateNestedFieldInCollection<T = any>({
  collection,
  matchField,
  matchValue,
  nestedFieldPath,
  updatedValue
}: {
  collection: CollectionReference<T>
  matchField: string
  matchValue: any
  nestedFieldPath: string
  updatedValue: any
}) {
  const snapshot = await collection.where(matchField, '==', matchValue).get()

  for (const doc of snapshot.docs) {
    await collection.doc(doc.id).update({
      [nestedFieldPath]: updatedValue
    })
  }

  console.log(`Updated ${snapshot.size} documents in ${collection.id}, set "${nestedFieldPath}" = "${updatedValue}"`)
}
