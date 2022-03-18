<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_obligasi_NotaDinasOb
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
		$sql="select count(distinct s.no_surat) ".
             "from surat_terima s inner join surat_terima_d sd on s.no_surat=sd.no_surat ".
								"inner join custodian c on s.kode_custodi=c.kode_custodi ".
								"inner join pembelian_d p on sd.no_beli=p.no_beli and sd.no_urut=p.no_urut ".
								"inner join obligasi o on p.no_seri=o.no_seri ".
								"inner join broker b on sd.kode_broker=b.kode_broker ".
								"inner join karyawan k1 on s.nik_app1=k1.nik ".
								"inner join karyawan k2 on s.nik_app2=k2.nik ".$this->filter;
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
		$sql0="select distinct s.no_surat ".
              "from surat_terima s inner join surat_terima_d sd on s.no_surat=sd.no_surat ".$this->filter;
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql= "select s.no_surat,s.no_dokumen,convert(varchar,s.tanggal,103) as tgl,c.nama,c.cabang,c.alamat,s.tipe,o.nama as nmobli,p.nominal as nomsb, ".
				"convert(varchar,p.tgl_perolehan,103) as tgltransaksi,convert(varchar,p.tgl_settlement,103) as tglsettlement,sd.nominal, ".
				"b.nama as nmbroker,s.no_yakes,c.an_rekening,s.nama_rekening,s.no_rekening,s.cabang as cbg,k1.nama as nmapp1,k1.jabatan as jabapp1,k1.nik as nikapp1,sd.nominal as biayabeli,sd.pjk_sekuritas as pph, ".
				"k2.nama as nmapp2,k2.jabatan as jabapp2 ".
				"from surat_terima s inner join surat_terima_d sd on s.no_surat=sd.no_surat ".
									"inner join custodian c on s.kode_custodi=c.kode_custodi ".
									"inner join pembelian_d p on sd.no_beli=p.no_beli and sd.no_urut=p.no_urut ".
									"inner join obligasi o on p.no_seri=o.no_seri ".
									"inner join broker b on sd.kode_broker=b.kode_broker ".
									"inner join karyawan k1 on s.nik_app1=k1.nik ".
									"inner join karyawan k2 on s.nik_app2=k2.nik ".$this->filter.
									" and s.no_surat='".$page->fields[0]."' ";
	        //error_log($sql);
			
			$temp=$dbLib->execute($sql);
			$detail=$dbLib->execute($sql);
			$rs = $temp->FetchNextObject($toupper=false);			
				$html = "<br><br><br>";
				$html .=
						"<div align='center'>
						  <table width='800' border='0' cellspacing='0' cellpadding='0'>
						    <tr>
						      <td align='right' class='nstyle17'>Nota Dinas </td>
						    </tr>
						    <tr>
						      <td>&nbsp;</td>
						    </tr>
						    <tr>
						      <td><table width='796' border='0' cellpadding='0' cellspacing='3'>
						        <tr class='nstyle15'>
						          <td width='89'>Nomor</td>
						          <td width='29' align='center'>:</td>
						          <td width='706'>".$rs->no_dokumen."</td>
						        </tr>
						        <tr>
						          <td class='nstyle15'>Kepada</td>
						          <td class='nstyle15' align='center'>:</td>
						          <td class='nstyle18'>Sdr. MANAJER PERBENDAHARAAN </td>
						        </tr>
						        <tr>
						          <td class='nstyle15'>Dari</td>
						          <td class='nstyle15' align='center'>:</td>
						          <td class='nstyle15'>".strtoupper($rs->jabapp1)."</td>
						        </tr>
						        <tr>
						          <td class='nstyle15'>Lampiran</td>
						          <td class='nstyle15' align='center'>:</td>
						          <td class='nstyle15'>1 (satu) berkas</td>
						        </tr>
						        <tr>
						          <td class='nstyle15'>Perihal</td>
						          <td class='nstyle15' align='center'>:</td>";
						if ($rs->tipe=="RVP")
						{
							$html.="<td class='nstyle15'>Transfer Dana untuk Pembelian Surat Berharga</td>";
							$temp="Surat Berharga";
						}elseif ($rs->tipe=="RFoP" or $rs->tipe=="FoP")
						{
							$html.="<td class='nstyle15'>Transfer Dana untuk Pembelian Obligasi</td>";
							$temp="Obligasi";
						}
							$html.="</tr>
						      </table></td>
						    </tr>
						    <tr>
						      <td>&nbsp;</td>
						    </tr>
						    <tr>
						      <td>&nbsp;</td>
						    </tr>
						    <tr>
						      <td><table width='795' border='0' cellspacing='3' cellpadding='0'>
						        <tr class='nstyle15'>
						          <td width='18' height='24' valign='top' >1.</td>
						          <td width='768' colspan='2' align='justify'>Sehubungan pembelian ".$temp." oleh YAKES-TELKOM, dimohon bantuan Saudara untuk mentransfer dana dengan kondisi dan ketentuan sebagai berikut :</td>
						        </tr>
						        <tr>
						          <td>&nbsp;</td>
						          <td colspan='2'>&nbsp;</td>
						        </tr>
						        <tr>
						          <td>&nbsp;</td>
						          <td colspan='2' class='nstyle15'>";
						if ($rs->tipe=="RVP")
						{	
							$html.="<table width='765' border='0' cellspacing='0' cellpadding='0'>
						            <tr class='nstyle15'>
						              <td width='28'>a.</td>
						              <td width='281'>Tipe Settlement</td>
						              <td width='26' align='center'>:</td>
						              <td width='430'>Receive Versus Payment (RVP) </td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>b.</td>
						              <td>Tanggal Transaksi </td>
						              <td align='center'>:</td>
						              <td>";if (substr($rs->tgltransaksi,0,1)!='0'){$html.=substr($rs->tgltransaksi,0,2);}else{$html.=substr($rs->tgltransaksi,1,1);}$html.=" ".namaBulan(substr($rs->tgltransaksi,3,2))." ".substr($rs->tgltransaksi,6)."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>c.</td>
						              <td>Tanggal Pembayaran </td>
						              <td align='center'>:</td>
						              <td>";if (substr($rs->tglsettlement,0,1)!='0'){$html.=substr($rs->tglsettlement,0,2);}else{$html.=substr($rs->tglsettlement,1,1);}$html.=" ".namaBulan(substr($rs->tglsettlement,3,2))." ".substr($rs->tglsettlement,6)."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>d.</td>
						              <td>Tanggal Penerimaan </td>
						              <td align='center'>:</td>
						              <td>";if (substr($rs->tglsettlement,0,1)!='0'){$html.=substr($rs->tglsettlement,0,2);}else{$html.=substr($rs->tglsettlement,1,1);}$html.=" ".namaBulan(substr($rs->tglsettlement,3,2))." ".substr($rs->tglsettlement,6)."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>e.</td>
						              <td colspan='3'>Nama dan nominal Surat Berharga yang dibeli, nominal pembayaran, dan nama broker : </td>
						              </tr>
						            <tr>
						              <td colspan='4'><table width='765' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						                <tr align='center' class='istyle18'>
						                  <td width='142'>Nama Surat Berharga </td>
						                  <td width='108'>Nominal Surat Berharga (Rp) </td>
						                  <td width='108'>Nominal Biaya Pembelian (Rp) </td>
						                  <td width='108'>PPh Capital Gain Broker (Rp) </td>
						                  <td width='108'>Nominal Pembayaran kpd Broker (Rp) </td>
						                  <td width='177'>Broker </td>
						                </tr>
						                <tr align='center' class='istyle18'>
						                  <td><em>1</em></td>
						                  <td width='108'><em>2</em></td>
						                  <td width='108'><em>3</em></td>
						                  <td width='108'><em>4</em></td>
						                  <td><em>5=3-4</em></td>
						                  <td><em>6</em></td>
						                </tr>";
						        $tot1=$tot2=$tot3=$tot4=0;
								while ($rs1 = $detail->FetchNextObject($toupper=false))
								{    
									$html.="<tr class='istyle15' valign='top'>
						                  <td>".$rs1->nmobli."</td>
						                  <td align='right'>".number_format($rs1->nomsb,0,",",".")."</td>
						                  <td align='right'>".number_format($rs1->biayabeli,0,",",".")."</td>";
									if ($rs1->pph==0)
									{
										$html.="<td align='right'>-</td>";
						            }else
									{
										$html.="<td align='right'>".number_format($rs1->pph,0,",",".")."</td>";
									}
									$html.="<td align='right'>".number_format($rs1->biayabeli-$rs1->pph,0,",",".")."</td>
						                  <td>".$rs1->nmbroker."</td>
						                </tr>";
									$tot1+=$rs1->nomsb;
									$tot2+=$rs1->biayabeli;
									$tot3+=$rs1->pph;
									$tot4+=$rs1->biayabeli-$rs1->pph;
								}    
									$html.="<tr class='istyle18'>
						                  <td height='17'>Total</td>
						                  <td height='17' align='right'>".number_format($tot1,0,",",".")."</td>
						                  <td height='17' align='right'>".number_format($tot2,0,",",".")."</td>
						                  <td align='right'>".number_format($tot3,0,",",".")."</td>
						                  <td align='right'>".number_format($tot4,0,",",".")."</td>
						                  <td bgcolor='#E4E4E4'>&nbsp;</td>
						                </tr>
						              </table></td>
						              </tr>
						            <tr class='nstyle15'>
						              <td>f.</td>
						              <td colspan='3'>Pembayaran untuk tipe settlement Receive Versus Payment (RVP) ini dialamatkan kepada : </td>
						              </tr>
						            <tr class='nstyle15'>
						              <td>&nbsp;</td>
						              <td>1) Nama Penerima </td>
						              <td align='center'>:</td>
						              <td>".$rs->nama_rekening."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>&nbsp;</td>
						              <td>2) Nama Bank/Cabang </td>
						              <td align='center'>:</td>
						              <td>".$rs->cbg."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>&nbsp;</td>
						              <td>3) Nomor Rekening </td>
						              <td align='center'>:</td>
						              <td>".$rs->no_rekening."</td>
						            </tr>
						            <tr class='nstyle15'>
						              <td>g.</td>
						              <td>Tanggal pembayaran (good fund) </td>
						              <td align='center'>:</td>
						              <td>";if (substr($rs->tglsettlement,0,1)!='0'){$html.=substr($rs->tglsettlement,0,2);}else{$html.=substr($rs->tglsettlement,1,1);}$html.=" ".namaBulan(substr($rs->tglsettlement,3,2))." ".substr($rs->tglsettlement,6)." (Pagi)</td>
						            </tr>
						          </table></td>
						        </tr>						        
						        <tr>
						          <td>&nbsp;</td>
						          <td colspan='2'>&nbsp;</td>
						        </tr>
						        <tr class='nstyle15'>
						          <td valign='top'>2.</td>
						          <td colspan='2' align='justify'>Bila terdapat kewajiban pajak Broker sehubungan dengan transaksi ini, pada waktunya dimohon pula bantuan Saudara untuk memproses dan menyelesaikannya berdasarkan peraturan perundangan-undangan yang berlaku. </td>
						        </tr>";
								$urut=3;
						}else
						{
							$urut=2;
							$html.="<table width='768' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						            <tr align='center' class='istyle18'>
						              <td width='23' rowspan='2'><em>No</em></td>
						              <td width='134' rowspan='2'><em>Nama Obligasi</em></td>
						              <td width='104' rowspan='2'><em>Nama Broker </em></td>
						              <td width='103' rowspan='2'><em>Jumlah Pembayaran (Rp) </em></td>
						              <td colspan='3'><em>Alamat Pembayaran </em></td>
						              <td width='80' rowspan='2'><em>Tanggal Pembayaran </em></td>
						            </tr>
						            <tr align='center' class='istyle18'>
						              <td><em>Nama Penerima </em></td>
						              <td><em>Nama Bank/Cabang </em></td>
						              <td><em>Nomor Rekening </em></td>
						            </tr>";
						    $l=1;
							while ($rs1 = $detail->FetchNextObject($toupper=false))
							{
								$html.="<tr class='istyle15' valign='top'>
						              <td align='center'>".$l."</td>
						              <td>Danareksa III Tahun 2008 Seri C </td>
						              <td>PT Danareksa Sekuritas </td>
						              <td  align='right'>3.000.000.000,-</td>
						              <td width='90'>PT Danareksa Sekuritas </td>
						              <td width='106'>Bank Mandiri, Cabang Jakarta Sabang </td>
						              <td width='110' align='center'>103.0004173155</td>
						              <td align='center'>dd Jun 2008 </td>
						            </tr>";
								$i++;
						    }    
								$html.="<tr class='istyle18'>
						              <td colspan='3' align='center'><em>Total Pembayaran (Rp) </em></td>
						              <td align='right'><em>11.000.000.000,-</em></td>
						              <td colspan='4' bgcolor='#E4E4E4'>&nbsp;</td>
						              </tr>
						          </table></td>
						        </tr>";							
						}
						
							$html.="<tr class='nstyle15'>
						          <td valign='top'>&nbsp;</td>
						          <td colspan='2' align='justify'>&nbsp;</td>
						        </tr>
						        <tr class='nstyle15'>
						          <td valign='top'>".$urut.".</td>
						          <td colspan='2' align='justify'>Berkas/dokumen yang berkaitan dengan pembelian obligasi dimaksud, kami lampirkan.</td>
						        </tr>
						        <tr>
						          <td>&nbsp;</td>
						          <td colspan='2'>&nbsp;</td>
						        </tr>
						        <tr class='nstyle15'>
						          <td valign='top'>".($urut+1)."..</td>
						          <td colspan='2' align='justify'>Demikian kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja samanya diucapkan terima kasih. </td>
						        </tr>
						        <tr>
						          <td colspan='3'>&nbsp;</td>
						        </tr>
						        
						      </table></td>
						    </tr>
						    <tr>
						      <td>&nbsp;</td>
						    </tr>
						    <tr class='nstyle15'>
						      <td>Bandung, ";if (substr($rs->tgl,0,1)!='0'){$html.=substr($rs->tgl,0,2);}else{$html.=substr($rs->tgl,1,1);}$html.=" ".namaBulan(substr($rs->tgl,3,2))." ".substr($rs->tgl,6)." </td>
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
						    <tr class='nstyle18'>
						      <td><u>".strtoupper($rs->nmapp1)."</u></td>
						    </tr>
						    <tr class='nstyle18'>
						      <td>NIK. ".$rs->nikapp1." </td>
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
