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
class server_report_saku3_ypt_rptAjuFisikOnline extends server_report_basic
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
        $openAwal=$tmp[4];
        $openAkhir=$tmp[5];
                
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/ypt";
        $folderroot_js=$link."/server/bs/js";
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
                     <button type='submit' class='btn btn-primary' style='margin-bottom: 10px;' id='validate'><i class='fa fa-save' ></i> Simpan</button>
                    </div>
                      <div class='col-md-12'>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>No Agenda</label>
                                <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <input name='no_aju' type='text' class='form-control' required id='no_aju' readonly>
                                </div>
                                <label class='control-label col-sm-1'>Barcode</label>
                                <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <input name='barcode' type='text' class='form-control' required id='barcode'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>Nominal </label>
                                <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <input name='nilai' type='text' class='form-control currency' required id='nilai' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>PP/Unit </label>
                                <div class='col-sm-5' style='margin-bottom:5px;'>
                                    <input name='kode_pp' type='text' class='form-control' required id='kode_pp' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>Akun </label>
                                <div class='col-sm-5' style='margin-bottom:5px;'>
                                    <input name='kode_akun' type='text' class='form-control' required id='kode_akun' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>DRK</label>
                                <div class='col-sm-5' style='margin-bottom:5px;'>
                                    <input name='kode_drk' type='text' class='form-control' required id='kode_drk' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-1'>Uraian</label>
                                <div class='col-sm-5' style='margin-bottom:5px;'>
                                    <input name='ket' type='text' class='form-control' required id='ket' readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div id='sai_hasil' hidden>
                <a id='printButton' href='#' class='btn btn-primary'>
                <i class='fa fa-print'></i> Print
                </a>
                <a id='backButton' href='#' class='btn btn-default'>
                <i class='fa fa-arrow-left'></i> Back
                </a>
                <iframe id='hasil' name='hasil' style='margin-top:10px;border: none;
                width: 100%;min-height:480px'></iframe>
                <div id='hasil2' name='hasil' style='margin-top:10px;border: none;
                width: 100%;min-height:480px' hidden></div>
                
            </div>
          </div>
          
          <script src='$folderroot_js/jquery.scannerdetection.js'></script>
          <script type='text/javascript'>

          function loadDok(){
              var no_aju = $('#barcode').val();
              $.ajax({
                type: 'GET',
                url: '$root_ser/AjuFisikOnline.php?fx=getDok',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','no_aju':no_aju},
                success:function(result){
                  if(result.status){
                      if(result.daftar.length > 0){
                        $('#no_aju').val(result.daftar[0].no_aju);
                        $('#nilai').val(result.daftar[0].nilai);
                        $('#kode_pp').val(result.daftar[0].pp);
                        $('#kode_akun').val(result.daftar[0].akun);
                        $('#kode_drk').val(result.daftar[0].drk);
                        $('#ket').val(result.daftar[0].keterangan);
                        
                        // alert(result.message);
                        $('#validate').removeClass('disabled');
                        $('#validate').prop('disabled', false);
                      }else{
                        alert(result.message);
                      }
                  }
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                }
              });
          }

          var iconloading = $('#loading-overlay');
          $('#barcode').focus();
          
          $('#validate').addClass('disabled');
          $('#validate').prop('disabled', true);

          $('#sai_form_insert').submit(function(e){
            e.preventDefault();
            iconloading.show();
            var formData = new FormData(this);
            
            for(var pair of formData.entries()) {
              console.log(pair[0]+ ', '+ pair[1]); 
            }
            var kode_lokasi = '$kode_lokasi';
            var nik = '$nik';
            var kode_pp = '$kode_pp';
            var openAwal = '$openAwal';
            var openAkhir = '$openAkhir';
            formData.append('nik',nik);
            formData.append('kode_lokasi',kode_lokasi);
            formData.append('kode_pp',kode_pp);
            formData.append('openAwal',openAwal);
            formData.append('openAkhir',openAkhir);
            
            $.ajax({
              type: 'POST',
              url: '$root_ser/AjuFisikOnline.php?fx=simpanAjuFisikOnline',
              dataType: 'json',
              data: formData,
              contentType: false,
              cache: false,
              processData: false, 
              success:function(result){
                alert('Simpan data '+result.message);
                if(result.status){
                    iconloading.hide();
                    var myFrame = $('#hasil').contents().find('body');
                    myFrame.html(result.html);
                    var header = $('#hasil').contents().find('head');
                    header.html('<title>Preview</title>');
                    $('#hasil2').html(result.html);
                    $('#sai_hasil').show();
                    $('#sai_form_insert').hide();
                    setTimeout(function(){ 
                      window.frames['hasil'].focus();
                      window.frames['hasil'].print();
                    }, 1500);
                    
                    // var w=window.open();
                    // w.document.write($('#hasil2').html());
                    // w.print();
                    // w.close();
                    // $('#printButton').attr('data-periode', result.periode);
                    // $('#printButton').attr('data-no_aju', result.no_aju);
                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku2_kopeg_kbitt_rptBebanFormDok',result.filter,result.filter);
                }
              },
              fail: function(xhr, textStatus, errorThrown){
                alert('request failed:'+textStatus);
              }
            });
          });

          $('#sai_container').on('click', '#printButton', function(e){
            e.preventDefault();
            var periode = $(this).data('periode');
            var no_aju = $(this).data('no_aju');
            // window.open('$root/web/server/ypt/printPreview.php?kode_lokasi=$kode_lokasi&no_aju='+no_aju+'&periode='+periode,'_blank'); 
              // var w=window.open();
              // w.document.write($('#hasil').html());
              // w.print();
              // w.close();
              window.frames['hasil'].focus();
              window.frames['hasil'].print();
          });

          
          $('#sai_container').on('click', '#backButton', function(e){
            e.preventDefault();
            $('#sai_hasil').hide();
            $('#no_aju').val('');
            $('#nilai').val(0);
            $('#kode_pp').val('');
            $('#kode_akun').val('');
            $('#kode_drk').val('');
            $('#ket').val('');
            $('#barcode').val('');
            $('#validate').addClass('disabled');
            $('#validate').prop('disabled', true);
            $('#sai_form_insert').show();
            $('#barcode').focus();
            // location.reload();
          });

          $('.currency').inputmask('numeric', {
              radixPoint: ',',
              groupSeparator: '.',
              digits: 2,
              autoGroup: true,
              rightAlign: true,
              oncleared: function () { self.Value(''); }
          });

          $('#barcode').scannerDetection({
        
              //https://github.com/kabachello/jQuery-Scanner-Detection
      
              timeBeforeScanTest: 200, // wait for the next character for upto 200ms
              avgTimeByChar: 40, // it's not a barcode if a character takes longer than 100ms
              preventDefault: true,
      
              endChar: [13],
              onComplete: function(barcode, qty){
              validScan = true;
                  $('#barcode').val(barcode);
                  loadDok();
              
              } // main callback function	,
              ,
              onError: function(string, qty) {
                  console.log('barcode-error');
              }	
          });
          </script>      
        ";
		return "";
	}
	
}
?>
