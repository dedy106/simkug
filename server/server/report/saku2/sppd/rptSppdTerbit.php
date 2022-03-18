<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_sppd_rptSppdTerbit extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select sount(a.no_ver)
from yk_ver_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter";
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
		$nama_ver=$tmp[0];
		$sql="select a.no_ver,a.tanggal,a.kode_lokasi,a.nik_app,c.nama as nama_app,datepart(day,a.tanggal) as tgl,
		datepart(year,a.tanggal) as tahun,datepart(month,a.tanggal) as bulan,a.no_dokumen,a.dasar,a.keterangan,c.jabatan,f.kota
from yk_ver_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join lokasi f on a.kode_lokasi=f.kode_lokasi $this->filter order by a.no_ver";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$transport=number_format($row->transport,0,',','.');
			$harian=number_format($row->harian,0,',','.');
			$total=number_format($row->total,0,',','.');
			$terbilang=$AddOnLib->terbilang2($row->total);
			echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td><table width='800'  border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td ><table width='800' border='0' cellpadding='1' cellspacing='1'>
      <tr>
        <td width='550' align='right'>LAMPIRAN IV : </td>
        <td width='250'>KEPUTUSAN DIREKTUR </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>YAYASAN KESEHATAN PEGAWAI TELKOM </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>NOMOR : KD.27/PS330/YAKES-00/2008</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>TANGGAL : 18 JUNI 2008 </td>
      </tr>
       <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td colspan='2' class='judul_form'><u>PERMOHONAN PENERBITAN SURAT PERINTAH PERJALANAN DINAS</u></td>
	<tr align='center'>
        <td colspan='2' class='judul_form'>NOMOR : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ PS330/YAKES/2011 </td>
  </tr>
</table></td>
  </tr>
 
  <tr>
    <td height='30'>Kepada Sdr : </td>
  </tr>
  <tr>
    <td height='30' >Harap bantuan saudara menerbitkan Surat Perjalanan Dinas atas nama : </td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='25' rowspan='2' align='center' class='header_form'>NO</td>
        <td width='200' rowspan='2' align='center' class='header_form'>NAMA NIK / JABATAN </td>
        <td width='200' rowspan='2' align='center' class='header_form'>LOKASI / TEMPAT </td>
        <td colspan='2' align='center' class='header_form'>TANGGAL</td>
        <td width='200' rowspan='2' align='center' class='header_form'>KETERANGAN</td>
      </tr>
      <tr>
        <td width='80' align='center'>BERANGKAT</td>
        <td width='80' align='center'>KEMBALI</td>
        </tr>";
		
			$sql1="select a.nik_buat,b.nama,date_format(c.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(c.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.keterangan,a.tempat,b.jabatan
from yk_spj_m a
inner join karyawan b on a.nik_buat=b.nik
left join (select c.nik_buat,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai 
			from yk_spj_dh a
			inner join yk_ver_d b on a.no_spj=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.modul='SPPD'
			inner join yk_spj_m c on a.no_spj=c.no_spj and a.kode_lokasi=c.kode_lokasi
			where b.no_ver='$row->no_ver' and b.kode_lokasi='$row->kode_lokasi'
			group by c.nik_buat
		   )c on a.nik_buat=c.nik_buat
where a.no_ver='$row->no_ver' and a.kode_lokasi='$row->kode_lokasi'";
			 
			  $rs1 = $dbLib->execute($sql1);
			  $j=1; 
			  $no="1";
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
     echo " <tr>
        <td class='isi_form' height='23' align='center'>$no</td>
        <td class='isi_form'>$row1->nama - $row1->nik_buat - $row1->jabatan</td>
        <td class='isi_form'>$row1->tempat</td>
        <td class='isi_form' align='center'>$row1->tgl_mulai</td>
        <td class='isi_form' align='center'>$row1->tgl_selesai</td>
        <td class='isi_form'>$row1->keterangan</td>
      </tr>";
			$no="";
	  }
		$j=$j+1;
    echo "  <tr>
        <td height='23' align='center' class='isi_form'>2</td>
        <td class='isi_form'>Dasar Perjalanan Dinas </td>
        <td colspan='4' class='isi_form'>$row->dasar</td>
        </tr>
      <tr>
        <td height='23' align='center' class='isi_form'>3</td>
        <td class='isi_form'>Maksud / Tujuan Perjalanan Dinas </td>
        <td colspan='4' class='isi_form'>$row->keterangan</td>
        </tr>
      <tr>
        <td height='23' align='center' class='isi_form'>4</td>
        <td class='isi_form'>Jenis Angkutan </td>
        <td colspan='4' class='isi_form'> KA / BUS / TAXI /PLANE / DINAS </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='491'>&nbsp;</td>
    <td width='299'>$row->kota , $row->tgl $bulan $row->tahun </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>Yang memberi perintah </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>$row->jabatan</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td height='50'>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td><u>$row->nama_app</u></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>NIK. $row->nik_app </td>
  </tr>
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
