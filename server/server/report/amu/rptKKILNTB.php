<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptKKILNTB extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(b.no_gabung) 
					from amu_asset b
					left join amu_kkl_d a on b.no_gabung = a.no_gabung and b.jenis='TB' 
					left join amu_status c on c.kode_status = a.kode_status 
					inner join amu_klp d on b.kode_klpfa=d.kode_klpfa and d.tipe='CLASS'";
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
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$jenis='TB';
		
		$sql1 = "select b.nama as nmarea, c.nama as nmubis, 
       case when 'TB' = 'TB' then 'Tanah dan Bangunan' else 'Non Tanah dan Bangunan' end as nmjenis, 
       date_format(now(),'%d-%m-%Y') as tgl,b.tempat,
		e.nik1,f.nama as nama1,e.nik2,g.nama as nama2,e.nik3,h.nama as nama3  
from amu_lokasi b 
inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_lokasi = b.kode_lokasi
left join amu_ttd e on b.kode_lokfa=e.kode_lokfa
left join amu_karyawan f on e.nik1=f.nik
left join amu_karyawan g on e.nik1=g.nik
left join amu_karyawan h on e.nik1=h.nik
where b.kode_lokfa='101'";	
		$rs1 = $dbLib->execute($sql1);
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
		$html.="<table width='100%' border='0' cellspacing='2' cellpadding='1'>
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
        <td width='91%' class='header_laporan'>: $row1->nmubis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Area Bisnis </td>
        <td class='header_laporan'>: $row1->nmarea</td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi</td>
        <td class='header_laporan'>: $row1->tempat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Group Asset </td>
        <td class='header_laporan'>: $row1->nmjenis</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>";
	    $sql = "select b.no_fa, b.no_sn,  b.nama,d.nama as jenis, a.alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku, a.alamat, a.jml_fisik, a.no_label, c.nama as nmstatus, a.no_sertifikat, 
					a.luas, a.alamat as lokasi, a.keterangan,a.nama as deskripsi 
					from amu_asset b
					left join amu_kkl_d a on b.no_gabung = a.no_gabung and b.jenis='NTB' 
					left join amu_status c on c.kode_status = a.kode_status 
					inner join amu_klp d on b.kode_klpfa=d.kode_klpfa and d.tipe='CLASS'
					order by b.no_fa ";
		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan neraca",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
	 <tr align='center' bgcolor='#CCCCCC'>
        <td colspan='10' bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
        <td colspan='6' bgcolor='#00FF00' class='header_laporan'>DATA HASIL LAPANGAN </td>
        </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td class='header_laporan'>No Kartu </td>
        <td class='header_laporan'>SN</td>
        <td class='header_laporan'>Jenis</td>
        <td class='header_laporan'>Deskripsi Asset</td>
		<td class='header_laporan'>Deskripsi Alamat</td>
        <td class='header_laporan'>Cap Date </td>
        <td class='header_laporan'>Harga Perolehan </td>
        <td class='header_laporan'>Akumulasi Penyusutan </td>
        <td class='header_laporan'>Nilai Buku </td>
        <td class='header_laporan'>Jml Fisik SAP</td>
		<td class='header_laporan'>Jml Fisik Lapangan</td>
        <td class='header_laporan'>No Label </td>
        <td class='header_laporan'>Status </td>
        <td class='header_laporan'>Update Deskripsi </td>
        <td class='header_laporan'>Update Lokasi </td>
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
       </tr>";
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		while ($row = $rs->FetchNextObject($toupper=true))
		{
			$nilai=number_format($row->NILAI,0,",",".");
			$nilai_ap=number_format($row->NILAI_AP,0,",",".");
			$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");
			$html.="<tr>
        <td class='isi_laporan'>$row->NO_FA</td>
        <td align='center' class='isi_laporan'>$row->NO_SN</td>
        <td class='isi_laporan'>$row->JENIS</td>
		<td class='isi_laporan'>$row->NAMA</td>
		<td class='isi_laporan'>$row->ALAMAT</td>
        <td class='isi_laporan'>$row->CAP_DATE</td>
        <td align='right' class='isi_laporan'>$nilai</td>
        <td align='right' class='isi_laporan'>$nilai_ap</td>
        <td align='right' class='isi_laporan'>$nilai_buku</td>
        <td align='right' class='isi_laporan'>$row->JML_FISIK</td>
		<td align='right' class='isi_laporan'>$row->JML_FISIK</td>
        <td class='isi_laporan'>$row->NO_LABEL</td>
        <td class='isi_laporan'>$row->NM_STATUS</td>
        <td class='isi_laporan'>$row->DESKRIPSI</td>
        <td class='isi_laporan'>$row->LOKASI</td>
        <td class='isi_laporan'>$row->KETERANGAN</td>
      </tr>";
			$i=$i+1;
		}
		
		$html.="</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  
  <tr>
    <td align='right'><table width='400' border='0' cellspacing='0' cellpadding='0'>
      <tr>
        <td colspan='3' align='center' class='header_laporan'>$row1->TEMPAT , ".$AddOnLib->ubah_tanggal($row1->tgl)."</td>
        </tr>
      <tr>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>
	  <tr>
        <td align='center' class='header_laporan'><p>Ketua Tim INV UBIS</p>
              <p>&nbsp;</p>
          <p>$row1->NAMA1</p></td>
        <td align='center' class='header_laporan'><p>Manager / Asman </p>
              <p>&nbsp;</p>
          <p>$row1->NAMA2</p></td>
        <td align='center' class='header_laporan'><p>Officer</p>
              <p>&nbsp;</p>
          <p>$row1->NAMA3</p></td>
        </tr>
      <tr>
        <td align='center' class='header_laporan'>NIK : $row1->NIK1</td>
        <td align='center' class='header_laporan'>NIK : $row1->NIK2</td>
        <td align='center' class='header_laporan'>NIK : $row1->NIK3</td>
        </tr>
    </table></td>
  </tr>
</table>";
  }
 		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	
}
?>
