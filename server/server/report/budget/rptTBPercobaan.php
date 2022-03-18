<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_budget_rptTBPercobaan
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
		//error_log($sql);
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
		$sql = "select count(kode_akun) as jum from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		 $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0)  ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' ";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		
		return $totPage;
	}
	
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select * from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan neraca percobaan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<center><table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='70' rowspan='2' class='header_laporan'><div align='center'>Kode</div></td>
    <td width='250' rowspan='2' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td width='30' rowspan='2' class='header_laporan'><div align='center'>Lok</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Saldo Awal </div>
    <div align='center'></div>      </td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Mutasi</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Saldo Akhir </div>
    <div align='center'></div>      </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$so_awal=0;
		$debet=0;
		$kredit=0;
		$so_akhir=0;
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=$so_awal+$row->so_awal;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir=$so_akhir + $row->so_akhir;
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			$html.="<tr>
    <td class='isi_laporan'>
      <div align='center'>$i</div></td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_lokasi</td>
    <td class='isi_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->debet,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->kredit,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->so_akhir,0,',','.')."</div></td>
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
		if ($this->page==$max)
		{
		$html.="<tr>
    <td height='20' colspan='4' class='sum_laporan'><div align='right'>Total Debet </div></td>
    <td class='sum_laporan'><div align='right'>".number_format($n1,0,',','.')."</div></td>
    <td rowspan='2' valign='top' class='sum_laporan'><div align='right'>".number_format($n3,0,',','.')."</div></td>
    <td rowspan='2' valign='top' class='sum_laporan'><div align='right'>".number_format($n4,0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right'>".number_format($n5,0,',','.')."</div></td>
  </tr>
  <tr>
    <td height='20' colspan='4' class='sum_laporan'><div align='right'>Total Kredit </div></td>
    <td class='sum_laporan'><div align='right'>".number_format(abs($n2),0,',','.')."</div></td>
    <td class='sum_laporan'><div align='right' >".number_format(abs($n6),0,',','.')."</div></td>
  </tr>";
		}
		
		$html.="</table></center>";
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
