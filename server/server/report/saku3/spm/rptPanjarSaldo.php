<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPanjarSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$kode_lokasi=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.akun_panjar,b.nama,a.kode_lokasi
from panjar2_m a
inner join masakun b on a.akun_panjar=b.kode_akun and a.kode_lokasi=b.kode_lokasi
$this->filter
group by a.akun_panjar,b.nama,a.kode_lokasi
order by a.akun_panjar";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='15' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Akun Panjar</td>
        <td  class='header_laporan'>: $row->akun_panjar</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Nama Akun</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	
    </table></td>
  </tr>";
 
  echo "<tr bgcolor='#CCCCCC'>
	<td width='25' class='header_laporan' align='center'>No</td>
    <td width='80' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='40' class='header_laporan' align='center'>Kode PP</td>
	<td width='120' class='header_laporan' align='center'>Nama PP</td>
	<td width='60' class='header_laporan' align='center'>NIK</td>
	<td width='140' class='header_laporan' align='center'>Nama Pemegang </td>
	<td width='60' height='23' class='header_laporan' align='center'>Tanggal</td>
	<td width='200' height='23' class='header_laporan' align='center'>Keterangan</td>
	<td width='80' class='header_laporan' align='center'>Pencairan Panjar</td>
	<td width='80' class='header_laporan' align='center'>No Ptg Panjar</td>
	<td width='80' class='header_laporan' align='center'>No Final</td>
	<td width='90' class='header_laporan' align='center'>Nilai Panjar</td>
	<td width='90' class='header_laporan' align='center'>Nilai Final</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
	
	<td width='100' class='header_laporan' align='center'>Keterangan</td>
  </tr>
";
			
			$sql="select a.no_panjar,a.kode_lokasi,a.keterangan,a.nik_buat,c.nama,a.kode_pp,b.nama as nama_pp,
			convert(varchar,a.tanggal,103) as tgl,a.progress,a.no_kas,d.no_final,d.no_ptg,
			case when a.no_kas<>'-' then a.nilai else 0 end as nilai,
			case when d.no_final<>'-' then d.nilai+d.nilai_kas else 0 end as nilai_ptg
from panjar2_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
left join panjarptg2_m d on a.no_panjar=d.no_panjar and a.kode_lokasi=d.kode_lokasi
$this->filter and a.akun_panjar='$row->akun_panjar'
order by a.no_panjar ";
			
			$rs1 = $dbLib->execute($sql);
			$debet=0; $kredit=0; $saldo=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo+=$row1->nilai-$row1->nilai_ptg ;	
				$nilai+=$row1->nilai;
				$nilai_ptg+=$row1->nilai_ptg;
				echo "<tr>
	 <td height='23'  class='isi_laporan' align='center'>$i</td>
    <td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_panjar','$row1->kode_lokasi','$periode');\">$row1->no_panjar</a>";
				echo "</td>
	<td  class='isi_laporan'>$row1->kode_pp</td>
	<td  class='isi_laporan'>$row1->nama_pp</td>	
	<td  class='isi_laporan'>$row1->nik_buat</td>
	<td  class='isi_laporan'>$row1->nama</td>
	<td  class='isi_laporan'>$row1->tgl</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
	<td  class='isi_laporan'>$row1->no_kas</td>
	<td  class='isi_laporan'>$row1->no_ptg</td>
	<td  class='isi_laporan'>$row1->no_final</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->nilai_ptg,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->nilai-$row1->nilai_ptg,0,',','.')."</td>
	 <td  class='isi_laporan' align='center'>$row1->progress</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='11'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($nilai_ptg,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
