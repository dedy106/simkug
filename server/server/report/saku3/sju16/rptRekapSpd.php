<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptRekapSpd extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_perdin)
from sju_perdin_m a
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_perdin,a.kode_lokasi,a.tujuan,convert(varchar,a.tanggal, 105) as tgl,convert(varchar,a.tgl_mulai, 105) as mulai,convert(varchar,a.tgl_selesai, 105) as selesai,
		a.transport,a.agenda,a.nik_user,b.jabatan,b.nama as krywn,c.nik,e.nama as namak,c.kode_jab,c.jum_hari,c.negara,c.upd,c.kode_trans,c.p_pp,c.utrans,c.kode_pp,d.nama as pp
	from sju_perdin_m a
	left join karyawan b on a.kode_lokasi=b.kode_lokasi and a.nik_user=b.nik
	left join sju_perdin_d c on a.no_perdin=c.no_perdin and a.kode_lokasi=c.kode_lokasi	
	left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi
	left join karyawan e on c.kode_lokasi=e.kode_lokasi and c.nik=e.nik

$this->filter order by a.no_perdin";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data perjalanan dinas",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Tanggal Pengajuan</td>
	  <td width='200'  align='center' class='header_laporan'>No Perdin</td>
	 <td width='200'  align='center' class='header_laporan'>Tujuan</td>
     <td width='90'  align='center' class='header_laporan'>Agenda Kegiatan</td>
     <td width='300'  align='center' class='header_laporan'>Waktu Kegiatan</td>
     <td width='300'  align='center' class='header_laporan'>Karyawan</td>
	 <td width='200'  align='center' class='header_laporan'>Posisi</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Hari</td>
     <td width='90'  align='center' class='header_laporan'>Negara</td>
	 <td width='200'  align='center' class='header_laporan'>UPD</td>
	 <td width='90'  align='center' class='header_laporan'>Lokasi Kerja</td>
     <td width='90'  align='center' class='header_laporan'>P / PP</td>
	 <td width='200'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='90'  align='center' class='header_laporan'>No Bukti Pembayaran</td>
     <td width='90'  align='center' class='header_laporan'>Tanggal Pembayaran</td>


	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_perdin</td>
	 <td class='isi_laporan'>$row->tujuan</td>
	 <td class='isi_laporan'>$row->agenda</td>
	 <td class='isi_laporan'>$row->mulai - $row->selesai</td>
	 <td class='isi_laporan'>$row->nik - $row->namak </td>
	 <td class='isi_laporan'>$row->kode_jab</td>
	 <td class='isi_laporan'>$row->jum_hari</td>
	 <td class='isi_laporan'>$row->negara</td>
	 <td align='right' class='isi_laporan'>".number_format($row->upd,0,",",".")."</td>
	 <td class='isi_laporan'>$row->pp</td>
	 <td class='isi_laporan'>$row->p_pp</td>
	 <td class='isi_laporan'>$row->kode_trans</td>

     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
