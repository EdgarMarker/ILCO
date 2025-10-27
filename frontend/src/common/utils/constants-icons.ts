import type { Image } from "@/_domain/models/modules/modules.model";

const createIcon = (url: string, altText: string): Image => ({
  _type: "image",
  media: { url },
  alt: { altText },
});

export const ICONS_CONTACT = {
  phone: createIcon("/svg/telefono_dark.svg", "Teléfono"),
  email: createIcon("/svg/email_dark.svg", "Email"),
  hours: createIcon("/svg/horario_dark.svg", "Horario"),
  address: createIcon("/svg/ubicacion_dark.svg", "Ubicación"),
} as const;
