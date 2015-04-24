<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['username'])){
    getPageData($_POST['username']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($username) {
    $mysql_query = "SELECT name from user WHERE name = '$username'";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $return_info .= "$row->name";
    }
    
    echo $return_info;
}

?>