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
class server_report_saku3_gar_rptAggResetList extends server_report_basic
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
        </style>
          <div id='nw_container'>
            <!-- Datatable -->
            <div id='nw_datatable'>
                <div class='row'>
                    <div class='col-xs-12'>
                      <div class='nav-tabs-custom'>
                          <ul class='nav nav-tabs'>
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data Anggaran</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Data Detail Anggaran</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='sai-container-overflow-x'>
                                <table class='table table-bordered table-striped Datatable' id='table-agg' style='font-size: 12px;width:100%' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                        <th>No Bukti</th>
                                        <th>Keterangan</th>
                                        <th>Tahun</th>
                                        <th>Tgl Input</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_2'>
                            <div class='sai-container-overflow-x'>
                                <table class='table table-bordered table-striped Datatable' id='table-det' style='font-size:12px;width:100%'>
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                        <th>No Bukti</th>
                                        <th>Kode Akun</th>
                                        <th>Kode PP</th>
                                        <th>Kode DRK</th>
                                        <th>Januari</th>
                                        <th>Februari</th>
                                        <th>Maret</th>
                                        <th>April</th>
                                        <th>Mei</th>
                                        <th>Juni</th>
                                        <th>Juli</th>
                                        <th>Agustus</th>
                                        <th>September</th>
                                        <th>Oktober</th>
                                        <th>November</th>
                                        <th>Desember</th>
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
          var action_html = `<a href='#' title='View' class='badge badge-info' id='btn-view'>View</a> &nbsp; <a href='#' title='Hapus' class='badge badge-danger' id='btn-delete'>Hapus</a>`;
          var table_agg = $('#table-agg').DataTable({
            'ajax': {
                'url': '$root_ser/AggReset.php?fx=getData',
                'data': {'kode_lokasi':'$kode_lokasi'},
                'type': 'GET',
                'dataSrc' : function(json) {
                    return json.data;   
                }
            },
            columns: [
                { data: 'no_bukti' },
                { data: 'keterangan' },
                { data: 'tahun' },
                { data: 'tgl_input' },
                { data: 'action' }
            ],
          });

          var table_det = $('#table-det').DataTable({
            data: [],
            columnDefs: [
                {
                    'targets': [4,5,6,7,8,9,10,11,12,13,14,15],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 0, '' )
                },
            ],
            columns: [
              { data: 'no_bukti' },
              { data: 'kode_akun' },
              { data: 'kode_pp' },
              { data: 'kode_drk' },
              { data: 'n1' },
              { data: 'n2' },
              { data: 'n3' },
              { data: 'n4' },
              { data: 'n5' },
              { data: 'n6' },
              { data: 'n7' },
              { data: 'n8' },
              { data: 'n9' },
              { data: 'n10' },
              { data: 'n11' },
              { data: 'n12' }
            ]
          });
          
          var iconloading = $('#loading-overlay');

          function getDetail(no_bukti,tahun){
            $.ajax({
                type: 'GET',
                url: '$root_ser/AggReset.php?fx=getDetail',
                dataType: 'json',
                data: {'kode_lokasi':'$kode_lokasi','no_bukti':no_bukti,'tahun':tahun},
                success:function(result){    
                    if(result.status){
                        table_det.clear().draw();
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            table_det.rows.add(result.daftar).draw(false);
                            $('.nav-tabs a[href=\"#tab_2\"]').tab('show');
                        }
                    }
                }
            });
          }

          $('#table-agg tbody').on('dblclick', 'tr', function (e) {
              e.preventDefault();
              var source = table_agg.row(this).data();
              var tahun = source.tahun;
              var no_bukti = source.no_bukti;
              getDetail(no_bukti,tahun);
          });

          $('#table-agg tbody').on('click', '#btn-view', function (e) {
              e.preventDefault();
              console.log('klik');
              var no_bukti = $(this).closest('tr').find('td:eq(0)').text();
              var tahun = $(this).closest('tr').find('td:eq(2)').text();
              getDetail(no_bukti,tahun);
          });

          $('#table-agg tbody').on('click', '#btn-delete', function (e) {
            e.preventDefault();
            if(confirm('Apakah anda ingin menghapus data ini?')){
              var no_bukti = $(this).closest('tr').find('td:eq(0)').text();
              var tahun = $(this).closest('tr').find('td:eq(2)').text();
              $.ajax({
                  type: 'DELETE',
                  url: '$root_ser/AggReset.php',
                  dataType: 'json',
                  data: {'no_bukti':no_bukti,'tahun':tahun,'kode_lokasi':'$kode_lokasi'},
                  success:function(result){
                      alert('Penghapusan data '+result.message);
                      if(result.status){
                          table_agg.ajax.reload();
                          table_det.clear().draw();
                      }
                  }
              });
            }else{
                return false;
            }              
          });
          </script>      
        ";
		return "";
	}
	
}
?>
