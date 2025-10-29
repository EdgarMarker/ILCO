import React from "react";
import { ContactPageModel } from "@/_domain/models/contact-page.model";
import { getContactPageData } from "@/_domain/services/contact-page.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";
import "./page.css"
import HubspotForm from "@/common/components/forms/HubspotForm";
import GoogleMap from "@/common/components/googlemaps/GoogleMap";
import { MapStyles } from "@/common/components/googlemaps/MapStyles";
import ContactHeroSection from "./components/ContactHeroSection";
import { serialize } from "@/common/utils/helper-serialize";

export const generateMetadata = async () => {
	const rawData = await getContactPageData();
	const data = new ContactPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getContactPageData();
	const rawCompanyData = await getCompanyData();

	const data = new ContactPageModel(rawData);
	const companyData = new CompanyModel(rawCompanyData);

	const center = {
		lat: companyData.location.number_location_latitude,   // number
		lng: companyData.location.number_location_longitude,  // number
	};
	return (
		<main id="Contact">
			<ContactHeroSection data={serialize(data)} />

			<section className="section__contact fadeInOut">
				<div className="column__2">
					<div className="col__left">
						<h3>Datos de contacto</h3>
						<h2>Contáctanos para recibir más información</h2>

						<ul role="list">
							<li>
								<a href={`tel:${companyData.contact.string_line_contact_phone}`}>
									{companyData.contact.string_line_contact_phone}
								</a>
							</li>
							<li>
								<a href={`mailto:${companyData.contact.string_line_contact_email}`}>
									{companyData.contact.string_line_contact_email}
								</a>
							</li>
							<li>
								<a href={companyData.location.url_location_googleMaps}>
									{companyData.contact.string_line_contact_address}
								</a>
							</li>
						</ul>
					</div>
					<div className="col__right">
						<HubspotForm />
					</div>
				</div>
			</section>

			<section className="section__map fadeInOut">
				<div className="column__1">
					<GoogleMap
					center={center}
					zoom={14}
					markerIconUrl="/icons/pin.svg"
					markerSize={56}
					styles={MapStyles}
					markerTitle="Oficinas"
					className="mapa"
					/>
				</div>
			</section>
		</main>
	);
};

export default page;
