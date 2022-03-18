<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptSpbYpt extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select 1 ";
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
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_ver,a.nik_fiat,e.nama as nama_fiat,
	   date_format(a.tanggal,'%d/%m/%Y') as tgl
from it_spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_ver=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi $this->filter";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/tu.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<table cellspacing='0' cellpadding='0'>
    <col width='137' />
    <col width='32' />
    <col width='64' span='4' />
    <col width='76' />
    <col width='64' span='3' />
    <tr height='20'>
      <td colspan='10' height='20' width='693'>=================================================================================================</td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'></td>
    </tr>
    <tr height='20'>
      <td colspan='5' height='20'>Catatan di IT Telkom    / IM Telkom / LAKHAR</td>
      <td rowspan='6'></td>
      <td colspan='4'>Catatan administrasi Keuangan LAKHAR</td>
    </tr>
    <tr height='20'>
      <td height='20'>Nomor</td>
      <td>:</td>
      <td colspan='3'></td>
      <td>SPB Nomor</td>
      <td>:</td>
      <td colspan='2'></td>
    </tr>
    <tr height='20'>
      <td height='20'>Tanggal</td>
      <td>:</td>
      <td colspan='3'></td>
      <td>Tanggal</td>
      <td>:</td>
      <td colspan='2'></td>
    </tr>
    <tr height='20'>
      <td height='20'>MTP/MTA</td>
      <td>:</td>
      <td colspan='3'></td>
      <td>MTP/MTA</td>
      <td>:</td>
      <td colspan='2'></td>
    </tr>
    <tr height='20'>
      <td height='20'>Beban Anggaran</td>
      <td>:</td>
      <td colspan='3'></td>
      <td colspan='4' rowspan='2'></td>
    </tr>
    <tr height='20'>
      <td height='20'>Tahun</td>
      <td>:</td>
      <td colspan='3'></td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'>=================================================================================================</td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'>YAYASAN PENDIDIKAN    TELKOM</td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'>=================================================================================================</td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'>Bendaharawan    yayasan Pendidikan Telkom di Bandung diminta untuk membayarkan uang sebesar    :&nbsp;</td>
    </tr>
    <tr height='20'>
      <td height='20'>Rp.</td>
      <td colspan='9'>terbilang</td>
    </tr>
    <tr height='20'>
      <td colspan='10' height='20'></td>
    </tr>
    <tr height='20'>
      <td height='20'>Kepada</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Nama</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Rekening Giro Nomor</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Bank</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Alamat</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Untuk Pembayaran</td>
      <td>:</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colspan='3'>Bandung, 22/11/2017</td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Yang mengajukan</td>
      <td></td>
      <td colspan='3'>Menyetujui</td>
      <td></td>
      <td colspan='3'>Fiatur</td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>nama</td>
      <td></td>
      <td colspan='3'>nama</td>
      <td></td>
      <td colspan='3'>nama</td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>jabatan</td>
      <td></td>
      <td colspan='3'>jabatan</td>
      <td></td>
      <td colspan='3'>jabatan</td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Tanda Terima</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colspan='2'>Untuk ditransfer</td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20' colspan='3'>Telah    diterima uang sejumlah</td>
      <td>Rp.</td>
      <td></td>
      <td></td>
      <td>No. GB</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colspan='2'>Transfer tanggal</td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Besar Uang</td>
      <td></td>
      <td>Rp.</td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Bandung, 22/11/2017</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colspan='2'>Bandung, 22/11/2017</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'>Penerima</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td colspan='3'>DIR GENERAL SUPPORT</td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20'></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr height='20'>
      <td height='20' colspan='4'>SMK    PARIWISATA SANDHY PUTRA BANDUNG</td>
      <td></td>
      <td colspan='2'>ADYA RAHADI</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
