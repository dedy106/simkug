<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptQuo extends server_report_basic
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
		$sql="select a.slip, a.no_quo,g.kota,
	   e.nama as nama_vendor,e.alamat,e.pic, c.nama as client_qq_name,c.alamat as client_qq_address,date_format(a.tanggal,'%d/%m/%Y') as trans_date,
	   b.nama as type_insurance,'-' as occupation,date_format(a.tgl_mulai,'%d/%m/%Y') as period_from, 
	  date_format(a.tgl_selesai,'%d/%m/%Y') as period_to, a.n_premi as Sum_insured, '-' as remark,a.p_premi as premium_rate, a.p_fee as brokerage_rate,
	  f.nama as signer
from sju_quo_m  a 
inner join sju_tipe b on a.kode_tipe = b.kode_tipe and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_quo_vendor d on a.no_quo = d.no_quo and a.kode_lokasi=d.kode_lokasi
inner join sju_vendor e on d.kode_vendor = e.kode_vendor and d.kode_lokasi=e.kode_lokasi
inner join sju_pic f on a.kode_pic = f.kode_pic and a.kode_lokasi=f.kode_lokasi
inner join lokasi g on a.kode_lokasi=g.kode_lokasi
			$this->filter 
			order by a.no_quo ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
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
			header("Content-Disposition: attachment;Filename=quo.doc");
		}
		echo "<div align='center'>";
		
		
	$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td> Kepada Yth,  </td>
  </tr>
  <tr>
    <td>$row->pic</td>
  </tr>
  <tr>
    <td>$row->nama_vendor</td>
  </tr>
  <tr>
    <td>$row->alamat</td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>QUOTATION SLIP</td>
  </tr>
  <tr>
    <td align='center'>$row->no_quo</td>
  </tr>
  <tr>
    <td align='center'>";
			$slip = urldecode($row->slip);
			$rsD = $dbLib->execute("select kunci, isi from sju_quo_d  where no_quo='$row->no_quo'");
			$rowObj = (array) $row;
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kunci;
				$value = urldecode($row2->isi);
				if (isset($rowObj[$value]) ){
					$slip = str_replace($kunci,$rowObj[$value], $slip );
				}else {
					$slip = str_replace($kunci, $value, $slip);
				}
				
			}	
			$rsD = $dbLib->execute("select kunci, isi from sju_quo_draft  where no_quo='$row->no_quo'");
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kunci;
				$value = urldecode($row2->isi);
				$slip = str_replace($kunci, $value, $slip);
			}
			echo $slip;
		}
	echo "</td>
  </tr>
</table>";
	
		return "<?div>";
		
	}
	
}
?>
