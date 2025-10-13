import company from "./company";
import catalogPage from "./pages/catalog/catalogPage";
import {
	blogPage,
	homePage,
	post,
	postAuthor,
	postCategory,
	product,
	productCategory,
} from "./pages/index";

export const schemaTypes = [
	homePage,
	catalogPage,
	product,
	productCategory,
	blogPage,
	post,
	postAuthor,
	postCategory,
	company,
];
