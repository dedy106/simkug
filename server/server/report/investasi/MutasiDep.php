<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_MutasiDep
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
		//$filter 2 = periode		
		$sql="select count(*) ".
         "from (". $this->getSQL($this->filter2).$this->filter .") a ";
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
		$sql= $this->getSQL($this->filter2) .$this->filter;
		
    	$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$tmp=$dbLib->LimitQuery($sql,$this->rows,$start);
		$i = $start + 1;
		/*$html = "<style type='text/css'>
            <!--
            .style15 {font-size: 13px; font-family: Arial, Helvetica, sans-serif; }
            .style16 {font-size: 14px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .style17 {font-size: 20px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .style18 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .style19 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;color: #FFFFFF; font-style: italic; }
            -->
            </style>";*/		 
			
    $html = "<br><br><br>";    
    $html .= 
          "
            <table width='1000' border='0' cellspacing='2' cellpadding='0'>
              <tr class='istyle17' align='center'>
                <td>Mutasi Deposito Yakes Telkom</td>
              </tr>
              <tr class='istyle16' align='center'>
                <td>".$this->showFilter."</td>
              </tr><tr class='istyle16' align='center'>
                <td>Posisi : Periode ".$this->filter2."</td>
              </tr><br><br>
            </table>
            <table width='1000' border='1' cellspacing='0' cellpadding='0'>              
              <tr class='istyle18' align='center'>
                <td width='28'>No</td>
                <td width='186'>Nama Bank  </td>
                <td width='52'>Cabang </td>
                <td width='97'>Jenis Deposito</td>
                <td width='150'>Saldo Awal</td>
                <td width='150'>Tambah</td>
                <td width='150'>Kurang</td>
                <td width='150'>Saldo Akhir</td>
              </tr>
              <tr class='istyle18' align='center'>
                <td><em>1</em></td>
                <td><em>2</em></td>
                <td><em>3</em></td>
                <td><em>4</em></td>
                <td><em>5</em></td>
                <td><em>6</em></td>
                <td><em>7</em></td>
                <td><em>8=5+6-7</em></td>
              </tr>";
        $sawal = $debet = $kredit = $sakhir = 0;
        while ($rs = $tmp->FetchNextObject($toupper=false))
		    {
            $html .=      
              "<tr class='istyle15'>
                <td>". $i."</td>
                <td><div align='left'>". $rs->nama."</td>
                <td>". $rs->cabang."</td>
                <td>". $rs->nmbentuk."</td>
                <td><div align='right'>". number_format($rs->sawal,0,",",".")."</td>
                <td><div align='right'>". number_format($rs->debet,0,",",".")."</td>
                <td><div align='right'>". number_format($rs->kredit,0,",",".")."</td>
                <td><div align='right'>". number_format($rs->sakhir,0,",",".")."</td>
              </tr>";
              $i++;
			  $sawal += $rs->sawal;
			  $debet += $rs->debet;
			  $kredit += $rs->kredit;
			  $sakhir += $rs->sakhir;
            //$rs->MoveNext();
        }
		$html .= "<tr class='istyle15'>
                <td></td>
                <td><div align='left'></td>
                <td></td>
                <td></td>
                <td><div align='right'>". number_format($sawal,0,",",".")."</td>
                <td><div align='right'>". number_format($debet,0,",",".")."</td>
                <td><div align='right'>". number_format($kredit,0,",",".")."</td>
                <td><div align='right'>". number_format($sakhir,0,",",".")."</td>
              </tr>";
        $html .= "</table>";     
          
                 
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
	function getNilaiSblm($filter2){
		return "select a.kode_bentuk, a.kode_emiten, sum(a.nilai) as n from ".
		"(select a.kode_bentuk,a.kode_emiten,a.nilai from kkp_nego_m a where a.periode_final < '". $filter2 ."' ".
		"union all select a.kode_bentuk, a.kode_emiten, a.nilai as n from kkp_nego_m a  " .
			"inner join cair_m b on b.no_kkp = a.no_kkp " .
			"where b.periode < '". $filter2."' and b.no_cair like 'R%') a " . 
		 	" group by kode_bentuk, kode_emiten ";
	}
	function getCairSblm($filter2){
		return "select a.kode_bentuk, a.kode_emiten, sum(a.nilai) as n from kkp_nego_m a " . 
			"inner join cair_m b on b.no_kkp = a.no_kkp and b.no_cair not like 'R%' " .
			"where b.periode < '". $filter2."' group by kode_bentuk, kode_emiten  ";
	}
	function getNilai($filter2){
		return "select a.kode_bentuk, a.kode_emiten, sum(a.nilai) as n from ".
		"(select a.kode_bentuk,a.kode_emiten,a.nilai from kkp_nego_m a where a.periode_final = '". $filter2 ."' ".
		"union all select a.kode_bentuk, a.kode_emiten, a.nilai as n from kkp_nego_m a  " .
			"inner join cair_m b on b.no_kkp = a.no_kkp " .
			"where b.periode = '". $filter2."' and b.no_cair like 'R%') a " .
			" group by kode_bentuk, kode_emiten ";
	}
	function getCair($filter2){
		return "select a.kode_bentuk, a.kode_emiten, sum(a.nilai) as n from kkp_nego_m a  " .
			"inner join cair_m b on b.no_kkp = a.no_kkp and b.no_cair not like 'R%' " .
			"where b.periode = '". $filter2."' group by kode_bentuk, kode_emiten  ";
	}
	function getSQL($filter2){
		return "select a.kode_emiten, a.nama, a.cabang,c.nama as nmBentuk " .
				", isnull(b.n,0) - isnull(f.n,0) as sawal " .
				", isnull(e.n,0) as debet " .
				", isnull(d.n,0) as kredit " .
				", isnull(b.n,0) - isnull(f.n,0) + isnull(e.n,0) - isnull(d.n,0)as sakhir " .
				"from emiten a  " .
				"cross join kkp_bentuk c  " .
				"left outer join (". $this->getNilaiSblm($filter2).")b on b.kode_emiten = a.kode_emiten and b.kode_bentuk = c.kode_bentuk  " .
				"left outer join (". $this->getNilai($filter2).")e on e.kode_emiten = a.kode_emiten and e.kode_bentuk = c.kode_bentuk  " . 
				"left outer join (". $this->getCair($filter2).")d on d.kode_emiten = a.kode_emiten and d.kode_bentuk = c.kode_bentuk " . 
				"left outer join (". $this->getCairSblm($filter2).")f on f.kode_emiten = a.kode_emiten and f.kode_bentuk = c.kode_bentuk ";
			
	
	}	
	//spb0805531
	
}
?>
