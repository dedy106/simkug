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
class server_report_saku3_sju16_rptEmail2 extends server_report_basic
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
        $_SESSION['pass'] = $tmp[4];
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser = $link."/web/server/sju";
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
        .locked {
          background: #f8f8f8;
          cursor:not-allowed;
        }
        </style>
          <div id='nw_container'>
            <form id='nw_form_insert'>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12' style='margin-bottom: 10px;box-shadow: 0px 0px 1px white;border-bottom: 1px solid #ece7e7;'>
                     
                      <button class='btn btn-success disabled pull-right' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' disabled=''>Kirim Email</button>
                      <!--<button type='submit' class='btn btn-primary pull-right' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='validate'></i> Validate</button>-->
                    </div>
                    <div class='col-md-12'>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-2'>Acc Marketing</label>
                            <div class='col-sm-1' style='margin-bottom:5px;'>
                              <select class='form-control selectize' id='kode_pic_tipe' name='kode_pic[]'>
                                <option value='all'>All</option>
                                <option value='='>=</option>
                                <option value='range'>Range</option>
                              </select>
                            </div>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                              <select class='form-control' id='kode_pic_awal' name='kode_pic[]'>
                              <option value=''>Pilih Acc Marketing</option>";
                              $sql = "select kode_pic, nama from sju_pic where kode_lokasi='$kode_lokasi' ";
                              $rs = $dbLib->execute($sql);
                              
                              while($row = $rs->FetchNextObject($toupper=false)){
                                  echo " <option value='$row->kode_pic'>$row->kode_pic - $row->nama</option>";
                              }
                              echo"
                              </select>
                            </div>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                              <select class='form-control' id='kode_pic_akhir' name='kode_pic[]'>
                              <option value=''>Pilih Acc Marketing</option>";
                              $sql = "select kode_pic, nama from sju_pic where kode_lokasi='$kode_lokasi' ";
                              $rs = $dbLib->execute($sql);
                              
                              while($row = $rs->FetchNextObject($toupper=false)){
                                  echo " <option value='$row->kode_pic'>$row->kode_pic - $row->nama</option>";
                              }
                              echo"
                              </select>
                            </div>
                          </div>
                      </div>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-2'>Tgl Selesai</label>
                            <div class='col-sm-1' style='margin-bottom:5px;'>
                              <select class='form-control selectize' id='tgl_selesai_tipe' name='tgl_selesai[]'>
                                <option value='all'>All</option>
                                <option value='='>=</option>
                                <option value='range'>Range</option>
                              </select>
                            </div>
                            <div class='col-sm-2' style='margin-bottom:5px;'>
                              <input name='tgl_selesai[]' type='text' class='form-control datepicker-dmy' id='tgl_selesai_awal'>
                            </div>
                            <div class='col-sm-2' style='margin-bottom:5px;'>
                              <input name='tgl_selesai[]' type='text' class='form-control datepicker-dmy' id='tgl_selesai_akhir'>
                            </div>
                            <div class='col-sm-2' style='margin-bottom:5px;'>
                              <button type='submit' class='btn btn-primary' style='margin-bottom: 10px;' id='validate'>Tampil</button>
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
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data PIC</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                                <div class='sai-container-overflow-x' style='75%'>
                                    <table class='table table-bordered table-striped Datatable' id='table-pic' style='font-size: 12px;' >
                                        <thead style='background: #ff9500;color: white;'>
                                          <tr>
                                          <th>Email</th>
                                          <th>Kode PIC</th>
                                          <th>Nama</th>
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
          function reverseDate(date_str, separator,newSepar){
            if(typeof separator === 'undefined'){separator = '-'}
            if(typeof newSepar === 'undefined'){newSepar = '-'}
            date_str = date_str.split(' ');
            var str = date_str[0].split(separator);
            
            return str[2]+newSepar+str[1]+newSepar+str[0];
          }

          $('.datepicker').datepicker({
              autoclose: true,
              format: 'yyyy-mm-dd'
          });
          
          $('.datepicker-dmy').datepicker({
              autoclose: true,
              format: 'dd-mm-yyyy'
          });
          
          $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
              e.preventDefault();
              return false;
          });
          $('#kode_pic_awal').selectize();
          $('#kode_pic_akhir').selectize();

          $('#kode_pic_awal')[0].selectize.setValue('');
          $('#kode_pic_awal')[0].selectize.lock();
          $('#kode_pic_akhir')[0].selectize.setValue('');
          $('#kode_pic_akhir')[0].selectize.lock();
          $('#tgl_selesai_awal').val('');
          $('#tgl_selesai_awal').prop('readonly',true);
          $('#tgl_selesai_akhir').val('');
          $('#tgl_selesai_akhir').prop('readonly',true);


          var dataTable = $('#table-pic').DataTable({
            data: [],
            columns: [
              { data: 'email' },
              { data: 'kode_pic' },
              { data: 'nama' }
              ]
              
            });

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
              url: '$root_ser/Email.php?fx=getPIC',
              dataType: 'json',
              data: formData,
              contentType: false,
              cache: false,
              processData: false, 
              success:function(result){
                console.log(result.message);
                if(result.status){
                  dataTable.clear().draw();
                  dataTable.rows.add(result.data).draw(false);
                  $('#saveBtn').removeClass('disabled');
                  $('#saveBtn').prop('disabled', false);
                }else{
                  dataTable.clear().draw();
                  $('#saveBtn').addClass('disabled');
                  $('#saveBtn').prop('disabled', true);
                }
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            });
            iconloading.hide();
          });


          $('#nw_container').on('click', '#saveBtn', function(e){
            e.preventDefault();
            iconloading.show();
            var jum = $('#table-pic tbody tr').length;
            var data = dataTable.data();
            var formData = new FormData();
            
            var tempData = []; 
            var i=0;
            $.each( data, function( key, value ) {
                formData.append('email[]',value.email);
                formData.append('kode_pic[]',value.kode_pic);
                formData.append('nama[]',value.nama);
            });
            var tgl_awal = ($('#tgl_selesai_awal').val() != '' ? reverseDate($('#tgl_selesai_awal').val()) : '');
            var tgl_akhir = ($('#tgl_selesai_akhir').val() != '' ? reverseDate($('#tgl_selesai_akhir').val()) : '');
            formData.append('tgl_selesai[]',$('#tgl_selesai_tipe')[0].selectize.getValue());
            formData.append('tgl_selesai[]',tgl_awal);
            formData.append('tgl_selesai[]',tgl_akhir);

            for(var pair of formData.entries()) {
              console.log(pair[0]+ ', '+ pair[1]); 
            }

            if(jum == 0){
              alert('Data PIC tidak valid');
              return false;
            }else if(jum > 100){
              alert('Alert: Data PIC mencapai batas maksimum. Batas maksimum email = 100 email per jam');
              return false;
            }else{
              $.ajax({
                type: 'POST',
                url: '$root_ser/Email.php?fx=send',
                dataType: 'json',
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(result){
                  alert(result.message);
                  if(result.status){
                    dataTable.clear().draw();
                    $('#saveBtn').addClass('disabled');
                    $('#saveBtn').prop('disabled', true);
                  }
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                }
              });
            }
            iconloading.hide();
            
          });

          $('#kode_pic_tipe').change(function(){
              if($(this).val() == 'all'){
                $('#kode_pic_awal')[0].selectize.setValue('');
                $('#kode_pic_awal')[0].selectize.lock();
                $('#kode_pic_akhir')[0].selectize.setValue('');
                $('#kode_pic_akhir')[0].selectize.lock();
              }else if ($(this).val() == '='){
                 $('#kode_pic_awal')[0].selectize.setValue('');
                 $('#kode_pic_awal')[0].selectize.unlock();
                 $('#kode_pic_akhir')[0].selectize.setValue('');
                 $('#kode_pic_akhir')[0].selectize.lock();
              }else{
                $('#kode_pic_awal')[0].selectize.setValue('');
                $('#kode_pic_awal')[0].selectize.unlock();
                $('#kode_pic_akhir')[0].selectize.setValue('');
                $('#kode_pic_akhir')[0].selectize.unlock();
              }
          });

          $('#tgl_selesai_tipe').change(function(){
            if($(this).val() == 'all'){
              $('#tgl_selesai_awal').val('');
              $('#tgl_selesai_awal').prop('readonly',true);
              $('#tgl_selesai_akhir').val('');
              $('#tgl_selesai_akhir').prop('readonly',true);
            }else if ($(this).val() == '='){
               $('#tgl_selesai_awal').val('');
               $('#tgl_selesai_awal').prop('readonly',false);
               $('#tgl_selesai_akhir').val('');
               $('#tgl_selesai_akhir').prop('readonly',true);
            }else{
              $('#tgl_selesai_awal').val('');
              $('#tgl_selesai_awal').prop('readonly',false);
              $('#tgl_selesai_akhir').val('');
              $('#tgl_selesai_akhir').prop('readonly',false);
            }
        });
          
          </script>      
        ";
		return "";
	}
	
}
?>
