<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_BungaDep
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
         "from jenis_dana jd inner join kkp_nego_m kn on jd.kode_dana=kn.kode_dana ".
							"inner join emiten e on kn.kode_emiten=e.kode_emiten ".
							"inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                            "left outer join bunga_d b on kn.no_kkp=b.no_kkp ".
                            "inner join bunga_m bm on b.no_bunga=bm.no_bunga and bm.no_del='-'".							
                            "left outer join( select y1.no_bunga,y1.no_kkp,y1.nilai from bayar_d y1 inner join bayar_m bm2 on bm2.no_bayar=y1.no_bayar and bm2.no_del='-') y on b.no_bunga=y.no_bunga and y.no_kkp=b.no_kkp ".$this->filter;
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
		$sql="select distinct kn.no_kkp,kn.tgl_akhir,jd.nama,kn.nilai,day(kn.tgl_awal) as tglawl,month(kn.tgl_awal) as blnawl,year(kn.tgl_awal) as thnawl,day(kn.tgl_akhir) as tglakhr,month(kn.tgl_akhir) as blnakhr,year(kn.tgl_akhir) as thnakhr,kn.bunga,b.hari,kn.basis,b.nilai as jum_bunga,y.nilai as jum_bunga_rc,(b.nilai-y.nilai) as selisih,e.nama as nmbank,e.cabang as cbg ".
         "from jenis_dana jd inner join kkp_nego_m kn on jd.kode_dana=kn.kode_dana ".
							"inner join emiten e on kn.kode_emiten=e.kode_emiten ".
							"inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                            "left outer join bunga_d b on kn.no_kkp=b.no_kkp ".
                            "inner join bunga_m bm on b.no_bunga=bm.no_bunga and bm.no_del='-'".							
                            "left outer join( select y1.no_bunga,y1.no_kkp,y1.nilai from bayar_d y1 inner join bayar_m bm2 on bm2.no_bayar=y1.no_bayar and bm2.no_del='-') y on b.no_bunga=y.no_bunga and y.no_kkp=b.no_kkp ".$this->filter.
							//" and bm.no_del='-'". 
							" order by jd.nama,kn.tgl_akhir";
          //" group by jd.kode_dana,kn.no_kkp,e.nama,e.cabang,jd.nama,kn.nilai,kn.tgl_awal,kn.tgl_akhir,kn.bunga,b.hari,kn.basis,b.nilai,y.nilai";
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$tmp=$dbLib->LimitQuery($sql,$this->rows,$start);
		//error_log($sql);
    //$i = $start + 1;
		//$sql .= " limit ". $start . "," . $this->rows;
		/*$html = "<style type='text/css'>
            <!--
            .istyle15 {font-size: 16px; font-family: Arial, Helvetica, sans-serif; }
            .istyle16 {font-size: 17px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .istyle17 {font-size: 22px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .istyle18 {font-size: 16px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            -->
            </style>";*/
    $cek="";    
	$html = "<div align='center'>";  
			$totnominal=0;
			$totjumbunga=0;
			$totbungarc=0;
			$totselisih=0;
    while ($rs = $tmp->FetchNextObject($toupper=false)){

      if ($rs->nama!=$cek){
         $i=1;     
            if ($totnominal!=0)
			{
				$html .= "<tr class='istyle18'>
			      <td colspan='4'>&nbsp;</td>
			      <td><div align='right'><em>".number_format($totnominal,0,",",".")."</em></div></td>
			      <td colspan='5'>&nbsp;</td>
			      <td><div align='right'><em>".number_format($totjumbunga,0,",",".")."</em></div></td>
			      <td><div align='right'><em>".number_format($totbungarc,0,",",".")."</em></div></td>
			      <td><div align='right'><em>(".number_format($totselisih,0,",",".").")</em></div></td>
			    </tr>";		
			}
			if ($cek!="") 	$html .= "</table>";	 
            $html .= "<br><br>";           		
                      $html .="<table width='1500' border='0' cellspacing='1' cellpadding='0'>";
                    if ($this->showFilter=="")
					{
						$html .="<tr>
                          <td colspan='12' class='istyle16'>DEPOSITO BERJANGKA DAN DEPOSITO ON CALL (DOC)</td>
                        </tr><tr>";
					}else if ($this->showFilter=="B01")
					{
						$html .="<tr>
                          <td colspan='12' class='istyle16'>DEPOSITO BERJANGKA</td>
                        </tr><tr>";
					}else if ($this->showFilter=="B02")
					{
						$html .="<tr>
                          <td colspan='12' class='istyle16'>DEPOSITO ON CALL (DOC)</td>
                        </tr><tr>";
					}else if ($this->showFilter=="B03")
					{
						$html .="<tr>
                          <td colspan='12' class='istyle16'>DEPOSITO BREAKABLE</td>
                        </tr><tr>";
					}
					
      $html .="<td colspan='12' class='istyle16'>PER ".$this->filter2."</td>
    </tr><tr><tdcolspan='12' class='istyle16'>&nbsp;</td></tr></table>
  <table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                        <tr class='istyle18'>
                          <td width='30'><div align='center'>No</div></td><td width='110'><div align='center'>No. KKP</div></td>
      <td width='350'><div align='center'>Nama Bank</div></td>
                          <td width='100'><div align='center'>Jenis Dana</div></td>
                          <td width='125'><div align='center'>Nominal</div></td>
                          <td width='80'><div align='center'>Start</div></td>
                          <td width='80'><div align='center'>Jatuh Tempo</div></td>
                          <td width='80'><div align='center'>Tingkat Bunga </div></td>
                          <td width='50'><div align='center'>Hari</div></td>
                          <td width='71'><div align='center'>Basis Hari/Th</div></td>
                          <td width='125'><div align='center'>Jumlah Bunga</div></td>
                          <td width='125'><div align='center'>Jumlah Bunga Menurut RC</div></td>
                          <td width='125'><div align='center'>Selisih</div></td>
                        </tr>";	
			
            $html .=  
                  "<tr class='istyle15'>
                    <td><div align='center'>". $i."</div></td><td>".$rs->no_kkp."</td>
                    <td>".$rs->nmbank." Cabang ".$rs->cbg."</td>
                    <td><div align='center'>". $rs->nama."</div></td>
                    <td><div align='right'>". number_format($rs->nilai,0,",",".")."</div></td>
                    <td><div align='center'>". $rs->tglawl."/".$rs->blnawl."/".$rs->thnawl."</div></td>
                    <td><div align='center'>". $rs->tglakhr."/".$rs->blnakhr."/".$rs->thnakhr."</div></td>
                    <td><div align='center'>". number_format($rs->bunga,3,",",".")."%</div></td>
                    <td><div align='center'>". $rs->hari."</div></td>
                    <td><div align='center'>". $rs->basis."</div></td>
                    <td><div align='right'>". number_format($rs->jum_bunga,0,",",".")."</div></td>
                    <td><div align='right'>". number_format($rs->jum_bunga_rc,0,",",".")."</div></td>
                    <td><div align='right'>(". number_format($rs->selisih,0,",",".").")</div></td>
                  </tr>";  
			$totnominal=$rs->nilai;
			$totjumbunga=$rs->jum_bunga;
			$totbungarc=$rs->jum_bunga_rc;
			$totselisih=$rs->selisih;
             $i++;
             $cek=$rs->nama;         
      }
	  else{
            $totnominal+=$rs->nilai;
			$totjumbunga+=$rs->jum_bunga;
			$totbungarc+=$rs->jum_bunga_rc;
			$totselisih+=$rs->selisih;
			$html .=  
                  "<tr class='istyle15'>
                    <td><div align='center'>". $i."</div></td><td>".$rs->no_kkp."</td>
                    <td>".$rs->nmbank." Cabang ".$rs->cbg."</td>
                    <td><div align='center'>". $rs->nama."</div></td>
                    <td><div align='right'>". number_format($rs->nilai,0,",",".")."</div></td>
                    <td><div align='center'>". $rs->tglawl."/".$rs->blnawl."/".$rs->thnawl."</div></td>
                    <td><div align='center'>". $rs->tglakhr."/".$rs->blnakhr."/".$rs->thnakhr."</div></td>
                    <td><div align='center'>". number_format($rs->bunga,3,",",".")."%</div></td>
                    <td><div align='center'>". $rs->hari."</div></td>
                    <td><div align='center'>". $rs->basis."</div></td>
                    <td><div align='right'>". number_format($rs->jum_bunga,0,",",".")."</div></td>
                    <td><div align='right'>". number_format($rs->jum_bunga_rc,0,",",".")."</div></td>
                    <td><div align='right'>(". number_format($rs->selisih,0,",",".").")</div></td>
                  </tr>";      
             $i++;
             $cek=$rs->nama;
      }
                 
      //$rs->MoveNext();
  				        	
    }
	$html .= "<tr class='istyle18'>
      <td colspan='4'>&nbsp;</td>
      <td><div align='right'><em>".number_format($totnominal,0,",",".")."</em></div></td>
      <td colspan='5'>&nbsp;</td>
      <td><div align='right'><em>".number_format($totjumbunga,0,",",".")."</em></div></td>
      <td><div align='right'><em>".number_format($totbungarc,0,",",".")."</em></div></td>
      <td><div align='right'><em>(".number_format($totselisih,0,",",".").")</em></div></td>
    </tr>";
    $html .= "</table></div>";     
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
