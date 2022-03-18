<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptDepoTempat2
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
		global $dbLib;
		$sql="select count(*) ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.nik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
		if ($this->filter2 == "DEPO_NP")
		{
			        $sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPO_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
		}else
		{
					$sql.="inner join bank2 b on d.akun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.modul='DEPO_P' ";
		}
					$sql.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter;
		//error_log($sql);
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
		global $dbLib;
		$sql0="select distinct d.no_depo ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.nik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
		if ($this->filter2 == "DEPO_NP")
		{
			        $sql0.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPO_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
		}else
		{
					$sql0.="inner join bank2 b on d.akun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.modul='DEPO_P' ";
		}
					$sql0.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter;

		$start = (($this->page-1) * $this->rows);	
	    global $dbLib;
	    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);			
		$AddOnLib=new server_util_AddOnLib();
				
		while ($row = $page->FetchNextObject($toupper=false))
		{
		$sql="select d.no_dokumen,date_format(d.tanggal,'%d-%m-%Y') as tglawal,date_format(d.due_date,'%d-%m-%Y') as tglakhir,d.bank, ".
			"d.cabang,d.rate,d.keterangan,d.catatan,d.nilai,d.jam,d.jk_waktu,c.skode,k.nama as nmkar,k.jabatan,d.pic_bank,d.pic_karyawan,b.nama as nm1, ".
			"b.nama_rek as nmrek,b2.nama as nm2,b2.no_rek,b2.nama_rek as nmrek2 ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.nik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
		if ($this->filter2 == "DEPO_NP")
		{
			        $sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPO_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
		}else
		{
					$sql.="inner join bank2 b on d.akun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.modul='DEPO_P' ";
		}
					$sql.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter.
						  " and d.no_depo='".$row->no_depo."' ";

		$rs=$dbLib->execute($sql);
		$row1 = $rs->FetchNextObject($toupper=false);

		$html="<br>";
		$html.= "<div align='center'>
				  <table width='500' border='0' cellspacing='0' cellpadding='0'>
				    <tr>
				      <td colspan='3' align='center' class='istyle16'>KEPUTUSAN PENEMPATAN</td>
				    </tr>
				    <tr>
				      <td width='23'>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='3'><table width='500' border='0' cellspacing='0' cellpadding='0'>
				        <tr>
				          <td width='178'><img src='image/ypt.jpg' width='178' height='43'/></td>
				          <td width='157'>&nbsp;</td>
				          <td width='165' align='center'><table width='165' height='37' border='1' cellpadding='0' cellspacing='0' class='kotak'>
				            <tr>
				              <td width='192' height='29' align='center' class='istyle16'>NOTA FACSIMILI</td>
				            </tr>
				          </table></td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td width='221' class='istyle15'>JL. HEGARMANAH NO. 71 BANDUNG</td>
				      <td width='256' class='istyle15'><table width='256' border='0' cellspacing='0' cellpadding='0'>
				          <tr class='istyle15'>
				            <td width='144'>TELP (022) 2043955 - 56</td>
				            <td width='112'>FAX. (022) 2043957 </td>
				          </tr>
				        </table></td>
				    </tr>
				    <tr>
				      <td height='9' colspan='3'><img src='image/LINE.jpg' width='500' height='9' /></td>
				    </tr>
				    <tr>
				      <td height='103' colspan='3' align='center'><table width='476' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				        <tr>
				          <td width='447'><table width='462' border='0' cellspacing='0' cellpadding='1'>
				            <tr class='istyle15'>
				              <td width='58'>Kepada</td>
				              <td width='57' align='center'>:</td>
				              <td width='341'>Yth. SAUDARA PIMPINAN BANK ".$row1->bank."</td>
				            </tr>
				            <tr class='istyle15'>
				              <td>&nbsp;</td>
				              <td>&nbsp;</td>
				              <td>Jl. ".$row1->cabang." Bandung</td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Dari</td>
				              <td align='center'>:</td>
				              <td>YAYASAN PENIDIDIKAN TELKOM </td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Nomor</td>
				              <td align='center'>:</td>
				              <td>".$row1->catatan."</td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Perihal</td>
				              <td align='center'>:</td>
				              <td>".$row1->keterangan."</td>
				            </tr>
				          </table></td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>1.</td>
				      <td colspan='2' align='justify'>Meneguhkan pembicaraan telepon pada tanggal ";
					if (substr($row1->tglawal,0,1)!='0'){$html.=substr($row1->tglawal,0,2);}else{$html.=substr($row1->tglawal,1,1);}$html.=" ".namaBulan(substr($row1->tglawal,3,2))." ".substr($row1->tglawal,6).", pukul ".$row1->jam." WIB antara pejabat/petugas Saudara (".$row1->pic_bank.") dengan pejabat/petugas kami (".$row1->pic_karyawan.") dengan ini telah disepakati bahwa suku bunga untuk penempatan Dana Deposito Berjangka pada Bank Saudara sebesar ".number_format($row1->rate,2,",",".")."% (sesuai dengan penjaminan BI). </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>2.</td>
				      <td colspan='2' align='justify'>Sehubungan dengan hal tersebut di atas kami bermaksud untuk menempatkan Dana Deposito sebesar ".$row1->skode.". ".number_format($row1->nilai,0,",",".").",- (".$AddOnLib->terbilang($row1->nilai)."), untuk : </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'><table width='481' border='0' cellspacing='1' cellpadding='1'>
				        <tr class='istyle15'>
				          <td width='10' align='right'>-</td>
				          <td width='107'>Jangka Waktu </td>
				          <td width='53' align='center'>:</td>
				          <td width='298'>".$row1->jk_waktu."</td>
				        </tr>
				        <tr class='istyle15'>
				          <td align='right'>-</td>
				          <td>Terhitung Tanggal </td>
				          <td align='center'>:</td>
				          <td>".$row1->tglawal." s/d ".$row1->tglakhir."</td>
				        </tr>
				        <tr class='istyle15' valign='top'>
				          <td align='right'>-</td>
				          <td>Dana Berasal dari </td>
				          <td align='center'>:</td>
				          <td>".$row1->nm1." atas nama ".$row1->nmrek."</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>3.</td>
				      <td colspan='2' align='justify' >Bunga Deposito mohon ditransfer ke rekening giro nomor ".$row1->no_rek." pada ".$row1->nm2." atas nama ".$row1->nmrek2.". </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>4.</td>
				      <td colspan='2' align='justify'>Demikian agar maklum dan atas kerjasamanya kami ucapkan terima kasih. </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    
				    <tr>
				      <td colspan='3' class='istyle15'>Bandung, ";
					if (substr($row1->tglawal,0,1)!='0'){$html.=substr($row1->tglawal,0,2);}else{$html.=substr($row1->tglawal,1,1);}$html.=" ".namaBulan(substr($row1->tglawal,3,2))." ".substr($row1->tglawal,6).". </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr>
				      <td colspan='3'><table width='499' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle15'>
				          <td width='57'>a.n. </td>
				          <td width='442'>DEWAN PENGURUS </td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;</td>
				          <td>YAYASAN PENDIDIKAN DAN LATIHAN </td>
				        </tr>
				        <tr class='istyle15'>
				          <td>&nbsp;</td>
				          <td>MANAJEMEN DAN TEKNOLOGI TELEKOMUNIKASI </td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td colspan='3'><table width='343' border='0' cellspacing='0' cellpadding='0'>
				        <tr class='istyle15'>
				          <td width='42' rowspan='3'>&nbsp;</td>
				          <td width='301' align='center'>".strtoupper($row1->jabatan).", </td>
				        </tr>
				        <tr>
				          <td height='65'>&nbsp;</td>
				        </tr>
				        <tr>
				          <td align='center' class='istyle18'>".strtoupper($row1->nmkar)."</td>
				        </tr>
				      </table></td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				  </table>
				</div>";
				
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
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
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
