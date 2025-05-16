import { DecodedIdToken } from 'firebase-admin/auth'
import 'express'

declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedIdToken
    }
}
