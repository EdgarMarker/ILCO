import React from "react";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import RedirectButton from "@/common/components/buttons/RedirectButton";

import "./page.css";
import PreFooter from "@/common/components/footer/PreFooter";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";




const page = async () => {
	const rawData = await getCompanyData();
	const data= new CompanyModel(rawData);

	return (
		<main id="Privacy">
			
			{/* PRIVACY */}
			<section className="section__privacy fadeInOut">
				<div className="column__1">
                    <CustomPortableText
                        hasImg={false}
                        data={data.policy.list_block_post_policy_privacyNotice}
                    />
				</div>
			</section>
			
			<PreFooter />
		</main>
	);
};

export default page;
