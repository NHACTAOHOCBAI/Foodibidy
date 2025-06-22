import { DecodedIdToken } from 'firebase-admin/auth'
import 'express'
import { File as MulterFile } from 'multer';


declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedIdToken
    }
}
