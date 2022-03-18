<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');
    
    $path = "http://".$_SERVER["SERVER_NAME"]."/";
    $pathimg = $path."image/user2.png";

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRA".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$kode_lokasi."' ";
    
    $query = execute($sql2);

    $no_app = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

?>
<div id='saiweb_container'>
    <div id='web_datatable'>
        <div class="box box-widget">
          <div class="box-header">                    
            <a href="fMain.php?hal=app/siaga/dashSiaga.php" style='position:relative' class="small-box-footer btn btn-default pull-left" style="margin-right: 5px;"> Back<i class="fa fa-arrow-circle-left"></i></a>
            <div class="col-sm-10 pull-center" style=""><h4> Daftar Notifikasi </h4>
            </div>
          </div>                                
          <div class="box-body">
          </div>
          <?php 
          $sql="select * from api_notif where kode_lokasi='".$_SESSION['lokasi']."' and nik='".$_SESSION['userLog']."' order by tgl_notif desc ";
        
          $rs1=execute($sql);
          
          if($rs1->RecordCount() > 0){
            $i=0;
            while ($row1 = $rs1->FetchNextObject($toupper=false)){
              echo"
              <a class = 'web_datatable_edit' href='#' role='button'>
                <div class='box-footer box-comments' style='background:white'>
                  <div class='box-comment'>
                    <div class='comment-text' style='margin-left:0px'>
                      <span class='username'> $row1->title</span>
                      </span><!-- /.username -->
                      <span>$row1->pesan<span class='text-muted pull-right' style='font-size:14px'>$row1->tgl_notif</span></span>
                    </div>
                  </div>
                </div>
              </a>
              ";
              $i++;
            }
          }
          ?>
        </div>
    </div>
</div>
    

<script>
</script>

