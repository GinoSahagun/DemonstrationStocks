<?php
class DbUtil
{
    public $db = null;
    public $host = "mysql.cs.spu.edu";
    public $port = "";
    public $user = "sahagunc";
    public $password = "sahagunc.sahagunc";
    public $defaultDB = "quotesdb";
    function __construct()
    {
        # code...
    }
    function open($useDB = ""){
        if ($this->db == null)
        {
            if ($useDB != "")
                $this->defaultDB = $useDB;
            $this->db = @new mysqli($this->host, $this->user, $this->password, $this->defaultDB);
            if($this->db->connect_errno)
                die("Could not connect to database. Error[{$db->connect_errno}]");
        }
        else if ($useDB != "" && $useDB != $this->defaultDB )
        {
            $this->defaultDB = $useDB;
            @$this->db.select_db($this->defaultDB);
        }
        return $this->db;
    }
    function close(){
        if ($this->db != null)
        {
            $this->db->close();
            $this->db = null;
        }
    }
    function DBQuotes($strSQL) {
        if(! get_magic_quotes_gpc()){
            return "'" . addslashes($strSQL) . "'";
        }
        return "'" . $strSQL . "'";
    }
}
?>
