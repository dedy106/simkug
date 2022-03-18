<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_KKPNegosiasi
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
		$sql="select count(distinct k.no_kkp) ".
         "from kkp_bentuk b inner join kkp_nego_m k on b.kode_bentuk=k.kode_bentuk ".
                            "inner join emiten e on k.kode_emiten=e.kode_emiten ".
                            "inner join karyawan a on a.nik=k.nik_ver ".$this->filter;
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
		$sql0="select distinct k.no_kkp ".
          "from kkp_bentuk b inner join kkp_nego_m k on b.kode_bentuk=k.kode_bentuk ".
                            "inner join emiten e on k.kode_emiten=e.kode_emiten ".
                            "inner join karyawan a on a.nik=k.nik_ver ".$this->filter;
    $start = (($this->page-1) * $this->rows);	
    global $dbLib;
    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);
    while ($row = $page->FetchNextObject($toupper=false))
    {
          $sql = "select k.no_kkp,b.nama as namab,e.nama as namae,day(k.tanggal) as tgl,month(k.tanggal) as bln, year(k.tanggal) as thn,upper(a.nama) as namak,upper(e.pic) as pic,e.nama,e.cabang as cbg,e.cabang ".
                 "from kkp_bentuk b inner join kkp_nego_m k on b.kode_bentuk=k.kode_bentuk ".
                                  "inner join emiten e on k.kode_emiten=e.kode_emiten ".
                                  "inner join karyawan a on a.nik=k.nik_ver ".$this->filter.
                                  " and k.no_kkp='".$row->no_kkp."' ";
         		
      		$rs=$dbLib->LimitQuery($sql,1000,0);
			$row1 = $rs->FetchNextObject($toupper=false);
            /*$html = "<style type='text/css'>
                  <!--
                  .style15 {font-size: 13px; font-family: Arial, Helvetica, sans-serif; }
                  .style16 {font-size: 14px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  .style17 {font-size: 20px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  .style18 {font-size: 13px; font-weight: bold; font-family: Arial, Helvetica, sans-serif; }
                  -->
                  </style>";*/
            $html = "<br><br>";		
      		$html .= "<table width='800' border='1' align='center' cellpadding='0' cellspacing='0' class='kotak'>".
                  "<tr><td height='143' colspan='2'><table width='785' height='137' border='0' align='center' cellpadding='0' cellspacing='0'>".      
                  "<tr><td width='785'><div align='center'><span class='style16'>KERTAS KERJA PELAKSANAAN NEGOSIASI TINGKAT SUKU BUNGA PENEMPATAN DANA</span></div></td></tr>".
                  "<tr><td><div align='center' class='style16'>".strtoupper($row1->namab)."</div></td></tr>".
                  "<tr><td><div align='center' class='style16'>ANTARA</div></td></tr>".
                  "<tr><td><div align='center' class='style16'>YAKES-TELKOM </div></td></tr>".
                  "<tr><td><div align='center' class='style16'>DENGAN</div></td></tr>";   
      		
            $html .= "<tr><td height='13'><div align='center' class='style16'>".strtoupper($row1->namae)." CABANG ".strtoupper($row1->cbg)."</div></td></tr>".      
                  "</table></td>".
                  "</tr>";
                  
            $html .=  "<tr><td height='81' colspan='2'><table width='817' border='0' cellspacing='0' cellpadding='0'>".
                    "    <tr><td width='23'><div align='center' class='style15'>1.</div></td>".
                    "       <td colspan='4'><span class='style15'>Pelaksanaan Negosiasi </span></td></tr>".
                    "    <tr><td>&nbsp;</td>".
                    "        <td width='16'><span class='style15'>a.</span></td>".
                    "        <td width='200'><span class='style15'>Tanggal</span></td>".
                    "        <td width='23'><div align='center' class='style15'>:</div></td>".
                    "        <td width='617'><span class='style15'>".$row1->tgl." ".namaBulan($row1->bln)." ".$row1->thn."</span></td></tr>".
                    "    <tr><td>&nbsp;</td>".
                    "      <td width='16'><span class='style15'>b.</span></td>".
                    "      <td width='200'><span class='style15'>Pihak YAKES-TELKOM</span></td>".
                    "      <td width='23'><div align='center' class='style15'>:</div></td>".
                    "      <td width='617'><span class='style15'>".$row1->namak."</span></td></tr>".
                    "    <tr><td>&nbsp;</td>".
                    "      <td width='16'><span class='style15'>c.</span></td>".
                    "      <td width='200'><span class='style15'>Pihak Bank </span></td>".
                    "      <td width='23'><div align='center' class='style15'>:</div></td>".
                    "      <td width='617'><span class='style15'>".$row1->pic."</span></td></tr>".
                    "  </table></td>".
                    "</tr>";
          
          $sql2="select b.uraian,b.tb01,b.tb03,b.tb06,b.tb12,b.jml_hari,b.bayar_bunga,b.biaya,b.keterangan ".
                "from kkp_nego_m k inner join kkp_bunga b on k.no_kkp=b.no_kkp ".
                "where k.no_kkp='".$row1->no_kkp."' order by b.no_urut";
          $rs2=$dbLib->LimitQuery($sql2,1000,0);   
           
          $html .=  "<tr><td height='116' colspan='2'><table width='837' border='0' cellspacing='0' cellpadding='0'>".
                    "    <tr><td width='23'><div align='center' class='style15'>2.</div></td>".
                    "      <td width='814'><span class='style15'>Tingkat Bunga Penempatan Dana </span></td></tr>".
                    "    <tr><td width='23'>&nbsp;</td>".
                    "      <td><table width='814' height='95' border='1' cellpadding='0' cellspacing='0' bordercolor='#CCCCCC' class='kotak'>".
                    "         <tr>".
                    "          <td width='164' rowspan='2' class='style15'><div align='center' class='style15'>".
                    "            <div align='center'>Uraian</div>".
                    "          </div></td>".
                    "          <td height='36' colspan='4' class='style15'><div align='center'>Tingkat Bunga (p.a) </div></td>".
                    "          <td width='56' rowspan='2' class='style15'><div align='center'>Jumlah Hari Pembagi </div></td>".
                    "          <td width='79' rowspan='2' class='style15'><div align='center'>Pembayaran Bunga Deposito </div></td>".
                    "          <td width='81' rowspan='2' class='style15'><div align='center'>Biaya RTGS Bunga Deposito </div></td>".
                    "          <td width='161' rowspan='2' class='style15'><div align='center'>Keterangan</div></td>".
                    "        </tr>".
                    "        <tr>".
                    "          <td width='64' height='34' class='style15'><div align='center'>1 Bulan </div></td>".
                    "          <td width='63' class='style15'><div align='center'>3 Bulan</div></td>".
                    "          <td width='63' class='style15'><div align='center'>6 Bulan</div></td>".
                    "          <td width='63' class='style15'><div align='center'>12 Bulan</div></td>".
                    "          </tr>";
                     
            while ($row2 = $rs2->FetchNextObject($toupper=false))
            {
                $html .="<tr>".
                        "  <td height='21' class='style15'>".$row2->uraian."</td>";
							if ($row2->tb01==0)	  
							{
								$html .=
                                  "<td class='style15'><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td class='style15'><div align='center'>".number_format($row2->tb01,3,",",".")."%</div></td>";
							}
							if ($row2->tb03==0)	  
							{
								$html .=
                                  "<td class='style15'><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td class='style15'><div align='center'>".number_format($row2->tb03,3,",",".")."%</div></td>";
							}
							if ($row2->tb06==0)	  
							{
								$html .=
                                  "<td class='style15'><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td class='style15'><div align='center'>".number_format($row2->tb06,3,",",".")."%</div></td>";
							}
							if ($row2->tb12==0)	  
							{
								$html .=
                                  "<td class='style15'><div align='center'>-</div></td>";
							}else
							{
								$html .=
								  "<td class='style15'><div align='center'>".number_format($row2->tb12,3,",",".")."%</div></td>";
							}
                      /*  "  <td class='style15'><div align='center'>".number_format($row2->tb01,3,",",".")."%</div></td>".
                        "  <td class='style15'><div align='center'>".number_format($row2->tb03,3,",",".")."%</div></td>".
                        "  <td class='style15'><div align='center'>".number_format($row2->tb06,3,",",".")."%</div></td>".
                        "  <td class='style15'><div align='center'>".number_format($row2->tb12,3,",",".")."%</div></td>".*/
                    $html .=    
						"  <td class='style15'><div align='center'>".$row2->jml_hari."</div></td>".
                        "  <td class='style15'><div align='center'>".$row2->bayar_bunga."</div></td>".
                        "  <td class='style15'><div align='center'>".$row2->biaya."</div></td>".
                        "  <td class='style15'>".$row2->keterangan."</td></tr>";
                //$rs2->MoveNext();
            }         
                            
           $html .="     </table></td>".
                   "     </tr>".
                   "   </table></td>".
                   " </tr>";    
              
          $sql3 = "select k.no_urut,c.keterangan ".
                    "from kkp_nego_m n inner join kkp_catatan k on n.no_kkp=k.no_kkp ".
                                      "inner join catatan c on k.kode_catatan=c.kode_catatan ".
                    "where k.no_kkp='".$row1->no_kkp."' order by k.no_urut";
          $rs3=$dbLib->LimitQuery($sql3,1000,0); 
          
          $html .= "<tr>
          <td height='40' colspan='2'><table width='837' border='0' cellspacing='0' cellpadding='0'>
            
            <tr>
              <td width='23'><div align='center'><span class='style15'>3.</span></div></td>
              <td colspan='2'><span class='style15'>Catatan</span></td>
              </tr>";
              
          while ($row3 = $rs3->FetchNextObject($toupper=false))
            {
			    $bank=str_replace("<bank>",$row1->namae." Cabang ".$row1->cbg,$row3->keterangan);
                $html .="<tr>
              <td witdh='29'>&nbsp;</td>
              <td width='23' class='style15' valign='top'><div align='center'>-</div></td>
              <td width='791' class='style15' align='justify'>".$bank."</td>
            </tr><tr>
              <td>&nbsp;</td>
            </tr>";   
              //$rs3->MoveNext();   
            } 
          $html .=   "</table></td>
                    </tr> ";  
                    
          $sql4 = "select upper(k.nama) as namak,k.jabatan ".
                  "from karyawan k inner join kkp_nego_m n on k.nik=n.nik_app1 ".
                  "where n.no_kkp='".$row1->no_kkp."'";
          $s4=$dbLib->LimitQuery($sql4,1,0);
		  $ttd1 = $s4->FetchNextObject($toupper=false);
          
          $sql5 = "select upper(k.nama) as namak,k.jabatan ".
                  "from karyawan k inner join kkp_nego_m n on k.nik=n.nik_app2 ".
                  "where n.no_kkp='".$row1->no_kkp."'";
          $s5=$dbLib->LimitQuery($sql5,1,0);
		  $ttd2 = $s5->FetchNextObject($toupper=false);
                    
          $html .=" <tr>
                      <td width='435' height='295'><table width='426' border='0' align='center' cellpadding='0' cellspacing='0'>
                        <tr>
                          <td width='110'>&nbsp;</td> 
                          <td width='111'>&nbsp;</td>
                          <td width='4'>&nbsp;</td>
                          <td width='77'>&nbsp;</td>
                          <td width='111'>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='5'><div align='center'><span class='style15'>Pihak YAKES-TELKOM</span></div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>                          
                          <td colspan='3'></td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td colspan='3'><div align='center'><span class='style15'><u>".$row1->namak."</u></span></div></td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='5'><div align='center'><span class='style15'>Mengetahui/Menyetujui</span></div></td>
                          </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='2'><div align='center'><span class='style15'><u>".$ttd1->namak."</u></span></div></td>
                          <td>&nbsp;</td>
                          <td colspan='2'><div align='center'><span class='style15'><u>".$ttd2->namak."</u></span></div></td>
                          </tr>
                        <tr>
                          <td colspan='2'><div align='center'><span class='style15'>".$ttd1->jabatan."</span></div></td>
                          <td>&nbsp;</td>
                          <td colspan='2'><div align='center'><span class='style15'>".$ttd2->jabatan."</span></div></td>
                          </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </table></td>
                      <td width='400'><table width='350' border='0' align='center' cellpadding='0' cellspacing='0'>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='5'><div align='center'><span class='style15'>Pihak ".$row1->nama." Cabang ".$row1->cabang."</span></div></td>
                          </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td colspan='3'><div align='center'><span class='style15'><u>..............................................................</u></span></div></td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='5'><div align='center'><span class='style15'>Mengetahui/Menyetujui</span></div></td>
                          </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td colspan='5'><div align='center'><span class='style15'><u>..............................................................</u></span></div></td>
                          </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      </table></td>
                    </tr>";
         
          $html .= "</table>";
          $html .=
          "<table width='684' border='0' align='center' cellpadding='0' cellspacing='0'>
            <tr>
              <td><div align='center' class='style15'>Setelah ditandatangani, mohon lembar ini dikirimkan kembali kepada YAKES-TELKOM </div></td>
            </tr>
            <tr>
              <td><div align='center' class='style15'>via fax. 022-4521529, 4521562 </div></td>
            </tr>
          </table>";
            
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
