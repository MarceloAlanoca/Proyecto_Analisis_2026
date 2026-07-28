async function conectarImpresora() {
  if (!qz.websocket.isActive()) {
    await qz.websocket.connect();
  }
  console.log("QZ Tray conectado");
}

async function obtenerImpresora() {
  const printer = await qz.printers.getDefault();
  console.log(printer);
  return printer;
}

async function imprimirComanda(pedido) {
  await conectarImpresora();

  const printer = await obtenerImpresora();

  const config = qz.configs.create(printer);

  let texto = "";

  texto += "          ONIRIC POS\n";
  texto += "------------------------------\n";
  texto += `Cliente: ${pedido.cliente}\n`;
  texto += `Pago: ${pedido.metodoPago.name}\n`;
  texto += `Fecha: ${pedido.fecha.toLocaleString("es-AR")}\n`;
  texto += "------------------------------\n";

  pedido.items.forEach((item) => {
    texto += `${item.name} x${item.qty}\n`;
  });

  texto += "------------------------------\n";
  texto += `TOTAL: $${pedido.total}\n\n\n`;

  texto += "\n";
  texto += "\n";
  texto += "\n";
  const data = [texto, "\x1D\x56\x00"];

  try {
    await qz.print(config, data);

    console.log("Comanda impresa");
  } catch (e) {
    console.error(e);
  }
}
