<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_haji_rptTitipKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select a.kode_lokasi,a.no_reg,a.kode_lokasi,a.no_jadwal,a.no_peserta,convert(varchar(10),a.tanggal,103) as tgl,
	   a.kode_curr,a.harga,a.diskon,a.tambah,
	   b.nama as nama_peserta,c.nama as nama_jadwal
from haj_reg a
inner join haj_peserta b on a.no_peserta=b.no_peserta and a.kode_lokasi=b.kode_lokasi 
inner join haj_jadwal c on a.no_jadwal=c.no_jadwal and a.kode_lokasi=c.kode_lokasi 
$this->filter 
order by a.no_reg ";
	
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu titipan peserta",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Registrasi</td>
        <td width='360' class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_reg','$row->kode_lokasi');\">$row->no_reg</a></td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Jadwal</td>
        <td width='360' class='header_laporan'>: $row->no_jadwal - $row->nama_jadwal</td>
      </tr>
	  
      <tr>
        <td class='header_laporan'>Peserta </td>
        <td class='header_laporan'>: $row->no_peserta - $row->nama_peserta</td>
      </tr>
	
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='4' class='header_laporan' align='right'>Nilai</td>
    <td class='header_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='80' class='header_laporan' align='center'>Kode Biaya</td>
    <td width='200' class='header_laporan' align='center'>Nama Biaya</td>
    <td width='80' class='header_laporan' align='center'>Pembayaran</td>
	
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_bukti,a.nilai,a.tgl,a.kode_biaya,a.keterangan
from (
select a.kode_lokasi,a.no_bukti,a.nilai_kas as nilai,
	convert(varchar(10),b.tanggal,103) as tgl,'Paket' as kode_biaya,'Paket' as keterangan
from haj_titipbayar_d a
inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_reg='$row->no_reg'
union 
select a.kode_lokasi,a.no_bukti,a.nilai as nilai,
	convert(varchar(10),b.tanggal,103) as tgl,a.kode_biaya,c.nama as keterangan
from haj_titipbayar_tambah a
inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
inner join haj_biaya c on a.kode_biaya=c.kode_biaya  and a.kode_lokasi=c.kode_lokasi
where a.no_reg='$row->no_reg'
	)a
order by a.tgl;
 ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai=0;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->nilai;	
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_bukti','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_biaya."</td>
	 <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
	   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   
  <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
