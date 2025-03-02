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

interface InvoizioVerifyNewEmailProps {
    userName: string;
    verifyUrl: string;
}

export const InvoizioVerifyNewEmail = ({
    userName,
    verifyUrl,
}: InvoizioVerifyNewEmailProps) => {
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
                <Preview>Confirm Your New Email for Invoizio</Preview>
                <Body className="bg-offwhite text-base font-sans">
                    <Container className="bg-white p-8 rounded-lg shadow-lg border border-borderGray">
                        {/* Logo */}
                        <Section className="text-center">
                            <Img
                                src="https://yourcompany.com/logo.png"
                                width="120"
                                height="50"
                                alt="Invoizio"
                                className="mx-auto mb-4"
                            />
                        </Section>

                        {/* Confirmation Message */}
                        <Heading className="text-center text-primary text-2xl font-semibold">
                            Confirm Your New Email, {userName}!
                        </Heading>
                        <Text className="text-center text-grayText mt-3 leading-relaxed">
                            You recently updated your email address in Invoizio.
                            To complete the update, please verify your new email
                            by clicking the button below.
                        </Text>

                        {/* Verification Button */}
                        <Section className="text-center mt-6">
                            <Button
                                className="bg-primary text-white rounded-lg py-2 px-6 text-base font-semibold"
                                href={verifyUrl}
                            >
                                Verify Your New Email
                            </Button>
                        </Section>

                        {/* Security Notice */}
                        <Text className="text-center text-grayText mt-6 text-sm">
                            If you did not request this change, please contact
                            our support team immediately.
                        </Text>

                        {/* Support & Footer */}
                        <Container className="mt-10 text-center text-gray-500">
                            <Text>
                                Need help?{" "}
                                <Link
                                    href="#"
                                    className="text-accent underline font-medium"
                                >
                                    Contact Support
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

export default InvoizioVerifyNewEmail;
