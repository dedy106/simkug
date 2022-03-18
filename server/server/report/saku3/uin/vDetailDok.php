<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_uin_vDetailDok extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
    }
    
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $kode_dok=$tmp[3];
        $no_gambar=$tmp[4];
        $no_agenda=$tmp[5];
        $nama=$tmp[6];
        $nik=$tmp[7];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
        $path = $_SERVER["SCRIPT_NAME"];					
		    $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/user2.png";

        $pathdok = $path . "server/media/".$no_gambar;     	
        
        echo "<div class='row'>
        <div class='col-md-12'>
        <div class='nav-tabs-custom'>
                <ul class='nav nav-tabs '>
                    <li class='active'><a href='#tab_1' data-toggle='tab'>Evaluasi Pengajuan $nama</a></li>
                    <li class='pull-right header'><a style='font-size:14px;padding-right:0px' class='small-box-footer' href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_uin_vDok','','$kode_lokasi/$periode/$kode_pp/$no_agenda/$nik');\"> Back <i class='fa fa-arrow-circle-left'></i></a></li>
                </ul>
          <!-- Box Comment -->
          <div class='box box-widget'>
            <div class='box-body'>
              <img class='img-responsive pad' src='$pathfoto' alt='Photo'>
              Dokumen: $no_gambar;
              <a class='btn btn-sm' style='background:rgb(87, 169, 255);color:white;border-top:0;border-left:0;border-right:0;border-bottom:0;font-style:bold;font-size:11px;text-decoration:none;font-family:sans-serif;' href='$pathdok' target='_blank'>Download <i class='fa fa-arrow-circle-down'></i></a>
            </div>
            <!-- /.box-body --> ";
            echo"  <!-- /.box-footer -->
            <div class='box-footer'>
              <div class='row'>
                <div class='col-md-10'>
                <form class='form-user' method='POST' id='form-comment'>
                  <img class='img-responsive img-circle img-sm' src='$pathfoto' alt='Alt Text'>
                  <div class='img-push'>
                      <input type='hidden' class='form-control input-sm' name='kode_dok' value='$kode_dok'>
                      <input type='hidden' class='form-control input-sm' name='no_gambar' value='$no_gambar'>
                      <input type='hidden' class='form-control input-sm' name='no_agenda' value='$no_agenda'>
                      <input type='hidden' class='form-control input-sm' name='kode_lokasi' value='$kode_lokasi'>
                      <input type='hidden' class='form-control input-sm' name='nik' value='$nik'>
                      <input type='text' class='form-control input-sm' name='comment' placeholder='Klik send to post a comment'>
                  </div>
                </form>
                </div>
                <div class='col-md-2'>
                <button class='btn btn-sm btn-primary ini-tombol'> Send <i class='fa fa-arrow-circle-right'></i></button>
                </div>
              </div>
            </div>
            <!-- /.box-footer -->";

            $sql="select * from uin_comment_d where kode_lokasi= '$kode_lokasi' and kode_dok='$kode_dok' and no_gambar='$no_gambar' and no_agenda='$no_agenda' 
            order by kode_com desc ";
            $res = $dbLib->execute($sql);

            $i=0;
            while ($row = $res->FetchNextObject(false))
            {
              if($i % 2 == 1){
                  $color="style='background-color:white'";
              }else{
                  $color="";
              }
    echo"
            <div class='box-footer box-comments' $color>
              <div class='box-comment'>
                <img class='img-circle img-sm' src='$pathfoto' alt='User Image'>
                <div class='comment-text'>
                      <span class='username'>
                        $row->nik_user
                        <span class='text-muted pull-right'>".$row->tgl_input." ".$row->time."</span>
                      </span><!-- /.username -->
                        $row->comment
                </div>
              </div>
            </div>";
              $i++;
            }

          echo"
          </div>
          <!-- /.box -->
          </div>
        </div>";
        echo "<script type='text/javascript'>
        $(document).ready(function(){
          $('input').on('keyup keypress', function(e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) { 
              e.preventDefault();
              return false;
            }
          });
          $('.ini-tombol').click(function(){
            $.ajax({
              type: 'POST',
              url: 'simpanData2.php',
              dataType: 'json',
              data: $('.form-user').serialize(),
              success:function(result){
                  if(result.status){
                      window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_uin_vDetailDok','','$kode_lokasi/$periode/$kode_pp/$kode_dok/$no_gambar/$no_agenda/$nama/$nik');
                  }else{
                    
                      alert('harap isi inputan dengan benar');
                  }
                  
              },
              error: function(xhr, Status, err) {
                  $('Terjadi error : '+Status);
              }
            });
          });
        });
        </script>";
		return "";
	}
	
}
?>
