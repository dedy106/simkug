<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_hris_rptPosReimb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kes)
from gr_kes_m a 
 inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
left join gr_ver_d c on a.no_klaim=c.no_bukti and a.kode_lokasi=c.kode_lokasi  and c.modul='FINALKLAIM'
left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi and d.modul='FINALKLAIM'
left join gr_ver_d e on a.no_klaim=e.no_bukti and a.kode_lokasi=e.kode_lokasi  and e.modul='FINALKLAIM' 
left join gr_ver_m f on e.no_ver=f.no_ver and e.kode_lokasi=f.kode_lokasi and f.modul='FINALKLAIM'  $this->filter ";
		
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
		$periode=$tmp[0];
		$sql="select nama from gr_footer ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$footer=$row->nama;
		$sql="select a.no_kes,date_format(a.tanggal,'%d/%m/%Y') as tgl_absen,a.nik_buat,b.nama,a.keterangan,d.no_ver,
date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,f.no_ver as no_app,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,a.kode_lokasi 
from gr_kes_m a 
 inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
left join gr_ver_d c on a.no_kes=c.no_bukti and a.kode_lokasi=c.kode_lokasi  and c.modul='REIMBURSE'
left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi and d.modul='REIMBURSE'
left join gr_ver_d e on a.no_kes=e.no_bukti and a.kode_lokasi=e.kode_lokasi  and e.modul='FINALREIMB' 
left join gr_ver_m f on e.no_ver=f.no_ver and e.kode_lokasi=f.kode_lokasi and f.modul='FINALREIMB' $this->filter
order by a.no_kes ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi reimburse dan bantuan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Reimburse</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Reimburse</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='80'  align='center' class='header_laporan'>No Verifikasi</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Ver</td>
     <td width='80'  align='center' class='header_laporan'>No Approve</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	</tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_kes','$row->kode_lokasi');\">$row->no_kes</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_absen</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKaryawan('$row->nik_buat','$row->kode_lokasi');\">$row->nik_buat</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVer('$row->no_ver','$row->kode_lokasi');\">$row->no_ver</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenApp('$row->no_app','$row->kode_lokasi');\">$row->no_app</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	
     </tr>";
			$i=$i+1;
		}
		
		echo "</table> </td></tr>
  <tr>
    <td align='left' class='isi_laporan'>$footer</td>
  </tr>
</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>