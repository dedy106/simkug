<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptPenilaian extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$periode=$tmp[1];		
		$sql=" select x.skor,x.kode_akun,x.kode_pp,x.kode_ip,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_ip
        from rkm_eval_d x
		  inner join masakun b on x.kode_akun=b.kode_akun and x.kode_lokasi=b.kode_lokasi
		  inner join rkm_pp c on x.kode_pp=c.kode_pp and x.kode_lokasi=c.kode_lokasi
		  inner join rkm_ip d on x.kode_ip=d.kode_ip and x.kode_lokasi=d.kode_lokasi
		$this->filter";
		

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
	<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
	<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
	<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
	<td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
	<td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode IP</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama IP </div></td>
    <td width='100' class='header_laporan'><div align='center'>Skor</div></td>
	
   </tr>";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->skor;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_ip</td>
  <td class='isi_laporan'>$row->nama_ip</td>
  <td class='isi_laporan' align='right'>".number_format($row->skor,0,',','.')."</td>

</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='7' align='right'  class='isi_laporan'>Total&nbsp;</td>
  <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>		

  
