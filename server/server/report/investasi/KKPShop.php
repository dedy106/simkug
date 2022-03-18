<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_KKPShop
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
		$sql="select count(distinct sd.no_shopping) ".
         "from shopping_m sm inner join shopping_d sd on sm.no_shopping=sd.no_shopping ".
                            "inner join emiten e on sd.kode_emiten=e.kode_emiten ".$this->filter;
         //" group by sm.no_shopping";       
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
		$sql0="select distinct sd.no_shopping ".
          "from shopping_m sm inner join shopping_d sd on sm.no_shopping=sd.no_shopping ".
                             "inner join emiten e on sd.kode_emiten=e.kode_emiten ".$this->filter;	
    $start = (($this->page-1) * $this->rows);	
    global $dbLib;
    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);
    while ($row = $page->FetchNextObject($toupper=false))
    {
          $sql="select k.kode_bentuk,day(sm.tanggal) as tgl,month(sm.tanggal) as bln,year(sm.tanggal) as thn,e.nama,e.cabang,e.pic,e.no_telp_pic,sd.hari,sd.rate1, ".
               "sd.rate2,sd.rate3,sd.rate4,sd.basis,sd.biaya,sd.keterangan,sd.no_shopping ".
               "from shopping_m sm inner join shopping_d sd on sm.no_shopping=sd.no_shopping ".
                                  "inner join kkp_bentuk k on sm.kode_bentuk=k.kode_bentuk ".
								  "inner join emiten e on sd.kode_emiten=e.kode_emiten ".$this->filter.
               " and sd.no_shopping='".$row->no_shopping."' ".
               " order by sd.no_urut";		
        
			
      		$rs=$dbLib->LimitQuery($sql,1000,0);
			$dt=$dbLib->LimitQuery($sql,1000,0);
			$tmp=$dbLib->LimitQuery($sql,1000,0);						
			$emiten="";
			$l=1;
			$most=1;
			while ($row = $tmp->FetchNextObject($toupper=false))
			{
				if ($row->nama!=$emiten)
				{
					if ($l>=$most)
						$most=$l;
					$emiten=$row->nama;
					$l=1;					
				}else
				{
					$emiten=$row->nama;
					$l++;
				}
			}
			if ($l>=$most)
				$most=$l;
      		
          $rowdt=$dt->FetchNextObject($toupper=false);
          $html = "<br><br><br>";
          $html .=
                  "<div align='center'>
                    <table width='1500' border='0' cellspacing='1' cellpadding='0'>
                      <tr class='style16'>";
				if ($rowdt->kode_bentuk=='B01')
				{
					$html .=
                        "<td>KKP SHOPPING RATE DEPOSITO </td>";
				}elseif ($rowdt->kode_bentuk=='B02')
				{
					$html .=
                        "<td>KKP SHOPPING RATE DEPOSITO ON CALL (DOC)</td>";
				}                    
					$html .=
					  "</tr>
                      <tr class='style16'>
                        <td>TANGGAL : ".$rowdt->tgl." ".namaBulan($rowdt->bln)." ".$rowdt->thn."</td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                      </tr>
                    </table>
                    <table width='1500' border='1' cellpadding='1' cellspacing='0' bordercolor='#000000' class='kotak'>
                      <tr class='style16'>
                        <td width='36' rowspan='3'><div align='center'>No</div></td>
                        <td width='214' rowspan='3'><div align='center'>Nama Bank</div></td>
                        <td width='202' rowspan='3'><div align='center'>Cabang</div></td>
                        <td width='144' rowspan='3'><div align='center'>CP</div></td>
                        <td width='104' rowspan='3'><div align='center'>No. Tlp CP </div></td>
                        <td colspan='". ($rowdt->kode_bentuk=='B01'? "5" : "1") ."'><div align='center'>Rate Deposito Yang Ditawarkan </div></td>
		                <td width='68' rowspan='3'><div align='center'>Basis Hari</div></td>
		                <td width='121' rowspan='3'><div align='center'>Biaya RTGS Bunga &amp; Pokok Deposito </div></td>";				
                if ($rowdt->kode_bentuk=='B01')
				{
					$html .=
                        "<td width='247' rowspan='3'><div align='center'>Keterangan</div></td>";
				}        						
                if ($rowdt->kode_bentuk=='B01')
				{
					$html .=  
					  "</tr>
                      <tr class='style16'>
                        <td width='62'><div align='center'>On Call </div></td>
                        <td colspan='4'><div align='center'>Berjangka</div></td>
                      </tr>
					  <tr class='style16'>
                        <td><div align='center'>Hari</div></td>
                        <td width='62'><div align='center'>1 Bln </div></td>
                        <td width='62'><div align='center'>3 Bln</div></td>
                        <td width='62'><div align='center'>6 Bln </div></td>
                        <td width='62'><div align='center'>12 Bln </div></td>
                      </tr>";
					$html .=  
                      "<tr class='style18'>
                        <td><div align='center'><em>1</em></div></td>
                        <td><div align='center'><em>2</em></div></td>
                        <td><div align='center'><em>3</em></div></td>
                        <td><div align='center'><em>4</em></div></td>
                        <td><div align='center'><em>5</em></div></td>
                        <td><div align='center'><em>6</em></div></td>
                        <td><div align='center'><em>7</em></div></td>
                        <td><div align='center'><em>8</em></div></td>
                        <td><div align='center'><em>9</em></div></td>
                        <td><div align='center'><em>10</em></div></td>
                        <td><div align='center'><em>11</em></div></td>
                        <td><div align='center'><em>12</em></div></td>
                        <td><div align='center'><em>13</em></div></td>
                      </tr>";
				}elseif ($rowdt->kode_bentuk=='B02')
				{
					$html .=  
					  "</tr>
                      <tr class='style16'>
                        <td colspan='".$most."' align='center'>Hari</td>
                      </tr>";
					$html .="<tr class='style16'>";
                    $j=1;
					while ($j<=$most)
					{
						$html .="<td width='62'><div align='center'>".$j."</div></td>"; 
						$j++;
                    }
					$html .="</tr>";
				}
			if ($rowdt->kode_bentuk=='B01')
			{
				$i = 1;	
                while ($row1 = $rs->FetchNextObject($toupper=false))
                {                      
                          $html .=   
                               "<tr class='style15'>
                                  <td><div align='center'>".$i."</div></td>
                                  <td><div align='left'>".$row1->nama."</div></td>
                                  <td><div align='left'>".$row1->cabang."</div></td>
                                  <td><div align='left'>".$row1->pic."</div></td>
                                  <td><div align='left'>".$row1->no_telp_pic."</div></td>";
							if ($row1->hari==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".$row1->hari."</div></td>";
							}
							if ($row1->rate1==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate1,3,",",".")."%</div></td>";
							}
							if ($row1->rate2==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate2,3,",",".")."%</div></td>";
							}
							if ($row1->rate3==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate3,3,",",".")."%</div></td>";
							}
							if ($row1->rate4==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate4,3,",",".")."%</div></td>";
							}
                                $html .=  
								  "<td><div align='center'>".$row1->basis."</div></td>
                                  <td>".$row1->biaya."</td>
                                  <td><div align='left'>".$row1->keterangan."</div></td>
                                </tr>";							
                          $i++;    
                          $tgl=$row1->tgl." ".namaBulan($row1->bln)." ".$row1->thn;            
                          $noshop=$row1->no_shopping;
                }
			}elseif ($rowdt->kode_bentuk=='B02')	
            {
				$i = 1;
				$hari = 1;
				$emiten="";
				$basis="";
				$biaya="";
                while ($row1 = $rs->FetchNextObject($toupper=false))
                {                      
                        if ($row1->nama!=$emiten)
						{
							if ($emiten!="")
							{
								while ($hari<=$most)
								{
									$html .=
	                                  "<td><div align='center'>-</div></td>";
									$hari++;
								}
								$html.="<td><div align='center'>".$basis."</div></td>
									  <td>".$biaya."</td>
									</tr>";			
							}
							$hari = 1;
							$html.="<tr class='style15'>
                                  <td><div align='center'>".$i."</div></td>
                                  <td><div align='left'>".$row1->nama."</div></td>
                                  <td><div align='left'>".$row1->cabang."</div></td>
                                  <td><div align='left'>".$row1->pic."</div></td>
                                  <td><div align='left'>".$row1->no_telp_pic."</div></td>";
							if ($row1->rate1==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate1,3,",",".")."%</div></td>";
							}                             
							$i++;
							$hari++;
							$emiten=$row1->nama;
						}else
						{
							
							if ($row1->rate1==0)	  
							{
								$html .=
                                  "<td><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td><div align='center'>".number_format($row1->rate1,3,",",".")."%</div></td>";
							}							
							
							$hari++;
							$emiten=$row1->nama;
						}
						
					$tgl=$row1->tgl." ".namaBulan($row1->bln)." ".$row1->thn;            
					$noshop=$row1->no_shopping;
					$basis=$row1->basis;
					$biaya=$row1->biaya;
                }			
				while ($hari<=$most)
				{
					$html .=
					  "<td><div align='center'>-</div></td>";
					$hari++;
				}
				$html.="<td><div align='center'>".$basis."</div></td>
					  <td>".$biaya."</td>
					</tr>";
						
			}   
			
                $sql2 ="select upper(k.nama) ". 
                       "from shopping_m sm inner join karyawan k on sm.nik_ver=k.nik ".
                       "where sm.no_shopping='".$noshop."'";
                 $ttd=$dbLib->LimitQuery($sql2,1,0);
                 $html .=     
                     "</table>
                      <table width='188' border='0' align='right' cellpadding='0' cellspacing='1'>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr class='style18'>
                          <td>Bandung, ".$tgl."</td>
                        </tr>
                        <tr class='style18'>
                          <td>Dealer</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr class='style18'>
                          <td><u>".$ttd->fields[0]."</u></td>
                        </tr>
                      </table>  
                    </div>";                       
                         
      		$html .= "<br>";
          
          //$page->MoveNext();
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
//		ob_end_clean();
//		error_log("server/tmp/$name");
//		return "server/tmp/$name";
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=KKPShop.xls");
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
