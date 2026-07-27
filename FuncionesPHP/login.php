<?php
header("Content-Type: application/json; charset=utf-8");
session_start();

include("../Includes/Connect.php");

try {
    $usuario = trim($_POST["usuario"] ?? "");
    $clave = trim($_POST["clave"] ?? "");

    if ($usuario === "" || $clave === "") {
        echo json_encode([
            "success" => false,
            "message" => "Completa usuario y contraseña."
        ]);
        exit;
    }

    $sql = "SELECT id, usuario, nombre, clave, rol, activo
            FROM usuarios
            WHERE usuario = ?
            LIMIT 1";

    $stmt = mysqli_prepare($conexion, $sql);

    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "message" => "Error al preparar la consulta: " . mysqli_error($conexion)
        ]);
        exit;
    }

    mysqli_stmt_bind_param($stmt, "s", $usuario);

    if (!mysqli_stmt_execute($stmt)) {
        echo json_encode([
            "success" => false,
            "message" => "Error al ejecutar la consulta."
        ]);
        exit;
    }

    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos."
        ]);
        exit;
    }

    if ((int)$user["activo"] !== 1) {
        echo json_encode([
            "success" => false,
            "message" => "El usuario está desactivado."
        ]);
        exit;
    }

    if (!password_verify($clave, $user["clave"])) {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos."
        ]);
        exit;
    }

    unset($user["clave"]);

    $_SESSION["usuario"] = $user;

    echo json_encode([
        "success" => true,
        "message" => "Inicio de sesión correcto.",
        "user" => $user
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error en el servidor: " . $e->getMessage()
    ]);
}
?>