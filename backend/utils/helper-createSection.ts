export const createSection = (
	groupData: { name: string; title: string },
	fields: any[] = [],
) => ({
	name: groupData.name,
	title: `${groupData.title}`,
	type: "object",
	group: groupData.name,
	fields,
});
