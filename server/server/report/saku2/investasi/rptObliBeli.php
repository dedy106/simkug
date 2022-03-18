<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptObliBeli extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_beli)
from inv_oblibeli_m a
inner join inv_obligor b on a.kode_obligor=b.kode_obligor
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
		$sql="select a.no_beli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_obligor,c.nama as nama_obligor,d.nama as nama_jenis,
       b.kode_jenis, b.status, b.nilai, b.nilai_beli, b.nilai_buku, b.nilai_piukupon,
	   date_format(b.tgl_mulai,'%d/%m/%Y') as tgl_mulai, date_format(b.tgl_selesai,'%d/%m/%Y') as tgl_selesai, b.tgl_akru, 
       b.tgl_akru_seb, b.rate, b.basis
from inv_oblibeli_m a
inner join inv_obli_d b on a.no_beli=b.no_beli
inner join inv_obligor c on a.kode_obligor=c.kode_obligor
inner join inv_oblijenis d on b.kode_jenis=d.kode_jenis
$this->filter order by a.no_beli";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian obligasi",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='80'  align='center' class='header_laporan'>Jenis</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Obligasi</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Oblgator</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	  <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='50'  align='center' class='header_laporan'>Jml Hari</td>
     <td width='40'  align='center' class='header_laporan'>Rate</td>
     <td width='40'  align='center' class='header_laporan'>Basis</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Beli</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Buku</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Kupon</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_beli</td>
	 <td class='isi_laporan'>$row->kode_jenis</td>
	 <td class='isi_laporan'>$row->nama_jenis</td>
	  <td class='isi_laporan'>$row->nama_obligor</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah_hari,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->rate,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->basis,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_beli,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='12'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_beli,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_beli,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
