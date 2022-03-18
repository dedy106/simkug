<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptSisSaldoCdSiswa extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$nama_file="saldo.xls";
		
	
		$sql="select a.nim,a.kode_lokasi,a.nama,a.kode_kelas,a.kode_akt,f.kode_jur,f.nama as nama_jur,
		isnull(c.nilai,0) as so_awal,isnull(d.nilai,0) as debet,isnull(e.nilai,0) as kredit,
		isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
 from dikti_mhs a 
 inner join dikti_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi
 inner join dikti_jur f on a.kode_jur=f.kode_jur and a.kode_lokasi=f.kode_lokasi 
 inner join (select a.nim,a.kode_lokasi
			 from dikti_cd a
			 where a.kode_lokasi='$kode_lokasi' 
			 group by a.nim,a.kode_lokasi
			 )g on a.nim=g.nim and a.kode_lokasi=g.kode_lokasi
 left join (select a.nim,a.kode_lokasi,sum(case when a.dc='D' then nilai else -nilai end) as nilai
		 from dikti_cd a			
		 inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
		 where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' 
		 group by a.nim,a.kode_lokasi
		 )c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi
 left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
		 from dikti_cd a			
		 inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
		 where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' 
		 group by a.nim,a.kode_lokasi
		 )d on a.nim=d.nim and a.kode_lokasi=d.kode_lokasi
 left join (select a.nim,a.kode_lokasi,sum(a.nilai) as nilai
		 from dikti_cd a			
		 inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
		 where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' 
		 group by a.nim,a.kode_lokasi
		 )e on a.nim=e.nim and a.kode_lokasi=e.kode_lokasi
$this->filter 
order by a.kode_kelas,a.nim
 ";
		
		if ($jenis=="Excel")
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
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pdd mahasiswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='50'  class='header_laporan'>NIM </td>
    <td width='200'  class='header_laporan'>Nama</td>
	<td width='60'  class='header_laporan'>Kelas</td>
	<td width='60'  class='header_laporan'>Angkatan</td>
	<td width='60'  class='header_laporan'>Jurusan</td>
    <td width='90' class='header_laporan'>Saldo Awal </td>
    <td width='90' class='header_laporan'>Debet</td>
    <td  width='90' class='header_laporan'>Kredit</td>
    <td  width='90' class='header_laporan'>Saldo Akhir </td>
  </tr>
  ";
		$so_awal=0;$debet=0;$kredit=0;$so_akhir=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal+=$row->so_awal;
			$debet+=$row->debet;
			$kredit+=$row->kredit;
			$so_akhir+=$row->so_akhir;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nim','$row->kode_lokasi','$kode_pp');\">$row->nim</a>";
			echo "</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_kelas</td>
	<td class='isi_laporan'>$row->kode_akt</td>
	<td class='isi_laporan'>$row->kode_jur</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='6'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($so_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
