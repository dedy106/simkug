<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptRegist extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$sql="select a.no_reg, a.no_peserta, b.nama as peserta, a.no_paket, c.nama as namapaket, a.no_jadwal, convert(varchar(10),d.tgl_berangkat,103) as tgl, 
			a.no_agen, e.nama_agen, a.no_type, f.nama as type, h.nama_marketing, a.kode_lokasi,a.harga
			from dgw_reg a		
			inner join dgw_peserta b on b.no_peserta=a.no_peserta and b.kode_lokasi=a.kode_lokasi
			inner join dgw_paket c on c.no_paket=a.no_paket and c.kode_lokasi=a.kode_lokasi
			inner join dgw_jadwal d on c.no_paket=d.no_paket and d.no_jadwal=a.no_jadwal and d.kode_lokasi=a.kode_lokasi
			inner join dgw_agent e on e.no_agen=a.no_agen and a.kode_lokasi=e.kode_lokasi
			inner join dgw_typeroom f on f.no_type=a.no_type and a.kode_lokasi=f.kode_lokasi
			inner join dgw_marketing h on h.no_marketing=a.no_marketing and h.kode_lokasi=a.kode_lokasi
			$this->filter			
			order by a.no_reg";

		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar registrasi",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr bgcolor='#CCCCCC'>
  
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='100' align='center' class='header_laporan'>No Registrasi</td>
    <td width='200' align='center' class='header_laporan'>Nama Jamaah</td>
    <td width='80' align='center' class='header_laporan'>Jadwal Keberangkatan</td>
    <td width='100' align='center' class='header_laporan'>Agen</td>
    <td width='100' align='center' class='header_laporan'>Marketing</td>
    <td width='100' align='center' class='header_laporan'>Paket</td>
	<td width='100' align='center' class='header_laporan'>Room</td>
	<td width='100' align='center' class='header_laporan'>Harga</td>

   </tr>";
		$harga=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenReg('$row->no_reg','$row->kode_lokasi');\">$row->no_reg</a>";
		echo "</td>		
			<td class='isi_laporan'>$row->peserta</td>
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->nama_agen</td>
			<td class='isi_laporan'>$row->nama_marketing</td>
			<td class='isi_laporan'>$row->namapaket</td>
			<td class='isi_laporan'>$row->type</td>
			<td class='isi_laporan' align='right'>".number_format($row->harga,2,',','.')."</td>
    </tr>";	
			$i=$i+1;
			$harga+=$row->harga;
		}
		echo "<tr>
			<td class='header_laporan' colspan='8' align='right'>Total</td>
			<td class='header_laporan' align='right'>".number_format($harga,2,',','.')."</td>
    </tr>";	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
