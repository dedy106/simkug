<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptRefju
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql =  "select count(distinct r.no_refju) ".
				"from refju_m r inner join refju_j j on r.no_refju=j.no_refju ".
                "inner join lokasi l on r.kode_lokasi=l.kode_lokasi ".
                "inner join masakun m on j.kode_akun=m.kode_akun and j.kode_lokasi=m.kode_lokasi ".$this->filter;
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
		$sql0 = "select distinct r.no_refju ".
				"from refju_m r inner join refju_j j on r.no_refju=j.no_refju ".
				"inner join lokasi l on r.kode_lokasi=l.kode_lokasi ".
                "inner join masakun m on j.kode_akun=m.kode_akun and j.kode_lokasi=m.kode_lokasi ".$this->filter;
		$start = (($this->page-1) * $this->rows);
	    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		//error_log($sql0);
		while (!$page->EOF)
		{
			$sql =  "select r.no_refju,l.kode_lokasi,l.nama as nmlokasi,date_format(r.tgl_awal,'%d/%m/%Y') as tglawal,date_format(r.tgl_akhir,'%d/%m/%Y') as tglakhir,r.nilai as nominal,r.keterangan,j.kode_akun,m.nama as nmakun,j.kode_pp,j.kode_drk,j.dc,j.keterangan as ket,j.nilai as nilai ".
					"from refju_m r inner join refju_j j on r.no_refju=j.no_refju ".
	                "inner join lokasi l on r.kode_lokasi=l.kode_lokasi ".
	                "inner join masakun m on j.kode_akun=m.kode_akun and j.kode_lokasi=m.kode_lokasi ".$this->filter.
					" and r.no_refju='".$page->fields[0]."' order by r.no_refju,j.kode_akun";
					
			$tmp=$dbLib->execute($sql);	
			$tmp2=$dbLib->execute($sql);	
			//error_log($sql);
			$AddOnLib=new server_util_AddOnLib();
			$i=1;
			$rs = $tmp->FetchNextObject($toupper=false);
			
			$html = "<br><br><br><div align='center'>";
			$html .="<table width='800' border='0' cellspacing='0' cellpadding='0'><tr><td>";
			$html .=
					"<table width='372' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='372' class='lokasi_laporan'>TRANSAKSI JURNAL UMUM </td>
					  </tr>
					</table>
					<br>
					<table width='600' border='1' cellpadding='0' cellspacing='0' class='kotak'>
					  <tr>
						<td width='600' ><table width='639' border='0' cellspacing='4' cellpadding='0'>
						  <tr class='isi_laporan'>
							<td width='166' bgcolor='CCCCCC'>No. Reference </td>
							<td width='438' bgcolor='CCCCCC'>".$rs->no_refju."</td>
						  </tr>
						  <tr class='isi_laporan'>
							<td>Lokasi/Cabang</td>
							<td>".$rs->kode_lokasi." ".$rs->nmlokasi."</td>
						  </tr>
						  <tr class='isi_laporan'>
							<td>Tanggal Awal </td>
							<td>".$rs->tglawal."</td>
						  </tr>
						  <tr class='isi_laporan'>
							<td>Tanggal Akhir</td>
							<td>".$rs->tglakhir."</td>
						  </tr>
						  <tr class='isi_laporan'>
							<td>Nominal</td>
							<td>".number_format($rs->nominal,0,",",".")."</td>
						  </tr>
						  <tr class='isi_laporan'>
							<td>Keterangan</td>
							<td>".$rs->keterangan."</td>
						  </tr>
						</table></td>
					  </tr>
					</table>
					<br>
					<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr align='center' bgcolor='#CCCCCC' class='header_laporan'>
						<td width='30'>No</td>
						<td width='60'>Kode</td>
						<td width='200'>Nama</td>
						<td width='73'>PP/Proyek</td>
						<td width='59'>DRK</td>
						<td width='31'>DC</td>
						<td width='207'>Keterangan</td>
						<td width='120'>Nilai</td>
					  </tr>";
			while ($rs1 = $tmp2->FetchNextObject($toupper=false))
			{		  
				$html.="<tr  class='isi_laporan'>
						<td align='center'>".$i."</td>
						<td>".$rs1->kode_akun."</td>
						<td>".$rs1->nmakun."</td>
						<td align='center'>".$rs1->kode_pp."</td>
						<td align='center'>".$rs1->kode_drk."</td>
						<td align='center'>".$rs1->dc."</td>
						<td>".$rs1->ket."</td>
						<td align='right'>".number_format($rs1->nilai,0,",",".")."</td>
					  </tr>";
				$i++;
			}		  
			$html .="</table></td></tr></table></div><br>";							
			$page->MoveNext();
		}
		
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
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
