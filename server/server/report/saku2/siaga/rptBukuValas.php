<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptBukuValas extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$sql="exec sp_glma_kas_tmp '$kode_lokasi','$kode_lokasi','$kode_lokasi','$periode','$nik_user' ";
		$rs = $dbLib->execute($sql);
		$sql = "select count(a.kode_akun)
from glma_tmp a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi='$kode_lokasi' 
$this->filter and a.nik_user='$nik_user'  and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0)  and b.kode_curr<>'IDR' ";
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
		$periode2=$tmp[3];
		$sql="exec sp_glma_kas_tmp '$kode_lokasi','$kode_lokasi','$kode_lokasi','$periode','$nik_user' ";
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_akun,a.nama,b.kode_curr,a.periode,a.so_awal,a.so_awal_curr
from glma_tmp a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi='$kode_lokasi' 
$this->filter and a.nik_user='$nik_user'  and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) and b.kode_curr<>'IDR'
order by a.kode_akun";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan mutasi valas",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='13' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Akun</td>
        <td width='360' class='header_laporan'>: $row->kode_akun</td>
        <td width='97' class='header_laporan'>Mata Uang </td>
        <td width='226' class='header_laporan'>: $row->kode_curr</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama</td>
        <td class='header_laporan'>Periode</td>
        <td class='header_laporan'>: $row->periode</td>
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
    <td width='120' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='100' height='23' class='header_laporan' align='center'>Attensi</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='40' class='header_laporan' align='center'>Kurs</td>
	<td width='80' class='header_laporan' align='center'>Debet $row->kode_curr</td>
    <td width='80' class='header_laporan' align='center'>Kredit $row->kode_curr</td>
    <td width='80' class='header_laporan' align='center'>Saldo $row->kode_curr</td>
    <td width='90' class='header_laporan' align='center'>Debet (Rp)</td>
    <td width='90' class='header_laporan' align='center'>Kredit (Rp)</td>
    <td width='90' class='header_laporan' align='center'>Saldo (Rp)</td>
	 <td width='100' class='header_laporan' align='center'>Pembuat</td>
  
  </tr>

  
";
			
			$sql="select a.no_kas as no_bukti,a.kode_lokasi,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_akun,a.modul,a.keterangan,a.ref1,a.kurs,
						 case when a.dc='D' then a.nilai_curr else 0 end as debet_curr,case when a.dc='C' then a.nilai_curr else 0 end as kredit_curr,
						 case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,c.nama as nama_buat
				from kas_j a
				left join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
				left join karyawan c on b.nik_buat=c.nik
				where a.kode_akun='$row->kode_akun' $periode2
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
     <td valign='top' class='isi_laporan'>".$row1->ref1."</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kurs,2,',','.')."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo_curr,2,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	  <td valign='top' class='isi_laporan' align='center'>".$row1->nama_buat."</td>
  
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
