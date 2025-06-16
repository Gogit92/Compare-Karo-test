const searchBar = document.getElementById("search-bar");
const autocompleteList = document.getElementById("autocomplete-list");
const priceResults = document.getElementById("priceResults");
const themeToggleBtn = document.getElementById("toggle-theme");

// Predefined products
const products = [
  { name: "Aashirvaad Atta", weight: "5kg" },
  { name: "Fortune Rice Bran Oil", weight: "1L" },
  { name: "Tata Salt", weight: "1kg" },
  { name: "Colgate Toothpaste", weight: "200g" },
];

// Mock price data for comparison
const mockPrices = {
  "Aashirvaad Atta": { Blinkit: 250, Zepto: 245, BigBasket: 260 },
  "Fortune Rice Bran Oil": { Blinkit: 135, Zepto: 132, BigBasket: 130 },
  "Tata Salt": { Blinkit: 25, Zepto: 24, BigBasket: 26 },
  "Colgate Toothpaste": { Blinkit: 90, Zepto: 88, BigBasket: 92 },
};

// === Autocomplete functionality ===
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  autocompleteList.innerHTML = "";

  if (!query) return;

  products
    .filter(p => p.name.toLowerCase().includes(query))
    .forEach(product => {
      const li = document.createElement("li");
      li.textContent = product.name;
      li.addEventListener("click", () => {
        searchBar.value = product.name;
        autocompleteList.innerHTML = "";
        showPrices(product.name);
      });
      autocompleteList.appendChild(li);
    });
});

// === Price comparison display ===
function showPrices(productName) {
  priceResults.innerHTML = "";
  const prices = mockPrices[productName];
  if (!prices) {
    priceResults.innerHTML = "<p>No price data available.</p>";
    return;
  }

  const lowest = Math.min(...Object.values(prices));

  Object.entries(prices).forEach(([platform, price]) => {
    const card = document.createElement("div");
    card.className = "price-card";
    card.innerHTML = `
      <h3>${platform}</h3>
      <p>${productName}</p>
      <strong>₹${price} ${price === lowest ? "<span>(Lowest)</span>" : ""}</strong>
    `;
    priceResults.appendChild(card);
  });
}

// === Theme toggle logic ===
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  document.body.classList.toggle("light", !isDark);
  themeToggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});
