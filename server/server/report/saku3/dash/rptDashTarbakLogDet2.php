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
class server_report_saku3_dash_rptDashTarbakLogDet2 extends server_report_basic
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
        $key=$tmp[4];
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakLogDet','','$kode_lokasi/$periode/$box/$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
                
                $sql="select a.no_fa,a.kode_pp,a.kode_klpakun,a.jenis,a.nama,a.no_seri,a.kode_vendor,a.kode_curr,a.kurs,a.nilai,a.tgl_perolehan,a.catatan, c.nama as nama_pp, d.nama as nama_klpakun,e.nama as nama_vendor from fa_asset a 
                left join pp c on a.kode_pp=c.kode_pp  and a.kode_lokasi=c.kode_lokasi
                left join fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi
                left join vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
                where a.no_fa='$key'
                order by a.no_fa ";

                    // echo $sql;

                    $rs=$dbLib->execute($sql);
                    $row = $rs->FetchNextObject(false);
                
                    echo "<table class='table' cellspacing='0' width='800' cellpadding='0' >
                    <tr>
                        <th style='text-align:center'>DETAIL ASSET</th>
                    </tr>
                    <tr>
                        <td align='center'>
                            <table class='table table-striped' cellspacing='0' width='800' cellpadding='0'>
                            <tr>
                                <th width='200' class='header_laporan'>ID Aset</th>
                                <td width='400' class='isi_laporan'>: &nbsp; $row->no_fa</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>PP</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_pp - $row->nama_pp</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kelompok Aset</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_klpakun - $row->nama_klpakun</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Jenis</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->jenis</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Jumlah</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->jumlah</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Nama Aset</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->nama</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Vendor</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_vendor - $row->nama_vendor</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Currency</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_curr</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Nilai Perolehan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->nilai</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kurs</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kurs</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Tgl Perolehan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->tgl_perolehan</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Keterangan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->catatan</td>
                            </tr>
                        </table>
                        </td>
                        </tr>
                            ";
                      
                        echo "</table><br>";
            
        echo"</div>
            </div>
        </div>";

       

		echo "<script type='text/javascript'>
			      
			</script>
		";
        
		return "";
	}
	
}
?>
