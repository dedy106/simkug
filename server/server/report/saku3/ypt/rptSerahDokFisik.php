<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ypt_rptSerahDokFisik extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$filter3=$tmp[2];

		$sql="select a.kode_pp,a.kode_lokasi,a.nama,b.jum as aju,isnull(c.jum,0) as serah,b.jum - isnull(c.jum,0) as sisa,isnull(d.jum,0) as belum 
        from pp a 
		inner join (select a.kode_pp,a.nik,a.kode_lokasi 
					from karyawan_pp a
					union all
					select a.kode_pp,a.nik,a.kode_lokasi 
					from karyawan_akses a
					) e on a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp 
        inner join (
            select a.kode_pp,a.kode_lokasi,count(a.no_aju) as jum
            from it_aju_m a 
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju 
            $filter3 and a.progress in ('3','4') 
            group by a.kode_pp,a.kode_lokasi
        ) b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        left join (
            select a.kode_pp,a.kode_lokasi,count(a.no_aju) as jum
            from it_aju_m a 
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
            inner join it_aju_fisik e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi 
            $filter3 and a.progress in ('3','4') 
            group by a.kode_pp,a.kode_lokasi
        ) c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
        left join (
            select a.kode_pp,a.kode_lokasi,count(a.no_aju) as jum
            from it_aju_m a 
            inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app and a.no_aju=f.no_aju
            inner join it_dok_app e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi
            $filter3 and a.progress in ('3','4')  
            group by a.kode_pp,a.kode_lokasi
        ) d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi and b.kode_pp=c.kode_pp
		$this->filter ";
		// echo $sql;

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Penyerahan Dokumen Fisik",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='550' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='80' align='center' class='header_laporan'>Kode PP</td>
		<td width='200' align='center' class='header_laporan'>Nama</td>
		<td width='80' align='center' class='header_laporan'>Total Pengajuan Online</td>
		<td width='80' align='center' class='header_laporan'>Menyerahkan Dokumen</td>
		<td width='80' align='center' class='header_laporan'>Belum Diserahkan</td>
		<td width='80' align='center' class='header_laporan'>Sudah Diterima</td>
   </tr>";
		$aju=0; $serah=0; $belum=0; $sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$aju+=$row->aju;
			$serah+=$row->serah;
			$belum+=$row->belum;
			$sisa+=$row->sisa;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->nama</td>";
            echo "
			<td class='isi_laporan' align='right'>
            <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->kode_pp','$row->kode_lokasi','aju');\">".number_format($row->aju,0,",",".")."</a>
            </td>
			<td class='isi_laporan' align='right'>
            <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->kode_pp','$row->kode_lokasi','serah');\">".number_format($row->serah,0,",",".")."</a>
            </td>
            <td class='isi_laporan' align='right'>
            <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->kode_pp','$row->kode_lokasi','sisa');\">".number_format($row->sisa,0,",",".")."</a>
            </td>
            </td>
			<td class='isi_laporan' align='right'> 
            <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->kode_pp','$row->kode_lokasi','belum');\">".number_format($row->belum,0,",",".")."</a>
            </td>
            </td>

    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='isi_laporan' colspan='3'>&nbsp;</td>
			<td class='isi_laporan' align='right'>".number_format($aju,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($serah,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
			<td class='isi_laporan' align='right'>".number_format($belum,0,",",".")."</td>
			</tr>
			</table>
		</div>";
		echo"</table>";

		return "";
	}
	
}
?>
  
  
