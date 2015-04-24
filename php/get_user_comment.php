<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['user_id'])){
    getPageData($_POST['user_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "happypk", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($id) {
    $mysql_query = "SELECT comment_text, photo_id, date_posted from comment WHERE posted_by = $id ORDER BY date_posted DESC LIMIT 20";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $json = array();
   
    while ($row = $query_result->fetch_object()) {
        array_push($json, $row);
    }
    
    echo json_encode($json);
}

?>