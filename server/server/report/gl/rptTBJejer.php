<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptTBJejer
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
		$sql = "select count(a.kode_lokasi),sum(a.so_awal_debet) as so_awal_debet,sum(a.so_awal_kredit) as so_awal_kredit,sum(a.debet) as debet,sum(a.kredit) as kredit,
       sum(a.so_akhir_debet) as so_akhir_debet,sum(a.so_akhir_kredit) as so_akhir_kredit
from (
select kode_lokasi,debet,kredit,case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then -so_awal else 0 end as so_awal_kredit,
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user')a group by a.kode_lokasi";
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
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6;
		
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
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0) ";
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
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,n1,n2,n3,n4,n5 from glma_jejer_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n1<>0 or n2<>0 or n3<>0 or n4<>0 or n5<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		
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
<td width='90' class='header_laporan'><div align='center'>ITT</div></td>
      <td width='90' class='header_laporan'><div align='center'>IMT</div></td>
      <td width='90' class='header_laporan'><div align='center'>LAKHAR</div></td>
      <td width='90' class='header_laporan'><div align='center'>POLTEK</div></td>
      <td width='90' class='header_laporan'><div align='center'>PDC</div></td>
<td width='110' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5;	

			$html.="<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>
</tr>";
			
			$i=$i+1;
		}
		
		$html.="</table>";
		
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
