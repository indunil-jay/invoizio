import { useEffect, useState, useRef } from "react";
import { UseFormReturn } from "react-hook-form";

export const useImageUpload = (
    form: UseFormReturn<// eslint-disable-next-line @typescript-eslint/no-explicit-any
    any>,
    fieldName: string
) => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string | undefined>();

    // Watch field value in the form
    const imageValue = form.watch(fieldName);

    useEffect(() => {
        if (imageValue instanceof File) {
            const objectURL = URL.createObjectURL(imageValue);
            setImagePreview(objectURL);
            // Cleanup
            return () => URL.revokeObjectURL(objectURL);
        } else {
            setImagePreview(imageValue);
        }
    }, [imageValue]);

    // Listing to  input changes
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            form.setValue(fieldName, file);
        }
    };

    // remove func
    const removeImage = () => {
        form.setValue(fieldName, null);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    return { fileRef, imagePreview, handleImageChange, removeImage };
};
