<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_DftrInves
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
         "from kkp_nego_m kn inner join jenis_dana jd on kn.kode_dana=jd.kode_dana ".
                            "inner join emiten e on kn.kode_emiten=e.kode_emiten ".
                            "left outer join bunga_d bd on kn.no_kkp=bd.no_kkp ".
                            "left outer join bunga_m bm on bm.no_bunga=bd.no_bunga ".$this->filter." and bm.no_del='-'";
         
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
		$sql="select jd.nama as namajd,e.nama as namae,kn.nilai,day(kn.tgl_awal) as tglawl,month(kn.tgl_awal) as blnawl,year(kn.tgl_awal) as thnawl,day(kn.tgl_akhir) as tglakhr,month(kn.tgl_akhir) as blnakhr,year(kn.tgl_akhir) as thnakhr,kn.bunga, ".
         "day(bm.tanggal) as tgl,month(bm.tanggal) as bln,year(bm.tanggal) as thn,isnull(bd.hari,0) as jumhari,kn.basis,e.cabang,day(bd.tanggal) as tglakru,month(bd.tanggal) as blnakru,year(bd.tanggal) as thnakru ".
         "from kkp_nego_m kn inner join jenis_dana jd on kn.kode_dana=jd.kode_dana ".
                            "inner join emiten e on kn.kode_emiten=e.kode_emiten ".
                            //"inner join bank b on e.kode_bank=b.kode_bank ".
                            "left outer join bunga_d bd on kn.no_kkp=bd.no_kkp ".
                            "left outer join bunga_m bm on bm.no_bunga=bd.no_bunga ".$this->filter.
							" and bm.no_del='-' order by jd.nama,e.nama,e.cabang";
		 
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$tmp=$dbLib->LimitQuery($sql,$this->rows,$start);
        $i = $start + 1;
		$tmp2="select convert(varchar,tanggal,103) from bunga_m where no_bunga='".$this->filter2."' ";
		$fltr2=$dbLib->LimitQuery($tmp2,1,0);
		//$sql .= " limit ". $start . "," . $this->rows;
		/*$html = "<style type='text/css'>
            <!--
            .istyle15 {font-size: 13px; font-family: Arial, Helvetica, sans-serif; }
            .istyle16 {font-size: 14px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .istyle17 {font-size: 20px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .istyle18 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
            .istyle19 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif;color: #FFFFFF; font-style: italic; }
            -->
            </style>";*/
   
    $html = "<br><br><br>";
    $html .=
            "<div align='center'>
              <table width='1500' border='0' cellspacing='1' cellpadding='0'>
                <tr class='istyle18'>
                  <td>DAFTAR AKRU YAKES-TELKOM </td>
                </tr>
                <tr class='istyle18'>
                  <td>JENIS INVESTASI : DEPOSITO</td>
                </tr><tr class='istyle18'>
      <td>PER ".$fltr2->fields[0]."</td>
    </tr>
                <tr class='istyle18'>
                  <td><div align='right'>PENDAPATAN YANG MASIH HARUS DITERIMA</div></td>
                </tr>
              </table>
              <table width='1500' border='1' cellpadding='1' cellspacing='0' class='kotak'>
                <tr class='istyle18'>
                  <td width='44' rowspan='3'><div a?+Align='center'>No</div></td>
                  <td width='436' rowspan='3'><div align='center'>Nama Obligasi </div></td>
                  <td width='118' rowspan='3'><div align='center'>Nominal</div></td>
                  <td width='77' rowspan='3'><div align='center'>Tgl Mulai </div></td>
                  <td width='77' rowspan='3'><div align='center'>Tgl Jatuh Tempo </div></td>
                  <td width='63' rowspan='3'><div align='center'>Bunga</div></td>
                  <td colspan='7'><div align='center'>".namaBulan($tmp->fields[4])." ".$tmp->fields[5]." </div></td>
                </tr>
                <tr class='istyle18'>
                  <td colspan='7'><div align='center'>Pendapatan yang Masih Harus Diterima </div></td>
                </tr>
                <tr class='istyle18'>
                  <td width='77'><div align='center'>Mulai Tanggal </div></td>
                  <td width='77'><div align='center'>s.d. Tanggal </div></td>
                  <td width='52'><div align='center'>Jumlah Hari </div></td>
                  <td width='61'><div align='center'>Hari Pembagi </div></td>
                  <td width='122'><div align='center'>Bunga/Kupon (Gross)</div></td>
                  <td width='121'><div align='center'>Pajak Bunga/Kupon </div></td>
                  <td width='121'><div align='center'>Bunga/Kupon (Net)</div></td>
                </tr>
                <tr class='istyle18'>
                  <td><div align='center'><em>1</em></div></td>
                  <td><div align='center'><em>2</em></div></td>
                  <td><div align='center'><em>5</em></div></td>
                  <td><div align='center'><em>6</em></div></td>
                  <td><div align='center'><em>3</em></div></td>
                  <td><div align='center'><em>4</em></div></td>
                  <td><div align='center'><em>8</em></div></td>
                  <td><div align='center'><em>9</em></div></td>
                  <td><div align='center'><em>10</em></div></td>
                  <td><div align='center'><em>11</em></div></td>
                  <td><div align='center'><em>12</em>=(4x5)/11x10</div></td>
                  <td><div align='center'><em>13</em>=12x20%</div></td>
                  <td><div align='center'><em>14=12-13</em></div></td>
                </tr>
                <tr class='istyle18'>
                  <td>&nbsp;</td>
                  <td>DEPOSITO JATUH TEMPO ".$this->showFilter." </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>";
            /*$nmr=".";    
            $dana="";
            $hrf=65;
            $bank="";*/
            $dana="";   
            $nmr="I.";     
            $sub=false;    
            while ($rs = $tmp->FetchNextObject($toupper=false))
		    {
              if ($rs->namajd!=$dana)
              {
                  if ($sub)
                  {
                     $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'><div align='right'><em>SUB JML ".$bank." </em></div></td>
                            <td><div align='right'><em>".number_format($nominal,0,",",".")."</em></div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><div align='right'><em>".number_format($gross,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($kupon,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($net,0,",",".")."</em></div></td>
                          </tr>";
                     $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'>&nbsp;</div></td>
                            <td>&nbsp;</div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>";
                     $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'><div align='right'><em>JUMLAH DEPOSITO DANA ".$dana." </em></div></td>
                            <td><div align='right'><em>".number_format($totnominal,0,",",".")."</em></div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><div align='right'><em>".number_format($totgross,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($totkupon,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($totnet,0,",",".")."</em></div></td>
                          </tr>";
                  }
                  $i=1;                                    
                  $hrf=65;
                  $bank="";
                  $dana=$rs->namajd;
                  $nominal=0;
                  $gross=0;
                  $kupon=0;
                  $net=0;
                  $totnominal=0;
                  $totgross=0;
                  $totkupon=0;
                  $totnet=0;
                  if ($rs->namae." ".$rs->cabang!=$bank)
                  {
                     $bank=$rs->namae." ".$rs->cabang;
                     //$jumhari=endDay($rs->fields[4],$rs->fields[5])-$rs->fields[3];  
                     $f12=($rs->bunga*$rs->nilai/100)/$rs->basis*$rs->jumhari;
                     $f13=$f12*0.2;
                     $f14=$f12-$f13;
                     $nominal=$nominal+$rs->nilai;
                     $gross=$gross+$f12;
                     $kupon=$kupon+$f13;
                     $net=$net+$f14;
                     $totnominal=$rs->nilai;//$nominal;
                     $totgross=$f12;
                     $totkupon=$f13;
                     $totnet=$f14;                      
                     $html .=    
                           " <tr>
                              <td class='istyle18' valign='top'><em>".$nmr."</em></td>
                              <td bgcolor='#000000' valign='top'><span class='istyle19'>DANA ".$rs->namajd."</span></td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                            <tr class='istyle18'>
                              <td><div align='center'>".chr($hrf).".</div></td>
                              <td>".$bank."</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                            <tr class='istyle15'>
                              <td><div align='right'>".$i."</div></td>
                              <td>".$bank."</td>
                              <td><div align='right'>".number_format($rs->nilai,0,",",".")."</div></td>
                              <td><div align='center'>".$rs->tglawl."/".$rs->blnawl."/".$rs->thnawl."</div></td>
                              <td><div align='center'>".$rs->tglakhr."/".$rs->blnakhr."/".$rs->thnakhr."</div></td>
                              <td><div align='center'>".number_format($rs->bunga,3,",",".")."%</div></td>
                              <td><div align='center'>".$rs->tglakru."/".$rs->blnakru."/".$rs->thnakru."</div></td>
                              <td><div align='center'>".$rs->tgl."/".$rs->bln."/".$rs->thn."</div></td>                              
                              <td><div align='center'>".$rs->jumhari."</div></td>
                              <td><div align='center'>".$rs->basis."</div></td>
                              <td><div align='right'>".number_format($f12,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f13,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f14,0,",",".")."</div></td>
                            </tr>";
                         $i++; 
                         $hrf++;  
                         $nmr="I".$nmr;
                  }else
                  {
                  
                  }
                   
              }else
              {
                  if ($rs->namae." ".$rs->cabang!=$bank)
                  {
                     $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'><div align='right'><em>SUB JML ".$bank." </em></div></td>
                            <td><div align='right'><em>".number_format($nominal,0,",",".")."</em></div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><div align='right'><em>".number_format($gross,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($kupon,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($net,0,",",".")."</em></div></td>
                          </tr>";
                      $dana=$rs->namajd;
                      $nominal=0;
                      $gross=0;
                      $kupon=0;
                      $net=0;
                      $i=1;
                      $bank=$rs->namae." ".$rs->cabang;
                       //$jumhari=endDay($rs->fields[4],$rs->fields[5])-$rs->fields[3];  
                       $f12=($rs->bunga*$rs->nilai/100)/$rs->basis*$rs->jumhari;
                       $f13=$f12*0.2;
                       $f14=$f12-$f13;
                       $nominal=$nominal+$rs->nilai;
                       $gross=$gross+$f12;
                       $kupon=$kupon+$f13;
                       $net=$net+$f14;
                       $totnominal+=$rs->nilai;//$nominal;
                       $totgross+=$f12;
                       $totkupon+=$f13;
                       $totnet+=$f14;   
                       $html .=    
                           " 
                            <tr class='istyle18'>
                              <td><div align='center'>".chr($hrf).".</div></td>
                              <td>".$bank."</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                            <tr class='istyle15'>
                              <td><div align='right'>".$i."</div></td>
                              <td>".$bank."</td>
                              <td><div align='right'>".number_format($rs->nilai,0,",",".")."</div></td>
                              <td><div align='center'>".$rs->tglawl."/".$rs->blnawl."/".$rs->thnawl."</div></td>
                              <td><div align='center'>".$rs->tglakhr."/".$rs->blnakhr."/".$rs->thnakhr."</div></td>
                              <td><div align='center'>".number_format($rs->bunga,3,",",".")."%</div></td>
                              <td><div align='center'>".$rs->tglakru."/".$rs->blnakru."/".$rs->thnakru."</div></td>
                              <td><div align='center'>".$rs->tgl."/".$rs->bln."/".$rs->thn."</div></td>
                              <td><div align='center'>".$rs->jumhari."</div></td>
                              <td><div align='center'>".$rs->basis."</div></td>
                              <td><div align='right'>".number_format($f12,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f13,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f14,0,",",".")."</div></td>
                            </tr>";
                            $i++; 
                            $hrf++; 
                            $sub=true;                      
                  }else
                  {
                     $dana=$rs->namajd;
                     $bank=$rs->namae." ".$rs->cabang;
                     //$jumhari=endDay($rs->fields[4],$rs->fields[5])-$rs->fields[3];  
                     $f12=($rs->bunga*$rs->nilai/100)/$rs->basis*$rs->jumhari;
                     $f13=$f12*0.2;
                     $f14=$f12-$f13;
                     $nominal=$nominal+$rs->nilai;
                     $gross=$gross+$f12;
                     $kupon=$kupon+$f13;
                     $net=$net+$f14;
                     $totnominal+=$rs->nilai;//$nominal;
                     $totgross+=$f12;
                     $totkupon+=$f13;
                     $totnet+=$f14; 
                     
					 $html .=
                          "<tr class='istyle15'>
                              <td><div align='right'>".$i."</div></td>
                              <td>".$bank."</td>
                              <td><div align='right'>".number_format($rs->nilai,0,",",".")."</div></td>
                              <td><div align='center'>".$rs->tglawl."/".$rs->blnawl."/".$rs->thnawl."</div></td>
                              <td><div align='center'>".$rs->tglakhr."/".$rs->blnakhr."/".$rs->thnakhr."</div></td>
                              <td><div align='center'>".number_format($rs->bunga,3,",",".")."%</div></td>
                              <td><div align='center'>".$rs->tglakru."/".$rs->blnakru."/".$rs->thnakru."</div></td>
                              <td><div align='center'>".$rs->tgl."/".$rs->bln."/".$rs->thn."</div></td>
                              <td><div align='center'>".$rs->jumhari."</div></td>
                              <td><div align='center'>".$rs->basis."</div></td>
                              <td><div align='right'>".number_format($f12,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f13,0,",",".")."</div></td>
                              <td><div align='right'>".number_format($f14,0,",",".")."</div></td>
                            </tr>";
                      $i++; 
                      $sub=true;
                  }
              }                
               // $rs->MoveNext();
            }
           $html .=
                "<tr class='istyle18'>
                  <td colspan='2'><div align='right'><em>SUB JML ".$bank." </em></div></td>
                  <td><div align='right'><em>".number_format($nominal,0,",",".")."</em></div></td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td><div align='right'><em>".number_format($gross,0,",",".")."</em></div></td>
                  <td><div align='right'><em>".number_format($kupon,0,",",".")."</em></div></td>
                  <td><div align='right'><em>".number_format($net,0,",",".")."</em></div></td>
                </tr>";  
           $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'>&nbsp;</div></td>
                            <td>&nbsp;</div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>";
                     $html .=
                          "<tr class='istyle18'>
                            <td colspan='2'><div align='right'><em>JUMLAH DEPOSITO DANA ".$dana." </em></div></td>
                            <td><div align='right'><em>".number_format($totnominal,0,",",".")."</em></div></td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td><div align='right'><em>".number_format($totgross,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($totkupon,0,",",".")."</em></div></td>
                            <td><div align='right'><em>".number_format($totnet,0,",",".")."</em></div></td>
                          </tr>";     
           $html .=
              "</table>
            </div>";      
  
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
