<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_PindahBuku
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
		$sql=  "select count(distinct pm.no_pinbuk) ". 
           "from pinbuk_m pm inner join emiten e on pm.kode_emiten=e.kode_emiten ".$this->filter;
                            //"inner join bank b on e.kode_bank=b.kode_bank ".
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
		$sql0="select distinct pm.no_pinbuk ". 
          "from pinbuk_m pm inner join emiten e on pm.kode_emiten=e.kode_emiten ".$this->filter;
		  error_log($sql0);
                           //"inner join bank b on e.kode_bank=b.kode_bank ".$this->filter;
    $start = (($this->page-1) * $this->rows);	
    global $dbLib;
    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);

    while ($row = $page->FetchNextObject($toupper=false))
    {
	 
          $sql = "select pm.no_dokumen,day(pm.tanggal) as tgl,month(pm.tanggal) as bln,year(pm.tanggal) as thn,e.nama,e.cabang,e.alamat,e.kota,e.kodepos,e.pic,e.jabatan,e.no_fax,pm.keterangan,e.rekening,e.atas_nama,pm.nik_app1,pm.nik_app2 ". 
                 "from pinbuk_m pm inner join emiten e on pm.kode_emiten=e.kode_emiten ".$this->filter.
                                  //"inner join bank b on e.kode_bank=b.kode_bank ".$this->filter.
                 " and pm.no_pinbuk='".$row->no_pinbuk."' ";
          $sql2 = "select sum(kn.nilai) as nilai,count(*) as jum_baris ". 
                  "from pinbuk_m pm inner join deposito_m dm on pm.no_deposito=dm.no_deposito ".
                                   "inner join deposito_d dd on dm.no_deposito=dd.no_deposito ".
                                   "inner join nota_m nm on dd.no_nota=nm.no_nota ".
                                   "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                                   "inner join emiten e on kn.kode_emiten=e.kode_emiten ".$this->filter.
                                   //"inner join bank b on e.kode_bank=b.kode_bank ".$this->filter.
                                   " and pm.no_pinbuk='".$row->no_pinbuk."' ";
          $sql3 = "select e.nama,e.cabang,e.rekening,e.atas_nama,kn.nilai,dd.keterangan,day(dd.tanggal) as tgl,month(dd.tanggal) as bln,year(dd.tanggal) as thn ".  
                  "from pinbuk_m pm inner join deposito_m dm on pm.no_deposito=dm.no_deposito ".
                                   "inner join deposito_d dd on dm.no_deposito=dd.no_deposito ".
                                   "inner join nota_m nm on dd.no_nota=nm.no_nota ".
                                   "inner join kkp_nego_m kn on nm.no_kkp=kn.no_kkp ".
                                   "inner join emiten e on kn.kode_emiten=e.kode_emiten ".$this->filter.
                                   //"inner join bank b on e.kode_bank=b.kode_bank ".$this->filter.
                                   " and pm.no_pinbuk='".$row->no_pinbuk."' ";
          
          	
      		$tmp=$dbLib->LimitQuery($sql,1000,0);
			$rs = $tmp->FetchNextObject($toupper=false);
      		$tmpj=$dbLib->LimitQuery($sql2,1,0);
			$jum = $tmpj->FetchNextObject($toupper=false);
      		$tmp1=$dbLib->LimitQuery($sql3,1000,0);
      		
      	  $sql4 = "select upper(k.nama),k.jabatan ".
                  "from pinbuk_m pm inner join karyawan k on pm.nik_app1=k.nik ".$this->filter.
                  "and pm.nik_app1='".$rs->nik_app1."' ";
          $sql5 = "select upper(k.nama),k.jabatan ".
                  "from pinbuk_m pm inner join karyawan k on pm.nik_app2=k.nik ".$this->filter.
                  "and pm.nik_app2='".$rs->nik_app2."' ";
      	  $ttd1 = $dbLib->LimitQuery($sql4,1,0);
          $ttd2 = $dbLib->LimitQuery($sql5,1,0);
              
          $html = "<br><br><br>";		
      		$html .= "
                    <div align='center' class='margin'>
                      <table width='700' border='0' cellspacing='0' cellpadding='2' style='border-collapse: collapse'>
                        <tr>
                          <td width='700'><table width='700' border='0' cellspacing='2' cellpadding='0'>
                            <tr>
                              <td colspan='4'><div align='right' class='nstyle17'>Nota Konfirmasi </div></td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>Nomor : ".$rs->no_dokumen." </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>Bandung, ".$rs->tgl." ".namaBulan($rs->bln)." ".$rs->thn." </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle18'>Kepada Yth. </td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle18'>Pimpinan ".$rs->nama.", ".$rs->cabang." </td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>".$rs->alamat." </td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>".$rs->kota." - ".$rs->kodepos." </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle18'>U.p. Bapak/Ibu ".$rs->pic.", ".$rs->jabatan." </td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>Nomor Fax : ".$rs->no_fax." </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>Perihal : ".$rs->keterangan." </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td colspan='4' class='nstyle15'>Dengan hormat, </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>1.</td>
                              <td colspan='3' class='nstyle15' align='justify'>Dengan ini dimohon bantuan Saudara untuk melakukan pemindahbukuan dana sebagai berikut : </td>
                            </tr>
                            <tr>
                              <td width='23' rowspan='2' valign='top' class='nstyle15'>&nbsp;</td>
                              <td colspan='3' class='nstyle15'>Dari : </td>
                            </tr>
                            <tr>
                              <td colspan='3' class='nstyle15'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                              <td colspan='3'><table width='601' border='0' cellspacing='2' cellpadding='0'>
                                <tr>
                                  <td width='143' class='nstyle15'>Nama Bank </td>
                                  <td width='46' class='nstyle18'><div align='center'>:</div></td>
                                  <td width='381' class='nstyle18'>".$rs->nama.", ".$rs->cabang." </td>
                                </tr>
                                <tr>
                                  <td class='nstyle15'>Nomor Rekening </td>
                                  <td class='nstyle18'><div align='center'>:</div></td>
                                  <td class='nstyle18'>".$rs->rekening." a.n. ".$rs->atas_nama." </td>
                                </tr>
                                <tr>
                                  <td class='nstyle15'>Jumlah Dana </td>
                                  <td class='nstyle18'><div align='center'>:</div></td>
                                  <td class='nstyle18'>Rp. ".number_format($jum->nilai,0,",",".").",- (diulang Rp. ".number_format($jum->nilai,0,",",".").",-) </td>
                                </tr>
                              </table></td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                              <td colspan='3'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                              <td colspan='3' class='nstyle15'>Kepada : </td>
                            </tr>";
                      $i=97;               
                      while ($rs1= $tmp1->FetchNextObject($toupper=false))
                      {                    
                          if ($jum->jum_baris==1)
                          {
                              $html .="
                                <tr>
                                  <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                                  <td colspan='3'><table width='577' border='0' cellspacing='1' cellpadding='0'>
                                    <tr>                               
                                      <td width='151' class='nstyle15'>Nama Bank </td>
                                      <td width='46' class='nstyle18'><div align='center'>:</div></td>
                                      <td width='375' class='nstyle18'>".$rs1->nama.", ".$rs1->cabang." </td>
                                    </tr>
                                    <tr>                                
                                      <td class='nstyle15'>Nomor Rekening</td>
                                      <td class='nstyle18'><div align='center'>:</div></td>
                                      <td class='nstyle18'>".$rs1->rekening." a.n. ".$rs1->atas_nama." </td>
                                    </tr>
                                    <tr>                                
                                      <td class='nstyle15'>Jumlah Dana</td>
                                      <td class='nstyle18'><div align='center'>:</div></td>
                                      <td class='nstyle18'>Rp. ".number_format($rs1->nilai,0,",",".").",- (diulang Rp. ".number_format($rs1->nilai,0,",",".").",-) </td>
                                    </tr>
                                    <tr>                                
                                      <td class='nstyle15' valign='top'>Untuk</td>
                                      <td class='nstyle18' valign='top'><div align='center'>:</div></td>
                                      <td class='nstyle18'>".$rs1->keterangan." a.n. ".$rs1->atas_nama." </td>
                                    </tr>
                                    <tr>                                
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                    </tr>
                                  </table></td>
                                </tr>";
                          }else
                          {
                              $html .="
                                <tr>
                                  <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                                  <td colspan='3'><table width='602' border='0' cellspacing='2' cellpadding='0'>
                                    <tr>
                                      <td width='23' class='nstyle15'>".chr($i).".</td>
                                      <td width='125' class='nstyle15'>Nama Bank </td>
                                      <td width='44' class='nstyle18'><div align='center'>:</div></td>
                                      <td width='395' class='nstyle18'>".$rs1->nama.", ".$rs1->cabang." </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                      <td class='nstyle15'>Nomor Rekening</td>
                                      <td class='nstyle18'><div align='center'>:</div></td>
                                      <td class='nstyle18'>".$rs1->rekening." a.n. ".$rs1->atas_nama." </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                      <td class='nstyle15'>Jumlah Dana</td>
                                      <td class='nstyle18'><div align='center'>:</div></td>
                                      <td class='nstyle18'>Rp. ".number_format($rs1->nilai,0,",",".").",- (diulang Rp. ".number_format($rs1->nilai,0,",",".").",-) </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                      <td class='nstyle15' valign='top'>Untuk</td>
                                      <td class='nstyle18' valign='top'><div align='center'>:</div></td>
                                      <td class='nstyle18'>".$rs1->keterangan." a.n. ".$rs1->atas_nama." </td>
                                    </tr>
                                    <tr>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                      <td>&nbsp;</td>
                                    </tr>
                                  </table></td>
                                </tr>";   
                          } 
                          
                           $tgl= $rs1->tgl;
                           $bln= namaBulan($rs1->bln);
                           $thn= $rs1->thn;
                           //$rs1->MoveNext(); 
                           $i++;
                      }
                       $html .="<tr>
                              <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                              <td width='133' class='nstyle15'>Tanggal pelaksanaan </td>
                              <td width='45' class='nstyle18'><div align='center'>:</div></td>
                              <td width='413' class='nstyle18'>".$tgl." ".$bln." ".$thn.". </td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
                              <td colspan='3'>&nbsp;</td>
                            </tr>
                            <tr>
                              <td width='23' valign='top' class='nstyle15'>2.</td>
                              <td colspan='3' class='nstyle15' align='justify'>Demikian harap maklum dan mohon pelaksanaannya. Atas perhatian dan kerja samanya diucapkan terima kasih. </td>
                            </tr>
                            <tr>
                              <td colspan='4'>&nbsp;</td>
                            </tr>
                            
                            <tr>
                              <td colspan='4'><table width='700' border='0' cellspacing='2' cellpadding='0'>
                                <tr>
                                  <td width='306' class='nstyle18'>Hormat kami, </td>
                                  <td width='143'>&nbsp;</td>
                                  <td width='170'>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td class='nstyle18'>Yayasan Kesehatan Pegawai TELKOM </td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                                </tr>
                                <tr>
                                  <td class='nstyle18'><u>".$ttd1->fields[0]."</u> </td>
                                  <td>&nbsp;</td>
                                  <td class='nstyle18'><u>".$ttd2->fields[0]."</u> </td>
                                </tr>
                                <tr>
                                  <td class='nstyle18'>".$ttd1->fields[1]." </td>
                                  <td>&nbsp;</td>
                                  <td class='nstyle18'>".$ttd2->fields[1]." </td>
                                </tr>
                              </table></td>
                            </tr>
                          </table></td>
                        </tr>
                      </table>
                    </div>";            
            
      		$html .= "<br>";      
         // $page->MoveNext();
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
