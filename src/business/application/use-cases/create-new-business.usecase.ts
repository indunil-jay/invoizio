import { Readable } from "stream";
import { getInjection } from "@/di/container";
import { CreateBusinessDto } from "@/src/business/application/dtos/create-new-business.dto";
import { ICloudinaryService } from "@/src/shared/cloudinary/cloudinary.service.interface";
import { DataBaseTransactionException } from "@/src/shared/infrastructure/exceptions/common.exceptions";
import { BusinessNotFoundException } from "@/src/business/application/exceptions/common.exception";
import { ITransactionManagerService } from "@/src/shared/database-transaction/transaction-manager.service.interface";
import { IBusinessRepository } from "@/src/business/application/repositories/business.repository";
import { IBusinessAddressRepository } from "@/src/business/application/repositories/business-address.repository";
import { IBusinessProfileImageRepository } from "@/src/business/application/repositories/business-profile-image.repository";
import { Business } from "@/src/business/domain/business.entity";
import { BusinessAddress } from "@/src/business/domain/business-address.entity";
import { BusinessProfileImage } from "@/src/business/domain/business-image.entity";

export const createNewBusinessUseCase = {
    async execute({ address, name, image }: CreateBusinessDto) {
        const {
            authenticationService,
            businessAddressRepository,
            businessRepository,
            businessProfileImageRepository,
            transactionManagerService,
            cloudinaryService,
            businessProfileImageFactory,
            businessAddressFactory,
            businessFactory,
        } = this.getServices();

        // check session is valida
        const user = await authenticationService.verifySessionUser();

        // Upload busniess image image
        const buffer = await this.convertImageToBuffer(image as File);
        const uploadResults = await this.uploadImageToCloud(
            cloudinaryService,
            buffer
        );
        const { url, mimeType, publicId, size, type } = uploadResults;

        const business = businessFactory.create(name, user.id);

        const businessAddress = businessAddressFactory.create(
            business.id,
            address.addressLine1,
            address.city,
            address.postalCode,
            address.addressLine2
        );

        const businessProfileImage = businessProfileImageFactory.create(
            business.id,
            url,
            publicId,
            size,
            type,
            mimeType
        );

        await this.saveBusiessTransaction(
            transactionManagerService,
            businessAddressRepository,
            businessRepository,
            businessProfileImageRepository,
            business,
            businessAddress,
            businessProfileImage
        );

        return await this.getBusinessOrThrow(businessRepository, business.id);
    },

    async getBusinessOrThrow(
        businessRepository: IBusinessRepository,
        businessId: string
    ) {
        const businessDocument = await businessRepository.get(businessId);
        if (!businessDocument) throw new BusinessNotFoundException();
        return businessDocument;
    },

    async saveBusiessTransaction(
        transactionManagerService: ITransactionManagerService,
        businessAddressRepository: IBusinessAddressRepository,
        businessRepository: IBusinessRepository,
        businessProfileImageRepository: IBusinessProfileImageRepository,
        business: Business,
        businessAddress: BusinessAddress,
        businessProfileImage: BusinessProfileImage
    ) {
        try {
            // Create business and address within a transaction
            await transactionManagerService.startTransaction(async (tx) => {
                try {
                    await businessRepository.insert(business, tx);

                    await businessAddressRepository.insert(businessAddress, tx);

                    await businessProfileImageRepository.insert(
                        businessProfileImage,
                        tx
                    );
                } catch (error) {
                    console.error(
                        `TRANSACTION_ERROR::createNewBusinessUseCase::${error}`
                    );
                    tx.rollback();
                    throw error;
                }
            });
        } catch (error) {
            console.error(`createNewBusinessUseCase::${error}`);
            throw new DataBaseTransactionException();
        }
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
            transactionManagerService: getInjection(
                "ITransactionManagerService"
            ),
            cloudinaryService: getInjection("ICloudinaryService"),
            businessProfileImageRepository: getInjection(
                "IBusinessProfileImageRepository"
            ),
            businessProfileImageFactory: getInjection(
                "IBusinessProfileImageFactory"
            ),
            businessFactory: getInjection("IBusinessFactory"),
            businessAddressFactory: getInjection("IBusinessAddressFactory"),
        };
    },
};
