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
class server_report_saku3_yakes_inves_rptHitungROI extends server_report_basic
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
                      <button type='submit' class='btn btn-primary pull-right' style='margin-bottom: 10px;'><i class='fa fa-plus-circle' id='hitung'></i> Hitung</button>
                    </div>
                    <div class='col-md-12'>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-2'>Periode</label>
                            <div style='margin-bottom:5px;' class='col-sm-2'>
                              <select class='form-control selectize' id='per' name='periode'>
                              <option value=''>Pilih Periode</option>";
                              $sql = " select a.periode from (select periode from periode where kode_lokasi='$kode_lokasi' union select substring(convert(varchar,getdate(),112),1,6) ) a  order by a.periode desc ";
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
                            <label class='control-label col-sm-2'>Bobot Idx80</label>
                            <div class='col-sm-2' style='margin-bottom:5px;'>
                              <input type='text' value='0' name='idx80' id='idx80' class='form-control currency' required>
                            </div>
                          </div>
                      </div>
                      <div class='row'>
                          <div class='form-group'>
                            <label class='control-label col-sm-2'>Bobot Srikehati</label>
                            <div class='col-sm-2' style='margin-bottom:5px;'>
                              <input type='text' value='0' name='sri' id='sri' class='form-control currency' required>
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
                            <li class='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Data ROI</a></li>
                            <li class=''><a href='#tab_2' data-toggle='tab' aria-expanded='true'>Data ROI Kelas</a></li>
                            <li class=''><a href='#tab_3' data-toggle='tab' aria-expanded='true'>Data ROI Produk</a></li>
                          </ul>
                          <div class='tab-content'>
                            <div class='tab-pane active' id='tab_1'>
                              <div class='' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-roi' style='font-size: 12px;' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Kode Plan</th>
                                      <th>Periode</th>
                                      <th>Tanggal</th>
                                      <th>Kas Masuk</th>
                                      <th>Kas Keluar</th>
                                      <th>Beban</th>
                                      <th>NAB</th>
                                      <th>ROI Hari</th>
                                      <th>ROI Bulan</th>
                                      <th>ROI TW</th>
                                      <th>ROI YTD</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_2'>
                              <div class='' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-roi-kls' style='font-size: 12px;width:100%' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Periode</th>
                                      <th>Tanggal</th>
                                      <th>Modul</th>
                                      <th>Beban</th>
                                      <th>NAB</th>
                                      <th>ROI Hitung1</th>
                                      <th>ROI Hitung2</th>
                                      <th>ROI %</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    
                                    </tbody>
                                </table>
                              </div>
                            </div>
                            <div class='tab-pane' id='tab_3'>
                              <div class='' style='75%'>
                                <table class='table table-bordered table-striped Datatable' id='table-roi-subkls' style='font-size: 12px;width:100%' >
                                    <thead style='background: #ff9500;color: white;'>
                                      <tr>
                                      <th>Periode</th>
                                      <th>Tanggal</th>
                                      <th>Modul</th>
                                      <th>Beban</th>
                                      <th>NAB</th>
                                      <th>ROI Hitung1</th>
                                      <th>ROI Hitung2</th>
                                      <th>ROI %</th>
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
          
          function toNilai(str_num){
            var parts = str_num.split('.');
            number = parts.join('');
            number = number.replace('Rp', '');
            number = number.replace(',', '.');
            return +number;
          }

          $('.currency').inputmask('numeric', {
            radixPoint: ',',
            groupSeparator: '.',
            digits: 2,
            autoGroup: true,
            rightAlign: true,
            oncleared: function () { self.Value(''); }
          });
       
        var table = $('#table-roi').DataTable({
            data: [],
            columns: [
                { data: 'kode_plan' },
                { data: 'periode' },
                { data: 'tanggal' },
                { data: 'kas_masuk' },
                { data: 'kas_keluar' },
                { data: 'beban' },
                { data: 'nab' },
                { data: 'roi_hari' },
                { data: 'roi_bulan' },
                { data: 'roi_tw' },
                { data: 'roi_ytd' }
            ],
            'columnDefs': [
                {
                    'targets': [3,4,5,6],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 2, '' )
                },
                {
                    'targets': [7,8,9,10],
                    'className': 'text-right',
                    'render': $.fn.dataTable.render.number( '.', ',', 5, '' )
                }
            ],
            'paging':false
        });

        var table2 = $('#table-roi-kls').DataTable({
          data: [],
          columns: [
              { data: 'periode' },
              { data: 'tanggal' },
              { data: 'modul' },
              { data: 'beban' },
              { data: 'nab' },
              { data: 'roi_hitung' },
              { data: 'roi_hitung2' },
              { data: 'roi_persen' }
          ],
          'columnDefs': [
              {
                  'targets': [3,4],
                  'className': 'text-right',
                  'render': $.fn.dataTable.render.number( '.', ',', 0, '' )
              },
              {
                'targets': [5,6,7],
                'className': 'text-right',
                'render': $.fn.dataTable.render.number( '.', ',', 9, '' )
            }
          ],
          'paging':false
      });

      var table3 = $('#table-roi-subkls').DataTable({
        data: [],
        columns: [
            { data: 'periode' },
            { data: 'tanggal' },
            { data: 'modul' },
            { data: 'beban' },
            { data: 'nab' },
            { data: 'roi_hitung' },
            { data: 'roi_hitung2' },
            { data: 'roi_persen' }
        ],
        'columnDefs': [
            {
                'targets': [3,4],
                'className': 'text-right',
                'render': $.fn.dataTable.render.number( '.', ',', 0, '' )
            },
            {
              'targets': [5,6,7],
              'className': 'text-right',
              'render': $.fn.dataTable.render.number( '.', ',', 9, '' )
          }
        ],
        'paging':false
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
            var total = toNilai($('#idx80').val())+toNilai($('#sri').val());
            if(total == 100){
              $.ajax({
                type: 'POST',
                url: '$root_ser/ROI.php?fx=hitungROI2',
                dataType: 'json',
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(result){
                  alert('Input data '+result.message);
                  if(result.status){
                      table.clear().draw();
                      table.rows.add(result.data).draw(false);
                      
                      // iconloading.hide();
                      table2.clear().draw();
                      table2.rows.add(result.data2).draw(false);
  
                      table3.clear().draw();
                      table3.rows.add(result.data3).draw(false);
                      iconloading.hide();
                  }
                },
                fail: function(xhr, textStatus, errorThrown){
                  alert('request failed:'+textStatus);
                }
              });
            }else{
              alert('Total Bobot Idx80 dan Srikehati harus 100');
            }
            
          });
          
          </script>      
        ";
		return "";
	}
	
}
?>
