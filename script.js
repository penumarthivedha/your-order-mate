/**
 * ==============================================================================
 * YOUR ORDER MATE - Campus Canteen Food Ordering Prototype
 * Plain HTML, CSS & Vanilla JavaScript (No Frameworks, No Libraries)
 * 
 * CART DATA SHAPE:
 * cart = { itemId: quantity }
 * Example: { "dp-1": 2, "dp-7": 1 }
 * 
 * Why store only itemId and quantity?
 * 1. Single Source of Truth: Name, category, and price are defined strictly in
 *    the menu catalog. Storing prices in the cart risks stale data if menu updates.
 * 2. Guaranteed In-Sync: Total is calculated dynamically using getTotal() by
 *    looking up the verified price for each ID. Total and quantity never diverge.
 * 3. Minimal Footprint: Compact to store and parse in localStorage.
 * ==============================================================================
 */

// ==============================================================================
// 1. MENU & CAMPUS OUTLETS DATA
// ==============================================================================

/**
 * Authentic campus outlets with custom menus.
 * Outlets: Dosa Plaza, MasterChef Canteen, Calorie Canteen, Rengcol Food Court.
 * Timings: 11:00 AM - 11:00 PM for all outlets.
 */
const OUTLETS = [
  {
    id: "dosa-plaza",
    name: "Dosa Plaza",
    timing: "11:00 AM - 11:00 PM",
    gradient: "linear-gradient(135deg, #f27329 0%, #dd5219 100%)",
    categories: ["All", "Dosas", "Shawarmas", "Snacks", "Mocktails & Drinks"],
    menu: [
      { id: "dp-1", name: "Masala Dosa", category: "Dosas", price: 80, isVeg: true, description: "Crispy golden crepe stuffed with spiced potato masala, served with chutneys & sambar." },
      { id: "dp-2", name: "Plain Dosa", category: "Dosas", price: 60, isVeg: true, description: "Classic thin golden crepe made from fermented rice-lentil batter." },
      { id: "dp-3", name: "Onion Rava Dosa", category: "Dosas", price: 95, isVeg: true, description: "Semolina and rice flour crepe sprinkled with diced onions and green chilies." },
      { id: "dp-4", name: "Paneer Butter Dosa", category: "Dosas", price: 120, isVeg: true, description: "Loaded with fresh cottage cheese crumble and creamy butter." },
      { id: "dp-5", name: "Ghee Podi Dosa", category: "Dosas", price: 100, isVeg: true, description: "Topped with aromatic spiced lentil gunpowder and desi ghee." },
      { id: "dp-6", name: "Cheese Corn Dosa", category: "Dosas", price: 130, isVeg: true, description: "Stuffed with gooey mozzarella cheese and sweet golden corn." },
      { id: "dp-7", name: "Chicken Shawarma", category: "Shawarmas", price: 110, isVeg: false, description: "Tender spiced chicken wrapped in kubboos with garlic mayonnaise." },
      { id: "dp-8", name: "Paneer Shawarma", category: "Shawarmas", price: 95, isVeg: true, description: "Grilled spiced paneer cubes wrapped in pita with fresh veggies and tahini." },
      { id: "dp-9", name: "Special Loaded Chicken Shawarma", category: "Shawarmas", price: 135, isVeg: false, description: "Extra chicken loaded wrap with pickled veggies, cheese and chipotle mayo." },
      { id: "dp-10", name: "Peri Peri Chicken Shawarma", category: "Shawarmas", price: 125, isVeg: false, description: "Spiced with zesty African bird's eye chili peri-peri seasoning." },
      { id: "dp-11", name: "Chilli Chicken", category: "Snacks", price: 140, isVeg: false, description: "Crisp boneless chicken tossed in soy, chili garlic and spring onions." },
      { id: "dp-12", name: "Paneer Pakoda", category: "Snacks", price: 70, isVeg: true, description: "Golden fried soft cottage cheese fritters dusted with chaat masala." },
      { id: "dp-13", name: "Chicken 65", category: "Snacks", price: 130, isVeg: false, description: "Crispy South-Indian style spiced fried chicken tempered with curry leaves." },
      { id: "dp-14", name: "Blueberry Mocktail", category: "Mocktails & Drinks", price: 70, isVeg: true, description: "Refreshing crushed blueberry cooler with sparkling soda and mint." },
      { id: "dp-15", name: "Lime Mint Cooler", category: "Mocktails & Drinks", price: 60, isVeg: true, description: "Chilled fresh mint cooler with squeezed lime and sparkling soda." },
      { id: "dp-16", name: "Strawberry Fizz", category: "Mocktails & Drinks", price: 70, isVeg: true, description: "Sweet strawberry cooler blended with lemon juice and crushed ice." },
      { id: "dp-17", name: "Cold Coffee", category: "Mocktails & Drinks", price: 50, isVeg: true, description: "Rich chilled espresso blended with milk and cocoa." }
    ]
  },
  {
    id: "masterchef",
    name: "MasterChef Canteen",
    timing: "11:00 AM - 11:00 PM",
    gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
    categories: ["All", "Biriyanis", "Fried Rice", "Starters", "Cold Drinks"],
    menu: [
      { id: "mc-1", name: "Chicken Biriyani", category: "Biriyanis", price: 180, isVeg: false, description: "Aromatic basmati rice layered with tender marinated chicken and spices." },
      { id: "mc-2", name: "Paneer Biriyani", category: "Biriyanis", price: 150, isVeg: true, description: "Fragrant saffron rice slow-cooked with spiced paneer cubes and onions." },
      { id: "mc-3", name: "Egg Biriyani", category: "Biriyanis", price: 140, isVeg: false, description: "Spiced basmati rice served with two golden fried boiled eggs and raita." },
      { id: "mc-4", name: "Chicken Dum Biriyani (Special)", category: "Biriyanis", price: 210, isVeg: false, description: "Hyderabadi style sealed dum biriyani with extra chicken and boiled egg." },
      { id: "mc-5", name: "Veg Fried Rice", category: "Fried Rice", price: 90, isVeg: true, description: "Wok-tossed basmati rice with crunchy carrots, beans, and spring onion." },
      { id: "mc-6", name: "Egg Fried Rice", category: "Fried Rice", price: 110, isVeg: false, description: "Stir-fried rice tossed with scrambled eggs, soy sauce, and white pepper." },
      { id: "mc-7", name: "Chicken Fried Rice", category: "Fried Rice", price: 130, isVeg: false, description: "Street-style wok-tossed rice with seasoned chicken cubes and mild spices." },
      { id: "mc-8", name: "Schezwan Chicken Fried Rice", category: "Fried Rice", price: 140, isVeg: false, description: "Spicy fried rice flavored with in-house Schezwan red pepper paste." },
      { id: "mc-9", name: "Chicken 65", category: "Starters", price: 140, isVeg: false, description: "Crispy fried chicken bites tempered with curry leaves and green chilies." },
      { id: "mc-10", name: "Tandoori Chicken (Half)", category: "Starters", price: 190, isVeg: false, description: "Char-grilled bone-in chicken marinated in spiced yogurt and kasoori methi." },
      { id: "mc-11", name: "Paneer 65", category: "Starters", price: 120, isVeg: true, description: "Crisp batter-coated paneer cubes tossed in tangy South Indian spices." },
      { id: "mc-12", name: "Limca (Can)", category: "Cold Drinks", price: 40, isVeg: true, description: "Chilled cloudy lemon fizzy soft drink." },
      { id: "mc-13", name: "Fanta (Can)", category: "Cold Drinks", price: 40, isVeg: true, description: "Chilled bubbly orange flavored drink." },
      { id: "mc-14", name: "Coke (Can)", category: "Cold Drinks", price: 40, isVeg: true, description: "Chilled classic Coca-Cola can." },
      { id: "mc-15", name: "Pepsi (Can)", category: "Cold Drinks", price: 40, isVeg: true, description: "Chilled classic refreshing Pepsi can." },
      { id: "mc-16", name: "Cold Coffee", category: "Cold Drinks", price: 50, isVeg: true, description: "Creamy blended cold coffee with cocoa topping." }
    ]
  },
  {
    id: "calorie",
    name: "Calorie Canteen",
    timing: "11:00 AM - 11:00 PM",
    gradient: "linear-gradient(135deg, #f36b3f 0%, #db4a1a 100%)",
    categories: ["All", "Rolls & Maggi", "Fried Rice", "Ice Creams & Drinks"],
    menu: [
      { id: "cc-1", name: "Egg Roll", category: "Rolls & Maggi", price: 60, isVeg: false, description: "Crispy paratha rolled around a spiced egg omelette with crunchy onions." },
      { id: "cc-2", name: "Paneer Roll", category: "Rolls & Maggi", price: 70, isVeg: true, description: "Golden paratha rolled with tawa-spiced paneer, mint chutney, and raw onions." },
      { id: "cc-3", name: "Chicken Roll", category: "Rolls & Maggi", price: 85, isVeg: false, description: "Juicy chicken tikka chunks rolled in paratha with spicy green chutney." },
      { id: "cc-4", name: "Veg Maggi", category: "Rolls & Maggi", price: 45, isVeg: true, description: "Classic 2-minute campus noodles cooked with diced veggies and magic masala." },
      { id: "cc-5", name: "Cheese Maggi", category: "Rolls & Maggi", price: 65, isVeg: true, description: "Hot masala Maggi topped with melted processed cheddar cheese." },
      { id: "cc-6", name: "Egg Cheese Maggi", category: "Rolls & Maggi", price: 75, isVeg: false, description: "Spiced Maggi tossed with scrambled eggs and loaded cheese slice." },
      { id: "cc-7", name: "Veg Fried Rice", category: "Fried Rice", price: 90, isVeg: true, description: "Wok-fried rice with finely chopped carrots, beans, and soy." },
      { id: "cc-8", name: "Egg Fried Rice", category: "Fried Rice", price: 110, isVeg: false, description: "Stir-fried rice with scrambled eggs and spring onions." },
      { id: "cc-9", name: "Chicken Fried Rice", category: "Fried Rice", price: 130, isVeg: false, description: "Flavorful wok rice tossed with diced chicken and garlic sauce." },
      { id: "cc-10", name: "Chocobar Ice Cream", category: "Ice Creams & Drinks", price: 35, isVeg: true, description: "Vanilla ice cream bar coated in crisp chocolate shell on a stick." },
      { id: "cc-11", name: "Malai Kulfi", category: "Ice Creams & Drinks", price: 40, isVeg: true, description: "Traditional creamy condensed milk kulfi flavored with cardamom and pista." },
      { id: "cc-12", name: "Campa Cola", category: "Ice Creams & Drinks", price: 25, isVeg: true, description: "Chilled Great Indian Taste Campa Cola soft drink." },
      { id: "cc-13", name: "Campa Orange", category: "Ice Creams & Drinks", price: 25, isVeg: true, description: "Tangy chilled Campa Orange carbonated fruit drink." },
      { id: "cc-14", name: "Cold Coffee", category: "Ice Creams & Drinks", price: 50, isVeg: true, description: "Rich chilled espresso blended with milk and vanilla ice cream." }
    ]
  },
  {
    id: "rengcol",
    name: "Rengcol Food Court",
    timing: "11:00 AM - 11:00 PM",
    gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
    categories: ["All", "Biriyanis & Meals", "Snacks", "Tea, Coffee & Drinks"],
    menu: [
      { id: "rc-1", name: "Chicken Biriyani", category: "Biriyanis & Meals", price: 170, isVeg: false, description: "Traditional campus style chicken biriyani served with spiced gravy and raita." },
      { id: "rc-2", name: "Veg Biriyani", category: "Biriyanis & Meals", price: 130, isVeg: true, description: "Mixed vegetable and paneer biriyani seasoned with whole garam masala." },
      { id: "rc-3", name: "Egg Biriyani", category: "Biriyanis & Meals", price: 135, isVeg: false, description: "Spiced yellow rice served with two fried eggs and mirchi ka salan." },
      { id: "rc-4", name: "Paratha with Chole", category: "Biriyanis & Meals", price: 80, isVeg: true, description: "Two pan-fried parathas served with spicy Punjabi chole and pickle." },
      { id: "rc-5", name: "Veg Thali Combo", category: "Biriyanis & Meals", price: 110, isVeg: true, description: "Steamed rice, 2 rotis, paneer sabzi, dal tadka, salad and papad." },
      { id: "rc-6", name: "Chicken Thali Combo", category: "Biriyanis & Meals", price: 160, isVeg: false, description: "Chicken curry, steamed rice, 2 rotis, dal tadka and fresh onion salad." },
      { id: "rc-7", name: "Veg Manchuria", category: "Snacks", price: 90, isVeg: true, description: "Crispy fried vegetable balls tossed in spicy sweet-tangy Manchurian sauce." },
      { id: "rc-8", name: "Chicken Manchuria", category: "Snacks", price: 130, isVeg: false, description: "Juicy chicken bites tossed in dark soy, garlic, and green chili gravy." },
      { id: "rc-9", name: "Bread Omelette", category: "Snacks", price: 45, isVeg: false, description: "Double egg fluffy omelette folded inside toasted white bread slices." },
      { id: "rc-10", name: "Samosa (2 pcs)", category: "Snacks", price: 30, isVeg: true, description: "Crispy triangular potato samosas served with sweet tamarind chutney." },
      { id: "rc-11", name: "Special Masala Tea", category: "Tea, Coffee & Drinks", price: 20, isVeg: true, description: "Steaming hot campus ginger cardamom spiced chai." },
      { id: "rc-12", name: "Filter Coffee", category: "Tea, Coffee & Drinks", price: 25, isVeg: true, description: "Freshly brewed hot milk chicory coffee." },
      { id: "rc-13", name: "Sweet Lassi", category: "Tea, Coffee & Drinks", price: 40, isVeg: true, description: "Chilled sweetened beaten yogurt cooler in a glass." },
      { id: "rc-14", name: "Chilled Cold Drink", category: "Tea, Coffee & Drinks", price: 35, isVeg: true, description: "Chilled bottle of Thums Up / Coke / Sprite." }
    ]
  }
];

// ==============================================================================
// 2. CENTRAL APPLICATION STATE
// ==============================================================================

/**
 * Single source of truth for the entire application.
 * All functions read from and update this state object.
 */
const state = {
  user: null,          // { name: string, phone: string, hostel: string }
  outletId: "dosa-plaza", // Active outlet ID
  cart: {},            // { [itemId]: quantity } e.g. { "dp-1": 2 }
  orders: []           // Array of past order objects
};

// UI filter states (not saved to storage)
let activeCategory = "All";
let searchQuery = "";
let pendingSwitchOutletId = null; // Holds target outlet ID during switch confirmation

// Storage keys
const STORAGE_KEYS = {
  USER: "yom_user_profile",
  OUTLET: "yom_active_outlet",
  CART: "yom_cart_data",
  ORDERS: "yom_orders_history"
};

// ==============================================================================
// 3. STORAGE HELPERS (localStorage wrapped in try/catch)
// ==============================================================================

/**
 * Loads persistent state from browser localStorage.
 * Wrapped in try/catch to gracefully handle disabled storage, private mode, or quota errors.
 */
function loadStateFromStorage() {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      state.user = JSON.parse(savedUser);
    }

    const savedOutlet = localStorage.getItem(STORAGE_KEYS.OUTLET);
    if (savedOutlet && OUTLETS.some(o => o.id === savedOutlet)) {
      state.outletId = savedOutlet;
    }

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }

    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (savedOrders) {
      state.orders = JSON.parse(savedOrders);
    }
  } catch (error) {
    console.warn("Storage warning: Could not read from localStorage.", error);
  }
}

/**
 * Saves current state slices into localStorage.
 * Wrapped in try/catch to prevent crashes if quota is exceeded.
 */
function saveStateToStorage() {
  try {
    if (state.user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.user));
    }
    localStorage.setItem(STORAGE_KEYS.OUTLET, state.outletId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
  } catch (error) {
    console.warn("Storage warning: Could not write to localStorage.", error);
  }
}

// ==============================================================================
// 4. DATA LOOKUP HELPERS
// ==============================================================================

/**
 * Returns the active outlet object matching state.outletId.
 * @returns {object} The active outlet object.
 */
function getCurrentOutlet() {
  const current = OUTLETS.find(outlet => outlet.id === state.outletId);
  return current || OUTLETS[0];
}

/**
 * Looks up an item by its ID across the active outlet's menu.
 * (Falls back to searching all outlets if needed).
 * @param {string} id - The unique ID of the food item.
 * @returns {object|undefined} The item object or undefined.
 */
function getItemById(id) {
  const currentOutlet = getCurrentOutlet();
  const foundInCurrent = currentOutlet.menu.find(item => item.id === id);
  if (foundInCurrent) return foundInCurrent;

  // Fallback search across all outlets in case of historic orders
  for (const outlet of OUTLETS) {
    const item = outlet.menu.find(m => m.id === id);
    if (item) return item;
  }
  return undefined;
}

// ==============================================================================
// 5. CORE CART FUNCTIONS (Required for Interview)
// ==============================================================================

/**
 * Adds an item to the cart. If already present, increments its quantity by 1.
 * Why: Allows user to click "Add to Cart" directly from the menu card.
 * @param {string} id - Food item ID.
 */
function addToCart(id) {
  // If item already in cart, increment quantity; otherwise initialize to 1
  if (state.cart[id]) {
    state.cart[id] += 1;
  } else {
    state.cart[id] = 1;
  }

  // Save changes and re-render cart panel and menu button state
  saveStateToStorage();
  renderCart();
  renderMenu();
}

/**
 * Changes the quantity of an item by a relative delta (+1 or -1).
 * When quantity reaches 0, the item key is removed from the cart object.
 * Why: Provides clear increment and decrement stepper controls.
 * @param {string} id - Food item ID.
 * @param {number} delta - Amount to change (-1 or +1).
 */
function changeQty(id, delta) {
  if (!state.cart[id]) return;

  state.cart[id] += delta;

  // Core Rule: If quantity drops to 0 or below, remove the item
  if (state.cart[id] <= 0) {
    delete state.cart[id];
  }

  saveStateToStorage();
  renderCart();
  renderMenu();
}

/**
 * Completely removes an item line from the cart regardless of its quantity.
 * Why: Allows user to discard an item with a single click of the trash button.
 * @param {string} id - Food item ID.
 */
function removeFromCart(id) {
  if (state.cart[id]) {
    delete state.cart[id];
  }

  saveStateToStorage();
  renderCart();
  renderMenu();
}

/**
 * Calculates the live grand total price for all items in the cart.
 * Why: Looks up each item's true price in the menu data dynamically,
 * ensuring quantity, price, and grand total can never go out of sync.
 * @returns {number} The total cost in INR (₹).
 */
function getTotal() {
  let total = 0;

  // Iterate over each item id in cart
  for (const itemId in state.cart) {
    const quantity = state.cart[itemId];
    const item = getItemById(itemId);

    if (item) {
      total += item.price * quantity;
    }
  }

  return total;
}

// ==============================================================================
// 6. UI RENDERING FUNCTIONS
// ==============================================================================

/**
 * Renders the menu items grid based on the active outlet, category, and search query.
 * Keeps cards clean, simple and elegant with a solid colored Add button.
 */
function renderMenu() {
  const menuGrid = document.getElementById("menuGrid");
  const noResultsState = document.getElementById("noResultsState");
  const menuItemCount = document.getElementById("menuItemCount");
  const outlet = getCurrentOutlet();

  // Filter menu items by active category and search term
  const filtered = outlet.menu.filter(item => {
    const matchesCategory = (activeCategory === "All") || (item.category === activeCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  menuItemCount.textContent = `${filtered.length} items`;

  // Handle empty search results state
  if (filtered.length === 0) {
    menuGrid.innerHTML = "";
    noResultsState.hidden = false;
    return;
  }

  noResultsState.hidden = true;

  // Build clean, elegant HTML for each menu item card
  const cardsHtml = filtered.map(item => {
    const vegClass = item.isVeg ? "veg" : "non-veg";
    const vegTitle = item.isVeg ? "Vegetarian" : "Non-Vegetarian";
    const currentQtyInCart = state.cart[item.id] || 0;

    return `
      <article class="menu-card" data-item-id="${item.id}">
        <div>
          <div class="menu-card-top">
            <span class="food-type-icon ${vegClass}" title="${vegTitle}" aria-label="${vegTitle}"></span>
            <span class="category-tag">${item.category}</span>
          </div>
          <h4 class="menu-card-title">${item.name}</h4>
          <p class="menu-card-desc">${item.description}</p>
        </div>

        <div class="menu-card-footer">
          <div class="item-price">
            <span class="currency">₹</span>${item.price}
          </div>
          <button 
            type="button" 
            class="btn btn-primary btn-sm add-to-cart-btn" 
            onclick="addToCart('${item.id}')"
          >
            ${currentQtyInCart > 0 ? `+ Add (${currentQtyInCart})` : "+ Add"}
          </button>
        </div>
      </article>
    `;
  }).join("");

  menuGrid.innerHTML = cardsHtml;
}

/**
 * Renders the category filter buttons dynamically based on the current outlet.
 * Why: Ensures category buttons reflect only what the active canteen offers.
 */
function renderCategoryPills() {
  const container = document.getElementById("categoryFilters");
  const outlet = getCurrentOutlet();

  const pillsHtml = outlet.categories.map(cat => {
    const isActive = cat === activeCategory;
    return `
      <button 
        type="button" 
        class="category-pill ${isActive ? "active" : ""}" 
        onclick="setCategory('${cat}')"
      >
        ${cat}
      </button>
    `;
  }).join("");

  container.innerHTML = pillsHtml;
}

/**
 * Renders the cart tray, live items, line totals, and place order button state.
 * IMPORTANT INTERVIEW RULE: The "Place Order" button disabled state is evaluated
 * directly inside this renderCart function so cart content and button state can NEVER go out of sync.
 */
function renderCart() {
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartSummary = document.getElementById("cartSummary");
  const cartItemsBadge = document.getElementById("cartItemsBadge");
  const subtotalDisplay = document.getElementById("subtotalDisplay");
  const totalDisplay = document.getElementById("totalDisplay");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const placeOrderTotalBadge = document.getElementById("placeOrderTotalBadge");

  const itemIds = Object.keys(state.cart);
  const totalItemCount = itemIds.reduce((sum, id) => sum + state.cart[id], 0);
  const isCartEmpty = itemIds.length === 0;

  // Update badge count
  cartItemsBadge.textContent = `${totalItemCount} ${totalItemCount === 1 ? "item" : "items"}`;

  if (isCartEmpty) {
    // Show empty state, hide items list and summary
    cartEmptyState.hidden = false;
    cartItemsList.hidden = true;
    cartSummary.hidden = true;
    cartItemsList.innerHTML = "";

    // Set totals to 0
    subtotalDisplay.textContent = "₹0";
    totalDisplay.textContent = "₹0";
    placeOrderTotalBadge.textContent = "₹0";

    // CORE REQUIREMENT: Disable Place Order button when cart is empty
    placeOrderBtn.disabled = true;
    return;
  }

  // Cart has items: Hide empty state, show items list and summary
  cartEmptyState.hidden = true;
  cartItemsList.hidden = false;
  cartSummary.hidden = false;

  // Build HTML for each cart line item
  const rowsHtml = itemIds.map(id => {
    const qty = state.cart[id];
    const item = getItemById(id);

    if (!item) return ""; // Guard in case of missing item

    const lineTotal = item.price * qty;

    return `
      <div class="cart-item-row">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">₹${item.price} each</div>
        </div>

        <div class="qty-stepper">
          <button 
            type="button" 
            class="qty-btn" 
            title="Decrease quantity" 
            onclick="changeQty('${id}', -1)"
            aria-label="Decrease quantity for ${item.name}"
          >-</button>
          <span class="qty-value">${qty}</span>
          <button 
            type="button" 
            class="qty-btn" 
            title="Increase quantity" 
            onclick="changeQty('${id}', 1)"
            aria-label="Increase quantity for ${item.name}"
          >+</button>
        </div>

        <div class="cart-item-total">₹${lineTotal}</div>

        <button 
          type="button" 
          class="remove-item-btn" 
          title="Remove item" 
          onclick="removeFromCart('${id}')"
          aria-label="Remove ${item.name} from tray"
        >&times;</button>
      </div>
    `;
  }).join("");

  cartItemsList.innerHTML = rowsHtml;

  // Calculate live total using Single Source of Truth
  const grandTotal = getTotal();
  subtotalDisplay.textContent = `₹${grandTotal}`;
  totalDisplay.textContent = `₹${grandTotal}`;
  placeOrderTotalBadge.textContent = `₹${grandTotal}`;

  // CORE REQUIREMENT: Enable Place Order button when cart has items
  placeOrderBtn.disabled = false;
}

/**
 * Updates active category filter and triggers re-render of menu and pills.
 * @param {string} category - Name of selected category.
 */
function setCategory(category) {
  activeCategory = category;
  renderCategoryPills();
  renderMenu();
}

/**
 * Updates search query and triggers menu re-render.
 * Also toggles visibility of the clear button.
 * @param {string} text - Search string.
 */
function handleSearch(text) {
  searchQuery = text.trim();
  const clearBtn = document.getElementById("clearSearchBtn");
  clearBtn.hidden = searchQuery.length === 0;
  renderMenu();
}

// ==============================================================================
// 7. ORDER PLACEMENT & MODALS FLOW (No alert/confirm/prompt)
// ==============================================================================

/**
 * Places the order from current cart items.
 * CORE RULE: Must return early if cart is empty.
 * Generates an on-page order confirmation and clears the cart.
 */
function placeOrder() {
  const itemIds = Object.keys(state.cart);

  // Guard: Return early if cart is empty (cannot place order)
  if (itemIds.length === 0) {
    return;
  }

  // Ensure user profile exists; if not, open profile modal first
  if (!state.user || !state.user.name) {
    openModal("profileModal");
    return;
  }

  const outlet = getCurrentOutlet();
  const grandTotal = getTotal();

  // Create detailed items snapshot for order record
  const orderedItems = itemIds.map(id => {
    const item = getItemById(id);
    const qty = state.cart[id];
    return {
      id: id,
      name: item ? item.name : "Item",
      price: item ? item.price : 0,
      quantity: qty,
      subtotal: (item ? item.price : 0) * qty
    };
  });

  // Construct new order object
  const orderNumber = `#YOM-${Math.floor(1000 + Math.random() * 9000)}`;
  const orderDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const newOrder = {
    orderNumber: orderNumber,
    date: orderDate,
    outletId: outlet.id,
    outletName: outlet.name,
    user: { ...state.user },
    items: orderedItems,
    total: grandTotal
  };

  // Prepend to order history array (newest first)
  state.orders.unshift(newOrder);

  // Clear cart after placing order
  state.cart = {};

  // Persist state to localStorage
  saveStateToStorage();

  // Re-render cart and menu
  renderCart();
  renderMenu();
  updateHeaderBadges();

  // Display on-page confirmation modal (NOT alert())
  showOrderConfirmation(newOrder);
}

/**
 * Displays the on-page confirmation dialog with order details.
 * @param {object} order - The placed order object.
 */
function showOrderConfirmation(order) {
  document.getElementById("confirmOrderNumber").textContent = order.orderNumber;
  document.getElementById("confirmOutletName").textContent = order.outletName;
  document.getElementById("confirmStudentName").textContent = order.user.name;
  document.getElementById("confirmStudentPhone").textContent = order.user.phone;
  document.getElementById("confirmStudentAddress").textContent = order.user.hostel;
  document.getElementById("confirmOrderTotal").textContent = `₹${order.total}`;

  // Build a concise items summary string
  const summaryString = order.items
    .map(i => `${i.quantity}× ${i.name}`)
    .join(", ");
  document.getElementById("confirmItemsSummary").textContent = summaryString;

  openModal("orderConfirmationModal");
}

/**
 * Renders the order history modal list from state.orders.
 * Why: Provides clear visibility into all past campus food orders.
 */
function renderOrderHistory() {
  const container = document.getElementById("orderHistoryList");
  const countBadge = document.getElementById("historyOrdersCount");

  countBadge.textContent = state.orders.length;

  if (state.orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🧾</div>
        <h4>No past orders yet</h4>
        <p>Your completed orders will appear here.</p>
      </div>
    `;
    return;
  }

  const historyHtml = state.orders.map(order => {
    const itemsSummary = order.items
      .map(i => `${i.quantity}× ${i.name} (₹${i.subtotal})`)
      .join(", ");

    return `
      <div class="history-card">
        <div class="history-card-header">
          <span class="history-order-id">${order.orderNumber}</span>
          <span class="history-date">${order.date}</span>
        </div>
        <div class="history-outlet">📍 ${order.outletName}</div>
        <div class="history-items-summary">${itemsSummary}</div>
        <div class="history-footer-row">
          <span class="text-muted">Location: ${order.user.hostel}</span>
          <span class="history-total">₹${order.total}</span>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = historyHtml;
}

/**
 * Clears order history from state and localStorage.
 */
function clearOrderHistory() {
  state.orders = [];
  saveStateToStorage();
  renderOrderHistory();
  updateHeaderBadges();
}

// ==============================================================================
// 8. OUTLET SELECTION & SAFE SWITCH FLOW
// ==============================================================================

/**
 * Renders the outlet cards inside the outlet selector modal.
 */
function renderOutlets() {
  const grid = document.getElementById("outletsGrid");

  const cardsHtml = OUTLETS.map(outlet => {
    const isActive = outlet.id === state.outletId;
    return `
      <div 
        class="outlet-select-card ${isActive ? "active-outlet" : ""}" 
        onclick="requestSwitchOutlet('${outlet.id}')"
      >
        <div class="outlet-card-header">
          <h4 class="outlet-card-title">${outlet.name}</h4>
          ${isActive ? `<span class="outlet-active-pill">Active</span>` : ""}
        </div>
        <div class="outlet-card-meta">
          🕒 Timings: ${outlet.timing}
        </div>
      </div>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
}

/**
 * Initiates an outlet switch. If the cart currently contains items,
 * presents an on-page confirmation dialog (NO alert/confirm) asking
 * the user if they want to clear the cart before switching.
 * @param {string} targetOutletId - The ID of the canteen to switch to.
 */
function requestSwitchOutlet(targetOutletId) {
  // If clicking on already active outlet, simply close the modal
  if (targetOutletId === state.outletId) {
    closeModal("outletModal");
    return;
  }

  const hasItemsInCart = Object.keys(state.cart).length > 0;

  if (hasItemsInCart) {
    // Show confirmation dialog before clearing tray
    pendingSwitchOutletId = targetOutletId;
    const currentOutlet = getCurrentOutlet();
    const targetOutlet = OUTLETS.find(o => o.id === targetOutletId);

    document.getElementById("confirmSwitchDesc").innerHTML = `
      Your tray currently has items from <strong>${currentOutlet.name}</strong>.<br>
      Switching to <strong>${targetOutlet ? targetOutlet.name : "another outlet"}</strong> will empty your tray. Do you want to proceed?
    `;

    closeModal("outletModal");
    openModal("switchOutletConfirmModal");
  } else {
    // Cart is empty, switch immediately
    executeSwitchOutlet(targetOutletId);
    closeModal("outletModal");
  }
}

/**
 * Executes the outlet switch, updating state, active banner, filters, and menu.
 * @param {string} newOutletId - ID of the outlet to switch to.
 */
function executeSwitchOutlet(newOutletId) {
  state.outletId = newOutletId;
  state.cart = {}; // Clear cart
  activeCategory = "All"; // Reset category filter
  searchQuery = ""; // Reset search

  saveStateToStorage();
  updateOutletBanner();
  renderCategoryPills();
  renderMenu();
  renderCart();
  renderOutlets();
}

/**
 * Updates the welcome banner and header with active outlet information.
 * Shows the name, timings, and dynamic lighter bold gradient.
 */
function updateOutletBanner() {
  const outlet = getCurrentOutlet();
  const banner = document.querySelector(".outlet-banner");
  if (banner && outlet.gradient) {
    banner.style.background = outlet.gradient;
  }
  document.getElementById("headerOutletName").textContent = outlet.name;
  document.getElementById("bannerOutletName").textContent = outlet.name;
  document.getElementById("bannerOutletTiming").textContent = outlet.timing;
}

// ==============================================================================
// 9. STUDENT PROFILE & VALIDATION FLOW
// ==============================================================================

/**
 * Validates profile form inputs and displays inline error messages.
 * Returns true if valid, false if invalid.
 */
function validateProfileForm(name, phone, hostel) {
  let isValid = true;

  const nameInput = document.getElementById("studentNameInput");
  const phoneInput = document.getElementById("studentPhoneInput");
  const hostelInput = document.getElementById("studentHostelInput");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const hostelError = document.getElementById("hostelError");

  // Validate Name
  if (!name || name.trim().length < 2) {
    nameInput.classList.add("input-error");
    nameError.hidden = false;
    isValid = false;
  } else {
    nameInput.classList.remove("input-error");
    nameError.hidden = true;
  }

  // Validate Phone (10 digits Indian phone)
  const phonePattern = /^[6-9]\d{9}$/;
  if (!phone || !phonePattern.test(phone.trim())) {
    phoneInput.classList.add("input-error");
    phoneError.hidden = false;
    isValid = false;
  } else {
    phoneInput.classList.remove("input-error");
    phoneError.hidden = true;
  }

  // Validate Hostel / Room
  if (!hostel || hostel.trim().length < 3) {
    hostelInput.classList.add("input-error");
    hostelError.hidden = false;
    isValid = false;
  } else {
    hostelInput.classList.remove("input-error");
    hostelError.hidden = true;
  }

  return isValid;
}

/**
 * Saves the student profile to state and localStorage.
 */
function handleProfileSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("studentNameInput").value;
  const phone = document.getElementById("studentPhoneInput").value;
  const hostel = document.getElementById("studentHostelInput").value;

  if (!validateProfileForm(name, phone, hostel)) {
    return;
  }

  state.user = {
    name: name.trim(),
    phone: phone.trim(),
    hostel: hostel.trim()
  };

  saveStateToStorage();
  updateHeaderBadges();
  closeModal("profileModal");
}

/**
 * Populates profile input fields with existing user data.
 */
function populateProfileForm() {
  if (state.user) {
    document.getElementById("studentNameInput").value = state.user.name || "";
    document.getElementById("studentPhoneInput").value = state.user.phone || "";
    document.getElementById("studentHostelInput").value = state.user.hostel || "";
  }
}

/**
 * Updates header badges (student name and order history count).
 */
function updateHeaderBadges() {
  const userNameElem = document.getElementById("headerUserName");
  if (state.user && state.user.name) {
    userNameElem.textContent = state.user.name.split(" ")[0]; // First name for pill
  } else {
    userNameElem.textContent = "Profile";
  }

  const orderCountElem = document.getElementById("orderHistoryCount");
  orderCountElem.textContent = state.orders.length;
}

// ==============================================================================
// 10. MODAL UTILITIES (Clean On-Page Dialogs)
// ==============================================================================

/**
 * Opens a modal dialog by its element ID.
 * @param {string} modalId - The DOM ID of the modal overlay.
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.hidden = false;
  }
}

/**
 * Closes a modal dialog by its element ID.
 * @param {string} modalId - The DOM ID of the modal overlay.
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.hidden = true;
  }
}

// ==============================================================================
// 11. INITIALIZATION & EVENT LISTENERS
// ==============================================================================

/**
 * Main application setup on DOM ready.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Restore state from localStorage
  loadStateFromStorage();

  // 2. Initial UI rendering
  updateOutletBanner();
  renderCategoryPills();
  renderMenu();
  renderCart();
  renderOutlets();
  updateHeaderBadges();

  // 3. Search input events
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    handleSearch("");
    searchInput.focus();
  });

  // Reset filters button in empty search state
  document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    searchInput.value = "";
    handleSearch("");
    setCategory("All");
  });

  // 4. Cart Action Buttons
  document.getElementById("placeOrderBtn").addEventListener("click", () => {
    placeOrder();
  });

  document.getElementById("clearCartBtn").addEventListener("click", () => {
    state.cart = {};
    saveStateToStorage();
    renderCart();
    renderMenu();
  });

  // 5. Header Action Buttons
  document.getElementById("currentOutletBtn").addEventListener("click", () => {
    renderOutlets();
    openModal("outletModal");
  });

  document.getElementById("bannerChangeOutletBtn").addEventListener("click", () => {
    renderOutlets();
    openModal("outletModal");
  });

  document.getElementById("orderHistoryBtn").addEventListener("click", () => {
    renderOrderHistory();
    openModal("orderHistoryModal");
  });

  document.getElementById("userProfileBtn").addEventListener("click", () => {
    populateProfileForm();
    openModal("profileModal");
  });

  // 6. Profile form submission
  document.getElementById("profileForm").addEventListener("submit", handleProfileSubmit);

  // 7. Outlet switch confirmation handlers
  document.getElementById("confirmSwitchBtn").addEventListener("click", () => {
    if (pendingSwitchOutletId) {
      executeSwitchOutlet(pendingSwitchOutletId);
      pendingSwitchOutletId = null;
    }
    closeModal("switchOutletConfirmModal");
  });

  document.getElementById("cancelSwitchBtn").addEventListener("click", () => {
    pendingSwitchOutletId = null;
    closeModal("switchOutletConfirmModal");
  });

  // 8. Order confirmation dialog buttons
  document.getElementById("closeConfirmationBtn").addEventListener("click", () => {
    closeModal("orderConfirmationModal");
  });

  document.getElementById("viewHistoryFromConfirmBtn").addEventListener("click", () => {
    closeModal("orderConfirmationModal");
    renderOrderHistory();
    openModal("orderHistoryModal");
  });

  // 9. Order history clear button
  document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    clearOrderHistory();
  });

  // 10. Generic modal close buttons (data-close-modal attribute)
  document.querySelectorAll("[data-close-modal]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modalId = e.currentTarget.getAttribute("data-close-modal");
      closeModal(modalId);
    });
  });

  // Close modals when clicking outside the dialog card
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.hidden = true;
      }
    });
  });

  // If first-time student visitor with no profile, open profile modal gracefully
  if (!state.user || !state.user.name) {
    openModal("profileModal");
  }
});
