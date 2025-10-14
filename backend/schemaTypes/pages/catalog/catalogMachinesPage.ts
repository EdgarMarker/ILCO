import { createSection } from "../../../utils/helper-createSection";
import { HERO, listBlockText, SEO } from "../../modules/modules";

const SECTIONS = [
    {
        group: { name: "machines", title: "Sección de máquinas" },
        fields: [
            listBlockText({
                type: "title",
                context: "machines",
                purpose: "title",
                title: "Título y introducción",
            }),
        ],
    },
];

export default {
    name: "catalogMachinesPage",
    type: "document",
    groups: [
        {
            name: "hero",
            title: "Cabecera",
        },
        ...SECTIONS.map(({ group }) => group),
        {
            name: "seo",
            title: "SEO",
        },
    ],
    fields: [
        HERO(),
        ...SECTIONS.map(({ group, fields }) => createSection(group, fields)),
        SEO(),
    ],
    preview: {
        select: {
            title: "hero.string_h1",
        },
    },
};