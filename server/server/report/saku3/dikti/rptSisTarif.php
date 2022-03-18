<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dikti_rptSisTarif extends server_report_basic
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
		$tahun=substr($tmp[0],0,4);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="select a.nim,e.kode_kelas,a.kode_param,a.tarif,c.nama,c.kode_akt,
	    isnull(a.tarif,0) as n1,d.nama as param
		from dikti_mhs_tarif a
		inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
		inner join dikti_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi 
		inner join dikti_param d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi
		$this->filter  order by a.nim";
		echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tarif Mahasiswa",$this->lokasi," ");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>NIM</td>
	 <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kelas</td>
	 <td width='100'  align='center' class='header_laporan'>Angkatan</td>
	 <td width='200'  align='center' class='header_laporan'>Parameter</td>
	  <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->nim; 
			if ($tmp!=$row->nim)
			{

				$tmp=$row->nim;
				$first = true;
				
				if ($i>1)
				{
					$i=1;

					echo "<tr >
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	</tr>";
	$nilai=0;

				}

			}
			$nilai2+=$row->tarif;
			$nilai+=$row->tarif;

		echo "<tr >
     <td class='isi_laporan' align='center'>".($beda && $first? $i:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->nim:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->nama:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->kode_kelas:"")."</td>
	 <td class='isi_laporan'>".($beda && $first? $row->kode_akt:"")."</td>
	 <td class='isi_laporan'>$row->kode_param</td>
	 <td class='header_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
	 </tr>";
			$i=$i+1;
			$first = true;
		}
echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
