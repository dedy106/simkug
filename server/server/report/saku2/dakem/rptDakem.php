<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_dakem_rptDakem extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_dakem) from yk_dakem_m a
inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi=b.kode_lokasi
left join kas_m c on b.no_kas=c.no_kas
$this->filter";
		
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
		$tmp=explode(";",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$tgl_awal=$tmp[2];
		$tgl_akhir=$tmp[3];
		
		if ($jenis=="Range")
		{
			$tgl=" and a.tanggal between '$tgl_awal' and '$tgl_akhir' ";
		}
		if ($jenis=="=")
		{
			$tgl=" and a.tanggal = '$tgl_awal' ";
		}
		$sql="select a.kode_lokasi,a.no_dakem,a.jenis_bayar,a.tgl_transfer,b.tgl_lahir,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_lokasi,
	   b.nik,b.nikkes,b.nama_nikes,b.namaaw,b.statusaw,b.nominal,date_format(b.tglmeninggal,'%d/%m/%Y') as tglmeninggal,b.namabank,b.norek,b.cabang,b.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas
from yk_dakem_m a
inner join yk_dakem_d b on a.no_dakem=b.kdtrans and a.kode_lokasi=b.kode_lokasi
left join kas_m c on b.no_kas=c.no_kas
$this->filter $tgl order by a.no_dakem";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi dakem",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Dakem</td>
	 <td width='40'  align='center' class='header_laporan'>Area</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='60'  align='center' class='header_laporan'>NIKES</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Ahli Waris</td>
	 <td width='150'  align='center' class='header_laporan'>Nama NIKES</td>
	 <td width='60'  align='center' class='header_laporan'>Status AW</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Meninnggal</td>
	 <td width='100'  align='center' class='header_laporan'>Nama Bank</td>
	 <td width='150'  align='center' class='header_laporan'>No Rekening</td>
	 <td width='150'  align='center' class='header_laporan'>Cabang</td>
	 <td width='80'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='90'  align='center' class='header_laporan'>Nominal</td>
     </tr>  ";
		$nominal=0;$harian=0;$transport=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nominal=$nominal+$row->nominal;
		
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_dakem','$row->kode_lokasi');\">$row->no_dakem</a>";
	 echo "</td>
	  <td class='isi_laporan'>$row->kode_lokasi</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	  <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nikkes</td>
	 <td class='isi_laporan'>$row->namaaw</td>
	 <td class='isi_laporan'>$row->nama_nikes</td>
	<td class='isi_laporan'>$row->statusaw</td>
	<td class='isi_laporan'>$row->tglmeninggal</td>
	 <td class='isi_laporan'>$row->namabank</td>
	 <td class='isi_laporan'>$row->norekss</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nominal,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='15'>Total</td>
	  
	  <td class='isi_laporan' align='right'>".number_format($nominal,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
