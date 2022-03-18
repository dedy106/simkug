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
class server_report_saku3_yakes_inves_rptUploadShmExcel extends server_report_basic
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
    $_SESSION['userLog'] = "919006";
    $_SESSION['userPwd'] = "pusat25";
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
                     
                      <button class='btn btn-success disabled pull-right' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' disabled=''><i class='fa fa-plus-circle'></i> Save</button>
                      <!--<button type='submit' class='btn btn-primary pull-right' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='validate'></i> Validate</button>-->
                    </div>
                    <div class='col-md-12'>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-3'>Periode</label>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                              <select class='form-control' id='per'>
                              <option value=''>Pilih Periode</option>";
                              $sql = " select distinct periode 
                              from periode 
                              where kode_lokasi='$kode_lokasi' 
                              union all
                              select substring(convert(varchar,getdate(),105),7,4)+substring(convert(varchar,getdate(),105),4,2) as periode 
                              order by periode desc ";
                              $rs = $dbLib->execute($sql);
                              
                              while($row = $rs->FetchNextObject($toupper=false)){
                                  if($periode == $row->periode){
                                      $selected ="selected";
                                  }else{
                                      $selected ="";
                                  }

                                  echo " <option value='$row->periode' $selected>$row->periode</option>";
                              }
                              echo"
                              </select>
                            </div>
                          </div>
                      </div>
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
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Harga Saham</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Error Msg</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-shm' style='font-size: 12px;' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Kode Saham</th>
                                      <th>TGL-1</th>
                                      <th>TGL-2</th>
                                      <th>TGL-3</th>
                                      <th>TGL-4</th>
                                      <th>TGL-5</th>
                                      <th>TGL-6</th>
                                      <th>TGL-7</th>
                                      <th>TGL-8</th>
                                      <th>TGL-9</th>
                                      <th>TGL-10</th>
                                      <th>TGL-11</th>
                                      <th>TGL-12</th>
                                      <th>TGL-13</th>
                                      <th>TGL-14</th>
                                      <th>TGL-15</th>
                                      <th>TGL-16</th>
                                      <th>TGL-17</th>
                                      <th>TGL-18</th>
                                      <th>TGL-19</th>
                                      <th>TGL-20</th>
                                      <th>TGL-21</th>
                                      <th>TGL-22</th>
                                      <th>TGL-23</th>
                                      <th>TGL-24</th>
                                      <th>TGL-25</th>
                                      <th>TGL-26</th>
                                      <th>TGL-27</th>
                                      <th>TGL-28</th>
                                      <th>TGL-29</th>
                                      <th>TGL-30</th>
                                      <th>TGL-31</th>
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

            function getPeriode(){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/UploadExcel.php?fx=getPeriode2',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi'},
                    success:function(result){  
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){                           
                                for(i=0;i<result.daftar.length;i++){
                                    $('#per')[0].selectize.addOption([{text:result.daftar[i].periode, value:result.daftar[i].periode}]);  
                                    
                                    $('#per')[0].selectize.setValue('$periode');
                                    
                                }
                            }
                        }
                    }
                });
            }

          function clearTmp(){
              $.ajax({
                  type: 'GET',
                  url: '$root_ser/UploadExcel.php?fx=clearTmpShm',
                  dataType: 'json',
                  data: {'kode_lokasi':'$kode_lokasi'},
                  success:function(result){  
                      if(result.status){
                          console.log('clear tmp '+result.status);
                      }
                  }
              });
          }
        
          clearTmp();
          $('#per').selectize();


          // var dataTable = $('#table-shm').DataTable({
          //   'processing': true,
          //   'serverSide': true,
          //   'ajax': {
          //       'url': '$root_ser/UploadExcel.php?fx=getHargaShm',
          //       'data': {'kode_lokasi':'$kode_lokasi','periode':'$periode'},
          //       'type': 'GET',
          //       'dataSrc' : function(json) {
          //           return json.data;   
          //       }
          //   },
          //   'columnDefs': [
          //     {
          //           'targets': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
          //           'className': 'text-right',
          //           'render': $.fn.dataTable.render.number( '.', ',', 2, '' )
          //     }
          //   ]
          // });

          var dataTable = $('#table-shm').DataTable({
            // 'processing': true,
            // 'serverSide': true,
            'ajax': {
                'url': '$root_ser/UploadExcel.php?fx=getHargaShm2',
                'data': {'kode_lokasi':'$kode_lokasi','periode':'$periode'},
                'type': 'GET',
                'dataSrc' : function(json) {
                    return json.data;   
                }
            },
            'columnDefs': [
              {
                    'targets': [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 2, '' )
              }
            ],
            columns: [
                { data: 'kode_saham' },
                { data: 'tgl1' },
                { data: 'tgl2' },
                { data: 'tgl3' },
                { data: 'tgl4' },
                { data: 'tgl5' },
                { data: 'tgl6' },
                { data: 'tgl7' },
                { data: 'tgl8' },
                { data: 'tgl9' },
                { data: 'tgl10' },
                { data: 'tgl11' },
                { data: 'tgl12' },
                { data: 'tgl13' },
                { data: 'tgl14' },
                { data: 'tgl15' },
                { data: 'tgl16' },
                { data: 'tgl17' },
                { data: 'tgl18' },
                { data: 'tgl19' },
                { data: 'tgl20' },
                { data: 'tgl21' },
                { data: 'tgl22' },
                { data: 'tgl23' },
                { data: 'tgl24' },
                { data: 'tgl25' },
                { data: 'tgl26' },
                { data: 'tgl27' },
                { data: 'tgl28' },
                { data: 'tgl29' },
                { data: 'tgl30' },
                { data: 'tgl31' }
            ]
    
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
              url: '$root_ser/UploadExcel.php?fx=simpanShmTmp',
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
                  for(var i=0;i< result.error_ins.length;i++){
                      html +=`<tr>
                        <td>`+result.error_ins[i].kode_saham+`</td>
                        <td>`+result.error_ins[i].err_msg+`</td>
                      </tr>`;
                  }
                  console.log(html);
                  $('#table-error tbody').html(html);
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
            var per = $('#per')[0].selectize.getValue();
            // alert (per);
            if(per ==''){
              alert('periode harap dipilih');
              return false;
            }else{
              $.ajax({
                type: 'POST',
                url: '$root_ser/UploadExcel.php?fx=simpanShmHarga',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','periode':per},
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
            }
            
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
