<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptPiutangKartuCust extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.kode_cust,a.nama,a.kode_lokasi
from cust a
$this->filter
order by a.kode_cust ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu piutang customer",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='99' class='header_laporan'>Kode</td>
        <td width='360' class='header_laporan'>: $row->kode_cust</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Customer </td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	 
    </table></td>
  </tr>
 
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='250' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Tagihan</td>
	<td width='90' class='header_laporan' align='center'>Pembayaran</td>
	 <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,b.no_bukti,a.nilai as debet,0 as kredit,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.tanggal
from piutang_d a
inner join trans_m b on a.no_piutang=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
where b.kode_lokasi='$kode_lokasi' and a.kode_cust='$row->kode_cust'
union all
select a.kode_lokasi,c.no_bukti,0 as debet,a.nilai as kredit,convert(varchar(20),c.tanggal,103) as tgl,c.keterangan,c.tanggal
from piubayar_d a
inner join piutang_d b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi 
inner join trans_m c on a.no_bukti=c.no_bukti and a.kode_lokasi=c.kode_lokasi 
where c.kode_lokasi='$kode_lokasi' and b.kode_cust='$row->kode_cust'
order by tanggal
";
		
			$rs1 = $dbLib->execute($sql);
			$debet=0;
			$kredit=0;
			$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;
				$saldo+=$row1->debet - $row1->kredit;
				echo "<tr>
				<td height='23' class='isi_laporan'>$row1->tgl</td>
				<td height='23' class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
				</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
