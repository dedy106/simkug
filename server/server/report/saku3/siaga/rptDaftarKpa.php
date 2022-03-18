<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptDaftarKpa extends server_report_basic
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
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$xperiode=$tmp[3];
		$periode2=$tmp[4];
		$AddOnLib=new server_util_AddOnLib();	
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($xperiode=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($xperiode=="All")
		{
			$nama_periode="Semua Periode";
		}
		
		$sql = "select a.no_app,a.kode_lokasi,a.tanggal,a.modul,a.no_bukti,a.catatan,a.nik_user,b.nama,convert(varchar(20),a.tanggal,103) as tgl,
		isnull(c.nilai,0) as nilai
from gr_app_m a
inner join karyawan b on a.nik_user=b.nik
left join gr_pb_m c on a.no_bukti=c.no_pb and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_app ";
		
		$rs = $dbLib->execute($sql);
		
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];	
		echo $AddOnLib->judul_laporan("daftar Approve anggaran",$this->lokasi,$nama_periode);
		$i=1;
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
		   <tr bgcolor='#CCCCCC'>
			 <td width='30'  align='center' class='header_laporan'>No</td>
			 <td width='80'  align='center' class='header_laporan'>No Bukti</td>
			 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
			 <td width='60'  align='center' class='header_laporan'>Nik</td>
			 <td width='150'  align='center' class='header_laporan'>Nama </td>
			 <td width='60'  align='center' class='header_laporan'>Modul</td>
			 <td width='80'  align='center' class='header_laporan'>No Pengajuan</td>
			 <td width='250'  align='center' class='header_laporan'>Catatan</td>
			 <td width='80'  align='center' class='header_laporan'>Nilai</td>
			 </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKpa('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
			echo "</td>
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->nik_user</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->modul</td>
			<td class='isi_laporan'>$row->no_bukti</td>
			<td class='isi_laporan'>$row->catatan</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>";	
			$i+=1;
		}
		echo "</div>";
		return "";
	}
}
?>