import { createMarkup } from "../tamplates/checkoutProduct.js";

const refs = {
	totalPrice: document.getElementById("totalPrice"),
	clearBtn: document.getElementById("clearBtn"),
	checkoutList: document.getElementById("checkoutList"),
};

const PRODUCT_LS_KEY = "checkout";

const products = JSON.parse(localStorage.getItem(PRODUCT_LS_KEY)) ?? [];
let totalCost = 0;
if (products.length !== 0) {
	refs.clearBtn.hidden = false;
	totalCost = products.reduce((sum, { price, quantity }) => sum + quantity * price, 0
	);


}

refs.totalPrice.textContent =
	totalCost !== 0 ? `Total cost ${totalCost} UAH` : "Your cart is empty";

console.log(totalCost);

refs.checkoutList.insertAdjacentHTML("beforeend", createMarkup(products));

refs.clearBtn.addEventListener("click", clearCart);

function clearCart() {
	localStorage.removeItem(PRODUCT_LS_KEY);
	window.location.href = "../index.html"
}