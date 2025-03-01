import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import type * as React from "react";

interface PasswordResetSuccessProps {
    userName: string;
    loginUrl: string;
}
const InvoizioPasswordResetSuccess = ({
    userName,
    loginUrl,
}: PasswordResetSuccessProps) => {
    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#000000",
                                secondary: "#333333",
                                accent: "#1E40AF",
                                grayText: "#666666",
                                borderGray: "#DDDDDD",
                                offwhite: "#F9FAFB",
                            },
                        },
                    },
                }}
            >
                <Preview>Your Password Has Been Reset Successfully</Preview>
                <Body className="bg-offwhite text-base font-sans">
                    <Container className="bg-white p-8 rounded-lg shadow-lg border border-borderGray">
                        {/* Logo */}
                        <Section className="text-center">
                            <Img
                                src="https://media.licdn.com/dms/image/v2/C4E0BAQFKz9lv04wJFA/company-logo_200_200/company-logo_200_200/0/1630588448395/invizio_logo?e=2147483647&v=beta&t=jEWyqiWFgK9QPA5jnH8jCQe7J_yc3Wt2xh3tg-o2TmM"
                                width="120"
                                height="50"
                                alt="Invoizio"
                                className="mx-auto mb-4"
                            />
                        </Section>

                        {/* Success Message */}
                        <Heading className="text-center text-primary text-2xl font-semibold">
                            Password Reset Successful 🎉
                        </Heading>
                        <Text className="text-center text-grayText mt-3 leading-relaxed">
                            Hi {userName}, your password has been successfully
                            reset. You can now log in to your account using your
                            new password.
                        </Text>

                        {/* Login Button */}
                        <Section className="text-center mt-6">
                            <Button
                                className="bg-primary text-white rounded-lg py-2 px-6 text-base font-semibold"
                                href={loginUrl}
                            >
                                Log In to Your Account
                            </Button>
                        </Section>

                        {/* Security Note */}
                        <Section className="mt-8">
                            <Heading className="text-secondary text-lg font-semibold text-center">
                                Keeping Your Account Secure
                            </Heading>
                            <Section className="mx-6">
                                <Text className="text-grayText leading-relaxed">
                                    ✅ If you did not request this password
                                    reset, please{" "}
                                    <Link
                                        href="#"
                                        className="text-accent underline font-medium"
                                    >
                                        contact our support team
                                    </Link>{" "}
                                    immediately.
                                </Text>

                                <Text className="text-grayText leading-relaxed">
                                    ✅ Do not share your password with anyone.
                                </Text>

                                <Text className="text-grayText leading-relaxed">
                                    ✅ Use a strong and unique password for
                                    better security.
                                </Text>
                            </Section>
                        </Section>

                        {/* Footer */}
                        <Text className="text-center text-grayText mt-6 text-sm">
                            If you have any questions, feel free to{" "}
                            <Link
                                href="#"
                                className="text-accent underline font-medium"
                            >
                                visit our Help Center.
                            </Link>
                        </Text>

                        <Container className="mt-10 text-center text-gray-500">
                            <Text className="text-xs mt-3">
                                &copy; {new Date().getFullYear()} Invoizio Inc.
                                All rights reserved.
                            </Text>
                        </Container>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default InvoizioPasswordResetSuccess;
