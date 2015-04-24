<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['user_id'])){
    getPageData($_POST['user_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($id) {
    $mysql_query = "SELECT rated_entity.photo_id, comment_text, rate_date, rate_value from rated_entity join comment WHERE rated_entity.photo_id = comment.photo_id AND rated_entity.comment_id = comment.comment_id AND user_id = $id ORDER BY rate_date DESC LIMIT 20";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $json = array();
   
    while ($row = $query_result->fetch_object()) {
        array_push($json, $row);
    }
    
    echo json_encode($json);
}

?>