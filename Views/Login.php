<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Oniric POS - Inicio de sesión</title>
<link rel="stylesheet" href="../CSS/Login.css">
</head>
<body>

  <div class="login-screen">

    <div class="login-card">
      <div class="brand">
        <div class="brand-badge">OP</div>
        <div class="brand-text">
          <div class="brand-name">Oniric POS</div>
          <div class="brand-sub">Sistema de Puntos de Venta</div>
        </div>
      </div>

      <form id="loginForm">
        <label class="field">
          <span>Usuario</span>
          <input type="text" id="usuario" placeholder="Ej: cajero1" required>
        </label>

        <label class="field">
          <span>Contraseña</span>
          <input type="password" id="clave" placeholder="••••••••" required>
        </label>

        <label class="field">
          <span>Terminal</span>
          <select id="terminal">
            <option>Terminal 1 - Mostrador</option>
            <option>Terminal 2 - Salón</option>
            <option>Terminal 3 - Delivery</option>
          </select>
        </label>

        <div class="error-msg hidden" id="errorMsg">Usuario o contraseña incorrectos</div>

        <button type="submit" class="btn-login">Ingresar</button>
      </form>

      <div class="login-footer">
        <span>v1.0 · Terminal conectada</span>
        <span class="status-dot"></span>
      </div>
    </div>

    <div class="login-side">
      <div class="side-content">
        <div class="side-title">Bienvenido</div>
        <div class="side-text">
          Registrá pedidos, cobrá y comandá desde un solo lugar.
          Iniciá sesión con tu usuario para comenzar el turno.
        </div>
      </div>
    </div>

  </div>

<script src="../JS/Login.js"></script>
</body>
</html>
