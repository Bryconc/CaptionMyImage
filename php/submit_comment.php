<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

session_start();
$mysqllink = connectToDB();

if(isset($_POST['comment_text']) && isset($_POST['photo_id'])){
    $commenter = 1;
    if (isset($_SESSION['user_id']))
    {
        $commenter = $_SESSION['user_id'];
    }
    getPageData($_POST['comment_text'], $_POST['photo_id'], $commenter);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($text, $id, $commenter) {
    $comment_id = getNewCommentId();
    $text = $GLOBALS['mysqllink']->real_escape_string($text);
    
    $mysql_query = "INSERT INTO comment VALUES($comment_id,'$text', $commenter, $id, NOW(), 0, 0);";
    
    if($GLOBALS['mysqllink']->query($mysql_query)){
        echo 'success';
    }
    else {
        echo mysql_error($GLOBALS['mysqllink']);
    }
}

function getNewCommentId() {
    $query = $GLOBALS['mysqllink']->query("SELECT MAX(comment_id) as comment_id from comment");
        
    $row = $query->fetch_object();
    if ($row){
        return $row->comment_id + 1;
    }
    
    else {
        return 1;
    }
}

?>