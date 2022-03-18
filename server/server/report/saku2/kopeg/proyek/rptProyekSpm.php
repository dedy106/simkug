<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_proyek_rptProyekSpm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_proyek)
from spm_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi $this->filter";
		
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
		$sql="select a.kode_proyek,a.nama,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.no_pks,a.kode_jenis,
a.kode_pp,c.nama as nama_pp ,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.nilai-a.nilai_or as total
from spm_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.kode_proyek";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Proyek</td>
	 <td width='120'  align='center' class='header_laporan'>No SPK</td>
	  <td width='120'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='60'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='200'  align='center' class='header_laporan'>Mitra</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek</td>
	 <td width='50'  align='center' class='header_laporan'>% OR</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai OR</td>
      </tr>  ";
		$nilai=0; $total=0; $nilai_or=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=+$row->nilai;
			$total+=+$row->total;
			$nilai_or+=+$row->nilai_or;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'>$row->no_pks</td>
	  <td class='isi_laporan'>$row->kode_jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	<td class='isi_laporan' align='center'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
		  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>&nbsp;</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
