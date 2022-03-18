<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlTbTahun extends server_report_basic
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
		$jenis=$tmp[3];
		$trail=$tmp[4];
		$nama_lokasi=$this->lokasi;
		$sql="select nama from lokasi where kode_lokasi='$kode_lokasi' ";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nama_lokasi=$row->nama;
		}
		//$sql="exec sp_glma_dw_tmp '$kode_lokasi','$periode','$nik_user' ";
		$sql="exec sp_glma_tahun_dw_tmp '$kode_lokasi','$periode','$nik_user' ";

		$mutasi="";
		if ($jenis=="Tidak")
		{
			$mutasi="and (a.so_awal<>0 or a.debet<>0 or a.kredit<>0 or a.so_akhir<>0) ";
		}
		$rs = $dbLib->execute($sql);
		$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
       case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
		from glma_tmp a $this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		if ($trail=="1")
		{
			$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
       case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
		from glma_tmp a
				inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		}
		if ($trail=="2")
		{
			$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
       case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
		from glma_tmp a
				inner join relakunproduk b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
				order by a.kode_akun";
		}
		if ($trail=="3")
		{
			$sql = "select a.kode_akun,a.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
       case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
		from glma_tmp a
				inner join relakun2 b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.nik_user='$nik_user' $mutasi
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
    <td class='lokasi_laporan' align='center'>$nama_lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>NERACA LAJUR (TAHUNAN)</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>".$AddOnLib->ubah_periode($periode)."</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='70' rowspan='2' class='header_laporan' align='center'>Kode Akun</td>
    <td width='300' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
     <td height='25' colspan='2' class='header_laporan' align='center'>Saldo Awal </td>
    <td colspan='2' class='header_laporan' align='center'>Mutasi</td>
    <td colspan='2' class='header_laporan' align='center'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='90' height='25' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBbTahun('$row->kode_akun','$row->kode_lokasi','$periode');\">$row->nama</a>";
	echo "</td>
  
<td class='isi_laporan' align='right'>".number_format($row->so_awal_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_kredit,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	
	echo "<tr>
    <td height='20' colspan='3' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($so_awal_debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($so_awal_kredit),0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($so_akhir_debet,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($so_akhir_kredit),0,',','.')."</td>
</tr>";
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
