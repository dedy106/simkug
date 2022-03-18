<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptBAKKP extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(*) from amu_ba_m a ".$this->filter  ." and jenis_ba = 'REKON' ";
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
		
		$sql1 = "select distinct a.no_ba,tgl_ba,to_char(tgl_ba,'DY') as hari_ba,to_char(tgl_ba,'DD') as tgl_ba,to_char(tgl_ba,'MM') as bulan_ba,
			to_char(tgl_ba,'YYYY') as tahun_ba,a.tempat,a.alamat,b.nama,date_format(a.tgl_inv_mulai,'%d-%m-%Y') as tgl_inv_mulai,date_format(a.tgl_inv_selesai,'%d-%m-%Y') as tgl_inv_selesai,
			to_char(tgl_rekon_mulai,'DY') as hari_mulai,to_char(tgl_rekon_mulai,'DD') as tgl_mulai,to_char(tgl_rekon_mulai,'MM') as bulan_mulai,
			to_char(tgl_rekon_mulai,'YYYY') as tahun_mulai,
			to_char(tgl_rekon_selesai,'DY') as hari_selesai,to_char(tgl_rekon_selesai,'DD') as tgl_selesai,to_char(tgl_rekon_selesai,'MM') as bulan_selesai,
			to_char(tgl_rekon_selesai,'YYYY') as tahun_selesai,
			date_format(a.tgl_rekon_selesai,'%d-%m-%Y') as tgl_rekon_selesai, a.kode_lokfa, a.jenis, a.nik_app1, a.nik_app2, a.nik_app3, a.nik_app4,c.nama as nmoff, d.nama as nmapp1, e.nama as nmapp2, f.nama as nmapp3
		from amu_ba_m a
			inner join amu_lokasi b on a.kode_lokfa=b.kode_lokfa 
			left outer join amu_karyawan c on c.nik = a.nik_app1
			left outer join amu_karyawan d on d.nik = a.nik_app2
			left outer join amu_karyawan e on e.nik = a.nik_app3
			left outer join amu_karyawan f on f.nik = a.nik_app4
			". $this->filter ." and a.jenis_ba = 'REKON' ";
		
		$AddOnLib=new server_util_AddOnLib();
		$rs1 = $dbLib->execute($sql1);
		$html = "";
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
			$hari=$AddOnLib->ubahNamaHari($row1->HARI_BA);
			$bulan=$AddOnLib->ubah_bulan($row1->BULAN_BA);
			$hari_mulai=$AddOnLib->ubahNamaHari($row1->HARI_MULAI);
			$bulan_mulai=$AddOnLib->ubah_bulan($row1->BULAN_MULAI);
			$hari_selesai=$AddOnLib->ubahNamaHari($row1->HARI_SELESAI);
			$bulan_selesai=$AddOnLib->ubah_bulan($row1->BULAN_SELESAI);
			$sql2="select a.nama
				from amu_klp a
				inner join (select distinct y.kode_klpfa
				from amu_ba_inv x
				inner join amu_asset y on x.no_gabung=y.no_gabung
				where x.no_ba = '". $row1->NO_BA ."' 
				) b on a.kode_klpfa=b.kode_klpfa";
			$rs2 = $dbLib->execute($sql2);
			//diambil dari amu_rekon_d//
			$sql3="select e.kode_status, e.nama, sum(case when f.no_gabung is null then 0 else 1 end) as jml, sum(ifnull(f.nilai_buku,0)) as nilai_buku 
			 from amu_status e 
			 left outer join (select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  
				inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa and d.kode_induk = '00'
				inner join amu_kkl_d b on a.no_gabung = b.no_gabung 
				inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '$row1->JENIS' and c.tanggal between to_date('". $row1->TGL_INV_MULAI ."','dd/mm/YYYY') and to_date('". $row1->TGL_INV_SELESAI."','dd/mm/YYYY')
				where a.kode_lokfa = '". $row1->KODE_LOKFA. "' and c.progress = '3'  
				union
				select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  
				inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00'
				inner join amu_kkl_d b on a.no_gabung = b.no_gabung 
				inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '$row1->JENIS' and c.tanggal between to_date('". $row1->TGL_INV_MULAI ."','dd/mm/YYYY') and to_date('". $row1->TGL_INV_SELESAI."','dd/mm/YYYY')
				where e.kode_lokfa = '". $row1->KODE_LOKFA. "' and c.progress = '3'  
				union				
				select distinct b.status_nka as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  
				inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk 
				inner join amu_lokasi f on f.kode_lokfa = e.kode_induk and f.kode_induk = '00'
				inner join amu_kkl_d b on a.no_gabung = b.no_gabung 
				inner join amu_kkl_m c on c.no_inv = b.no_inv and a.kode_lokasi = b.kode_lokasi and c.jenis = '$row1->JENIS' and c.tanggal between to_date('". $row1->TGL_INV_MULAI ."','dd/mm/YYYY') and to_date('". $row1->TGL_INV_SELESAI."','dd/mm/YYYY')
				where f.kode_lokfa = '". $row1->KODE_LOKFA. "' and c.progress = '3'  ) f on f.kode_status = e.kode_status 
				where e.jenis  = '".$row1->JENIS . "' 
				group by e.kode_status, e.nama order by e.kode_status ";			
			$rs3 = $dbLib->execute($sql3);
			
			$sql3="select a.kode_status,a.nama,b.jml,b.nilai_buku
				from amu_status a inner join amu_ba_d b on b.kode_status = a.kode_status							
				where b.no_ba = '". $row1->NO_BA ."' and a.jenis = '".$row1->JENIS . "'
				order by a.kode_status";
			$rs5 = $dbLib->execute($sql3);
			
			$rs4 = $dbLib->execute("select c.nama, b.nama as sbis, a.nama as ba from amu_lokasi a 
					inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi 
					inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00' 
					where c.kode_lokfa = '". $row1->KODE_LOKFA."' 
					union 
					select b.nama, a.nama as sbis,'-' from amu_lokasi a 
					inner join amu_lokasi b on b.kode_lokfa = a.kode_induk and b.kode_lokasi = a.kode_lokasi and b.kode_induk = '00' 					
					where b.kode_lokfa = '". $row1->KODE_LOKFA."'  
					union 
					select nama, '-','-' from amu_lokasi a 					
					where a.kode_lokfa = '". $row1->KODE_LOKFA."' and kode_induk = '00' ");			
			$dataDivisi = $rs4->FetchNextObject(true);
		
		$html.="<table width=650 border=0 cellspacing=2 cellpadding=1>
  <tr>
    <td align=center style='font-size:14;font-weight:bold;'>BERITA ACARA </td>
  </tr>
 
  <tr>
    <td align=center style='font-size:14;font-weight:bold;'>REKONSILASI INVENTARISASI FISIK ASET TETAP</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><p>Pada hari ini $hari tanggal $row1->TGL_BA bulan $bulan tahun $row1->TAHUN_BA bertempat di ". $row1->TEMPAT ." beralamat di ". $row1->ALAMAT." telah diselesaikan rekonsiliasi atas hasil inventarisasi fisik oleh Tim  Inventarisasi Fisik Aset tetap PT. Telekomunikasi Indonesia Tbk - Divisi ".$dataDivisi->NAMA ." untuk jenis aset tetap sebagai berikut :</p></td>
  </tr>
  <tr>
    <td><table width=400 border=0 cellspacing=2 cellpadding=1>";
		$j=0;
		while ($row2 = $rs2->FetchNextObject($toupper=true))
		{	
			$j=$j+1;
			$html.="<tr><td width=32 align='center'>$j.</td><td width=358>$row2->NAMA</td></tr>";
		}
		$html.="</table></td>
  </tr>
  <tr>
    <td><p>Atas daftar aset tetap  per tanggal 30-Juni-2010 yang telah selesai diinventarisasi per tanggal $row1->TGL_INV_SELESAI yang berada di bawah Divisi ".$dataDivisi->NAMA ." </p></td>
  </tr>
  
  <tr>
    <td><p>Proses pekerjaan rekonsiliasi hasil inventarisasi fisik di mulai pada hari $hari_mulai tanggal $row1->TGL_MULAI bulan $bulan_mulai tahun $row1->TAHUN_MULAI dan selesai  pada $hari_seleai tanggal $row1->TGL_SELESAI bulan $bulan_selesai tahun $row1->TAHUN_SELESAI , dengan ringkasan hasilnya  sebagai berikut :</p></td>
  </tr>
  <tr>
    <td><p>Hasil inventarisasi fisik lapangan :</p></td>
  </tr>
  <tr>
    <td><table width=500 border=1 cellspacing=0 cellpadding=0 class='kotak'>
      <tr>
        <td width=50 align=center>Status</td>
        <td width=250 align=center>Deskripsi Status </td>
        <td width=80 align=center>Jumlah Kartu Asset </td>
        <td width=120 align=center>Nilai Buku</td>
      </tr>";
      $total = 0;
      $total2 = 0;
	  while ($row3 = $rs3->FetchNextObject($toupper=true))
	  {
			$jml=number_format($row3->JML,0,",",".");
			$nilai_buku=number_format($row3->NILAI_BUKU,0,",",".");
			$total += $row3->NILAI_BUKU;
			$total2 += $row3->JML;
			$html.="<tr>
        <td align='center'>$row3->KODE_STATUS</td>
        <td>$row3->NAMA</td>
        <td align='right'>$jml</td>
        <td align='right'>$nilai_buku</td>
      </tr>";
	  }
	  $html.="
      <tr>
        <td colspan=2 align=right>Total</td>
        <td align=right>".number_format($total2,0,",",".")."</td>
        <td align=right>".number_format($total,0,",",".")."</td> 
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><p>&nbsp;</p></td>
  </tr>
  <tr>
    <td><p>Hasil verifikasi dan rekonsiliasi :</p></td>
  </tr>
  <tr>
    <td><table width=500 border=1 cellspacing=0 cellpadding=0 class='kotak'>
      <tr>
        <td width=50 align=center>Status</td>
        <td width=250 align=center>Deskripsi Status </td>
        <td width=80 align=center>Jumlah Kartu Asset </td>
        <td width=120 align=center>Nilai Buku</td>
      </tr>";
      $total = 0;
      $total2 = 0;
	  while ($row3 = $rs5->FetchNextObject($toupper=true))
	  {
			$jml=number_format($row3->JML,0,",",".");
			$nilai_buku=number_format($row3->NILAI_BUKU,0,",",".");
			$total += $row3->NILAI_BUKU;
			$total2 += $row3->JML;
			$html.="<tr>
        <td align='center'>$row3->KODE_STATUS</td>
        <td>$row3->NAMA</td>
        <td align='right'>$jml</td>
        <td align='right'>$nilai_buku</td>
      </tr>";
	  }
	  $html.="
      <tr>
        <td colspan=2 align=right>Total</td>
        <td align=right>". number_format($total2,0,",",".") ."</td>
        <td align=right>". number_format($total,0,",",".") ."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><p>Kertas  Kerja&nbsp; Inventarisasi Fisik Lapangan (  KKIL ) dilampirkan bersama Berita Acara ini.</p>
    Demikian Berita Acara Hasil Inventarisasi Fisik  Aset tetap ini dibuat, sebagai bukti tertulis bahwa&nbsp; inventarisasi fisik aset tetap telah  dilakukan dengan hasil akhir seperti tersebut di atas</td>
  </tr>
  <tr>
    <td align=right><table width=600 border=0 cellspacing=2 cellpadding=1>
      <tr>
        <td colspan=4 align=center>Yang bertandatangan :</td>
      </tr>
      <tr>
        <td colspan=4 align=right> Dibuat  Oleh :</td>
      </tr>
      <tr>
        <td align=center>&nbsp;</td>
        <td align=center>&nbsp;</td>
        <td align=center>&nbsp;</td>
        <td align=center>&nbsp;</td>
      </tr>
      <tr>
        <td align=center valign=top><p>Ketua Tim VEAT</p>
            <p>&nbsp;</p>
          <p>$row1->NMAPP3</p></td>
        <td align=center valign=top>&nbsp;</td>
        <td align=center valign=top><p>Manager........ </p>
            <p>&nbsp;</p>
          <p>$row1->NMAPP1 </p></td>
        <td align=center valign=top><p>Tim Inventarisasi</p>
            <p>&nbsp;</p>
          <p>$row1->NMOFF</p></td>
      </tr>      
      <tr>
        <td align=center>NIK : $row1->NIK_APP4 </td>
        <td align=center>&nbsp;</td>
        <td align=center>NIK : $row1->NIK_APP2</td>
        <td align=center>NIK : $row1->NIK_APP1</td>
      </tr>
    </table></td>
  </tr>
</table>
";
			$i=$i+1;
		}
 		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	
}
?>
