<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrPlacing extends server_report_basic
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
		$jenis=$tmp[1];
		$sql="select a.slip, g.kota,a.no_placing,a.tanggal,a.progress,
	   e.nama as nama_vendor,e.alamat,e.pic, c.nama as key_client_name,c.alamat as key_client_address,dbo.fntanggal(a.tanggal) as key_trans_date,
	   b.nama as key_type_insurance,a.occup as key_occupation,dbo.fntanggal(a.tgl_mulai) as key_period_from,a.lokasi as key_location,
	  dbo.fntanggal(a.tgl_selesai) as key_period_to, a.n_premi as key_sum_insured, '-' as key_remark,a.p_premi as key_premium_rate, a.p_fee as key_brokerage_rate,
	  j.nama as key_signer,k.kota as key_kota,j.jabatan as key_jabatan,case when a.kode_curr='IDR' then 'Rp.' else a.kode_curr end as key_curr,j.ttd
from sju_placing_m a 
inner join sju_tipe b on a.kode_tipe = b.kode_tipe and a.kode_lokasi=b.kode_lokasi 
inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_placing_vendor h on a.no_placing = h.no_placing and a.kode_lokasi=h.kode_lokasi
inner join sju_vendor e on h.kode_vendor = e.kode_vendor and h.kode_lokasi=e.kode_lokasi 
inner join sju_pic f on a.kode_pic = f.kode_pic and a.kode_lokasi=f.kode_lokasi 
inner join lokasi g on a.kode_lokasi=g.kode_lokasi 
inner join sju_quo_m i on a.no_placing=i.no_placing and a.kode_lokasi=i.kode_lokasi
inner join karyawan j on i.ttd=j.nik
inner join pp k on a.kode_pp=k.kode_pp and a.kode_lokasi=k.kode_lokasi
			$this->filter 
			order by a.no_placing ";
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$i=1;
		if ($jenis=="Word")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Transfer-Encoding: binary ");
			header("Content-type: application/vnd.ms-word");
			header("Content-Disposition: attachment;Filename=placing.doc");
		}
		echo "<div align='center'>";
		
		
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$ttd = $path . "server/media/".$row->ttd;
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1'>
   
 
 
  <tr>
    <td align='center' class='lokasi_laporan'><u>PLACING SLIP</u></td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>No. : $row->no_placing</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>";
			$slip = urldecode($row->slip);
			
			echo $slip;
		
	echo "</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>$row->key_kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td>PT. Sarana Janesia Utama</td>
  </tr>
   <tr>
     <td height='60'>";
	if ($row->progress!="0")
	{
		echo "<img src=$ttd width='128' height='100' />";
	}
	
	echo "</td>
  </tr>
   <tr>
    <td>$row->key_signer</td>
  </tr>
  <tr>
    <td>$row->key_jabatan</td>
  </tr>
</table>";
		}
		return "";
		
	}
	
}
?>
