<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_NotaDinas
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
		$sql=  "select count(distinct dm.no_deposito) ".
           "from deposito_m dm inner join deposito_d d on dm.no_deposito=d.no_deposito ".
                              "inner join nota_m nm on d.no_nota=nm.no_nota ".
                              "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                              "inner join emiten b on kn.kode_bank=b.kode_emiten ".$this->filter;
							  
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
		$sql0="select distinct dm.no_deposito ".
           "from deposito_m dm inner join deposito_d d on dm.no_deposito=d.no_deposito ".
                              "inner join nota_m nm on d.no_nota=nm.no_nota ".
                              "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                              "inner join emiten b on kn.kode_bank=b.kode_emiten ".$this->filter;
							  
    global $dbLib;
	$start = (($this->page-1) * $this->rows);	    
    $page=$dbLib->LimitQuery($sql0,1000,$start);
    while ($row = $page->FetchNextObject($toupper=false))
    {error_log($row->no_deposito);
          $sql = "select dm.no_dokumen, dm.nik_approve, upper(k.nama) as nama, dm.lampiran, dm.perihal, day(dm.tanggal) as tgl, month(dm.tanggal) as bln, year(dm.tanggal) as thn ". 
                 "from deposito_m dm inner join karyawan k on dm.nik_approve=k.nik ".$this->filter.
                 " and dm.no_deposito='".$row->no_deposito."' ";
          $sql2= "select k.jabatan ".
                 "from deposito_m dm inner join karyawan k on dm.kepada=k.nik ".$this->filter.
                 " and dm.no_deposito='".$row->no_deposito."' ";
          $sql3= "select k.jabatan ". 
                 "from deposito_m dm inner join karyawan k on dm.dari=k.nik ".$this->filter.
                 " and dm.no_deposito='".$row->no_deposito."' ";
          $sql4= "select kn.nilai,b.nama,b.cabang,b.rekening,b.atas_nama,day(d.tanggal) as tgl,month(d.tanggal) as bln,year(d.tanggal) as thn,d.keterangan ".
                 "from deposito_m dm inner join deposito_d d on dm.no_deposito=d.no_deposito ".
                                    "inner join nota_m nm on d.no_nota=nm.no_nota ".
                                    "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                                    "inner join emiten b on kn.kode_bank=b.kode_emiten ".$this->filter.
                 " and dm.no_deposito='".$row->no_deposito."' ";
      		$sql5= "select sum(kn.nilai) ".
                 "from deposito_m dm inner join deposito_d d on dm.no_deposito=d.no_deposito ".
                                    "inner join nota_m nm on d.no_nota=nm.no_nota ".
                                    "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                                    "inner join emiten b on kn.kode_bank=b.kode_emiten ".$this->filter.
                 " and dm.no_deposito='".$row->no_deposito."' ";
      		                    error_log($sql4);
      		$tmp=$dbLib->LimitQuery($sql,1000,0);
			$rs = $tmp->FetchNextObject($toupper=false);
      		$kpd=$dbLib->LimitQuery($sql2,1,0);
      		$dr=$dbLib->LimitQuery($sql3,1,0);
      		$rs1=$dbLib->LimitQuery($sql4,1000,0);
            $jum=$dbLib->LimitQuery($sql5,1,0);
          
          $html = "<br><br><br><br>";		
      		$html .= " 
                    <div align='center' class='margin'>
                      
                     <table width='800' border='0' cellspacing='0' cellpadding='2' style='border-collapse: collapse'>
                      <tr>
                        <td width='800'><table width='798' border='0' align='center' cellpadding='0' cellspacing='2'>
                          <tr>
                            <td width='800'><div align='right' class='nstyle17'>Nota Dinas</div></td>
                            </tr>
                          <tr>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td><table width='800' border='0' cellpadding='0' cellspacing='2'>
                      <tr>
                        <td width='89' class='nstyle15'>Nomor</td>
                        <td width='29' class='nstyle15'><div align='center'>:</div></td> 
                        <td width='706' class='nstyle15'>".$rs->no_dokumen."</td> 
                      </tr>
                      <tr>
                        <td class='nstyle15'>Kepada</td>
                        <td class='nstyle15'><div align='center'>:</div></td>
                        <td class='nstyle18'>Sdr. ".$kpd->fields[0]."</td>
                      </tr>
                      <tr>
                        <td class='nstyle15'>Dari</td>
                        <td class='nstyle15'><div align='center'>:</div></td>
                        <td class='nstyle18'>".$dr->fields[0]."</td>
                      </tr>
                      <tr>
                        <td class='nstyle15'>Lampiran</td>
                        <td class='nstyle15'><div align='center'>:</div></td>
                        <td class='nstyle18'>".$rs->lampiran."</td>
                      </tr>
                      <tr>
                        <td class='nstyle15'>Perihal</td>
                        <td class='nstyle15'><div align='center'>:</div></td>
                        <td class='nstyle18'>".$rs->perihal."</td>
                      </tr>
                    </table></td>
                            </tr>
                    
                          <tr>
                            <td>&nbsp;</td>
                            </tr>
                          <tr>
                            <td><table width='829' border='0' cellspacing='2' cellpadding='0'>
                              <tr>
                                <td width='27' height='24' valign='top' class='nstyle15'>1.</td>
                                <td width='796' colspan='2' class='nstyle15' align='justify'>Sehubungan penempatan dana YAKES-TELKOM pada deposito, dengan ini dimohon bantuan Saudara untuk mentransfer dana dengan kondisi sebagai berikut : </td>
                                </tr>
                    
                              <tr>
                                <td>&nbsp;</td>
                                <td colspan='2'>&nbsp;</td>
                                </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td colspan='2'><table width='798' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000' class='kotak'>
                                  <tr>
                                    <td width='95' rowspan='2' class='nstyle18'><div align='center'>Jenis Penempatan </div></td>
                                    <td width='160' rowspan='2' class='nstyle18'><div align='center'>Nominal Dana yang Ditransfer (Rp) </div></td>
                                    <td colspan='2' class='nstyle18'><div align='center'>Alamat Transfer Dana </div></td>
                                    <td width='104' rowspan='2' class='nstyle18'><div align='center'>Tanggal Pelaksanaan </div></td>
                                    <td width='129' rowspan='2' class='nstyle18'><div align='center'>Keterangan Transfer </div></td>
                                  </tr>
                                  <tr>
                                    <td width='138' class='nstyle18'><div align='center'>Nama Bank </div></td>
                                    <td width='148' class='nstyle18'><div align='center'>Nomor Rekening </div></td>
                                  </tr>
                                  <tr>
                                    <td class='nstyle15'><div align='center'><em>1</em></div></td>
                                    <td class='nstyle15'><div align='center'><em>2</em></div></td>
                                    <td class='nstyle15'><div align='center'><em>3</em></div></td>
                                    <td class='nstyle15'><div align='center'><em>4</em></div></td>
                                    <td class='nstyle15'><div align='center'><em>5</em></div></td>
                                    <td class='nstyle15'><div align='center'><em>6</em></div></td>
                                  </tr>";
                      while ($row1 = $rs1->FetchNextObject($toupper=false))
                      {
                          $html .="<tr>
                                    <td class='nstyle15'><div align='center'>Deposito</div></td>
                                    <td class='nstyle15'><div align='right'>".number_format($row1->nilai,0,",",".").",- </div></td>
                                    <td class='nstyle15'>".$row1->nama.", ".$row1->cabang."</td>
                                    <td class='nstyle15'>".$row1->rekening." a.n. ".$row1->atas_nama."</td>
                                    <td class='nstyle15'><div align='center'>".$row1->tgl."/".$row1->bln."/".$row1->thn."</div></td>
                                    <td class='nstyle15'>".$row1->keterangan." a.n. ".$row1->atas_nama."</td>
                                  </tr>";
                          
                      }  
                          $html .="<tr>
                                    <td class='nstyle18'><div align='center'><em>Jumlah</em></div></td>
                                    <td class='nstyle18'><div align='right'><em>".number_format($jum->fields[0],0,",",".").",- </em></div></td>
                                    <td bgcolor='#F7F7F7'>&nbsp;</td>
                                    <td bgcolor='#F7F7F7'>&nbsp;</td>
                                    <td bgcolor='#F7F7F7'>&nbsp;</td>
                                    <td bgcolor='#F7F7F7'>&nbsp;</td>
                                  </tr>
                                </table></td>
                              </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td colspan='2'>&nbsp;</td>
                              </tr>
                              <tr>
                                <td class='nstyle15' valign='top'>2.</td>
                                <td colspan='2' class='nstyle15' align='justify'>Melengkapi permohonan transfer dana ini, terlampir kami sampaikan berkas rencana penempatan dana di Bank dimaksud. </td>
                                </tr>
                              <tr>
                                <td>&nbsp;</td>
                                <td colspan='2' class='nstyle15'>&nbsp;</td>
                                </tr>
                              <tr>
                                <td class='nstyle15' valign='top'>3.</td>
                                <td colspan='2' class='nstyle15' align='justify'>Demikian kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja samanya kami ucapkan terima kasih. </td>
                                </tr>
                              <tr>
                                <td colspan='3'>&nbsp;</td>
                                </tr>
                              <tr>
                                <td height='19' colspan='3'><table width='222' border='0' cellspacing='0' cellpadding='0'>
                                  <tr>
                                    <td class='nstyle15'>Bandung, ".$rs->tgl." ".namaBulan($rs->bln)." ".$rs->thn."</td>
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
                                  <tr>
                                    <td class='nstyle18'><u>".$rs->nama."</u></td>
                                  </tr>
                                  <tr>
                                    <td class='nstyle18'>NIK. ".$rs->nik_approve." </td>
                                  </tr>
                                </table></td>
                                </tr>
                              
                            </table></td>
                          </tr>
                          
                        </table></td>
                      </tr>
                    </table>
                    </div>";            
            
      		$html .= "<br>";     
                  
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
