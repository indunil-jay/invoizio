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

/**
 * TODO:
 *  change the logos
 */

interface InvoizioVerifyAccountProps {
    userName: string;
    verifyUrl: string;
}

export const InvoizioVerifyAccount = ({
    userName,
    verifyUrl,
}: InvoizioVerifyAccountProps) => {
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
                <Preview>Welcome to Invoizio - Verify Your Email</Preview>
                <Body className="bg-offwhite text-base font-sans ">
                    <Container className="bg-white p-8 rounded-lg shadow-lg border border-borderGray ">
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

                        {/* Welcome Message */}
                        <Heading className="text-center text-primary text-2xl font-semibold">
                            Welcome to Invoizio, {userName}!
                        </Heading>
                        <Text className="text-center text-grayText mt-3 leading-relaxed">
                            We&apos;re thrilled to have you on board. Invoizio
                            is designed to help business owners effortlessly
                            manage invoices, payments, and customer
                            interactions—all in one place.
                        </Text>

                        {/* Verification Button */}
                        <Section className="text-center mt-6">
                            <Button
                                className="bg-primary text-white rounded-lg py-2 px-6 text-base font-semibold"
                                href={verifyUrl}
                            >
                                Verify Your Email
                            </Button>
                        </Section>

                        {/* Company Overview */}
                        <Section className="mt-8">
                            <Heading className="text-secondary text-lg font-semibold text-center">
                                Why Choose Invoizio?
                            </Heading>
                            <Section className="mx-6">
                                <Text className="text-grayText  leading-relaxed ">
                                    ✅ Multiple Business Profiles – Manage
                                    multiple businesses under one account.
                                </Text>

                                <Text className="text-grayText  leading-relaxed ">
                                    ✅ Effortless Invoicing – Create, send, and
                                    track invoices with ease.{" "}
                                </Text>

                                <Text className="text-grayText  leading-relaxed ">
                                    ✅ Automated Reminders – Notify customers
                                    about pending invoices automatically.
                                </Text>

                                <Text className="text-grayText  leading-relaxed ">
                                    ✅ Secure & Reliable – We prioritize
                                    security to keep your data safe.
                                </Text>
                            </Section>
                        </Section>

                        {/* Support & Footer */}
                        <Text className="text-center text-grayText mt-6 text-sm">
                            If you did not sign up for Invoizio, please ignore
                            this email.
                        </Text>

                        <Container className="mt-10 text-center text-gray-500">
                            <Text>
                                Need assistance?{" "}
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

export default InvoizioVerifyAccount;
