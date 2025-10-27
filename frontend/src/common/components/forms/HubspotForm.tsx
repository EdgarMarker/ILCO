"use client";

import { useState } from "react";
import useHubspotForm from "@/common/hooks/useHubspot";
import { FORM_INSTANCES } from "@/common/utils/helper-hubspot";



export default function HubspotForm() {
  const formConfig = FORM_INSTANCES.CONTACT;
	const hubspot = useHubspotForm(formConfig);

	const [formState, setFormState] = useState<Record<string, string>>(() => {
		const init: Record<string, string> = {};
		(formConfig.fields as any[]).forEach((f) => {
			init[f.name] = "";
		});
		return init;
	});
	const [loading, setLoading] = useState(false);
	const [ok, setOk] = useState<null | boolean>(null);
	const [error, setError] = useState<string | null>(null);

	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));

	const onSubmitMinimal = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setOk(null);

		// honeypot
		if (
			typeof formState.website === "string" &&
			formState.website.trim() !== ""
		) {
			setOk(true);
			return;
		}

		setLoading(true);
		try {
			const payload: Record<string, string> = {};
			(formConfig.fields as any[]).forEach((f) => {
				payload[f.name] = formState[f.name] ?? "";
			});

			const result: any = await hubspot.submitData(payload);

			if (result && result.success) {
				setOk(true);
				const reset: Record<string, string> = {};
				(formConfig.fields as any[]).forEach((f) => {
					reset[f.name] = "";
				});
				setFormState(reset);
			} else {
				setOk(false);
				setError(
					result?.error ??
						(result?.payload
							? JSON.stringify(result.payload)
							: "Error al enviar"),
				);
			}
		} catch (err: any) {
			setOk(false);
			setError(String(err?.message ?? err));
		} finally {
			setLoading(false);
		}
	};

  return (
    <form onSubmit={onSubmitMinimal}>
      
        <label>Nombre*
            <input
                name="firstname"
                value={formState.firstname}
                onChange={onChange}
                required
            />
        </label>

        <label>Apellidos*
            <input
                name="lastname"
                value={formState.lastname}
                onChange={onChange}
                required
            />
        </label>
      
        <label>Email*
            <input
                name="email"
                type="email"
                value={formState.email}
                onChange={onChange}
                required
            />
        </label>

        <label>Teléfono
            <input
                name="phone"
                value={formState.phone}
                onChange={onChange}
            />
        </label>

        <label>Mensaje
            <textarea
                name="message"
                rows={5}
                value={formState.message}
                onChange={onChange}
            />
        </label>

      {error && (
        <p className="error">
          {error}
        </p>
      )}
      {ok && (
        <p className="success">
          ¡Gracias! Tu mensaje fue enviado.
        </p>
      )}

      <button
      className="btn btn__redirect--primary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}