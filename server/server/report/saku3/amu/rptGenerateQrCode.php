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
class server_report_saku3_amu_rptGenerateQrCode extends server_report_basic
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
        $root_ser=$link."/web/server/amu";
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
          <div id='sai_container'>
            <form id='sai_form_insert'>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12' style='margin-bottom: 10px;box-shadow: 0px 0px 1px white;border-bottom: 1px solid #ece7e7;'>
                     <button type='submit' class='btn btn-primary' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='validate'></i> Generate</button>
                    </div>
                      <div class='col-md-12'>
                        <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-3'>Kelompok Barang</label>
                                  <div style='margin-bottom:5px;' class='col-sm-2'>
                                  <select class='form-control' id='kode_klp' name='kode_klp' required>
                                  <option value=''>Pilih Kelompok Barang</option>
                                  
                                  </select>
                                  </div>
                              </div>
                        </div>
                        <div class='row'>
                              <div class='form-group'>
                                  <label class='control-label col-sm-3'>No Bukti</label>
                                  <div style='margin-bottom:5px;' class='col-sm-2'>
                                  <select class='form-control' id='no_bukti' name='no_bukti' required>
                                  <option value=''>Pilih No Bukti</option>
                                  </select>
                                  </div>
                              </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Quality</label>
                                <div style='margin-bottom:5px;' class='col-sm-2'>
                                <select class='form-control selectize' id='quality' name='quality' required>
                                <option value=''>Pilih Quality</option>
                                <option value='L' >Low</option>
                                <option value='M' >Medium</option>
                                <option value='Q' >Good</option>
                                <option value='H' >High</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Ukuran (1-10)</label>
                                <div class='col-sm-2' style='margin-bottom:5px;'>
                                    <input name='ukuran' type='number' max='10' class='form-control' required id='ukuran' value='0'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Padding</label>
                                <div class='col-sm-2' style='margin-bottom:5px;'>
                                    <input name='padding' type='number' class='form-control' id='padding' value='0' required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div id='sai_hasil' hidden>
                <div id='img_hasil' style='margin-bottom:20px'></div>
                <a id='printButton' href='#' class='btn btn-primary'>
                <i class='fa fa-print'></i> Print
                </a>
                <a id='backButton' href='#' class='btn btn-default'>
                <i class='fa fa-arrow-left'></i> Back
                </a>
            </div>
          </div>
          <script type='text/javascript'>
          var select_noBukti = $('#no_bukti').selectize();

          var select_klp = $('#kode_klp').selectize({
              onChange: function(value) { 
                  if(select_klp[0].selectize.getValue()!='undefined'){
                      select_noBukti[0].selectize.clearOptions();
                  } 

                  var kode_lokasi='$kode_lokasi';
                  var kode_pp='$kode_pp';
                  $.ajax({
                      type: 'GET',
                      url: '$root_ser/Generate.php?fx=getAset',
                      dataType: 'json',
                      data: {'kode_lokasi':kode_lokasi, 'kode_klp':value,'kode_pp':kode_pp},
                      success:function(result){    
                          if(result.status){
                              if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                  for(i=0;i<result.daftar.length;i++){
                                      select_noBukti[0].selectize.addOption([{text:result.daftar[i].no_bukti + ' - ' + result.daftar[i].nama, value:result.daftar[i].no_bukti}]);  
                                  }
                              }
                          }
                      }
                  });
                  
              }
          });  
          function getKlp(){

            $.ajax({
                type: 'GET',
                url: '$root_ser/Generate.php?fx=getKlp',
                dataType: 'json',
                async: false,
                data: {'kode_lokasi':'$kode_lokasi','kode_pp':'$kode_pp'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(var i=0;i<result.daftar.length;i++){
                              $('#kode_klp')[0].selectize.addOption([{text:result.daftar[i].kode_klp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_klp}]);
                            }
                          
                        }
                    }
                }
            });
          }

          getKlp();

          var iconloading = $('#loading-overlay');

          $('#sai_container').on('submit', '#sai_form_insert', function(e){
            e.preventDefault();
            iconloading.show();
            var formData = new FormData(this);
            
            for(var pair of formData.entries()) {
              console.log(pair[0]+ ', '+ pair[1]); 
            }
            var kode_lokasi = '$kode_lokasi';
            var kode_pp = '$kode_pp';
            formData.append('kode_lokasi',kode_lokasi);
            formData.append('kode_pp',kode_pp);
            
            $.ajax({
              type: 'POST',
              url: '$root_ser/Generate.php?fx=generateQr',
              dataType: 'json',
              data: formData,
              contentType: false,
              cache: false,
              processData: false, 
              success:function(result){
                alert('Generate qrcode '+result.message);
                if(result.status){
                    $('#img_hasil').html(result.img);
                    $('#sai_hasil').show();
                    $('#sai_form_insert').hide();
                    $('#printButton').attr('data-kode_klp', result.kode_klp);
                    $('#printButton').attr('data-no_bukti', result.no_bukti);
                    iconloading.hide();
                }
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            });
          });

          $('#sai_container').on('click', '#printButton', function(e){
            e.preventDefault();
            var kode_klp = $(this).data('kode_klp');
            var no_bukti = $(this).data('no_bukti');
            window.open('$root/web/server/amu/printPreview.php?kode_klp='+kode_klp+'&no_bukti='+no_bukti+'&kode_lokasi=$kode_lokasi&kode_pp=$kode_pp','_blank'); 
            
          });

          
          $('#sai_container').on('click', '#backButton', function(e){
            e.preventDefault();
            $('#sai_hasil').hide();
            $('#kode_klp')[0].selectize.setValue('');
            $('#no_bukti')[0].selectize.setValue('');
            $('#quality')[0].selectize.setValue('');
            $('#ukuran').val(0);
            $('#padding').val(0);
            $('#sai_form_insert').show();
          });
          </script>      
        ";
		return "";
	}
	
}
?>
