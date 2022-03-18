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
class server_report_saku3_ypt_rptTransferSimonal extends server_report_basic
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
        
        $link=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/ypt";
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
                      <button class='btn btn-success pull-right' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' type='submit'><i class='fa fa-plus-circle'></i> Transfer Data</button>
                      <!--<button type='submit' class='btn btn-primary pull-right' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='validate'></i> Validate</button>-->
                    </div>
                    <div class='col-md-12'>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-2'>No Bukti</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <select class='form-control' id='no_bukti' name='no_bukti' required>
                                <option value=''>Pilih No Bukti</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <!--<div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-2'>Date No</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='date_no' name='date_no' required readonly>
                                </div>
                                <label class='control-label col-sm-2'>Tgl Invoice</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='tgl_invoice' name='tgl_invoice' required readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-2'>Nama</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='nama' name='nama' required readonly>
                                </div>
                                <label class='control-label col-sm-2'>NPWP</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='npwp' name='npwp' required readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-2'>Posisi</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='posisi' name='posisi' required readonly>
                                </div>
                                <label class='control-label col-sm-2'>Alamat</label>
                                <div style='margin-bottom:5px;' class='col-sm-4'>
                                <input class='form-control' id='alamat' name='alamat' required readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                          <div class='form-group'>
                              <label class='control-label col-sm-2'>Nama Rekening</label>
                              <div style='margin-bottom:5px;' class='col-sm-4'>
                              <input class='form-control' id='nama_rek' name='nama_rek' required readonly>
                              </div>
                              <label class='control-label col-sm-2'>Nama Bank</label>
                              <div style='margin-bottom:5px;' class='col-sm-4'>
                              <input class='form-control' id='nama_bank' name='nama_bank' required readonly>
                              </div>
                          </div>
                        </div>
                        <div class='row'>
                          <div class='form-group'>
                              <label class='control-label col-sm-2'>Atasan</label>
                              <div style='margin-bottom:5px;' class='col-sm-4'>
                              <input class='form-control' id='atasan' name='atasan' required readonly>
                              </div>
                              <label class='control-label col-sm-2'>Jabatan</label>
                              <div style='margin-bottom:5px;' class='col-sm-4'>
                              <input class='form-control' id='jabatan' name='jabatan' required readonly>
                              </div>
                          </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                  <label class='control-label col-sm-2'>No Rekening</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='no_rek' name='no_rek' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Untuk Pembayaran</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='untuk_pembayaran' name='untuk_pembayaran' required readonly>
                                  </div>
                            </div>
                        </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>Jumlah</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='jumlah' name='jumlah' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>PPN</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='ppn' name='ppn' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>Diskon</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='discount' name='discount' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Total</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='total' name='total' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>Terbilang</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='terbilang' name='terbilang' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Usercreate</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='usercreate' name='usercreate' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>No Faktur</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='no_faktur' name='no_faktur' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Groups</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='groups' name='groups' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>Status Bayar</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='status_bayar' name='status_bayar' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Tgl Pelaksanaan</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='tgl_pelaksanaan' name='tgl_pelaksanaan' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>End Pelaksanaan</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='end_pelaksanaan' name='end_pelaksanaan' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Surat</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='surat' name='surat' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>Code CC</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='code_cc' name='code_cc' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Code Unit</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='code_unit' name='code_unit' required readonly>
                                  </div>
                              </div>
                          </div>
                          <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-2'>No Referensi</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='no_referensi' name='no_referensi' required readonly>
                                  </div>
                                  <label class='control-label col-sm-2'>Group Pajak</label>
                                  <div style='margin-bottom:5px;' class='col-sm-4'>
                                  <input class='form-control' id='group_pajak' name='group_pajak' required readonly>
                                  </div>
                              </div>
                          </div>-->
                        </div>
                    </div>
                </div>
            </form>
          </div>
          <script type='text/javascript'>

            function getNoBukti(){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/TransferSimonal.php?fx=getNoBukti',
                    dataType: 'json',
                    data: {'kode_lokasi':'$kode_lokasi'},
                    success:function(result){  
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){                  
                              var select = $('#no_bukti').selectize();
                                select = select[0];
                                var control = select.selectize;    
                                for(i=0;i<result.daftar.length;i++){
                                   control.addOption([{text:result.daftar[i].no_bill+'-'+result.daftar[i].keterangan, value:result.daftar[i].no_bill}]);  
                                    
                                }
                            }
                        }
                    }
                });
            }

            getNoBukti();
          var iconloading = $('#loading-overlay');

          $('#no_buktixx').change(function(){
            // getset value
              var kode = $(this).val();
              $.ajax({
                  type: 'GET',
                  url: '$root_ser/TransferSimonal.php?fx=getData',
                  dataType: 'json',
                  data: {'no_bukti':kode,'kode_lokasi':'$kode_lokasi'},
                  success:function(res){
                      if(res.status){
                          var line = res.daftar[0];
                          $('#date_no').val(line.date_no);
                          $('#tgl_invoice').val(line.tgl_invoice);
                          $('#nama').val(line.nama);
                          $('#npwp').val(line.npwp);
                          $('#posisi').val(line.posisi);
                          $('#alamat').val(line.alamat);
                          $('#nama_rek').val(line.nama_rek);
                          $('#nama_bank').val(line.nama_bank);
                          $('#atasan').val(line.atasan);
                          $('#jabatan').val(line.jabatan);
                          $('#no_rek').val(line.no_rek);
                          $('#untuk_pembayaran').val(line.untuk_pembayaran);
                          $('#jumlah').val(line.jumlah);
                          $('#ppn').val(line.ppn);
                          $('#discount').val(line.discount);
                          $('#total').val(line.total);
                          $('#terbilang').val(line.terbilang);
                          $('#usercreate').val(line.usercreate);
                          $('#no_faktur').val(line.no_faktur);
                          $('#groups').val(line.groups);
                          $('#status').val(line.status);
                          $('#status_bayar').val(line.status_bayar);
                          $('#tgl_pelaksanaan').val(line.tgl_pelaksanaan);
                          $('#end_pelaksanaan').val(line.end_pelaksanaan);
                          $('#surat').val(line.surat);
                          $('#code_cc').val(line.code_cc);
                          $('#code_unit').val(line.code_unit);
                          $('#no_referensi').val(line.no_referensi);
                          $('#group_pajak').val(line.group_pajak);
                      }
                  },
                  fail: function(xhr, textStatus, errorThrown){
                      alert('request failed:'+textStatus);
                  }
              });
          });


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
              url: '$root_ser/TransferSimonal.php?fx=sendData',
              // url: 'http://simonal.ypt.or.id/api_tax.php',
              dataType: 'json',
              data:formData,
              contentType: false,
              cache: false, 
              processData: false,
              success:function(result){
                alert(result.message);
                location.reload();
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            })
            .done (function(data, textStatus, jqXHR) { 
              console.log(data);
            })
            .fail (function(jqXHR, textStatus, errorThrown) { 
                alert(textStatus); 
                console.log(jqXHR);
            });
           
            iconloading.hide();
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
