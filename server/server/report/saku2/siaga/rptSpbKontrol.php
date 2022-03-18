<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptSpbKontrol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_beban)
from gr_npp_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
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
		$sql="select a.no_npp,a.kode_lokasi,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl_npp,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.no_npko,date_format(e.tanggal,'%d/%m/%Y') as tgl_npko,a.no_spb,date_format(c.tanggal,'%d/%m/%Y') as tgl_spb,
	   c.no_kas,date_format(d.tanggal,'%d/%m/%Y') as tgl_kas
from gr_npp_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join gr_spb_m c on a.no_spb=c.no_spb and a.kode_lokasi=c.kode_lokasi
left join kas_m d on d.no_kas=c.no_kas and d.kode_lokasi=c.kode_lokasi
left join gr_npko_m e on a.no_npko=e.no_npko and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_npp";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol pengeluaran",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No NPP</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='80'  align='center' class='header_laporan'>No NPKO</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl NPKO</td>
	  <td width='80'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	  <td width='100'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenNpp('$row->no_npp','$row->kode_lokasi');\">$row->no_npp</a>";
		echo "</td>
 <td class='isi_laporan'>$row->tgl_npp</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>";
		echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenNpko('$row->no_npko','$row->kode_lokasi');\">$row->no_npko</a></td>";
		echo "<td class='isi_laporan'>$row->tgl_npko</td>";
		echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a></td>";
		echo "<td class='isi_laporan'>$row->tgl_spb</td>";
		echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>";
		echo "<td class='isi_laporan'>$row->tgl_kas</td>";
		echo "</tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='6'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
