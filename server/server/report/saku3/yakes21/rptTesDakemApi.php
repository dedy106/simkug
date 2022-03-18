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
class server_report_saku3_yakes21_rptTesDakemApi extends server_report_basic
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
             
    session_start();
    $_SESSION['isLogedIn'] = true;				
    $_SESSION['userLog'] = "admin21";
    $_SESSION['lokasi'] = $kode_lokasi;
    
    $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
    $root_ser=$link."/web/server/yakes";
    $root=$link;
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
        </style>
          <div id='nw_container'>
            <form id='nw_form_insert'>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12' style='margin-bottom: 10px;box-shadow: 0px 0px 1px white;border-bottom: 1px solid #ece7e7;'>
                      <button class='btn btn-success pull-right' type='submit' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' ><i class='fa fa-plus-circle'></i> Get Data</button>
                    </div>
                    <div class='col-md-12'>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-3'>NIK</label>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                                <input type='text' name='nik' id='nik' class='form-control'>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
            </form>
            <!-- Datatable -->
            <div id='nw_datatable'>
                <div class='row'>
                    <div class='col-xs-12' id='result-api'>
                        
                    </div>
                </div>
            </div>
          </div>
          <script type='text/javascript'>

          var iconloading = $('#loading-overlay');

          $('#nw_container').on('submit', '#nw_form_insert', function(e){
            e.preventDefault();
            iconloading.show();
            var nik = $('#nik').val();
            if(nik == ''){
                alert('NIK wajib diisi');
                return false;
            }
            $.ajax({
                type: 'POST',
                url: '$root_ser/TesDakemApi.php?fx=getPesertaDakemByNIK',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','nik':nik},
                success:function(result){
                    $('#result-api').html(JSON.stringify(result));
                    iconloading.hide();
                },
                fail: function(xhr, textStatus, errorThrown){
                    alert('request failed:'+textStatus);
                    iconloading.hide();
                }
            });
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
