<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptCust extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_cust)
from sju_cust a
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
		$sql="select a.kode_cust, a.nama, a.alamat, a.no_tel,a.inisial, a.email, a.npwp, a.pic, a.alamat2,a.kode_segmen,a.kota,a.tgl_lahir,a.tempat_lahir,''''+a.no_ktp as no_ktp,a.tgl_aktif,
				a.usaha,a.tgl_update,a.kategori,b.nama as nama_klp,isnull(dk.jum,0) as jum_dok,a.kode_lokasi
from sju_cust a
inner join sju_cust_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_cust,a.kode_lokasi,count(a.kode_cust) as jum 
 from sju_cust_dok a
 group by a.kode_cust,a.kode_lokasi
 )dk on a.kode_cust=dk.kode_cust and a.kode_lokasi=dk.kode_lokasi 
$this->filter order by a.kode_cust";

$resource = $_GET["resource"];
$fullId = $_GET["fullId"];
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data tertanggung",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Tertanggung</td>
	  <td width='150'  align='center' class='header_laporan'>Inisial</td>
	  <td width='100'  align='center' class='header_laporan'>Jumlah Dok</td>
	  <td width='150'  align='center' class='header_laporan'>Bidang Usaha</td>
	  <td width='120'  align='center' class='header_laporan'>Tempat Lahir</td>
	  <td width='100'  align='center' class='header_laporan'>Tgl Lahir</td>
	  <td width='50'  align='center' class='header_laporan'>Kode Segmen</td>
	 <td width='200'  align='center' class='header_laporan'>Alamat</td>
	 <td width='80'  align='center' class='header_laporan'>Kota</td>
     <td width='90'  align='center' class='header_laporan'>No Telp</td>
     <td width='70'  align='center' class='header_laporan'>Email</td>
     <td width='90'  align='center' class='header_laporan'>Npwp</td>
     <td width='90'  align='center' class='header_laporan'>No Ktp</td>
	  <td width='100'  align='center' class='header_laporan'>Tgl Aktif</td>
	  <td width='100'  align='center' class='header_laporan'>Tgl Update</td>
	  <td width='50'  align='center' class='header_laporan'>Risk Category</td>
	  <td width='50'  align='center' class='header_laporan'>Group Ttd</td>
	 </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->inisial</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->kode_cust','$row->kode_lokasi');\">$row->jum_dok</a>";
		echo "
	 </td>
	 <td class='isi_laporan'>$row->usaha</td>
	 <td class='isi_laporan'>$row->tempat_lahir</td>
	 <td class='isi_laporan'>$row->tgl_lahir</td>
	 <td class='isi_laporan'>$row->kode_segmen</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->kota</td>
	 <td class='isi_laporan'>$row->no_tel</td>
	 <td class='isi_laporan'>$row->email</td>
	 <td class='isi_laporan'>$row->npwp</td>
	 <td class='isi_laporan'>$row->no_ktp</td>
	 <td class='isi_laporan'>$row->tgl_aktif</td>
	 <td class='isi_laporan'>$row->tgl_update</td>
	 <td class='isi_laporan'>$row->kategori</td>
	 <td class='isi_laporan'>$row->nama_klp</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
