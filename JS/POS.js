// ---- clock ----
  function tick(){
    document.getElementById('clock').textContent =
      new Date().toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'});
  }
  tick(); setInterval(tick, 1000*30);

  const catalog = {
    'Pizzas': [
      {name:'Pizza Muzza', price:4200, code:'MOZ', color:'c-pizza'},
      {name:'Pizza Napolitana', price:4800, code:'NAP', color:'c-pizza'},
      {name:'Pizza Fugazzeta', price:5200, code:'FUG', color:'c-pizza'},
      {name:'Pizza 4 Quesos', price:5600, code:'4Q', color:'c-pizza'},
    ],
    'Empanadas': [
      {name:'Empanada carne', price:900, code:'CS', color:'c-empanada'},
      {name:'Empanada pollo', price:900, code:'PO', color:'c-empanada'},
      {name:'Empanada jamón y queso', price:900, code:'JQ', color:'c-empanada'},
      {name:'Empanada cebolla y queso', price:900, code:'CQ', color:'c-empanada'},
      {name:'Empanada humita', price:900, code:'HU', color:'c-empanada'},
      {name:'Empanada verdura', price:900, code:'VE', color:'c-empanada'},
      {name:'Empanada caprese', price:950, code:'CE', color:'c-empanada'},
      {name:'Empanada carne picante', price:950, code:'CP', color:'c-empanada'},
    ],
    'Bebidas': [
      {name:'Gaseosa 500ml', price:1200, code:'GAS', color:'c-bebida'},
      {name:'Agua sin gas', price:900, code:'AG', color:'c-bebida'},
      {name:'Cerveza', price:2200, code:'CER', color:'c-bebida'},
    ],
    'Postres': [
      {name:'Torta individual chocolate', price:2000, code:'TC', color:'c-postre'},
      {name:'Flan casero', price:1800, code:'FL', color:'c-postre'},
    ],
    'Cafetería': [
      {name:'Café doble', price:1300, code:'CD', color:'c-cafe'},
      {name:'Submarino', price:1600, code:'SUB', color:'c-cafe'},
    ],
    'Favoritos': [
      {name:'Pizza Muzza', price:4200, code:'MOZ', color:'c-pizza'},
      {name:'Empanada carne', price:900, code:'CS', color:'c-empanada'},
      {name:'Café doble', price:1300, code:'CD', color:'c-cafe'},
    ],
    'Promociones': [
      {name:'Docena empanadas', price:9500, code:'DOC', color:'c-empanada'},
      {name:'Combo 2 pizzas', price:9000, code:'C2P', color:'c-pizza'},
    ],
    'Menú Combo': [
      {name:'Combo individual', price:5900, code:'CI', color:'c-menu'},
      {name:'Combo familiar', price:15900, code:'CF', color:'c-menu'},
    ],
  };

  const order = [];

  function openCategory(catName){
    const grid = document.getElementById('productGrid');
    const catGrid = document.getElementById('categoryGrid');
    const crumb = document.getElementById('crumb');
    const crumbPath = document.getElementById('crumbPath');

    const items = catalog[catName] || [];
    grid.innerHTML = items.map(p => `
      <div class="tile" onclick='addItem(${JSON.stringify(p.name)}, ${p.price})'>
        <div class="circle ${p.color}">${p.code}</div>
        <div class="label">${p.name}</div>
      </div>
    `).join('');

    catGrid.classList.add('hidden');
    grid.classList.remove('hidden');
    crumb.classList.add('sub');
    crumbPath.textContent = 'Inicio / ' + catName;
  }

  document.getElementById('backBtn').addEventListener('click', () => {
    document.getElementById('categoryGrid').classList.remove('hidden');
    document.getElementById('productGrid').classList.add('hidden');
    document.getElementById('crumb').classList.remove('sub');
    document.getElementById('crumbPath').textContent = 'Inicio';
  });

  function addItem(name, price){
    const existing = order.find(i => i.name === name);
    if(existing){ existing.qty += 1; }
    else{ order.push({name, price, qty:1}); }
    renderOrder();
  }

  function changeQty(idx, delta){
    order[idx].qty += delta;
    if(order[idx].qty <= 0) order.splice(idx, 1);
    renderOrder();
  }

  function renderOrder(){
    const body = document.getElementById('orderBody');
    const empty = document.getElementById('emptyOrder');
    if(order.length === 0){
      body.innerHTML = '';
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      body.innerHTML = order.map((item, idx) => `
        <tr>
          <td>${item.name}</td>
          <td>
            <div class="qty-cell">
              <div class="qty-btn" onclick="changeQty(${idx}, -1)">–</div>
              <span>${item.qty}</span>
              <div class="qty-btn" onclick="changeQty(${idx}, 1)">+</div>
            </div>
          </td>
          <td>$ ${(item.price * item.qty).toLocaleString('es-AR')}</td>
        </tr>
      `).join('');
    }
    const totalItems = order.reduce((s,i)=>s+i.qty, 0);
    const totalAmount = order.reduce((s,i)=>s+i.qty*i.price, 0);
    document.getElementById('itemCount').textContent = totalItems;
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString('es-AR', {minimumFractionDigits:2});
  }

  document
.getElementById("btnSalir")
.addEventListener("click", ()=>{

    window.location.href="../Login/login.html";

});
  renderOrder();