<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

function connectToDB() {
    $mysqllink = new mysqli("localhost", "carpenterba", "XpnadT8bZ5pdKuXq", "carpenterba");

    if (mysqli_connect_errno()) {
        exit();
    }

    return $mysqllink;
}

$mysqllink = connectToDB();

$output_dir = "../images/";
$ImageID = getNewImageID();
$UserID = 1;
$path = $_FILES['file']['name'];

if (isset($_FILES["file"])) {
    //Filter the file types , if you want.
    if ($_FILES["file"]["error"] > 0) {
        echo "Error: " . $_FILES["file"]["error"] . "<br>";
    } else {
        //move the uploaded file to uploads folder;
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $output_dir . $ImageID . ".jpg")) {
            echo "Uploaded File :" . $_FILES["file"]["name"];
            echo "Working with " . $output_dir . $ImageID . ".jpg";
        } else {
            echo "Error in file upload";
        }
    }

    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
    } else {
        $user_id = 1;
    }

    $mysql_query = "INSERT INTO photo VALUES($ImageID, $user_id, NOW());";

    if ($mysqllink->query($mysql_query)) {
        echo 'success';
    } else {
        echo 'failure';
    }

    header("Location: ../");

    exit;
}

function getNewImageId() {
    $query = $GLOBALS['mysqllink']->query("SELECT MAX(photo_id) as photo_id from photo");

    $row = $query->fetch_object();
    if ($row) {
        return $row->photo_id + 1;
    }
}
