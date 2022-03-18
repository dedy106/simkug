<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggKpaAkunBln extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$sql = $sql = "select 1 ";
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
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$nik_user=$tmp[2];
		$mutasi=substr($tmp[3],4,2);
		$sts_trail=$tmp[4];
		if ($sts_trail=="1")
		{
			$kode_pp="";
			$kode_drk="";
			$periode="";
			$kode_bidang="";
		}
		if ($jenis=="Investasi")
		{	$jenis="Neraca"; }
		$sql = "select a.kode_akun,a.kode_lokasi,a.kode_drk,b.nama as nama_akun,e.nama as nama_drk,d.kode_pp,d.nama as nama_pp
				, sum(case when substring(a.periode,5,2) = '01' then case when dc='D' then nilai else -nilai end else 0 end ) as t01
				, sum(case when substring(a.periode,5,2) = '02' then case when dc='D' then nilai else -nilai end else 0 end ) as t02
				, sum(case when substring(a.periode,5,2) = '03' then case when dc='D' then nilai else -nilai end else 0 end ) as t03
                , sum(case when substring(a.periode,5,2) = '04' then case when dc='D' then nilai else -nilai end else 0 end ) as t04
	            , sum(case when substring(a.periode,5,2) = '05' then case when dc='D' then nilai else -nilai end else 0 end ) as t05
	            , sum(case when substring(a.periode,5,2) = '06' then case when dc='D' then nilai else -nilai end else 0 end ) as t06
				, sum(case when substring(a.periode,5,2) = '07' then case when dc='D' then nilai else -nilai end else 0 end ) as t07
				, sum(case when substring(a.periode,5,2) = '08' then case when dc='D' then nilai else -nilai end else 0 end ) as t08
                , sum(case when substring(a.periode,5,2) = '09' then case when dc='D' then nilai else -nilai end else 0 end ) as t09
	            , sum(case when substring(a.periode,5,2) = '10' then case when dc='D' then nilai else -nilai end else 0 end ) as t10
	            , sum(case when substring(a.periode,5,2) = '11' then case when dc='D' then nilai else -nilai end else 0 end ) as t11
				, sum(case when substring(a.periode,5,2) = '12' then case when dc='D' then nilai else -nilai end else 0 end ) as t12
				, sum(case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as so_awal
from anggaran_d a
inner join masakun b on a.kode_akun=b.kode_akun and b.jenis='$jenis' and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
inner join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun' $this->filter 
group by a.kode_akun,a.kode_lokasi,a.kode_drk,b.nama,e.nama,d.kode_pp,d.nama
order by a.kode_akun ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan anggaran (KPA) ",$this->lokasi,"TAHUN $tahun");
		$flag01="0"; $flag02="0"; $flag03="0"; $flag04="0"; $flag05="0"; $flag06="0";
		$flag07="0"; $flag08="0"; $flag09="0"; $flag10="0"; $flag11="0"; $flag12="0";
		if ($mutasi!="")
		{
			$flag01="1"; $flag02="1"; $flag03="1"; $flag04="1"; $flag05="1"; $flag06="1";
			$flag07="1"; $flag08="1"; $flag09="1"; $flag10="1"; $flag11="1"; $flag12="1";
			if ($mutasi=="01") {$flag01="0";}
			if ($mutasi=="02") {$flag02="0";}
			if ($mutasi=="03") {$flag03="0";}
			if ($mutasi=="04") {$flag04="0";}
			if ($mutasi=="05") {$flag05="0";}
			if ($mutasi=="06") {$flag06="0";}
			if ($mutasi=="07") {$flag07="0";}
			if ($mutasi=="08") {$flag08="0";}
			if ($mutasi=="09") {$flag09="0";}
			if ($mutasi=="10") {$flag10="0";}
			if ($mutasi=="11") {$flag11="0";}
			if ($mutasi=="12") {$flag12="0";}
		}
		echo $flag01;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' width='1000'>
 
 <tr >
    <td height='23' colspan='9' class='header_laporan'><table width='900' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
		
	    <tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
        <tr>
        <td class='header_laporan'>No DRK </td>
        <td class='header_laporan'>: $row->kode_drk </td>
      </tr>
      <tr>
        <td class='header_laporan'>Kegiatan</td>
        <td class='header_laporan'>: $row->nama_drk </td>
      </tr>
      <tr>
        <td width='100' class='header_laporan'>Kode Akun</td>
        <td width='500' class='header_laporan'>: $row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
    </table></td>
    <td align='right' valign='middle'><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='410'> 
      <tr align='center'>
        <td colspan='5' class='header_laporan'>RKA TAHUN $tahun </td>
        </tr>
      <tr>
        <td width='100' class='header_laporan'>Januari</td>
        <td width='100' class='header_laporan' align='right'>".number_format($row->t01,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>Juli</td>
        <td class='header_laporan' align='right'>".number_format($row->t07,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Februari</td>
        <td class='header_laporan' align='right'>".number_format($row->t02,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>Agustus</td>
        <td class='header_laporan' align='right'>".number_format($row->t08,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Maret</td>
        <td class='header_laporan' align='right'>".number_format($row->t03,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>September</td>
        <td class='header_laporan' align='right'>".number_format($row->t09,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>April</td>
        <td class='header_laporan' align='right'>".number_format($row->t04,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>Oktober</td>
        <td class='header_laporan' align='right'>".number_format($row->t10,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Mei</td>
        <td class='header_laporan' align='right'>".number_format($row->t05,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>November</td>
        <td class='header_laporan' align='right'>".number_format($row->t11,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Juni</td>
        <td class='header_laporan' align='right'>".number_format($row->t06,0,',','.')."</td>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>Desember</td>
        <td class='header_laporan' align='right'>".number_format($row->t12,0,',','.')."</td>
      </tr>
      <tr>
        <td colspan='4' align='center' class='header_laporan'>Total</td>
        <td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
 
 
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='50' class='header_laporan' align='center'>Kode PP</td>
    <td width='70' class='header_laporan' align='center'>Kode DRK</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>
   
";	
			//kpa bulan 1
		if ($mutasi=="01" || $flag01=="0")
		{
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('01') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
		
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Januari &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t01,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t01;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Januari&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
			//kpa bulan 2
		if ($mutasi=="02" || $flag02=="0")
		{
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('02') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Februari&nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t02,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t02;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Februari &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 3
		if ($mutasi=="03" || $flag03=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('03')
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Maret&nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t03,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t03;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Maret &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 4
		if ($mutasi=="04" || $flag04=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('04') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran April &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t04,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t04;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total April &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 5
		if ($mutasi=="05" || $flag05=="0")
		{
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a  
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('05') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Mei &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t05,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t05;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Mei &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 6
		if ($mutasi=="06" || $flag06=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('06')
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
		
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Juni &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t06,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t06;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Juni &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 7
		if ($mutasi=="07" || $flag07=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('07') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Juli &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t07,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t07;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Juli &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 8
		if ($mutasi=="08" || $flag08=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('08') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Agustus &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t08,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t08;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Agustus &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 9
		if ($mutasi=="09" || $flag09=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('09')
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran September &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t09,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t09;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total September &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 10
		if ($mutasi=="10" || $flag10=="0")
		{
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('10') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Oktober &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t10,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t10;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Oktober &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 11
		if ($mutasi=="11" || $flag11=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('11') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran November &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t11,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t11;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total November &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		//kpa bulan 12
		if ($mutasi=="12" || $flag12=="0")
		{	
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit,a.modul
				from angg_d a
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_drk='$row->kode_drk' and a.kode_pp='$row->kode_pp' and a.nik_user='$nik_user' 
					  and substring(a.periode,5,2) in ('12') 
				order by a.tanggal ";
			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='8' valign='top' class='header_laporan' align='right'>Anggaran Desember &nbsp;</td>
	   <td valign='top' class='header_laporan' align='right'>".number_format($row->t12,0,',','.')."</td>
	 </tr>";
			$saldo=$row->t12;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
		<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
		<td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td valign='top' class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td valign='top' class='isi_laporan'>".$row1->kode_drk."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='header_laporan' align='right'>Total Desember &nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		}
		echo "</table><br>";
			
			
		}
		return "";
	}
	
}
?>
