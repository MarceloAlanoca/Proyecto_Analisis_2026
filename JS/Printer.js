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

async function imprimirPrueba() {
    await conectarImpresora();
    const printer = await obtenerImpresora();
    console.log("Usando impresora:", printer);
    const config = qz.configs.create(printer);
    const data = [
        "Hola Oniric POS\n",
        "Prueba de impresion\n",
        "\n",
        "\n"
    ];
    try {
        await qz.print(config, data);
        console.log("Impresion enviada");
    } catch (e) {
        console.error(e);
    }

}