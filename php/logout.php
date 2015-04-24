<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

session_start();
logout();

function logout() {
    unset($_SESSION["username"]);
    unset($_SESSION["user_id"]);
    header('Location: http://student.cs.appstate.edu/carpenterba/CS3440/project/');
    die();
}

?>