
<?php
require 'connectdb.php';
//Check if an Ajax Request and choose the required option
if (is_ajax()) {
    if (isset($_GET["quote"]) && !empty($_GET["quote"])) { //Checks if action value exists
        $action = $_GET["quote"];
        getQuote($action);
    }
    else if (isset($_GET["search"])){
        $action = $_GET["search"];
        search($action);
    }
    else if (isset($_GET["history"]) && !empty($_GET["history"]))
    {
      $action = $_GET["history"];
      getHistory($action);
    }
}
//Get Specific Quote from Database
function getQuote ($query = ""){
    $objDBUtil = new DbUtil;
    $db = $objDBUtil->open();
    $query = "SELECT *  from symbols left outer join quotes on symSymbol=qSymbol  where symSymbol='$query'  order by qQuoteDateTime desc  limit 1";
    $objDBUtil->DBQuotes($query) ;
    //print "Query: {$query}";
    $result = $db->query($query);
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
    @$rows->free();  // Release memory for resultset
    $objDBUtil->close();   // Close the database connection
    $return = $_GET;
}
//search for a specific quote or history of a company's symbol
function search($name = ''){
    $objDBUtil = new DbUtil;
    $db = $objDBUtil->open();
    $query = "SELECT symSymbol, symName FROM symbols WHERE INSTR(symSymbol, '$name') OR INSTR(symName, '$name') Order By symSymbol ASC";

    $objDBUtil->DBQuotes($query) ;
    //print "Query: {$query} <br />\n";
    $result = $db->query($query);
    if (! $result)
    {
      print "Invalid query result<br />\n";
    }
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);
    @$rows->free();  // Release memory for resultset
    $objDBUtil->close();   // Close the database connection
    $return = $_GET;
}
//get the history of a specific company's quote
function getHistory($query = ""){
  $objDBUtil = new DbUtil;
  $db = $objDBUtil->open();
  $query = "SELECT symExchange, symSymbol, symName, qQuoteDateTime, qLastSalePrice, qNetChangePrice, qNetChangePct, qShareVolumeQty from symbols join quotes on symSymbol=qSymbol  where symSymbol='$query'  order by qQuoteDateTime desc";
  $objDBUtil->DBQuotes($query) ;
  //print "Query: {$query}";
  $result = $db->query($query);
  $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
      $rows[] = $r;
  }
  echo json_encode($rows); //returns json encoded rows
  @$rows->free();  // Release memory for resultset
  $objDBUtil->close();   // Close the database connection
  $return = $_GET; //

}

//Function to check if the request is an AJAX request
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

?>
