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
class server_report_saku3_belajar_vDetailDok extends server_report_basic
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/user2.png";
        
        echo "<div class='row'>
        <div class='col-md-12'>
          <!-- Box Comment -->
          <div class='box box-widget'>
            <div class='box-header with-border'>
              <div class='user-block'>
                Evaluasi Dokumen
              </div>
              <div class='box-tools'>
                <a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_belajar_vDok','','$kode_lokasi/$periode/$kode_pp/$no_agenda');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
              </div>
            </div>
            <!-- /.box-header -->
            <div class='box-body'>
              <img class='img-responsive pad' src='$pathfoto' alt='Photo'>
              Dokumen: $no_gambar;
            </div>
            <!-- /.box-body --> ";
            $sql="select * from uin_comment_d where kode_lokasi= '$kode_lokasi' and kode_dok='$kode_dok' and no_gambar='$no_gambar' and no_agenda='$no_agenda' 
            order by tgl_input,kode_com,time ";
            $res = $dbLib->execute($sql); 

            while ($row = $res->FetchNextObject(false))
            {
    echo"
            <div class='box-footer box-comments'>
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
            }

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
                      
                      <input type='text' class='form-control input-sm' name='comment' placeholder='Press enter to post a comment'>
                  </div>
                </form>
                </div>
                <div class='col-md-2'>
                <button class='btn btn-sm btn-warning ini-tombol'> Send <i class='fa fa-arrow-circle-right'></i></button>
                </div>
              </div>
            </div>
            <!-- /.box-footer -->
          </div>
          <!-- /.box -->
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
            $('.tombol-simpan').click(function(){
                $.ajax({
                    type: 'POST',
                    url: 'uinSimpan.php',
                    dataType: 'json',
                    data: $('.form-user').serialize(),
                    success:function(result){
                        if(result.status){
                            alert('Selamat, input komen sukses');
                            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_uin_vDetailDok','','$kode_lokasi/$periode/$kode_pp/$kode_dok/$no_gambar/$no_agenda');
                        }else{
                          
                            alert('harap isi inputan dengan benar');
                        }
                        
                    },
                    error: function(xhr, Status, err) {
                        $('Terjadi error : '+Status);
                    }
                });
            });
            $('.ini-tombol').click(function(){
                $.ajax({
                  type: 'POST',
                  url: 'simpanData2.php',
                  dataType: 'json',
                  data: $('.form-user').serialize(),
                  success:function(result){
                      if(result.status){
                          alert('Selamat, input komen sukses');
                          window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_belajar_vDetailDok','','$kode_lokasi/$periode/$kode_pp/$kode_dok/$no_gambar/$no_agenda');
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
