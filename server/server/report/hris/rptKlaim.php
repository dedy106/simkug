<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptKlaim extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(*)
from gr_klaim_m a
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
 $this->filter ";
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
		$sql="select a.kode_lokasi,a.nik_buat,b.nama,a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,
		date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,
		date_format(a.tgl_final,'%d/%m/%Y') as tgl_final,date_format(a.tgl_ambil,'%d/%m/%Y') as tgl_ambil,a.nilai_final
from gr_klaim_m a
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
 $this->filter order by a.no_klaim ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan pengajuan klaim kesehatan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='550'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Reimburse </td>
        <td class='header_laporan'>:&nbsp;$row->no_klaim</td>
        </tr>
	    <tr>
          <td class='header_laporan'>Tanggal</td>
          <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Pembuat</td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat - $row->nama</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Kuitansi </td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_kuitansi</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Terima </td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_terima</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Ambil </td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_ambil</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Tanggal Pembayaran</td>
	    <td class='header_laporan'>:&nbsp;$row->tgl_final</td>
	    </tr>
	  <tr>
	    <td class='header_laporan'>Nilai Disetujui </td>
	    <td class='header_laporan'>: ".number_format($row->nilai_final)."</td>
	    </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>NIK</td>
	<td width='40' align='center' class='header_laporan'>No urut</td>
	<td width='250' align='center' class='header_laporan'>Nama Pasien</td>
    <td width='100' align='center' class='header_laporan'>Status</td>
    <td width='120' align='center' class='header_laporan'>Jenis Perawatan</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
   
  </tr>
";
		
	  $sql1="select a.nik,a.no_urut,b.nama,c.nama as sts_kel,a.keterangan,a.nilai
			from gr_klaim_d a 
			inner join gr_keluarga b on a.nik=b.nik and a.no_urut=b.no_urut and a.kode_lokasi=b.kode_lokasi 
			inner join gr_status_kel c on c.sts_kel=b.sts_kel and c.kode_lokasi=b.kode_lokasi 
where a.no_klaim='$row->no_klaim' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_klaim ";
		
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
			echo "<tr>
    <td align='left' class='isi_laporan'>$row1->nik</td>
	<td align='center' class='isi_laporan'>$row1->no_urut</td>
	<td align='left' class='isi_laporan'>$row1->nama</td>
	<td align='left' class='isi_laporan'>$row1->sts_kel</td>
	<td align='left' class='isi_laporan'>$row1->keterangan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->nilai)."</td>
  </tr>";
		$j=$j+1;
		}
		echo "<tr>
    <td align='right' colspan='5' class='isi_laporan'>Total</td>
	<td align='right' class='isi_laporan'>".number_format($nilai)."</td>
  </tr>";
		echo " </table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
