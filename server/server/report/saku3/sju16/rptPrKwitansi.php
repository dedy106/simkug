<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrKwitansi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/sju.jpg";
		$i=1;
		echo "<div align='center'>"; 
		$sql="select a.no_bukti,a.kode_lokasi,a.keterangan,a.tanggal,c.kode_cust,d.nama as nama_cust,d.alamat,e.nama as nama_tipe,c.no_dok,c.no_dok2,
				f.nama as nama_app,f.jabatan,g.no_fax,g.email,g.no_rek,g.bank,b.premi,b.materai,b.p_cost,b.diskon,b.premi+b.materai+b.p_cost-b.diskon as n_premi
from trans_m a
inner join sju_polis_termin b on a.no_bukti=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on b.no_polis=c.no_polis and b.kode_lokasi=c.kode_lokasi
inner join sju_cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
inner join sju_tipe e on c.kode_tipe=e.kode_tipe and c.kode_lokasi=e.kode_lokasi
inner join karyawan f on a.nik1=f.nik
inner join lokasi g on a.kode_lokasi=g.kode_lokasi
$this->filter
 ";
		

		$rs=$dbLib->execute($sql);
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			for ($x = 1; $x <= 2; $x++) {
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
		<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
		  <tr>
			<td width='565'></td>
			<td width='225'><img src=$pathfoto width='128' height='100' /></td>
		  </tr>
		</table></td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td><table width='800' border='0' cellspacing='0' cellpadding='0'>
		  <tr>
			<td width='205' height='30'>No. Invoice  </td>
			<td width='13'>:</td>
			<td width='568' style='border-bottom:thin solid'>$row->no_bukti</td>
		  </tr>
		  <tr>
			<td height='30'>Telah terima dari </td>
			<td>:</td>
			<td style='border-bottom:thin solid'>$row->nama_cust</td>
		  </tr>
		   <tr>
			<td height='5'></td>
			<td></td>
			<td></td>
		  </tr>
		  <tr>
			<td height='30'>Uang Sejumlah </td>
			<td>:</td>
			<td bgcolor='#CCCCCC'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>".$AddOnLib->terbilang($row->n_premi)." </b> </td>
		  </tr>
		  <tr>
			<td height='30'>Untuk Pembayaran </td>
			<td>:</td>
			<td style='border-bottom:thin solid'>Premi Asuransi ".strtoupper($row->nama_tipe)."</td>
		  </tr>
		  <tr>
			<td height='30' style='border-bottom:thin solid'>&nbsp;</td>
			<td style='border-bottom:thin solid'>&nbsp;</td>
			<td style='border-bottom:thin solid'>Polis $row->no_dok / $row->no_dok2</td>
		  </tr>
		 
		 
		  
		</table></td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
		  <tr>
			<td width='500' align='left' valign='bottom'><table width='200' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td height='25' align='center' bgcolor='#CCCCCC' style='border-style:double none double none;'>Rp ".number_format($row->n_premi,2,",",".")."</td>
			  </tr>
			</table></td>
			<td width='300'><table width='300' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
				</tr>
			  <tr>
				<td height='60'>&nbsp;</td>
				</tr>
			  <tr>
				<td>$row->nama_app</td>
				</tr>
			  <tr>
				<td>$row->jabatan</td>
				</tr>
			</table></td>
		  </tr>
		</table></td>
	  </tr>
	  
	</table>
	<br>
	<br>
	<br>
	<br>
	";
			}
			echo "<DIV style='page-break-after:always'></DIV>";
			
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
