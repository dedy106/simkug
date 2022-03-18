<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siswa_rptSisPresensi extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select distinct a.kode_ta, b.nama as ta, a.kode_kelas, c.nama as kelas, substring(convert(varchar,a.tanggal,112),1,6) as periode,a.kode_lokasi	
        from sis_presensi a
        inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_pp=b.kode_pp
        inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp
        inner join sis_siswa d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
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
			echo "<table border='1' cellspacing='0' cellpadding='1' width='800' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Tahun Ajaran</td>
        <td width='360' class='header_laporan'>: $row->ta</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->kelas</td>
			</tr>
			<tr>
        <td width='150' class='header_laporan'>Kelas</td>
        <td width='360' class='header_laporan'>: $row->periode</td>
      </tr>

    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='150' class='header_laporan' rowspan='2' align='center'>NIS</td>
    <td width='300' class='header_laporan' rowspan='2'align='center'>NAMA</td>
    <td width='200' class='header_laporan' colspan='4' align='center'>STATUS</td>
    <td width='150' class='header_laporan' rowspan='2' align='center'>KETERANGAN</td>
    </tr>
    <tr bgcolor='#CCCCCC'>
	<td  width='50' class='header_laporan' align='center'>Hadir</td>
    <td width='50' class='header_laporan' align='center'>Sakit</td>
    <td width='50' class='header_laporan' align='center'>Izin</td>
    <td width='50' class='header_laporan' align='center'>Alpa</td>
	</tr>

";
			
			$sql="select a.nis, a.nama , b.hadir,b.alpa,b.izin,b.sakit 
            from sis_siswa a 
            inner join (select a.nis,a.kode_lokasi,count(case when a.status ='hadir' then status end) hadir,
                       count(case when a.status ='alpa' then status end) alpa,
                       count(case when a.status ='izin' then status end) izin,
                       count(case when a.status ='sakit' then status end) sakit  
						from sis_presensi a
						inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_pp=b.kode_pp
						inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_pp=c.kode_pp
						inner join sis_siswa d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp

            $this->filter
            group by a.nis,a.kode_lokasi) b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
 ";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAbsenHar('$row1->nis','$row->kode_lokasi','$row->periode');\">$row1->nis</a></td>
     <td class='isi_laporan'>$row1->nama</td>
     <td class='isi_laporan'>$row1->hadir</td>
     <td class='isi_laporan'>$row1->sakit</td>
     <td class='isi_laporan'>$row1->izin</td>
     <td class='isi_laporan'>$row1->alpa</td>
     <td class='isi_laporan'>$row1->keterangan</td>

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
