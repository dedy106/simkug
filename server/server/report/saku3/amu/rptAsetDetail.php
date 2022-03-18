<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptAsetDetail extends server_report_basic
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
        $kode_lokasi=$tmp[0];
        
        $sql="select a.no_bukti,a.spesifikasi,a.id_gedung,a.no_ruang,a.kode_klp,convert(varchar,a.tanggal_perolehan,103) as tgl,
	   a.kode_lokasi,a.nilai_perolehan,a.nama_inv,a.no_seri,a.merk,a.tipe,a.warna,a.satuan,a.spesifikasi,a.sumber_dana,
	   b.nama_klp,a.satuan,c.nama_gedung,d.nama_ruangan,a.barcode,
	   e.nama as nama_lembaga,f.nama as nama_lantai
from amu_asset_bergerak a
inner join amu_klp_brg b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
left join amu_gedung c on a.id_gedung=c.id_gedung and a.kode_lokasi=c.kode_lokasi
left join amu_ruangan d on a.no_ruang=d.no_ruangan and a.kode_lokasi=d.kode_lokasi 
left join amu_lembaga e on c.id_lembaga=e.id_lembaga and c.kode_lokasi=e.kode_lokasi 
left join amu_lantai f on d.lantai=f.id_lantai and d.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_bukti";
       
        $rs = $dbLib->execute($sql);	
		$i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        $AddOnLib=new server_util_AddOnLib();	
      
		echo "<div align='center'>"; 
		//echo "$sql";
		echo $AddOnLib->judul_laporan("data inventaris",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>ID Barang</td>
	 <td width='150'  align='center' class='header_laporan'>Lembaga</td>
	 <td width='150'  align='center' class='header_laporan'>Gedung</td>
	 <td width='150'  align='center' class='header_laporan'>Lantai</td>
	 <td width='80'  align='center' class='header_laporan'>Ruang</td>
	 <td width='200'  align='center' class='header_laporan'>Kelompok Barang</td>
	 <td width='60'  align='center' class='header_laporan'>QR Code</td>
	 <td width='90'  align='center' class='header_laporan'>Nama Barang</td>
	 <td width='90'  align='center' class='header_laporan'>Spesifikasi</td>
	 <td width='90'  align='center' class='header_laporan'>No Seri</td>
	 <td width='90'  align='center' class='header_laporan'>Merk </td>
	 <td width='90'  align='center' class='header_laporan'>Type</td>
	 <td width='90'  align='center' class='header_laporan'>Warna</td>
	 <td width='90'  align='center' class='header_laporan'>Satuan</td>
	 <td width='90'  align='center' class='header_laporan'>Sumber Dana</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Perolehan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Perolehan</td>
	 <td width='90'  align='center' class='header_laporan'>Status Akhir</td>
	 </tr>  ";
		$nilai_perolehan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_perolehan+=$row->nilai_perolehan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_bukti</td>
	 <td class='isi_laporan'>$row->nama_lembaga</td>
	 <td class='isi_laporan'>$row->nama_gedung</td>
	 <td class='isi_laporan'>$row->nama_lantai</td>
	 <td class='isi_laporan'>$row->nama_ruangan</td>
	 <td class='isi_laporan'>$row->nama_klp</td>
	 <td class='isi_laporan'>$row->barcode</td>
	 <td class='isi_laporan'>$row->nama_inv</td>
	 <td class='isi_laporan'>$row->spesifikasi</td>
	 <td class='isi_laporan'>$row->no_seri</td>
	 <td class='isi_laporan'>$row->merk</td>
	 <td class='isi_laporan'>$row->tipe</td>
	 <td class='isi_laporan'>$row->warna</td>
	 <td class='isi_laporan'>$row->satuan</td>
	 <td class='isi_laporan'>$row->sumber_dana</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_perolehan,0,',','.')."</td>
	 <td class='isi_laporan'>$row->status</td>
     </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";        
		echo "</div>";
		return "";
		
	}
	
}
?>
