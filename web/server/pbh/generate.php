<?php
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function generate(){

        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
        
        $partno       = $_GET['partno'];
        $qty          = $_GET['qty'];
        $desc         = $_GET['desc'];
        $turn         = $_GET['turn'];
        $po           = $_GET['po'];
        $serial       = $_GET['serial'];
        
        $html = "
            <table border='1'>
                <tr>
                    <td colspan='2' width='300'>Part No <b>".$partno."</b> <br /> 
                    (P) <img alt='".$_GET['partno']."' src='$root_app/barcode.php?size=30&text=$partno' /></td>
                    <td width='200'><center><h2>MASTER</h2></center></td>
                </tr>
                <tr>
                    <td width='200'>Quantity <b>".$qty."</b><br /> 
                    (Q) <img alt='".$_GET['qty']."' src='$root_app/barcode.php?size=30&text=$qty' /></td>
                    <td width='100'><center><b>CUSTOMER <br /> Facility</b></center></td>
                    <td width='200'>PART NO. <br />$partno<br /> DESCRIPTION <br />$desc</td>
                </tr>
                <tr>
                    <td width='200'>TURN AROUND # <b>$turn</b><br /> 
                    (7) <img alt='".$_GET['turn']."' src='$root_app/barcode.php?size=30&text=$turn' /></td>
                    <td colspan='2' width='300'>PO # <b>$po</b><br /> 
                    (K) <img alt='".$_GET['po']."' src='$root_app/barcode.php?size=30&text=$po' /></td>
                </tr>
                <tr>
                    <td colspan='2' width='270'>SERIAL (4S) <b>$serial</b><br /> 
                    (7) <img alt='".$_GET['serial']."' src='$root_app/barcode.php?size=30&text=$serial' />
                    <br /> HAKKO BIO RICHARD &copy; 2017 </td>
                    <td><center>PRINT DATE</center> <br />
                    <center><b>".date('d/m/Y')."</b></center></td>
                </tr>
                </table><br />
               ";

        $response["html"]=$html;
        $response["status"]=true;
        $response["message"]="Generate Barcode Sukses";
        echo json_encode($response);

    }

?>
