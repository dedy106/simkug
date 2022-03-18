<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_tak_rptTakNasionalTrail extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
	
		$sql="select  no_hutang,no_inv, periode, kode_vendor, bank, cabang, no_rek, nama_rek, nilai_bp, nilai_cc,nilai_bp,nilai_cc+nilai_bp as nilai,
	   bank_trans, no_kas, no_rekon,no_app
from yk_hutang_d $this->filter ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tak outstanding","nasional","TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Hutang</td>
     <td width='100'  align='center' class='header_laporan'>No Inv</td>
	 <td width='50'  align='center' class='header_laporan'>Periode</td>
	 <td width='50'  align='center' class='header_laporan'>Kode Vendor</td>
	 <td width='100'  align='center' class='header_laporan'>Bank</td>
	 <td width='100'  align='center' class='header_laporan'>Cabang</td>
	 <td width='100'  align='center' class='header_laporan'>No Rek</td>
	 <td width='100'  align='center' class='header_laporan'>Nama Rek</td>
	 <td width='90'  align='center' class='header_laporan'>Bank Transfer</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>No Rekon CC</td>
	 <td width='90'  align='center' class='header_laporan'>No Approval</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai BP</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai CC</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$nilai=0;$nilai_bp=0;$nilai_cc=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_bp=$nilai_bp+$row->nilai_bp;
			$nilai_cc=$nilai_cc+$row->nilai_cc;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_hutang</td>
     <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_inv','$row->kode_lokasi');\">$row->no_inv</a>";
	 echo "</td>
	  <td class='isi_laporan' align='center'>$row->periode</td>
	  <td class='isi_laporan' align='center'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->no_rekon</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bp,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_cc,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
   
	  <td class='isi_laporan' align='center' colspan='13'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_bp,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_cc,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
