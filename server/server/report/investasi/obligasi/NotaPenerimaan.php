<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
class server_report_investasi_obligasi_NotaPenerimaan
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
				"b.nama as nmbroker,s.no_yakes,c.an_rekening,s.nama_rekening,s.no_rekening,s.cabang as cbg,k1.nama as nmapp1,k1.jabatan as jabapp1, ".
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
					"<div align='center' class='margin'>
					  <table width='750' border='0' cellspacing='0' cellpadding='0'>
					    <tr>
					      <td class='nstyle15'>Nomor : ".$rs->no_dokumen." </td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td class='nstyle15'>Bandung, ";if (substr($rs->tgl,0,1)!='0'){$html.=substr($rs->tgl,0,2);}else{$html.=substr($rs->tgl,1,1);}$html.=" ".namaBulan(substr($rs->tgl,3,2))." ".substr($rs->tgl,6)."</td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td class='nstyle15'>Kepada Yth. </td>
					    </tr>
					    <tr>
					      <td class='nstyle18'>CUSTODIAL SERVICES - ".strtoupper($rs->nama)." u.p. HEAD OF SETTLEMENT</td>
					    </tr>
					    <tr>
					      <td>".$rs->cabang."</td>
					    </tr>
					    <tr>
					      <td>".$rs->alamat."</td>
					    </tr>					    
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td class='nstyle18'>Perihal : Penerimaan Surat Berharga </td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td class='nstyle15'>Dengan hormat, </td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td class='nstyle15' valign='top' align='justify'>Dengan ini kami instruksikan agar Custodial Services - ".$rs->nama." melaksanakan penyelesaian transaksi Surat Berharga untuk Yayasan Kesehatan Telkom (YAKES-TELKOM) dalam kondisi dan ketentuan sebagai berikut : </td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr>
					      <td><table width='750' border='0' cellspacing='0' cellpadding='0'>
					        <tr class='nstyle15'>
					          <td width='21'>1.</td>
					          <td width='309'>Tipe Settlement </td>
					          <td width='27' align='center'>:</td>";
					    if ($rs->tipe=="RVP")
						{
							$html.="<td width='393'>Receive Versus Payment (RVP)</td>";
					    }elseif ($rs->tipe=="FoP")
						{
							$html.="<td width='393'>Free of Payment (FoP)</td>";
						}elseif ($rs->tipe=="RFoP")
						{
							$html.="<td width='393'>Receive Free of Payment (RFoP)</td>";
						}
						$html.="</tr>
					        <tr class='nstyle15' >
					          <td valign='top'>2.</td>";
						if ($rs->tipe=="RVP")
						{	  
					        $html.="<td colspan='3' valign='top' align='justify'>Nama Surat Berharga, Nominal Surat Berharga, Tgl. Transaksi, Tgl. Settlement, Nominal Pembayaran, dan Nama Broker : </td>";
					    }elseif ($rs->tipe=="FoP")
						{
							$html.="<td colspan='3' valign='top' align='justify'>Nama Surat Berharga, Tgl. Transaksi, Tgl. Penerimaan Surat Berharga, dan Nama Broker : </td>";
						}elseif ($rs->tipe=="RFoP")
						{
							$html.="<td colspan='3' valign='top' align='justify'>Nama Surat Berharga, Tgl. Transaksi, Tgl. Penerimaan Surat Berharga, dan Nama Broker : </td>";
						}
						$html.="</tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td colspan='3' class='istyle18'>";
					if ($rs->tipe=="RVP")
					{	
						$html.="<table width='729' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					            <tr align='center' class='istyle18'>
					              <td width='149'><em>Nama Surat Berharga </em></td>
					              <td width='117'><em>Nominal (Rp) </em></td>
					              <td width='80'><em>Tanggal Transaksi </em></td>
					              <td width='80'><em>Tanggal Settlement </em></td>
					              <td width='109'><em>Nominal Pembayaran oleh YAKES-TELKOM (Rp) </em></td>
					              <td width='180'><em>Broker</em></td>
					            </tr>";
						$total=0;		
					    while ($rs1 = $detail->FetchNextObject($toupper=false))
						{
							$html.="<tr valign='top' class='istyle18'>
						              <td>".$rs1->nmobli."</td>
						              <td align='right'>".number_format($rs1->nomsb,0,",",".").",-</td>
						              <td align='center'>".$rs1->tgltransaksi."</td>
						              <td align='center'>".$rs1->tglsettlement."</td>
						              <td align='right'>".number_format($rs1->nominal,0,",",".").",-</td>
						              <td>".$rs1->nmbroker."</td>
						            </tr>";
							$total+=$rs1->nominal;
					    }
						$html.="<tr class='istyle18'>
					              <td colspan='4' align='center'><em>Jumlah Nominal Pembayaran oleh YAKES-TELKOM (Rp) </em></td>
					              <td align='right'><em>".number_format($total,0,",",".").",-</em></td>
					              <td bgcolor='#E4E4E4'>&nbsp;</td>
					            </tr>			            
					          </table>";
					}elseif ($rs->tipe=="RFoP" or $rs->tipe=="FoP")
					{
						$html.="<table width='729' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						            <tr align='center' class='istyle18'>
						              <td width='173'><em>Nama Surat Berharga </em></td>
						              <td width='127'><em>Nominal (Rp) </em></td>
						              <td width='112'><em>Tanggal Transaksi </em></td>
						              <td width='112'><em>Tanggal Settlement </em></td>
						              <td width='193'><em>Nama Broker</em></td>
						            </tr>";
						$total=0;
						while ($rs1 = $detail->FetchNextObject($toupper=false))
						{			
						    $html.="<tr valign='top' class='istyle18'>
						              <td>".$rs1->nmobli."</td>
						              <td align='right'>".number_format($rs1->nomsb,0,",",".").",-</td>
						              <td align='center'>";if (substr($rs->tgltransaksi,0,1)!='0'){$html.=substr($rs->tgltransaksi,0,2);}else{$html.=substr($rs->tgltransaksi,1,1);}$html.=" ".namaBulan(substr($rs->tgltransaksi,3,2))." ".substr($rs->tgltransaksi,6)."</td>
						              <td align='center'>";if (substr($rs->tglsettlement,0,1)!='0'){$html.=substr($rs->tglsettlement,0,2);}else{$html.=substr($rs->tglsettlement,1,1);}$html.=" ".namaBulan(substr($rs->tglsettlement,3,2))." ".substr($rs->tglsettlement,6)."</td>
						              <td>".$rs1->nmbroker."</td>
						            </tr>";
							$total+=$rs1->nomsb;
						}
						$html.="<tr class='istyle18'>
						              <td><em>Jumlah Nominal (Rp) </em></td>
						              <td align='right'><em>".number_format($total,0,",",".").",-</em></td>
						              <td colspan='3' bgcolor='#E4E4E4'>&nbsp;</td>
						              </tr>           
						          </table></td>
						          </tr>
						        <tr>
						          <td rowspan='2'>&nbsp;</td>
						          <td colspan='3' class='istyle18'><em>Catatan : Surat Berharga dari Pasar Perdana (Nota Konfirmasi dan Broker, terlampir)</em></td>
						        </tr>
						        <tr>
						          <td colspan='3' class='nstyle18'>&nbsp;";
					}
						$html.="</td>
					          </tr>
					        <tr class='nstyle15' valign='top'>
					          <td>3.</td>
					          <td>Surat Berharga tersebut dibukukan pada </td>
					          <td align='center'>:</td>
					          <td align='justify'>Kustodian PT ".$rs->nama." A.C. ".$rs->no_yakes." a.n. ".$rs->an_rekening."</td>
					        </tr>";
					if ($rs->tipe=="RVP")	
					{
						$html.="<tr>
					          <td colspan='4'>&nbsp;</td>
					          </tr>
					        <tr class='nstyle15'>
					          <td colspan='4'>Dana untuk settlement pembelian surat berharga secara RVP di atas akan kami transfer ke : </td>
					          </tr>        
					        <tr class='nstyle15'>
					          <td>-</td>
					          <td>Nama Rekening</td>
					          <td align='center'>:</td>
					          <td>".$rs->nama_rekening."</td>
					        </tr>
					        <tr class='nstyle15'>
					          <td>-</td>
					          <td>Nomor Rekening </td>
					          <td align='center'>:</td>
					          <td>".$rs->no_rekening."</td>
					        </tr>
					        <tr class='nstyle15'>
					          <td>-</td>
					          <td>Nama Bank </td>
					          <td align='center'>:</td>
					          <td>".$rs->cbg."</td>
					        </tr>
					      </table></td>
					    </tr>";
					}	
					$html.="<tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr class='nstyle15' valign='top' align='justify'>
					      <td>Demikian disampaikan dan setelah selesai transaksi mohon diinformasilan kepada kami pada kesempatan pertama. Atas perhatian dan kerja sama Saudara kami ucapakan terima kasih. </td>
					    </tr>
					    <tr>
					      <td>&nbsp;</td>
					    </tr>
					    <tr class='nstyle15'>
					      <td>Hormat kami,</td>
					    </tr>
					    <tr class='nstyle18'>
					      <td>YAKES-TELKOM</td>
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
					      <td><table width='750' border='0' cellspacing='0' cellpadding='0'>
					        <tr class='nstyle18'>
					          <td width='282'><u>".strtoupper($rs->nmapp1)."</u></td>
					          <td width='149'>&nbsp;</td>
					          <td width='319'><u>".strtoupper($rs->nmapp2)."</u></td>
					        </tr>
					        <tr class='nstyle18'>
					          <td>".$rs->jabapp1."</td>
					          <td>&nbsp;</td>
					          <td>".$rs->jabapp2."</td>
					        </tr>
					      </table></td>
					    </tr>
					  </table>
					</div><br>";		
			
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
