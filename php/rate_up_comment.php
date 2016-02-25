<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['user_id']) && isset($_POST['photo_id']) && isset($_POST['comment_id'])){
    rateUp($_POST['user_id'], $_POST['photo_id'], $_POST['comment_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "[redacted]", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function rateUp($user_id, $photo_id, $comment_id) {
    $mysql_query = "SELECT * from rated_entity where user_id = $user_id AND comment_id = $comment_id";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
   
    if ($row = $query_result->fetch_object()) {
        $mysql_query = "DELETE from rated_entity where user_id = $user_id AND comment_id = $comment_id";
        $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    }
    
    $mysql_query = "INSERT INTO rated_entity VALUES($user_id, $comment_id, $photo_id, NOW(), 1)";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    if($query_result){
        echo 'success';
    }
    else {
        echo mysql_error($GLOBALS['mysqllink']);
    }
}

?>