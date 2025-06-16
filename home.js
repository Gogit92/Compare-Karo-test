// home.js

const products = [
  {
    name: "Fortune Rice Bran Oil 1L",
    brand: "Fortune",
    weight: "1L",
    prices: {
      Blinkit: "₹135",
      Zepto: "₹132",
      BigBasket: "₹134",
    },
  },
  {
    name: "Tata Salt 1kg",
    brand: "Tata",
    weight: "1kg",
    prices: {
      Blinkit: "₹28",
      Zepto: "₹27",
      BigBasket: "₹29",
    },
  },
  {
    name: "Aashirvaad Atta 5kg",
    brand: "Aashirvaad",
    weight: "5kg",
    prices: {
      Blinkit: "₹250",
      Zepto: "₹245",
      BigBasket: "₹248",
    },
  },
];

const searchBar = document.getElementById("search-bar");
const autocompleteList = document.getElementById("autocomplete-list");
const priceResults = document.getElementById("priceResults");

searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  autocompleteList.innerHTML = "";

  if (query.length === 0) {
    priceResults.innerHTML = "";
    return;
  }

  const matches = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  matches.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = product.name;
    li.addEventListener("click", () => {
      searchBar.value = product.name;
      autocompleteList.innerHTML = "";
      displayPrices(product);
    });
    autocompleteList.appendChild(li);
  });
});

function displayPrices(product) {
  priceResults.innerHTML = `
    <div class="product-card">
      <h3>${product.name}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Weight:</strong> ${product.weight}</p>
      <div class="platform-prices">
        ${Object.entries(product.prices)
          .map(
            ([platform, price]) =>
              `<div class="platform-price"><strong>${platform}:</strong> ${price}</div>`
          )
          .join("")}
      </div>
    </div>
  `;
}

// Dark Mode Toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "Dark" : "Light";
  document.getElementById("toggle-theme").textContent = `${mode} Mode`;
});
