const products = [
  "Aashirvaad Atta",
  "Fortune Oil",
  "Tata Salt",
  "Amul Milk",
  "Surf Excel",
  "Maggie Noodles",
  "Dove Shampoo",
  "Colgate Toothpaste",
  "Red Label Tea"
];

const searchInput = document.getElementById("search-bar");
const autocompleteList = document.getElementById("autocomplete-list");
const resultsContainer = document.getElementById("priceResults");

// Theme toggle logic
const themeToggle = document.getElementById('toggle-theme');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
body.className = savedTheme;
themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  body.className = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? 'Dark Mode' : 'Light Mode';
});

// Autocomplete logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  autocompleteList.innerHTML = "";

  if (query.length === 0) return;

  const filtered = products.filter(product =>
    product.toLowerCase().includes(query)
  );

  filtered.forEach(product => {
    const li = document.createElement("li");
    li.textContent = product;
    li.addEventListener("click", () => {
      searchInput.value = product;
      autocompleteList.innerHTML = "";
      displayMockPrices(product);
    });
    autocompleteList.appendChild(li);
  });
});

// Mock price display
function displayMockPrices(productName) {
  const mockData = {
    "Aashirvaad Atta": {
      weight: "5kg",
      prices: {
        Blinkit: 260,
        Zepto: 255,
        BigBasket: 250
      }
    },
    "Fortune Oil": {
      weight: "1L",
      prices: {
        Blinkit: 135,
        Zepto: 132,
        BigBasket: 130
      }
    }
    // Add more items as needed
  };

  const data = mockData[productName];
  resultsContainer.innerHTML = "";

  if (!data) {
    resultsContainer.innerHTML = "<p>No price data available.</p>";
    return;
  }

  const lowest = Math.min(...Object.values(data.prices));

  const card = document.createElement("div");
  card.className = "price-card";

  card.innerHTML = `
    <h3>${productName}</h3>
    <p>Weight: ${data.weight}</p>
    <ul>
      ${Object.entries(data.prices)
        .map(
          ([platform, price]) =>
            `<li>${platform}: ₹${price} ${
              price === lowest ? "<strong>(Lowest)</strong>" : ""
            }</li>`
        )
        .join("")}
    </ul>
  `;

  resultsContainer.appendChild(card);
}
