<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Big Pizza - Sistema POS</title>
<link rel="stylesheet" href="../CSS/POS.css">
</head>
<body>

  <div class="topbar">
    <div class="title">Big Pizza — Sistema de Puntos de Venta</div>
    <div class="meta">
      <span>Terminal 1</span>
      <span>Usuario: Cajero1</span>
      <span id="clock"></span>
    </div>
  </div>

  <div class="app">

    <!-- Sidebar -->
    <div class="sidebar">
      <div class="icon active" title="Ventas">🛒</div>
      <div class="spacer"></div>
      <div class="icon" id="btnSalir" title="Salir">⏻</div>
    </div>

    <!-- Main -->
    <div class="main">

      <div class="tabs">
        <div class="tab active">Inicio</div>
        <div class="tab">Mostrador</div>
        <div class="tab">Salón</div>
      </div>

      <div class="content">

        <!-- Order (left) -->
        <div class="order-panel">
          <div class="order-toolbar">
            <button class="btn btn-outline">+ Nuevo pedido</button>
            <button class="btn btn-outline">Observaciones ▾</button>
          </div>
          <div class="customer-row">
            <span>Cliente</span>
            <input type="text" value="Consumidor Final" readonly>
          </div>

          <div class="order-table">
            <table id="orderTable">
              <thead>
                <tr>
                  <th style="width:36%">Descripción</th>
                  <th style="width:32%">Cantidad</th>
                  <th style="width:32%">Importe</th>
                </tr>
              </thead>
              <tbody id="orderBody">
                <!-- rows injected by JS -->
              </tbody>
            </table>
            <div class="empty-order hidden" id="emptyOrder">
              <div class="big">🍕</div>
              <div>El pedido está vacío</div>
              <div style="font-size:11.5px">Elegí un producto del catálogo para agregarlo</div>
            </div>
          </div>

          <div class="order-footer">
            <div class="order-total">
              <span>Total (<span id="itemCount">0</span> ítems)</span>
              <span class="amount">$ <span id="totalAmount">0,00</span></span>
            </div>
            <div class="action-row">
              <button class="btn btn-navy">Proforma</button>
              <button class="btn btn-green" id="btnCobrar">
                  Cobrar
              </button>
            </div>
          </div>

          <div class="status-row">
              <span class="status-ok">AFIP</span>
              <span class="status-ok">Caja</span>
              <span id="comanderaStatus" class="status-error">Comandera</span>
          </div>
        </div>

        <!-- Catalog (right) -->
        <div class="catalog-panel">
          <div class="search-row">
            <input type="text" placeholder="Buscar artículo...">
          </div>
          <div class="catalog-scroll">

            <div class="crumb" id="crumb">
              <div class="back" id="backBtn">←</div>
              <div class="path" id="crumbPath">Inicio</div>
            </div>

            <!-- Level 1: categories -->
            <div class="grid" id="categoryGrid">
              <div class="tile" onclick="openCategory('Favoritos')">
                <div class="circle c-fav">★</div>
                <div class="label">Favoritos</div>
              </div>
              <div class="tile" onclick="openCategory('Promociones')">
                <div class="circle c-promo">%</div>
                <div class="label">Promociones</div>
              </div>
              <div class="tile" onclick="openCategory('Pizzas')">
                <div class="circle c-pizza">PIZ</div>
                <div class="label">Pizzas</div>
              </div>
              <div class="tile" onclick="openCategory('Empanadas')">
                <div class="circle c-empanada">EMP</div>
                <div class="label">Empanadas</div>
              </div>
              <div class="tile" onclick="openCategory('Bebidas')">
                <div class="circle c-bebida">BEB</div>
                <div class="label">Bebidas</div>
              </div>
              <div class="tile" onclick="openCategory('Postres')">
                <div class="circle c-postre">PO</div>
                <div class="label">Postres</div>
              </div>
              <div class="tile" onclick="openCategory('Cafetería')">
                <div class="circle c-cafe">CAF</div>
                <div class="label">Cafetería</div>
              </div>
              <div class="tile" onclick="openCategory('Menú Combo')">
                <div class="circle c-menu">MC</div>
                <div class="label">Menú Combo</div>
              </div>
            </div>

            <div class="grid hidden" id="productGrid"></div>

          </div>
        </div>

      </div>
    </div>
  </div>

<script src="../JS/POS.js"></script>

</body>
</html>
