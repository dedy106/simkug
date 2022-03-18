<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptAggPakai
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
		error_log($sql);
		
		return $totPage;
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(kode_akun) as jum,sum(n1) as n1,sum(n2) as n2,sum(n3) as n3,sum(n4) as n4,sum(n5) as n5 from glma_drk_tmp where nik_user='$nik_user' ".$this->filter;
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
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5;
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
		$html=$AddOnLib->judul_laporan("laporan pemakaian anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='27' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='69' rowspan='2'  class='header_laporan'>
    <div align='center'>Kode</div></td>
    <td width='190' rowspan='2' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='74' rowspan='2' class='header_laporan'><div align='center'>Kode  </div></td>
    <td width='150' rowspan='2' class='header_laporan'><div align='center'>Nama Sub PP </div></td>
    <td width='40' rowspan='2' class='header_laporan'><div align='center'>DRK</div></td>
	<td width='150' rowspan='2' class='header_laporan'><div align='center'>Nama DRK</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target / Tahun </div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target  S.D Bulan Berjalan </div></td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='right' class='header_laporan'>
      <div align='center'>Sisa Anggaran </div>
    </div></td>
  </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan'><div align='center'>Bulan Berjalan </div></td>
    <td width='90' class='header_laporan'><div align='center'>S.D Bulan Berjalan </div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$sisa=$sisa+($row->n1-$row->n5);
			$html.="<tr><td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->kode_drk</td>
	<td class='isi_laporan'>$row->nama_drk</td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right' >".number_format($row->n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
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
		if ($this->page==$max)
		{
		$html.="<tr>
    <td height='20' colspan='7' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n1,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n2,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n4,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n5,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($sisa,0,',','.')."</span></div></td>
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

