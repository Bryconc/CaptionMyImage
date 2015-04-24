<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['username']) && isset($_POST['password'])){
    loginUser($_POST['username'], $_POST['password']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function loginUser($username, $password) {
    $mysql_query = "SELECT id, user_password from user WHERE name = '$username'";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $password_check = "";
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $password_check = $row->user_password;
        $return_info = $row->id . " " . $username;
    }
    
    if ($password_check == md5($password))
    {
        $GLOBALS['mysqllink']->query("UPDATE user SET last_login = NOW() WHERE name = '$username'");
        echo $return_info;
    }
}

?>