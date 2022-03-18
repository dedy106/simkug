<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptExpSch extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$kode_lokasi=$tmp[1];
		
		$sql = "select a.no_kartu,a.kode_lokasi,a.kode_vendor,a.nilai,a.lama_bayar,a.akun_beban,a.akun_hutang from gr_kartu_m a ".$this->filter." order by a.no_kartu ";

		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("master akun",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
				  <tr bgcolor='#CCCCCC'>    
					<td width='30' class='header_laporan' height='25'><div align='center'>No Kartu</div></td>
				    <td width='80' class='header_laporan' height='25'><div align='center'>Keterangan</div></td>
				    <td width='400' class='header_laporan'><div align='center'>Kode Vendor</div></td>
				    <td width='40' class='header_laporan'><div align='center'>Akun Beban</div></td>
				    <td width='60' class='header_laporan'><div align='center'>Akun Hutang</div></td>
				    <td width='40' class='header_laporan'><div align='center'>Jumlah Sch</div></td>
				    <td width='40' class='header_laporan'><div align='center'>Nilai</div></td>				   
				  </tr>";
		$tot_debet=0;
		$tot_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>".$row->no_kartu."</td>
						<td class='isi_laporan'>".$row->keterangan."</td>
						<td class='isi_laporan'><div align='center'>".$row->kode_vendor."</div></td>
						<td class='isi_laporan'>".$row->akun_beban."</td>
						<td class='isi_laporan'>".$row->akun_hutang."</td>
						<td class='isi_laporan'><div align='center'>".$row->nilai."</div></td>
					</tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
