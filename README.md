# Your Order Mate 🍱

> **Campus Canteen Food Ordering Prototype**  
> Built with clean, vanilla **HTML5, CSS3, and JavaScript** (ES6+). Zero frameworks, zero external libraries, zero build tools.

---

## 📌 Project Description

**Your Order Mate** is an interactive campus food ordering interface designed for college students. It provides a natural, pleasant, and clean UI without artificial clutter. Students can browse live menus from real campus canteens (**Dosa Plaza**, **MasterChef Canteen**, **Calorie Canteen**, and **Rengcol Food Court**), filter dishes by category, search in real-time, adjust tray quantities, and place orders with instant live total calculations and on-page confirmation dialogs.

---

## 🛒 The Cart Data Shape (Interview Core Concept)

```javascript
cart = {
  "dp-1": 2,   // 2 orders of Masala Dosa
  "dp-7": 1    // 1 order of Chicken Shawarma
}
```

### Why store only `itemId` and `quantity`?
1. **Single Source of Truth**: Item details like `name`, `category`, and `price` are maintained strictly inside the menu array. Storing them in the cart leads to duplicated state and data synchronization bugs.
2. **Mathematically Impossible to Desync**: Grand total is calculated dynamically using `getTotal()` by looking up the current verified price for each item ID.
3. **Lightweight & Efficient**: The cart object remains minimal, making `localStorage` serialization instant and free of redundant memory overhead.

---

## 🏫 Real Campus Outlets & Updated Menus

All campus outlets operate from **11:00 AM - 11:00 PM**:

- 📍 **Dosa Plaza (DP)**:
  - **Dosas**: Masala Dosa, Plain Dosa, Onion Rava Dosa, Paneer Butter Dosa, Ghee Podi Dosa, Cheese Corn Dosa.
  - **Shawarmas**: Chicken Shawarma, Paneer Shawarma, Special Loaded Chicken Shawarma, Peri Peri Chicken Shawarma.
  - **Snacks**: Chilli Chicken, Paneer Pakoda, Chicken 65.
  - **Mocktails & Drinks**: Blueberry Mocktail, Lime Mint Cooler, Strawberry Fizz, Cold Coffee.

- 📍 **MasterChef Canteen**:
  - **Biriyanis**: Chicken Biriyani, Paneer Biriyani, Egg Biriyani, Chicken Dum Biriyani (Special).
  - **Fried Rice**: Veg Fried Rice, Egg Fried Rice, Chicken Fried Rice, Schezwan Chicken Fried Rice.
  - **Starters**: Chicken 65, Tandoori Chicken (Half), Paneer 65.
  - **Cold Drinks**: Limca, Fanta, Coke, Pepsi, Cold Coffee.

- 📍 **Calorie Canteen**:
  - **Rolls & Maggi**: Egg Roll, Paneer Roll, Chicken Roll, Veg Maggi, Cheese Maggi, Egg Cheese Maggi.
  - **Fried Rice**: Veg Fried Rice, Egg Fried Rice, Chicken Fried Rice.
  - **Ice Creams & Drinks**: Chocobar Ice Cream, Malai Kulfi, Campa Cola, Campa Orange, Cold Coffee.

- 📍 **Rengcol Food Court**:
  - **Biriyanis & Meals**: Chicken Biriyani, Veg Biriyani, Egg Biriyani, Paratha with Chole, Veg Thali Combo, Chicken Thali Combo.
  - **Snacks**: Veg Manchuria, Chicken Manchuria, Bread Omelette, Samosa (2 pcs).
  - **Tea, Coffee & Drinks**: Special Masala Tea, Filter Coffee, Sweet Lassi, Chilled Cold Drink.

---

## ✨ Features

- **Pleasant & Human-Crafted UI**: Natural earthy terracotta palette, warm stone borders, soft linen background, and clear typography. No over-saturated AI demo gradients or cluttered labels.
- **Combined Search & Category Filtering**: Filter by category and search by text simultaneously.
- **Dynamic Tray / Cart Management**:
  - Add items directly from cards.
  - Stepper controls (`+` / `-`).
  - Automatic removal when quantity drops to 0.
  - Instant line removal with trash icon.
- **Guaranteed Synchronization**:
  - The "Place Order" button is **disabled** when the cart is empty (set directly inside `renderCart()`).
  - `placeOrder()` returns early if called with an empty cart.
- **On-Page Modals (Zero `alert()`, `confirm()`, or `prompt()`)**:
  - Custom on-page order confirmation showing order number (e.g., `#YOM-4821`), items summary, student details, and pickup estimate.
  - Custom confirmation modal when switching outlets with an active cart to prevent accidental data loss.
- **Persistent LocalStorage**:
  - Cart, student profile, and order history persist across page refreshes.
  - Wrapped in `try...catch` blocks to protect against private browsing restrictions or quota limits.
- **Student Profile (Simulated Authentication)**:
  - Modal requesting Student Name, 10-digit Indian mobile number, and Campus Hostel/Room with inline error messages.

---

## 🚀 How to Run

Because this project uses pure vanilla HTML, CSS, and JavaScript:

### Method 1: Direct File Open
Simply double-click `index.html` in File Explorer or open it directly in any modern browser:
```text
file:///C:/Users/RISHITHA/.gemini/antigravity/scratch/your-order-mate/index.html
```

### Method 2: Local HTTP Server (Optional)
```powershell
cd C:\Users\RISHITHA\.gemini\antigravity\scratch\your-order-mate
python -m http.server 3000
```
Then open `http://localhost:3000` in your web browser.

---

## 📁 Project Structure

```text
your-order-mate/
│
├── index.html       # Clean HTML5 layout, modals, tray & menu grid
├── style.css        # Natural terracotta aesthetic, responsive grid
├── script.js        # Vanilla JavaScript with state and cart logic
├── README.md        # Project guide, updated menus, and flow
└── EXPLAIN.md       # Interview preparation guide
```
