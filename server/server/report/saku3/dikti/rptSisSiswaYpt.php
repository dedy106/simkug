<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dikti_rptSisSiswaYpt extends server_report_basic
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
		$sql="select a.nim,a.kode_lokasi,a.nama,a.kode_kelas,a.kode_jur,c.nama as nama_jur,b.nama as nama_kelas,a.kode_akt,d.nama as status
		from dikti_mhs a
		inner join dikti_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi
		inner join dikti_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi
		inner join dikti_mhs_status d on a.kode_status=d.kode_status and a.kode_lokasi=d.kode_lokasi
		$this->filter
		order by a.kode_kelas,a.nim ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data mahasiswa",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
   <td width='30' align='center' class='header_laporan'>No</td>
   <td width='60' align='center' class='header_laporan'>NIM</td>
   <td width='300' align='center' class='header_laporan'>Nama</td>
   <td width='60' align='center' class='header_laporan'>Kelas</td>
   <td width='60' align='center' class='header_laporan'>Angkatan</td>
   <td width='60' align='center' class='header_laporan'>Jurusan</td>
   <td width='50' align='center' class='header_laporan'>Status</td>
	 </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
		<td class='isi_laporan' align='center'>$i</td> 
		<td class='isi_laporan'>";
				 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nim','$row->kode_lokasi','$row->kode_pp');\">$row->nim</a>";
				 echo "</td>
				 <td class='isi_laporan'>$row->nama</td>
				 <td class='isi_laporan'>$row->kode_kelas</td>
				 <td class='isi_laporan'>$row->kode_akt</td>
				 <td class='isi_laporan'>$row->kode_jur</td>
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
