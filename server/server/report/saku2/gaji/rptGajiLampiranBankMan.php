<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiLampiranBankMan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[1];
		$kode_lokasi=$tmp[0];
		$no_gaji=$tmp[2];
		
		$sql="select a.kode_param,a.nama,a.no_rek,a.nama_rek,a.cabang,isnull(b.total,0) as total
from hr_gaji_param a 
left join (select a.kode_param,a.kode_lokasi,a.no_gaji,sum(case a.dc when 'c' then a.nilai else -a.nilai end) as total  
		   from hr_gaji_d a 
		   where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi'  
		   group by a.kode_param,a.kode_lokasi,a.no_gaji 
		   )b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and a.kode_param=b.kode_param 
where a.bank='MANDIRI' 
order by a.kode_param
";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo "<table width='600' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'>DAFTAR PEMBAYARAN GAJI PEGAWAI YAYASAN PENDIDIKAN TELKOM DI LINGKUNGAN POLITEKNIK TELKOM</td>
  </tr>
  <tr>
    <td align='center'>MELALUI REKENING GIRO POLITEKNIK TELKOM</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='370' class='header_laporan'>NAMA BANK </td>
        <td width='370' class='header_laporan'>NAMA REKENING </td>
        <td width='200' class='header_laporan'>NO. A/C</td>
        <td width='100' class='header_laporan'>JUMLAH</td>
      </tr>
       ";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$total+$row->total;
			echo " <tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row->nama</td>
		 <td class='isi_laporan'>$row->nama_rek</td> 
        <td class='isi_laporan' align='center'>$row->no_rek</td>
        <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
      </tr>";
			$i=$i+1;
		}
		echo " <tr>
        <td colspan='4' align='center'>JUMLAH</td>
        <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'></td>
      </tr>
      <tr>
        <td align='center'>DIREKTUR</td>
      </tr>
      <tr>
        <td height='60' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>BUDI SULISTYO</td>
      </tr>
    </table></td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
