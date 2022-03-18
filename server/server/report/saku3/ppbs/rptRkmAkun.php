<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptRkmAkun extends server_report_basic
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
		$tahun=$tmp[1];
		$jenis=$tmp[2];
		$nama_file="rkm.xls";
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
		$sql="select a.kode_lokasi,a.kode_akun,b.kode_rkm,a.kode_drk,a.keterangan,b.nama as nama_drk,c.nama as nama_rkm,d.nama as nama_akun 
from (select a.kode_lokasi,a.kode_akun,a.kode_drk,a.keterangan
from agg_d a 
where substring(a.periode,1,4)='$tahun' and a.kode_lokasi='$kode_lokasi'
group by a.kode_lokasi,a.kode_akun,a.kode_drk,a.keterangan
	) a
inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and b.tahun='$tahun'
inner join agg_rkm c on b.kode_rkm=c.kode_rkm and b.kode_lokasi=c.kode_lokasi and c.tahun='$tahun'
inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data rkm akun",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' class='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='150' align='center' class='header_laporan'>Nama Akun</td>
	 <td width='80'  align='center' class='header_laporan'>Kode RKM</td>
     <td width='150'  align='center' class='header_laporan'>Nama RKM</td>
	 <td width='80'  align='center' class='header_laporan'>Kode DRK</td>
     <td width='200'  align='center' class='header_laporan'>Nama DRK</td>
     <td width='60'  align='center' class='header_laporan'>Tahun</td>
	 <td width='200'  align='center' class='header_laporan'>Rincian Kegiatan</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan'>$row->kode_rkm</td>
	 <td class='isi_laporan'>$row->nama_rkm</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->nama_drk</td>
	 <td class='isi_laporan'>$tahun</td>
	 <td class='isi_laporan'>$row->keterangan</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
