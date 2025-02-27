"use client";

import { Input } from "@/app/_components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState, forwardRef } from "react";

type PasswordFieldProps = React.ComponentProps<typeof Input> & {
    label?: string;
    placeholder?: string;
    disabled?: boolean;
};

// Use forwardRef to allow refs to be passed to the Input component
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
    ({ placeholder = "• • • • • • • •", ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] =
            useState<boolean>(false);

        return (
            <div>
                <div className="flex items-center border shadow-sm rounded-md  focus-within:ring-1 focus-within:ring-ring focus-within:border-transparent transition-colors focus-within:outline-none">
                    <Input
                        disabled={props.disabled}
                        ref={ref} // Forward the ref to the Input component
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder={placeholder}
                        {...props}
                        className={`rounded-tr-none rounded-br-none border-none shadow-none transition-none  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                            props.className || ""
                        }`}
                    />
                    <div className="h-9 w-11 border-none rounded-tr-md rounded-br-md border-input bg-transparent flex items-center justify-center shadow-sm transition-colors  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                        <PasswordToggle
                            isVisible={isPasswordVisible}
                            toggle={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }
);

// Set display name for better debugging
PasswordField.displayName = "PasswordField";

const PasswordToggle = ({
    isVisible,
    toggle,
}: {
    isVisible: boolean;
    toggle: () => void;
}) => {
    return isVisible ? (
        <Eye
            onClick={toggle}
            size={16}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        />
    ) : (
        <EyeClosed
            size={16}
            onClick={toggle}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
        />
    );
};
