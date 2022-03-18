<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptPjCair extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kas)
from kas_m a
inner join yk_pjaju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join pp c on c.kode_pp=b.kode_pp and c.kode_lokasi=b.kode_lokasi
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
		$sql="select a.no_kas,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl_kas,a.keterangan,b.no_pjaju,
		date_format(b.tanggal,'%d/%m/%Y') as tgl_pj,b.kode_pp,c.nama as nama_pp,b.nilai
from kas_m a
inner join yk_pjaju_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join pp c on c.kode_pp=b.kode_pp and c.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_kas";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pencairan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='100'  align='center' class='header_laporan'>No DOkumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='100'  align='center' class='header_laporan'>No Panjar</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Panjar</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai </td>
     </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->no_kas</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	   <td class='isi_laporan'>$row->tgl_kas</td>
	    <td class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan'>$row->no_pjaju</td>
	 <td class='isi_laporan'>$row->tgl_pj</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
