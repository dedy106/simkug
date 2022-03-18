<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;

class server_report_rra_rptSukkaPra extends server_report_basic
{	
	//protected $config = "orarra";	
	function setDBConnection($config){
		$this->config = $config;
	}
	function getTotalPage()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_pdrk)
			from rra_pra_m a
			inner join rra_sukka g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi 
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
			inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
			inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi " . $this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$dbLib = new server_DBConnection_dbLib($this->config);
		$dbLib->connect();
		$dbdriver = $dbLib->connection->driver;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];				
		$sql="select a.no_pdrk, g.keterangan as sukka,a.tanggal,a.jenis_agg,b.nama as nama_ubis,c.nama as nama_gubis,
			   to_char(g.tanggal,'D') as tgl,to_char(g.tanggal,'MM') as bulan,to_char(g.tanggal,'YYYY') as tahun,
			   g.nik_app,d.nama as nama_app, f.no_surat, d.jabatan,
			   h.nama as kota
			from rra_pra_m a
			inner join rra_sukka g on g.no_pdrk = a.no_pdrk and g.kode_lokasi = a.kode_lokasi 
			inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
			inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
			inner join rra_kota h on h.kode_kota = a.kode_kota
			inner join rra_karyawan d on g.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi 
			left outer join rra_nosukka f on f.no_sukka = g.no_sukka and f.kode_lokasi = g.kode_lokasi
			" . $this->filter;
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);			
		$sql2="select 
			   g.kode_cc,g.nama_cc,g.kode_akun,g.nama_akun,g.kode_ba,g.nilai as nilai_penerima,substr(g.periode,5,2) as bln,			   
			   isnull(i.nilai_usulan,0) as nilai_usulan
		from rra_pra_m a
		inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
		inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
		inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
		inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
		inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi
		left join (select distinct x.no_bukti as no_pdrk,x.periode, x.kode_lokasi,x.kode_akun,x.kode_cc,y.kode_ba,y.nama as nama_cc,z.nama as nama_akun, x.nilai
				   from rra_anggaran x
				   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
				   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					where dc='D'
			   )g on a.no_pdrk=g.no_pdrk and a.kode_lokasi=g.kode_lokasi		
		left join (select no_bukti as no_pdrk,kode_lokasi,sum(nilai) as nilai_usulan
				   from rra_anggaran
			   where dc='D'
				   group by no_bukti,kode_lokasi
			  )i on a.no_pdrk=i.no_pdrk and a.kode_lokasi=i.kode_lokasi ";		
		$sql3="select 			   
			   h.kode_cc2,h.nama_cc2,h.kode_akun2,h.nama_akun2,h.kode_ba2, h.nilai as nilai_donor,substr(h.periode,5,2) as bln2,
			   isnull(j.nilai_gar,0) as nilai_gar,
			   isnull(j.saldo,0) as saldo,isnull(j.nilai_pakai,0) as nilai_pakai,isnull(j.nilai,0) as nilai_real
		from rra_pra_m a
		inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi
		inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi 
		inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
		inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi
		inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi
		left join (select distinct x.no_bukti as no_pdrk,x.periode,x.kode_lokasi,x.kode_akun as kode_akun2,x.kode_cc as kode_cc2,y.kode_ba as kode_ba2,y.nama as nama_cc2,z.nama as nama_akun2, x.nilai
				   from rra_anggaran x
				   inner join rra_cc y on x.kode_cc=y.kode_cc and x.kode_lokasi=y.kode_lokasi
				   inner join rra_masakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
				   where dc='C'
			   )h on a.no_pdrk=h.no_pdrk and a.kode_lokasi=h.kode_lokasi
		left join (select no_bukti as no_pdrk,kode_lokasi,
						  sum(nilai_gar) as nilai_gar,sum(saldo) as saldo,sum(nilai_pakai) as nilai_pakai,sum(nilai) as nilai
				   from rra_anggaran
			   where dc='C'
				   group by no_bukti,kode_lokasi
			  )j on a.no_pdrk=j.no_pdrk and a.kode_lokasi=j.kode_lokasi	   ";					
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{						
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$nilai_usulan=number_format($row->nilai_usulan,0,',','.');
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td align='center'><b>KEPUTUSAN SENIOR GENERAL MANAGER <br>
					  FINANCE BILLING AND COLLECTION CENTER<br>
					  PT (PERSERO) TELEKOMUNIKASI INDONESIA, Tbk<br>
					  Nomor : $row->no_surat
					  <p>TENTANG<br>
						SURAT KEPUTUSAN KENDALI ANGGARAN (SUKKA)<br>
						REALOKASI ANGGARAN BEBAN OUTSOURCING OPHAR<br>
					UNIT CORPORATE AFFAIR</p></b></td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
				  </tr>
				  <tr>
					<td>".urldecode($row->sukka);
					echo "<table width='100%'  border='0' cellspacing='2' cellpadding='1'>";  					  
			$sql2 = $sql2 . " where a.no_pdrk = '".$row->no_pdrk."' order by g.kode_cc, g.kode_akun, g.periode";
			$sql3 = $sql3 . " where a.no_pdrk = '".$row->no_pdrk."' order by h.kode_cc2, h.kode_akun2, h.periode";
			$rs2 = $dbLib->execute($sql2);								
			$html1 = " <tr valign='top'>
					<td width='20%'>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td><table width='100%'  class='kotak' border='1' cellspacing='2' cellpadding='1'>
						<tr><td align='center'>Akun</td><td align='center'>Cost Center</td><td align='center'>Bulan</td><td align='center'>Nilai</td></tr> ";
			$html2 = " <tr valign='top'>
					<td >&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td><table width='100%'  class='kotak' border='1' cellspacing='2' cellpadding='1'> 
						<tr><td align='center'>Akun</td><td align='center'>Cost Center</td><td align='center'>Bulan</td><td align='center'>Nilai</td></tr> ";
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{			
				 $html1 .= "<tr><td width='350'>$row2->kode_akun - $row2->nama_akun</td><td width='80'>$row2->kode_cc</td><td width='60'> ".$AddOnLib->ubah_bulan($row2->bln)." </td><td align='right'> Rp ".(number_format($row2->nilai_penerima,0,",",".")).",-</td></tr>";				 
			}
			$rs2 = $dbLib->execute($sql3);
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{							 
				 $html2 .= "<tr><td width='350'>$row2->kode_akun2 - $row2->nama_akun2</td><td width='80'>$row2->kode_cc2</td><td width='60'>".$AddOnLib->ubah_bulan($row2->bln2)."</td><td align='right'> Rp ".(number_format($row2->nilai_donor,0,",",".")).",-</td></tr>";
			}
			$html1 .= "</table></td></tr>";
			$html2 .= "</table></td></tr>";
			echo "  <tr align='center' valign='top'>
					<td colspan='4'><b>MEMUTUSKAN</b></td>
					</tr>
						<tr valign='top'>
					<td><b>Menetapkan</b></td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>Realokasi </td></tr> ";
			echo $html1;
			echo " <tr valign='top'>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>dipenuhi dari:</td></tr> ";
			echo $html2;
			echo "</table></td>
			  </tr>
			  <tr>
				<td>&nbsp;</td>
			  </tr>
			  <tr>
				<td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='70%'>&nbsp;</td>
					<td align='center' width='30%'>$row->kota, $row->tgl $bulan $row->tahun</td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
					<td align='center'>$row->jabatan</td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
					<td height='50'>&nbsp;</td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
					<td align='center'>$row->nama_app</td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
					<td align='center'>NIK : $row->nik_app</td>
				  </tr>
				</table></td>
			  </tr>
			</table>
			";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
/*
 * <table width='100%'  border='0' cellspacing='2' cellpadding='1'>
					  <tr valign='top'>
						<td width='17%'>Menimbang</td>
						<td width='3%'>:</td>
						<td width='4%'>1.</td>
						<td width='76%'>Bahwa dalam RKAP 2010 terdapat beberapa alokasi anggaran yang belum sesuai dengan kegiatannya</td>
					  </tr>
					  <tr valign='top'>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>2.</td>
						<td>Bahwa di Corporate Affair terdapat kegiatan Kontrak tenaga pengemudi lokasi Bandung &amp; jakarta antara TELKOM dengan Kopeg Jaya dan PT Graha Sarna Duta belum didukung ketersediaan anggaranya</td>
					  </tr>
					  <tr valign='top'>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>3.</td>
						<td>Bahwa dipandang perlu menerbitkan Surat Keputusan Kendali Anggaran (SUKKA) oleh SGM Finance Billing And Collection Center</td>
					  </tr>
					  <tr valign='top'>
						<td>Mengingat</td>
						<td>:</td>
						<td>1.</td>
						<td>Keputusan Dewan Komisaris PT TELEKOMUNIKASI INDONESIA Tbk Nomor : 10/KEP/DK/2009/RHS tanggal 10 Desember 2009 tentang Pengesahan Rencana Kerja dan Anggaran Perseroan (RKAP) PT Telekomunikasi Indonesia, Tbk. Tahun 2010</td>
					  </tr>
					  <tr valign='top'>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>2.</td>
						<td>Keputusan Direksi Perusahaan Perseroan (Persero) PT Telekomunikasi Indonesia,Tbk. Nomor KD.01/HK.230/COP-A0012000/2008 tanggal 4 Januari 2008 tentang Kebijakan Pengelolaan Anggaran Perusahaan.</td>
					  </tr>
					  <tr valign='top'>
						<td>Memperhatikan</td>
						<td>:</td>
						<td>1.</td>
						<td>Keputusan Direksi Perusahaan Perseroan (PERSERO) PT TELEKOMUNIKASI INDONESIA Nomor : 45/KU 210/KUG-20/2009 /RHS tanggal 23 Desember 2009 tentang Rencana Kerja dan Anggaran Perseroan (UNCONSOLIDATED) PT Telekomunikasi Indonesia, Tbk. Tahun 2010 UNIT CORPORATE AFFIR</td>
					  </tr>
					  <tr valign='top'>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>2.</td>
						<td>Nota Dinas VP CORPORATE OFFICE SUPPORT nomor : C.Tel. 132/KU 230/COP-F0020000/2010, tanggal 4 Oktober 2010 perihal ABT BODP Outsourcing Jasa Pengemudi.</td>
					  </tr>
					  <tr valign='top'>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
						<td>&nbsp;</td>
					  </tr>
					  <tr align='center' valign='top'>
						<td colspan='4'>MEMUTUSKAN</td>
						</tr>
					  <tr valign='top'>
						<td>Menetapkan</td>
						<td>:</td>
						<td>1.</td> 
						<td>Realokasi :</td>
					  </tr></table> ". */
?>
