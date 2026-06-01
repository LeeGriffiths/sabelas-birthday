let allProducts = [];

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    render("All");
    buildNav();
  });

function buildNav() {
  const categories = ["All", ...new Set(allProducts.map(p => p.category))];

  const nav = document.getElementById("nav");

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;

    btn.onclick = () => render(cat);

    nav.appendChild(btn);
  });
}

function render(category) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const filtered = category === "All"
    ? allProducts
    : allProducts.filter(p => p.category === category);

  filtered.forEach(product => {
    const a = document.createElement("a");
    a.className = "item";
    a.href = product.link;
    a.target = "_blank";

    a.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="title">${product.name}</div>
    `;

    grid.appendChild(a);
  });
}
