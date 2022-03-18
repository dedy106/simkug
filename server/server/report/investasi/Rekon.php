<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_investasi_Rekon
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
             "from kkp_nego_m a inner join emiten e on a.kode_emiten=e.kode_emiten ".
								"inner join jenis_dana j on a.kode_dana=j.kode_dana ".$this->filter;
								//" and a.progress not in ".$this->filter2;
		error_log($sql);
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
	function getHtml()
	{
		
		$sql= "select a.no_kkp,e.nama+' Cabang '+e.cabang as nmbank,j.nama as nmjenis,a.nilai,convert(varchar,a.tgl_awal,103) as tglawal, ".
              "convert(varchar,a.tgl_akhir,103) as tglakhir,a.bunga,datediff(day,a.tgl_awal,a.tgl_akhir) as hari,a.basis, ".
              "round(( (a.nilai * (a.bunga / a.basis / 100 )) * datediff(day,a.tgl_awal,a.tgl_akhir)) * ((100 - a.pajak) / 100),0) as pndptn ".
              "from kkp_nego_m a inner join emiten e on a.kode_emiten=e.kode_emiten ".
								"inner join jenis_dana j on a.kode_dana=j.kode_dana ".$this->filter.
								//" and a.progress not in ".$this->filter2.
								" order by j.nama,a.tgl_akhir";
        $obj=new server_util_AddOnLib;
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$temp=$dbLib->LimitQuery($sql,$this->rows,$start);
		
		$html = "<br><br>";
		$html .="<div align='center'>
		  <table width='1300' border='0' cellspacing='0' cellpadding='0'>
		    <tr>
		      <td class='istyle18'>LAPORAN PENDAPATAN DEPOSITO</td>
		    </tr>
		    <tr>
		      <td class='istyle18'>PER ".$obj->ubah_periode($this->filter2)."</td>
		    </tr>
		    <tr>
		      <td>&nbsp;</td>
		    </tr>
		  </table>
		  <table width='1300' border='1' cellspacing='1' cellpadding='0' class='kotak'>
			<tr class='istyle18'>
		      <td width='20'><div align='center'>No</div></td>
		      <td width='116'><div align='center'>No. KKP</div></td>
		      <td width='367'><div align='center'>Nama Bank</div></td>
		      <td width='96'><div align='center'>Jenis Dana </div></td>
		      <td width='174'><div align='center'>Nominal</div></td>
		      <td width='76'><div align='center'>Start</div></td>
		      <td width='76'><div align='center'>Jatuh Tempo </div></td>
		      <td width='74'><div align='center'>Tingkat Bunga </div></td>
		      <td width='43'><div align='center'>Hari</div></td>
		      <td width='58'><div align='center'>Basis Hari/Th </div></td>
		      <td width='164'><div align='center'>Jumlah Pendapatan s.d. Jatuh Tempo</div></td>
		    </tr>";
		$i=1;	
		$totnominal=0;
		$totpndptn=0;
		while ($rs = $temp->FetchNextObject($toupper=false))
		{	
		    $html .="<tr class='style15'>
		      <td><div align='center'>".$i."</div></td>
		      <td>".$rs->no_kkp."</td>
		      <td>".$rs->nmbank."</td>
		      <td><div align='center'>".$rs->nmjenis."</div></td>
		      <td><div align='right'>".number_format($rs->nilai,0,",",".")."</div></td>
		      <td><div align='center'>".$rs->tglawal."</div></td>
		      <td><div align='center'>".$rs->tglakhir."</div></td>
		      <td><div align='center'>".number_format($rs->bunga,3,",",".")."%</div></td>
		      <td><div align='center'>".$rs->hari."</div></td>
		      <td><div align='center'>".$rs->basis."</div></td>
		      <td><div align='right'>".number_format($rs->pndptn,0,",",".")."</div></td>
		    </tr>";
			$i++;
			$totnominal+=$rs->nilai;
			$totpndptn+=$rs->pndptn;
		}
		$html .=    "<tr class='style15'>
		      <td colspan='4'>&nbsp;</td>
		      <td><div align='right'><em>".number_format($totnominal,0,",",".")."</em></div></td>
		      <td colspan='5'>&nbsp;</td>
		      <td><div align='right'>".number_format($totpndptn,0,",",".")."</div></td>
		    </tr>
		  </table>
		</div>";
		$html .= "<br>";
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
