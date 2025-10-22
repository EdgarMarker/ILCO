import { NextResponse } from "next/server";

const HUBSPOT_ENDPOINT = (portalId: string, formId: string) =>
  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

export async function POST(req: Request) {
  try {
    const { firstname, lastname, phone, email, message, pageUri, pageName, hutk } =
      await req.json();

    // Validación mínima server-side
    if (!firstname || !lastname || !email) {
      return NextResponse.json(
        { ok: false, message: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
      return NextResponse.json(
        { ok: false, message: "Faltan variables de entorno de HubSpot." },
        { status: 500 }
      );
    }

    const payload = {
      fields: [
        { name: "firstname", value: String(firstname) },
        { name: "lastname", value: String(lastname) },
        { name: "phone", value: String(phone || "") },
        { name: "email", value: String(email) },
        { name: "message", value: String(message || "") },
      ],
      context: {
        pageUri: pageUri || "",
        pageName: pageName || "",
        hutk: hutk || undefined, // cookie hubspotutk si la tienes
      },
      // Si manejas consentimiento/marketing puedes incluirlo aquí:
      // legalConsentOptions: {
      //   consent: {
      //     consentToProcess: true,
      //     text: "Acepto que esta información sea procesada.",
      //     communications: [
      //       {
      //         value: true,
      //         subscriptionTypeId: 999,
      //         text: "Acepto recibir comunicaciones."
      //       }
      //     ]
      //   }
      // }
    };

    const res = await fetch(HUBSPOT_ENDPOINT(portalId, formId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Importante: no mandes credentials ni API key; este endpoint no lo requiere para envío.
      body: JSON.stringify(payload),
      // Opcional: timeout con AbortController si quieres robustez extra
    });

    // HubSpot responde 2xx on success
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, message: "Error en HubSpot", detail: text },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, message: "Error inesperado", detail: err?.message },
      { status: 500 }
    );
  }
}