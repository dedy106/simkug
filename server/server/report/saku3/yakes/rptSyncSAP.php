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
class server_report_saku3_yakes_rptSyncSAP extends server_report_basic
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
        $nik=$tmp[3];
        $nik_user=$tmp[4];
        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;			
        $_SESSION['kodePP'] = $kode_pp;
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser = $link."/web/server/yakes";
        $root = $link;
        $path = $link."/";
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
      
    echo "
      <div id='loading-overlay' style='background: rgba(233, 233, 233, 0.34) none repeat scroll 0% 0%; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;'>
          <center>
              <img src='$link/image/stackspinner.gif' style='position:fixed; top: 50%; transform: translateY(-50%);'>
          </center>
      </div>";
      echo"
        <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        body {
          font-family: 'Roboto', sans-serif !important;
        }
        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
          font-family: 'Roboto', sans-serif !important;
          font-weight: normal !important;
        }
        h3{
          margin-bottom: 5px;
          font-size:18px !important
        }
        h2{
          margin-bottom: 5px;
          margin-top:5px;
        }
        .judul-box{
          font-weight:bold;
          font-size:18px !important;
        }
        .inner{
          padding:5px !important;
        }
        
        .box-nil{
          margin-bottom: 20px !important;
        }
        
        .pad-more{
          padding-left:0px !important;
          padding-right:10px !important;
        }
        .mar-mor{
          margin-bottom:10px !important;
        }
        .box-wh{
          box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
        }
        #ajax-content-section{
          background: white !important;
        }
        th{
          vertical-align: middle !important; 
        }
        .badge-success{
          background:#00a65a;
        }
        .badge-danger{
          background:#dd4b39;
        }
        </style>
          <div id='nw_container'>
            <form id='nw_form_insert'>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12'>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Periode</label>
                                <div style='margin-bottom:5px;' class='col-sm-2'>
                                    <select class='form-control' id='per' name='periode'>
                                    <option value=''>Pilih Periode</option>";
                                    $sql = "select distinct periode 
                                    from periode 
                                    union all
                                    select substring(convert(varchar,getdate(),112),1,6) as periode 
                                    order by periode desc ";
                                    $rs = $dbLib->execute($sql);
                                    
                                    while($row = $rs->FetchNextObject($toupper=false)){
                                        echo " <option value='$row->periode' $selected>$row->periode</option>";
                                    }
                                    echo"
                                    </select>
                                </div>
                                <div class='col-sm-2'>
                                <a type='button' href='#' class='btn btn-primary' style='margin-bottom: 10px;' id='saveBtn' >Sync Data</a>
                                </div>
                            </div>
                        </div>
                        <div class='row' id='progress-load' style='display:none'>
                            <div class='col-sm-5'>
                                Loading ..
                                <div class='progress'>
                                    <div class='progress-bar progress-bar-striped active' role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'>
                                        <span class='src-only'>0%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-sm-12' id='isi-sql'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
          </div>
          <script type='text/javascript'>

          $('#per').selectize();
          $('#per')[0].selectize.setValue('$periode');
         
          var iconloading = $('#loading-overlay');
          


          $('#nw_container').on('click', '#saveBtn', function(e){
              e.preventDefault();
              var per = $('#per')[0].selectize.getValue();
              if(per ==''){
                alert('periode harap dipilih');
                return false;
              }else{
                $('#progress-load').show();
                $('.progress-bar').attr('aria-valuenow', 0).css({
                    width: 0 + '%'
                }).html(parseFloat(0 * 100).toFixed(2) + '%');
                $.ajax({
                  xhr: function () {
                      var xhr = new window.XMLHttpRequest();
                      xhr.upload.addEventListener('progress', function (evt) {
                          if (evt.lengthComputable) {
                              var percentComplete = evt.loaded / evt.total;
                              $('.progress-bar').attr('aria-valuenow', percentComplete * 100).css({
                                  width: percentComplete * 100 + '%'
                              }).html(parseFloat(percentComplete * 100).toFixed(2) + '%');
                              
                          }
                      }, false);
                      xhr.addEventListener('progress', function (evt) {
                          if (evt.lengthComputable) {
                              var percentComplete = evt.loaded / evt.total;
                              $('.progress-bar').css({
                                  width: percentComplete * 100 + '%'
                              });
                          }
                      }, false);
                      return xhr;
                  },
                  type: 'GET',
                  url: '$link/server/getFBL3N.php?periode='+per,
                  dataType: 'json',
                  success:function(result){
                    console.log('sukses');                
                    $('#progress-load').hide();  
                    $('#isi-sql').html(result);
                  },
                  fail: function(xhr, textStatus, errorThrown){
                    console.log('fail');
                    alert('request failed:'+textStatus);
                    $('#progress-load').hide();
                  },
                  complete: function (data) {
                    console.log('complete');  
                    $('#progress-load').hide();  
                    $('#isi-sql').html(data.responseText);  
                   }
                });
              }
              
          });

        </script>      
        ";
		return "";
	}
	
}
?>
