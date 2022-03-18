<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBebanKpa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$periode=$tmp[2];
		$realisasi=$tmp[3];
		$nik_user=$tmp[4];
		$kode_lokasi=$tmp[5];
		$sql = "select 1 ";
		
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
		$nik_user=$tmp[2];
		$periode2=$tmp[3];
		$tahun=substr($periode,0,4);
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
			
		$sql="exec sp_angg_d '$kode_lokasi','$tahun','$nik_user'";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("approve anggaran",$this->lokasi,"TAHUN ".$tahun);
		$sql="select distinct a.no_app,a.catatan,a.kode_lokasi,b.no_pb,c.kode_akun,convert(varchar(20),a.tanggal,103) as tgl_app 
from gr_app_m a
inner join gr_pb_m b on a.no_app=b.no_app and a.kode_lokasi=b.kode_lokasi
inner join gr_pb_j c on b.no_pb=c.no_pb and b.kode_lokasi=c.kode_lokasi
inner join anggaran_d d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
$this->filter
";
	
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='106'>No Bukti </td>
        <td width='684'>: $row2->no_app </td>
      </tr>
	   <tr>
        <td>Tanggal</td>
        <td>: $row2->tgl_app</td>
      </tr>
      <tr>
        <td>Keterangan</td>
        <td>: $row2->catatan</td>
      </tr>
	 
    </table></td>
  </tr>
  <tr><td>&nbsp;</td>
  </tr>
  <tr>
    <td>
";
		$sql = "select a.kode_lokasi,a.kode_akun,a.nama as nama_akun
from masakun a
where a.kode_lokasi='$row2->kode_lokasi' and a.kode_akun='$row2->kode_akun' ";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='9' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>Kode Akun</td>
        <td width='360' class='header_laporan'>: $row->kode_akun</td>
       </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
    </table></td>
  </tr>

  <tr bgcolor='#CCCCCC'>
    <td width='110' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='110' height='23' class='header_laporan' align='center'>No Referensi</td>
	<td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='300' class='header_laporan' align='center'>Keterangan</td>
	<td width='60' class='header_laporan' align='center'>Modul</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo Bulanan</td>
		<td width='90' class='header_laporan' align='center'>Saldo Tahunan</td>
  </tr>
  
";
		
			$sql="select a.kode_lokasi,a.kode_akun,b.periode,isnull(c.gar,0) as gar
				from (select a.kode_lokasi,a.kode_akun
					from anggaran_d a
					where substring(a.periode,1,4)='$tahun' and a.kode_lokasi='$kode_lokasi' 
					group by a.kode_lokasi,a.kode_akun
						)a
				cross join (select a.kode_lokasi,a.periode
						from anggaran_d a
						where substring(a.periode,1,4)='$tahun' and a.kode_lokasi='$kode_lokasi' 
						group by a.kode_lokasi,a.periode
							)b
				left join (select a.kode_akun,a.kode_lokasi,a.periode,sum(case when a.dc='D' then a.nilai else -a.nilai end) as gar
						from anggaran_d a
						where substring(a.periode,1,4)='$tahun' and a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and modul='ORGI'
						group by a.kode_akun,a.kode_lokasi,a.periode
						)c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and b.periode=c.periode
				where a.kode_lokasi=b.kode_lokasi and a.kode_akun='$row->kode_akun' $periode2
				order by b.periode";
			
			$rs1 = $dbLib->execute($sql);
			$j=1;
			$sa_awal=$row->so_awal;
			$saldo_thn=$row->so_awal;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$bulan=substr($row1->periode,4,2);
				if ($bulan=="01") {$bulan="January";};
				if ($bulan=="02") {$bulan="Februari";};
				if ($bulan=="03") {$bulan="Maret";};
				if ($bulan=="04") {$bulan="April";};
				if ($bulan=="05") {$bulan="Mei";};
				if ($bulan=="06") {$bulan="Juni";};
				if ($bulan=="07") {$bulan="Juli";};
				if ($bulan=="08") {$bulan="Agustus";};
				if ($bulan=="09") {$bulan="September";};
				if ($bulan=="10") {$bulan="Oktober";};
				if ($bulan=="11") {$bulan="November";};
				if ($bulan=="12") {$bulan="Desember";};
				echo "<tr> 
    <td  class='isi_laporan' colspan='7' align='right'>Anggaran $bulan $tahun</td>
    <td  class='isi_laporan' align='right'>".number_format($row1->gar,0,',','.')."</td>
		<td  class='isi_laporan' align='right'>".number_format($saldo_thn,0,',','.')."</td>
  </tr>";

				$sql="select a.no_bukti,a.no_dokumen,a.kode_lokasi,a.periode,a.modul,a.kode_akun,a.keterangan,convert(varchar(20),a.tanggal,103) as tgl,
					case when a.dc='D' then nilai else 0 end as debet,
					case when a.dc='C' then nilai else 0 end as kredit 
				from angg_d a
				where a.kode_akun='$row->kode_akun' and a.kode_lokasi='$row->kode_lokasi' and a.nik_user='$nik_user' and a.periode='$row1->periode'
				order by a.periode,a.tanggal,a.modul
				";
				
				$rs3 = $dbLib->execute($sql);
				$saldo_bln=$row1->gar;
				
				$debet=0; $kredit=0;
				while ($row3 = $rs3->FetchNextObject($toupper=false))
				{
					$debet+=$row3->debet;
					$kredit+=$row3->kredit;
					$saldo_bln=$saldo_bln-$row3->debet+$row3->kredit;
					$saldo_thn=$saldo_thn-$row3->debet+$row3->kredit;
					echo "<tr>
							<td  class='isi_laporan'>$row3->no_bukti</td>
							<td  class='isi_laporan'>$row3->no_dokumen</td>
						<td height='23'  class='isi_laporan'>".$row3->tgl."</td>
							<td  class='isi_laporan'>".ucwords(strtolower($row3->keterangan))."</td>
							<td  class='isi_laporan'>$row3->modul</td>
							<td  class='isi_laporan' align='right'>".number_format($row3->debet,0,',','.')."</td>
							<td  class='isi_laporan' align='right'>".number_format($row3->kredit,0,',','.')."</td>
							<td  class='isi_laporan' align='right'>".number_format($saldo_bln,0,',','.')."</td>
							<td  class='isi_laporan' align='right'>".number_format($saldo_thn,0,',','.')."</td>
						</tr>";
				}
				$j=$j+1;
			}
			echo "</table><br>";
			
			$i=$i+1;
		}
		echo "</td>
  </tr>
  </table>";
		}
  		echo "</div>";
		return "";
	}
	
}
?>
