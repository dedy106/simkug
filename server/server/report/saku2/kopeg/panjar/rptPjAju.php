<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_panjar_rptPjAju extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_panjar)
from panjar2_m a $this->filter ";
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
		
		
		$sql="select a.no_panjar,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,e.kota,a.tanggal,c.nama as nama_user,d.nama as nama_app,a.nik_setuju as nik_app,a.nik_user
from panjar2_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi 
inner join lokasi e on a.kode_lokasi=e.kode_lokasi
left join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi 
left join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_panjar";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>
		"; 
		echo $AddOnLib->judul_laporan("pengajuan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "
			<table border='0'>
			<tr>
				<td>
			<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_panjar</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
     
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>Kode Akun</td>
    <td width='200' align='center' class='header_laporan'>Nama Akun</td>
    <td width='80' align='center' class='header_laporan'>PP</td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
	 <td width='60' align='center' class='header_laporan'>DRK</td>
    <td width='90' align='center' class='header_laporan'>Debet</td>
    <td width='90' align='center' class='header_laporan'>Kredit</td>

  </tr>";
			$sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan, 
	   case a.dc when 'D' then nilai else 0 end as debet,case a.dc when 'C' then nilai else 0 end as kredit    
from panjar2_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_panjar='$row->no_panjar' 
order by a.kode_akun ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$debet=0; $kredit=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	<td class='isi_laporan'>$row1->kode_drk</td>
    <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
	
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
	
   <td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
  </tr><br>
  </table>
  <br>
  <table width='300' border='1' cellpadding='0' cellspacing='0' class='kotak' style='float:right'>
  <tr>
    <td height='20' class='header_laporan' style='padding-left:20px;'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1' >
      <tr>
        <td colspan='2' class='header_laporan'></td>
      </tr>
      <tr align='center'>
        <td width='150' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='150' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'><u>$row->nama_app</u></td>
        <td class='header_laporan'><u>$row->nama_user</u></td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>NIK.$row->nik_app</td>
        <td class='header_laporan'>NIK.$row->nik_user</td>
      </tr>
    </table></td>
  </tr>
</table>
</td>
</tr>
</table>
<br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
