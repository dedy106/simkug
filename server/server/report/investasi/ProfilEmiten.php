<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_ProfilEmiten
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
         "from emiten e left join kkp_nego_m k on e.kode_emiten=k.kode_emiten ".
                       "inner join bank b on e.kode_bank=b.kode_bank ".$this->filter;
         //" group by e.nama,b.status_bank,b.predikat,b.modal,b.max_deposito";
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
		/*$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";*/
		$sql="select e.nama,e.status_bank,b.predikat,b.modal,(b.max_deposito/100)*b.modal as pnmptn_dep,sum(k.nilai) as saldo,(((b.max_deposito/100)*b.modal)-sum(k.nilai)) as alokasi,b.max_deposito,convert(varchar,getdate(),103) as tgl_ctk ".
         "from emiten e left outer join kkp_nego_m k on e.kode_emiten=k.kode_emiten and k.progress not in ('5','6') ".$this->filter2.
                       " inner join bank b on e.kode_bank=b.kode_bank ".$this->filter.
         " group by e.nama,e.status_bank,b.predikat,b.modal,b.max_deposito";
    	$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$wkt=$dbLib->LimitQuery($sql,$this->rows,$start);
		$tmp=$dbLib->LimitQuery($sql,$this->rows,$start);
		$dt = $wkt->FetchNextObject($toupper=false);
    $i = $start + 1;
	error_log($sql);	  
    $html = "<br><br><br>";    
    $html .= 
          "<div align='center'>
            <table width='1100' border='0' cellspacing='2' cellpadding='0'>
              <tr class='istyle16'>
                <td><div align='center'>PROFILE CABANG/EMITEN</div></td>
              </tr>
              <tr class='istyle18'>
                <td><div align='center'>".$this->showFilter."</div></td>
              </tr><tr class='istyle18'>
      <td align='center'>Tanggal Cetak : ".$dt->tgl_ctk."</td>
    </tr>
            </table>
            <table width='1100' border='1' cellspacing='0' cellpadding='0' class='kotak'>
              
              <tr class='istyle18'>
                <td width='28'><div align='center'>No</div></td>
                <td width='190'><div align='center'>Nama Bank  </div></td>
                <td width='52'><div align='center'>Status Bank </div></td>
                <td width='100'><div align='center'>Predikat Bank </div></td>
                <td width='150'><div align='center'>Modal Sendiri (Rp) </div></td><td width='71'><div align='center'>Maks. Deposito (%)</div></td>
                <td width='150'><div align='center'>Maks. Penempatan Deposito (Rp)</div></td>
                <td width='150'><div align='center'>Saldo Deposito Eksisting YAKES-TELKOM di Bank ybt. (Rp) </div></td>
                <td width='150'><div align='center'>Alokasi Maks. Penambahan Deposito YAKES-TELKOM (Rp) </div>        </td>
              </tr>
              <tr class='istyle18'>
                <td><div align='center'><em>1</em></div></td>
                <td><div align='center'><em>2</em></div></td>
                <td><div align='center'><em>3</em></div></td>
                <td><div align='center'><em>4</em></div></td>
                <td><div align='center'><em>5</em></div></td><td><div align='center'><em>6</em></div></td>
                <td><div align='center'><em>7=5x6</em></div></td>
                <td><div align='center'><em>8</em></div></td>
                <td><div align='center'><em>9=7-8</em></div></td>
              </tr>";
        $saldo=0;
		$alokasi=0;
		
        while ($rs = $tmp->FetchNextObject($toupper=false))
		    {
            $html .=      
              "<tr class='istyle15' >
                <td><div align='center'>". $i."</div></td>
                <td><div align='left'>". $rs->nama."</div></td>
                <td><div align='center'>". $rs->status_bank."</div></td>
                <td><div align='center'>". $rs->predikat."</div></td>
                <td><div align='right'>". number_format($rs->modal,0,",",".")."</div></td><td><div align='center'>". number_format($rs->max_deposito,0,",",".")."</div></td>
                <td><div align='right'>". number_format($rs->pnmptn_dep,0,",",".")."</div></td>
                <td><div align='right'>". number_format($rs->saldo,0,",",".")."</div></td>
                <td><div align='right'>". number_format($rs->alokasi,0,",",".")."</div></td>
              </tr>";
              $i++;
			  $saldo+=$rs->saldo;
		      $alokasi+=$rs->alokasi;
            //$rs->MoveNext();
        }
        $html .= "<tr class='istyle18'>
      <td colspan='7'></td>
      <td><div align='right'>".number_format($saldo,0,",",".")."</div></td>
      <td><div align='right'>".number_format($alokasi,0,",",".")."</div></td>
    </tr></table></div>";     
          
                 
		$html .= "<br>";
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
