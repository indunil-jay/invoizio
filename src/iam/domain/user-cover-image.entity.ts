export class UserCoverImage {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly url: string,
        public readonly publicId: string,
        public readonly size: string,
        public readonly type: string,
        public readonly mimeType: string
    ) {}

    public toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            url: this.url,
            publicId: this.publicId,
            size: this.size,
            type: this.type,
            mimeType: this.mimeType,
        };
    }
}
