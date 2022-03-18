<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gaji_rptGajiLampiranNon extends server_report_basic
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
		
		$sql="select a.nik,a.nama,a.no_rek,a.nama_rek,isnull(b.total,0) as total,a.bank,0 as nilai_tunj
from hr_karyawan a 
left join (select a.nik,a.kode_lokasi,a.no_gaji,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total  
		   from hr_gaji_d a 
		   where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi' 
		   group by a.nik,a.kode_lokasi,a.no_gaji 
		   )b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
$this->filter and isnull(b.total,0)<>0
union
select a.nama_rek as nik,a.nama_rek as nama,a.no_rek,a.nama_rek,sum(isnull(b.total,0)) as total,a.bank,sum(a.nilai_tunj) as nilai_tunj
from hr_gaji_param a 
left join (select a.kode_param,a.kode_lokasi,a.no_gaji,sum(case a.dc when 'c' then a.nilai else -a.nilai end) as total  
		   from hr_gaji_d a 
		   where a.no_gaji='$no_gaji' and a.kode_lokasi='$kode_lokasi'  
		   group by a.kode_param,a.kode_lokasi,a.no_gaji 
		   )b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and a.kode_param=b.kode_param 
where a.jenis_bank='NON' and a.nama_rek<>'-'
group by a.nama_rek,a.no_rek,a.bank
order by nama_rek
";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
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
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='250' class='header_laporan'>NAMA PEGAWAI </td>
        <td width='150' class='header_laporan'>NO. A/C</td>
        <td width='250' class='header_laporan'>BANK</td>
		<td width='100' class='header_laporan'>GAJI</td>
		<td width='100' class='header_laporan'>TUNJ. BIAYA TRANSFER</td>
		<td width='100' class='header_laporan'>JUMLAH DIBAYAR</td>
		<td width='100' class='header_laporan'>POT. BIAYA TRANSFER</td>
		<td width='100' class='header_laporan'>JUMLAH</td>
      </tr>
       ";
		$total=0;$pot=0;$tot=0;$nilai_tunj=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$pot+=10000;
			$tot+=$row->total+$row->nilai_tunj-10000;
			$nilai_tunj+=$row->nilai_tunj;
			echo " <tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row->nama_rek</td>
        <td class='isi_laporan' >$row->no_rek</td>
		<td class='isi_laporan' >$row->bank</td>
	    <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai_tunj,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->total+$row->nilai_tunj,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format(10000,0,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row->total+$row->nilai_tunj-10000,0,',','.')."</td>
      </tr>";
			$i=$i+1;
		}
		echo " <tr>
        <td colspan='4' align='center' class='header_laporan'>JUMLAH</td>
        <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
		 <td class='header_laporan' align='right'>".number_format($nilai_tunj,0,',','.')."</td>
		   <td class='header_laporan' align='right'>".number_format($total+$nilai_tunj,0,',','.')."</td>
		   <td class='header_laporan' align='right'>".number_format($pot,0,',','.')."</td>
		    <td class='header_laporan' align='right'>".number_format($tot,0,',','.')."</td>
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
