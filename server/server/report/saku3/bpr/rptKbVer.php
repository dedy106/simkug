<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptKbVer extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_bukti,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.no_dokumen,
		a.param2,a.param3
from trans_m a
$this->filter 
order by a.no_bukti";

		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pembayaran via SPB",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_bukti</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>	  <tr>
        <td class='header_laporan'>Akun KasBank </td>
        <td class='header_laporan'>: $row->param2 - $row->akun</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Jenis </td>
        <td class='header_laporan'>: $row->param3</td>
      </tr>
    </table></td>
  </tr>

  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>No</td>
    <td width='50' height='23' class='header_laporan' align='center'>Modul</td>
    <td width='100' class='header_laporan' align='center'>No Bukti</td>
    <td width='150' class='header_laporan' align='center'>No SPB</td>
    <td width='150' class='header_laporan' align='center'>Deskripsi</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
  </tr>
";
			
			$sql1="select b.nilai1,a.no_app,b.no_ref3,a.no_bukti,a.kode_lokasi,case when a.status = 1 then 'app' else 'nonapp' end as status,a.modul,a.catatan,a.no_bukti
from pb_app_m a
inner join trans_m b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
where b.no_ref3='$row->no_bukti' and a.kode_lokasi='$row->kode_lokasi' ";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1; $nilai=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai1;				
				echo "<tr>
	 <td height='23' class='isi_laporan'>$j</td>
	 <td height='23'  class='isi_laporan'>$row1->modul</td>
	 <td height='23'  class='isi_laporan'>$row1->no_bukti</td>
	 <td height='23'  class='isi_laporan'>$row1->no_app</td>
	 <td height='23'  class='isi_laporan'>$row1->catatan</td>
	 <td height='23'  class='isi_laporan' align='right'>".number_format($row1->nilai1,0,',','.')."</td>
	 </tr>";	
			$j=$j+1;
		}
					 
			echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   			
 </tr></table><br>";
			}
			
		return "";
	}
	
}
?>
