import React from "react";
import { ContactPageModel } from "@/_domain/models/contact-page.model";
import { getContactPageData } from "@/_domain/services/contact-page.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";

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
	return (
		<>
			<section className="section__hero">
				<div className="column__2">
					<div className="col__left">
						<h1>{data.hero.string_h1}</h1>
						<CustomPortableText
							hasImg={false}
							data={data.hero.list_block_title_hero_title}
						/>
					</div>
					<div className="col__right">
						<ResponsiveImage
							imageData={data.hero.img_hero_banner}
							variant="hero"
						/>
						<ResponsiveImage
							imageData={data.hero.img_hero_png}
							variant="banner"
						/>
					</div>
				</div>
			</section>

			<section className="section__contact">
				<div className="column__2">
					<div className="col__left">
						<h3>Contacto</h3>
						<h2>CONTÁCTANOS PARA RECIBIR MÁS INFORMACIÓN</h2>

						<a href={`tel:${companyData.contact.string_line_contact_phone}`}>
							{companyData.contact.string_line_contact_phone}
						</a>
						<a href={`mailto:${companyData.contact.string_line_contact_email}`}>
							{companyData.contact.string_line_contact_email}
						</a>
						<a href={companyData.location.url_location_googleMaps}>
							{companyData.contact.string_line_contact_address}
						</a>
					</div>
					<div className="col__right"></div>
				</div>
			</section>
		</>
	);
};

export default page;
