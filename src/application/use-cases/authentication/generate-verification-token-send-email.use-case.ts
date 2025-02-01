import { getInjection } from "@/di/container";
import {
    CURRENT_DATE,
    VERIFICATION_TOKEN_EXPIRATION_MS,
} from "@/src/constants";
import { ActionRequiredError } from "@/src/domain/errors/errors";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";

export const generateVerificationTokenAndSendEmailUseCase = async (
    email: string
): Promise<ClientResponseDTO> => {
    //di
    const verificationTokenRepository = getInjection(
        "IVerificationTokenRepository"
    );
    const emailService = getInjection("IEmailService");
    const tokenGeneratorService = getInjection("ITokenGeneratorService");
    const transactionManagerService = getInjection(
        "ITransactionManagerService"
    );

    // generate a new token
    const token = tokenGeneratorService.generate();

    // set new expiration time (10 minutes)
    const expires = new Date(
        CURRENT_DATE.getTime() + VERIFICATION_TOKEN_EXPIRATION_MS
    );

    console.log({ expires });
    // check if existing token and is expired
    const existingverificationTokenDocument =
        await verificationTokenRepository.getByEmail(email);

    // check if token exists and has not expired
    if (
        existingverificationTokenDocument &&
        existingverificationTokenDocument.expires > CURRENT_DATE
    ) {
        throw new ActionRequiredError(
            "Your email is not verified. A verification link has been sent to your inbox. Please check your email."
        );
    }
    // check if token exists and has expired
    if (
        existingverificationTokenDocument &&
        existingverificationTokenDocument.expires < CURRENT_DATE
    ) {
        transactionManagerService.startTransaction(async (tx) => {
            try {
                await verificationTokenRepository.deleteById(
                    existingverificationTokenDocument.id,
                    tx
                );
                const newVerificationTokenDocument =
                    await verificationTokenRepository.create(
                        {
                            token: token,
                            email,
                            expires,
                        },
                        tx
                    );

                await emailService.sendVerificationEmail(
                    newVerificationTokenDocument.email,
                    newVerificationTokenDocument.token
                );
                return {
                    success: true,
                    message:
                        "Your previous verification link expired. A new one has been sent to your inbox.",
                };
            } catch (error) {
                console.log(error);
                tx.rollback();
            }
        });
    }

    // Create new verification token document
    const newVerificationTokenDocument =
        await verificationTokenRepository.create({
            token: token,
            email,
            expires,
        });

    // send a email
    await emailService.sendVerificationEmail(
        newVerificationTokenDocument.email,
        newVerificationTokenDocument.token
    );

    return {
        success: true,
        message:
            "A verification link has been sent to your inbox. Please check your email.",
    };
};
