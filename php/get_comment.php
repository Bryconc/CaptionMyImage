<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

if(isset($_POST['photo_id'])){
    getPageData($_POST['photo_id']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "[redacted]", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($id) {
    $mysql_query = "SELECT * from comment JOIN user WHERE id = posted_by AND photo_id = $id ORDER BY date_posted DESC LIMIT 10";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $return_info .= "$id&$row->comment_id&$row->comment_text&$row->posted_by&$row->name&$row->date_posted&$row->upvotes&$row->downvotes\n";
    }
    
    echo $return_info;
}

?>