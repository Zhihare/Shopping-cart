import instruments from "./products.json" assert { type: "json" };
import { createMarkup } from "./tamplates/product.js";

console.log(instruments);

const refs = {
	productslist: document.getElementById("productsList"),

}

const PRODUCT_LS_KEY = "checkout";

refs.productslist.insertAdjacentHTML("beforeend", createMarkup(instruments));
refs.productslist.addEventListener("click", handleAdd);

function handleAdd(event) {
	if (event.target.id !== "addBtn") {
		return;
	}

	const product = event.target.closest("#product");
	const productId = Number(product.dataset.id);
	const currentProduct = instruments.find(({ id }) => id === productId);
	const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) ?? [];
	console.log(products)
	const checkoutProductId = products.findIndex(({ id }) => id === productId);
	console.log(checkoutProductId);

	if (checkoutProductId === -1) {
		currentProduct.quantity = 1;
		products.push(currentProduct);
	} else {
		products[checkoutProductId].quantity += 1;
	}

	localStorage.setItem(PRODUCT_LS_KEY, JSON.stringify(products));
}
