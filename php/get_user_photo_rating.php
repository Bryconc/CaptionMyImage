<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['user_id']) && isset($_POST['photo_id'])){
    getPageData($_POST['user_id'], $_POST['photo_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "happypk", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($user_id, $photo_id) {
    $mysql_query = "SELECT comment_id, rate_value from rated_entity WHERE user_id = $user_id AND photo_id = $photo_id";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $commentArray = Array();
    $rateArray = Array();
   
    while ($row = $query_result->fetch_object()) {
        array_push($commentArray, $row->comment_id);
        array_push($rateArray, $row->rate_value);
    }
    
    echo json_encode($commentArray);
    echo json_encode($rateArray);
}

?>