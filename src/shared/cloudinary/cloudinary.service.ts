import { injectable } from "inversify";
import { ICloudinaryService } from "./cloudinary.service.interface";
import { v2 as Cloudinary } from "cloudinary";
import envValidationSchema from "@/lib/env-validation-schema";
import { Readable } from "stream";

interface UploadedResponse {
    url: string;
    publicId: string;
    size: string;
    type: string;
    mimeType: string;
}

@injectable()
export class CloudinaryService implements ICloudinaryService {
    constructor() {
        this.init();
    }

    private init() {
        Cloudinary.config({
            cloud_name: envValidationSchema.CLOUDINARY_CLOUD_NAME,
            api_key: envValidationSchema.CLOUDINARY_API_KEY,
            api_secret: envValidationSchema.CLOUDINARY_API_SECRET,
        });
    }

    async uploadFile(
        file: Buffer | Readable,
        folderName = "common"
    ): Promise<UploadedResponse> {
        return new Promise((resolve, reject) => {
            const upload = Cloudinary.uploader.upload_stream(
                { folder: folderName },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Upload failed"));

                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        size: result.bytes.toString(),
                        type: result.resource_type.toLowerCase(),
                        mimeType: result.format,
                    });
                }
            );

            console.log({ upload });

            if (file instanceof Readable) {
                file.pipe(upload);
            } else {
                Readable.from(file).pipe(upload);
            }
        });
    }

    async deleteFile(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                if (result.result !== "ok")
                    return reject(new Error("Failed to delete file"));

                resolve();
            });
        });
    }
}
