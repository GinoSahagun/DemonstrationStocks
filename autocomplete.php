<?php
require 'connectdb.php';

if (is_ajax()) {
    if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
        $action = $_GET["action"];
        switch($action) { //Switch case for value of action
            case "symSymbol": test_function($action); break;
        }
    }
}
//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}
function test_function($strSymbol){
    $objDBUtil = new DbUtil;
    $db = $objDBUtil->open();
    $query = "SELECT symName FROM symbols";
    $objDBUtil->DBQuotes($query) ;
    //print "Query: {$query}";
    $result = $db->query($query);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[$r['symName']] = null;
    }

    echo json_encode($rows);
    @$rows->free();  // Release memory for resultset
    $objDBUtil->close();   // Close the database connection
    $return = $_GET;
}
?>
