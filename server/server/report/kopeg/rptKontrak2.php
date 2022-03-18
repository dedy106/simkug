<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptKontrak2
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
		
		$sql = "select count(distinct a.no_pbrg) ".
			"from kop_pbrg_m a ".$this->filter2;		
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
		$sql0="select distinct a.no_pbrg ".
              "from kop_pbrg_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		$result = new server_util_arrayList();
		while (!$page->EOF)
		{
			$filter=explode("//",$this->filter);
			$sql = "select a.kode_agg,upper(b.nama) as nm,a.no_kontrak,date_format(now(),'%W/%M/%d/%m/%Y/%Y%m') as tglskrg,a.nilai,
				a.nilai + a.nilai_um - a.nilai_asur as nominal, a.nilai- a.nilai_asur as nilai_awal,a.nilai_asur, a.status_bayar,
				a.nilai_adm,a.nilai_asur,a.p_bunga,a.lama_bayar,date_format(max(c.tgl_angs),'%Y%m') as tglend,a.nilai_um,
				date_format(min(c.tgl_angs),'%Y%m') as tglawl,a.nik_app,upper(d.nama) as nmapp,
				case when a.jenis_angs='F' then 'flat' else 'anuitas' end as jnsangs,a.no_mou,a.nilai_tagihan,
				e.nama as loker,e.alamat,e.kota,e.kodepos,sum(c.nbunga) as jasa,sum(c.npokok) as pokok 
				from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
				inner join kop_pbrg_sch c on a.no_pbrg=c.no_pbrg and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join kop_loker e on b.kode_loker=e.kode_loker and b.kode_lokasi=e.kode_lokasi ".$filter[0].
				" and a.no_pbrg='".$page->fields[0]."' group by a.no_pbrg order by a.no_pbrg ";
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
					    <td colspan='3' align='center' class='istyle16'>PERJANJIAN KREDIT BARANG</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>ANTARA</td>
					  </tr>
					  <tr>
					    <td colspan='3' align='center' class='istyle16'>KOPERASI PEGAWAI PT. TELEKOMUNIKASI KANTOR PERUSAHAAN</td>
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
					    <td colspan='3' align='justify' class='istyle15'>Berdasarkan Kontrak Induk No. ".$rs->no_mou." ".$rs->loker." ".$rs->kota.", pada hari ini ".$AddOnLib->ubahNamaHari($now[0])." tanggal ".$tgl[0]." bulan ".$bln[0]." tahun ".$thn[0].", bertempat di kantor KOPEGTEL Kantor Perusahaan Jl. Sentot Alibasah No. 4 Bandung, telah ditandatangani perjanjian kredit Barang oleh pihak-pihak sebagai berikut :</td>
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
					    <td colspan='3' align='center' class='istyle18' height='32'>HARGA BARANG</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>1.</td>
					    <td colspan='2' align='justify' class='istyle15'>Harga Barang adalah sebesar Rp. <strong>".number_format($rs->nominal,0,",",".")." (".$AddOnLib->terbilang($rs->nominal).")</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>2.</td>
					    <td colspan='2' align='justify' class='istyle15'>Uang Muka sebesar Rp. <strong>".number_format($rs->nilai_um,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_um).")</strong>.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>3.</td>
					    <td colspan='2' align='justify' class='istyle15'>Jumlah Pinjaman dari <strong>PIHAK PERTAMA Rp. ".number_format($rs->nominal - $rs->nilai_um,0,",",".")." (".$AddOnLib->terbilang($rs->nominal).")</strong> dan pembayaran kredit akan dilakukan oleh <strong>PIHAK KEDUA</strong> dalam jangka waktu selama <strong>".$rs->lama_bayar." (".$lmbyr[0].")</strong> bulan.</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>4.</td>
					    <td colspan='2'>Pinjaman dikenakan biaya provisi dan asuransi sebesar Rp ".number_format($rs->nilai_asur,0,",",".")."</td>
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
					    <td colspan='2' align='justify' class='istyle15'>Pembayaran kredit per bulan akan ". ($rs->status_bayar == "A" ? "dipotong gaji melalui payroll " : " ditransfer ke rekening KOPEGTEL No. 131-0004890275 pada Bank MANDIRI Cabang Japati Bandung" ). " sebesar Rp. ".number_format($rs->pokok+$rs->jasa,0,",",".")." : ".$rs->lama_bayar." = Rp. ".number_format($rs->nilai_tagihan,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_tagihan)."). </td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>3.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pembayaran angsuran sebesar : Rp. ".number_format($rs->nilai_tagihan,0,",",".")." (".$AddOnLib->terbilang($rs->nilai_tagihan).") ". ($rs->status_bayar == "A" ? "dipotong gaji melalui payroll " : " ditransfer ke rekening KOPEGTEL No. 131-0004890275 pada Bank MANDIRI Cabang Japati Bandung" ). ". Akan dilaksanakan mulai bulan ".$AddOnLib->ubah_periode($rs->tglawl)." s/d ".$AddOnLib->ubah_periode($rs->tglend).".</td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>4.</td>
					    <td colspan='2' align='justify' class='istyle15'>Keterlambatan angsuran kredit melebihi satu bulan dikenakan denda 5% dari pokok angsuran, bagi <strong>PIHAK KEDUA</strong> yang dimutasikan / pensiun diwajibkan melunasi sisa pinjaman sekaligus. </td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15'>5.</td>
					    <td colspan='2' align='justify' class='istyle15'>Pengembalian Kredit, termasuk pemotongan BFPT, Purnabhakti, THT & Tunjangan lainnya yang saya terima dari Telkom dalam hal terjadi PHK, meninggal dunia, atau hal lainnya, sampai fasilitas pembiayaan dinyatakan lunas. </td>
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
					    <td valign='top' class='istyle15'>3.</td>
					    <td colspan='2' align='justify' class='istyle15'>3. Pengambilan BPKB dapat dilakukan setelah proses administrasi oleh pihak kepolisian selesai(estimasi +- 4 bln). </td>
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
			$html .= "<br /><br /><br /><br />";			
			if ($resultType){
				$pbrg = $page->fields[0];
				$result->add(str_replace(chr(9),"",$html));$result->setTag1("Perjanjian Kontrak");
				$result->add($this->lampiran($pbrg));$result->setTag1($result->getTag1().",Lampiran Kontrak");
				$result->add($this->schKontrak($pbrg));$result->setTag1($result->getTag1().",Schedule Angsuran");
				$this->lampiranPO($pbrg, $result);
				if ($rs->nilai_um + $rs->nilai_adm > 0) {
					$result->add($this->kuitansiUM($pbrg));
					$result->setTag1($result->getTag1().",Kuitansi UM & Adm");
				}
			}else {
				$html .= $this->lampiran($page->fields[0]);
			}			
			$page->MoveNext();
		}		
		$html = str_replace(chr(9),"",$html);		
		if ($resultType){
			return $result;
		}else return $html;
	}
	function lampiran($no_pbrg)
	{
		global $dbLib;
	    $AddOnLib=new server_util_AddOnLib();		
			$sql2="select b.kode_klpbrg,c.nama as nama_jenis,b.kode_brg,b.nama as nama_brg,a.jumlah,a.harga_kont, a.kode_vendor, e.nama as nama_vendor
				from kop_jual_d a 
				inner join kop_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
				inner join kop_brg_klp c on b.kode_klpbrg=c.kode_klpbrg and a.kode_lokasi=c.kode_lokasi
				inner join kop_pbrg_m d on a.no_jual=d.no_jual and a.kode_lokasi=d.kode_lokasi
				inner join vendor e on e.kode_vendor = a.kode_vendor and e.kode_lokasi= a.kode_lokasi
				where d.no_pbrg='$no_pbrg'";		
			$j=1;$jum=0;$total=0;
			$rs2 = $dbLib->execute($sql2);
			$htmlD = "";//Untuk menghitung jumlah record. jika beda vendor maka keterangan diubah.
			$keterangan = "";
			$bedaVendor = false;
			$first = true;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{				 
				$jum=$jum+$row2->jumlah;
				$total=$total+($row2->harga_kont * $row2->jumlah);
				$harga=number_format($row2->harga_kont * $row2->jumlah,0,",",".");
				$htmlD.="<tr>
					<td align='center' height='20'>$j</td>
					<td style='padding:3px;'>$row2->kode_vendor</td>
					<td style='padding:3px;'>$row2->nama_vendor</td>
					<td style='padding:3px;'>$row2->kode_klpbrg - $row2->nama_jenis</td>
					<td style='padding:3px;'>$row2->kode_brg - $row2->nama_brg</td>
					<td style='padding:3px;' align='center'>$row2->jumlah</td>
					<td align='right' style='padding:3px;'>$harga</td>
				  </tr>";					
				$j=$j+1;
				$first = false;
			}
			$keterangan = $rs->keterangan;			
						
			$tanggal=$AddOnLib->ubah_tanggal($rs->tanggal);
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";
			$html="<br />";
			$html.=	"<table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td class='isi_bukti'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
							<tr>						
							<td width='124' rowspan='5' align='center'><img src=$pathfoto width='80' height='99' /></td>
							<td valign='top' align='center' class='judul_bukti'><b>LAMPIRAN KONTRAK</b></td>														
							</tr>
							<tr>
							<td valign='top' align='center'><b>KONTRAK NO : $no_pbrg</b></td>												
							</tr>
						  <tr>							
							<td width='666' align='center' >KOPERASI PEGAWAI PT. TELKOM KANTOR PERUSAHAAN</td>
						  </tr>
						  <tr>
							<td align='center'>Jl. Sentot Alibasha No. 4 Telp. (022) 720511 Fax 7104676 Bandung 40133</td>
						  </tr>
						  <tr>
							<td height='50' align='right' valign='bottom'>&nbsp;</td>
						  </tr>						  
						</table></td>
					  </tr>						
					  <tr>
						<td align='center' valign='middle' style='padding:10px;'><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						  <tr bgcolor='#CCCCCC'>
							<td width='34' align='center' height='23'>No</td>
							<td width='186' align='center'>Kode Vendor </td>
							<td width='327' align='center'>Nama Vendor</td>
							<td width='186' align='center'>Jenis Barang </td>
							<td width='327' align='center'>Barang</td>
							<td width='73' align='center'>Jumlah</td>
							<td width='158' align='center'>Harga</td>
						  </tr>";
	   
		$html .= $htmlD;//dipindah keatas.
		
		$jum1=number_format($jum,0,",",".");
		$total2=number_format($total,0,",",".");
		$total1=$AddOnLib->terbilang($total);
	  $html.="<tr>
        <td colspan='5' align='right' height='20'>Total&nbsp;</td>
        <td style='padding:3px;' align='center'>$jum1</td>
        <td align='right' style='padding:3px;'>$total2</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='20' style='padding:10px;'><b>Terbilang : $total1</b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
</body>
</html>
";
		
		$html .= "<br />";
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function schKontrak($pbrg){
			global $dbLib;
			$sql = "select distinct a.no_pbrg,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_tagih,'%d/%m/%Y') as tgltagih,
				a.nilai + a.nilai_um - a.nilai_asur as nominal, a.nilai- a.nilai_asur as nilai_awal,a.nilai_asur,a.nilai_um,
				a.kode_agg,upper(c.nama) as nm,case when a.jenis_angs='A' then 'Anuitas' else 'Flat' end as jnsangs,a.nilai,a.p_bunga,a.lama_bayar,
				a.nilai_bunga,a.nilai_pokok,a.nilai_tagihan,case when a.status_bayar='A' then 'Autodebet' else 'Cash' end as jnsbyr,
				date_format(b.tgl_angs,'%d/%m/%Y') as tglangs,b.cicilan_ke,b.npokok,b.nbunga,b.saldo,
				date_format(g.tanggal,'%d/%m/%Y') as tglcair
				from kop_pbrg_m a inner join kop_pbrg_sch b on a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi and a.no_kontrak=b.no_kontrak
				inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi
				left join kop_jual_d d on d.no_jual=a.no_jual and a.kode_lokasi=d.kode_lokasi 
				left join spb_m e on d.no_spb=e.no_spb and e.kode_lokasi=d.kode_lokasi
				left join kas_d f on f.no_bukti=e.no_spb and f.kode_lokasi=e.kode_lokasi
				left join kas_m g on g.no_kas=f.no_kas and f.kode_lokasi=g.kode_lokasi ".$this->filter2.
				" and a.no_pbrg='".$pbrg."' order by b.cicilan_ke ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
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
					        <td align='center' class='nstyle18'><u>SCHEDULE PENGAWASAN ANGSURAN KREDIT BARANG</u></td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle16'>No. BUKTI : ".$rs->no_pbrg."</td>
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
					          <td class='istyle15'>Nominal</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nominal,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td class='istyle15'>Suku Bunga</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>$rs->p_bunga %</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Uang Muka</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_um,0,",",".")."</td>
					            </tr>
					          </table></td>
					           <td class='istyle15'>Jangka Waktu (bln) </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>$rs->lama_bayar</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jumlah Sementara</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_awal,0,",",".")."</td>
					            </tr>
					          </table></td>
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
					          <td class='istyle15'>Asuransi</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_asur,0,",",".")."</td>
					            </tr>
					          </table></td>
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
					          <td class='istyle15'>Jumlah</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai,0,",",".")."</td>
					            </tr>
					          </table></td>
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
					          <td class='istyle15'>Jenis Pembayaran </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsbyr."</td>					          
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
	function lampiranPO($pbrg, &$result){
		try{
			global $dbLib;
			$AddOnLib=new server_util_AddOnLib();		
			$sql = "select a.no_pbrg,date_format(a.tanggal,'%d/%m/%Y') as tanggal,c.nama as vendor,c.pic,c.no_fax,a.kode_agg,d.nama,d.kode_loker,e.nama as nama_loker,d.alamat,
						   d.no_telp,a.keterangan,upper(f.nama) as gm, c.kode_vendor
					from kop_pbrg_m a
					inner join kop_jual_d b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
					inner join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
					inner join kop_agg d on a.kode_agg=d.kode_agg and a.kode_lokasi=d.kode_lokasi
					inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi
					left outer join karyawan f on f.jabatan='General Manager' and f.kode_lokasi = a.kode_lokasi
				where a.no_pbrg = '".$pbrg."'";							
			$rs1=$dbLib->execute($sql);			
			$i = 1;
			$vendor = "";
			$no_pbrg = "";
			while ($rs = $rs1->FetchNextObject($toupper=false))
			{
				if ($no_pbrg != $rs->no_pbrg){
					$no_pbrg = $rs->no_pbrg;
					$vendor = "";
				}
				if ($vendor != $rs->vendor){
					if ($vendor != ""){					
						$result->add(str_replace(chr(9),"",$html));	
						$result->setTag1($result->getTag1().",Purchase Order");
						$html = "";
					}
					$vendor = $rs->vendor;				
				}
				$sql2="select b.kode_klpbrg,c.nama as nama_jenis,b.kode_brg,b.nama as nama_brg,a.jumlah,a.harga_kont, a.kode_vendor
					from kop_jual_d a 
					inner join kop_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
					inner join kop_brg_klp c on b.kode_klpbrg=c.kode_klpbrg and a.kode_lokasi=c.kode_lokasi
					inner join kop_pbrg_m d on a.no_jual=d.no_jual and a.kode_lokasi=d.kode_lokasi
					where d.no_pbrg='$rs->no_pbrg'";		
				$j=1;$jum=0;$total=0;
				$rs2 = $dbLib->execute($sql2);
				$htmlD = "";//Untuk menghitung jumlah record. jika beda vendor maka keterangan diubah.
				$keterangan = "";
				$bedaVendor = false;
				$first = true;
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					 if ($row2->kode_vendor == $rs->kode_vendor){
						$jum=$jum+$row2->jumlah;
						$total=$total+($row2->harga_kont * $row2->jumlah);
						$harga=number_format($row2->harga_kont * $row2->jumlah,0,",",".");
						$htmlD.="<tr>
							<td align='center' height='20'>$j</td>
							<td style='padding:3px;'>$row2->kode_klpbrg - $row2->nama_jenis</td>
							<td style='padding:3px;'>$row2->kode_brg - $row2->nama_brg</td>
							<td style='padding:3px;' align='center'>$row2->jumlah</td>
							<td align='right' style='padding:3px;'>$harga</td>
						  </tr>";
						if (!$first) $keterangan .= ",";
						$keterangan .= $row2->nama_brg;
						$j=$j+1;
						$first = false;
					}else $bedaVendor = true;
				}
				if (!$bedaVendor){
					$keterangan = $rs->keterangan;
				}
				$i = $start+1;
				$tanggal=$AddOnLib->ubah_tanggal($rs->tanggal);
				$path = $_SERVER["SCRIPT_NAME"];				
				$path = substr($path,0,strpos($path,"server/serverApp.php"));		
				$pathfoto = $path . "image/banner/kopeg.png";
				$html="<br />";
				$html.=	"<table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						  <tr>
							<td class='isi_bukti'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
							  <tr>
								<td width='124' rowspan='3' align='center'><img src=$pathfoto width='80' height='99' /></td>
								<td width='666' align='center' class='judul_bukti'>KOPERASI PEGAWAI PT. TELKOM KANTOR PERUSAHAAN</td>
							  </tr>
							  <tr>
								<td align='center'><b>Jl. Sentot Alibasha No. 4 Telp. (022) 720511 Fax 7104676 Bandung 40133 </b></td>
							  </tr>
							  <tr>
								<td height='50' align='right' valign='bottom'><b>BADAN HUKUM No. 8 026/BH - DK - 10/1. TANGGAL 7 JUNI 1994 </b></td>
							  </tr>
							</table></td>
						  </tr>
						  <tr>
							<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
							  <tr>
								<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
								  <tr>
									<td width='363' rowspan='4' valign='top'><b>KONTRAK NO : $rs->no_pbrg</b></td>
									<td width='72'>Kepada</td>
									<td width='345'>&nbsp;</td>
								  </tr>
								  <tr>
									<td>Yth.</td>
									<td>$rs->vendor</td>
								  </tr>
								  <tr>
									<td>U/p</td>
									<td>$rs->pic</td>
								  </tr>
								 <tr>
									<td>No Fax</td>
									<td>$rs->no_fax</td>
								  </tr>
								</table></td>
							  </tr>
							  <tr>
								<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
								  <tr>
									<td colspan='2' height='30'>Perihal : Nota Pengambilan Barang </td>
									</tr>
								  <tr>
									<td width='152'>Dengan Hormat, </td>
									<td width='638'>&nbsp;</td>
								  </tr>
								  <tr>
									<td colspan='2' height='30' valign='top'>Harap diserahkan barang tersebut di bawah ini : </td>
									</tr>
								  <tr>
									<td>Nama / NIK </td>
									<td>: $rs->nama / $rs->kode_agg</td>
								  </tr>
								  <tr>
									<td>Divisi / Bagian</td>
									<td>: $rs->kode_loker / $rs->nama_loker</td>
								  </tr>
								  <tr>
									<td>Telp. Kantor </td>
									<td>: $rs->no_telp</td>
								  </tr>
								  <tr>
									<td>Alamat Rumah </td>
									<td>: $rs->alamat</td>
								  </tr>
								  <tr>
									<td>Keterangan</td>
									<td>: $keterangan</td>
								  </tr>
								</table></td>
							  </tr>
							</table></td>
						  </tr>
						  <tr>
							<td align='center' valign='middle' style='padding:10px;'><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
							  <tr bgcolor='#CCCCCC'>
								<td width='34' align='center' height='23'>No</td>
								<td width='186' align='center'>Jenis Barang </td>
								<td width='327' align='center'>Barang</td>
								<td width='73' align='center'>Jumlah</td>
								<td width='158' align='center'>Harga</td>
							  </tr>";
		   
			$html .= $htmlD;//dipindah keatas.
			
			$jum1=number_format($jum,0,",",".");
			$total2=number_format($total,0,",",".");
			$total1=$AddOnLib->terbilang($total);
			$html.="<tr>
						<td colspan='3' align='right' height='20'>Total&nbsp;</td>
						<td style='padding:3px;' align='center'>$jum1</td>
						<td align='right' style='padding:3px;'>$total2</td>
					  </tr>
					</table></td>
				  </tr>
				  <tr>
					<td height='20' style='padding:10px;'><b>Terbilang : $total1</b></td>
				  </tr>
				  <tr>
					<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='284' height='50'>&nbsp;</td>
						<td width='200'>&nbsp;</td>
						<td width='302' align='center' valign='bottom'>Bandung, $tanggal </td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td align='center' height='30' valign='bottom'>General Manager</td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td height='50' align='center'>&nbsp;</td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td align='center' height='50'><u>$rs->gm</u></td>
					  </tr>
					  <tr>
						<td align='center'>Yang Menerima Barang </td>
						<td>&nbsp;</td>
						<td align='center'>Yang Menyerahkan Barang </td>
					  </tr>
					  <tr>
						<td align='center'>ttd</td>
						<td>&nbsp;</td>
						<td align='center' height='50'>ttd&amp; cap toko </td>
					  </tr>
					  <tr>
						<td align='center' valign='center'>(..............................................................)</td>
						<td>&nbsp;</td>
						<td height='50' align='center' valign='center'>(..............................................................)</td>
					  </tr>
					</table></td>
				  </tr>
				</table>
				</body>
				</html>
				";							
			}				
			$result->add(str_replace(chr(9),"",$html));
			$result->setTag1($result->getTag1().",Purchase Order");
			return "";
		}catch(Exception $e){			
		}
	}
	function kuitansiUM($pbrg){
			global $dbLib;			
			$sql = "select  a.no_pbrg, a.kode_agg, b.nama as nm, a.keterangan, a.nilai_um + a.nilai_adm as nilai, date_format(a.tanggal,'%d-%m-%Y') as tgl,
				e.nama as nmkop,concat(e.alamat,', ',e.kota,' ',e.kodepos) as almt,e.no_telp,e.logo, a.nilai_um, a.nilai_adm
				from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi				
				inner join lokasi e on a.kode_lokasi=e.kode_lokasi
				 where a.no_pbrg='".$pbrg."' ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);			
			$status = ($rs->nilai == $rs->nilai_um + $rs->nilai_adm ? "Uang muka dan uang administrasi,": ($rs->nilai == $rs->nilai_adm ? "Uang Administrasi" : "Uang Muka"));
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/".$rs->logo;
			$html="<br />";
			for ($l=1;$l<3;$l++){
			$html.=	"<table width='800' border='2' align='center' cellpadding='0' cellspacing='0' style='border-collapse:collapse; border-color:#111111'>
					  <tr valign='top'>
					    <td height='356'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='11%' rowspan='6' valign='top'><img src=$pathfoto width='80' height='100' /></td>
					        <td width='62%' class='nstyle16'>".$rs->nmkop."</td>
					        <td width='27%' colspan='2' rowspan='6' valign='bottom'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td height='47' colspan='2' class='istyle17'>&nbsp;&nbsp;&nbsp;<u>KWITANSI</u></td>
					            </tr>
					          <tr>
					            <td width='27%' height='30' align='center' valign='top' class='istyle15'>No.</td>
					            <td width='73%' style='border-left-width:0px;' valign='top' class='istyle15'>".$rs->no_pbrg."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td width='62%' class='istyle15'>".$rs->almt."</td>
					        </tr>
					      <tr>
					        <td width='62%' class='istyle15'>No. Telepon : ".$rs->no_telp."</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					    </table>
					      <table width='100%' border='1' cellspacing='0' cellpadding='2' style='border-color:#CCCCCC; border-collapse:collapse;'>
					        <tr>
					          <td width='16%' height='26' align='right' class='istyle15'>Terima dari&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</td>
					          <td width='84%' class='istyle15'>".$rs->nm." [".$rs->kode_agg."]</td>
					        </tr>
					        <tr valign='top'>
					          <td height='47' align='right' class='istyle15'>Sebanyak&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</td>
					          <td class='istyle15'>".$AddOnLib->terbilang($rs->nilai)."</td>
					        </tr>
					        <tr valign='top'>
					          <td align='right' class='istyle15'>Keterangan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>
					          <td class='istyle15'>".$status." ".$rs->keterangan."</td>
					        </tr>
					      </table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='4%' rowspan='6'>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>		
					          <td width='50'>&nbsp;</td>			          
					        </tr>
					        <tr>
					          <td width='24%' rowspan='2' bgcolor='#cccccc' align='center'  class='nstyle18'>Rp. ".number_format($rs->nilai,0,",",".")."</td>
					          <td width='49%' colspan='2' >&nbsp;</td>
					          <td width='40'>&nbsp;</td>
					          <td width='23%' class='istyle15'>Bandung, ".$rs->tgl."</td>
					          <td width='40'>&nbsp;</td>
					        </tr>
					        <tr>
								<td width='100'>&nbsp;</td>					          
								<td class='istyle15'>Penyetor,</td>
								<td width='40'>&nbsp;</td>
								<td class='istyle15'>Mengetahui,</td>
								<td width='40'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td rowspan='3'>&nbsp;</td>
					          <td width='100'>&nbsp;</td>	
					          <td width='100'>&nbsp;</td>
					          <td width='40'>&nbsp;</td>	
					          <td height='76'>&nbsp;</td>
					          <td width='40'>&nbsp;</td>
					        </tr>
					        <tr>
								<td width='100'>&nbsp;</td>	
								<td style='border-bottom:1px solid #CCCCCC; border-collapse:collapse;'>&nbsp;</td>
								<td width='40'>&nbsp;</td>
								<td style='border-bottom:1px solid #CCCCCC; border-collapse:collapse;'>&nbsp;</td>
								<td width='40'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td colspan='7'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td colspan='4' class='istyle14'><em>Halaman ".$l."</em></td>
					        </tr>
					      </table></td>
					  </tr>
					</table><br />";
			if ($l == 1)
			$html.= "<table width='800' border='0' align='center' cellpadding='2' cellspacing='2'>
					  <tr>
					    <td>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </td>
					  </tr>
					</table><br />";
			}
			$html .= "<br />";			
			return str_replace(chr(9),"",$html);
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
