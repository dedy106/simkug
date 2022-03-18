<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_bill_rptKontrakKartu extends server_report_basic
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
		$sql="select a.no_kontrak,a.kode_lokasi,a.no_dok,convert(varchar,tgl_awal,103) as tgl_awal,convert(varchar,tgl_akhir,103) as tgl_akhir,a.keterangan,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as kontrak,b.nama as nama_cust,b.divisi
from kontrak_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
$this->filter 
order by a.no_kontrak";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu kontrak",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='800'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No Kontrak</td>
        <td width='360' class='header_laporan'>: $row->no_kontrak</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>No Dokumen</td>
        <td width='360' class='header_laporan'>: $row->no_dok</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl_awal Sd $row->tgl_akhir</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Customer </td>
        <td class='header_laporan'>: $row->nama_cust</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='4' class='header_laporan' align='right'>Nilai Kontrak</td>
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
			
			$sql="select a.no_kontrak,a.no_bill,a.kode_lokasi,a.nilai+a.nilai_ppn as nilai,convert(varchar,tanggal,103) as tgl,a.keterangan 
		from bill_m a
		where a.no_kontrak='$row->no_kontrak' and a.kode_lokasi='$row->kode_lokasi' 
		order by a.no_bill";
		

		
			
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
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_bill','$row1->kode_lokasi','$periode');\">$row1->no_bill</a>";
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
