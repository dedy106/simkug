<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptTB12 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0) ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user'";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,so_awal,n01,n02,n03,n04,n05,n06,n07,n08,n09,n10,n11,n12,total from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan neraca lajur mutasi 12 Periode",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<center><table width='1500' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan' align='center'>No</td>
      <td width='60'  class='header_laporan' align='center'>Akun</td>
      <td width='250' height='25'  class='header_laporan' align='center'>Nama</td>
	  <td width='90' class='header_laporan' align='center'>So Awal</td>
      <td width='90' class='header_laporan' align='center'>Januari</td>
      <td width='90' class='header_laporan' align='center'>Februari</td>
      <td width='90' class='header_laporan' align='center'>Maret</td>
      <td width='90' class='header_laporan' align='center'>April</td>
      <td width='90' class='header_laporan' align='center'>Mei</td>
      <td width='90' class='header_laporan' align='center'>Juni</td>
      <td width='90' class='header_laporan' align='center'>Juli</td>
      <td width='90' class='header_laporan' align='center'>Agustus</td>
      <td width='90' class='header_laporan' align='center'>September</td>
      <td width='90' class='header_laporan' align='center'>Oktober</td>
      <td width='90' class='header_laporan' align='center'>November</td>
      <td width='90' class='header_laporan' align='center'>Desember</td>
<td width='100' class='header_laporan' align='center'>Total</td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
      <td class='isi_laporan'>$i</td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n01,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n02,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n03,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n04,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n05,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n06,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n07,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n08,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n09,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n10,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n11,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n12,0,',','.')."</td>
<td class='isi_laporan'><div align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		
		echo "</table></center>";
		
		return "";
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.n01) as n1,sum(a.n02) as n2,sum(a.n03) as n3,sum(a.n04) as n4,
				sum(a.n05) as n5,sum(a.n06) as n6,sum(a.n07) as n7,sum(a.n07) as n7,sum(a.n08) as n8,sum(a.n09) as n9
				,sum(a.n10) as n10,sum(a.n11) as n11,sum(a.n12) as n12
			from (select kode_lokasi, kode_akun,nama,n01,n02,n03,n04,n05,n06,n07,n08,n09,n10,n11,n12 from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user'  and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user') a group by a.kode_lokasi";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
			$n6=$rs->fields[6];
			$n7=$rs->fields[7];
			$n8=$rs->fields[8];
			$n9=$rs->fields[9];
			$n10=$rs->fields[10];
			$n11=$rs->fields[11];
			$n12=$rs->fields[12];
		}
		$result=array($totPage,$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12);		
		return $result;
	}
	
	
}
?>
