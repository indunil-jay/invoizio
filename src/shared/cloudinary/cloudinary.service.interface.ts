import { Readable } from "stream";

export interface IUploadedImageReturnType {
    url: string;
    publicId: string;
    size: string;
    type: string;
    mimeType: string;
}

export interface ICloudinaryService {
    uploadFile(
        file: Buffer | Readable,
        folderName: string
    ): Promise<IUploadedImageReturnType>;
    deleteFile(publicId: string): Promise<void>;
}
