<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_droping_rptDropingPosisi extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		
		$sql="select a.no_kasaju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_bank,b.nama as nama_bank,a.kode_pp,c.nama as nama_pp,a.keterangan,a.nilai,
	   a.no_app,date_format(d.tanggal,'%d/%m/%Y') as tgl_app,a.no_spb,date_format(e.tanggal,'%d/%m/%Y') as tgl_spb,e.no_fiat,date_format(f.tanggal,'%d/%m/%Y') as tgl_fiat,
	   e.no_kas,g.tanggal as tgl_kas,a.kode_lokbayar
from yk_kasaju_m a
inner join bank_rek b on a.kode_bank=b.kode_rek and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join app_m d on a.no_app=d.no_app and a.kode_lokasi=d.kode_lokasi
left join spb_m e on a.no_spb=e.no_spb and a.kode_lokbayar=e.kode_lokasi
left join app_m f on e.no_fiat=f.no_app and e.kode_lokasi=f.kode_lokasi
left join kas_m g on e.no_kas=g.no_kas and e.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_kasaju";
		//echo $sql;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi droping",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Droping</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='120'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Bank</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Bank</td>
     <td width='250'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  <td width='90'  align='center' class='header_laporan'>No App</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl App</td>
	  <td width='90'  align='center' class='header_laporan'>No SPB</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='90'  align='center' class='header_laporan'>No Fiat</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Fiat</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl KasBank</td>
	
     </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai=$nilai+$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_kasaju','$row->kode_lokasi');\">$row->no_kasaju</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->kode_bank</td>
	 <td class='isi_laporan'>$row->nama_bank</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_app</td>
	 <td class='isi_laporan'>$row->tgl_app</td>
	  <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokbayar');\">$row->no_spb</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_spb</td>
	  <td class='isi_laporan'>$row->no_fiat</td>
	 <td class='isi_laporan'>$row->tgl_fiat</td>
	 <td class='isi_laporan'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokbayar');\">$row->no_kas</a>";
	 echo "</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='8'>&nbsp;</td>
	
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
