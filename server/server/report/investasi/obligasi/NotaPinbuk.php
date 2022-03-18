<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_obligasi_NotaPinbuk
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
		$sql="select count(distinct n.no_nota) ".
             "from notapinbuk n inner join surat_terima s on n.no_surat=s.no_surat ".
							"inner join emiten e on n.kode_emiten=e.kode_emiten ".
							"inner join karyawan k1 on n.nik_app1=k1.nik ".
							"inner join karyawan k2 on n.nik_app2=k2.nik ".$this->filter;
								//" and a.progress not in ".$this->filter2;
		//error_log($sql);
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
		$sql0="select distinct n.no_nota ".
              "from notapinbuk n inner join surat_terima s on n.no_surat=s.no_surat ".$this->filter;
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql= "select n.no_dokumen,convert(varchar,n.tanggal,103) as tgl,e.nama as nmemiten,e.cabang,e.alamat,e.kota,e.kodepos,e.pic,e.no_fax, ".
				"e.rekening,e.atas_nama,s.cabang as nmbank,s.no_rekening,s.nama_rekening,n.keterangan,convert(varchar,n.tgl_pembayaran,103) as tglbyr, ".
				"k1.nama as nmapp1,k1.jabatan as jabapp1,k2.nama as nmapp2,k2.jabatan as jabapp2,n.nilai_bayar ".
				"from notapinbuk n inner join surat_terima s on n.no_surat=s.no_surat ".
							"inner join emiten e on n.kode_emiten=e.kode_emiten ".
							"inner join karyawan k1 on n.nik_app1=k1.nik ".
							"inner join karyawan k2 on n.nik_app2=k2.nik ".$this->filter.
							" and n.no_nota='".$page->fields[0]."' ";
	        //error_log($sql);			
			$temp=$dbLib->execute($sql);
			//$detail=$dbLib->execute($sql);
			$rs = $temp->FetchNextObject($toupper=false);			
				$html = "<br><br><br>";
				$html .=
						"<div align='center'>
						  <table width='700' border='0' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
						    <tr>
						      <td width='700'><table width='700' border='0' cellspacing='2' cellpadding='0'>
						        <tr>
						          <td colspan='4'><div align='right' class='nstyle17'>Nota Konfirmasi </div></td>
						        </tr>
						        <tr>
						          <td colspan='4'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle15'>Nomor : ".$rs->no_dokumen."</td>
						        </tr>
						        <tr>
						          <td colspan='4'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle15'>Bandung, ";if (substr($rs->tgl,0,1)!='0'){$html.=substr($rs->tgl,0,2);}else{$html.=substr($rs->tgl,1,1);}$html.=" ".namaBulan(substr($rs->tgl,3,2))." ".substr($rs->tgl,6)."</td>
						        </tr>
						        <tr>
						          <td colspan='4'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle18'>Kepada Yth. </td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle18'>Pimpinan ".$rs->nmemiten." Cabang ".$rs->cabang."</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle18'>".$rs->alamat."</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle18'>".$rs->kota." - ".$rs->kodepos."</td>
						        </tr>
						        <tr>
						          <td colspan='4'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle15'>U.p. ".$rs->pic."</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle15'>Nomor Fax : ".$rs->no_fax."</td>
						        </tr>
						        <tr>
						          <td colspan='4'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td colspan='4' class='nstyle15'>Perihal : Pemindahbukuan Dana </td>
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
						          <td width='599' colspan='3' class='nstyle15' align='justify'>Dengan ini dimohon bantuan Saudara untuk melakukan pemindahbukuan dana sebagai berikut : </td>
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
						          <td colspan='3'><table width='666' border='0' cellspacing='2' cellpadding='0'>
						            <tr>
						              <td width='155' class='nstyle15'>Nama Bank </td>
						              <td width='39' class='nstyle18'><div align='center'>:</div></td>
						              <td width='464' class='nstyle18'>".$rs->nmemiten." Cabang ".$rs->cabang."</td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>Nomor Rekening </td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>".$rs->rekening." a.n. ".$rs->atas_nama."</td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>Jumlah Dana </td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>Rp".number_format($rs->nilai_bayar).",- (diulang Rp".number_format($rs->nilai_bayar).",-) </td>
						            </tr>
						          </table></td>
						        </tr>
						        <tr>
						          <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
						          <td colspan='3'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
						          <td colspan='3' class='nstyle15'> Kepada : </td>
						        </tr>
						        <tr>
						          <td width='23' valign='top' class='nstyle15'>&nbsp;</td>
						          <td colspan='3'><table width='666' border='0' cellspacing='2' cellpadding='0'>
						            <tr>
						              <td width='155' class='nstyle15'>Nama Bank </td>
						              <td width='39' class='nstyle18'><div align='center'>:</div></td>
						              <td width='464' class='nstyle18'>".$rs->nmbank."</td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>Nomor Rekening</td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>".$rs->no_rekening." a.n. ".$rs->nama_rekening." </td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>Jumlah Dana</td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>Rp".number_format($rs->nilai_bayar).",- (diulang Rp".number_format($rs->nilai_bayar).",-) </td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>&nbsp;</td>
						              <td class='nstyle18'>&nbsp;</td>
						              <td class='nstyle18'>&nbsp;</td>
						            </tr>
						            <tr>
						              <td class='nstyle15'>Untuk</td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>".$rs->keterangan."</td>
						            </tr>
									<tr>
						              <td class='nstyle15'>&nbsp;</td>
						              <td class='nstyle18'>&nbsp;</td>
						              <td>&nbsp;</td>
						            </tr>
									<tr>
						              <td class='nstyle15'>Tanggal Pelaksanaan </td>
						              <td class='nstyle18'><div align='center'>:</div></td>
						              <td class='nstyle18'>";if (substr($rs->tglbyr,0,1)!='0'){$html.=substr($rs->tglbyr,0,2);}else{$html.=substr($rs->tglbyr,1,1);}$html.=" ".namaBulan(substr($rs->tglbyr,3,2))." ".substr($rs->tglbyr,6)." (Pagi).</td>
						            </tr>
						          </table></td>
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
						          <td colspan='4'><table width='697' border='0' cellspacing='2' cellpadding='0'>
						            <tr>
						              <td width='300' class='nstyle18'>Hormat kami, </td>
						              <td width='145'>&nbsp;</td>
						              <td width='250'>&nbsp;</td>
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
						              <td class='nstyle18'><u>".strtoupper($rs->nmapp1)."</u> </td>
						              <td>&nbsp;</td>
						              <td class='nstyle18'><u>".strtoupper($rs->nmapp2)."</u> </td>
						            </tr>
						            <tr>
						              <td class='nstyle18'>".$rs->jabapp1." </td>
						              <td>&nbsp;</td>
						              <td class='nstyle18'>".$rs->jabapp2." </td>
						            </tr>
						          </table></td>
						        </tr>
						      </table></td>
						    </tr>
						  </table>
						</div>";											
			
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
