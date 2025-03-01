export const PASSWORD_RESET_TOKEN_EXPIRATION_MS = 5 * 60 * 1000;

export const getResetTokenExpiration = (): Date => {
    return new Date(new Date().getTime() + PASSWORD_RESET_TOKEN_EXPIRATION_MS);
};
