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
class server_report_saku3_ypt_rptCekClosing extends server_report_basic
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
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['nikUser'] = $nik_user;
        
        $link = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser = $link."/web/server/ypt";
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
                            <label class='control-label col-sm-3'>Lokasi</label>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                                <select class='form-control' id='kode_lokasi' name='kode_lokasi'>
                                <option value=''>Pilih Lokasi</option>";
                                $sql = "select kode_lokasi,nama from lokasi where flag_aktif='1' and kode_lokasi in ('03','08','11','12','13','14','15')";
                                $rs = $dbLib->execute($sql);
                                
                                while($row = $rs->FetchNextObject($toupper=false)){
                                    echo " <option value='$row->kode_lokasi' $selected>$row->kode_lokasi - $row->nama</option>";
                                }
                                echo"
                                </select>
                            </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Periode</label>
                                <div style='margin-bottom:5px;' class='col-sm-2'>
                                    <select class='form-control' id='per' name='periode'>
                                    <option value=''>Pilih Periode</option>";
                                    $sql = "select distinct periode 
                                    from periode 
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
                                <div class='col-sm-2'>
                                <a type='button' href='#' class='btn btn-primary' style='margin-bottom: 10px;' id='btn-cek' >Cek Proses</a>
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
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data Proses</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Detail Proses</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-data' style='font-size: 12px;' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                        <th width='10%'>Kode Proses</th>
                                        <th width='70%'>Proses</th>
                                        <th width='10%'>Hasil</th>
                                        <th width='10%'>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_2'>
                               <div class='div-detail'>
                               </div>
                            </div>
                          </div>
                      </div>   
                    </div>
                </div>
            </div>
          </div>
          <script type='text/javascript'>

          $('#kode_lokasi').selectize();
          $('#kode_lokasi')[0].selectize.setValue('$kode_lokasi');
          $('#per').selectize();
          $('#per')[0].selectize.setValue('$periode');
          var action_html = \"<a href='#' title='View' class='btn btn-primary btn-view btn-sm'>View</a>\";
          var dataTable = $('#table-data').DataTable({
            'data' :[],
            'columnDefs': [
                {
                  'targets': 3, data: null,'className': 'text-center', 'defaultContent': action_html 
                },
                {
                  'targets': 2,
                  'data': null,
                  'className': 'text-center',
                  'render': function ( data, type, row, meta ) {
                    if(row.status == '1'){
                      return \"<a href='#' title='Not OK' class='badge badge-danger'><i class='fa fa-times'></i></a>\";
                        
                    }else{
                      return \"<a href='#' title='OK' class='badge badge-success'><i class='fa fa-check'></i></a>\";
                    }
                  }
                }
            ],
            columns: [
                { data: 'kode_proses' },
                { data: 'nama' },
                { data: 'status' }
            ]
        });

        var iconloading = $('#loading-overlay');

        
          $('#nw_form_insert').on('click','#btn-cek', function(e){
            e.preventDefault();
            iconloading.show();
            var lokasi = $('#kode_lokasi')[0].selectize.getValue();
            var per = $('#per')[0].selectize.getValue();
            if(per ==''){
                alert('periode harap dipilih');
                return false;
            }else if(lokasi ==''){
                alert('lokasi harap dipilih');
                return false;
            }else{
              $.ajax({
                type: 'POST',
                url: '$root_ser/CekClosing.php?fx=proses',
                dataType: 'json',
                data: {'kode_lokasi':lokasi,'periode':per},
                success:function(result){
                  dataTable.clear().draw();
                  alert('Input data '+result.message);
                  if(result.status){
                    if(typeof result.data !== 'undefined' && result.data.length>0){
                        dataTable.rows.add(result.data).draw(false);
                    }
                  }
                  
                  iconloading.hide();
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                  iconloading.hide();
                }
              });
            }
            
          });

          $('#table-data').on('click','.btn-view', function(e){
            e.preventDefault();
            var kode = $(this).closest('tr').find('td:eq(0)').text();
            $('.div-detail').html(kode);
            $('a[href=\"#tab_2\"]').click();
            var lokasi = $('#kode_lokasi')[0].selectize.getValue();
            var per = $('#per')[0].selectize.getValue();
            switch(kode){
                case 'P01' : 
                  
                  html=`<table class='table table-bordered table-striped Datatable' id='table-akun' style='font-size: 12px;' >
                      <thead style='background: #ff9500;color: white;'>
                      <tr>
                          <th>Kode Akun</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>`;
                  $('.div-detail').html(html);
                  var table_akun = $('#table-akun').DataTable({
                      'ajax': {
                          'url': '$root_ser/CekClosing.php?fx=getCekAkun',
                          'data': {'kode_lokasi':lokasi,'periode':per},
                          'type': 'GET',
                          'dataSrc' : function(json) {
                              return json.data;   
                          }
                      },
                      columns: [
                          { data: 'kode_akun' }
                      ]
                  });
                break;
                case 'P02' : 
                  html=`<table class='table table-bordered table-striped Datatable' id='table-nrc' style='font-size: 12px;' >
                      <thead style='background: #ff9500;color: white;'>
                      <tr>
                          <th>Nilai</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>`;
                  $('.div-detail').html(html);
                  var table_nrc = $('#table-nrc').DataTable({
                      'ajax': {
                          'url': '$root_ser/CekClosing.php?fx=getNeracaBalance',
                          'data': {'kode_lokasi':lokasi,'periode':per},
                          'type': 'GET',
                          'dataSrc' : function(json) {
                              return json.data;   
                          }
                      },
                      columns: [
                          { data: 'nilai' }
                      ]
                  });
                break;
                case 'P03' : 
                  html=`<table class='table table-bordered table-striped Datatable' id='table-saldo' style='font-size: 12px;' >
                      <thead style='background: #ff9500;color: white;'>
                      <tr>
                          <th>Saldo Awal</th>
                          <th>Debet</th>
                          <th>Kredit</th>
                          <th>Saldo Akhir</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>`;
                  $('.div-detail').html(html);
                  var table_saldo = $('#table-saldo').DataTable({
                      'ajax': {
                          'url': '$root_ser/CekClosing.php?fx=getSaldoBalance',
                          'data': {'kode_lokasi':lokasi,'periode':per},
                          'type': 'GET',
                          'dataSrc' : function(json) {
                              return json.data;   
                          }
                      },
                      columns: [
                          { data: 'so_awal' },
                          { data: 'debet' },
                          { data: 'kredit' },
                          { data: 'so_akhir' }
                      ]
                  });
                break;
                case 'P04' : 
                  html=`<table class='table table-bordered table-striped Datatable' id='table-bukti' style='font-size: 12px;' >
                      <thead style='background: #ff9500;color: white;'>
                      <tr>
                          <th>No Bukti</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>`;
                  $('.div-detail').html(html);
                  var table_bukti = $('#table-bukti').DataTable({
                      'ajax': {
                          'url': '$root_ser/CekClosing.php?fx=getBuktiTidakBalance',
                          'data': {'kode_lokasi':lokasi,'periode':per},
                          'type': 'GET',
                          'dataSrc' : function(json) {
                              return json.data;   
                          }
                      },
                      columns: [
                          { data: 'no_bukti' }
                      ]
                  });
                break;
                case 'P05' : 
                  html=`<table class='table table-bordered table-striped Datatable' id='table-bukti2' style='font-size: 12px;' >
                      <thead style='background: #ff9500;color: white;'>
                      <tr>
                          <th>No Bukti</th>
                      </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>`;
                  $('.div-detail').html(html);
                  var table_bukti2 = $('#table-bukti2').DataTable({
                      'ajax': {
                          'url': '$root_ser/CekClosing.php?fx=getAkunNotInTrans',
                          'data': {'kode_lokasi':lokasi,'periode':per},
                          'type': 'GET',
                          'dataSrc' : function(json) {
                              return json.data;   
                          }
                      },
                      columns: [
                          { data: 'no_bukti' }
                      ]
                  });
                break;
            }
            
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
