const toggle = document.getElementById('toggle-theme');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  document.getElementById('cart').classList.toggle('dark');
});

// Dummy autocomplete data
const products = ["Apple", "Banana", "Bread", "Butter", "Cheese", "Atta", "Rice", "Paneer", "Tomato", "Oil"];
const searchBar = document.getElementById('search-bar');
const acList = document.getElementById('autocomplete-list');

searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  acList.innerHTML = '';
  if (!query) return;

  const matches = products.filter(p => p.toLowerCase().includes(query)).slice(0, 6);

  matches.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click', () => {
      alert(`Selected: ${item}`);
    });
    acList.appendChild(li);
  });
});
