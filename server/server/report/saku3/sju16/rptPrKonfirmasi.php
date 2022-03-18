<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrKonfirmasi extends server_report_basic
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
		$sql="select a.slip, a.no_quo,g.kota,a.tanggal,c.nama as nama_cust,b.nama as nama_tipe,
	   e.nama as nama_vendor,c.alamat,e.pic, c.nama as key_client_name,c.alamat as key_client_address,dbo.fntanggal(a.tanggal) as key_trans_date,
	   b.nama as key_type_insurance,a.occup as key_occupation,dbo.fntanggal(a.tgl_mulai) as key_period_from,a.lokasi as key_location,
	  dbo.fntanggal(a.tgl_selesai) as key_period_to, a.total as key_sum_insured, a.catat as key_remark,a.p_premi, a.p_fee as key_brokerage_rate,
	  h.nama as key_signer,i.kota as key_kota,h.jabatan as key_jabatan,case when a.kode_curr='IDR' then 'Rp.' else a.kode_curr end as key_curr,h.ttd,a.progress
from sju_quo_m  a 
inner join sju_tipe b on a.kode_tipe = b.kode_tipe and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_quo_vendor d on a.no_quo = d.no_quo and a.kode_lokasi=d.kode_lokasi
inner join sju_vendor e on d.kode_vendor = e.kode_vendor and d.kode_lokasi=e.kode_lokasi
inner join sju_pic f on a.kode_pic = f.kode_pic and a.kode_lokasi=f.kode_lokasi
inner join lokasi g on a.kode_lokasi=g.kode_lokasi
inner join karyawan h on a.ttd=h.nik
inner join pp i on a.kode_pp=i.kode_pp and a.kode_lokasi=i.kode_lokasi
			$this->filter 
			order by a.no_quo ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada Yth : </td>
  </tr>
  <tr>
    <td>$row->nama_cust</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Menunjuk pengajuan  Bapak/Ibu untuk penutupan asuransi atas aset dan atau kepentingan Bapak/Ibu, dengan ini kami sampaikan Terms and Conditions polis berikut dengan tarip preminya, sebagai berikut:</td>
  </tr>
  <tr>
    <td><table width='600' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='20'>1.</td>
        <td width='580'>Terms and Conditions sebagaimana terlampir </td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Tarip Premi sebesar ".number_format($row->p_premi,2,',','.')." % </td>
      </tr>
     
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Selanjutnya untuk proses penerbitan polis, kami mohon konfirmasi persetujuan Bapak/Ibu atas Terms and Conditions dan tarip premi tersebut di atas. </td>
  </tr>
  <tr>
    <td>Demikian kami sampaikan, atas perhatiannya kami ucapkan Terimakasih.</td>
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
		echo "<DIV style='page-break-after:always'></DIV>";
		}

		return "<?div>";
		
	}
	
}
?>
