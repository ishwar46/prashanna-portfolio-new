"use server";

import { z } from "zod";
import { sendLeadEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),
  loanType: z.string().optional(),
  message: z.string().optional(),
});

export interface ContactState {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const honeypot = formData.get("website");
  if (honeypot) {
    return { success: true, message: "Thank you!" };
  }

  const rawData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    loanType: formData.get("loanType") as string,
    message: formData.get("message") as string,
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await sendLeadEmail(validatedFields.data);
    return {
      success: true,
      message:
        "Thank you! Prashanna will be in touch within 24 hours.",
    };
  } catch {
    return {
      success: false,
      message:
        "Something went wrong. Please try again or call (571) 222-5555 directly.",
    };
  }
}
