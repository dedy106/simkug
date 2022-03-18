<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptNilai extends server_report_basic
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
		$sql="select a.no_penilaian,a.nik_app,c.nama as dept,d.nama as dir,a.tanggal,e.nama as jab,b.nama as app
		from gr_penilaian_m a
		inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi
		left join gr_dept c on c.kode_dept=a.kode_dept and c.kode_lokasi=a.kode_lokasi
		left join gr_dir d on d.kode_dir=c.kode_dir and c.kode_lokasi=d.kode_lokasi
		inner join gr_jab e on b.kode_jab=e.kode_jab and b.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_penilaian ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("NILAI KINERJA INDIVIDU ( NKI )",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
		<td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td width='99' class='header_laporan'>Nomor Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_penilaian</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>Sub Direktorat</td>
        <td width='360' class='header_laporan'>: $row->dept</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Direktorat</td>
        <td width='360' class='header_laporan'>: $row->dir</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>No</td>
    <td width='100' class='header_laporan' align='center'>NIK</td>
    <td width='250' class='header_laporan' align='center'>Nama Karyawan</td>
		<td width='150' align='center' class='header_laporan'>Jabatan</td>
		<td width='50' align='center' class='header_laporan'>Angka</td>
		<td width='150' align='center' class='header_laporan'>Nilai PA</td>
		<td width='150' align='center' class='header_laporan'>Keterangan</td>
		</tr>
";
			
			$sql="select a.no_penilaian,a.kode_lokasi,a.nik,a.jabatan,a.angka,a.kode_pa,c.nama as pa,b.nama
			from gr_penilaian_d2 a
			inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join gr_pa c on a.kode_pa=c.kode_pa and a.kode_lokasi=c.kode_lokasi
						
			where a.no_penilaian='$row->no_penilaian'
			order by a.no_penilaian ";
			
			$rs1 = $dbLib->execute($sql);
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$nilai_p+=$row1->nilai_p;
				$nilai_t+=$row1->nilai_t;
				echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->nik</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->jabatan</td>
				<td class='isi_laporan'>$row1->angka</td>
				<td class='isi_laporan'>$row1->kode_pa</td>
				<td class='isi_laporan'>$row1->pa</td>
				
				</tr>";
				$i=$i+1;

			}
			echo "</table><br>";
			echo "<tr>
    <td align='left'><table border='0' cellspacing='2' cellpadding='1' width='800'>
      <tr>
        <td colspan='2' class='header_laporan'>Jakarta,".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
        </tr>
      <tr>
	    <td width='200' class='header_laporan'>Penilai</td>
        
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
				</tr>
				<tr>
				<td ><b>$row->app</b></td>       
				</tr>
      <tr>
	     <td class='header_laporan'>$row->jab</td>       
      </tr>
    </table></td>
  </tr>
</table><br>";
			
		}
		return "";
	}
	
}
?>
