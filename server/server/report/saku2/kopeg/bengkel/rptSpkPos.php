<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bengkel_rptSpkPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_hutang)
from hutang_m a
$this->filter";
		
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
		$sql="select a.no_spk,a.no_polisi,a.tipe,a.merk,a.cust,date_format(a.tanggal,'%d/%m/%Y') as tgl_spk,
		c.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_jual,date_format(d.tanggal,'%d/%m/%Y') as tgl_jual,f.no_kas,date_format(f.tanggal,'%d/%m/%Y') as tgl_kas 
from fri_spk_m a
left join ver_d b on a.no_spk=b.no_bukti and a.kode_lokasi=b.kode_lokasi
left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi
left join fri_jual_m d on a.no_spk=d.no_dokumen and a.kode_lokasi=d.kode_lokasi
left join fri_jualbayar_d e on d.no_jual=e.no_jual and d.kode_lokasi=e.kode_lokasi
left join kas_m f on e.no_bukti=f.no_kas and e.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_spk";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi SPK",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='200'  align='center' class='header_laporan'>Customer</td>
	 <td width='100'  align='center' class='header_laporan'>No Polisi</td>
	 <td width='100'  align='center' class='header_laporan'>Merk</td>
	 <td width='100'  align='center' class='header_laporan'>Tipe</td>
      <td width='80'  align='center' class='header_laporan'>No App Gudang</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App Gudang</td>
	 <td width='80'  align='center' class='header_laporan'>No Final</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Final</td>
	 <td width='80'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spk</td>
	 <td class='isi_laporan'>$row->tgl_spk</td>
	 <td class='isi_laporan'>$row->cust</td>
	 <td class='isi_laporan'>$row->no_polisi</td>
	  <td class='isi_laporan'>$row->merk</td>
	  <td class='isi_laporan'>$row->tipe</td>
	  <td class='isi_laporan'>$row->no_ver</td>
	  <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan'>$row->no_jual</td>
	  <td class='isi_laporan'>$row->tgl_jual</td>
	   <td class='isi_laporan'>$row->no_kas</td>
	  <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
