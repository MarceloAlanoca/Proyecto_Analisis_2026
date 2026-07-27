// ---- clock ----
function tick() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString(
    "es-AR",
    { hour: "2-digit", minute: "2-digit" },
  );
}
tick();
setInterval(tick, 1000 * 30);

let catalog = {};

async function loadProducts() {
  try {
    const res = await fetch("../FuncionesPHP/Products/loadProducts.php");
    const data = await res.json();
    if (!data.success) {
      alert(data.message);
      return;
    }
    buildCatalog(data.productos);
  } catch (error) {
    console.log(error);
  }
}

function buildCatalog(productos) {
  catalog = {
    Pizzas: [],
    Empanadas: [],
    Bebidas: [],
    Favoritos: [],
    Promociones: [],
    "Menú Combo": [],
  };

  productos.forEach((producto) => {
    let color = "";

    switch (producto.categoria) {
      case "pizza":
        color = "c-pizza";
        catalog["Pizzas"].push({
          name: producto.nombre,
          price: Number(producto.precio),
          code: producto.codigo,
          color,
        });
        break;

      case "empanada":
        color = "c-empanada";
        catalog["Empanadas"].push({
          name: producto.nombre,
          price: Number(producto.precio),
          code: producto.codigo,
          color,
        });
        break;

      case "bebida":
        color = "c-bebida";
        catalog["Bebidas"].push({
          name: producto.nombre,
          price: Number(producto.precio),
          code: producto.codigo,
          color,
        });
        break;

      case "combo":
        color = "c-menu";
        catalog["Menú Combo"].push({
          name: producto.nombre,
          price: Number(producto.precio),
          code: producto.codigo,
          color,
        });
        break;
    }

    if (producto.destacado == 1) {
      catalog["Favoritos"].push({
        name: producto.nombre,
        price: Number(producto.precio),
        code: producto.codigo,
        color,
      });
    }

    if (producto.promocion == 1) {
      catalog["Promociones"].push({
        name: producto.nombre,
        price: Number(producto.precio),
        code: producto.codigo,
        color,
      });
    }
  });
}

const order = [];

function openCategory(catName) {
  const grid = document.getElementById("productGrid");
  const catGrid = document.getElementById("categoryGrid");
  const crumb = document.getElementById("crumb");
  const crumbPath = document.getElementById("crumbPath");

  const items = catalog[catName] || [];
  grid.innerHTML = items
    .map(
      (p) => `
      <div class="tile" onclick='addItem(${JSON.stringify(p.name)}, ${p.price})'>
        <div class="circle ${p.color}">${p.code}</div>
        <div class="label">${p.name}</div>
      </div>
    `,
    )
    .join("");

  catGrid.classList.add("hidden");
  grid.classList.remove("hidden");
  crumb.classList.add("sub");
  crumbPath.textContent = "Inicio / " + catName;
}

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("categoryGrid").classList.remove("hidden");
  document.getElementById("productGrid").classList.add("hidden");
  document.getElementById("crumb").classList.remove("sub");
  document.getElementById("crumbPath").textContent = "Inicio";
});

function addItem(name, price) {
  const existing = order.find((i) => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    order.push({ name, price, qty: 1 });
  }
  renderOrder();
}

function changeQty(idx, delta) {
  order[idx].qty += delta;
  if (order[idx].qty <= 0) order.splice(idx, 1);
  renderOrder();
}

function renderOrder() {
  const body = document.getElementById("orderBody");
  const empty = document.getElementById("emptyOrder");
  if (order.length === 0) {
    body.innerHTML = "";
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    body.innerHTML = order
      .map(
        (item, idx) => `
        <tr>
          <td>${item.name}</td>
          <td>
            <div class="qty-cell">
              <div class="qty-btn" onclick="changeQty(${idx}, -1)">–</div>
              <span>${item.qty}</span>
              <div class="qty-btn" onclick="changeQty(${idx}, 1)">+</div>
            </div>
          </td>
          <td>$ ${(item.price * item.qty).toLocaleString("es-AR")}</td>
        </tr>
      `,
      )
      .join("");
  }
  const totalItems = order.reduce((s, i) => s + i.qty, 0);
  const totalAmount = order.reduce((s, i) => s + i.qty * i.price, 0);
  document.getElementById("itemCount").textContent = totalItems;
  document.getElementById("totalAmount").textContent =
    totalAmount.toLocaleString("es-AR", { minimumFractionDigits: 2 });
}

const btnSalir = document.getElementById("btnSalir");
const logoutModal = document.getElementById("logoutModal");
const cancelLogout = document.getElementById("cancelLogout");
const confirmLogout = document.getElementById("confirmLogout");

btnSalir.addEventListener("click", () => {
  logoutModal.classList.remove("hidden");
});
cancelLogout.addEventListener("click", () => {
  logoutModal.classList.add("hidden");
});

confirmLogout.addEventListener("click", () => {
  window.location.replace("../FuncionesPHP/logout.php");;
});

const paymentMethods = [
  {
    id: "cash",
    name: "Efectivo",
    icon: "../Images/Icons/Efectivo.jpe",
  },
  {
    id: "card",
    name: "Tarjeta",
    icon: "../Images/Icons/Tarjeta.jpe",
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    icon: "../Images/Icons/Mercadopago.jpe",
  },
];

function createPaymentMenu() {
  const menu = document.getElementById("paymentMenu");

  menu.innerHTML = "";

  paymentMethods.forEach((method) => {
    menu.innerHTML += `
            <div class="payment-item"
                data-id="${method.id}"
                data-name="${method.name}"
                data-icon="${method.icon}">

                <img src="${method.icon}">
                <span>${method.name}</span>

            </div>
        `;
  });
}

let currentPayment = paymentMethods[0];

function initializePaymentMenu(){

    const btnPayment = document.getElementById("btnPayment");
    const menu = document.getElementById("paymentMenu");
    const paymentText = document.getElementById("paymentText");
    const paymentIcon = document.getElementById("paymentIcon");
    btnPayment.addEventListener("click",(e)=>{
        e.stopPropagation();
        menu.classList.toggle("hidden");
    });
    document.querySelectorAll(".payment-item").forEach(item=>{
        item.addEventListener("click",()=>{
            currentPayment={
                id:item.dataset.id,
                name:item.dataset.name,
                icon:item.dataset.icon
            };
            paymentText.textContent=currentPayment.name;
            paymentIcon.src=currentPayment.icon;
            menu.classList.add("hidden");
        });
    });
    document.addEventListener("click",()=>{
        menu.classList.add("hidden");
    });

}

document.addEventListener("click", function () {
  paymentMenu.classList.add("hidden");
});

createPaymentMenu();
initializePaymentMenu();
loadProducts();
renderOrder();