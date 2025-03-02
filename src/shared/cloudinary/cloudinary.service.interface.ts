import { Readable } from "stream";

export interface ICloudinaryService {
    uploadFile( file: Buffer | Readable, folderName: string): Promise<any>;
    deleteFile(publicId: string): Promise<void>;
}
