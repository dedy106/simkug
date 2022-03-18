<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptTBJejer2
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.dn1) as n1,sum(a.dn2) as n2,sum(a.dn3) as n3,sum(a.dn4) as n4,
		sum(a.dn5) as n5,sum(a.dn6) as n6,sum(a.dn7) as n7,sum(a.dn8) as n8 
from (
select kode_lokasi,
case when n1>0 then n1 else 0 end as dn1,case when n1<0 then -n1 else 0 end as cn1,
case when n2>0 then n2 else 0 end as dn2,case when n2<0 then -n2 else 0 end as cn2,
case when n3>0 then n3 else 0 end as dn3,case when n3<0 then -n3 else 0 end as cn3,
case when n4>0 then n4 else 0 end as dn4,case when n4<0 then -n4 else 0 end as cn4,
case when n5>0 then n5 else 0 end as dn5,case when n5<0 then -n5 else 0 end as cn5,
case when n6>0 then n6 else 0 end as dn6,case when n6<0 then -n6 else 0 end as cn6,
case when n7>0 then n7 else 0 end as dn7,case when n7<0 then -n7 else 0 end as cn7,
case when n8>0 then n8 else 0 end as dn8,case when n8<0 then -n8 else 0 end as cn8
from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user')a group by a.kode_lokasi";
		}
		error_log($sql);
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
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6."/".$n7."/".$n8;
		
		return $result;
	}
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0) ";
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
		$sql = "select kode_akun,nama,n1,n2,n3,n4,n5,n6,n7,n8 from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0 or n6<>0 or n7<>0 or n8<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan trial balance jejer",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table  border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan'><div align='center'>No</div></td>
      <td width='40'  class='header_laporan'><div align='center'>Akun</div></td>
      <td width='250' height='25'  class='header_laporan'><div align='center'>Nama</div></td>
<td width='90' class='header_laporan'><div align='center'>PUSAT</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 1</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 2</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 3</div></td>
      <td width='90' class='header_laporan'><div align='center'>AREA 4</div></td>
	  <td width='90' class='header_laporan'><div align='center'>AREA 5</div></td>
	  <td width='90' class='header_laporan'><div align='center'>AREA 6</div></td>
	  <td width='90' class='header_laporan'><div align='center'>AREA 7</div></td>
<td width='110' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8;	

			$html.="<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n6,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n7,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>
</tr>";
			
			$i=$i+1;
		}
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		$n3=$tmp[3];
		$n4=$tmp[4];
		$n5=$tmp[5];
		$n6=$tmp[6];
		$n7=$tmp[7];
		$n8=$tmp[8];
		if ($this->page==$max)
		{
		$total=$n1+$n2+$n3+$n4+$n5+$n6+$n7+$n8;	
		$html.="<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($n2),0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($n6),0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format(abs($n7),0,',','.')."</td>
	<td class='sum_laporan' align='right'>".number_format(abs($n8),0,',','.')."</td>
	<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>

</tr>";
		}
		$html.="</table>";
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
