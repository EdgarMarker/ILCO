import useHubspotForm from "@/common/hooks/useHubspot";
import { FORM_INSTANCES } from "@/common/utils/helper-hubspot";

const FormContact = () => {
	const formConfig = FORM_INSTANCES.PRODUCT;

	const {
		register,
		handleSubmit,
		submissionState,
		formState: { errors },
	} = useHubspotForm(formConfig);

	return (
		<form onSubmit={handleSubmit}>
			{/* Base labels */}
			{formConfig.fields.slice(0, 5).map((field) => (
				<label key={field.name} className="block">
					<span>{field.label}</span>
					<input
						{...register(field.name)}
						type={field.type}
						className="w-full p-2 border rounded"
					/>
					{errors[field.name] && (
						<span className="text-red-500">
							{errors[field.name]?.message as string}
						</span>
					)}
				</label>
			))}

			{/* Custom field */}
			<label className="block">
				<span>{formConfig.fields[formConfig.fields.length - 2].label}</span>
				<textarea
					{...register(formConfig.fields[formConfig.fields.length - 2].name)}
					rows={4}
				/>
				{errors[formConfig.fields[formConfig.fields.length - 2].name] && (
					<span>
						{
							errors[formConfig.fields[formConfig.fields.length - 2].name]
								?.message as string
						}
					</span>
				)}
			</label>

			{/* Base message */}
			<label className="block">
				<span>{formConfig.fields[formConfig.fields.length - 1].label}</span>
				<textarea
					{...register(formConfig.fields[formConfig.fields.length - 1].name)}
					rows={4}
				/>
				{errors[formConfig.fields[formConfig.fields.length - 1].name] && (
					<span>
						{
							errors[formConfig.fields[formConfig.fields.length - 1].name]
								?.message as string
						}
					</span>
				)}
			</label>

			<button type="submit" disabled={submissionState.isSubmitting}>
				{submissionState.isSubmitting ? "Enviando..." : "Enviar"}
			</button>
		</form>
	);
};

export default FormContact;
