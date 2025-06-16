// -----------------------------
// 🔄 Dark/Light Mode Toggle
// -----------------------------
const body = document.body;
const toggleTheme = document.getElementById("toggle-theme");

toggleTheme.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleTheme.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// -----------------------------
// 🔍 Product Search & Autocomplete
// -----------------------------
const products = [
  { name: "Milk", prices: { Blinkit: 52, Zepto: 50 }, brand: "Amul", weight: "1L" },
  { name: "Bread", prices: { Blinkit: 25, Zepto: 24 }, brand: "Britannia", weight: "400g" },
  { name: "Eggs", prices: { Blinkit: 65, Zepto: 63 }, brand: "Local", weight: "6 pcs" },
  { name: "Rice", prices: { Blinkit: 78, Zepto: 75 }, brand: "India Gate", weight: "1kg" },
  { name: "Butter", prices: { Blinkit: 95, Zepto: 92 }, brand: "Amul", weight: "100g" },
  { name: "Oil", prices: { Blinkit: 110, Zepto: 105 }, brand: "Fortune", weight: "1L" },
];

const searchBar = document.getElementById("search-bar");
const autocompleteList = document.getElementById("autocomplete-list");
const priceResults = document.getElementById("priceResults");

// Handle input for autocomplete
searchBar.addEventListener("input", () => {
  const input = searchBar.value.toLowerCase();
  autocompleteList.innerHTML = "";
  priceResults.innerHTML = "";

  if (!input) return;

  const matches = products.filter(p => p.name.toLowerCase().includes(input));
  matches.forEach(product => {
    const li = document.createElement("li");
    li.textContent = product.name;
    li.addEventListener("click", () => {
      searchBar.value = product.name;
      autocompleteList.innerHTML = "";
      showPrices(product);
    });
    autocompleteList.appendChild(li);
  });
});

// -----------------------------
// 💰 Display Price Comparison Cards
// -----------------------------
function showPrices(product) {
  priceResults.innerHTML = `
    <div class="price-card">
      <h3>${product.name}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Weight:</strong> ${product.weight}</p>
      <p><strong>Blinkit:</strong> ₹${product.prices.Blinkit}</p>
      <p><strong>Zepto:</strong> ₹${product.prices.Zepto}</p>
      <button onclick="addToCart('${product.name}')">Add to Cart</button>
    </div>`;
}

// -----------------------------
// 🛒 Cart Functions (with LocalStorage)
// -----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName) {
  const product = products.find(p => p.name === productName);
  const existing = cart.find(item => item.name === productName);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${product.name} added to cart`);
}

// -----------------------------
// ✅ Toast Message
// -----------------------------
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 16px";
  toast.style.borderRadius = "6px";
  toast.style.zIndex = "999";
  toast.style.opacity = "0.95";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
