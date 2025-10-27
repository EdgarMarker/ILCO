import { gsap } from "@/common/lib/gsap/manager.animation.js";
/**
 *? NOTA IMPORTANTE SOBRE ANIMACIONES EN NEXT.JS
 *
 *? Las animaciones deben ejecutarse siempre del lado del cliente.
 *? No puedes importar este archivo directamente en páginas server-side (como la página principal).
 *? Para animar, usa componentes marcados con "use client" y hooks como useEffect o useGSAP(Altamente recomendable, nos ayuda a sincronizar la animación con el ciclo de vida del componente).
 *TODO: Mi recomendación: crea componentes específicos para cada sección animada y aplica ahí la lógica de animación.
 *
 *? RESUMEN: Si quieres animar algo en Next.js, asegúrate de que el código esté en un componente cliente.
 */

export const Pulse = ({ section}) => {
    console.log("Mounted Animations")

	gsap.to(section, {
		backgroundColor: "#f0f0f0",
		scrollTrigger: {
			trigger: section,
			start: "top center",
			end: "bottom center",
			scrub: true,
            markers: true,
		},
	});
};

//* Para ejemplo practico de como usar esta animación, puedes consultar el componente HomeTestimonialSection.tsx