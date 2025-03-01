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

interface InvoizioResetPasswordProps {
    userName: string;
    resetUrl: string;
}

export const InvoizioResetPassword = ({
    userName,
    resetUrl,
}: InvoizioResetPasswordProps) => {
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
                <Preview>Reset Your Password - Invoizio</Preview>
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

                        {/* Header */}
                        <Heading className="text-center text-primary text-2xl font-semibold">
                            Reset Your Password, {userName}
                        </Heading>

                        {/* Message */}
                        <Text className="text-center text-grayText mt-3 leading-relaxed">
                            We received a request to reset your password. If
                            this was you, click the button below to set a new
                            password.
                        </Text>

                        {/* Reset Password Button */}
                        <Section className="text-center mt-6">
                            <Button
                                className="bg-primary text-white rounded-lg py-2 px-6 text-base font-semibold"
                                href={resetUrl}
                            >
                                Reset Password
                            </Button>
                        </Section>

                        {/* Security Reminder */}
                        <Text className="text-center text-grayText mt-6 text-sm">
                            If you did not request this, please ignore this
                            email. Your password will remain unchanged.
                        </Text>

                        <Text className="text-center text-grayText mt-2 text-sm">
                            For security reasons, do not share this email with
                            anyone.
                        </Text>

                        {/* Support & Footer */}
                        <Container className="mt-10 text-center text-gray-500">
                            <Text>
                                Need help?{" "}
                                <Link
                                    href="#"
                                    className="text-accent underline font-medium"
                                >
                                    Visit our Help Center
                                </Link>
                            </Text>
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

export default InvoizioResetPassword;
