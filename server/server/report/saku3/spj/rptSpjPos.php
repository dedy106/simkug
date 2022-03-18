<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptSpjPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_spj)
from yk_spj_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
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
		
		$sql="select a.no_spj,a.kode_lokasi,a.no_dokumen,a.nik_buat,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,c.nama as nama,
		b.kode_pp,b.nama as nama_pp,a.transport,a.harian,a.transport+a.harian as nilai,
		 a.no_app,a.no_spb,a.no_ver,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,date_format(g.tanggal,'%d/%m/%Y') as tgl_spb,g.no_fiat,
	   date_format(i.tanggal,'%d/%m/%Y') as tgl_fiat,g.no_kas,date_format(j.tanggal,'%d/%m/%Y') as tgl_kas
from yk_spj_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
 left join app_d e on a.no_spj=e.no_bukti and a.kode_lokasi=e.kode_lokasi and e.modul='SPPD'
left join app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
left join spb_m g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
left join app_d h on g.no_spb=h.no_bukti and g.kode_lokasi=h.kode_lokasi
left join app_m i on h.no_app=i.no_app and h.kode_lokasi=i.kode_lokasi
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi
$this->filter order by a.no_spj";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pengajuan perjalanan dinas",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No SPPD</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>NIK</td>
	 <td width='150'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Uang Transport</td>
	 <td width='90'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	   <td width='90'  align='center' class='header_laporan'>No App</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	  <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
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
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_spj','$row->kode_lokasi');\">$row->no_spj</a>";
	 echo "</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	<td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->transport,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harian,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	 <td class='isi_laporan'>$row->no_spb</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($transport,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($harian,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
