<?php
session_start();
if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo "<script>alert('Acceso Denegado - No se registro logeo');</script>";
    header("Location: ../Views/Login.php");
    exit;
}
?>