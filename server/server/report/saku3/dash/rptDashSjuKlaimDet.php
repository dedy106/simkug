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
class server_report_saku3_dash_rptDashSjuKlaimDet extends server_report_basic
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
        $kode_fs=$tmp[4];
        $box=$tmp[5];
        $kunci=$tmp[6];
        $kunci2=$tmp[7];
        $cust=$tmp[8];
        $polis=$tmp[9];
        $filter="";
		if($cust != "" ){
			$filter.= " and b.kode_cust='$cust' ";
		}
		if($polis != ""){
			$filter.= " and b.no_polis='$polis' ";
		}
			
		if($cust == "" AND $polis == ""){
			$filter="";
		}
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuKlaim','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$cust/$polis');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>";
                    switch($box){
                        case "k1" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-pemesanan'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Status</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,a.status,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11' and a.status in ('0') ";
								
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->status</td>
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
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-quo'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11' and a.progress in ('OUTSTANDING')";
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->progress</td>

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
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-nota'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11' and a.progress in ('SETTLED')";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->progress</td>

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
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-placing'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11' and a.progress in ('UNDERDEDUCTIBLE')";
								
                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                       <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->progress</td>

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
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-polis'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11' and a.progress in ('NOCLAIM')";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->progress</td>

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
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>                      
                            
                        </div>
                        <div class='box-body'>
                            <div>
                            <table class='table no-margin' id='table-jt'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No Klaim </th>
                                    <th style='text-align:center;'>No Polis </th>
                                    <th style='text-align:center;'>Tgl</th>
                                    <th style='text-align:center;'>Keterangan</th>
                                    <th style='text-align:center;'>Lokasi </th>
                                   <th style='text-align:center;'>Progress</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
										f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
										DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
								from sju_klaim a
								inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
								inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
								left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
								left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status
								where a.kode_lokasi='11'";

                                $rs2 = $dbLib->execute($sql);                              
                                
                                while ($row = $rs2->FetchNextObject(false)){
                                echo "<tr>
                                        <td><a  style='cursor:pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSjuProdDet2','','$kode_lokasi/$periode/$box/$kunci/$row->no_klaim/null/null/null');\" >$row->no_klaim</a></td>
                                        <td>$row->no_polis</td>
                                        <td>$row->tanggal</td>
                                        <td>$row->keterangan</td>
                                        <td>$row->lokasi</td>
                                        <td>$row->progress</td>

                                    </tr>";
                                }

                                echo
                                "</tbody>
                            </table>
                            </div>
                        </div>";
                        break;
                        case "det" :
                        echo"
                        <div class='box-header with-border'>
                            <h3 class='box-title' style='margin-left: 10px;'>Data Klaim</h3>               
                        </div>
                        <div class='box-body'>
                        <div class='table-responsive sai-container-overflow'>
                            <table width='100%' class='display' id='table-klaim2'>
                                <thead>
                                <tr>
                                    <th style='text-align:center;'>No</th>
                                    <th style='text-align:center;'>No Klaim</th>
                                    <th style='text-align:center;'>No Berkas</th>
                                    <th style='text-align:center;'>Tgl Lapor</th>
                                    <th style='text-align:center;'>DOL</th>
                                    <th style='text-align:center;'>Policy No</th>
                                    <th style='text-align:center;'>Tertanggung</th>
                                    <th style='text-align:center;'>Lokasi</th>
                                    <th style='text-align:center;'>Penyebab Kerugian</th>
                                    <th style='text-align:center;'>Curr</th>
                                    <th style='text-align:center;'>Nilai Klaim</th>
                                    <th style='text-align:center;'>Nilai Klaim yg Dibayar</th>
                                    <th style='text-align:center;'>Tanggal Settled</th>
                                    <th style='text-align:center;'>Settled Claim</th>
                                    <th style='text-align:center;'>Tanggal Adjusment</th>
                                    <th style='text-align:center;'Nilai Adjusment</th>
                                    <th style='text-align:center;'>Aging Klaim (DOL)</th>
                                    <th style='text-align:center;'>Aging Klaim (Tanggal Lapor)</th>
                                    <th style='text-align:center;'>Status Klaim</th>
                                    <th style='text-align:center;'>Remark</th>
                                </tr>
                                </thead>
                                <tbody>";

                                $sql = "select a.no_klaim,convert(varchar(10),a.tanggal,103) as tanggal,a.no_polis,a.keterangan,a.nilai,a.progress,a.no_berkas,
                                f.nama as nama_cust,b.kode_curr,a.lokasi,a.sebab,h.nilai_awal,h.nilai_deduc,h.nilai_nego,h.nilai_final,g.catatan,h.tgl_bayar,
                                DATEDIFF(month, a.tanggal, h.tgl_bayar) AS aging_dol,DATEDIFF(month,  a.tanggal,h.tgl_bayar) AS aging_cl
                                from sju_klaim a
                                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                                inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
                                left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
                                left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status 
                                where a.kode_lokasi='11' and a.progress='$kunci' and a.status in ('$kunci2') $filter
                                order by a.no_klaim
                                 ";
                                
                                // echo $sql;
								
                                $rs2 = $dbLib->execute($sql);                              
                                
                                $nilai=0;$nilai_nego=0;$tagihan=0;
                                $i=1;
                                while ($row = $rs2->FetchNextObject($toupper=false))
                                {
                                    $nilai+=$row->nilai;
                                    $nilai_nego+=$row->nilai_nego;
                                    $nilai_final+=$row->nilai_final;
                                echo "<tr >
                                    <td  align='center'>$i</td>
                                    <td >$row->no_klaim</td>
                                    <td >$row->no_berkas</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->tanggal</td>
                                    <td >$row->no_polis</td>
                                    <td >$row->nama_cust</td>
                                    <td >$row->lokasi</td>
                                    <td >$row->sebab</td>
                                    <td >$row->kode_curr</td>
                                    <td  align='right'>".number_format($row->nilai,0,',','.')."</td>
                                    <td  align='right'>".number_format($row->nilai_nego,0,',','.')."</td>
                                    <td >$row->tgl_bayar</td>
                                    <td >$row->catatan</td>
                                    <td >&nbsp;</td> 
                                    <td  align='right'>".number_format($row->nilai_final,0,',','.')."</td>
                                    <td >$row->aging_dol</td>
                                    <td >$row->aging_cl</td>
                                    <td >$row->progress</td>
                                    <td >$row->catatan</td> 
                                 </tr>";
                                    $i=$i+1;
                                }

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

            var table = $('#table-klaim').DataTable({
				// 'fixedHeader': true,
				'scrollY': '300px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
            table.columns.adjust().draw();

            $('#table-klaim2').DataTable();
            $('#table-klaim2').addClass('table table-bordered table-striped table-hover');
            
    
                
			</script>
		";
        
		return "";
	}
	
}
?>
