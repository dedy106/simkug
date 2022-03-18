<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrPlacing extends server_report_basic
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
		$sql="select a.slip, g.kota,a.no_placing,
	   e.nama as nama_vendor,e.alamat,e.pic, c.nama as key_client_name,c.alamat as key_client_address,dbo.fntanggal(a.tanggal) as key_trans_date,
	   b.nama as key_type_insurance,a.occup as key_occupation,dbo.fntanggal(a.tgl_mulai) as key_period_from,a.lokasi as key_location,
	  dbo.fntanggal(a.tgl_selesai) as key_period_to, a.n_premi as key_sum_insured, '-' as key_remark,a.p_premi as key_premium_rate, a.p_fee as key_brokerage_rate,
	  j.nama as key_signer,g.kota as key_kota,j.jabatan as key_jabatan,case when a.kode_curr='IDR' then 'Rp.' else a.kode_curr end as key_curr
from sju_placing_m a 
inner join sju_tipe b on a.kode_tipe = b.kode_tipe and a.kode_lokasi=b.kode_lokasi 
inner join sju_cust c on a.kode_cust = c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_placing_vendor h on a.no_placing = h.no_placing and a.kode_lokasi=h.kode_lokasi
inner join sju_vendor e on h.kode_vendor = e.kode_vendor and h.kode_lokasi=e.kode_lokasi 
inner join sju_pic f on a.kode_pic = f.kode_pic and a.kode_lokasi=f.kode_lokasi 
inner join lokasi g on a.kode_lokasi=g.kode_lokasi 
inner join sju_quo_m i on a.no_placing=i.no_placing and a.kode_lokasi=i.kode_lokasi
inner join karyawan j on i.ttd=j.nik
			$this->filter 
			order by a.no_placing ";
	
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
			header("Content-Disposition: attachment;Filename=placing.doc");
		}
		echo "<div align='center'>";
		
		
	$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='700' border='0' cellspacing='2' cellpadding='1'>
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
			$rsD = $dbLib->execute("select kunci, isi from sju_placing_draft  where no_placing='$row->no_placing'");
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kunci;
				$value = urldecode($row2->isi);
				$slip = str_replace($kunci, $value, $slip);
			}
			$rsD = $dbLib->execute("select kunci, nama from sju_kunci ");
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
			echo $slip;
			echo "<DIV style='page-break-after:always'></DIV>";
		}
	echo "</td>
  </tr>
</table></div>";
	
		return "";
		
	}
	
}
?>
