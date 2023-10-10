<?php
$con = new mysqli("localhost", "root", "", "bit301");

if ($con->connect_error) {
    die($con->connect_error);
}
?>