<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptRdBeli extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_rdbeli)
from inv_rdbeli_m a
inner join inv_rdkelola b on a.kode_rdkelola=b.kode_rdkelola
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
		$sql="select a.no_rdbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
       a.nilai_komisi,a.nilai_ppn,a.nilai_levy,a.nilai_pph,b.nama as nama_kelola,
	   c.kode_rd,d.nama as nama_rd,c.h_oleh,c.harga,c.jumlah,c.n_beli
from inv_rdbeli_m a
inner join inv_rdkelola b on a.kode_rdkelola=b.kode_rdkelola
inner join inv_rdbeli_d c on a.no_rdbeli=c.no_rdbeli
inner join inv_rd d on c.kode_rd=d.kode_rd
$this->filter order by a.no_rdbeli";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian reksadana",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Reksadana</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Kelola</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Set</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='50'  align='center' class='header_laporan'>Jml Unit</td>
     <td width='90'  align='center' class='header_laporan'>Harga Oleh</td>
     <td width='90'  align='center' class='header_laporan'>Harga Buku</td>
	 <td width='50'  align='center' class='header_laporan'>Jml Beli</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Beli</td>
	 <td width='90'  align='center' class='header_laporan'>Komisi Broker</td>
	 <td width='90'  align='center' class='header_laporan'>VAT</td>
	 <td width='90'  align='center' class='header_laporan'>Levy</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_rdbeli</td>
	 <td class='isi_laporan'>$row->nama_rd</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->tgl_set</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->harga,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_levy,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($harga,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n_beli,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_komisi,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_levy,0,",",".")."</td>
    
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
