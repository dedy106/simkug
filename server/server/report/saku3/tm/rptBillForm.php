<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tm_rptBillForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		
		
		$sql="select a.no_bill,a.no_dokumen as key_nobill,fn_tanggal(a.tanggal) as key_tglbill,a.keterangan as key_ket,
		a.nilai as key_nilai,draft,fn_terbilang(a.nilai) as key_terbilang,
		b.nama as key_namacust,b.alamat as key_alamat,b.kota as key_kota,a.nama_bill as key_kepada,
		c.jabatan as key_jab,
		a.bank as key_bank,a.cabang as key_cabang,a.no_rek as key_norek,a.nama_rek as key_namarek,
		d.no_dok as key_pks,fn_tanggal(d.tgl_awal) as key_tglpks,d.keterangan as key_ketpks,
		a.no_ba as key_ketba
from bill_m a
inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join kontrak_m d on a.no_kontrak=d.no_kontrak and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_bill";
		echo $sql;
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$slip = urldecode($row->draft);
			
			$sql="select  kode_kunci, nama from bill_kunci ";
			$rsD = $dbLib->execute($sql);
			
			$rowObj = (array) $row;
			while ($row2 = $rsD->FetchNextObject($toupper=false))
			{
				$kunci = $row2->kode_kunci;
				
				try{
				if ($kunci == "key_nilai" )
					eval("\$value = number_format(\$row->".trim($kunci).",0,',','.');");
				else
					eval("\$value = \$row->".trim($kunci).";");
				$slip = str_replace(trim($kunci), $value, $slip);
				}catch(Exception $e){
				error_log($kunci . ": ". $e->getMessage());
				}
			}
			try{
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
	
		return "";
		
	}
	
}
?>
