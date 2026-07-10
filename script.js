const products = [
  {
    id: "brass-products",
    name: "Brass Products",
    category: "Brass Products",
    rating: 4.9,
    origin: "India",
    image: "https://images.unsplash.com/photo-1600421680010-0766ff230392?auto=format&fit=crop&w=800&q=80",
    description: "Premium brass decor pieces for pooja rooms, shelves, consoles, and gifting.",
    sizes: [
      { label: "Small", price: 1499, stock: 12 },
      { label: "Medium", price: 2499, stock: 9 },
      { label: "Large", price: 3999, stock: 5 },
    ],
    colors: ["Antique Brass", "Golden", "Copper Finish"],
  },
  {
    id: "wall-clocks",
    name: "Wall Clocks",
    category: "Wall Clocks",
    rating: 4.8,
    origin: "India",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    description: "Decorative wall clocks for living rooms, offices, hotels, and housewarming gifts.",
    sizes: [
      { label: "12 inch", price: 1899, stock: 10 },
      { label: "18 inch", price: 2899, stock: 8 },
      { label: "24 inch", price: 4499, stock: 4 },
    ],
    colors: ["Brown", "Black", "Gold"],
  },
  {
    id: "metal-items",
    name: "Metal Items",
    category: "Metal Items",
    rating: 4.7,
    origin: "India",
    image: "https://images.unsplash.com/photo-1513519683267-4ee6761728ac?auto=format&fit=crop&w=800&q=80",
    description: "Stylish metal decor items for tables, showcases, entryways, and festive gifting.",
    sizes: [
      { label: "Small", price: 999, stock: 18 },
      { label: "Medium", price: 1799, stock: 12 },
      { label: "Large", price: 2999, stock: 7 },
    ],
    colors: ["Silver", "Gold", "Black"],
  },
  {
    id: "polished-statues",
    name: "Polished Statues",
    category: "Polished Statues",
    rating: 4.9,
    origin: "India",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80",
    description: "Finely polished statues with elegant finishing for home temples and decor corners.",
    sizes: [
      { label: "6 inch", price: 1299, stock: 14 },
      { label: "9 inch", price: 2299, stock: 9 },
      { label: "12 inch", price: 3499, stock: 6 },
    ],
    colors: ["Gold", "Bronze", "Marble White"],
  },
  {
    id: "gold-plated-cabinet",
    name: "Gold Plated Cabinet",
    category: "Gold Plated Cabinet",
    rating: 4.6,
    origin: "India",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    description: "Statement gold plated cabinets for premium display, storage, and luxury interiors.",
    sizes: [
      { label: "2 Door", price: 12999, stock: 4 },
      { label: "3 Door", price: 18999, stock: 3 },
      { label: "4 Door", price: 24999, stock: 2 },
    ],
    colors: ["Gold", "Rose Gold", "Champagne"],
  },
  {
    id: "glass-candle-stands",
    name: "Glass Candle Stands",
    category: "Glass Candle Stands",
    rating: 4.8,
    origin: "India",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=800&q=80",
    description: "Glass candle stands for dining tables, festive lighting, events, and gifting.",
    sizes: [
      { label: "Single", price: 699, stock: 20 },
      { label: "Set of 2", price: 1299, stock: 15 },
      { label: "Set of 4", price: 2399, stock: 10 },
    ],
    colors: ["Clear", "Amber", "Smoke Grey"],
  },
  {
    id: "dry-flower-sticks",
    name: "Dry Flower Sticks",
    category: "Dry Flower Sticks",
    rating: 4.5,
    origin: "India",
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80",
    description: "Decorative dry flower sticks for vases, bouquets, event decor, and room styling.",
    sizes: [
      { label: "Pack of 10", price: 399, stock: 25 },
      { label: "Pack of 25", price: 899, stock: 18 },
      { label: "Pack of 50", price: 1599, stock: 10 },
    ],
    colors: ["Natural", "Red", "Yellow", "Purple"],
  },
];

const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const productGrid = document.querySelector("[data-products]");
const categorySelect = document.querySelector("[data-category]");
const searchInput = document.querySelector("[data-search]");
const sortSelect = document.querySelector("[data-sort]");
const emptyState = document.querySelector("[data-empty]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const subtotalEl = document.querySelector("[data-subtotal]");
const shippingEl = document.querySelector("[data-shipping]");
const totalEl = document.querySelector("[data-total]");
const checkoutNote = document.querySelector("[data-checkout-note]");
const contactNote = document.querySelector("[data-contact-note]");
const loginDrawer = document.querySelector("[data-login-drawer]");
const loginButton = document.querySelector("[data-open-login]");
const loginNote = document.querySelector("[data-login-note]");
let cart = JSON.parse(localStorage.getItem("vijeshHandicraftCart") || "[]");
let customer = JSON.parse(localStorage.getItem("vijeshHandicraftCustomer") || "null");

function saveCart() {
  localStorage.setItem("vijeshHandicraftCart", JSON.stringify(cart));
}

function renderCategories() {
  [...new Set(products.map((product) => product.category))].sort().forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function getFilteredProducts() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;
  const filtered = products.filter((product) => {
    const text = `${product.name} ${product.category} ${product.origin} ${product.description} ${product.colors.join(" ")} ${product.sizes.map((size) => size.label).join(" ")}`.toLowerCase();
    return (category === "all" || product.category === category) && text.includes(term);
  });

  return filtered.sort((a, b) => {
    if (sort === "price-asc") return getStartingPrice(a) - getStartingPrice(b);
    if (sort === "price-desc") return getStartingPrice(b) - getStartingPrice(a);
    if (sort === "rating") return b.rating - a.rating;
    return products.indexOf(a) - products.indexOf(b);
  });
}

function renderProducts() {
  const visibleProducts = getFilteredProducts();
  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const defaultSize = product.sizes[0].label;
      const defaultColor = product.colors[0];
      const remaining = getRemainingStock(product, defaultSize, defaultColor);
      return `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-info">
            <div class="product-meta"><span>${product.category}</span><span>★ ${product.rating}</span></div>
            <h3>${product.name}</h3>
            <div class="product-meta"><span>${product.origin}</span><span data-stock="${product.id}">${remaining} left</span></div>
            <p>${product.description}</p>
            <div class="variant-fields">
              <label>
                <span>Size</span>
                <select data-size="${product.id}">
                  ${product.sizes.map((size) => `<option value="${size.label}">${size.label} - ${currency.format(size.price)}</option>`).join("")}
                </select>
              </label>
              <label>
                <span>Color</span>
                <select data-color="${product.id}">
                  ${product.colors.map((color) => `<option value="${color}">${color}</option>`).join("")}
                </select>
              </label>
            </div>
            <div class="product-footer">
              <span class="price" data-price="${product.id}">${currency.format(getVariantPrice(product, defaultSize))}</span>
              <button class="add-button" type="button" data-add="${product.id}" ${remaining <= 0 ? "disabled" : ""}>
                ${remaining <= 0 ? "Sold Out" : "Add"}
              </button>
            </div>
          </div>
        </article>`;
    })
    .join("");
  emptyState.hidden = visibleProducts.length > 0;
}

function getStartingPrice(product) {
  return Math.min(...product.sizes.map((size) => size.price));
}

function getVariant(product, sizeLabel) {
  return product.sizes.find((size) => size.label === sizeLabel) || product.sizes[0];
}

function getVariantPrice(product, sizeLabel) {
  return getVariant(product, sizeLabel).price;
}

function getCartKey(item) {
  return `${item.id}__${item.size}__${item.color}`;
}

function getRemainingStock(product, sizeLabel, color) {
  const variant = getVariant(product, sizeLabel);
  const usedStock = cart
    .filter((cartItem) => cartItem.id === product.id && cartItem.size === sizeLabel && cartItem.color === color)
    .reduce((sum, item) => sum + item.quantity, 0);
  return variant.stock - usedStock;
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const size = document.querySelector(`[data-size="${productId}"]`)?.value || product.sizes[0].label;
  const color = document.querySelector(`[data-color="${productId}"]`)?.value || product.colors[0];
  if (getRemainingStock(product, size, color) <= 0) return;
  const item = cart.find((cartItem) => cartItem.id === productId && cartItem.size === size && cartItem.color === color);
  if (item) item.quantity += 1;
  else cart.push({ id: productId, size, color, quantity: 1 });
  saveCart();
  renderCart();
  renderProducts();
  openCart();
}

function updateQuantity(cartKey, change) {
  const item = cart.find((cartItem) => getCartKey(cartItem) === cartKey);
  const product = products.find((entry) => entry.id === item?.id);
  if (!product || !item) return;
  const variant = getVariant(product, item.size);
  item.quantity = Math.min(variant.stock, item.quantity + change);
  if (item.quantity <= 0) cart = cart.filter((cartItem) => getCartKey(cartItem) !== cartKey);
  saveCart();
  renderCart();
  renderProducts();
}

function removeFromCart(cartKey) {
  cart = cart.filter((item) => getCartKey(item) !== cartKey);
  saveCart();
  renderCart();
  renderProducts();
}

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? getVariantPrice(product, item.size) * item.quantity : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 149;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  cart = cart.filter((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return product && item.size && item.color && product.sizes.some((size) => size.label === item.size) && product.colors.includes(item.color);
  });
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-state">Your cart is empty. Add a handcrafted treasure first.</p>`;
  } else {
    cartItems.innerHTML = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        const cartKey = getCartKey(item);
        return `
          <article class="cart-item">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h3>${product.name}</h3>
              <p>${item.size} · ${item.color}</p>
              <p>${currency.format(getVariantPrice(product, item.size))} each</p>
              <div class="cart-row">
                <div class="qty" aria-label="Quantity controls for ${product.name}">
                  <button type="button" data-qty="${cartKey}" data-change="-1">−</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-qty="${cartKey}" data-change="1">+</button>
                </div>
                <button class="remove-button" type="button" data-remove="${cartKey}">Remove</button>
              </div>
            </div>
          </article>`;
      })
      .join("");
  }

  const totals = getCartTotals();
  subtotalEl.textContent = currency.format(totals.subtotal);
  shippingEl.textContent = totals.shipping === 0 ? "Free" : currency.format(totals.shipping);
  totalEl.textContent = currency.format(totals.total);
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function openLogin() {
  loginDrawer.classList.add("open");
  loginDrawer.setAttribute("aria-hidden", "false");
}

function closeLogin() {
  loginDrawer.classList.remove("open");
  loginDrawer.setAttribute("aria-hidden", "true");
}

function renderLogin() {
  loginButton.textContent = customer?.whatsapp ? `WhatsApp: ${customer.whatsapp}` : "Login";
  const checkoutWhatsApp = document.querySelector("[data-checkout-whatsapp]");
  if (customer?.whatsapp && checkoutWhatsApp) checkoutWhatsApp.value = customer.whatsapp;
}

function placeOrder(event) {
  event.preventDefault();
  if (cart.length === 0) {
    checkoutNote.textContent = "Add at least one item before checkout.";
    return;
  }
  if (!customer?.whatsapp) {
    checkoutNote.textContent = "Please login with your WhatsApp number before placing the order.";
    openLogin();
    return;
  }
  const formData = new FormData(event.currentTarget);
  if (customer?.whatsapp) formData.set("whatsapp", customer.whatsapp);
  const order = {
    id: `VH-${Date.now()}`,
    customer: Object.fromEntries(formData.entries()),
    items: cart.map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.id).name,
      price: getVariantPrice(products.find((product) => product.id === item.id), item.size),
    })),
    totals: getCartTotals(),
    createdAt: new Date().toISOString(),
  };
  const orders = JSON.parse(localStorage.getItem("vijeshHandicraftOrders") || "[]");
  orders.push(order);
  localStorage.setItem("vijeshHandicraftOrders", JSON.stringify(orders));
  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  event.currentTarget.reset();
  renderLogin();
  checkoutNote.textContent = `Order ${order.id} placed! We saved your WhatsApp number for order follow-up.`;
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

productGrid.addEventListener("change", (event) => {
  const productId = event.target.dataset.size || event.target.dataset.color;
  if (!productId) return;
  const product = products.find((item) => item.id === productId);
  const size = document.querySelector(`[data-size="${productId}"]`)?.value || product.sizes[0].label;
  const color = document.querySelector(`[data-color="${productId}"]`)?.value || product.colors[0];
  const remaining = getRemainingStock(product, size, color);
  document.querySelector(`[data-price="${productId}"]`).textContent = currency.format(getVariantPrice(product, size));
  document.querySelector(`[data-stock="${productId}"]`).textContent = `${remaining} left`;
  const addButton = document.querySelector(`[data-add="${productId}"]`);
  addButton.disabled = remaining <= 0;
  addButton.textContent = remaining <= 0 ? "Sold Out" : "Add";
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) updateQuantity(quantityButton.dataset.qty, Number(quantityButton.dataset.change));
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

[searchInput, categorySelect, sortSelect].forEach((control) => control.addEventListener("input", renderProducts));
document.querySelector("[data-open-cart]").addEventListener("click", openCart);
document.querySelector("[data-close-cart]").addEventListener("click", closeCart);
document.querySelector("[data-open-login]").addEventListener("click", openLogin);
document.querySelector("[data-close-login]").addEventListener("click", closeLogin);
cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
});
loginDrawer.addEventListener("click", (event) => {
  if (event.target === loginDrawer) closeLogin();
});
document.querySelector("[data-checkout-form]").addEventListener("submit", placeOrder);
document.querySelector("[data-login-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  customer = { whatsapp: formData.get("whatsapp").trim() };
  localStorage.setItem("vijeshHandicraftCustomer", JSON.stringify(customer));
  loginNote.textContent = "Logged in with WhatsApp number.";
  renderLogin();
  setTimeout(closeLogin, 700);
});
document.querySelector("[data-contact-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  contactNote.textContent = "Thanks! Your request is saved for the site owner to connect to email/backend.";
});
document.querySelector("[data-nav-links]").addEventListener("click", () => {
  document.querySelector("[data-nav-links]").classList.remove("open");
  document.querySelector(".nav-toggle").setAttribute("aria-expanded", "false");
});
document.querySelector(".nav-toggle").addEventListener("click", (event) => {
  const links = document.querySelector("[data-nav-links]");
  links.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(links.classList.contains("open")));
});

renderCategories();
renderLogin();
renderCart();
renderProducts();
