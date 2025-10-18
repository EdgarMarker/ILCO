import React from "react";

interface Props {
	type: "primary" | "secondary" | "tertiary";
	children: React.ReactNode;
	href: string;
}
const RedirectButton = ({ type, href, children }: Props) => {
	return (
		<a href={href} className={`btn btn__redirect--${type}`}>
			{children}
		</a>
	);
};

export default RedirectButton;
