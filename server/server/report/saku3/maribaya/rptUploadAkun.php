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
class server_report_saku3_maribaya_rptUploadAkun extends server_report_basic
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
        $_SESSION['userLog'] = "ypkpln";
        $_SESSION['userPwd'] = "saisai";
        $_SESSION['lokasi'] = $kode_lokasi;
    
        
    $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/maribaya";
		
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
                     
                      <button class='btn btn-success disabled pull-right' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' disabled=''><i class='fa fa-plus-circle'></i> Save</button>
                      <!--<button type='submit' class='btn btn-primary pull-right' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='validate'></i> Validate</button>-->
                    </div>
                    <div class='col-md-12'>
                      
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-3'>File</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                              <input name='file_dok' type='file' id='file_dok'>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
            </form>
            <!-- Datatable -->
            <div id='nw_datatable'>
                <div class='row'>
                    <div class='col-xs-12'>
                      <div class='nav-tabs-custom'>
                          <ul class='nav nav-tabs'>
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data Akun</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Error Msg</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-xjan' style='font-size: 12px;' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Kode Akun</th>
                                      <th>Lokasi</th>
                                      <th>Nama</th>
                                      <th>Modul</th>
									  <th>Jenis</th>
									  <th>Kode Curr</th>
									  <th>Block</th>
									  <th>Gar</th>
									  <th>Normal</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_2'>
                            <div class='sai-container-overflow-x'>
                                <table class='table table-bordered table-striped Datatable' id='table-error' style='font-size:12px'>
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th width='120px'>ID Invalid</th>
                                      <th width='400px'>Pesan</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                      </div>   
                    </div>
                </div>
            </div>
          </div>
          <script type='text/javascript'>

         
		  var dataTable = $('#table-xjan').DataTable({
            'processing': true,
            'serverSide': true,
            'ajax': {
                'url': '$root_ser/UploadExcel.php?fx=getAkun',
                'data': {'kode_lokasi':'$kode_lokasi'},
                'type': 'GET',
                'dataSrc' : function(json) {
                    return json.data;   
                }
            }
          });

          $('#table-error').DataTable();
		  
          var iconloading = $('#loading-overlay');

          $('#nw_container').on('submit', '#nw_form_insert', function(e){
            e.preventDefault();
            iconloading.show();
            var formData = new FormData(this);
            
            for(var pair of formData.entries()) {
              console.log(pair[0]+ ', '+ pair[1]); 
            }
            var kode_lokasi = '$kode_lokasi';
            formData.append('kode_lokasi',kode_lokasi);
            
            $.ajax({
              type: 'POST',
              url: '$root_ser/UploadExcel.php?fx=simpanAkunTmp',
              dataType: 'json',
              data: formData,
              contentType: false,
              cache: false,
              processData: false, 
              success:function(result){
                alert('Input data '+result.message);
                if(result.status){
                  dataTable.ajax.reload();
                  $('#table-error tbody').html('');
                  $('#saveBtn').removeClass('disabled');
                  $('#saveBtn').prop('disabled', false);
                  iconloading.hide();
                }else{
                  var html ='';
                 
                  iconloading.hide();
                }
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            });
          });


          $('#nw_container').on('click', '#saveBtn', function(e){
            e.preventDefault();
            iconloading.show();
            
              $.ajax({
                type: 'POST',
                url: '$root_ser/UploadExcel.php?fx=simpanAkun',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi'},
                success:function(result){
                  alert('Input data '+result.message);
                  if(result.status){
                    dataTable.ajax.reload();
                    // $('#table-error tbody').html('');
                    $('#saveBtn').addClass('disabled');
                    $('#saveBtn').prop('disabled', true);
                    iconloading.hide();
                  }
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                }
              });
            
            
          });

          $('#file_dok').change(function(e){
              $('#nw_form_insert').submit();
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
