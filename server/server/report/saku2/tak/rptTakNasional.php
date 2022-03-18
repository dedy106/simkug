<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_tak_rptTakNasional extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$sql="select a.no_kirim as no_bukti,a.modul,a.kode_lokasi,a.kode_loktuj,a.keterangan,a.nilai
from takkirim_m a
where a.progress<>'1' and a.periode<='$periode'
union
select a.no_hutang as no_bukti,b.modul,a.kode_lokkas as kode_lokasi,a.kode_lokasi as kode_loktuj,b.keterangan,a.nilai
from (select no_hutang,kode_lokasi,kode_lokkas,sum((nilai_bp+nilai_cc)) as nilai
	  from yk_hutang_d 
	  where no_kas<>'-' and kode_lokasi<>lok_bayar and no_rekon='-' and periode<='$periode'
	  group by no_hutang,kode_lokasi,kode_lokkas
      )a
inner join yk_hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi
union
select a.no_kas as no_bukti,b.modul,a.kode_lokasi,a.kode_loktuj as kode_loktuj,b.keterangan,a.nilai
from (select no_kas,kode_lokasi,kode_loktuj,sum(nilai) as nilai
	  from yk_kasdrop_d 
	  where no_kasterima='-' and periode<='$periode'
	  group by no_kas,kode_lokasi,kode_loktuj
	  )a 
inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
union
select a.no_valid as no_bukti,a.jenis as modul,a.kode_lokasi,a.kode_loktuj,a.keterangan,a.nilai
from yk_valid_tak a
inner join yk_valid_m b on a.no_valid=b.no_valid and a.kode_lokasi=b.kode_lokasi
where a.progress='0' and a.no_terima='-' and a.periode<='$periode' and b.progress='X'
order by no_bukti";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("tak outstanding","nasional","TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='50'  align='center' class='header_laporan'>Modul</td>
	 <td width='50'  align='center' class='header_laporan'>Lokasi Awal</td>
	 <td width='50'  align='center' class='header_laporan'>Lokasi Tujuan</td>
	 <td width='300'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 
     </tr>  ";
		$nilai=0;$harian=0;$transport=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$harian=$harian+$row->harian;
			$transport=$transport+$row->transport;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	 if ($row->modul!="HUTKES")
	 {
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_bukti','$row->kode_lokasi','$row->modul');\">$row->no_bukti</a>";
	 }
	 else
	 {
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_bukti','$row->kode_loktuj','$row->modul');\">$row->no_bukti</a>";
	 }
	 echo "</td>
	  <td class='isi_laporan' align='center'>$row->modul</td>
	 <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
	  <td class='isi_laporan' align='center'>$row->kode_loktuj</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
