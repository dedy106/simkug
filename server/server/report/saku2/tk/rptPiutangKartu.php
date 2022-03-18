<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_tk_rptPiutangKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(a.no_piutang)
		from tk_piutang_m a
inner join tk_siswa b on a.kode_siswa=b.kode_siswa and a.kode_lokasi=b.kode_lokasi 
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
		$sql="select a.kode_lokasi,a.kode_siswa,a.no_piutang,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,b.nama as nama_siswa,
		b.kode_tingkat,c.nama as nama_tingkat
from tk_piutang_m a
inner join tk_siswa b on a.kode_siswa=b.kode_siswa and a.kode_lokasi=b.kode_lokasi 
inner join tk_tingkat c on b.kode_tingkat=c.kode_tingkat and b.kode_lokasi=c.kode_lokasi 
$this->filter order by a.no_piutang";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembayaran tagihan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Piutang</td>
        <td width='360' class='header_laporan'>: $row->no_piutang</td>
      </tr>
	   
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tingkat</td>
        <td class='header_laporan'>: $row->kode_tingkat - $row->nama_tingkat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Siswa </td>
        <td class='header_laporan'>: $row->kode_siswa - $row->nama_siswa</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='4' class='header_laporan' align='right'>Nilai Tagihan</td>
    <td class='header_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Nilai</td>
	
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_bukti,a.nilai,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.keterangan
from tk_piubayar_d a
inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.no_piutang='$row->no_piutang' and a.kode_lokasi='$row->kode_lokasi' ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai=0;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->nilai;	
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
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
