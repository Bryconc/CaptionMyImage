<?php
ini_set('display_errors',1);  error_reporting(E_ALL);


if(isset($_POST['photo_offset'])){
    getPageData($_POST['photo_offset']);
}

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "happypk", "carpenterba");
    
    if (mysqli_connect_errno()) {
        exit();
    }
    
    return $mysqllink;
}

function getPageData($photo_offset) {
    $mysqllink = connectToDB();
    $photo_offset_upper = $photo_offset + 9;
    
    $query = $mysqllink->query("SELECT photo_id FROM photo ORDER BY photo_id DESC LIMIT $photo_offset, $photo_offset_upper");
    
    $html = "";
    if ($row = $query->fetch_object()) {
        $html .= $row->photo_id;
    }
    while ($row = $query->fetch_object()) {
        $html .= " " . $row->photo_id;
    }
    echo $html;
}

?>