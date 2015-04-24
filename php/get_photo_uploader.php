<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['photo_id'])){
    getPageData($_POST['photo_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "happypk", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($id) {
    $mysql_query = "SELECT name, id from photo JOIN user WHERE uploaded_by = id AND photo_id = $id";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
   
    if ($row = $query_result->fetch_object()) {
        echo json_encode($row);
    }
    
}

?>