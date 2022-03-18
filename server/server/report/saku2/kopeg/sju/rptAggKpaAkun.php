<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptAggKpaAkun extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$sql = $sql = "select 1 ";
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$jenis=$tmp[2];
		$realisasi=$tmp[3];
		$nik_user=$tmp[4];
		if ($jenis=="Investasi")
		{	$jenis="Neraca"; }
		
	
		$sql = "select a.kode_akun,a.kode_lokasi,b.nama as nama_akun
				, sum(case when substring(a.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as tw1
                , sum(case when substring(a.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as tw2
	            , sum(case when substring(a.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as tw3
	            , sum(case when substring(a.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as tw4
				, sum(case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as so_awal
from anggaran_d a
inner join masakun b on a.kode_akun=b.kode_akun and b.jenis='$jenis' and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
$this->filter 
group by a.kode_akun,a.kode_lokasi,b.nama
order by a.kode_akun ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan anggaran (KPA) ",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak' >
 
 <tr >
    <td height='23' colspan='7' class='header_laporan'><table width='900' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
		
	  <tr>
        <td width='100' class='header_laporan'>Kode Akun</td>
        <td width='500' class='header_laporan'>: ".$AddOnLib->fnAkun($row->kode_akun)."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
    </table></td>
    <td align='right' valign='middle'><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='200'> 
      <tr align='center'>
        <td colspan='2' class='header_laporan'>RKA TAHUN $tahun </td>
        </tr>
      <tr>
        <td width='100' class='header_laporan'>TRIWULAN-I</td>
        <td width='100' class='header_laporan' align='right'> ".number_format($row->tw1,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>TRIWULAN-II</td>
        <td class='header_laporan' align='right'> ".number_format($row->tw2,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>TRIWULAN-III</td>
        <td class='header_laporan' align='right'> ".number_format($row->tw3,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>TRIWULAN-IV</td>
        <td class='header_laporan' align='right'> ".number_format($row->tw4,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>JUMLAH</td>
        <td class='header_laporan' align='right'> ".number_format($row->so_awal,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
 
 
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	 <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='50' class='header_laporan' align='center'>Kode PP</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>
   
";	
			//kpa tw 1
			
				$tabel ="(select * from gldt_h where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' 
union all 
select * from gldt_tmp where kode_lokasi='$row->kode_lokasi' and substring(periode,5,2) in ('01','02','03') and kode_akun='$row->kode_akun' and substring(periode,1,4)='$tahun' ) ";
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from $tabel a order by a.tanggal ";

			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='6' class='header_laporan' align='right'>ANGGARAN TRIWULAN I&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->tw1,0,',','.')."</td>
	 </tr>";
			$saldo=$row->tw1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='4'  class='header_laporan' align='right'>TOTAL TRIWULAN I&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		//kpa tw 2
			
				$tabel ="(select * from gldt_h where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' 
union all 
select * from gldt_tmp where kode_lokasi='$row->kode_lokasi' and substring(periode,5,2) in ('04','05','06') and kode_akun='$row->kode_akun' and substring(periode,1,4)='$tahun' ) ";
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from $tabel a order by a.tanggal ";

			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='6'  class='header_laporan' align='right'>ANGGARAN TRIWULAN II&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->tw2,0,',','.')."</td>
	 </tr>";
			$saldo=$row->tw2;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
			<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='4'  class='header_laporan' align='right'>TOTAL TRIWULAN II&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		//kpa tw 3
			
				$tabel ="(select * from gldt_h where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' 
union all 
select * from gldt_tmp where kode_lokasi='$row->kode_lokasi' and substring(periode,5,2) in ('07','08','09') and kode_akun='$row->kode_akun' and substring(periode,1,4)='$tahun' ) ";
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from $tabel a order by a.tanggal ";

			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='6'  class='header_laporan' align='right'>ANGGARAN TRIWULAN III&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->tw3,0,',','.')."</td>
	 </tr>";
			$saldo=$row->tw3;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
		<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='4'  class='header_laporan' align='right'>TOTAL TRIWULAN III&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		//kpa tw 4
			
				$tabel ="(select * from gldt_h where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' 
union all 
select * from gldt_tmp where kode_lokasi='$row->kode_lokasi' and substring(periode,5,2) in ('10','11','12') and kode_akun='$row->kode_akun' and substring(periode,1,4)='$tahun' ) ";
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from $tabel a order by a.tanggal ";

			
			$rs1 = $dbLib->execute($sql);
			
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			echo "<tr>
	   <td height='23' colspan='6'  class='header_laporan' align='right'>ANGGARAN TRIWULAN IV&nbsp;</td>
	   <td  class='header_laporan' align='right'>".number_format($row->tw4,0,',','.')."</td>
	 </tr>";
			$saldo=$row->tw4;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				
				echo "<tr>
		<td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode','$row1->modul');\">$row1->no_bukti</a>";
				echo "</td>
			<td height='23'  class='isi_laporan'>".$row1->tgl."</td>
		<td  class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
		<td  class='isi_laporan' align='center'>".$row1->kode_pp."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
	  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='4'  class='header_laporan' align='right'>TOTAL TRIWULAN IV&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr>";
		echo "</table><br>";
			
			
		}
		return "";
	}
	
}
?>
