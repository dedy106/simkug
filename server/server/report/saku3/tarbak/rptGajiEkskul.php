<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_rptGajiEkskul extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql=" select a.nik,a.nama as nip,b.periode,a.kode_unit,sum(b.jam_ekskul) as jam, 
		sum(case when c.kode_param='EKS' then c.nilai else 0 end) as tarif
  from hr_karyawan a
  inner join hr_gaji_input b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
  inner join hr_gaji_nik c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
  $this->filter
 group by a.nik,a.nama,b.periode,a.kode_unit	
 order by a.nik";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Gaji Ekstrakulikuler",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIP</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='90'  align='center' class='header_laporan'>Periode</td>
     <td width='50'  align='center' class='header_laporan'>Unit</td>
     <td width='90'  align='center' class='header_laporan'>Jam Ekskul</td>
     <td width='90'  align='center' class='header_laporan'>Tarif Ekskul</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Ekskul</td>
	 <td width='90'  align='center' class='header_laporan'>Dibayarkan</td>

	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt=$row->tarif*$row->jam;
			$tarif=$tarif+$row->tarif;
			$pdpt2=$pdpt+$pdpt;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nip</td>
	 <td class='isi_laporan'>$row->periode</td>
	 <td class='isi_laporan'>$row->kode_unit</td>
	 <td class='isi_laporan'>$row->jam</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
		<td class='header_laporan' align='center' colspan='6' >Jumlah Total</td>
		<td class='header_laporan' align='right'>".number_format($tarif,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
		</tr>";

		
		
		echo "</table><br>";
		echo "<br><tr>
    <td><table width='800' border='0' cellspacing='0' cellpadding='1' class='kotak'>
      <tr>
        <td width='160' align='center'>&nbsp; </td>
        <td width='160' align='center'>&nbsp; </td>
        <td width='160' align='center'>&nbsp; </td>
        <td width='160' class='header_laporan' align='left'>&nbsp; </td>
        <td width='160' class='header_laporan' align='left'>&nbsp; </td>
      </tr>
     
        <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
        <tr>
        <td width='160' class='header_laporan' align='left'>GM YTB</td>
        <td width='160' class='header_laporan' align='left'>KUG</td>
        <td width='160' class='header_laporan' align='left'>SDM</td>
        <td width='160' class='header_laporan' align='left'>KS SD</td>
        <td width='160' class='header_laporan' align='left'>WKS SD</td>
        </tr>
        <tr>
        <td width='160' class='header_laporan' align='left'>Tgl: </td>
        <td width='160' class='header_laporan' align='left'>Tgl: </td>
        <td width='160' class='header_laporan' align='left'>Tgl: </td>
        <td width='160' class='header_laporan' align='left'>Tgl: </td>
        <td width='160' class='header_laporan' align='left'>Tgl: </td>
        </tr>
    </table></td>
  </tr>";
		echo "</div>";
		return "";
		
	}
	
}
?>
