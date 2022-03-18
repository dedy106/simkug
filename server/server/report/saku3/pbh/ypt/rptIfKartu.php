<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptIfKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$tahun=substr($periode,0,4);
		$sql="select distinct a.nik,b.nama,a.kode_pp,c.nama as nama_pp,a.kode_lokasi 
from if_nik a
inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter 
order by a.nik";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan imprest fund",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>NIK</td>
        <td  class='header_laporan'>: $row->nik</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Kode PP</td>
        <td  class='header_laporan'>: $row->kode_pp</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>Nama PP</td>
        <td class='header_laporan'>: $row->nama_pp </td>
			</tr>
			<tr>
			<td width='99' class='header_laporan'>Tahun</td>
			<td class='header_laporan'>: $tahun </td>
		</tr>
    </table></td>
  </tr>";
 
  echo "<tr bgcolor='#CCCCCC'>
	<td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
	<td width='80' class='header_laporan' align='center'>Kredit</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
";
			
			$sql="select a.no_kas as no_bukti,b.tanggal,a.kode_lokasi,b.keterangan,b.nilai as debet,0 as kredit,date_format(b.tanggal,'%d/%m/%Y') as tgl,1 as nu
from if_nik a
inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)='$tahun'
where a.nik='$row->nik' and a.kode_lokasi='$row->kode_lokasi'
union all
select a.no_pb as no_bukti,a.tanggal,a.kode_lokasi,a.keterangan,0 as debet,a.nilai as kredit,date_format(a.tanggal,'%d/%m/%Y') as tgl,2 as nu
from pbh_pb_m a
where a.nik_user='$row->nik' and a.kode_lokasi='$row->kode_lokasi'  and a.nilai<>0 and substring(a.periode,1,4)='$tahun' and a.modul='IFREIM'
union all
select a.no_pb as no_bukti,b.tanggal,a.kode_lokasi,a.keterangan,a.nilai as debet,0 as kredit,date_format(b.tanggal,'%d/%m/%Y') as tgl,3 as nu
from pbh_pb_m a
inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$row->nik' and a.kode_lokasi='$row->kode_lokasi' and a.no_kas<>'-'  and substring(a.periode,1,4)='$tahun' and a.modul='IFREIM'

union all
select c.no_kas as no_bukti,c.tanggal,c.kode_lokasi,c.keterangan,0 as debet,c.nilai as kredit,date_format(b.tanggal,'%d/%m/%Y') as tgl,4 as nu
from if_nik a
inner join hutang_m b on a.no_flag=b.no_hutang and a.kode_lokasi=b.kode_lokasi
inner join kas_m c on b.no_ref=c.no_kas and a.kode_lokasi=c.kode_lokasi
where a.nik='$row->nik' and a.kode_lokasi='$row->kode_lokasi' and a.no_kas<>'-'  and substring(a.periode,1,4)='$tahun' and a.no_flag<>'-'

order by tanggal
 ";
			
			$rs1 = $dbLib->execute($sql);
			$debet=0; $kredit=0; $saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit ;	
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;
				echo "<tr>
	 <td height='23'  class='isi_laporan'>".$row1->tgl."</td>
    <td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_pb','$row1->kode_lokasi','$periode');\">$row1->no_bukti</a>";
				echo "</td>
				
    <td  class='isi_laporan'>".$row1->keterangan."</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
