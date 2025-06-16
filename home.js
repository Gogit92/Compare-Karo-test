// === Mock product list for autocomplete ===
const mockProductNames = [
  "Milk", "Atta", "Bread", "Eggs", "Butter", "Rice", "Oil", "Tomato", "Potato", "Onion"
];

// === Mock prices for display ===
const mockPrices = [
  { platform: "Blinkit", price: 49, weight: "500g", url: "#" },
  { platform: "Zepto", price: 47, weight: "500g", url: "#" },
  { platform: "BigBasket", price: 51, weight: "500g", url: "#" }
];

// === Autocomplete feature ===
const searchInput = document.getElementById("searchInput");
const autocompleteList = document.getElementById("autocomplete-list");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  autocompleteList.innerHTML = "";

  if (query.length < 2) return;

  const matches = mockProductNames.filter(item => item.toLowerCase().includes(query));

  matches.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      searchInput.value = item;
      autocompleteList.innerHTML = "";
      renderPriceComparison(item);
    });
    autocompleteList.appendChild(li);
  });
});

// === Price comparison cards ===
function renderPriceComparison(query) {
  const container = document.getElementById("priceResults");
  container.innerHTML = "";

  mockPrices.forEach((item) => {
    const card = document.createElement("div");
    card.className = "rounded-2xl shadow-md p-4 bg-white dark:bg-gray-800";

    card.innerHTML = `
      <h3 class="text-lg font-semibold mb-1">${item.platform}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300">${item.weight}</p>
      <p class="text-xl font-bold text-green-600 dark:text-green-400">₹${item.price}</p>
      <button class="mt-2 px-4 py-1 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 cursor-not-allowed" disabled>Shop Now</button>
    `;

    container.appendChild(card);
  });
}

// === Manual trigger when typing finished ===
searchInput.addEventListener("change", (e) => {
  const query = e.target.value;
  if (query.length > 2) renderPriceComparison(query);
});
