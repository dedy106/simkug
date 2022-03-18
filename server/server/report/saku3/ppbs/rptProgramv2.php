<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptProgramv2 extends server_report_basic
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
		$nama_cab=$tmp[1];
		$sql="select distinct a.kode_pp,e.nama as nama_pp,b.kode_drk,c.kode_rkm,c.nama as nama_rkm,d.kode_program,d.nama as nama_program
        From agg_d a 
        inner join agg_drk b on a.kode_drk=b.kode_drk and substring(a.periode,1,4)=b.tahun and a.kode_lokasi=b.kode_lokasi
        inner join agg_rkm c on b.kode_rkm=c.kode_rkm and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun
        inner join agg_program d on d.kode_program=c.kode_program and d.kode_lokasi=c.kode_lokasi and c.tahun=d.tahun
        inner join agg_pp e on a.kode_pp=e.kode_pp and e.kode_lokasi=a.kode_lokasi
        $this->filter ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data program",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
     <td width='300'  align='center' class='header_laporan'>Nama PP</td>
     <td width='80'  align='center' class='header_laporan'>Kode DRK</td>
     <td width='80'  align='center' class='header_laporan'>Kode RKM</td>
     <td width='300'  align='center' class='header_laporan'>Nama RKM</td>
     <td width='80'  align='center' class='header_laporan'>Kode Program</td>
     <td width='300'  align='center' class='header_laporan'>Nama Program</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>$row->kode_pp</td>
                <td class='isi_laporan'>$row->nama_pp</td>
                <td class='isi_laporan'>$row->kode_drk</td>
                <td class='isi_laporan'>$row->kode_rkm</td>
                <td class='isi_laporan'>$row->nama_rkm</td>
                <td class='isi_laporan'>$row->kode_program</td>
                <td class='isi_laporan'>$row->nama_program</td>
        </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
