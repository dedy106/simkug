<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPajak extends server_report_basic
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
		$periode=$tmp[1];
		$sql="select a.kode_lokasi,a.kode_akun,a.kode_pp,case when a.dc='D' then nilai else 0 end as debet,
		case when a.dc='C' then nilai else 0 end as kredit,b.nama as akun,c.nama as pp
 from (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai
	   from gldt_h a 
	   $this->filter
	   union all 
	   select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.dc,a.nilai
	   from gldt a  
	   $this->filter )a 
	   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
	   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
	   order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pajak",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
     <td width='200'  align='center' class='header_laporan'>Nama PP</td>
     <td width='90'  align='center' class='header_laporan'>Debet</td>
     <td width='90'  align='center' class='header_laporan'>Kredit</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	  </tr>  ";
		$saldo=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saldo=$row->debet-$row->kredit;
			$saldo1=$saldo1 + $row->debet - $row->kredit;	
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;	

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->debet,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kredit,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "<tr>
   <td height='23' colspan='5' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo1,0,',','.')."</td>
 </tr></table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
