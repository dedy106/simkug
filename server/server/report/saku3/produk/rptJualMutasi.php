<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptJualMutasi extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.periode,a.kode_lokasi, sum(a.nilai1) as totmutasi, sum(b.jumlah) as totjum,sum(b.bonus) as totbon
		from trans_m a
	inner join brg_trans_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi	
	$this->filter
	 group by a.periode,a.kode_lokasi ";
	

		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("mutasi nilai penjualan barang",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>No</td>
    <td width='250' align='center' class='header_laporan'>Periode</td>
    <td width='250' align='center' class='header_laporan'>Jumlah Barang Penjualan</td>
	 <td width='250' align='center' class='header_laporan'>Mutasi Nilai</td>
   </tr>";
   
		 $jml=0; $tot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml+=$row->totjum+$row->totbon;
			$tot+=$row->totmutasi;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->periode','$row->kode_lokasi');\">$row->periode</a>";
	echo "</td>
    <td align='right' class='isi_laporan'>".number_format($row->totjum,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row->totmutasi,0,",",".")."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='2'>Total</td>
  			<td class='isi_laporan' align='right'>".number_format($jml,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($tot,0,',','.')."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
