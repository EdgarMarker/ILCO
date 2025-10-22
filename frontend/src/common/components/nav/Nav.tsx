/** biome-ignore-all lint/a11y/useSemanticElements: <custom ul> */
/** biome-ignore-all lint/a11y/noRedundantRoles: <custom ul> */
"use client";
import Link from "next/link";
import type { CompanyModel } from "@/_domain/models/company.model";
import { useNavigation } from "@/common/hooks/useNavigation";
import ResponsiveImage from "../images/ResponsiveImage";
import "./Nav.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.ejemplo.com";

interface Props {
	companyData?: CompanyModel;
}

const Nav = ({ companyData }: Props) => {
	const {
		isMenuOpen,
		menuRef,
		toggleRef,
		toggleMenu,
		closeMenu,
		isLinkActive,
		navItems,
	} = useNavigation();

	return (
		<header>
			<nav>
				<Link href="/" className="logo" aria-label="Ir al inicio">
					{companyData?.general.icon_general_navLogo ? (
						<ResponsiveImage
							imageData={companyData?.general.icon_general_navLogo}
							variant="icon"
						/>
					) : (
						<span>LOGO</span>
					)}
				</Link>

				<ul role="list" className="nav-links">
					{navItems.map((item) => {
						const active = isLinkActive(item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`nav-link ${active ? "active" : ""}`}
									aria-current={active ? "page" : undefined}
								>
									{item.title}
								</Link>
							</li>
						);
					})}
				</ul>

				<button
					ref={toggleRef}
					type="button"
					className={`nav-toggle ${isMenuOpen ? "active" : ""}`}
					aria-controls="mobile-menu"
					aria-expanded={isMenuOpen}
					onClick={toggleMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</nav>

			<div
				ref={menuRef}
				id="mobile-menu"
				className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
			>
				<ul role="list">
					{navItems.map((item) => {
						const active = isLinkActive(item.href);
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={`mobile-link ${active ? "active" : ""}`}
									aria-current={active ? "page" : undefined}
									onClick={closeMenu}
								>
									{item.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</header>
	);
};

export default Nav;
