<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptKbBukuBesarCurr extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$sql = "select 1 ";
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
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$mutasi=$tmp[3];
		$jenis=$tmp[4];
		$periode2=$tmp[5];
	
		$sql="exec sp_kas_dw_curr_tmp '$kode_lokasi','$periode','$nik_user' ";
		
		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) ";
		}
		$rs = $dbLib->execute($sql);
		$sql = "select kode_akun,nama,kode_lokasi,so_awal_curr,so_awal,kode_curr
from glma_tmp $this->filter and nik_user='$nik_user' $mutasi order by kode_akun ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		if ($jenis=="Range")
		{
			echo $AddOnLib->judul_laporan("buku besar currency",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2));
			$sql2=" and a.periode between '$periode' and '$periode2' ";
		}
		else
		{
			echo $AddOnLib->judul_laporan("buku besar currency",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
			$sql2=" and a.periode='$periode' ";
		}
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='13' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>Kode Akun</td>
        <td width='360' class='header_laporan'>: $row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	   <tr>
        <td  class='header_laporan'>Mata Uang </td>
        <td  class='header_laporan'>: $row->kode_curr</td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Saldo Awal $row->kode_curr</td>
    <td class='header_laporan' align='right'>".number_format($row->so_awal_curr,2,',','.')."</td>
	<td colspan='2' class='header_laporan' align='right'>Saldo Awal (Rp) </td>
	<td class='header_laporan' align='right'>".number_format($row->so_awal,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='25' class='header_laporan' align='center'>No</td>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='80' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='40' class='header_laporan' align='center'>Kurs</td>
	<td width='80' class='header_laporan' align='center'>Debet $row->kode_curr</td>
    <td width='80' class='header_laporan' align='center'>Kredit $row->kode_curr</td>
    <td width='80' class='header_laporan' align='center'>Saldo $row->kode_curr</td>
    <td width='90' class='header_laporan' align='center'>Debet (Rp)</td>
    <td width='90' class='header_laporan' align='center'>Kredit (Rp)</td>
    <td width='90' class='header_laporan' align='center'>Saldo (Rp)</td>
  
  </tr>

  
";
			
			$sql="select a.no_kas as no_bukti,a.kode_lokasi,a.no_dokumen,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.modul,a.keterangan,a.ref1,a.kurs,
						 case when a.dc='D' then a.nilai_curr else 0 end as debet_curr,case when a.dc='C' then a.nilai_curr else 0 end as kredit_curr,
						 case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit
				from kas_j a
				left join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
				where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' $sql2
				order by a.tanggal ";
			
			$i = 1;
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$saldo_curr=$row->so_awal_curr;
			$debet=0;$debet_curr=0;
			$kredit=0;$kredit_curr=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$saldo_curr=$saldo_curr + $row1->debet_curr - $row1->kredit_curr;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				$debet_curr=$debet_curr+$row1->debet_curr;
				$kredit_curr=$kredit_curr+$row1->kredit_curr;
				echo "<tr>
				<td height='23' valign='top' class='isi_laporan' align='center'>$i</td>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi','$row1->periode');\">$row1->no_bukti</a>";
				echo "</td>
     <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kurs,2,',','.')."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet_curr,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit_curr,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo_curr,2,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
