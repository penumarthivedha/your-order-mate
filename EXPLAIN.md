# Your Order Mate - Interview Preparation & Code Walkthrough 🎓

This guide explains every function and architectural choice in **plain, simple language**. Use this to confidently answer any question an interviewer or evaluator asks about your code.

---

## 🧠 Part 1: Architecture & State Design

### 1. The Central State Object
```javascript
const state = {
  user: null,          // { name, phone, hostel }
  outletId: "dosa-plaza", // Current active canteen outlet
  cart: {},            // { [itemId]: quantity }
  orders: []           // Array of past order receipts
};
```

**Interview Explanation:**
> *"Instead of querying and scraping the DOM to figure out what items are in the cart or what outlet is active, I used a single centralized state object. The state is the Single Source of Truth: UI functions simply take this state and render it to the screen. When data changes, we update the state first and then call render functions."*

---

### 2. The Cart Data Shape
```javascript
cart = {
  "dp-1": 2,  // 2 Masala Dosas
  "dp-7": 1   // 1 Chicken Shawarma
}
```

#### ❓ Likely Interview Question: "Why store only `itemId` and `quantity` in the cart instead of storing the whole item object with name and price?"
**Your Answer:**
> *"Storing names or prices in the cart introduces duplicated state. If a canteen updates its prices or item names in the menu array, a cart storing hardcoded prices would become outdated, leading to price conflicts. By storing only the item ID and quantity:
> 1. The menu catalog remains the Single Source of Truth for item details.
> 2. The `getTotal()` function calculates the bill dynamically by looking up current prices by ID. The total and the menu can never go out of sync.
> 3. The cart object remains tiny, making it fast and lightweight to save to `localStorage`."*

---

## 🔍 Part 2: Step-by-Step Function Walkthrough

---

### `addToCart(id)`
```javascript
function addToCart(id) {
  if (state.cart[id]) {
    state.cart[id] += 1;
  } else {
    state.cart[id] = 1;
  }
  saveStateToStorage();
  renderCart();
}
```
- **What it does:** Adds one unit of a food item to the student's tray.
- **How it works:**
  1. Checks if `state.cart[id]` already exists.
  2. If it does, increments the quantity by `1`.
  3. If it doesn't, initializes the quantity to `1`.
  4. Calls `saveStateToStorage()` to persist the update in `localStorage`.
  5. Calls `renderCart()` to immediately update the tray view, live total, and enable the Place Order button.

---

### `changeQty(id, delta)`
```javascript
function changeQty(id, delta) {
  if (!state.cart[id]) return;

  state.cart[id] += delta;

  if (state.cart[id] <= 0) {
    delete state.cart[id];
  }

  saveStateToStorage();
  renderCart();
}
```
- **What it does:** Increases or decreases the quantity of an item using stepper buttons (`+` or `-`).
- **How it works:**
  1. Guard clause: returns early if the item is not currently in the cart.
  2. Adds `delta` (`+1` or `-1`) to the existing quantity.
  3. **Core Rule Check:** If the quantity drops to `0` or below, it uses JavaScript's `delete` operator to remove the key from `state.cart`.
  4. Persists the state and re-renders the cart.

---

### `removeFromCart(id)`
```javascript
function removeFromCart(id) {
  if (state.cart[id]) {
    delete state.cart[id];
  }
  saveStateToStorage();
  renderCart();
}
```
- **What it does:** Completely deletes an item line from the tray in a single click (the trash/cross button).
- **How it works:** Directly deletes `state.cart[id]`, saves to storage, and calls `renderCart()`.

---

### `getTotal()`
```javascript
function getTotal() {
  let total = 0;
  for (const itemId in state.cart) {
    const quantity = state.cart[itemId];
    const item = getItemById(itemId);
    if (item) {
      total += item.price * quantity;
    }
  }
  return total;
}
```
- **What it does:** Computes the grand total in Indian Rupees (₹) for all items in the tray.
- **How it works:**
  1. Initializes a running total variable to `0`.
  2. Loops through each `itemId` key in `state.cart`.
  3. Calls `getItemById(itemId)` to look up the item's true price in the menu.
  4. Multiplies price by quantity and adds it to `total`.
  5. Returns the final sum.

---

### `renderCart()`
```javascript
function renderCart() {
  const itemIds = Object.keys(state.cart);
  const isCartEmpty = itemIds.length === 0;

  if (isCartEmpty) {
    // Show empty placeholder, hide list, set ₹0
    placeOrderBtn.disabled = true; // <-- Guaranteed synchronization
    return;
  }

  // Render items rows, update live total
  placeOrderBtn.disabled = false;
}
```
#### ❓ Likely Interview Question: "How do you guarantee that the 'Place Order' button disabled state never goes out of sync with the cart contents?"
**Your Answer:**
> *"I calculate and set the button's `.disabled` property directly inside the `renderCart()` function itself. Because `renderCart()` is called on every single cart modification (`addToCart`, `changeQty`, `removeFromCart`, `placeOrder`, `clearCart`), the button state is refreshed in lockstep with the cart DOM elements. They cannot go out of sync."*

---

### `renderMenu()`
```javascript
function renderMenu() {
  // Filters active outlet's menu by both category and search query
  const filtered = outlet.menu.filter(item => {
    const matchesCategory = (activeCategory === "All") || (item.category === activeCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  // Builds HTML cards and inserts into #menuGrid
}
```
- **What it does:** Filters and displays food cards in the menu grid.
- **Key Interview Point:** It combines **both** the active category filter AND the text search input simultaneously using logical `AND` (`&&`). If you filter by "Shawarmas" and type "chicken", it displays only chicken shawarmas.

---

### `placeOrder()`
```javascript
function placeOrder() {
  const itemIds = Object.keys(state.cart);

  // Guard Clause: return early if empty
  if (itemIds.length === 0) return;

  // Check profile
  if (!state.user || !state.user.name) {
    openModal("profileModal");
    return;
  }

  // Create order object with #YOM-XXXX order number
  const newOrder = {
    orderNumber: `#YOM-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString("en-IN", ...),
    outletId: outlet.id,
    outletName: outlet.name,
    user: { ...state.user },
    items: orderedItems,
    total: grandTotal
  };

  state.orders.unshift(newOrder); // Add to history
  state.cart = {};                // Clear tray
  saveStateToStorage();
  renderCart();                   // Re-disables Place Order button
  showOrderConfirmation(newOrder);// Show custom on-page confirmation
}
```
- **What it does:** Finalizes the student's order.
- **Key Safeguards:**
  1. Checks if cart is empty and returns immediately (`if (itemIds.length === 0) return;`).
  2. Verifies student profile exists; if not, triggers the profile modal.
  3. Creates an immutable snapshot of ordered items with their names and subtotals so past order records remain intact even if menus change in the future.
  4. Resets `state.cart` to `{}`.
  5. Displays on-page confirmation with order number, address, and summary.

---

## 🛠️ Part 3: Extra Features & Best Practices

---

### 1. Why `try...catch` around `localStorage`?
```javascript
function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
  } catch (error) {
    console.warn("Storage warning:", error);
  }
}
```
**Your Answer:**
> *"In some environments—such as Safari Private Browsing mode, embedded WebViews, iframe sandboxes, or when device disk storage is full—calling `localStorage.setItem()` throws a `QuotaExceededError` or `SecurityError`. Wrapping storage calls in `try...catch` ensures the core web app continues running smoothly in memory without crashing the user's interface."*

---

### 2. Why avoid `alert()`, `confirm()`, and `prompt()`?
**Your Answer:**
> *"Browser native dialogs (`alert`, `confirm`, `prompt`) block the main JavaScript execution thread, freezing animations and background timers. Furthermore, they look dated, cannot be styled to match the campus theme, provide poor accessibility on mobile devices, and browsers can offer users a checkbox to suppress future dialogs. Using on-page HTML `<div class="modal-overlay">` overlays ensures full styling control, non-blocking asynchronous UI, and clean mobile responsiveness."*

---

### 3. Switching Campus Outlets Safely
#### ❓ Question: "What happens if a user selects dishes at Dosa Plaza, and then clicks on MasterChef Canteen?"
**Your Answer:**
> *"Different canteens have separate kitchens and menus. Mixing dishes from different physical outlets in one delivery order would cause logistics issues. Therefore:
> 1. If the user's tray is empty, the outlet switches immediately.
> 2. If the user has items in their tray, `requestSwitchOutlet()` opens an on-page warning modal: `'Your tray currently has items from Dosa Plaza. Switching to MasterChef Canteen will empty your tray. Do you want to proceed?'`
> 3. If they confirm, `executeSwitchOutlet()` clears `state.cart`, updates `state.outletId`, and re-renders the new menu."*

---

## 📋 Quick Reference: Common Interview Q&A Cheatsheet

| Question | Short Answer |
| :--- | :--- |
| **Why vanilla JS without React/Vue?** | Shows a deep understanding of core DOM manipulation, ES6 events, data structures, and state synchronization without hiding logic behind framework magic. |
| **How does search work with category filters?** | In `renderMenu()`, the filter condition requires `matchesCategory && matchesSearch`. Both conditions must be satisfied. |
| **What is the cart data shape?** | `{ itemId: quantity }`. Simple, minimal, and guarantees single source of truth for pricing. |
| **How does item removal work?** | In `changeQty()`, if `qty + delta <= 0`, we `delete state.cart[id]`. In `removeFromCart()`, we directly delete the key. |
| **How is order history stored?** | As an array of order receipt objects in `state.orders`, persisted to `localStorage` under `yom_orders_history`. |
