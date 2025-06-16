// home.js

const searchInput = document.getElementById("searchInput"); const autocompleteList = document.getElementById("autocomplete-list"); const priceResults = document.getElementById("priceResults"); const toggleThemeBtn = document.getElementById("toggle-theme"); const body = document.body;

const mockData = [ { name: "Fortune Sunflower Oil 1L", brand: "Fortune", weight: "1L", prices: { Blinkit: 120, Zepto: 125, }, }, { name: "Aashirvaad Atta 5kg", brand: "Aashirvaad", weight: "5kg", prices: { Blinkit: 240, Zepto: 235, }, }, { name: "Tata Salt 1kg", brand: "Tata", weight: "1kg", prices: { Blinkit: 22, Zepto: 21, }, }, ];

searchInput.addEventListener("input", () => { const input = searchInput.value.toLowerCase(); autocompleteList.innerHTML = ""; if (!input) return;

const matches = mockData.filter((item) => item.name.toLowerCase().includes(input)); matches.forEach((item) => { const li = document.createElement("li"); li.textContent = item.name; li.addEventListener("click", () => { searchInput.value = item.name; autocompleteList.innerHTML = ""; showPriceComparison(item); }); autocompleteList.appendChild(li); }); });

function showPriceComparison(item) { priceResults.innerHTML = <div class="price-card"> <h3>${item.name}</h3> <p><strong>Brand:</strong> ${item.brand}</p> <p><strong>Weight:</strong> ${item.weight}</p> <div class="platforms"> ${Object.entries(item.prices) .map( ([platform, price]) => <div class="platform"> <p><strong>${platform}:</strong> ₹${price}</p> <button onclick="addToCart('${item.name}', '${platform}', ${price})">Add to Cart</button> </div>) .join("")} </div> </div>; }

function addToCart(name, platform, price) { alert(${name} from ${platform} added to cart at ₹${price}); }

toggleThemeBtn.addEventListener("click", () => { body.classList.toggle("dark"); toggleThemeBtn.textContent = body.classList.contains("dark") ? "Light Mode" : "Dark Mode"; });

