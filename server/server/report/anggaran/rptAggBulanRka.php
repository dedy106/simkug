<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptAggBulanRka
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(kode_akun) as jum from glma_drk_tmp where nik_user='$nik_user' ".$this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(kode_akun) as jum,sum(n1) as n1,sum(n2) as n2,sum(n3) as n3,sum(n4) as n4,sum(n5) as n5,sum(n6) as n6,sum(n7) as n7,sum(n8) as n8,sum(n9) as n9,sum(n10) as n10,sum(n11) as n11,sum(n12) as n12,sum(n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12) as n13 from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun,kode_pp,kode_drk ";
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
			$n9=$rs->fields[9];
			$n10=$rs->fields[10];
			$n11=$rs->fields[11];
			$n12=$rs->fields[12];
			$n13=$rs->fields[13];
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6."/".$n7."/".$n8."/".$n9."/".$n10."/".$n11."/".$n12."/".$n13;
		error_log($result);
		return $result;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];

		$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Daftar Rencana Kerja & Anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table width='1920' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode Dept</div></td>
<td width='135' class='header_laporan'><div align='center'>Nama Dept</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama RKM </div></td>
    <td width='90' class='header_laporan'><div align='center'>Januari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Februari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Maret</div></td>
    <td width='90' class='header_laporan'><div align='center'>April</div></td>
<td width='90' class='header_laporan'><div align='center'>Mei</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juni</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juli</div></td>
    <td width='90' class='header_laporan'><div align='center'>Agustus</div></td>
<td width='90' class='header_laporan'><div align='center'>September</div></td>
    <td width='90' class='header_laporan'><div align='center'>Oktober</div></td>
    <td width='90' class='header_laporan'><div align='center'>November</div></td>
    <td width='90' class='header_laporan'><div align='center'>Desember</div></td>


    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		$i=$start+1;
		$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10+$row->n11+$row->n12;
			$html.="<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
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
		$n9=$tmp[9];
		$n10=$tmp[10];
		$n11=$tmp[11];
		$n12=$tmp[12];
		$n13=$tmp[13];
		if ($this->page==$max)
		{
		
		$html.="<tr>
    <td height='23' colspan='7' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n13,0,',','.')."</td>
  </tr>";
		}
		$html.="</table>";
		$html = str_replace(chr(9),"",$html);
		return $html;
		
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

