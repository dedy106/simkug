<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrQuo extends server_report_basic
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
		
		
		$sql="select a.slip, a.no_quo,g.kota,
	   e.nama as nama_vendor,e.alamat,e.pic, c.nama as key_client_name,c.alamat as key_client_address,dbo.fntanggal(a.tanggal) as key_trans_date,
	   b.nama as key_type_insurance,a.occup as key_occupation,dbo.fntanggal(a.tgl_mulai) as key_period_from,a.lokasi as key_location,
	  dbo.fntanggal(a.tgl_selesai) as key_period_to, a.total as key_sum_insured, a.catat as key_remark,a.p_premi as key_premium_rate, a.p_fee as key_brokerage_rate,
	  h.nama as key_signer,g.kota as key_kota,h.jabatan as key_jabatan,case when a.kode_curr='IDR' then 'Rp.' else a.kode_curr end as key_curr
from sju_quo_m  a 
inner join sju_tipe b on a.kode_tipe = b.kode_tipe and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_quo_vendor d on a.no_quo = d.no_quo and a.kode_lokasi=d.kode_lokasi
inner join sju_vendor e on d.kode_vendor = e.kode_vendor and d.kode_lokasi=e.kode_lokasi
inner join sju_pic f on a.kode_pic = f.kode_pic and a.kode_lokasi=f.kode_lokasi
inner join lokasi g on a.kode_lokasi=g.kode_lokasi
inner join karyawan h on a.ttd=h.nik
			$this->filter 
			order by a.no_quo ";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		
		
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1' align='center'>
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
    <td align='center' class='lokasi_laporan'><u>QUOTATION SLIP</u></td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>$row->no_quo</td>
  </tr>
   <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'>";
			
			$slip = urldecode($row->slip);
			$rsD = $dbLib->execute("select kunci, isi from sju_quo_draft  where no_quo='$row->no_quo'");
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kunci;
				$value = urldecode($row2->isi);
				$slip = str_replace($kunci, $value, $slip);
			}
			$sql="select  kunci, nama from sju_kunci ";
			$rsD = $dbLib->execute($sql);
			
			$rowObj = (array) $row;
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kunci;
				
				try{
				if ($kunci == "key_sum_insured" || $kunci == "key_premium_rate" || $kunci == "key_brokerage_rate")
					eval("\$value = number_format(\$row->".trim($kunci).",2,',','.');");
				else
					eval("\$value = \$row->".trim($kunci).";");
				$slip = str_replace(trim($kunci), $value, $slip);
				}catch(Exception $e){
					error_log($kunci . ": ". $e->getMessage());
				}
			}
			
			try{
				//error_log($slip);
				eval("\$slip = $slip;");
			}catch(Exception $e){
				error_log($slip);
			}
			echo $slip;
			//echo "<DIV style='page-break-after:always'></DIV>";
			
		}
	echo "</td>
  </tr>
</table>";
	
		return "</div>";
		
	}
	
}
?>
