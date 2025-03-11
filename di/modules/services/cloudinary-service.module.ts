import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { CloudinaryService } from "@/src/shared/cloudinary/cloudinary.service";
import { ICloudinaryService } from "@/src/shared/cloudinary/cloudinary.service.interface";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ICloudinaryService>(DI_SYMBOLS.ICloudinaryService).to(
        CloudinaryService
    );
};

export const CloudinaryServiceModule = new ContainerModule(initializeModule);
