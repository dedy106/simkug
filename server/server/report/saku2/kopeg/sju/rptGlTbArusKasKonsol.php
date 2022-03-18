<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlTbArusKasKonsol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$trail=$tmp[3];
		$sql="exec sp_glma_aruskas_konsol_sim '$kode_lokasi','$periode','$nik_user' ";
		
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_akun,a.nama,a.debet,a.kredit,a.so_akhir,a.kode_lokasi
			from glma_tmp a 
			where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
			order by a.kode_akun ";
		
		if ($trail=="1")
		{
			$sql = "select a.kode_akun,a.nama,a.debet,a.kredit,a.so_akhir,a.kode_lokasi
		from glma_tmp a
				inner join relakunkas b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
				order by a.kode_akun";
		}
	
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>SALDO AKUN ARUS KAS</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'   class='header_laporan' align='center'>No</td>
    <td width='70'  class='header_laporan' align='center'>Kode Akun</td>
    <td width='300'  class='header_laporan' align='center'>Nama Akun</td>
     <td height='25' width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90'' class='header_laporan' align='center'>Saldo Akhir</td>
  </tr>
";
		
		$debet=0;
		$kredit=0;
		$so_akhir=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir=$so_akhir+$row->so_akhir;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBb('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";
	echo "</td>
     <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir,0,',','.')."</td>
</tr>";
		echo "</td></tr>";
		echo "</table>";
		echo "<br>";
		
		//cek relasi ke relakunkas
		$sql = "select count(a.kode_akun) as jum
			from glma_tmp a 
			inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
				  and b.kode_flag not in ('001','009') and a.kode_akun not in (select distinct kode_akun from relakunkas where kode_lokasi='$kode_lokasi')
			";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		if ($row->jum > 0)
		{
			$sql = "select distinct a.kode_akun,a.nama
				from glma_tmp a 
				inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi' and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) 
					  and b.kode_flag not in ('001','009') and a.kode_akun not in (select distinct kode_akun from relakunkas where kode_lokasi='$kode_lokasi')
				order by a.kode_akun ";
			
			$rs = $dbLib->execute($sql);
			echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
	  <tr bgcolor='#CCCCCC'>
		<td width='30'   class='header_laporan' align='center'>No</td>
		<td width='70'  class='header_laporan' align='center'>Kode Akun</td>
		<td width='300'  class='header_laporan' align='center'>Nama Akun</td>
	  </tr>
	";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				echo "<tr>
		<td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row->kode_akun</td>
		<td height='20' class='isi_laporan'>$row->nama</td>
	  </tr>";
				
				$i=$i+1;
			}
		}
		echo "</table>";
		echo "</div>";
		return "";
	}
	
}
?>
