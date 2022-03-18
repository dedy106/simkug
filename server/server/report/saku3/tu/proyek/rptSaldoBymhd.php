<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptSaldoBymhd extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$sql="select a.no_aju,a.kode_lokasi,a.keterangan,d.kode_akun as akun_bymhd,b.kode_proyek as proyek,
		d.nilai,c.no_kas,isnull(d.nilai,0) as nilai_kas,d.nilai-isnull(d.nilai,0) as saldo
from it_aju_m a
inner join it_aju_d d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi and d.kode_akun like '2%'
inner join tu_prbdd_d b on a.no_aju=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.kode_akun=d.kode_akun
left join (select no_kas,no_dokumen,kode_lokasi,sum(nilai) as nilai
from kas_m
where kode_lokasi='$kode_lokasi' and modul in ('KBITSPB','KBUM') and periode<='$periode'
group by no_kas,no_dokumen,kode_lokasi  
		  )c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_aju ";

		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bymhd ntf",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Agenda</td>
	 <td width='100'  align='center' class='header_laporan'>Kode Lokasi</td>
     <td width='170'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='60'  align='center' class='header_laporan'>Akun BYMHD</td>
	 <td width='100'  align='center' class='header_laporan'>Kode NTF</td>
     <td width='90'  align='center' class='header_laporan'>Nilai BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	  <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 
   </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	   <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJu('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a>";
		echo "</td>
		 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->kode_lokasi','$row->kode_lokasi');\">$row->kode_lokasi</a>";
		echo "</td>
		<td class='isi_laporan'>$row->keterangan</td>
		<td class='isi_laporan'>$row->akun_bymhd</td>
		<td class='isi_laporan'>$row->proyek</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>";
	    	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	  </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
