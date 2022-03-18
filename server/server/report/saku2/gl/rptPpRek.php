<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptPpRek extends server_report_basic
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
		
		$sql = "select a.kode_pp,a.kode_lokasi,a.bank,a.cabang,a.no_rek,a.nama_rek from pp_rek a ".$this->filter." order by a.kode_pp ";

		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR REKENING PP",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
				  <tr bgcolor='#CCCCCC'>    
				    <td width='60' class='header_laporan'><div align='center'>Kode PP</div></td>
					<td width='40' class='header_laporan'><div align='center'>Lokasi</div></td>
				    <td width='60' class='header_laporan'><div align='center'>Bank</div></td>
				    <td width='40' class='header_laporan'><div align='center'>Cabang</div></td>
				    <td width='70' class='header_laporan'><div align='center'>No Rek</div></td>
				    <td width='250' class='header_laporan'><div align='center'>Nama Rek</div></td>
				  </tr>";
		$tot_debet=0;
		$tot_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    echo "<tr>
				<td class='isi_laporan'>".$row->kode_pp."</td>
						<td class='isi_laporan' align='center'>".$row->kode_lokasi."</td>
						<td class='isi_laporan'>".$row->bank."</td>
						<td class='isi_laporan'><div align='center'>".$row->cabang."</div></td>
						<td class='isi_laporan'>".$row->no_rek."</td>
						<td class='isi_laporan'>".$row->nama_rek."</td>
					</tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
