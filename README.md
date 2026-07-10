# Vijesh Handicraft

A fully functional static storefront for selling artifacts and handicrafts. It includes a responsive product catalog, search, category filters, sorting, cart, quantity controls, checkout form, contact form, and local order storage.

## Features

- Responsive landing page and storefront
- Product catalog with categories, ratings, stock, origin, and prices
- Search, category filter, and sorting
- Persistent cart using `localStorage`
- Checkout flow that stores demo orders in `localStorage`
- Contact/custom order form UI
- No framework or build step required

## Run Locally

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Deploy

Because this is a static site, deploy the folder to any static host:

- Netlify: drag and drop this folder into Netlify Drop.
- Vercel: import the folder/repository as a static project.
- GitHub Pages: publish the repository root.
- Any web host: upload `index.html`, `styles.css`, and `script.js`.

## Production Add-ons

For a real business launch, connect these pieces:

- Payments: Stripe Checkout, Razorpay, PayPal, or Cashfree.
- Backend: Supabase, Firebase, Shopify Storefront API, or a custom Node/Express API.
- Email: Formspree, Resend, SendGrid, or backend email notifications.
- Inventory: replace the in-file `products` array in `script.js` with database/API data.
- Images: host final product photos locally or on a CDN instead of Unsplash.

## Customize Products

Edit the `products` array in `script.js`. Each product supports:

```js
{
  id: "unique-product-id",
  name: "Product Name",
  category: "Pottery",
  price: 89,
  rating: 4.9,
  stock: 8,
  origin: "Jaipur, India",
  image: "https://...",
  description: "Short product description"
}
```
