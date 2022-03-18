<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptDepoCair2
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
		list($modul,$cair)=split(";",$this->filter2);
		$sql="select count(*) ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.cnik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
			if ($modul == "DEPO_NP")
			{
				if ($cair == "P")
				{
					$sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPC_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}else
				{
					$sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPCSB_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}					
			}else
			{
				if ($cair == "P")
				{
					$sql.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink='-' ";
				}else
				{
					$sql.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink<>'-' ";
				}
			}
			        $sql.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter;

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
		list($modul, $cair)=split(";",$this->filter2);
		$sql0="select distinct d.no_depo ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.cnik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
			if ($modul == "DEPO_NP")
			{
				if ($cair == "P")
				{
					$sql0.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPC_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}else
				{
					$sql0.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPCSB_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}					
			}else
			{
				if ($cair == "P")
				{
					$sql0.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink='-' ";
				}else
				{
					$sql0.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink<>'-' ";
				}
			}
			        $sql0.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter;

		$start = (($this->page-1) * $this->rows);	
	    global $dbLib;
	    $page=$dbLib->LimitQuery($sql0,$this->rows,$start);			
		$AddOnLib=new server_util_AddOnLib();

		while ($row = $page->FetchNextObject($toupper=false))
		{
		$sql="select d.no_depo,date_format(d.ctgl_just,'%d-%m-%Y') as tgltlp,date_format(d.due_date,'%d-%m-%Y') as tglakhir,d.bank, ".
			"d.cabang,d.rate,d.csurat,d.cnilai,d.nilai,d.cjam,c.skode,d.cpic_bank,d.cpic_karyawan,k.nama as nmapp,k.jabatan as jabapp, ".
			"b.nama as nm1,b.no_rek as norek1,b.nama_rek as nmrek1,b2.nama as nm2,b2.no_rek as norek2,b2.nama_rek as nmrek2,dayname(d.due_date) as hari,d.no_depolink ".
			"from depo_m d inner join curr c on d.kode_curr=c.kode_curr ".
			              "inner join karyawan k on d.cnik_setuju=k.nik and d.kode_lokasi=k.kode_lokasi ";
			if ($modul == "DEPO_NP")
			{
				if ($cair == "P")
				{
					$sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPC_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}else
				{
					$sql.="inner join kas_m km on d.no_depo=km.ref1 and d.kode_lokasi=km.kode_lokasi and km.modul='DEPCSB_NP' ".
			              "inner join bank2 b on km.akun_kb=b.kode_akun and km.kode_lokasi=b.kode_lokasi ";
				}					
			}else
			{
				if ($cair == "P")
				{
					$sql.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink='-' ";
				}else
				{
					$sql.="inner join bank2 b on d.cakun_kb=b.kode_akun and d.kode_lokasi=b.kode_lokasi and d.no_depolink<>'-' ";
				}
			}
			        $sql.="inner join bank2 b2 on d.akun_cbunga=b2.kode_akun and d.kode_lokasi=b2.kode_lokasi ".$this->filter.
						  " and d.no_depo='".$row->no_depo."' ";
		$rs=$dbLib->execute($sql);
		$row1 = $rs->FetchNextObject($toupper=false);

		if ($cair == "S")
		{
			$sql2="select d.no_depo,d.jk_waktu,date_format(d.tanggal,'%d-%m-%Y') as tglawal,date_format(d.due_date,'%d-%m-%Y') as tglakhir,d.rate,d.nilai ".
				"from depo_m d ".
				"where d.no_depo='".$row1->no_depolink."'";
			$rs2=$dbLib->execute($sql2);
			$row2 = $rs2->FetchNextObject($toupper=false);
		}
		
		$html="<br>";
		$html.= "<div align='center'>
				  <table width='500' border='0' cellspacing='0' cellpadding='0'>";
		if ($cair == "P")
		{
			$html.= "<tr>
				      <td colspan='3' align='center' class='istyle16'>KEPUTUSAN PENCAIRAN</td>
				    </tr>";
		}else
		{
			$html.= "<tr>
				      <td colspan='3' align='center' class='istyle16'>KEPUTUSAN PENCAIRAN & PENEMPATAN KEMBALI</td>
				    </tr>";
		}
			$html.= "<tr>
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
				              <td>".$row1->cabang."</td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Dari</td>
				              <td align='center'>:</td>
				              <td>YAYASAN PENIDIDIKAN TELKOM </td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Nomor</td>
				              <td align='center'>:</td>
				              <td>".$row1->csurat."</td>
				            </tr>
				            <tr class='istyle15'>
				              <td>Perihal</td>
				              <td align='center'>:</td>";
				if ($cair == "P")
				{				
					$html.= "<td>PENCAIRAN DANA DEPOSITO</td>";
				}else
				{
					$html.= "<td>PENCAIRAN & PENEMPATAN KEMBALI DANA DEPOSITO</td>";
				}
					$html.= "</tr>
				          </table></td>
				        </tr>
				      </table></td>
				    </tr>";				    
				if ($cair == "P")	
				{	
					$html.="<tr class='istyle15' valign='top'>
				      <td align='center'>1.</td>
				      <td colspan='2' align='justify'>Meneguhkan pembicaraan telepon pada tanggal ";
					if (substr($row1->tgltlp,0,1)!='0'){$html.=substr($row1->tgltlp,0,2);}else{$html.=substr($row1->tgltlp,1,1);}$html.=" ".namaBulan(substr($row1->tgltlp,3,2))." ".substr($row1->tgltlp,6).", pukul ".$row1->cjam." WIB antara pejabat/petugas Saudara (".$row1->cpic_bank.") dengan pejabat/petugas kami (".$row1->cpic_karyawan.") dengan ini telah disepakati untuk mencairkan Dana Deposito Berjangka yang jatuh tempo pada hari ".$AddOnLib->ubahNamaHari($row1->hari)." tanggal  ";
					if (substr($row1->tglakhir,0,1)!='0'){$html.=substr($row1->tglakhir,0,2);}else{$html.=substr($row1->tglakhir,1,1);}$html.=" ".namaBulan(substr($row1->tglakhir,3,2))." ".substr($row1->tglakhir,6)." sebesar ".$row1->skode.". ".number_format($row1->nilai,0,",",".").",- (".$AddOnLib->terbilang($row1->nilai)."). </td></tr>";
				}else
				{
					$html.="<tr class='istyle15' valign='top'>
				      <td align='center'>1.</td>
				      <td colspan='2' align='justify'>Meneguhkan pembicaraan telepon pada tanggal ";
					if (substr($row1->tglakhir,0,1)!='0'){$html.=substr($row1->tglakhir,0,2);}else{$html.=substr($row1->tglakhir,1,1);}$html.=" ".namaBulan(substr($row1->tglakhir,3,2))." ".substr($row1->tglakhir,6).", pukul ".$row1->cjam." WIB antara pejabat/petugas Saudara (".$row1->cpic_bank.") dengan pejabat/petugas kami (".$row1->cpic_karyawan.") dengan ini telah disepakati untuk mencairkan Dana Deposito Berjangka yang jatuh tempo pada hari ".$AddOnLib->ubahNamaHari($row1->hari)." tanggal  ";
					if (substr($row1->tglakhir,0,1)!='0'){$html.=substr($row1->tglakhir,0,2);}else{$html.=substr($row1->tglakhir,1,1);}$html.=" ".namaBulan(substr($row1->tglakhir,3,2))." ".substr($row1->tglakhir,6)." sebesar ".$row1->skode.". ".number_format($row1->nilai,0,",",".").",- (".$AddOnLib->terbilang($row1->nilai).") dengan ketentuan sebagai berikut :</td></tr>";				
					$html.="<tr>
						      <td>&nbsp;</td>
						      <td colspan='2'><table width='481' border='0' cellspacing='1' cellpadding='1'>
								  <tr class='istyle15'>
									<td colspan='2' align='right'>&nbsp;</td>
								  </tr>
								  <tr class='istyle15' valign='top'>
									<td width='20'>a.</td>
									<td width='454' align='justify'>Sebesar ".$row1->skode.". ".number_format($row1->cnilai,0,",",".").",- (".$AddOnLib->terbilang($row1->cnilai).") mohon untuk ditransfer (RTGS) ke ".$row1->nm1." Nomor Rekening : ".$row1->norek1." atas nama ".$row1->nmrek1.".</td>
								  </tr>
								  <tr class='istyle15'>
									<td colspan='2' align='right'>&nbsp;</td>
								  </tr>
								  <tr class='istyle15' valign='top'>
									<td>b.</td>
									<td align='justify'>Sebesar ".$row1->skode.". ".number_format($row2->nilai,0,",",".").",- (".$AddOnLib->terbilang($row2->nilai).") mohon ditempatkan kembali pada Deposito Berjangka untuk : </td>
								  </tr>
								  <tr class='istyle15' valign='top'>
									<td>&nbsp;</td>
									<td><table width='450' border='0' cellspacing='1' cellpadding='1'>
									  <tr class='istyle15'>
										<td width='8' align='center'>-</td>
										<td width='105'>Jangka Waktu </td>
										<td width='38' align='center'>:</td>
										<td width='237'>".$row2->jk_waktu."</td>
									  </tr>
									  <tr class='istyle15'>
										<td align='center'>-</td>
										<td>Terhitung Tanggal </td>
										<td align='center'>:</td>
										<td>".$row2->tglawal." s/d ".$row2->tglakhir."</td>
									  </tr>
									  <tr class='istyle15' valign='top'>
										<td align='center'>-</td>
										<td>Suku Bunga </td>
										<td align='center'>:</td>
										<td>".number_format($row2->rate,2,",",".")."%</td>
									  </tr>
									</table></td>
								  </tr>
								</table></td>
						    </tr>";
				}
			$html.="<tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>";
			if ($cair == "P")	
			{	    
				$html.="<tr class='istyle15' valign='top'>
				      <td align='center'>2.</td>
				      <td colspan='2' align='justify'>Sehubungan dengan hal tersebut di atas kami mohon bantuan Saudara untuk mentrasfer (RTGS) Dana tersebut ke ".$row1->nm1." Nomor Rekening : ".$row1->norek1." atas nama ".$row1->nmrek1."</td>
				    </tr>				   
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>3.</td>
				      <td colspan='2' align='justify' >Bunga Deposito mohon ditransfer ke rekening giro nomor ".$row1->norek2." pada ".$row1->nm2." atas nama ".$row1->nmrek2.". </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>4.</td>
				      <td colspan='2' align='justify'>Demikian agar maklum dan atas kerjasamanya kami ucapkan terima kasih. </td>
				    </tr>";
			}else
			{
				$html.="<tr class='istyle15' valign='top'>
				      <td align='center'>2.</td>
				      <td colspan='2' align='justify' >Bunga Deposito mohon ditransfer ke rekening giro nomor ".$row1->norek2." pada ".$row1->nm2." atas nama ".$row1->nmrek2.". </td>
				    </tr>
				    <tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>
				    <tr class='istyle15' valign='top'>
				      <td align='center'>3.</td>
				      <td colspan='2' align='justify'>Demikian agar maklum dan atas kerjasamanya kami ucapkan terima kasih. </td>
				    </tr>";
			}
			$html.= "<tr>
				      <td>&nbsp;</td>
				      <td colspan='2'>&nbsp;</td>
				    </tr>";				    
			if ($cair == "P")	
			{	    
				$html.="<tr>
				      <td colspan='3' class='istyle15'>Bandung, ";
					if (substr($row1->tgltlp,0,1)!='0'){$html.=substr($row1->tgltlp,0,2);}else{$html.=substr($row1->tgltlp,1,1);}$html.=" ".namaBulan(substr($row1->tgltlp,3,2))." ".substr($row1->tgltlp,6).".</td>
				    </tr>";
			}else
			{
				$html.="<tr>
				      <td colspan='3' class='istyle15'>Bandung, ";
					if (substr($row1->tglakhir,0,1)!='0'){$html.=substr($row1->tglakhir,0,2);}else{$html.=substr($row1->tglakhir,1,1);}$html.=" ".namaBulan(substr($row1->tglakhir,3,2))." ".substr($row1->tglakhir,6).".</td>
				    </tr>";
			}
			$html.="<tr>
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
				          <td width='301' align='center'>".strtoupper($row1->jabapp).", </td>
				        </tr>
				        <tr>
				          <td height='65'>&nbsp;</td>
				        </tr>
				        <tr>
				          <td align='center' class='istyle18'>".strtoupper($row1->nmapp)."</td>
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
