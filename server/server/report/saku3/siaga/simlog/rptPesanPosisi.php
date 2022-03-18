<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_simlog_rptPesanPosisi extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_pesan,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.kode_akun,c.nama as nama_akun,
	   case 
		 when progress='1' then 'Approval Request'
		 when progress='2' then 'Approve Logistik'
		 when progress='3' then 'Proses Logistik'
	   end as prog
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
$this->filter  order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi justifikasi pengadaan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='40'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  <td width='100'  align='center' class='header_laporan'>Progress</td>
	  <td width='60'  align='center' class='header_laporan'>#</td>
	  </tr>  ";
		$nilai=0;
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPesan('$row->no_pesan','$row->kode_lokasi');\">$row->no_pesan</a></td>
			<td class='isi_laporan' >$row->tgl</td>
			<td class='isi_laporan' >$row->kode_pp</td>
			<td class='isi_laporan' >$row->nama_pp</td>
			<td class='isi_laporan' >$row->kode_akun</td>
			<td class='isi_laporan' >$row->nama_akun</td>
			<td class='isi_laporan' >$row->keterangan</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
			<td class='isi_laporan' align='center'>$row->prog</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->no_pesan','$row->kode_lokasi');\">Detail</a></td>

	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='8'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='center' >&nbsp;</td>
	  <td class='header_laporan' align='center' >&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
