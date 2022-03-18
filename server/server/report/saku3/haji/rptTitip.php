<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_haji_rptTitip extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_reg,a.kode_lokasi,a.no_jadwal,a.no_peserta,convert(varchar(10),a.tanggal,103) as tgl,
	   a.kode_curr,a.harga,a.diskon,a.harga-a.diskon as netto,a.tambah,convert(varchar(10),c.tanggal,103) as due_date,
	   b.nama as nama_peserta,c.nama as nama_jadwal
from haj_reg a
inner join haj_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi 
inner join haj_jadwal c on a.no_jadwal=c.no_jadwal and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_reg";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("titipan peserta",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Registrasi</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='80'  align='center' class='header_laporan'>No Peserta</td>
	   <td width='200'  align='center' class='header_laporan'>Nama Peserta</td>
	 <td width='100'  align='center' class='header_laporan'>No Jadwal</td>
	<td width='200'  align='center' class='header_laporan'>Nama Jadwal</td>
	<td width='60'  align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	`<td width='60'  align='center' class='header_laporan'>Kode Curr</td>
     <td width='90'  align='center' class='header_laporan'>Harga</td>
     <td width='90'  align='center' class='header_laporan'>Diskon</td>
     <td width='90'  align='center' class='header_laporan'>Netto</td>
	 <td width='90'  align='center' class='header_laporan'>Tambahan</td>
	  </tr>  ";
		$netto=0;$tambah=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$netto+=$row->netto;
			$tambah+=$row->tambah;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_reg','$row->kode_lokasi');\">$row->no_reg</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_peserta</td>
	 <td class='isi_laporan'>$row->nama_peserta</td>
	 <td class='isi_laporan'>$row->no_jadwal</td>
	 <td class='isi_laporan'>$row->nama_jadwal</td>
	 <td class='isi_laporan'>$row->due_date</td>
	 <td class='isi_laporan'>$row->kode_curr</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harga,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->netto,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tambah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='11'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($netto,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tambah,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
