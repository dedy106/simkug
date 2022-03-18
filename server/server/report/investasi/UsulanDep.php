<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_UsulanDep
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
		$sql="select count(distinct ud.no_usulan) ".
         "from usulan_m um inner join usulan_d ud on um.no_usulan=ud.no_usulan ".
                          "inner join emiten e on ud.kode_emiten=e.kode_emiten ".
                          "inner join jenis_dana j on um.kode_dana=j.kode_dana ".$this->filter;

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
		$sql0="select distinct ud.no_usulan ".
          "from usulan_m um inner join usulan_d ud on um.no_usulan=ud.no_usulan ".
                           "inner join emiten e on ud.kode_emiten=e.kode_emiten ".
                           "inner join jenis_dana j on um.kode_dana=j.kode_dana ".$this->filter;
    $start = (($this->page-1) * $this->rows);	
    global $dbLib;
    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);

    while ($row = $page->FetchNextObject($toupper=false))
    {
        $sql="select day(um.tanggal) as tgl,month(um.tanggal) as bln,year(um.tanggal) as thn,j.nama as namaj,e.nama as namab,e.cabang,e.status_bank,ud.nominal, ".
             "day(ud.tgl_mulai) as tglm,month(ud.tgl_mulai) as blnm,year(ud.tgl_mulai) as thnm,day(ud.tgl_jthtempo) as tglj,month(ud.tgl_jthtempo) as blnj,year(ud.tgl_jthtempo) as thnj,ud.tenor,ud.rate,ud.keterangan,um.catatan,ud.no_usulan ".
             "from usulan_m um inner join usulan_d ud on um.no_usulan=ud.no_usulan ".
                              "inner join emiten e on ud.kode_emiten=e.kode_emiten ".
                              "inner join jenis_dana j on um.kode_dana=j.kode_dana ".$this->filter.
             " and ud.no_usulan='".$row->no_usulan."' ".                 
             " order by ud.no_urut";
    		//$start = (($this->page-1) * $this->rows);
    		//global $dbLib;
    		$rs=$dbLib->LimitQuery($sql,1000,0);
			$dt=$dbLib->LimitQuery($sql,1000,0);
			$rowdt=$dt->FetchNextObject($toupper=false);
        $i = 1;
	    		       
	        $html = "<br><br><br>";    
        $html .= 
                "<div align='center'>
                  <table width='1500' border='0' cellspacing='1' cellpadding='0'>
                    <tr class='style16'>
                      <td>USULAN PENEMPATAN DEPOSITO </td>
                    </tr>
                    <tr class='style16'>
                      <td>TANGGAL : ".$rowdt->tgl." ".namaBulan($rowdt->bln)." ".$rowdt->thn."</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                    </tr>
                  </table>
                  <table width='1500' border='1' cellpadding='1' cellspacing='0' bordercolor='#000000' class='kotak'>
                    <tr class='style18'>
                      <td width='18' rowspan='2'><div align='center'>No</div></td>
                      <td width='139' rowspan='2'><div align='center'>Jenis Dana </div></td>
                      <td width='250' rowspan='2'><div align='center'>Nama Bank</div></td>
                      <td width='198' rowspan='2'><div align='center'>Cabang</div></td>
                      <td width='72' rowspan='2'><div align='center'>Jenis Bank </div></td>
                      <td width='125' rowspan='2'><div align='center'>Nominal Deposito (Rp)</div></td>
                      <td colspan='2'><div align='center'>Jangka Waktu </div></td>
                      <td width='58' rowspan='2'><div align='center'>Tenor</div></td>
                      <td width='62' rowspan='2'><div align='center'>Rate </div></td>
                      <td width='285' rowspan='2'><div align='center'>Keterangan</div></td>
                    </tr>
                    
                    <tr class='style16'>
                      <td width='126'><div align='center'>Tgl Mulai</div></td>
                      <td width='127'><div align='center'>Tgl Jatuh Tempo </div></td>
                    </tr>
                    <tr class='style18'>
                      <td><div align='center'><em>1</em></div></td>
                      <td><div align='center'><em>2</em></div></td>
                      <td><div align='center'><em>3</em></div></td>
                      <td><div align='center'><em>4</em></div></td>
                      <td><div align='center'><em>5</em></div></td>
                      <td><div align='center'><em>6</em></div></td>
                      <td><div align='center'><em>7</em></div></td>
                      <td><div align='center'><em>8</em></div></td>
                      <td><div align='center'><em>11</em></div></td>
                      <td><div align='center'><em>12</em></div></td>
                      <td><div align='center'><em>13</em></div></td>
                    </tr>";
                  
              while ($row1=$rs->FetchNextObject($toupper=false))
              {
                  $html .=                   
                    "<tr class='style15'>
                      <td><div align='center'>".$i."</div></td>
                      <td><div align='left'>".$row1->namaj."</div></td>
                      <td><div align='left'>".$row1->namab."</div></td>
                      <td><div align='left'>".$row1->cabang."</div></td>
                      <td><div align='center'>".$row1->status_bank."</div></td>
                      <td><div align='right'>".number_format($row1->nominal,0,",",".")."</div></td>
                      <td><div align='center'>".$row1->tglm." ".namaBulan($row1->blnm)." ".$row1->thnm."</div></td>
                      <td><div align='center'>".$row1->tglj." ".namaBulan($row1->blnj)." ".$row1->thnj."</div></td>
                      <td><div align='center'>".$row1->tenor."</div></td>
                      <td><div align='center'>".number_format($row1->rate,3,",",".")."%</div></td>
                      <td><div align='left'>".$row1->keterangan."</div></td>
                    </tr>";
                  $i++;
                  $tgl=$row1->tgl." ".namaBulan($row1->bln)." ".$row1->thn;
                  $cttn=$row1->catatan;
                  $nousulan=$row1->no_usulan;
                  //$rs->MoveNext(); 
              }                
              $sql2 ="select upper(k.nama) ". 
                    "from usulan_m um inner join karyawan k on um.nik_ver=k.nik ".
                    "where um.no_usulan='".$nousulan."'";  
              $ver=$dbLib->LimitQuery($sql2,1,0);
              $sql3 ="select upper(k.nama) ". 
                    "from usulan_m um inner join karyawan k on um.nik_app1=k.nik ".
                    "where um.no_usulan='".$nousulan."'";  
              $app1=$dbLib->LimitQuery($sql3,1,0);
              $sql4 ="select upper(k.nama) ". 
                    "from usulan_m um inner join karyawan k on um.nik_app2=k.nik ".
                    "where um.no_usulan='".$nousulan."'";  
              $app2=$dbLib->LimitQuery($sql4,1,0);
                $html .=    
                    "<tr class='style15'>
                      <td colspan='11'><table width='1500' border='0' cellspacing='1' cellpadding='0'>
                        <tr class='style15'>
                          <td width='70' align='left' valign='top'>Catatan : </td>
                          <td width='1434'><table width='800' border='0' cellspacing='1' cellpadding='0'>
                            <tr class='style15'>
                              <td width='58' align='center' valign='top'><div align='center'>-</div></td>
                              <td width='1372'>".$cttn."</td>
                            </tr>
                          </table></td>
                        </tr>
                        <tr>
                        <td colspan='2' align='left' valign='top'>&nbsp;</td>
                        </tr>
                      </table></td>
                    </tr>
                  </table>
                  <table width='1500' border='0' align='center' cellpadding='0' cellspacing='1'>
                    <tr>
                      <td width='391'>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>&nbsp;</td>
                    </tr>
                    <tr class='style18'>
                      <td colspan='2'><div align='center'>Mengetahui/Menyetujui</div></td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>Bandung, ".$tgl."</td>
                    </tr>
                    <tr class='style18'>
                      <td>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>Diusulkan oleh </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>&nbsp;</td>
                    </tr>
                    <tr class='style18'>
                      <td><div align='center'><u>".$app1->fields[0]."</u></div></td>
                      <td width='388'><div align='center'><u>".$app2->fields[0]."</u></div></td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'><u>".$ver->fields[0]."</u></td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td width='388'>&nbsp;</td>
                      <td width='230'>&nbsp;</td>
                      <td width='164'>&nbsp;</td>
                      <td width='321'>&nbsp;</td>
                    </tr>
                  </table>  
                </div>";
                     
    		$html .= "<br>";
    
        //$page->MoveNext();
    }		
		
		
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
