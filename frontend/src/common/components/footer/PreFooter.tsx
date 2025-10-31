import ResponsiveImage from "../images/ResponsiveImage";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";
import Link from "next/link";
import HubspotForm from "../forms/HubspotForm";

export default async function PreFooter() {
	const rawData = await getCompanyData();
	const data= new CompanyModel(rawData);

	return (
        <section id="PreFooter" className="section__prefooter">
            <div className="column__2">
                <div className="col__left fadeInOut">
                    <h3>Contáctanos</h3>
                    <h2>Estamos para ayudarte con cualquier duda</h2>
					<ul role="list">
						<li>
							<Link href={`tel:${data.contact.string_line_contact_phone.replace(/\s+/g, '')}`}>
								{data.contact.string_line_contact_phone}
							</Link>
						</li>
						<li>
							<Link href={`mailto:${data.contact.string_line_contact_email}`}>
								{data.contact.string_line_contact_email}
							</Link>
						</li>
						<li>
							<Link
								href={`${data.location.url_location_googleMaps}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{data.contact.string_line_contact_address}
							</Link>
						</li>
					</ul>
                </div>
                <div className="col__right">
                    <HubspotForm />
                </div>
            </div>
        </section>
	);
}
