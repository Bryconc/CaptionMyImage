<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
    registerUser($_POST['username'], $_POST['email'], $_POST['password']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function registerUser($username, $email, $password) {
    $user_id = getNewUserId();
    $password = md5($password);
    
    $mysql_query = "INSERT INTO user VALUES($user_id,'$username', '$email', '$password', NULL);";
    
    if($GLOBALS['mysqllink']->query($mysql_query)){
        echo 'success';
    }
    else {
        echo mysql_error($GLOBALS['mysqllink']);
    }
}

function getNewUserId() {
    $query = $GLOBALS['mysqllink']->query("SELECT MAX(id) as id from user");
        
    $row = $query->fetch_object();
    if ($row){
        return $row->id + 1;
    }
    
    else {
        return 1;
    }
}

?>