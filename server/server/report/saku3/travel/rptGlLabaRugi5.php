<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_travel_rptGlLabaRugi5 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$periode2=$tmp[3];
		$kode_fs=$tmp[4];
		
		
		$sql="select a.kode_neraca,a.nama,a.kode_fs,a.kode_lokasi,a.tipe,a.level_spasi,
				   isnull(case a.jenis_akun when  'Pendapatan' then -b.n4 else b.n4 end,0) as n1,
					isnull(case a.jenis_akun when  'Pendapatan' then -c.n4 else c.n4 end,0) as n2,
					isnull(case a.jenis_akun when  'Pendapatan' then -d.n4 else d.n4 end,0) as n3,
					isnull(case a.jenis_akun when  'Pendapatan' then -e.n4 else e.n4 end,0) as n4,
					isnull(case a.jenis_akun when  'Pendapatan' then -f.n4 else f.n4 end,0) as n5
			from neraca a
			left join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs and b.periode='$periode'
			left join exs_neraca c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi and a.kode_fs=c.kode_fs and c.periode='$periode2'
			left join exs_neraca d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs and d.periode='201915'
			left join exs_neraca e on a.kode_neraca=e.kode_neraca and a.kode_lokasi=e.kode_lokasi and a.kode_fs=e.kode_fs and e.periode='201815'
			left join exs_neraca f on a.kode_neraca=f.kode_neraca and a.kode_lokasi=f.kode_lokasi and a.kode_fs=f.kode_fs and f.periode='201715'
			where a.kode_lokasi='04' and a.kode_fs='FS1' and a.modul='L'
			order by a.rowindex";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABA RUGI</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='100' class='header_laporan' align='center'>$periode</td>
			<td width='100' class='header_laporan' align='center'>$periode2</td>
			<td width='100' class='header_laporan' align='center'>201915</td>
			<td width='100' class='header_laporan' align='center'>201815</td>
			<td width='100' class='header_laporan' align='center'>201715</td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
					<td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi+1)."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
				  </tr>";
			
			$i=$i+1;
		}
		echo "</table></td>
  </tr>";
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
