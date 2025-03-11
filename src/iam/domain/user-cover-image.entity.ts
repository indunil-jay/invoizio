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
}
