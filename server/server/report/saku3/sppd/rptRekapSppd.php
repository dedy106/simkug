<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptRekapSppd extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.no_stugas,a.no_perintah,b.nik_spj,a.kode_pp,ISNULL(b.nilai_uhar,0) as uhar,c.nama as nama_spj,d.nama as nama_pp,
 ISNULL(b.nilai_trans,0) as trans,a.keterangan,a.no_aju,a.kode_akun,a.kode_drk,e.nama as nama_akun
from sp_stugas_m a 
inner join sp_spj_m b on a.no_stugas=b.no_stugas and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on b.nik_spj=c.nik and a.kode_lokasi=c.kode_lokasi 
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
inner join masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
$this->filter and b.progress<>'Z'
order by a.no_stugas ";

		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap sppd per karyawan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Surat Tugas</td>
	 <td width='60'  align='center' class='header_laporan'>PP Surat Tugas</td>
	 <td width='80'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan </td>
	 <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='80'  align='center' class='header_laporan'>Kode DRK</td>
	 <td width='80'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='80'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$total=0; $total1=0; $total2=0; $total3=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->trans+$row->uhar;
				$total1+=$row->uhar;
			$total2+=$row->trans;
			$total3+=$total;
		
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan' >$row->no_stugas</td>
	  <td class='isi_laporan' >$row->kode_pp</td>
	  <td class='isi_laporan' >$row->nik_spj</td>
	 <td class='isi_laporan' >$row->nama_spj</td>
	 <td class='isi_laporan' >$row->keterangan</td>
	 <td class='isi_laporan' >$row->kode_akun</td>
	 <td class='isi_laporan' >$row->nama_akun</td>
	 <td class='isi_laporan' >$row->kode_drk</td>
	 <td class='isi_laporan' align='right'>".number_format($row->uhar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($total3,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
