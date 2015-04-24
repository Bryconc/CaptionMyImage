<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

session_start();
getSession();


function getSession() {
    if (isset($_SESSION["username"]) && isset($_SESSION["user_id"]) )
    {
        echo $_SESSION["username"] . " " . $_SESSION["user_id"];
    }
    else
    {
        echo "";
    }
}

?>