import ResponsiveImage from "../images/ResponsiveImage";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";
import Link from "next/link";

export default async function Footer() {
	const rawData = await getCompanyData();
	const data= new CompanyModel(rawData);

	return (
		<footer>
			<div className="column__2">
                <div className="col__left">
                    <div className="foot__item">
                        <h3>Mapa del sitio</h3>
                        <ul>
                            <li>
                                <Link href="/">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/referentes">Referentes</Link>
                            </li>
                            <li>
                                <Link href="/contacto">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="foot__item">
                        <h3>Contacto</h3>
                        <ul role="list">
                            <li>
                                <Link href={`tel:${data.contact.string_line_contact_phone.replace(/\s+/g, '')}`}>
                                    {data.contact.string_line_contact_phone} / {data.contact.string_line_contact_phone}
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








                    <div className="foot__item">
                        <h3>Social</h3>
                        
                        <ul role="list">
                            {data.social.arr_list.map((item, index) => (
                                <li key={index ?? ""}>
                                    <Link href={item.url_social_url}>{item.string_line_social_name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col__right">
                    <Link href="/aviso-de-privacidad">Aviso de privacidad</Link>
                    <ResponsiveImage
                        imageData={data.general.icon_general_footerLogo}
                        variant="icon"
                    />
                </div>
			</div>

			<div className="column__1">
				<span>
					ILCO Constructores.{" "}
					<Link href="/aviso-de-privacidad">Aviso de Privacidad</Link>. Sitio
					web creado por{" "}
					<Link
						href="https://marker.com.mx"
						target="_blank"
						rel="noopener noreferrer"
					>
						Marker Branding
					</Link>
				</span>
			</div>
		</footer>
	);
}
