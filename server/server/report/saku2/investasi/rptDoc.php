<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptDoc extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_depo)
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
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
		$sql="select a.no_depo,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.modul,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.jml_hari,a.basis,a.p_bunga,a.nilai,
	   b.nama as nama_bank
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
$this->filter order by a.no_depo";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penempatan doc piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai DOC</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	 <td width='40'  align='center' class='header_laporan'>Bunga</td>
	 <td width='40'  align='center' class='header_laporan'>Jumlah Hari</td>
	 <td width='60'  align='center' class='header_laporan'>Hari Pembagi</td>
	
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_depo</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p_bunga,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jml_hari,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->basis,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
