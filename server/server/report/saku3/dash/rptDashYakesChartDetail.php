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
class server_report_saku3_dash_rptDashYakesChartDetail extends server_report_basic
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

    function getBidang($jns,$nama)
	{
        global $dbLib;
        if($jns=="pp"){
            $sql = "select distinct kode_pp from pp where nama ='$nama' ";
        }else{
            $sql = "select distinct kode_bidang from pp where nama ='$nama' ";
        }
		
        $rs = $dbLib->execute($sql);	
        
		if ($rs)
		{
			$kode = $rs->fields[0];
			
		}
		return $kode;
    }
    
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $jenis=$tmp[2];
        $kunci=$tmp[3]; 
        
        if($jenis=="pp"){
            $sql = "select distinct kode_pp from pp where nama ='$kunci' ";
        }else{
            $sql = "select distinct kode_bidang from pp where nama ='$kunci' ";
        }
		
        $rs = $dbLib->execute($sql);	
        
		if ($rs)
		{
			$key = $rs->fields[0];
			
		}
        
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakes','','$kode_lokasi/$periode');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
				</div>";
		echo"<div class='row'>
                    <div id='sai_home_list'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Panjar </h3>                      
                            <div class='box-tools pull-right'>
                                <button type='button' class='btn btn-box-tool' data-widget='collapse'><i class='fa fa-minus'></i>
                                </button>
                                <button type='button' class='btn btn-box-tool' data-widget='remove'><i class='fa fa-times'></i></button>
                            </div>
                        </div>
                        <div class='box-body'>
                            <div>
                                <table class='table no-margin' id='table-progress-panjar'>
                                    <thead>
                                        <tr>
                                            <th>No Bukti</th>
                                            <th>Tanggal</th>
                                            <th>Keterangan</th>
                                            <th>Nilai</th>
                                            <th>Tgl Jatuh Tempo</th>
                                            <th>No Final Ptg</th>
                                            <th>Tgl Final</th>
                                            <th>Umur</th>
                                        </tr>
                                    </thead>
                                    <tbody>";

                                    if ($jenis=="pp")
									{
                        
                                        $sql = "select c.kode_bidang,a.no_panjar,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.kode_pp,c.nama,a.nik_buat,d.nama as pemegang,a.nilai,a.due_date as tgl_maksimal,isnull(b.no_ptg,'-') as no_ptg,b.tanggal as tgl_ptg, datediff(day,a.due_date,isnull(b.tanggal,getdate()) ) as umur_hari
                                        from panjar2_m a 
                                        inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                                        inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi 
                                        left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi 
                                        where a.kode_pp='$key' and a.periode >'201401'
                                        ";
                                    }

                                    if ($jenis=="bidang")
									{
                        
                                        $sql = "select c.kode_bidang,a.no_panjar,a.keterangan,convert(varchar,a.tanggal,103) as tanggal,a.kode_pp,c.nama,a.nik_buat,d.nama as pemegang,a.nilai,isnull(b.no_ptg,'-') as no_ptg,isnull(convert(varchar,b.tanggal,103),convert(varchar,getdate(),103)) as tgl_ptg,convert(varchar,a.due_date,103) as tgl_maksimal, datediff(day,a.due_date,isnull(b.tanggal,getdate()) ) as umur_hari
                                        from panjar2_m a 
                                        inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
                                        inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi 
                                        left join ptg_m b on a.no_panjar=b.no_pj and a.kode_lokasi=b.kode_lokasi 
                                        where c.kode_bidang='$key' and a.periode >'201401'
                                        ";
                                    }
                                    
                                    $rs = $dbLib->execute($sql); 
                                    while ($row = $rs->FetchNextObject($toupper=false))
                                    {
                                    echo" 
                                        <tr>
                                            <td><a href='#'>$row->no_panjar</a></td>
                                            <td>$row->tanggal</td>
                                            <td>$row->keterangan</td>
                                            <td align='right'>".number_format($row->nilai,0,',','.')."</td>
                                            <td>$row->tgl_maksimal</td>
                                            <td>$row->no_ptg</td>
                                            <td>$row->tgl_ptg</td>
                                            <td>$row->umur_hari</td>
                                        </tr>";
                                    }
                            echo    "</tbody>
                                </table>
                            </div>
                        </div>
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
				var table2 = $('#table-progress-panjar').DataTable({
				// 'fixedHeader': true,
				'scrollY': '200px',
				// 'scrollX': '0px',
				'scrollCollapse': true,
				'order': [[ 2, 'asc' ]]
				});
				table2.columns.adjust().draw();
			</script>
		";

        
		return "";
	}
	
}
?>
