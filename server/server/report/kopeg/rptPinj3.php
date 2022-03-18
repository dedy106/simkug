<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptPinj3
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(distinct a.no_pinj) ".
			"from kop_pinj_m a ".$this->filter2;
		$rs = $dbLib->execute($sql);
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);
		}
		return $totPage;
	}
	function getHtml($resultType = null)
	{
		$sql0="select distinct a.no_pinj ".
              "from kop_pinj_m a ".$this->filter2;
		$result = new server_util_arrayList();
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		$filter=explode("//",$this->filter);
		$sql2 = "select a.nik, upper(a.nama) as nm, a.jabatan, b.nik as nik2, upper(b.nama) as nm2, b.jabatan  as jabatan2
			from karyawan a inner join karyawan b on b.kode_lokasi = a.kode_lokasi and b.jabatan = 'SEKRETARIS' 
			where a.kode_lokasi='".$filter[1]."' and a.jabatan='KETUA' ";
		$gm=$dbLib->execute($sql2);		
		$getGM=$gm->FetchNextObject($toupper=false);			
		while (!$page->EOF)
		{			
			$sql = "select a.kode_agg,upper(b.nama) as nm,a.no_kontrak,a.no_pinj, date_format(a.tanggal,'%W/%M/%d/%m/%Y/%Y%m') as tglskrg,a.nilai,
				a.nilai_prov,a.nilai_asur,a.p_bunga,a.lama_bayar,date_format(max(c.tgl_angs),'%Y/%m/%d') as tglend,
				date_format(min(c.tgl_angs),'%Y/%m/%d') as tglawl,a.nik_app,upper(d.nama) as nmapp,
				case when a.jenis_angs='F' then 'flat' else 'anuitas' end as jnsangs,a.no_mou,a.nilai_tagihan,a.jenis_angs,
				e.nama as loker,b.alamat,b.kota,b.kode_pos,sum(c.nbunga) as jasa,sum(c.npokok) as pokok
				from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
				inner join kop_pinj_sch c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join lokasi l on l.kode_lokasi = a.kode_lokasi 				
				inner join kop_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi ".$filter[0].
				" and a.no_pinj='".$page->fields[0]."' group by a.kode_agg, b.nama, a.no_kontrak, a.no_pinj, a.nilai, a.nilai_prov, 
				a.nilai_asur, a.p_bunga, a.lama_bayar, a.nik_app, d.nama, a.jenis_angs, a.no_mou, a.nilai_tagihan, e.nama, e.alamat, e.kodepos order by a.no_pinj ";
			
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);						
			if ($rs->jenis_angs == 'A')
				$html = $this->kontrakExtern($rs,$getGM);
			else $html = $this->kontrakIntern($rs,$getGM);
			if ($resultType != null){
				$result->add($html = str_replace(chr(9),"",$html));
				$result->add($this->suratKuasa($rs,$getGM));
				$result->add($this->schAngsuran($rs,$getGM));
			}
			$page->MoveNext();
		}
		$html = str_replace(chr(9),"",$html);
		if ($resultType != null)
			return $result;
		else  return $html;
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
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
	function kontrakExtern($rs, $getGM){
		$AddOnLib=new server_util_AddOnLib();
		$now=explode("/",$rs->tglskrg);			
		$awal=explode("/",$rs->tglawl);
		$akhir=explode("/",$rs->tglend);
		$tgl=explode(" Rupiah",$AddOnLib->terbilang($now[2]));
		$bln=explode(" Rupiah",$AddOnLib->terbilang($now[3]));
		$thn=explode(" Rupiah",$AddOnLib->terbilang($now[4]));
		
		$tgl2=explode(" Rupiah",$AddOnLib->terbilang($awal[2]));
		$bln2=explode(" Rupiah",$AddOnLib->terbilang($awal[1]));
		$thn2=explode(" Rupiah",$AddOnLib->terbilang($awal[0]));
		
		$tgl3=explode(" Rupiah",$AddOnLib->terbilang($akhir[2]));
		$bln3=explode(" Rupiah",$AddOnLib->terbilang($akhir[1]));
		$thn3=explode(" Rupiah",$AddOnLib->terbilang($akhir[0]));
		
		$lmbyr=explode(" Rupiah",$AddOnLib->terbilang($rs->lama_bayar));			
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/bismillah.gif";
		$html ="<br />";
		$html .= "<table width='680' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
						  <td colspan='2' align='center' class='istyle16'>PERJANJIAN PEMBIAYAAN</td>
					  </tr>
					  <tr>
						  <td colspan='2' align='center' class='istyle16'>AL-MURABAHAH</td>
					  </tr>
					  <tr>
						  <td colspan='2' align='center' class='istyle16'>Nomor : $rs->no_pinj</td>
					  </tr>
					  <tr>
						  <td colspan='2' height='32' align='center' valign='top' class='istyle16' style='border-bottom:2px solid #111111'><img src='$pathfoto' width='200' height='30' /></td>						  
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr >
						  <td colspan='2' align='justify' class='istyle15'>Pada hari ini ".$AddOnLib->ubahNamaHari($now[0])." tanggal ".$tgl[0]." bulan ".$bln[0]." tahun ".$thn[0].", bertempat di kantor KOPEGTEL Kantor Perusahaan Jl. Sentot Alibasah No. 4 Bandung, telah ditandatangani perjanjian oleh pihak-pihak sebagai berikut :</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='16' valign='top' class='istyle15'>I.</td>
					    <td align='justify' class='istyle15'><strong>Koperasi Pegawai PT. TELKOM (KOPEGTEL) Kantor Perusahaan PT. TELEKOMUNIKASI INDONESIA Tbk</strong>, yang tercatat sebagai badan hukum nomor : 518/PAD.30-DISKOP/2003 tanggal 12 Juni 2003, berkedudukan dijalan Sentot Alibasyah No. 4 Bandung dalam perbuatan hukum ini diwakili secara sah oleh <strong>".($rs->nilai >= 50000000 ? $getGM->nm:$getGM->nm2)."</strong>, Jabatan <strong>".($rs->nilai >= 50000000 ? $getGM->jabatan:$getGM->jabatan2)." KOPEGTEL</strong> selanjutnya dalam perjanjian ini disebut <strong>PIHAK PERTAMA</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>II.</td>
					    <td align='justify' class='istyle15'>Nama <strong>".$rs->nm." / ".$rs->kode_agg."</strong> Pegawai PT Telkom lokasi kerja <strong>".strtoupper($rs->loker)." bertempat tinggal di ".strtoupper($rs->alamat)." ".strtoupper($rs->kota)." ".strtoupper($rs->kodepos)."</strong>, untuk melakukan perbuatan hukum sebagaimana disebutkan dalam perjanjian ini,selanjutnya disebut <strong>PIHAK KEDUA</strong>. </td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>					    
					    <td colspan='2' align='justify' class='istyle15'>Bahwa <strong>PIHAK KEDUA</strong>dalam rangka $rs->no_mou memerlukan sejumlah dana dan untuk memenuhi hal tersebut <strong>PIHAK PERTAMA</strong> telah memberikan pembiayaan sejumlah:</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center'>
							<table>
								<tr> 
									<td>a.</td>
									<td width='200'>Pembiayaan Pokok</td>
									<td>:&nbsp;Rp.</td>
									<td align='right' >". number_format($rs->pokok,0,",",".")."</td>
								</tr>
								<tr> 
									<td>b.</td>
									<td >Margin</td>
									<td>:&nbsp;Rp.</td>
									<td align='right'>".number_format($rs->jasa,0,",",".")."</td>
								</tr>
								<tr> 
									<td>c.</td>
									<td >Harga Jual(a + b)</td>
									<td>:&nbsp;Rp.</td>
									<td align='right'>".number_format($rs->pokok + $rs->jasa,0,",",".")."</td>
								</tr>
								<tr> 
									<td>d.</td>
									<td >Angsuran / Bulan</td>
									<td>:&nbsp;Rp.</td>
									<td align='right'>".number_format($rs->nilai_tagihan,0,",",".")."</td>
								</tr>
							</table>
					    </td>
					  </tr>
					  <tr>					    
					    <td colspan='2' align='justify' class='istyle15'>Selanjutnya dengan ini <strong>PIHAK KEDUA</strong> mengakui dengan sebenarnya dan secara sah berhutang uang kepada <strong>PIHAK PERTAMA</strong> dengan jumlah tersebut diatas, nilai tersebut merupakan jumlah pokok yang diterima ditambah margin keuntungan jual beli yang tersepakati.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					   <tr>					    
					    <td colspan='2' align='justify' class='istyle15'>Para pihak telah bersepakat akan menanda-tangani dan melaksanakan akad perjanjian pembiayaan ini berdasarkan syarat-syarat dan ketentuan sebagai berikut.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 1</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>PENGGUNAAN PEMBIAYAAN</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <td colspan='2' align='justify' class='istyle15'>Pembiayaan yang diterima akan dipergunakan semata-mata sebagaimana tercantum dalam surat permohonan.</td>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 2</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>JANGKA WAKTU, MARGIN DAN BIAYA</td>
					  </tr>					  
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>
							<table width='100%'>
								<tr>
									<td>1.&nbsp;</td>
									<td align='justify' class='istyle15'>Perjanjian pembiayaan ini diberikan untuk jangka waktu $rs->lama_bayar (".$lmbyr[0].") bulan terhitung sejak tanggal ".$tgl2[0]." bulan ".$bln2[0]." Tahun ".$thn2[0]." sehingga akan berakhir pada tanggal ".$tgl3[0]." bulan ".$bln3[0]." Tahun ".$thn3[0].".</td>
								</tr>
								<tr>
									<td>2.&nbsp;</td>
									<td align='justify' class='istyle15'><strong>PIHAK KEDUA</strong> wajib membayar margin kepada <strong>PIHAK PERTAMA</strong> sebesar $rs->p_bunga% (". $AddOnLib->terbilang($rs->p_bunga, "")." persen) efektif.</td>
								</tr>
								<tr>
									<td>3.&nbsp;</td>
									<td align='justify' class='istyle15'>Sehubungan dengan persetujuan pemberian Pembiayaan oleh <strong>PIHAK PERTAMA</strong> kepada <strong>PIHAK KEDUA</strong> berdasarkan Perjanjian Pembiayaan ini, <strong>PIHAK KEDUA</strong> wajib membayar:.</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td align='justify' class='istyle15'><table>
																			 <tr>
																				 <td>i. &nbsp;</td>
																				 <td>Provisi Pembiayaan sebesar 1,5%(".$AddOnLib->terbilang("1.5"," persen").") dihitung dari Pembiayaan Pokok.</td>
																			 </tr>
																			 <tr>
																				 <td>ii. &nbsp;</td>
																				 <td>Biaya premi asuransi jiwa.</td>
																			 </tr>
																		 </table>
									</td>
								</tr>
								<tr>
									<td colspan='2' align='justify' class='istyle15'>Biaya provisi, premi asuransi jiwa tersebut diatas dipotong langsung pada waktu pencairan Pembiayaan.</td>
								</tr>
							</table>
					    </td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 3</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>PEMBAYARAN</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Semua pembayaran kembali / pelunasan pembiayaan berikut margin keuntungan jual beli dan biaya-biaya lainnya akan dilakukan oleh <strong>PIHAK KEDUA</strong> kepada <strong>PIHAK PERTAMA</strong> secara angsuran melalui pemotongan Gaji Payroll/ Non Payroll dan selama jangka waktu tersebut dalam pasal 2 sesuai dengan jadwal angsuran yang sudah disetujui dan ditandatangani oleh <strong>PIHAK KEDUA</strong> terlampir.</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Dalam hal pelunasan sebelum jatuh tempo akan dikenakan penambahan margin 1 (satu) kali bulan berikutnya dan jika terjadi tunggakan angsuran karena alasan apapun <strong>PIHAK KEDUA</strong> wajib membayar tunggakan tersebut. Semua bukti yang dikeluarkan oleh <strong>PIHAK PERTAMA</strong> kepada <Strong>PIHAK KEDUA</Strong> atau kuasanya adalah merupakan bukti yang sudah diakui oleh <strong>PIHAK KEDUA</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 4</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>CIDERA JANJI</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Apabila terjadi penyimpangan dari ketentuan yang ditetapkan dalam pasal-pasal diatas, <strong>PIHAK PERTAMA</strong> berhak menagih kewajiban / hutang karena pembiayaan ini berikut margin keuntungan jual beli dengan seketika dan sekaligus berikut kewajiban-kewajiban yang harus dibayar oleh <strong>PIHAK KEDUA</strong> kepada <Strong>PIHAK PERTAMA</Strong> termasuk biaya administrasi, ongkos-ongkos, dan biaya-biaya lainnya dan seluruh pembiayaan tersebut akan menjadi jatuh tempo, bilamana:.</td>
					  </tr>
					  <tr>
						<td colspan='2'> <table>
											 <tr>
												 <td valign='top'>a.&nbsp;</td>
												 <td align='justify' class='istyle15'><Strong>PIHAK KEDUA</Strong> tidak membayar angsuran pokok berikut margin keuntungan jual beli 3(tiga) kali berturut-turut dan tidak memenuhi salah satu kewajibannya yang telah ditetapkan sedang telah lewatnya waktu telah cukup bukti yang nyata akan kelalainnya dan atau kesalahanya sehingga peringatan dengan juru sita atau surat-surat lain yang serupa tidak diperlukan lagi;</td>
											 </tr>
											 <tr>
												 <td valign='top'>b.&nbsp;&nbsp;&nbsp;</td>
												 <td align='justify' class='istyle15'>Apabila terdapat suatu janji, pernyataan, jaminan berdasarkan perjanjian ini maupun berdasarkan surat-surat, sertifikat atau bukti-bukti lain ternyata tidak benar atau menyesatkan;</td>
											 </tr>
											 <tr>
												 <td valign='top'>c.&nbsp;&nbsp;&nbsp;</td>
												 <td align='justify' class='istyle15'><strong>PIHAK KEDUA</strong> dinyatakan pailit atau memohon penundaan pembayaran atau berada dibawah kemampuan atau karena apapun juga tidak berhak lagi mengurus dan menguasai kekayaannya;</td>
											 </tr>
											 <tr>
												 <td valign='top'>d.&nbsp;&nbsp;&nbsp;</td>
												 <td align='justify' class='istyle15'>Kekayaan <strong>PIHAK KEDUA</strong> seluruhnya atau sebagian disita oleh pihak lain;</td>
											 </tr>
											 <tr>
												 <td valign='top'>e.&nbsp;&nbsp;&nbsp;</td>
												 <td align='justify' class='istyle15'><strong>PIHAK KEDUA</strong> menurut pertimbangan <Strong>PIHAK PERTAMA</Strong> melanggar peraturan-peraturan / ketentuan-ketentuan serta tidak memenuhi syarat-syarat sebagaimana disebutkan dalam perjanjian ini;</td>
											 </tr>
											 <tr>
												 <td valign='top'>f.&nbsp;&nbsp;&nbsp;</td>
												 <td align='justify' class='istyle15'>Diputuskan oleh pengadilan atau instansi pemerintah bahwa suatu dokumen adalah tidak sah atau tidak dapat diberlakukan.</td>
											 </tr>
										 </table>
					    </td>
					   </tr>
					   <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					   <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 5</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>PENYELESAIAN PINJAMAN SEBELUM KONTRAK HABIS</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Apabila dikemudian hari <Strong>PIHAK KEDUA</Strong> berhenti sebagai anggota KOPEGTEL Kantor Perusahaan karena:</td>
					  </tr>
					  <tr>
						<td colspan='2' align='justify' class='istyle15'>
							<table>
								 <tr>
									 <td valign='top'>a.&nbsp;</td>
									 <td>Pensiun, Pensiun Dini ataupun diberhentikan oleh PT TELKOM karena alasan lainnya, maka sisa kewajiban/pinjaman wajib dilunasi, dan pelaksanaan penyelesaian sia kewajiban tersebut <strong>PIHAK KEDUA</strong> menyatakan bersedia dipotong secara langsung dari Bantuan Fasilitas Perumahan Terakhir(BFPT), Purnabhakti, Perjalanan Pensiun, Tabungan Hari Tua(THT), dan hak-hak lainnya dari PT TELKOM. </td>
								 </tr>
								 <tr>
									 <td valign='top'>b.&nbsp;</td>
									 <td>Dan apabila <strong>PIHAK KEDUA</strong> mutasi keluar unit organisasi dibawah naungan Kantor Perusahaan, maka <strong>PIHAK KEDUA</strong> harus melunasi seluruh susa kewajibannya tersebut kepada <Strong>PIHAK PERTAMA</Strong>. </td>
								 </tr>
							 </table>
						</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>PASAL 6</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' valign='top' class='istyle18' height='32'>DOMISILI</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Pihak-pihak memilih tempat tinggal dan tetap dan umum mengenai perjanjian pembiayaan ini dan segala akibatnya di Kantor Panitera Pengadilan Negeri di Bandung.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>					  
					  <tr>
					    <td colspan='2' align='justify' class='istyle15'>Demikian perjanjian pembiayaan ini dibuat dan ditandatangani di Bandung pada hari dan tanggal sebagaimana disebutkan diatas.</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>		
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='73%' class='istyle18'>PIHAK PERTAMA </td>
					        <td width='27%' class='istyle18'>PIHAK KEDUA </td>
					      </tr>
					      <tr>
					        <td height='94' colspan='2'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td class='istyle18'><u>".($rs->nilai >= 50000000 ? $getGM->nm:$getGM->nm2)."</u></td>
					        <td class='istyle18'><u>".$rs->nm."</u></td>
					      </tr>
					      <tr>
					        <td class='istyle18'>NIK: ".($rs->nilai >= 50000000 ? $getGM->jabatan:$getGM->jabatan2)."</td>
					        <td class='istyle18'>NIK: ".$rs->kode_agg."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					  </tr>
				  </table>";
		$html .="<br />";
		return $html;		
	}	
	function suratKuasa($rs, $getGM){
		$AddOnLib=new server_util_AddOnLib();
		$now=explode("/",$rs->tglskrg);			
		$html = "<table width='680' border='0' align='center' cellpadding='2' cellspacing='0'>
					 <tr>
						 <td colspan='2' align='center' class='istyle16'><u>SURAT KUASA</u> </td>
					 </tr>
					 <tr>
						<td colspan='2' height='50'>&nbsp;</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2'>Yang bertanda tangan di bawah ini ".strtoupper($rs->nm)." / NIK : $rs->kode_agg B.Ind/B. Pos/ Status $rs->grade Pegawai TETAP PT.TELKOM. Selanjutnya disebut <strong>PEMBERI KUASA</strong> dengan ini memberi kuasa sepenuhnya kepada:</td>						
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2'>".($rs->nilai >= 50000000 ? $getGM->nm:$getGM->nm2)." Jabatan ".($rs->nilai >= 50000000 ? $getGM->jabatan:$getGM->jabatan2)." Kopegtel Pengurus Kopegtel Kantor Perusahaan, selanjutnya disebut <strong>PENERIMA KUASA</strong> yang bertindak untuk dan atas nama KOPEGTEL Kantor Perusahaan khusus bertindak untuk dan atas nama PEMBERI KUASA melakukan :</td>						
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td width='50' valign='top'>1.&nbsp;</td>
						<td>Pemotongan gaji / honor / pendapatan setiap bulannya sejumlah yang ditentukan sesuai dengan kewajiban kepada bank sehubungan denga fasilitas pembiayaan yang diterima dari bank sampai pembiayaan tersebut dinyatakan lunas oleh Pihak Bank.</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td width='50' valign='top'>2.&nbsp;</td>
						<td>Pemotongan uang BFPT atau hak-hak lainnya dalam hal terjadi pemutusan hubungan kerja (PHK) dari PT. TELKOM, meninggal dunia atau hal lainnya sampai fasilitas pembiayaan tersebut dinyatakan lunas oleh Pihak Bank.</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td width='50' valign='top'>3.&nbsp;</td>
						<td>Penyetoran atau transfer secara bulanan atas potongan gaji / hak-hak lain / uang BFPT tersebut diatas kepada Bank sampai pembiayaan tersebut dinyatakan lunas oleh Pihak Bank.</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2' >Kuasa Pemotongan Gaji dimaksud dalam SURAT KUASA ini akan disampaikan kepada bendaharawan PT. TELKOM sebagaimana diatur dalam surat edaran Direktur SDM PT. TELKOM No. SE.9/PS560/SDM/30/200 tentang Pemotongan Gaji atas angsuran kredit KOPEGTEL, antara lain dinyatakan \"Pelunasan kredit anggota dilakukan melalui pemotongan gaji oleh unit SDM\". </td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2' >Surat Kuasa ini berlaku terus, termasuk dalam hal terjadi perubahan jumlah angsuran apabila ada, dan kuasa ini tidak akan kami tarik kembali maupun tidak akan batal oleh sebab-sebab yang tercantum dalam pasal 1813,1814,1816 KUHP Perdata dan sebab apapun. Sampai seluruh kewajiban PEMBERI KUASA lunas.</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2' >Demikian kuasa ini kami buat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.</td>
					 </tr>
					 <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					 </tr>
					 <tr>
						<td colspan='2' >
							<table>							
								<tr>
									<td width='150'>Bandung,&nbsp;&nbsp;&nbsp; ".$AddOnLib->ubah_bulan($now[3])." ".$now[4]." </td>
									<td width='480'>&nbsp;</td>
									<td width='100'>&nbsp;</td>
								</tr>
								<tr>
									<td  width='100'>Pemberi Kuasa </td>
									<td width='480'>&nbsp;</td>
									<td width='100'>Penerima Kuasa</td>
								</tr>
								<tr>
									<td  width='100'>&nbsp;</td>
									<td width='480'>&nbsp;</td>
									<td width='100'>&nbsp;</td>
								</tr>
								<tr>
									<td  width='100'>&nbsp;</td>
									<td width='480'>&nbsp;</td>
									<td width='100'>&nbsp;</td>
								</tr>
								<tr>
									<td  width='100'>&nbsp;</td>
									<td width='480'>&nbsp;</td>
									<td width='100'>&nbsp;</td>
								</tr>
								<tr>
									<td  width='100'>&nbsp;</td>
									<td width='480'>&nbsp;</td>
									<td width='100'>&nbsp;</td>
								</tr>
								<tr>
									<td width='100'><u>$rs->nm</u></td>
									<td width='480'>&nbsp;</td>
									<td width='100'><u>".($rs->nilai >= 50000000 ? $getGM->nm:$getGM->nm2)."</u></td>
								</tr>
								<tr>
									<td width='100'>NIK. $rs->kode_agg</td>
									<td width='480'>&nbsp;</td>
									<td width='100'>".($rs->nilai >= 50000000 ? $getGM->jabatan:$getGM->jabatan2)."</td>
								</tr>
							</table>
						</td>
					 </tr>
				 </table>";							 
			return str_replace(chr(9),"",$html);
	}
	function kontrakIntern($rs, $getGM){
			$AddOnLib=new server_util_AddOnLib();
			$now=explode("/",$rs->tglskrg);			
			$tgl=explode(" Rupiah",$AddOnLib->terbilang($now[2]));
			$bln=explode(" Rupiah",$AddOnLib->terbilang($now[3]));
			$thn=explode(" Rupiah",$AddOnLib->terbilang($now[4]));
			$lmbyr=explode(" Rupiah",$AddOnLib->terbilang($rs->lama_bayar));			
		    $html="<br />";
			$html.=	"<table width='680' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>PERJANJIAN PINJAMAN UANG</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>ANTARA</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>KOPERASI PEGAWAI PT. TELEKOMUNIKASI KANTOR PERUSAHAAN Tbk,</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>DENGAN</td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' align='center' valign='top' class='istyle16' style='border-bottom:1px solid #111111'>".$rs->nm." / ".$rs->kode_agg."</td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' align='center' class='istyle16'>NOMOR : ".$rs->no_pinj."</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='justify' class='istyle15'>Pada hari ini ".$AddOnLib->ubahNamaHari($now[0])." tanggal ".$tgl[0]." bulan ".$bln[0]." tahun ".$thn[0].", bertempat di kantor KOPEGTEL Kantor Perusahaan Jl. Sentot Alibasah No. 4 Bandung, telah ditandatangani perjanjian oleh pihak-pihak sebagai berikut :</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='16' valign='top' class='istyle15'>I.</td>
					    <td colspan='2' align='justify' class='istyle15'>Koperasi Pegawai PT. Telekomunikasi (KOPEGTEL) Kantor Perusahaan yang diwakili oleh <strong>".$getGM->nm."</strong>, Jabatan <strong>GENERAL MANAGER</strong> selanjutnya dalam perjanjian ini disebut <strong>PIHAK PERTAMA</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>II.</td>
					    <td colspan='2' align='justify' class='istyle15'><strong>".$rs->nm." / ".$rs->kode_agg."</strong> pegawai tetap aktif lokasi <strong>".strtoupper($rs->loker)." ".strtoupper($rs->alamat)." ".strtoupper($rs->kota)." ".strtoupper($rs->kodepos)."</strong>, selanjutnya dalam perjanjian ini disebut <strong>PIHAK KEDUA</strong>. </td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 1</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18' height='32'>JUMLAH PINJAMAN</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Jumlah Pinjaman dari <strong>PIHAK PERTAMA sebesar Rp. ".number_format($rs->nilai,0,",",".")." (".$AddOnLib->terbilang($rs->nilai).")</strong> dan <strong>PIHAK KEDUA</strong> akan mempergunakannya untuk $rs->no_mou.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pengembalian pinjaman dalam jangka waktu selama <strong>".$rs->lama_bayar." (".$lmbyr[0].")</strong> bulan.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>					  
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 2</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32' align='center' class='istyle18'>JASA PINJAMAN DAN BIAYA-BIAYA</td>
					  </tr>
					  <tr>					    
					    <td colspan='3' align='justify' class='istyle15'>Pinjaman dari <strong>PIHAK PERTAMA</strong> dikenakan jasa sebesar 20% efektif kepada <strong>PIHAK KEDUA</strong>. <strong>PIHAK KEDUA</strong> wajib membayar biaya PREMI ASURANSI jika pinjaman lebih dari 1 (satu) tahun.</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 3</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32' align='center' class='istyle18'>SYARAT-SYARAT PENGEMBALIAN PINJAMAN </td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pengembalian Pinjaman uang berupa Angsuran Pokok ditambah Jasa oleh PIHAK KEDUA kepada PIHAK PERTAMA, dilakukan dalam jangka waktu ".$rs->lama_bayar." (".$lmbyr[0].") bulan terhitung setelah ditandatanganinya perjanjian ini dengan perincian sebagai berikut :<br />
					      <table width='69%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='3%'>a.</td>
					          <td width='68%'>Pokok pinjaman sebesar</td>
					          <td width='9%'>= Rp. </td>
					          <td width='20%' align='right'>".number_format($rs->pokok,0,",",".")."</td>
					        </tr>
					        <tr>
					          <td>b.</td>
					          <td>Jasa pinjaman (".number_format($rs->p_bunga/12,2,",",".")."% X ".number_format($rs->pokok,0,",",".").") X $rs->lama_bayar bulan </td>
					          <td>= Rp. </td>
					          <td align='right'>".number_format($rs->jasa,0,",",".")."</td>
					        </tr>
					        <tr>
					          <td colspan='4'>----------------------------------------------------------------------------------------------------------------</td>
					        </tr>
					        <tr>
					          <td colspan='2'>Total</td>
					          <td>= Rp. </td>
					          <td align='right'>".number_format($rs->pokok+$rs->jasa,0,",",".")."</td>
					        </tr>
					      </table>
					      (".$AddOnLib->terbilang($rs->pokok+$rs->jasa).")</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pengembalian pinjaman akan ". ($rs->status_bayar == "A" ? "dipotong gaji melalui payroll " : " ditransfer ke rekening KOPEGTEL No. 131-00-0006283-8 an KOPEGTEL KP (Simpanan) pada Bank MANDIRI Cabang Japati Bandung" ). " sebesar Rp. ".number_format($rs->pokok+$rs->jasa,0,",",".")." : ".$rs->lama_bayar." = Rp. ".number_format($rs->nilai_tagihan,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_tagihan)."), angsuran akan dibayarkan pada tgl $rs->tglawl - $rs->tglend. </td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>3.</td>
					    <td colspan='2' align='justify' class='istyle15'>Apabila sampai tanggal berhenti bekerja, <strong>PIHAK KEDUA</strong> belum melunasi, maka <strong>PIHAK PERTAMA</strong> akan memperhitungkan dengan hak-hak <strong>PIHAK KEDUA</strong> yang ada di KOPEGTEL Kantor Perusahaan.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>4.</td>
					    <td colspan='2' align='justify' class='istyle15'>Apablia <strong>PIHAK KEDUA</strong> berhenti atau diberhentikan bekerja dari KOPEGTEL Kantor Perusahaan maka <strong>PIHAK KEDUA</strong> harus menyelesaikan kewajiban kepada <strong>PIHAK PERTAMA</strong>. </td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' >&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 4</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' height='32' class='istyle18'>PENUTUP</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Segala ketentuan-ketentuan dan syarat-syarat dalam perjanjian ini berlaku serta mengikat bagi pihak-pihak yang menandatangani dan pengganti-penggantinya.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'>Perjanjian ini dibuat rangkap 2 (dua), masing-masing sama bunyinya dan maknanya diatas kertas bermaterai cukup serta mempunyai kekuatan yang sama setelah ditandatangani oleh kedua belah pihak. </td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' class='istyle18'>Bandung, ".$now[2]." ".$AddOnLib->ubah_periode($now[5])."</td>
					  </tr>
					  <tr>
					    <td colspan='3' class='istyle18'>An. Pengurus Kopegtel Kantor Perusahaan </td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='73%' class='istyle18'>PIHAK PERTAMA </td>
					        <td width='27%' class='istyle18'>PIHAK KEDUA </td>
					      </tr>
					      <tr>
					        <td height='94' colspan='2'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td class='istyle18'><u>".($rs->nilai >= 50000000 ? $getGM->nm:$getGM->nm2)."</u></td>
					        <td class='istyle18'><u>".$rs->nm."</u></td>
					      </tr>
					      <tr>
					        <td class='istyle18'>NIK: ".($rs->nilai >= 50000000 ? $getGM->jabatan:$getGM->jabatan2)."</td>
					        <td class='istyle18'>NIK: ".$rs->kode_agg."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					</table>";
			$html .= "<br />";
			return $html;
	}
	function schAngsuran($rs, $getGM)
	{		
			global $dbLib;			
			$filter=explode("//",$this->filter);
			$sql = "select a.no_pinj,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_tagih,'%d/%m/%Y') as tgltagih,
				a.kode_agg,upper(c.nama) as nm,case when a.jenis_angs='A' then 'Anuitas' else 'Flat' end as jnsangs,a.nilai,a.p_bunga,a.lama_bayar,a.nilai_bunga,a.nilai_pokok,
				a.nilai_tagihan,case when a.status_bayar='A' then 'Autodebet' else 'Cash' end as jnsbyr,
				date_format(b.tgl_angs,'%d/%m/%Y') as tglangs,b.cicilan_ke,b.npokok,b.nbunga,b.saldo,
				date_format(g.tanggal,'%d/%m/%Y') as tglcair
				from kop_pinj_m a inner join kop_pinj_sch b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi 
				inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi
				left join kop_pinj_spb d on d.no_kontrak=a.no_kontrak and a.kode_lokasi=d.kode_lokasi and a.no_pinj=d.no_pinj
				left join spb_m e on d.no_spb=e.no_spb and e.kode_lokasi=d.kode_lokasi
				left join kas_d f on f.no_bukti=e.no_spb and f.kode_lokasi=e.kode_lokasi
				left join kas_m g on g.no_kas=f.no_kas and f.kode_lokasi=g.kode_lokasi ". //.$filter[0].
				" where a.no_pinj='".$rs->no_pinj."' order by b.cicilan_ke ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			error_log($sql);
			$data0=$dbLib->execute($sql);
			$tpokok=0;
			$tmargin=0;
			while ($tot = $data0->FetchNextObject($toupper=false))
			{
				$tpokok+=$tot->npokok;
				$tmargin+=$tot->nbunga;
			}
			$total = $tpokok+$tmargin;
			$AddOnLib=new server_util_AddOnLib();
			/*$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";*/
			$html="<br />";
			$html.=	"<table width='650' border='1' align='center' cellpadding='0' cellspacing='0' style='border:2px solid #111111; border-collapse : collapse;'>
					  <tr>
					    <td valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td align='center'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td align='center' class='nstyle18'><u>SCHEDULE PENGAWASAN ANGSURAN PINJAMAN</u></td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle16'>No. Pinjaman : ".$rs->no_pinj."</td>
					      </tr>
					      <tr>
					        <td style='border-bottom:1px solid #111111; border-collapse:collapse'>&nbsp;</td>
					      </tr>
					    </table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='2%' rowspan='9'>&nbsp;</td>
					          <td colspan='6'>&nbsp;</td>
					          <td width='2%' rowspan='9'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td width='21%' class='istyle16'>Nama Nasabah/NIK</td>
					          <td width='3%' align='center' class='istyle16'>:</td>
					          <td colspan='4' class='istyle16'>".$rs->nm."/".$rs->kode_agg."</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td width='30%'>&nbsp;</td>
					          <td width='19%'>&nbsp;</td>
					          <td width='3%'>&nbsp;</td>
					          <td width='20%'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jumlah Pembiayaan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>Rp. ".number_format($rs->nilai,0,",",".")."</td>
					          <td class='istyle15'>Angsuran per Bulan </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_tagihan,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Suku Bunga (per tahun)</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".number_format($rs->p_bunga,2,",",".")."%</td>
					          <td class='istyle15'>Total Pokok</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($tpokok,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jangka Waktu (bulan)</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->lama_bayar."</td>
					          <td class='istyle15'>Total Margin </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($tmargin,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Tanggal Pencairan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->tglcair."</td>
					          <td class='istyle15'>Total Pokok + Margin </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($total,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jenis Pembiayaan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsangs."</td>
					          <td class='istyle15'>Jenis Pembayaran </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsbyr."</td>
					        </tr>
					        <tr>
					          <td colspan='6'>&nbsp;</td>
					        </tr>
					      </table>
					      <table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					        <tr align='center' bgcolor='#CCCCCC'>
					          <td width='5%' class='istyle18'>No.</td>
					          <td width='13%' class='istyle18'>Tgl. Angsuran</td>
					          <td width='17%' class='istyle18'>Saldo Awal Pokok </td>
					          <td width='16%' class='istyle18'>Angsuran</td>
					          <td width='16%' class='istyle18'>Pokok</td>
					          <td width='15%' class='istyle18'>Margin</td>
					          <td width='18%' class='istyle18'>Saldo Akhir Pokok </td>
					        </tr>";
				$data=$dbLib->execute($sql);
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					$html.="<tr>
					          <td align='center' class='istyle15'>".$dt->cicilan_ke.".</td>
					          <td align='center' class='istyle15'>".$dt->tglangs."</td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->npokok+$dt->saldo,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->nilai_tagihan,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->npokok,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->nbunga,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->saldo,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>";
				}
				$html .= "</table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					        <tr>
					          <td>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menyetujui,</td>
					        </tr>
					        <tr>
					          <td height='59'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>".$rs->nm."</u></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$rs->kode_agg."</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					        </tr>
					      </table></td>
					  </tr>
					</table>";
			$html .= "<br />";			
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	
}
?>
