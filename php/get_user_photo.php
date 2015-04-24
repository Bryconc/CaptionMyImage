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
    $mysql_query = "SELECT photo_id from photo WHERE uploaded_by = $id ORDER BY upload_date DESC";
    $query_result = $GLOBALS['mysqllink']->query($mysql_query);
    
    $return_info = "";
   
    while ($row = $query_result->fetch_object()) {
        $return_info .= $row->photo_id . " ";
    }
    
    echo $return_info;
}

?>