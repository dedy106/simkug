<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPdptDetail extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);

		$sql="select a.kode_akun,a.kode_lokasi,b.kode_pp,b.kode_cust,c.nama as nama_cust,a.no_piutang,convert(varchar(20),a.tanggal,103) as tgl,b.no_dokumen,b.keterangan,
	   b.kode_proyek,d.nama as nama_proyek,e.nama as nama_akun,a.nilai,a.no_piutang
from spm_piutang_j a
inner join spm_piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
inner join cust c on b.kode_cust=c.kode_cust and b.kode_lokasi=c.kode_lokasi 
inner join spm_proyek d on b.kode_proyek=d.kode_proyek and b.kode_lokasi=d.kode_lokasi
inner join masakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
$this->filter and a.dc='C' and a.jenis='PDPT' and substring(a.periode,1,4)='$tahun'
order by a.kode_akun ";

// echo $sql;
		
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Detail pendapatan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
	 <td width='30' align='center' class='header_laporan'>No</td>
	 <td width='60' align='center' class='header_laporan'>Kode</td>
	 <td width='150' align='center' class='header_laporan'>Nama Customer</td>
	 <td width='80' align='center' class='header_laporan'>Akun</td>
	 <td width='200' align='center' class='header_laporan'>Nama Akun</td>
	 <td width='100' align='center' class='header_laporan'>No Bukti</td>
	 <td width='100' align='center' class='header_laporan'>Kode PP</td>
	 <td width='60' align='center' class='header_laporan'>Tanggal</td>
	 <td width='100' align='center' class='header_laporan'>No Dokumen</td>
	 <td width='80' align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='150' align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200' align='center' class='header_laporan'>Keterangan</td>
	 <td width='100' align='center' class='header_laporan'>Nilai</td>
   </tr>
  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;


		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan'>$row->no_piutang</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->nama_proyek</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
		     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='12'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
