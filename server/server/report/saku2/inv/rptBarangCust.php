<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_inv_rptBarangCust extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_cust)
from inv_cust a 
inner join inv_cabang b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join inv_pasang_m c on a.kode_cust=c.kode_cust and b.kode_cabang=c.kode_cabang and a.kode_lokasi=c.kode_lokasi
inner join inv_pasang_d d on c.no_pasang=d.no_pasang and c.kode_lokasi=d.kode_lokasi
inner join inv_kota e on b.kode_kota=e.kode_kota ";
		
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
		$sql="select a.kode_cust,a.nama,b.kode_cabang,b.nama,b.alamat,e.nama as kota,d.bw,d.cid,d.iplan,d.ipwan,
	convert(varchar,c.tanggal,103) as tanggal,f.tipe,f.serial
from inv_cust a 
inner join inv_cabang b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join inv_pasang_m c on a.kode_cust=c.kode_cust and b.kode_cabang=c.kode_cabang and a.kode_lokasi=c.kode_lokasi
inner join inv_pasang_d d on c.no_pasang=d.no_pasang and c.kode_lokasi=d.kode_lokasi
inner join inv_kota e on b.kode_kota=e.kode_kota
inner join inv_barang f on d.kode_barang=f.kode_barang ";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Barang Customer",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr  bgcolor='#CCCCCC'>
    <td width='30' rowspan='3' align='center' class='header_laporan'>No</td>
    <td width='150' rowspan='3' align='center' class='header_laporan'>Customer</td>
	<td width='60' rowspan='3' align='center' class='header_laporan'>Kode Cabang</td>
    <td width='150' rowspan='3' align='center' class='header_laporan'>Kota</td>
    <td width='200' rowspan='3' align='center' class='header_laporan'>Alamat</td>
    <td colspan='11' align='center' class='header_laporan'>DATEK</td>
  </tr>
  <tr  bgcolor='#CCCCCC'>
    <td width='100' rowspan='2' align='center' class='header_laporan'>CID</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>BW</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>IP LAN</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>IP WAN</td>
    <td colspan='3' align='center' class='header_laporan'>INSTALASI ROUTER </td>
    <td colspan='4' align='center' class='header_laporan'>MODULE</td>
  </tr>
  <tr  bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>TANGGAL</td>
    <td width='100' align='center' class='header_laporan'>TYPE</td>
    <td width='100' align='center' class='header_laporan'>SERIAL</td>
    <td width='100' align='center' class='header_laporan'>NO SERIAL VOS</td>
    <td width='100' align='center' class='header_laporan'>NO SERIAL VOP</td>
    <td width='100' align='center' class='header_laporan'>NO SERIAL ISAE</td>
    <td width='100' align='center' class='header_laporan'>MODULE LAINNYA</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_panjar','$row->kode_lokasi');\">$row->kode_cabang</a>";
		echo "</td>
		<td class='isi_laporan'>$row->kota</td>
		<td class='isi_laporan'>$row->alamat</td>
		<td class='isi_laporan'>$row->cid</td>
		<td class='isi_laporan'>$row->bw</td>
		<td class='isi_laporan'>$row->iplan</td>
		<td class='isi_laporan'>$row->ipwan</td>
		<td class='isi_laporan'>$row->tanggal</td>
		<td class='isi_laporan'>$row->tipe</td>
		<td class='isi_laporan'>$row->serial</td>
		<td class='isi_laporan'>$row->ipwan</td>
		<td class='isi_laporan'>$row->ipwan</td>
		<td class='isi_laporan'>$row->ipwan</td>
		<td class='isi_laporan'>$row->ipwan</td>
  ";
			$i=$i+1;
		}
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
