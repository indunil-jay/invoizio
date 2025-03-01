/** create email verification token expire time */

export const VERIFICATION_TOKEN_EXPIRATION_MS = 1000 * 60 * 60;

export const getVerificationTokenExpiration = (): Date => {
    return new Date(new Date().getTime() + VERIFICATION_TOKEN_EXPIRATION_MS);
};
