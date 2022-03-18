<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetKpa extends server_report_basic
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
		$sql = "select 1 ";
		//error_log($sql);
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
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$nik_user=$tmp[5];
		$realisasi=$tmp[6];
		
		if ($jenis=="Investasi")
		{	$jenis="Neraca"; }
		
		$sql="select a.kode_akun,a.kode_lokasi,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.tw1,a.tw2,a.tw3,a.tw4,a.total
		from 
		(
		select substring(periode1,1,4) as tahun,kode_lokasi,kode_akun,kode_pp,kode_drk,
		sum(case when substring(periode1,5,2) ='01' then nilai end) as tw1,
		sum(case when substring(periode1,5,2) ='04' then nilai end) as tw2,
		sum(case when substring(periode1,5,2) ='07' then nilai end) as tw3,
		sum(case when substring(periode1,5,2) ='10' then nilai end) as tw4,
		sum(nilai) as total
		from angg_r 
		where periode1 in ('".$tahun."01','".$tahun."04','".$tahun."07','".$tahun."10') and modul='RELEASE'
		group by kode_akun,kode_pp,kode_drk,substring(periode1,1,4),kode_lokasi
		) a 
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
		inner join drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun and a.kode_lokasi=d.kode_lokasi
		$this->filter
		";		
		//echo $sql;
		$rs = $dbLib->execute($sql);	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan anggaran (KPA) ",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
 <tr >
    <td height='23' colspan='9' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td width='100' class='header_laporan'>Kode Akun</td>
        <td width='500' class='header_laporan'>: $row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
	  <tr>
        <td width='100' class='header_laporan'>Kode PP</td>
        <td width='500' class='header_laporan'>: $row->kode_pp</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nama PP </td>
        <td class='header_laporan'>: $row->nama_pp</td>
      </tr>
        <tr>
        <td class='header_laporan'>No DRK </td>
        <td class='header_laporan'>: $row->kode_drk </td>
      </tr>
      <tr>
        <td class='header_laporan'>Kegiatan</td>
        <td class='header_laporan'>: $row->nama_drk </td>
      </tr>
      
    </table></td>
    <td align='right' valign='middle'><table border='1' cellspacing='0' cellpadding='0' class='kotak'> 
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
        <td class='header_laporan' align='right'> ".number_format($row->total,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
 
 
  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
   <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>
   
";	
			
			
		$sql="select a.no_bukti,a.kode_pp,a.kode_drk,a.kode_lokasi,a.periode1,isnull(b.keterangan,'-') as keterangan,b.tanggal,b.tgl,
		case when a.dc='D' then a.nilai else 0 end as debet,
		case when a.dc='C' then a.nilai else 0 end as kredit
from angg_r a 
left join (select a.no_agg as no_bukti,a.tanggal,a.keterangan,b.kode_akun,b.kode_pp,b.kode_drk,convert(varchar(20),a.tanggal,103) as tgl
		  from anggaran_m a
		  inner join angg_r b on a.no_agg=b.no_bukti
		  union
		  select no_ju as no_bukti,tanggal,keterangan,kode_akun,kode_pp,kode_drk,convert(varchar(20),tanggal,103) as tgl
		  from ju_j 
		  union 
		  select no_kas as no_bukti,tanggal,keterangan,kode_akun,kode_pp,kode_drk,convert(varchar(20),tanggal,103) as tgl
		  from kas_j 
		  union 
		  select no_aju as no_bukti,tanggal,keterangan,kode_akun,kode_pp,kode_drk,convert(varchar(20),tanggal,103) as tgl
		  from if_aju_m 
		  union
          select no_terima as no_bukti,tanggal,keterangan,kode_akun,kode_pp,kode_drk,convert(varchar(20),tanggal,103) as tgl
          from takterima_j
		  )b on a.no_bukti=b.no_bukti and a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk
	where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.kode_drk='$row->kode_drk' and substring(a.periode1,1,4)='$tahun'
	order by a.periode1,b.tanggal
";
			
			//echo $sql;
			$rs1 = $dbLib->execute($sql);
			$saldo=0 ;
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$saldo+= $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode');\">$row1->no_bukti</a>";
				echo "</td>
    <td height='23' valign='top' class='isi_laporan'>$row1->tgl</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='header_laporan' align='right'>TOTAL TRIWULAN&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			
		}
		return "";
	}
	
}
?>
