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
class server_report_saku3_dash_rptDashTarbakLogDet extends server_report_basic
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
        $box=$tmp[2];
		$kunci=$tmp[3];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakLog','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "k1" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Purchase Request</h3>    
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='01'  ";
                                
                                

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>
                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "k2" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								where a.kode_lokasi='01'  ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k3" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-nota'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='01'  ";
                                
                                
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k4" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-placing'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
								where a.kode_lokasi='01'  ";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "k5" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-polis'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='01'  ";
                                
                                
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
						case "jt" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data </h3>  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-jt'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Bukti </th>
                                    <th style='text-align:center;'>Kode PP </th>
                                    <th style='text-align:center;'>Tanggal</th>
                                    <th style='text-align:center;'>Keterangan </th>
                                   <th style='text-align:center;'>Nilai</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_pesan,a.kode_pp,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai
								from log_pesan_m a
								inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
								left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                                where a.kode_lokasi='01'  ";
                                
                                
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td>$row->no_pesan</td>
                                        <td>$row->kode_pp</td>
                                        <td>$row->tgl</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->nilai</td>

                                    </tr>";
                                }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "pp" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per PP</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pp'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
									<th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
									<th style='text-align:center;'>Nilai Perolehan</th>
                                    <th style='text-align:center;'>Detail</th>       
                                </tr>
                                </thead>
                                <tbody>";

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "klp" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Per Kelompok Akun</h3>                                  
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-klp'>
                                <thead>
                               <tr>
                                    <th style='text-align:center;'>No Asset </th>
                                    <th style='text-align:center;'>Tgl Perolehan</th>
                                    <th style='text-align:center;'>Nama</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Nilai</th>
                                    <th style='text-align:center;'>Detail</th>      
                                </tr>
                                </thead>
                                <tbody>";

                                // $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1
                                // from am_aset a 
                                //         left join am_proyek b on a.kode_proyek=b.kode_proyek 
                                //         left join am_pp c on a.kode_pp=c.kode_pp 
                                //         left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                                //         left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                                //         left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                                //         left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                                //         left join am_kateg h on a.kode_kateg=h.kode_kateg 
                                //         left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                                //         left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                                //         left join vendor k on a.kode_vendor=k.kode_vendor 
                                // where a.kode_pp='$kunci' ";
                                // $rs2 = $dbLib->execute($sql);                              
                                
                                // while ($row = $rs2->FetchNextObject(false)){
                                // echo "<tr>
                                //         <td>$row->id_aset</td>
                                //         <td>$row->tgl_oleh</td>
                                //         <td>$row->nama</td>
                                //         <td>$row->keterangan</td>
                                //         <td>$row->status</td>";
                                //         if($row->n1 <> "n/a"){
                                //             echo"
                                //             <td>".number_format($row->n1,2,",",".")."</td>";
                                //         }else{
                                //             echo"
                                //             <td>$row->n1</td>";
                                //         }                                       
                                //         echo"
                                //     </tr>";
                                // }


                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                    }
                  
                    echo"
                    </div>
                    <div id='sai_home_timeline' hidden>
                    </div>
                    <div id='sai_home_tracing' hidden>
                    </div>
                </div>";
        echo"
            ";
        echo"</div>
            </div>
        </div>";

       

		echo "<script type='text/javascript'>
			var table2 = $('#table-pemesanan').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table2.columns.adjust().draw();
             
            var table = $('#table-quo').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-nota').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-placing').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-polis').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();
			
			var table = $('#table-jt').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();

            var action_html = \"<a class='btn btn-primary btn-sm dt-view' type='button'><i class='fa fa-eye'></i></a>\";

            var table_pp = $('#table-pp').DataTable({
				    'scrollY': '300px',
                    'processing': true,
                    'serverSide': true,
                    'ajax': {
                        'url': 'dashTarbakLog.php?fx=dataTableServerSide',
                        'data': {kode_pp:'".$kunci."',kode_lokasi:'".$kode_lokasi."'},
                        'type': 'POST',
                        'dataSrc' : function(json) {
                            return json.data;
                        }
                    },
                    'columnDefs': [
                        {'targets': 5, data: null, 'defaultContent': action_html },
                        {
                            'targets': 4,
                            'className': 'text-right'
                        }
                    ]
				});
            table_pp.columns.adjust().draw();

            $('#table-pp').on( 'click', \"a[class*='dt-view'],a[class*='delTableRow'],a[class*='viewTableRow']\", function (e) {
                e.preventDefault();
    
                var data =  table_pp.row(table_pp.row($(this).closest('tr')).index()).data();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakLogDet2','','$kode_lokasi/$periode/$box/$kunci/'+data[0]);
                
            });          
           
            var table_klp = $('#table-klp').DataTable({
				'scrollY': '300px',
                    'processing': true,
                    'serverSide': true,
                    'ajax': {
                        'url': 'dashTarbakLog.php?fx=dataTableServerSide2',
                        'data': {kode_klpakun:'".$kunci."',kode_lokasi:'".$kode_lokasi."'},
                        'type': 'POST',
                        'dataSrc' : function(json) {
                            return json.data;
                        }
                    },
                    'columnDefs': [
                        {'targets': 5, data: null, 'defaultContent': action_html },
                        {
                            'targets': 4,
                            'className': 'text-right'
                        }
                    ],
				});
            table_klp.columns.adjust().draw();

            $('#table-klp').on( 'click', \"a[class*='dt-view'],a[class*='delTableRow'],a[class*='viewTableRow']\", function (e) {
                e.preventDefault();
    
                var data =  table_klp.row(table_klp.row($(this).closest('tr')).index()).data();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakLogDet2','','$kode_lokasi/$periode/$box/$kunci/'+data[0]);
                
            });  

			</script>
		";
        
		return "";
	}
	
}
?>
