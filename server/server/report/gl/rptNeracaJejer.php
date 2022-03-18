<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptNeracaJejer
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
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
		
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
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1,n2,n3,n4,n5,level_spasi from neraca_tmp where modul='A' and nik_user='$nik_user'  order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan neraca jejer",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<center><table  border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='300' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
<td width='90' class='header_laporan'><div align='center'>ITT</div></td>
      <td width='90' class='header_laporan'><div align='center'>IMT</div></td>
      <td width='90' class='header_laporan'><div align='center'>LAKHAR</div></td>
      <td width='90' class='header_laporan'><div align='center'>NTC</div></td>
      <td width='90' class='header_laporan'><div align='center'>POLTEK</div></td>
<td width='110' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5;	

			$html.="<tr>
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>
</tr>";
			
			$i=$i+1;
		}
		$html.="<tr><td height='25' colspan='7' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1,n2,n3,n4,n5,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user'  order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5;	

			$html.="<tr>
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>
</tr>";
			
			$i=$i+1;
		}
		$html.="</table></center>";
		
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
