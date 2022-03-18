<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoCdSekolah extends server_report_basic
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$nama_file="saldo.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		
		$sql="select a.kode_pp,a.kode_lokasi,a.nama,
		isnull(c.nilai,0) as so_awal,isnull(d.nilai,0) as debet,isnull(e.nilai,0) as kredit,
		isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
 from pp a
 inner join (select a.kode_pp,a.kode_lokasi
			 from sis_cd_d a
			 where a.kode_lokasi='$kode_lokasi' 
			 group by a.kode_pp,a.kode_lokasi
			 )g on a.kode_pp=g.kode_pp and a.kode_lokasi=g.kode_lokasi 
 left join (select a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
		 from sis_cd_d a		
		 where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' 
		 group by a.kode_lokasi,a.kode_pp
		 )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
 left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
		 from sis_cd_d a			
		 where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' 
		 group by a.kode_lokasi,a.kode_pp
		 )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
 left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
		 from sis_cd_d a			
		 where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' 
		 group by a.kode_lokasi,a.kode_pp
		 )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi 
 $this->filter 
 order by a.kode_pp
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
		echo $AddOnLib->judul_laporan("saldo pdd sekolah",$this->lokasi."<br>".$nama_pp,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'>No</td>
    <td width='50'  class='header_laporan'>Kode PP </td>
    <td width='200'  class='header_laporan'>Nama</td>
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
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoSiswa('$row->kode_lokasi','$row->kode_pp');\">$row->kode_pp</a></td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='3'>Total</td>
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
  
