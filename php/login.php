<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

session_start();

if(isset($_POST['username']) && isset($_POST['user_id']))
{
    setSessions($_POST['username'], $_POST['user_id']);
}

function setSessions($username, $id) {
    $_SESSION["username"] = $username;
    $_SESSION["user_id"] = $id;
    
    echo 'Session variables set:\nusername: ' . $_SESSION["username"]. "\nuser_id" . $_SESSION["user_id"]; 
}

?>