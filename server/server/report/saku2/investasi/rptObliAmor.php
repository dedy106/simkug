<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptObliAmor extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_amor)
from inv_obliamor_m a
inner join inv_oblispi_d b on a.no_amor=b.no_amor
$this->filter ";
		
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
		$sql="select a.no_amor,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,b.kode_jenis,c.nama as nama_jenis,
	   date_format(b.tgl_akru_seb,'%d/%m/%Y') as tgl_akru_seb,date_format(b.tgl_akru,'%d/%m/%Y') as tgl_akru,b.jml_hari,b.nilai,b.dc
from inv_obliamor_m a
inner join inv_obliamor_d b on a.no_amor=b.no_amor
inner join inv_oblijenis c on b.kode_jenis=c.kode_jenis
$this->filter order by a.no_amor";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("amortisasi obligasi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='50'  align='center' class='header_laporan'>Kode</td>
	 <td width='100'  align='center' class='header_laporan'>Nama </td>
	   <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Akru Seb</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Akru</td>
     <td width='90'  align='center' class='header_laporan'>Jml Hari</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>
	
	  </tr>  ";
		$jumlah=0;$jumlah=0;$jumlah=0;$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_amor</td>
	 <td class='isi_laporan'>$row->kode_jenis</td>
	 <td class='isi_laporan'>$row->nama_jenis</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->tgl_akru_seb</td>
	 <td class='isi_laporan'>$row->tgl_akru</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jml_hari,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
