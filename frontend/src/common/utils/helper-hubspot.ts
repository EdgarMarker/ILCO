import { z } from 'zod';

interface FormField {
  name: string;
  hubspotName: string;
  required: boolean;
  max?: number;
  label?: string;
  type?: string;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  id: string;
  fields: FormField[];
  schema: z.ZodSchema;
}

const baseFields = {
  firstname: {
    name: "firstname",
    hubspotName: "firstname",
    required: true,
    max: 100,
    label: "Nombre",
    type: "text",
  },
  lastname: {
    name: "lastname",
    hubspotName: "lastname",
    required: true,
    max: 100,
    label: "Apellido",
    type: "text",
  },
  email: {
    name: "email",
    hubspotName: "email",
    required: true,
    max: 100,
    label: "Correo electrónico",
    type: "email",
  },
  phone: {
    name: "phone",
    hubspotName: "phone",
    required: true,
    max: 50,
    label: "Teléfono",
    type: "tel",
  },
  city: {
    name: "city",
    hubspotName: "city",
    required: true,
    max: 100,
    label: "Ciudad",
    type: "text",
  },
  message: {
    name: "message",
    hubspotName: "message",
    required: false,
    max: 500,
    label: "Comentarios",
    type: "textarea",
  },
} as const;

const baseSchema = {
  firstname: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastname: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  message: z.string().optional(),
};

// FACTORY FUNCTION
const createFormConfig = (
  id: string,
  customFields: FormField[] = [],
  customSchema: Record<string, z.ZodTypeAny> = {},
  includeBase = true,
): FormConfig => {
  const fields = includeBase
    ? [
        baseFields.firstname,
        baseFields.lastname,
        baseFields.email,
        baseFields.phone,
        ...customFields,
        baseFields.message,
      ]
    : [...customFields];

  const schema = includeBase
    ? z.object({ ...baseSchema, ...customSchema })
    : z.object({ ...customSchema }); 

  return {
    id,
    fields,
    schema,
  };
};

// FORM INSTANCES
export const FORM_INSTANCES = {

  get CONTACT () {
    return createFormConfig("contact_form");
  }
};
export const createFormInstance = createFormConfig;