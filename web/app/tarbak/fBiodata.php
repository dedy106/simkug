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

    $column = array('Biodata','Kepegawaian','Kedinasan','Pendidikan','Keluarga','Pelatihan','Penghargaan','Sanksi');
    $hal = array('fDataPribadi','fKepegawaian','fKedinasan','fPendidikan','fKeluarga','fPelatihan','fPenghargaan','fSanksi');
    $action = array('Update','Update','Add','Add','Add','Add','Add','Add');

    
    $path = "http://".$_SERVER["SERVER_NAME"]."/";

?>

    <div class='nav-tabs-custom'>
        <ul class='nav nav-tabs'>
<?php for ($i=0;$i<count($column);$i++) { 
            $id = $i+1;
            if($tab == $id){
                $class="class='active' ";
                $open=$hal[$i];
                if($action[$i] == "Update"){
                    $link = "<li class='pull-right'><a href='#' id='a".$column[$i]."'><i class='fa fa-pencil'></i> Ubah Data</a></li>";
                }else{
                    $link = "<li class='pull-right'><a href='#' id='a".$column[$i]."'><i class='fa fa-plus'></i> Tambah</a></li>";
                }
            }else{
                $class="";
            }
            echo"
            <li id='$id' $class ><a href='fMain.php?hal=app/tarbak/fBiodata.php&tab=$id' >".$column[$i]."</a></li>";
            
    }
    
    echo $link;
?>
        </ul>
        <div class='tab-content'>
            <div class='tab-pane active'>
                <?php include($open.".php"); ?>
            </div>
        </div>
    </div>


