<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptIfPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_ifptg)
from yk_ifptg_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
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
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		
		$sql="select a.no_ifptg,a.kode_lokasi,a.no_dokumen,a.nik_buat,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,c.nama as nama_if,b.kode_pp,b.nama as nama_pp,a.nilai,
		a.no_app,date_format(d.tanggal,'%d/%m/%Y') as tgl_app,a.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas
from yk_ifptg_m a
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join pp b on b.kode_pp=c.kode_pp and c.kode_lokasi=b.kode_lokasi
left join yk_ifapp_m d on a.no_app=d.no_app and a.kode_lokasi=d.kode_lokasi
left join kas_m e on a.no_kas=e.no_kas and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_ifptg";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pengajuan imprest fund",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No IF</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='100'  align='center' class='header_laporan'>No Approval</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Approval</td>
	 <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
     </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_ifptg','$row->kode_lokasi');\">$row->no_ifptg</a>";
	 echo "</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->nama_if</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
