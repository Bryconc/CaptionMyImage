<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['comment_id'])){
    getPageData($_POST['comment_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "happypk", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($id) {
    $mysql_query = "SELECT SUM(rate_value) as value from rated_entity WHERE comment_id = $id";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    if ($row = $query_result->fetch_object()) {
        echo $row->value;
    }
    
}

?>