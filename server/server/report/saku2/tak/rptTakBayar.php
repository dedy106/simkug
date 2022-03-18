<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_tak_rptTakBayar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_kirim)
from takkirim_m a
inner join yk_takkirim_d b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join lokasi e on a.kode_loktuj=e.kode_lokasi
inner join vendor f on b.kode_vendor=f.kode_vendor and b.kode_lokasi=f.kode_lokasi
inner join masakun g on b.akun_tak=g.kode_akun and b.kode_lokasi=g.kode_lokasi
inner join lokasi h on a.kode_lokasi = h.kode_lokasi $this->filter ";
 		
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
		$periode=$tmp[0];
		$sql="select a.no_kirim,a.no_dokumen, a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1, a.keterangan,a.nilai, a.nik_buat, a.nik_setuju,
       a.kode_loktuj,c.nama as nama_buat,d.nama as nama_setuju,e.nama as nama_loktuj,h.kota,
       b.no_rek,b.nama_rek,b.bank,b.cabang,b.jenis,b.keterangan as nama_vendor,b.akun_tak,g.nama as nama_akun
from takkirim_m a
inner join yk_takkirim_d b on a.no_kirim=b.no_kirim and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join lokasi e on a.kode_loktuj=e.kode_lokasi
inner join masakun g on b.akun_tak=g.kode_akun and b.kode_lokasi=g.kode_lokasi
inner join lokasi h on a.kode_lokasi = h.kode_lokasi $this->filter
order by a.no_kirim ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("TAK PERMINTAAN BAYAR",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
      <tr align='center'>
        <td colspan='2' class='judul_form'><u>FORM TAK PERMINTAAN BAYAR </u></td>
        </tr>
     
      <tr>
        <td width='110' class='header_laporan'>No Bukti </td>
        <td width='590' class='header_laporan'>: $row->no_kirim </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal1 </td>
      </tr>
      <tr >
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
      <tr >
        <td class='header_laporan'>Lokasi Tujuan </td>
        <td class='header_laporan'>: $row->kode_loktuj - $row->nama_loktuj</td>
      </tr>
      <tr>
        <td class='header_laporan'>NIK Pembuat </td>
        <td class='header_laporan'>: $row->nik_buat - $row->nama_buat </td>
      </tr>
      <tr>
        <td class='header_laporan'>NIK Approve </td>
        <td class='header_laporan'>: $row->nik_setuju - $row->nama_setuju</td>
      </tr>
    
      <tr>
        <td class='header_laporan'>Jenis</td>
        <td class='header_laporan'>: $row->jenis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Vendor</td>
        <td class='header_laporan'>: $row->nama_vendor</td>
      </tr>
      <tr>
        <td class='header_laporan'>Akun TAK</td>
        <td class='header_laporan'>: $row->akun_tak - $row->nama_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai Transfer </td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Rekening </td>
        <td class='header_laporan'>: $row->no_rek</td>
      </tr>
      <tr>
        <td class='header_laporan'>Bank</td>
        <td class='header_laporan'>: $row->bank</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Rekening</td>
        <td class='header_laporan'>: $row->nama_rek</td>
      </tr>
      <tr>
        <td class='header_laporan'>Cabang</td>
        <td class='header_laporan'>: $row->cabang</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='right'><table width='500' border='0' cellpadding='1' cellspacing='2'>
     
      <tr>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>$row->kota , ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td width='50%' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='60%' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nama_setuju</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->jabatan_setuju</td>
        <td class='header_laporan'>$row->jabatan_buat</td>
      </tr>
    </table></td>
  </tr>
  
</table><br>";
 
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
