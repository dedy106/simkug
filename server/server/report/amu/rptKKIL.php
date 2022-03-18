<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptKKIL extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(*) as tot from (select distinct a.no_inv
					from amu_asset b
					inner join amu_kkl_d a on b.no_gabung = a.no_gabung
					inner join amu_kkl_m aa on aa.no_inv = a.no_inv
					". $this->filter . ") a ";
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
		
		$sql1 = "select * from (select distinct aa.kode_lokfa2 as nmarea, d.nama as nmsbis, e.nama as nmubis,f.nama as nmklp,g.nama as nmapc, k.no_inv, aa.jenis, date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2 
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun				
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter ."
				union 
				select distinct aa.kode_lokfa2 as nmarea, c.nama as nmsbis, d.nama as nmubis, f.nama as nmklp, g.nama as nmapc, k.no_inv, aa.jenis,date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter ."
				union 
				select distinct aa.kode_lokfa2 as nmarea, '-' as nmsbis, c.nama as nmubis, f.nama as nmklp, g.nama as nmapc, k.no_inv, aa.jenis,date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter .") a order by no_inv, nmubis, nmsbis, nmarea ";	
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);	
		$no_inv = "";
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
			
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='10%'><img src='../image/telkomindonesia.png' width='170' height='100'/></td>
        <td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>KERTAS KERJA INVENTARISASI LAPANGAN (KKIL) </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='9%' class='header_laporan'>Divisi / Ubis </td>
        <td width='91%' class='header_laporan'>: $row1->NMUBIS</td>
      </tr>
      <tr>
        <td class='header_laporan'>Regional</td>
        <td class='header_laporan'>: $row1->NMSBIS</td>
      </tr>
      <tr>
        <td class='header_laporan'>Area</td>
        <td class='header_laporan'>: $row1->NMAREA</td>
      </tr>
      <tr>
        <td class='header_laporan'>Group Asset </td>
        <td class='header_laporan'>: ". $row1->NMKLP." ".$row1->NMAPC."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>";	    		
		echo "<tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
	 <tr align='center' bgcolor='#CCCCCC'>
        <td colspan='12' bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
        <td colspan='".($row1->JENIS == "TB" ? "8":"6")."' bgcolor='#00FF00' class='header_laporan'>DATA HASIL LAPANGAN </td>
        </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td class='header_laporan'>No Kartu </td>
        <td class='header_laporan'>SN</td>
        <td class='header_laporan'>BusA</td>
        <td class='header_laporan'>APC</td>
        <td class='header_laporan'>Class</td>
        <td class='header_laporan'>Deskripsi Asset</td>
		<td class='header_laporan'>Deskripsi Alamat</td>
        <td class='header_laporan'>Cap Date </td>
        <td class='header_laporan'>Harga Perolehan </td>
        <td class='header_laporan'>Akumulasi Penyusutan </td>
        <td class='header_laporan'>Nilai Buku </td>
        <td class='header_laporan'>Quantity SAP</td>
        <td class='header_laporan'>Alamat</td>
		<td class='header_laporan'>Jml Fisik Lapangan</td>
        <td class='header_laporan'>No Label </td>
        <td class='header_laporan'>Keberadaan /Status </td>";
        if ($row1->JENIS == "TB")
        echo "<td class='header_laporan'>No Sertifikat / IMB/PBB/DLL</td>
			 <td class='header_laporan'>Luas m2 </td>";        
        echo "<td class='header_laporan'>Update Deskripsi & Lokasi</td>        
        <td class='header_laporan'>Keterangan</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>1</td>
        <td class='header_laporan'>2</td>
        <td class='header_laporan'>3</td>
        <td class='header_laporan'>4</td>
        <td class='header_laporan'>5</td>
        <td class='header_laporan'>6</td>
        <td class='header_laporan'>7</td>
        <td class='header_laporan'>8</td>
        <td class='header_laporan'>9</td>
        <td class='header_laporan'>10</td>
        <td class='header_laporan'>11</td>
        <td class='header_laporan'>12</td>
        <td class='header_laporan'>13</td>
        <td class='header_laporan'>14</td>
        <td class='header_laporan'>15</td>
        <td class='header_laporan'>16</td>
        <td class='header_laporan'>17</td>
		<td class='header_laporan'>18</td>";
		if ($row1->JENIS == "TB")
			echo "<td class='header_laporan'>19</td>
				<td class='header_laporan'>20</td>";
		echo "</tr>";
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$sql2 = "select * from (select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					, c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."'
				union 
				select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."'
				union 
				select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis,b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."' ) a order by no_inv, nmubis, nmsbis, nmarea, nmklp";
		
		$rs = $dbLib->execute($sql2);		
		$nka = "";
		while ($row = $rs->FetchNextObject($toupper=true))
		{
			if ($nka != $row->NO_GABUNG){
				$nilai=number_format($row->NILAI,0,",",".");
				$nilai_ap=number_format($row->NILAI_AP,0,",",".");
				$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");		
				echo "<tr>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td class='isi_laporan'>$row->KODE_KLPAKUN</td>
					<td class='isi_laporan'>$row->KODE_KLPFA</td>
					<td class='isi_laporan'>$row->NAMA</td>
					<td class='isi_laporan'>$row->NAMA2</td>
					<td class='isi_laporan'>$row->TGL_PEROLEHAN</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>
					<td class='isi_laporan'>$row->QTYSAP</td>";
				$nka = $row->NO_GABUNG;
			}else {
				echo "<tr>
					<td class='isi_laporan'>&nbsp;</td>
					<td align='center' class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>
					<td align='right' class='isi_laporan'>&nbsp;</td>
					<td align='right' class='isi_laporan'>&nbsp;</td>
					<td align='right' class='isi_laporan'>&nbsp;</td>
					<td class='isi_laporan'>&nbsp;</td>";
			}
			echo "<td class='isi_laporan'>$row->ALAMAT</td>
				<td align='right' class='isi_laporan'>$row->JML_FISIK</td>
				<td class='isi_laporan'>$row->NO_LABEL</td>
				<td class='isi_laporan'>$row->KODE_STATUS</td>";
				if ($row->JENIS == "TB")
					echo "<td class='isi_laporan'>$row->NO_SERTIFIKAT</td>
						<td class='isi_laporan'>$row->LUAS</td>";
				echo "<td class='isi_laporan'>$row->KET_LOKASI</td>				
				<td class='isi_laporan'>$row->KETERANGAN</td>
			  </tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td align='right'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td colspan='3' align='right' class='header_laporan'> , ".($row1->TGL)."</td>
        </tr>
      <tr >
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
	  <tr height=100 >
        <td align='center' class='header_laporan'>&nbsp</td>
        <td align='center' class='header_laporan'>&nbsp;</td>
        <td align='center' class='header_laporan'>
			<table>
			<tr><td colspan=3>TIM Inventarisasi</td></tr>
			<tr><td>$row1->NIK</td><td>$row1->NAMA</td></tr>
			<tr><td>$row1->NIK2</td><td>$row1->NAMA2</td></tr>
			</table>			
		</td>
      </tr>      
    </table></td>
  </tr>
</table>";
  }
 		//$html = str_replace(chr(9),"",$html);
		return "";
	}
	function createXls($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null){
		uses("server_xls_Writer", false);
		$namafile = "KKIL.xls";
		
		global $dbLib, $manager;		
		$sql1 = "select * from (select distinct aa.kode_lokfa2 as nmarea, d.nama as nmsbis, e.nama as nmubis,f.nama as nmklp,g.nama as nmapc, k.no_inv, aa.jenis, date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2 
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun				
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter ."
				union 
				select distinct aa.kode_lokfa2 as nmarea, c.nama as nmsbis, d.nama as nmubis, f.nama as nmklp, g.nama as nmapc, k.no_inv, aa.jenis,date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter ."
				union 
				select distinct aa.kode_lokfa2 as nmarea, '-' as nmsbis, c.nama as nmubis, f.nama as nmklp, g.nama as nmapc, k.no_inv, aa.jenis,date_format(aa.tanggal, '%d-%m-%Y') as tgl, aa.nik_buat as nik, kk.nama as nama, pp2.nik_app as nik2, kk2.nama as nama2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				left outer join amu_appkkil_d pp on pp.no_inv = aa.no_inv
				left outer join amu_appkkil_m pp2 on pp2.no_app = pp.no_app
				left outer join amu_karyawan kk2 on kk2.nik = pp2.nik_app
				left outer join amu_karyawan kk on kk.nik = aa.nik_buat
				". $this->filter .") a order by no_inv, nmubis, nmsbis, nmarea ";	
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);
		//$rs1 = $dbLib->execute($sql1);				
		$no = "";
		$i = 1;
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$AddOnLib=new server_util_AddOnLib();		
		$html = "";
		$jenis = $this->filter2;				
		$coltitle = array("Asset", "SNo.","Descript.","Class Desc.","Descript2.","Cap.Date","Acquis.Val","Accum.val","Book.val","Quantity","Area","SBIS","UBIS","Dist.No","Class","APC","APC Desc","BA","Plant","Location");			
		while ($row1 = $rs1->FetchNextObject($toupper=true)){																					
			$excel = new Spreadsheet_Excel_Writer();		
			$excel->send($namafile);
			$excel->setCustomColor(14, 204,204,204); 
			$excel->setCustomColor(15, 0,156,0);
				
			$headerFormat =& $excel->addFormat(array('bold' => true, 'halign' => 'center','valign' => 'center','textwrap' => 1,'size' => 9));	//, 
			$numFormat =& $excel->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top','textwrap' => 1,'size' => 9));
			$nkaFormat =& $excel->addFormat(array('numformat' => '#','border' => 1,'bordercolor' => 'black','valign' => 'top','textwrap' => 1,'size' => 9));
			$normalFormat =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top','textwrap' => 1,'size' => 9));
			$yellow =& $excel->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1,'size' => 9));		
			$green =& $excel->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 15,'pattern' => 1	,'size' => 9));
			$grey =& $excel->addFormat(array('bold' => false, 'border' => 1,'halign' => 'center','valign' => 'center', 'bordercolor' => 'black','fgcolor' => 14,'pattern' => 1	,'size' => 9));
			$normalHeader =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black','halign' => 'center','valign' => 'center','textwrap' => 1,'size' => 9));
			$format_top_center =& $excel->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
			$formatCatatan =& $excel->addFormat(array('size' => 8));		
			$rowcount = 2;
			$sheet =& $excel->addWorksheet("Lampiran - ". (substr($row1->KODE_KLPFA,0,3) == "101" ? "1":"2"));							
			$sheet->setMerge($rowcount, 3, $rowcount, (substr($row1->KODE_KLPFA,0,3) == "101" ? 17:15));
			$sheet->write($rowcount, 3, "KERTAS KERJA INVENTARISASI LAPANGAN (KKIL)", $headerFormat);
						
			$rowcount+=2;
			$sheet->write($rowcount,0,"Divisi / UBIS");$sheet->setMerge($rowcount,3,$rowcount,7); $sheet->write($rowcount,3,":".$row1->NMUBIS);
			$rowcount++;
			$sheet->write($rowcount,0,"Regional");$sheet->setMerge($rowcount,3,$rowcount,7);$sheet->write($rowcount,3,":".$row1->NMSBIS);
			$rowcount++;
			$sheet->write($rowcount,0,"Area");$sheet->setMerge($rowcount,3,$rowcount,7);$sheet->write($rowcount,3,":".$row1->NMAREA);
			$rowcount++;
			$sheet->write($rowcount,0,"Group Aset");$sheet->setMerge($rowcount,3,$rowcount,7);$sheet->write($rowcount,3,":".$row1->NMKLP ." ".$row1->NMAPC);
			
			$rowcount+=2;
			$sheet->setMerge($rowcount,0,$rowcount,11); $sheet->write($rowcount,0,"DATA SAP AM",$yellow);
			for ($r = 1;$r <= 11; $r++) $sheet->write($rowcount,$r, "", $yellow);
			$sheet->setMerge($rowcount,12,$rowcount,($row1->JENIS == "TB" ? 19 : 17)); $sheet->write($rowcount,12,"DATA HASIL LAPANGAN",$green);
			for ($r = 13;$r <= 17; $r++) $sheet->write($rowcount,$r, "",$green);
			if ($row1->JENIS == "TB"){
				$sheet->write($rowcount,18, "",$green);
				$sheet->write($rowcount,19, "",$green);
			}
			$rowcount++;
			$sheet->write($rowcount,0,"No Kartu",$grey);$sheet->setColumn(0, 0, 14);
			$sheet->write($rowcount,1,"SN",$grey);$sheet->setColumn(1, 1, 3);
			$sheet->write($rowcount,2,"Bus A",$grey);$sheet->setColumn(2, 2, 5);
			$sheet->write($rowcount,3,"APC",$grey);$sheet->setColumn(3, 3, 9);
			$sheet->write($rowcount,4,"Class",$grey);$sheet->setColumn(4, 4, 7);
			$sheet->write($rowcount,5,"Deskripsi Aset",$grey);$sheet->setColumn(5, 5, 50);
			$sheet->write($rowcount,6,"Deskripsi Alamat",$grey);$sheet->setColumn(6, 6, 50);
			$sheet->write($rowcount,7,"Cap Date",$grey);$sheet->setColumn(7, 7, 12);
			$sheet->write($rowcount,8,"Harga Perolehan",$grey);$sheet->setColumn(8, 8, 20);
			$sheet->write($rowcount,9,"Akumulasi Penyusutan",$grey);$sheet->setColumn(9, 9, 20);
			$sheet->write($rowcount,10,"Nilai Buku",$grey);$sheet->setColumn(10, 10, 20);
			$sheet->write($rowcount,11,"Quantity SAP",$grey);$sheet->setColumn(11, 11, 14);			
						
			$sheet->write($rowcount,12,"Alamat",$grey);$sheet->setColumn(12, 12, 20);	
			$sheet->write($rowcount,13,"Jml Fisik Lapangan",$grey);$sheet->setColumn(13, 13, 20);	
			$sheet->write($rowcount,14,"No Label",$grey);$sheet->setColumn(14, 14, 20);	
			$sheet->write($rowcount,15,"Keberadaan / Status",$grey);$sheet->setColumn(15, 15, 20);								
			$colActive = 16;
			if ($row1->JENIS == "TB"){
				$sheet->write($rowcount,$colActive,"No Sertifikat / IMB/PBB/DLL",$grey);$sheet->setColumn($colActive, $colActive, 20);	
				$sheet->write($rowcount,$colActive+1,"Luas m2",$grey);$sheet->setColumn($colActive+1,$colActive+1, 20);													
				$colActive+=2;
			}			
			$sheet->write($rowcount,$colActive,"Update Deskripsi & Lokasi",$grey);$sheet->setColumn($colActive, $colActive, 20);	
			$sheet->write($rowcount,$colActive+1,"Keterangan",$grey);$sheet->setColumn($colActive+1,$colActive+1, 20);																		
			$rowcount++;
			for ($r = 1;$r <= 12; $r++) $sheet->write($rowcount,$r - 1, $r, $normalHeader);
			for ($r = 13;$r <= 18; $r++) $sheet->write($rowcount,$r - 1, $r, $normalHeader);
			if ($row1->JENIS == "TB"){
				$sheet->write($rowcount,18, "19", $normalHeader);
				$sheet->write($rowcount,19, "20", $normalHeader);
			}
			$nilai=0;$nilai_ap=0;$nilai_buku=0;
			$sql2 = "select * from (select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					, c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."'
				union 
				select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."'
				union 
				select distinct dd.no_bukti, b.no_gabung,b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis,b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where aa.no_inv = '".$row1->NO_INV ."' ) a order by no_inv, nmubis, nmsbis, nmarea, nmklp";
		
				$rs = $dbLib->execute($sql2);		
				$nka = "";
				while ($row = $rs->FetchNextObject($toupper=true))
				{
					$rowcount++;
					if ($nka != $row->NO_GABUNG){
				
						$sheet->write($rowcount,0, $row->NO_FA, $nkaFormat);
						$sheet->write($rowcount,1, $row->NO_SN, $normalFormat);
						$sheet->write($rowcount,2, $row->KODE_LOKFA, $normalFormat);
						$sheet->write($rowcount,3, $row->KODE_KLPAKUN, $normalFormat);
						$sheet->write($rowcount,4, $row->KODE_KLPFA, $normalFormat);
						$sheet->write($rowcount,5, $row->NAMA, $normalFormat);
						$sheet->write($rowcount,6, $row->NAMA2, $normalFormat);
						$sheet->write($rowcount,7, $row->TGL_PEROLEHAN, $normalFormat);
						$sheet->write($rowcount,8, $row->NILAI, $numFormat);
						$sheet->write($rowcount,9, $row->NILAI_AP, $numFormat);
						$sheet->write($rowcount,10, $row->NILAI_BUKU, $numFormat);
						$sheet->write($rowcount,11, $row->QTYSAP, $numFormat);						
						$nka = $row->NO_GABUNG;
					}else {
						$sheet->write($rowcount,0, "", $normalFormat);
						$sheet->write($rowcount,1, "", $normalFormat);
						$sheet->write($rowcount,2, "", $normalFormat);
						$sheet->write($rowcount,3, "", $normalFormat);
						$sheet->write($rowcount,4, "", $normalFormat);
						$sheet->write($rowcount,5, "", $normalFormat);
						$sheet->write($rowcount,6, "", $normalFormat);
						$sheet->write($rowcount,7, "", $normalFormat);
						$sheet->write($rowcount,8, "", $normalFormat);
						$sheet->write($rowcount,9, "", $normalFormat);
						$sheet->write($rowcount,10, "", $normalFormat);						
						$sheet->write($rowcount,11, "", $normalFormat);
					}
					$sheet->write($rowcount,12, $row->ALAMAT, $normalFormat);
					$sheet->write($rowcount,13, $row->JML_FISIK, $normalFormat);
					$sheet->write($rowcount,14, $row->NO_LABEL, $normalFormat);
					$sheet->write($rowcount,15, $row->KODE_STATUS, $normalFormat);										
					$colActive = 16;
					if ($row->JENIS == "TB"){
						$sheet->write($rowcount,$colActive, $row->NO_SERTIFIKAT, $normalFormat);
						$sheet->write($rowcount,$colActive+1, $row->LUAS, $normalFormat);							
						$colActive +=2;
					}					
					$sheet->write($rowcount,$colActive, $row->KET_LOKASI, $normalFormat);
					$sheet->write($rowcount,$colActive+1, $row->KETERANGAN, $normalFormat);					
					$i=$i+1;			
			}					
			$sheet->insertBitmap(0,0,"../image/telkom.bmp",0,0,1,1);			
			$rowcount+= 8;			
			$sheet->setMerge($rowcount,17,$rowcount,19);$sheet->write($rowcount,17,"............, $row1->TGL");
			$rowcount+=2;
			$sheet->setMerge($rowcount,3,$rowcount,8); $sheet->write($rowcount,3,"KETUA TIM INVENTARISASI ASET TETAP");
			$sheet->setMerge($rowcount,16,$rowcount,18); $sheet->write($rowcount,16,"TIM INVENTARISASI");
			$rowcount++;
			$sheet->setMerge($rowcount,3,$rowcount,6); $sheet->write($rowcount,3,"UBIS/SBIS");						
			$rowcount+=5;
			$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"______________________");			
			$sheet->setMerge($rowcount,16,$rowcount,18); $sheet->write($rowcount,16,"____________________");
			$rowcount++;
			$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"NIK:.........................");			
			$sheet->setMerge($rowcount,16,$rowcount,18); $sheet->write($rowcount,16,"NIK:..........................");
			$sheet->hideScreenGridlines();
			$sheet->hideGridlines();
			$excel->close();		
		}
		
		$respon;
	}		
}
?>
