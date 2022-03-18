<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $sts_user=$_SESSION['userStatus'];

    if(isset($_GET['tab'])){
        $tab=$_GET['tab'];
    } else {
        $tab="1";
    }

    $column = array('Home','Notifikasi','Dokumen','Akun');
    $hal = array('fTab1','fTab2','fTab3','fTab4');

?>

    <div class='nav-tabs-custom'>
        <ul class='nav nav-tabs'>
<?php for ($i=0;$i<count($column);$i++) { 
            $id = $i+1;
            if($tab == $id){
                $class="class='active' ";
                $open=$hal[$i];
            }else{
                $class="";
            }
            echo"
            <li id='$id' $class ><a href='fMain.php?hal=app/belajar/fTab.php&tab=$id' >".$column[$i]."</a></li>";
    }
?>
        </ul>
        <div class='tab-content'>
            <div class='tab-pane active'>
                <?php include($open.".php"); ?>
            </div>
        </div>
    </div>


