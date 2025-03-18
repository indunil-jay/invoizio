import { BusinessAddress } from "./business-address.entity";
import { BusinessProfileImage } from "./business-image.entity";

export class Business {
    private _address?: BusinessAddress;
    private _profileImage?: BusinessProfileImage | null;

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly userId: string
    ) {}

    public setAddress(address: BusinessAddress) {
        this._address = address;
    }

    public setProfileImage(profileImage: BusinessProfileImage) {
        this._profileImage = profileImage;
    }

    public get address(): BusinessAddress | undefined {
        return this._address;
    }

    public get profileImage(): BusinessProfileImage | undefined | null {
        return this._profileImage;
    }
}
