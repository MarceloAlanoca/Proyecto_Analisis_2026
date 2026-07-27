<?php
$Server = "localhost";
$User = "root";
$Pass = "";
$DB = "oniric_pos";

$conexion = mysqli_connect($Server, $User, $Pass, $DB);

if (!$conexion) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "No se pudo conectar a la base de datos"
    ]);
    exit;
}

mysqli_set_charset($conexion, "utf8mb4");
?>