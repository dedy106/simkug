<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptSlipGj extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.nik,a.nama,a.kode_lokasi,d.no_gaji,d.periode,e.tanggal,e.keterangan,
    datepart(month,e.tanggal) as bulan,datepart(year,e.tanggal) as tahun,a.flag_gaji,f.hk,f.uhar,e.pesan,e.flag_penilaian,f.periode_kerja
from gr_karyawan a
left join (select distinct nik,no_gaji,kode_lokasi,periode
     from gr_gaji_d 
     )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_gaji_m e on d.no_gaji=e.no_gaji and d.kode_lokasi=e.kode_lokasi
left join gr_gaji_load f on e.no_gaji=f.no_gaji and e.kode_lokasi=f.kode_lokasi and a.nik=f.nik $this->filter order by a.nik";
echo $sql;
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data posisi absen",$this->lokasi);
		echo "<table cellspacing='0' cellpadding='0'>
		<col width='30' />
		<col width='16' />
		<col width='9' />
		<col width='16' span='5' />
		<col width='19' />
		<col width='25' />
		<col width='16' span='9' />
		<col width='18' />
		<col width='16' span='5' />
		<col width='31' />
		<col width='16' span='17' />
		<tr height='17'>
			<td height='17' colspan='2' width='46'>Nama</td>
			<td width='9'>:</td>
			<td colspan='11' width='188'>Maryanto</td>
			<td colspan='6' width='98'>Jabatan</td>
			<td width='16'>:</td>
			<td colspan='22' width='367'>Human Capital    Manager</td>
		</tr>
		<tr height='17'>
			<td height='17'>NIK</td>
			<td></td>
			<td>:</td>
			<td colspan='11'>G95300</td>
			<td colspan='6'>SUBDIR/BO</td>
			<td>:</td>
			<td colspan='22'>Human Capital &amp; General Support</td>
		</tr>
		<tr height='17'>
			<td height='17'></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td height='17'></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='7' height='17'>Pendapatan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</td>
			<td colspan='12'>&nbsp;</td>
			<td rowspan='9'>&nbsp;</td>
			<td>Potongan&nbsp;&nbsp;&nbsp;&nbsp; :</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td colspan='12'>&nbsp;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='9' height='17'>&nbsp;GAPOK&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;</td>
			<td colspan='9'>&nbsp;IURAN&nbsp;    KOPERASI&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='9' height='17'>&nbsp;TUNJANGAN KONJUNGTUR&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td colspan='9'>&nbsp;POTONGAN KOPERASI&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='9' height='17'>&nbsp;TUNJANGAN JABATAN&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;</td>
			<td colspan='9'>&nbsp;POTONGAN ASURANSI&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td height='17'>&nbsp;TUNJANGAN POSISI&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;</td>
			<td colspan='17'>&nbsp;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='9' height='17'>&nbsp;TUNJANGAN KHUSUS&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td colspan='17'>&nbsp;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='18'>
			<td height='18'>&nbsp;LEMBUR&nbsp;&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td colspan='5'>&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    - </td>
			<td colspan='9'>&nbsp;</td>
			<td colspan='8'>--------------------------</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='9' height='17'>&nbsp;</td>
			<td colspan='10'>-------------------------------------</td>
			<td colspan='17'>&nbsp;</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='8' height='17'>&nbsp;TOTAL PENDAPATAN&nbsp;</td>
			<td>&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='7'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td colspan='8'>&nbsp;TOTAL POTONGAN&nbsp;</td>
			<td>&nbsp;</td>
			<td>:</td>
			<td>Rp.</td>
			<td>&nbsp;</td>
			<td colspan='5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td height='17'></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr height='17'>
			<td colspan='8' height='17'>&nbsp;TOTAL TRANSFER&nbsp;</td>
			<td></td>
			<td>:</td>
			<td colspan='2'>Rp.</td>
			<td colspan='7'></td>
			<td colspan='2'>ke</td>
			<td colspan='5'>&nbsp;REK&nbsp;</td>
			<td colspan='5'>&nbsp;BNI&nbsp;</td>
			<td colspan='8'>381447181</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</table><br><br>";
	  
			   
				  $i=$i+1;
			  }
			  echo "</div>";
				  
			  return "";
		  }
		  
	  }
	  ?>
		
	  