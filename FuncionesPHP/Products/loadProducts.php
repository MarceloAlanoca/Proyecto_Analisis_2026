<?php
header("Content-Type: application/json; charset=utf-8");

include("../../Includes/Connect.php");

try {

    $sql = "SELECT *
            FROM productos
            WHERE activo = 1
            ORDER BY categoria,nombre";

    $resultado = mysqli_query($conexion, $sql);

    $productos = [];

    while ($fila = mysqli_fetch_assoc($resultado)) {
        $productos[] = $fila;
    }

    echo json_encode([
        "success" => true,
        "productos" => $productos
    ]);
} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "Error al cargar productos"
    ]);
}
