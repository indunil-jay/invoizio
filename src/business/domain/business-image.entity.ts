export class BusinessProfileImage {
    constructor(
        public readonly id: string,
        public readonly businessId: string,
        public readonly url: string,
        public readonly publicId: string,
        public readonly size: string,
        public readonly type: string,
        public readonly mimeType: string
    ) {}

    public toJSON() {
        return {
            id: this.id,
            businessId: this.businessId,
            url: this.url,
            publicId: this.publicId,
            size: this.size,
            type: this.type,
            mimeType: this.mimeType,
        };
    }
}
