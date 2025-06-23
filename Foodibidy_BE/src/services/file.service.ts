import { v2 as cloudinary } from 'cloudinary'

import { UploadedFile } from 'express-fileupload'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { ErrorWithStatus } from '~/models/errors'
import { FILE_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export class CloudinaryService {
  static validateFile(file: UploadedFile) {
    if (!file || file.size === 0) {
      throw new ErrorWithStatus({ message: FILE_MESSAGES.FILE_EMPTY, status: HTTP_STATUS.FILE_UPLOAD_FAILED })
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new ErrorWithStatus({ message: FILE_MESSAGES.FILE_TOO_LARGE, status: HTTP_STATUS.PAYLOAD_TOO_LARGE })
    }

    const ext = path.extname(file.name).substring(1).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw new ErrorWithStatus({
        message: FILE_MESSAGES.INVALID_FILE_TYPE,
        status: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE
      })
    }
  }

  static async uploadImage(file: UploadedFile, folder: string): Promise<string> {
    this.validateFile(file)

    try {
      // Since upload_stream is callback-based, wrap with promise:
      return await new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            public_id: uuidv4(),
            folder: `foodibidy/${folder}`,
            resource_type: 'image',
            transformation: [{ width: 300, height: 300, crop: 'fill', quality: 'auto' }]
          },
          (error, result) => {
            if (error || !result?.secure_url) {
              reject(
                new ErrorWithStatus({
                  message: FILE_MESSAGES.FILE_UPLOAD_FAILED,
                  status: HTTP_STATUS.FILE_UPLOAD_FAILED
                })
              )
            } else {
              resolve(result.secure_url)
            }
          }
        )

        upload.end(file.data)
      })
    } catch (error) {
      console.log(error)
      throw new ErrorWithStatus({
        message: FILE_MESSAGES.FILE_UPLOAD_FAILED,
        status: HTTP_STATUS.FILE_UPLOAD_FAILED
      })
    }
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    if (!imageUrl) return

    const publicId = this.extractPublicId(imageUrl)
    if (!publicId) return

    try {
      await cloudinary.uploader.destroy(publicId)
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  private static extractPublicId(imageUrl: string): string | null {
    try {
      const parts = imageUrl.split('/')
      const versionIndex = parts.findIndex((part) => /^v\d+$/.test(part))

      if (versionIndex !== -1 && versionIndex + 1 < parts.length) {
        const publicParts = parts.slice(versionIndex + 1)
        const lastPart = publicParts.pop()
        if (!lastPart) return null

        const lastPartWithoutExt = lastPart.split('.')[0]
        return [...publicParts, lastPartWithoutExt].join('/')
      }
    } catch (err) {
      console.error('Error extracting public ID:', err)
    }

    return null
  }
}
