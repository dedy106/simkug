<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDoc extends server_report_basic
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
		$sql="select a.no_depo,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.status_dana,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.basis,a.p_bunga,a.nilai,a.no_shop,b.nama as nama_bank,c.nama as nama_kelola,
	   case when a.status_dana='DAKES' then 'JAMKESPEN' else a.status_dana end as nama_status,
	   case when a.jenis='DEPOSITO' then a.jml_hari else 0 end as jml_bulan,a.jenis,
	    case when a.jenis='DOC' then a.jml_hari else 0 end as jml_hari
from inv_depo2_m a
inner join inv_bank b on a.bsumber=b.kode_bank
inner join inv_kelola c on a.kode_kelola=c.kode_kelola
$this->filter order by a.no_depo";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penempatan doc",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>No Shop</td>
	 <td width='80'  align='center' class='header_laporan'>Jenis</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='80'  align='center' class='header_laporan'>Jenis Deposito</td>
	 <td width='100'  align='center' class='header_laporan'>Pengelola</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	  <td width='40'  align='center' class='header_laporan'>Durasi Hari</td>
	  <td width='40'  align='center' class='header_laporan'>Durasi Bulan</td>
	 <td width='40'  align='center' class='header_laporan'>Bunga</td>
	 <td width='40'  align='center' class='header_laporan'>Hari Pembagi</td>
	 
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_depo</td>
	 <td class='isi_laporan'>$row->no_shop</td>
	 <td class='isi_laporan'>$row->jenis</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->nama_status</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jml_hari,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jml_bulan,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p_bunga,2,",",".")."</td>
	  
	  <td class='isi_laporan' align='right'>".number_format($row->basis,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
