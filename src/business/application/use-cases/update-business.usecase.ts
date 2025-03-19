import { getInjection } from "@/di/container";
import { UpdateBusinessDto } from "@/src/business/application/dtos/update-business.dto";
import {
    BusinessNotFoundException,
    BusinessUpdateUnauthorizedException,
} from "../exceptions/specific.exception";
import { ICloudinaryService } from "@/src/shared/cloudinary/cloudinary.service.interface";
import { Readable } from "stream";

export const updateBusinessUseCase = {
    async execute(id: string, { name, image, address }: UpdateBusinessDto) {
        const {
            authenticationService,
            businessRepository,
            businessAddressRepository,
            cloudinaryService,
            businessProfileImageRepository,
            businessProfileImageFactory,
        } = this.getServices();
        // validate  user session
        const user = await authenticationService.verifySessionUser();

        //check if business document exists
        const existingBusiness = await businessRepository.get(id);

        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        //check if user has permission to update
        if (existingBusiness.userId !== user.id) {
            throw new BusinessUpdateUnauthorizedException();
        }

        //if name exists update
        if (name) {
            await businessRepository.update(id, { name });
        }
        //if address exists upate
        if (address) {
            await businessAddressRepository.update(id, address);
        }
        //if image exist, remove existing one and add new
        if (image) {
            // Upload busniess image image
            const buffer = await this.convertImageToBuffer(image as File);
            const uploadResults = await this.uploadImageToCloud(
                cloudinaryService,
                buffer
            );
            const { url, mimeType, publicId, size, type } = uploadResults;
            //remove old image
            const existingImage = await businessProfileImageRepository.get(id);

            if (existingImage) {
                //delete old image from cloudinary and database
                await cloudinaryService.deleteFile(existingImage.publicId);
                await businessProfileImageRepository.remove(existingImage.id);
            }

            //add new image
            const businessProfileImage = businessProfileImageFactory.create(
                id,
                url,
                publicId,
                size,
                type,
                mimeType
            );
            await businessProfileImageRepository.insert(businessProfileImage);
        }

        const business = await businessRepository.get(id);
        if (!business) throw new BusinessNotFoundException();
        return business;
    },

    async convertImageToBuffer(image: File) {
        const arrayBuffer = await image.arrayBuffer();
        return Buffer.from(arrayBuffer);
    },

    async uploadImageToCloud(
        uploadService: ICloudinaryService,
        buffer: Buffer
    ) {
        const readableStream = Readable.from(buffer);
        return await uploadService.uploadFile(readableStream, "businessImages");
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
            businessAddressRepository: getInjection(
                "IBusinessAddressRepository"
            ),
            cloudinaryService: getInjection("ICloudinaryService"),
            businessProfileImageRepository: getInjection(
                "IBusinessProfileImageRepository"
            ),
            businessProfileImageFactory: getInjection(
                "IBusinessProfileImageFactory"
            ),
        };
    },
};
