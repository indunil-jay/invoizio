import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useFormContext } from "react-hook-form";

interface AddressFormProps {
  fieldPrefix: string;
  disabled?: boolean;
}

export const AddressForm = ({
  fieldPrefix,
  disabled = false,
}: AddressFormProps) => {
  const form = useFormContext();

  const createFieldName = (fieldName: string): string =>
    `${fieldPrefix}.${fieldName}`;

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name={createFieldName("addressLine1")}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-x-2">
            <FormLabel className="text-primary/80 text-xs">
              Address Line 1:
            </FormLabel>
            <FormControl className="col-span-3">
              <Input
                placeholder="Enter address line 1"
                {...field}
                disabled={disabled}
              />
            </FormControl>

            <FormMessage className="col-span-full" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("addressLine2")}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-x-2">
            <FormLabel className="text-primary/80 text-xs">
              Address Line 2:
            </FormLabel>
            <FormControl className="col-span-3">
              <Input
                placeholder="Enter address line 2"
                {...field}
                disabled={disabled}
              />
            </FormControl>

            <FormMessage className="col-span-full" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("city")}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-x-2">
            <FormLabel className="text-primary/80 text-xs">City:</FormLabel>
            <FormControl className="col-span-3">
              <Input placeholder="Enter city" {...field} disabled={disabled} />
            </FormControl>

            <FormMessage className="col-span-full" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={createFieldName("postalCode")}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-x-2">
            <FormLabel className="text-primary/80 text-xs">
              Postal Code:
            </FormLabel>
            <FormControl className="col-span-3">
              <Input
                placeholder="Enter postal code"
                {...field}
                disabled={disabled}
              />
            </FormControl>

            <FormMessage className="col-span-full" />
          </FormItem>
        )}
      />
    </div>
  );
};
