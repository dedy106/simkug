<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptVerifi extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_app,a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.catatan,a.nik_bdh,a.nik_fiat
from pb_app_m a
$this->filter 
order by a.no_app";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan verifikasi",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Verifikasi</td>
        <td width='360' class='header_laporan'>: $row->no_app</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>: $row->catatan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Bendahara </td>
        <td class='header_laporan'>: $row->nik_bdh</td>
      </tr>	  <tr>
        <td class='header_laporan'>Fiatur </td>
        <td class='header_laporan'>: $row->nik_fiat</td>
      </tr>
    </table></td>
  </tr>

  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>No</td>
    <td width='90' height='23' class='header_laporan' align='center'>Status</td>
    <td width='150' class='header_laporan' align='center'>Catatan</td>
    <td width='90' class='header_laporan' align='center'>Modul</td>
    <td width='150' class='header_laporan' align='center'>No Dokumen</td>
  </tr>
";
			
			$sql1="select a.kode_lokasi,a.status,a.modul,a.catatan,a.no_bukti
from pb_app_m a
where a.no_app='$row->no_app' and a.kode_lokasi='$row->kode_lokasi' ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->nilai;
			$nilai=0;
			$total=0;
			$j=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->nilai;	
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
					 <td height='23' valign='top' class='isi_laporan'>$j</td>
					<td height='23' valign='top' class='isi_laporan'>$row1->status</td>

    <td valign='top' class='isi_laporan'>$row1->catatan</td>
    <td valign='top' class='isi_laporan' align='right'>$row1->modul</td>
	   <td valign='top' class='isi_laporan' align='right'>$row1->no_bukti</td>
  </tr>";
				
			}
			echo "<tr>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
