<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptPinj2
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
	function getHtml()
	{
		$sql0="select distinct a.no_pinj ".
              "from kop_pinj_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$filter=explode("//",$this->filter);
			$sql = "select a.kode_agg,upper(b.nama) as nm,a.no_kontrak,date_format(now(),'%W/%M/%d/%m/%Y/%Y%m') as tglskrg,a.nilai,
				a.nilai_prov,a.nilai_asur,a.p_bunga,a.lama_bayar,date_format(max(c.tgl_angs),'%Y%m') as tglend,
				date_format(min(c.tgl_angs),'%Y%m') as tglawl,a.nik_app,upper(d.nama) as nmapp,
				case when a.jenis_angs='F' then 'flat' else 'anuitas' end as jnsangs,a.no_mou,a.nilai_tagihan,
				e.nama as loker,e.alamat,e.kota,e.kodepos,sum(c.nbunga) as jasa,sum(c.npokok) as pokok 
				from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
				inner join kop_pinj_sch c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join kop_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi ".$filter[0].
				" and a.no_pinj='".$page->fields[0]."' group by a.no_pinj order by a.no_pinj ";
			$sql2 = "select nik,upper(nama) as nm from karyawan where kode_lokasi='".$filter[1]."' and jabatan='General Manager'";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			$gm=$dbLib->execute($sql2);
			$getGM=$gm->FetchNextObject($toupper=false);
			//error_log($sql);
			$now=explode("/",$rs->tglskrg);
			$AddOnLib=new server_util_AddOnLib();
			$tgl=explode(" Rupiah",$AddOnLib->terbilang($now[2]));
			$bln=explode(" Rupiah",$AddOnLib->terbilang($now[3]));
			$thn=explode(" Rupiah",$AddOnLib->terbilang($now[4]));
			$lmbyr=explode(" Rupiah",$AddOnLib->terbilang($rs->lama_bayar));
			$html="<br />";
			$html.=	"<table width='680' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>PERJANJIAN KREDIT PINJAMAN</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>ANTARA</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>KOPERASI PEGAWAI PT. TELEKOMUNIKASI KANTOR PERUSAHAAN </td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>DENGAN</td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' align='center' valign='top' class='istyle16' style='border-bottom:1px solid #111111'>".$rs->nm." / ".$rs->kode_agg."</td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' align='center' class='istyle16'>NOMOR : ".$rs->no_kontrak."</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='justify' class='istyle15'>Berdasarkan Kontrak Induk No. ".$rs->no_mou." ".$rs->loker." ".$rs->kota.", pada hari ini ".$AddOnLib->ubahNamaHari($now[0])." tanggal ".$tgl[0]." bulan ".$bln[0]." tahun ".$thn[0].", bertempat di kantor KOPEGTEL Kantor Perusahaan Jl. Sentot Alibasah No. 4 Bandung, telah ditandatangani perjanjian kredit Pinjaman oleh pihak-pihak sebagai berikut :</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='16' valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Koperasi Pegawai PT. Telekomunikasi (KOPEGTEL) Kantor Perusahaan yang diwakili oleh <strong>".$getGM->nm."</strong>, Jabatan <strong>GENERAL MANAGER</strong> selanjutnya dalam perjanjian ini disebut <strong>PIHAK PERTAMA</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'><strong>".$rs->nm." / ".$rs->kode_agg."</strong> pegawai tetap aktif lokasi <strong>".strtoupper($rs->loker)." ".strtoupper($rs->alamat)." ".strtoupper($rs->kota)." ".strtoupper($rs->kodepos)."</strong>, selanjutnya dalam perjanjian ini disebut <strong>PIHAK KEDUA</strong>. </td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 1</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18' height='32'>NILAI PINJAMAN</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Nilai Pinjaman adalah sebesar Rp. <strong>".number_format($rs->nilai,0,",",".")." (".$AddOnLib->terbilang($rs->nilai).")</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'>Jumlah Pinjaman dari <strong>PIHAK PERTAMA Rp. ".number_format($rs->nilai,0,",",".")." (".$AddOnLib->terbilang($rs->nilai).")</strong> dan pembayaran kredit akan dilakukan oleh <strong>PIHAK KEDUA</strong> dalam jangka waktu selama <strong>".$rs->lama_bayar." (".$lmbyr[0].")</strong> bulan.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>3.</td>
					    <td colspan='2'>Pinjaman dikenakan biaya provisi dan asuransi sebesar Rp ".number_format($rs->nilai_prov+$rs->nilai_asur,0,",",".")."</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 2</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32' align='center' class='istyle18'>JASA PINJAMAN</td>
					  </tr>
					  <tr>
					    <td class='istyle15' valign='top'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'><strong>PIHAK KEDUA</strong> dikenakan jasa pinjaman sebesar <strong>".$rs->p_bunga."%</strong> dengan perhitungan ".$rs->jnsangs.".</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 3</td>
					  </tr>
					  <tr>
					    <td colspan='3' height='32' align='center' class='istyle18'>SYARAT-SYARAT PENGEMBALIAN KREDIT PINJAMAN </td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pengembalian kredit Pinjaman berupa Angsuran Pokok ditambah Jasa oleh PIHAK KEDUA kepada PIHAK PERTAMA, dilakukan dalam jangka waktu ".$rs->lama_bayar." (".$lmbyr[0].") bulan dengan perincian sebagai berikut :<br />
					      <table width='69%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='3%'>a.</td>
					          <td width='68%'>Pokok pinjaman sebesar</td>
					          <td width='9%'>= Rp. </td>
					          <td width='20%' align='right'>".number_format($rs->pokok,0,",",".")."</td>
					        </tr>
					        <tr>
					          <td>b.</td>
					          <td>Jasa pinjaman ".number_format($rs->p_bunga*$rs->lama_bayar/12,2,",",".")."% X ".number_format($rs->pokok,0,",",".")."</td>
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
					    <td colspan='2' align='justify' class='istyle15'>Pembayaran kredit per bulan akan ditransfer ke rekening KOPEGTEL No. 131-0004890275 pada Bank MANDIRI Cabang Japati Bandung sebesar Rp. ".number_format($rs->pokok+$rs->jasa,0,",",".")." : ".$rs->lama_bayar." = Rp. ".number_format($rs->nilai_tagihan,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_tagihan)."). </td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>3.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pembayaran angsuran sebesar : Rp. ".number_format($rs->nilai_tagihan,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_tagihan).") ditransfer ke rekening KOPEGTEL No. 131-0004890275 pada Bank MANDIRI Cabang Japati Bandung. Akan dilaksanakan mulai bulan ".$AddOnLib->ubah_periode($rs->tglawl)." s/d ".$AddOnLib->ubah_periode($rs->tglend).".</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>4.</td>
					    <td colspan='2' align='justify' class='istyle15'>Keterlambatan angsuran kredit melebihi satu bulan dikenakan denda 5% dari pokok angsuran, bagi <strong>PIHAK KEDUA</strong> yang dimutasikan / pensiun diwajibkan melunasi sisa pinjaman sekaligus. </td>
					  </tr>
					  <tr>
					    <td height='32' colspan='3' >&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle18'>PASAL 4</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' height='32' class='istyle18'>KETENTUAN DAN SYARAT-SYARAT PERJANJIAN</td>
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
					    <td colspan='2' align='justify' class='istyle15'>Perjanjian ini dibuat rangkap 2 (dua) bermaterai cukup dan masing-masing Pihak memiliki kekuatan Hukum yang sama. </td>
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
					        <td class='istyle18'><u>".$getGM->nm."</u></td>
					        <td class='istyle18'><u>".$rs->nm."</u></td>
					      </tr>
					      <tr>
					        <td class='istyle18'>".$getGM->nik."</td>
					        <td class='istyle18'>".$rs->kode_agg."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					</table>";
			$html .= "<br />";
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
	
}
?>