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
class server_report_saku3_tm_rptUploadHutang extends server_report_basic
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
        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser = $link."/web/server/tm";
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
                              <select class='form-control' id='per' name='periode'>
                              <option value=''>Pilih Periode</option>";
                              $sql = "select distinct periode 
                              from periode 
                              where kode_lokasi='$kode_lokasi' 
                              union all
                              select substring(convert(varchar,getdate(),105),7,4)+substring(convert(varchar,getdate(),105),4,2) as periode 
                              order by periode desc ";
                              $rs = $dbLib->execute($sql);
                              
                              while($row = $rs->FetchNextObject($toupper=false)){
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
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data Hutang</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Error Msg</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-hut' style='font-size: 12px;' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Kode PBF</th>
                                      <th>Nama</th>
                                      <th>Kode PP</th>
                                      <th>Tgl Invoice</th>
                                      <th>No Invoice</th>
                                      <th>No FPajak</th>
                                      <th>Tgl FPajak</th>
                                      <th>Kredit</th>
                                      <th>Harga</th>
                                      <th>Diskon</th>
                                      <th>Harga Diskon</th>
                                      <th>PPN</th>
                                      <th>Harga PPN</th>
                                      <th>Tgl Jatuh Tempo</th>
                                      <th>Jenis Trans</th>
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

          function clearTmp(){
              $.ajax({
                  type: 'GET',
                  url: '$root_ser/UploadExcel.php?fx=clearTmpHut',
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
          $('#per')[0].selectize.setValue('$periode');

          var dataTable = $('#table-hut').DataTable({
            // 'processing': true,
            // 'serverSide': true,
            'ajax': {
                'url': '$root_ser/UploadExcel.php?fx=getHutTmp',
                'data': {'kode_lokasi':'$kode_lokasi'},
                'type': 'GET',
                'dataSrc' : function(json) {
                    return json.data;   
                }
            },
            'columnDefs': [
              {
                    'targets': [7,8,9,10,11,12],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 2, '' )
              }
            ],
            columns: [
                { data: 'kode_pbf' },
                { data: 'nama' },
                { data: 'kode_pp' },
                { data: 'tgl_invoice' },
                { data: 'no_invoice' },
                { data: 'no_fpajak' },
                { data: 'tgl_pajak' },
                { data: 'kredit' },
                { data: 'harga' },
                { data: 'diskon' },
                { data: 'hrg_diskon' },
                { data: 'ppn' },
                { data: 'harga_ppn' },
                { data: 'tgl_jth_tempo' },
                { data: 'jenis_trans' }
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
            var nik = '$nik';
            formData.append('nik_user',nik);
            
            $.ajax({
              type: 'POST',
              url: '$root_ser/UploadExcel.php?fx=simpanHutTmp',
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
                }else{
                  var html ='';
                  for(var i=0;i< result.error_ins.length;i++){
                      html +=`<tr>
                        <td>`+result.error_ins[i].no_invoice+`</td>
                        <td>`+result.error_ins[i].err_msg+`</td>
                      </tr>`;
                  }
                  $('#table-error tbody').html(html);
                  $('.nav-tabs a[href=\"#tab_2\"]').tab('show');
                }
                
                iconloading.hide();
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
            if(per ==''){
              alert('periode harap dipilih');
              return false;
            }else{
              $.ajax({
                type: 'POST',
                url: '$root_ser/UploadExcel.php?fx=simpanHut',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','periode':per,'nik_user':'$nik'},
                success:function(result){
                  alert('Input data '+result.message);
                  if(result.status){
                    dataTable.ajax.reload();
                    $('#saveBtn').addClass('disabled');
                    $('#saveBtn').prop('disabled', true);
                  }else{
                    $('#saveBtn').addClass('disabled');
                    $('#saveBtn').prop('disabled', true);
                    var html ='';
                    if(result.error.length > 0) {
                      for(var i=0;i< result.error.length;i++){
                        html +=`<tr>
                        <td>`+result.error[i].kode+`</td>
                        <td>`+result.error[i].err_msg+`</td>
                        </tr>`;
                      }
                      $('#table-error tbody').html(html);
                      $('.nav-tabs a[href=\"#tab_2\"]').tab('show');
                    }
                  }
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                }
              });
            }
            
            iconloading.hide();
            
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
