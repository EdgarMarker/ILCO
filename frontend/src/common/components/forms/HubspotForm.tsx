"use client";

import { useCallback, useMemo, useState } from "react";

type FormState = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  message: string;
};

const initialState: FormState = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  message: "",
};

function getHubspotUtk(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default function HubspotForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(null);

  const pageUri = useMemo(
    () => (typeof window !== "undefined" ? window.location.href : ""),
    []
  );
  const pageName = useMemo(
    () => (typeof document !== "undefined" ? document.title : "Formulario"),
    []
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((s) => ({ ...s, [name]: value }));
    },
    []
  );

  const validate = (): string | null => {
    if (!values.firstname.trim()) return "El nombre es requerido.";
    if (!values.lastname.trim()) return "El apellido es requerido.";
    if (!values.email.trim()) return "El correo es requerido.";
    // validación simple de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Correo inválido.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const error = validate();
    if (error) {
      setStatus({ ok: false, msg: error });
      return;
    }

    setLoading(true);
    try {
      const hutk = getHubspotUtk();
      const res = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pageUri,
          pageName,
          hutk,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "No se pudo enviar el formulario.");
      }

      setStatus({ ok: true, msg: "¡Enviado con éxito! Gracias por contactarnos." });
      setValues(initialState);
    } catch (err: any) {
      setStatus({
        ok: false,
        msg: err?.message || "Ocurrió un error al enviar. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
        <label htmlFor="firstname">Nombre
			<input
			id="firstname"
			name="firstname"
			value={values.firstname}
			onChange={onChange}
			required
			placeholder="Tu nombre"
			/>
		</label>

        <label htmlFor="lastname">Apellido
			<input
			id="lastname"
			name="lastname"
			value={values.lastname}
			onChange={onChange}
			required
			placeholder="Tu apellido"
			/>
		</label>

        <label htmlFor="phone">Teléfono
			<input
			id="phone"
			name="phone"
			value={values.phone}
			onChange={onChange}
			placeholder="Ej. +52 999 000 0000"
			/>
		</label>

        <label htmlFor="email">Correo electrónico
			<input
			id="email"
			name="email"
			type="email"
			value={values.email}
			onChange={onChange}
			required
			placeholder="tucorreo@ejemplo.com"
			/>
		</label>

        <label htmlFor="message">Mensaje
			<textarea
			id="message"
			name="message"
			value={values.message}
			onChange={onChange}
			rows={4}
			placeholder="Cuéntanos en qué podemos ayudarte"
			/>
      	</label>

		<button
			type="submit"
			disabled={loading}
			className="btn"
		>
        	{loading ? "Enviando..." : "Enviar"}
      	</button>

		{status && (
			<p className={`text-sm ${
				status.ok ? "text-green-600" : "text-red-600"
			}`}>
				{status.msg}
			</p>
		)}
    </form>
  );
}