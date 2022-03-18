<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptGarHoldSaldo extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		
		$sql="select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
		convert(varchar, d.tanggal, 101) as tgl,d.keterangan,
	   isnull(b.nilai,0) as hold,isnull(c.nilai,0) as release,isnull(b.nilai,0)-isnull(c.nilai,0) as saldo
from (select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
	from anggaran_hold a
	where a.kode_lokasi='03' and modul='HOLD'
	group by a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
	 )a
inner join anggaran_m d on a.no_agg=d.no_agg and a.kode_lokasi=d.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,sum(a.nilai) as nilai
		from anggaran_hold a
		where a.kode_lokasi='03' and modul='HOLD'
		group by a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		  )b on a.no_agg=b.no_agg and a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk
left join (select a.no_hold,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,sum(a.nilai) as nilai
		from anggaran_hold a
		where a.kode_lokasi='03' and modul='RILIS'
		group by a.no_hold,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		  )c on a.no_agg=c.no_hold and a.kode_akun=c.kode_akun and a.kode_pp=c.kode_pp and a.kode_drk=c.kode_drk
where a.kode_lokasi='03'";

//echo $sql;

		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo anggaran hold",$this->lokasi,"Tahun ".$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='120'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='80'  align='center' class='header_laporan'>Kode DRK</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai Hold</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Release</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
     </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_agg','$row->kode_lokasi');\">$row->no_agg</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan'>$row->kode_akun</td>
	<td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->kode_drk</td>
	<td class='isi_laporan' align='right'>".number_format($row->hold,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->release,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
   </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
