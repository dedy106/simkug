<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptKKP extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(*) as tot from (select distinct r.no_rekon
					from amu_asset b
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_induk = '00'
					inner join amu_rekon_d r on b.no_gabung = r.no_gabung
					inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
					". $this->filter . "
					union 
					select distinct r.no_rekon
					from amu_asset b
					inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa 
					inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'
					inner join amu_rekon_d r on b.no_gabung = r.no_gabung
					inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon					
					". $this->filter . "
					union 
					select distinct r.no_rekon
					from amu_asset b
					inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa 
					inner join amu_lokasi e on e.kode_lokfa = d.kode_induk
					inner join amu_lokasi c on c.kode_lokfa = e.kode_induk and c.kode_induk = '00'
					inner join amu_rekon_d r on b.no_gabung = r.no_gabung
					inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon					
					". $this->filter . "
					) a ";
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
		
		$sql1 = "select * from (select distinct e.nama as nmarea, d.nama as nmsbis, c.nama as nmubis,f.nama as nmklp,g.nama as nmapc, r.no_rekon, aa.jenis, date_format(rr.tanggal, '%d-%m-%Y') as tgl
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi e on e.kode_lokfa = b.kode_lokfa and e.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = e.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter ."
				union 
				select distinct '-' as nmarea, d.nama as nmsbis, c.nama as nmubis, f.nama as nmklp, g.nama as nmapc, r.no_rekon, aa.jenis,date_format(rr.tanggal, '%d-%m-%Y') as tgl
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi d on d.kode_lokfa = b.kode_lokfa and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter ."
				union 
				select distinct '-' as nmarea, '-' as nmsbis, c.nama as nmubis, f.nama as nmklp, g.nama as nmapc, r.no_rekon, aa.jenis,date_format(rr.tanggal, '%d-%m-%Y') as tgl
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter .") a order by no_rekon, nmubis, nmsbis, nmarea ";	
		
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);	
		$no_inv = "";
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
			
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
      <tr>
        <td width='10%'><img src='../image/telkomindonesia.png' width='170' height='100'/></td>
        <td width='70%' align='center' valign='bottom' class='lokasi_laporan2'>KERTAS KERJA PELAKSANAAN PEKERJAAN </td>        
		<td rowspan=2 width='20%'>
			  <table width='100%' class='kotak' border=1>
				<tr>
					<td align=center> Dibuat Oleh </td>
					<td align=center> Diperiksa Oleh </td>
					<td align=center> Disetujui Oleh </td>
				</tr>
				<tr height=100>
					<td valign='bottom'>Officer AMU</td>
					<td valign='bottom'>Manager UBIS</td>
					<td valign='bottom'>SM GS UBIS</td>
				</tr>
				<tr>
					<td> Tgl: </td>
					<td> Tgl: </td>
					<td> Tgl: </td>
				</tr>
			</table>
		</td>
      </tr>
      <tr>
        <td width='10%' class='header_laporan' align='right'>Divisi / Ubis </td>
        <td width='70%' class='header_laporan'>: $row1->NMUBIS</td>
      </tr>      
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>";	    		
		echo "<tr>
    <td><table  width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
	 <tr align='center' bgcolor='#CCCCCC'>
        <td colspan='12' rowspan=2 bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
        <td colspan='".($row1->JENIS == "TB" ? "10":"8")."' rowspan=2 bgcolor='#00FF00' class='header_laporan'>DATA HASIL LAPANGAN </td>
        <td colspan='10' bgcolor='#00FF00' class='header_laporan'>KERTAS KERJA REKONSILIASI  </td>
        </tr>
       <tr align='center' bgcolor='#CCCCCC'>        
        <td colspan='7' bgcolor='#00FF00' class='header_laporan'> HASIL REKONSILIASI ASET TETAP </td>
        <td colspan='3' bgcolor='#00FF00' class='header_laporan'> HASIL VERIFIKASI </td>
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
		<td class='header_laporan'>Jml Fisik Lapangan</td>
        <td class='header_laporan'>No Label </td>
        <td class='header_laporan'>Keberadaan /Status </td>";
        if ($row1->JENIS == "TB")
        echo "<td class='header_laporan'>No Sertifikat/IMB/PBB/DLL</td>
			 <td class='header_laporan'>Luas (m2) </td>";        
        echo "
        <td width='150' class='header_laporan'>Update Deskripsi</td>        
        <td width='150' class='header_laporan'>Update Alamat / Lokasi</td>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>No KKIL</td>
        <td class='header_laporan'>Tgl Invt.</td>        
        <td class='header_laporan'>Informasi KKP = KKIL</td>
        <td class='header_laporan'>Aset Tercatat per Count Date</td>
        <td class='header_laporan'>Selisih Fisik & Catatan</td>
        <td class='header_laporan'>Penjelasan atas selisih </td>        
        <td width='150'  class='header_laporan'>Update Deskripsi Aset</td>
        <td width='150'  class='header_laporan'>Update Lokasi</td>
        <td class='header_laporan'>Update BA</td>
        <td class='header_laporan'>Status Final</td>
        <td class='header_laporan'>Cara Verifikasi</td>
        <td class='header_laporan'>Tindak Lanjut Final</td>
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
		<td class='header_laporan'>18</td>
		<td class='header_laporan'>19</td>
		<td class='header_laporan'>20</td>";
		
		$col = 20;
		if ($row1->JENIS == "TB"){			
			echo "<td class='header_laporan'>21</td>
				<td class='header_laporan'>22</td>";
			$col = 22;
		}
		for ($c = 1; $c <= 10; $c++) echo "<td class='header_laporan'>".($c + $col)."</td>";
		echo "</tr>";
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$sql2 = "select * from (select distinct dd.no_bukti, b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					, c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis, date_format(aa.tanggal,'%d-%m-%Y') as tgl_inv
					, r.INFO_KKP	,r.STATUS_ASSET	,r.SELISIH	,r.PENJELASAN	,r.TINDAKAN	,r.KETERANGAN as sls	,r.LOKASI	,r.BA	,r.STATUS_FINAL	,r.VERIFIKASI,r.tindakan2
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
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where rr.no_rekon = '".$row1->NO_REKON ."'
				union 
				select distinct dd.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi, k.keterangan, aa.no_inv, aa.jenis, date_format(aa.tanggal,'%d-%m-%Y') as tgl_inv
					, r.INFO_KKP	,r.STATUS_ASSET	,r.SELISIH	,r.PENJELASAN	,r.TINDAKAN	,r.KETERANGAN as sls	,r.LOKASI	,r.BA	,r.STATUS_FINAL	,r.VERIFIKASI,r.tindakan2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where rr.no_rekon = '".$row1->NO_REKON ."'
				union 
				select distinct dd.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik as qtysap
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis,b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					, s.nama as nm_status, k.alamat as desk_almt, k.jml_fisik, k.no_label, k.kode_status, k.no_sertifikat, k.luas, k.ket_lokasi as desk, k.keterangan, aa.no_inv, aa.jenis, date_format(aa.tanggal,'%d-%m-%Y') as tgl_inv
					, r.INFO_KKP	,r.STATUS_ASSET	,r.SELISIH	,r.PENJELASAN	,r.TINDAKAN	,r.KETERANGAN as updesk	,r.LOKASI	,r.BA	,r.STATUS_FINAL	,r.VERIFIKASI,r.tindakan2
					from amu_asset b 					
				inner join amu_distaset_d dd on dd.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				inner join amu_kkl_d k on k.no_gabung = b.no_gabung 
				inner join amu_kkl_m aa on aa.no_inv = k.no_inv
				inner join amu_status s on s.kode_status = k.kode_status and s.jenis = aa.jenis 
				inner join amu_rekon_d r on r.no_gabung = b.no_gabung
				inner join amu_rekon_m rr on rr.no_rekon = r.no_rekon
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				
				where rr.no_rekon = '".$row1->NO_REKON ."' ) a order by no_inv, nmubis, nmsbis, nmarea, nmklp";
		
		$rs = $dbLib->execute($sql2);		
		while ($row = $rs->FetchNextObject($toupper=true))
		{
			$nilai=number_format($row->NILAI,0,",",".");
			$nilai_ap=number_format($row->NILAI_AP,0,",",".");
			$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");		
			echo "<tr>
				<td class='isi_laporan'>$row->NO_FA</td>
				<td align='center' class='isi_laporan'>$row->NO_SN</td>
				<td class='isi_laporan'>$row->KODE_LOKFA</td>
				<td class='isi_laporan'>$row->KODE_KLPAKUN</td>
				<td class='isi_laporan'>$row->KODE_KLPFA</td>
				<td class='isi_laporan' width='150'>$row->NAMA</td>
				<td class='isi_laporan' width='150'>$row->NAMA2</td>
				<td class='isi_laporan'>$row->TGL_PEROLEHAN</td>
				<td align='right' class='isi_laporan'>$nilai</td>
				<td align='right' class='isi_laporan'>$nilai_ap</td>
				<td align='right' class='isi_laporan'>$nilai_buku</td>
				<td class='isi_laporan'>$row->QTYSAP</td>			
				<td align='right' class='isi_laporan'>$row->JML_FISIK</td>
				<td class='isi_laporan'>$row->NO_LABEL</td>
				<td class='isi_laporan'>$row->KODE_STATUS</td>";
				if ($row->JENIS == "TB")
					echo "<td class='isi_laporan'>$row->NO_SERTIFIKAT</td>
						<td class='isi_laporan'>$row->LUAS</td>";
				echo "
					<td class='isi_laporan'>$row->DESK</td>
					<td class='isi_laporan'>$row->DESK_ALMT</td>								
					<td class='isi_laporan'>$row->KETERANGAN</td>		
					<td class='isi_laporan'>$row->NO_BUKTI</td>
					<td class='isi_laporan'>$row->TGL_INV</td>					
					<td class='isi_laporan'>$row->INFO_KKP</td>
					<td class='isi_laporan'>$row->STATUS_ASSET</td>
					<td class='isi_laporan'>$row->SELISIH</td>
					<td class='isi_laporan'>$row->PENJELASAN</td>					
					<td class='isi_laporan'>$row->UPDESK</td>
					<td class='isi_laporan'>$row->LOKASI</td>
					<td class='isi_laporan'>$row->BA</td>
					<td class='isi_laporan'>$row->STATUS_FINAL</td>
					<td class='isi_laporan'>$row->VERIFIKASI</td>
					<td class='isi_laporan'>$row->TINDAKAN2</td>
			  </tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
			  </tr>
			  <tr>
				<td>&nbsp;</td>
			  </tr>
			  
			  <tr>
				<td align='right'></td>
			  </tr>
			</table>";
		}
 		//$html = str_replace(chr(9),"",$html);
		return "";
	}
	function createXls($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null){
		uses("server_xls_Writer", false);
		if (!isset($namafile)) $namafile = "KKIL.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 192,192,192); 
		
		$sheet =& $excel->addWorksheet('report');
		$headerFormat =& $excel->addFormat();
		$headerFormat->setBold();			
		$headerFormat->setBgColor(14);
		$headerFormat->setBorder(1);			
		$headerFormat->setBorderColor('black');
		$numFormat =& $excel->addFormat();
		$numFormat->setNumFormat("0.00");		
		$numFormat->setBorder(1);			
		$numFormat->setBorderColor('black');	
		$normalFormat =& $excel->addFormat();
		$normalFormat->setBorder(1);			
		$normalFormat->setBorderColor('black');	
		
	}		
}
?>
