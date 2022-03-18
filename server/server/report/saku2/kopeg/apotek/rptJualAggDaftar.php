<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_apotek_rptJualAggDaftar extends server_report_basic
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
		$jenis=$tmp[1];
		$nama_file="daftar.xls";
		$sql="select a.no_jual,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen,a.keterangan,a.kode_cust,b.nama as nama_cust ,
		a.kode_gudang,c.nama as nama_gudang,a.nilai as total,a.nilai_ppn,a.nilai-a.nilai_ppn as nilai,d.nama as nama_dokter,a.tarif
from apo_brg_jual_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join apo_brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi
inner join apo_dokter d on a.kode_dokter=d.kode_dokter
$this->filter order by a.no_jual";

if ($jenis=="Excell")
{
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
	header("Content-Type: application/force-download");
	header("Content-Type: application/octet-stream");
	header("Content-Type: application/download");;
	header("Content-Disposition: attachment;filename=$nama_file"); 
	header("Content-Transfer-Encoding: binary ");
}
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan anggota",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	  <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='40'  align='center' class='header_laporan'>Kode Cust</td>
     <td width='200'  align='center' class='header_laporan'>Nama Cust</td>
	 <td width='100'  align='center' class='header_laporan'>Dokter</td>
	 <td width='60'  align='center' class='header_laporan'>Tarif</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
     <td width='80'  align='center' class='header_laporan'>Nilai</td>
     <td width='70'  align='center' class='header_laporan'>PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$total=$total+$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_jual</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->nama_dokter</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tarif,0,",",".")."</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='9'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
