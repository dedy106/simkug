<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_investasi_PndptnDep
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
		//$sql = "select count(*) from glma a ".
		//		" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		$sql="select count(*) ".
             "from bunga_d bd inner join kkp_nego_m kn on bd.no_kkp=kn.no_kkp ".
			 "inner join bunga_m bm on bd.no_bunga=bm.no_bunga and bm.no_del='-' ".
			 "inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk and kb.kode_bentuk='B01' ".$this->filter;
								//" and a.progress not in ".$this->filter2;
		
		global $dbLib;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		return $totPage;
	}
	
	function getAkruPendapatan($bentuk,$tipe,$filter)
	{
		$sql = "select sum(bd.nilai) as nilai ".
				"from bunga_d bd inner join kkp_nego_m kn on bd.no_kkp=kn.no_kkp ".
				"inner join bunga_m bm on bd.no_bunga=bm.no_bunga and bm.no_del='-' ".
				"inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk and kb.kode_bentuk='".$bentuk."' ";
				if ($tipe==1)
				{	
					$sql .= "where kn.periode=cast((cast('".$filter."' as float)-cast('1' as float)) as varchar) ";
				}elseif ($tipe==2)
				{
					$sql .= "where kn.periode='".$filter."' ";
				}
		return $sql;
	}
	function getKas($bentuk,$filter)
	{
		return "select sum(yd.nilai) as nilai ".
				"from bayar_m ym inner join bayar_d yd on ym.no_bayar=yd.no_bayar and ym.no_del='-' ".
				"inner join kkp_nego_m kn on yd.no_kkp=kn.no_kkp ".
				"inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk and kb.kode_bentuk='".$bentuk."' ".
				"where kn.periode='".$filter."' ";
	}
	
	function getHtml()
	{		
		$sql1=$this->getAkruPendapatan('B01',1,$this->filter2);
		$sql2=$this->getAkruPendapatan('B02',1,$this->filter2);
		$sql3=$this->getAkruPendapatan('B01',2,$this->filter2);
		$sql4=$this->getAkruPendapatan('B02',2,$this->filter2);
		$sql5=$this->getKas('B01',$this->filter2);
		$sql6=$this->getKas('B02',$this->filter2);		        

		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$tmp1=$dbLib->LimitQuery($sql1,$this->rows,$start);
		$tmp2=$dbLib->LimitQuery($sql2,$this->rows,$start);
		$tmp3=$dbLib->LimitQuery($sql3,$this->rows,$start);
		$tmp4=$dbLib->LimitQuery($sql4,$this->rows,$start);
		$tmp5=$dbLib->LimitQuery($sql5,$this->rows,$start);
		$tmp6=$dbLib->LimitQuery($sql6,$this->rows,$start);
		$rs1 = $tmp1->FetchNextObject($toupper=false);
		$rs2 = $tmp2->FetchNextObject($toupper=false);
		$rs3 = $tmp3->FetchNextObject($toupper=false);
		$rs4 = $tmp4->FetchNextObject($toupper=false);
		$rs5 = $tmp5->FetchNextObject($toupper=false);
		$rs6 = $tmp6->FetchNextObject($toupper=false);
		
		
		$obj=new server_util_AddOnLib; 
		
		$html = "<br><br>";
		$html .=
				"<div align='center'>
				  <table width='900' border='0' cellspacing='1' cellpadding='1'>
				    <tr class='istyle18'>
				      <td>LAPORAN PENDAPATAN DEPOSITO </td>
				    </tr>
				    <tr class='istyle18'>
				      <td>BULAN : ".strtoupper($obj->ubah_periode($this->filter2))."</td>
				    </tr>
				  </table>
				  <table width='900' border='1' cellspacing='1' cellpadding='1' class='kotak'>
				    <tr align='center' class='istyle18'>
				      <td width='38' rowspan='2'>No</td>
				      <td width='90' rowspan='2'>Uraian</td>
				      <td colspan='3'>Pendapatan</td>
				      <td width='146' rowspan='2'>Jumlah</td>
				      <td width='150' rowspan='2'>Keterangan</td>
				    </tr>
				    <tr align='center' class='istyle18'>
				      <td width='146'>S/D ".substr($obj->ubah_periode($this->filter2-1),0,3)." </td>
				      <td width='146'>Kas ".substr($obj->ubah_periode($this->filter2),0,3)." </td>
				      <td width='146'>Akru ".substr($obj->ubah_periode($this->filter2),0,3)." </td>
				    </tr>
				    <tr align='center' class='istyle18'>
				      <td>1</td>
				      <td>2</td>
				      <td>3</td>
				      <td>4</td>
				      <td>5</td>
				      <td>6</td>
				      <td>7</td>
				    </tr>
				    <tr class='istyle15'>
				      <td align='center'>1.</td>
				      <td>Deposito</td>
				      <td align='right'>".number_format($rs1->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs5->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs3->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs1->nilai+$rs3->nilai,0,",",".")."</td>
				      <td>&nbsp;</td>
				    </tr>
				    <tr class='istyle15'>
				      <td align='center'>2.</td>
				      <td>DOC</td>
				      <td align='right'>".number_format($rs2->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs6->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs4->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs2->nilai+$rs4->nilai,0,",",".")."</td>
				      <td>&nbsp;</td>
				    </tr>
				    <tr class='istyle15'>
				      <td colspan='2'>&nbsp;</td>
				      <td align='right'>".number_format($rs1->nilai+$rs2->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs5->nilai+$rs6->nilai,0,",",".")."</td>
				      <td align='right'>".number_format($rs3->nilai+$rs4->nilai,0,",",".")."</td>
				      <td align='right' bgcolor='#EBEBEB'>".number_format($rs1->nilai+$rs2->nilai+$rs3->nilai+$rs4->nilai,0,",",".")."</td>
				      <td>&nbsp;</td>
				    </tr>
				  </table>
				  <table width='900' border='0' cellspacing='1' cellpadding='1'>
				    <tr>
				      <td>&nbsp;</td>
				    </tr>
				    <tr class='istyle15'>
				      <td><u>Keterangan</u></td>
				    </tr>
				    <tr class='istyle15'>
				      <td>a) kolom 3 diambil dari laporan pendapatan bulan lalu, </td>
				    </tr>
				    <tr class='istyle15'>
				      <td>b) kolom 4 diambil dari laporan pendapatan kas bulan ".substr($obj->ubah_periode($this->filter2),0,strlen($obj->ubah_periode($this->filter2))-5).", </td>
				    </tr>
				    <tr class='istyle15'>
				      <td>c) kolom 5 diambil dari laporan pendapatan yang harus diterima. </td>
				    </tr>
				  </table>
				</div>";

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
//		ob_end_clean();
//		error_log("server/tmp/$name");
//		return "server/tmp/$name";
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=produk.xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
	}
	function createCSV()
	{
		$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";
		global $dbLib;
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
