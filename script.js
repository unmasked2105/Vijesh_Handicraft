const products = [
  {
    id: "blue-clay-table-set",
    name: "Blue Clay Table Set",
    category: "Pottery",
    price: 89,
    rating: 4.9,
    stock: 8,
    origin: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=800&q=80",
    description: "Hand-thrown ceramic bowls finished with a cobalt glaze for everyday rituals.",
  },
  {
    id: "brass-lotus-lamp",
    name: "Brass Lotus Lamp",
    category: "Metalwork",
    price: 64,
    rating: 4.8,
    stock: 12,
    origin: "Moradabad, India",
    image: "https://images.unsplash.com/photo-1600421680010-0766ff230392?auto=format&fit=crop&w=800&q=80",
    description: "A warm brass diya-inspired lamp made for shelves, consoles, and ceremonies.",
  },
  {
    id: "woven-wool-runner",
    name: "Woven Wool Runner",
    category: "Textiles",
    price: 142,
    rating: 4.9,
    stock: 5,
    origin: "Kutch, India",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80",
    description: "Naturally dyed wool runner with geometric motifs and hand-knotted edges.",
  },
  {
    id: "walnut-tribal-mask",
    name: "Walnut Tribal Mask",
    category: "Woodcraft",
    price: 118,
    rating: 4.7,
    stock: 4,
    origin: "Nagaland, India",
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80",
    description: "Carved walnut wall mask with a matte beeswax finish and hanging loop.",
  },
  {
    id: "terracotta-vase-duo",
    name: "Terracotta Vase Duo",
    category: "Pottery",
    price: 76,
    rating: 4.6,
    stock: 10,
    origin: "Bankura, India",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    description: "Earthy terracotta vases shaped by hand and kiln-fired in small batches.",
  },
  {
    id: "silver-thread-necklace",
    name: "Silver Thread Necklace",
    category: "Jewelry",
    price: 52,
    rating: 4.8,
    stock: 15,
    origin: "Udaipur, India",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight necklace with hammered silver accents and adjustable cotton cord.",
  },
  {
    id: "hand-painted-keepsake-box",
    name: "Hand-Painted Keepsake Box",
    category: "Gifts",
    price: 38,
    rating: 4.5,
    stock: 18,
    origin: "Mysuru, India",
    image: "https://images.unsplash.com/photo-1513519683267-4ee6761728ac?auto=format&fit=crop&w=800&q=80",
    description: "Mango wood storage box painted with floral details and a velvet interior.",
  },
  {
    id: "bamboo-serving-tray",
    name: "Bamboo Serving Tray",
    category: "Homeware",
    price: 46,
    rating: 4.7,
    stock: 11,
    origin: "Assam, India",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    description: "Durable handwoven bamboo tray for tea service, hosting, and display.",
  },
];

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
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
let cart = JSON.parse(localStorage.getItem("vijeshHandicraftCart") || "[]");

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
    const text = `${product.name} ${product.category} ${product.origin} ${product.description}`.toLowerCase();
    return (category === "all" || product.category === category) && text.includes(term);
  });

  return filtered.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return products.indexOf(a) - products.indexOf(b);
  });
}

function renderProducts() {
  const visibleProducts = getFilteredProducts();
  productGrid.innerHTML = visibleProducts
    .map((product) => {
      const remaining = getRemainingStock(product);
      return `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-info">
            <div class="product-meta"><span>${product.category}</span><span>★ ${product.rating}</span></div>
            <h3>${product.name}</h3>
            <div class="product-meta"><span>${product.origin}</span><span>${remaining} left</span></div>
            <p>${product.description}</p>
            <div class="product-footer">
              <span class="price">${currency.format(product.price)}</span>
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

function getRemainingStock(product) {
  const item = cart.find((cartItem) => cartItem.id === product.id);
  return product.stock - (item?.quantity || 0);
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || getRemainingStock(product) <= 0) return;
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (item) item.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart();
  renderCart();
  renderProducts();
  openCart();
}

function updateQuantity(productId, change) {
  const product = products.find((item) => item.id === productId);
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (!product || !item) return;
  item.quantity = Math.min(product.stock, item.quantity + change);
  if (item.quantity <= 0) cart = cart.filter((cartItem) => cartItem.id !== productId);
  saveCart();
  renderCart();
  renderProducts();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  renderCart();
  renderProducts();
}

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 12;
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderCart() {
  cart = cart.filter((item) => products.some((product) => product.id === item.id));
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQuantity;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-state">Your cart is empty. Add a handcrafted treasure first.</p>`;
  } else {
    cartItems.innerHTML = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return `
          <article class="cart-item">
            <img src="${product.image}" alt="${product.name}" />
            <div>
              <h3>${product.name}</h3>
              <p>${currency.format(product.price)} each</p>
              <div class="cart-row">
                <div class="qty" aria-label="Quantity controls for ${product.name}">
                  <button type="button" data-qty="${product.id}" data-change="-1">−</button>
                  <strong>${item.quantity}</strong>
                  <button type="button" data-qty="${product.id}" data-change="1">+</button>
                </div>
                <button class="remove-button" type="button" data-remove="${product.id}">Remove</button>
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

function placeOrder(event) {
  event.preventDefault();
  if (cart.length === 0) {
    checkoutNote.textContent = "Add at least one item before checkout.";
    return;
  }
  const formData = new FormData(event.currentTarget);
  const order = {
    id: `VH-${Date.now()}`,
    customer: Object.fromEntries(formData.entries()),
    items: cart.map((item) => ({ ...item, product: products.find((product) => product.id === item.id).name })),
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
  checkoutNote.textContent = `Order ${order.id} placed! Connect Stripe or your backend to collect live payments.`;
}

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
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
cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
});
document.querySelector("[data-checkout-form]").addEventListener("submit", placeOrder);
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
renderCart();
renderProducts();
