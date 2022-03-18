<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSisPresensiHar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
	
		$sql="select distinct a.nis,b.nama,substring(convert(varchar,a.tanggal,112),1,6) as periode,a.kode_kelas
        from sis_presensi a
        inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        $this->filter ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan presensi",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' width='700' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	   <tr>
        <td width='100' class='header_laporan'>Nama</td>
        <td width='360' class='header_laporan'>: $row->nis - $row->nama</td>
			</tr>
			<tr>
        <td width='100' class='header_laporan'>Periode</td>
        <td width='360' class='header_laporan'>: $row->periode</td>
      </tr>

    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='80' class='header_laporan' rowspan='2' align='center'>TANGGAL</td>
    <td width='120' class='header_laporan' colspan='4' align='center'>STATUS</td>
    </tr>
    <tr bgcolor='#CCCCCC'>
	<td  width='30' class='header_laporan' align='center'>Hadir</td>
    <td width='30' class='header_laporan' align='center'>Sakit</td>
    <td width='30' class='header_laporan' align='center'>Izin</td>
    <td width='30' class='header_laporan' align='center'>Alpa</td>
	</tr>

";
			
			$sql="select convert(varchar,a.tanggal,103) as tanggal,a.kode_lokasi,count(case when a.status ='hadir' then status end) hadir,
            count(case when a.status ='alpa' then status end) alpa,
            count(case when a.status ='izin' then status end) izin,
            count(case when a.status ='sakit' then status end) sakit  
            from sis_presensi a
            inner join sis_siswa d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
            where a.nis='$row->nis' and substring(convert(varchar,a.tanggal,112),1,6)='$row->periode'
            group by a.tanggal,a.kode_lokasi
             ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'>$row1->tanggal</td>
     <td class='isi_laporan'>$row1->hadir</td>
     <td class='isi_laporan'>$row1->sakit</td>
     <td class='isi_laporan'>$row1->izin</td>
     <td class='isi_laporan'>$row1->alpa</td>

 </tr>";
				
			}
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
