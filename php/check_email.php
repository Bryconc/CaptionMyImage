<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['user_email'])){
    getPageData($_POST['user_email']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "[redacted]", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($user_email) {
    $mysql_query = "SELECT user_email from user WHERE user_email = '$user_email'";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $return_info .= "$row->user_email";
    }
    
    echo $return_info;
}

?>