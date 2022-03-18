<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptStok extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="rptStok.xls";
		$sql="exec sp_brg_hpp '$periode','$kode_lokasi','$nik_user'";
		// echo $sql;
		
		$rs0 = $dbLib->execute($sql);

		$sql="exec sp_brg_stok '$periode','$kode_lokasi','$nik_user'";
		// echo $sql;
		
		$rs = $dbLib->execute($sql);

		$sql="select a.kode_barang,b.nama,a.stok,a.kode_gudang,c.nama as nama_gudang,b.kode_klp,isnull(d.h_avg,0) as harga, a.stok*isnull(d.h_avg,0) as total
		from brg_stok a
		inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
		inner join brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi
		left join brg_hpp d on a.kode_barang=d.kode_barang and a.kode_lokasi=d.kode_lokasi and a.nik_user=d.nik_user
		$this->filter and  a.nik_user='$nik_user'
		order by b.kode_klp,a.kode_barang";
		// echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;

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
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok barang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='150'  align='center' class='header_laporan'>Gudang</td>
     <td width='100'  align='center' class='header_laporan'>Kode Barang</td>
	 <td width='400'  align='center' class='header_laporan'>Nama Barang</td>
	 <td width='60'  align='center' class='header_laporan'>Kelompok</td>
	 <td width='60'  align='center' class='header_laporan'>Stok</td>
	 <td width='60'  align='center' class='header_laporan'>Harga</td>
	 <td width='60'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$h_avg=0;$stok=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$stok=$stok+$row->stok;
			$total=$total+$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kode_gudang - $row->nama_gudang</td>
     <td class='isi_laporan'>$row->kode_barang</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_klp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->stok,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($stok,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>&nbsp;</td>
	  <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
