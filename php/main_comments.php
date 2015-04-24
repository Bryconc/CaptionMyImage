<?php
ini_set('display_errors',1);  error_reporting(E_ALL);

$mysqllink = connectToDB();

getPageData();

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData() {
    $mysql_query = "SELECT * FROM comment JOIN user WHERE id=posted_by ORDER BY date_posted DESC LIMIT 5";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $return_info .= "$row->photo_id&$row->comment_id&$row->comment_text&$row->posted_by&$row->name&$row->date_posted&$row->upvotes&$row->downvotes\n";
    }
    
    echo $return_info;
}

?>