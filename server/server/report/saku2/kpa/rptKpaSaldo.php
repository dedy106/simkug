<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kpa_rptKpaSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kpa)
from itt_kpa_m a
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
		$nama_cab=$tmp[1];
		
		$sql="select a.no_kpa,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.due_date,a.keterangan,a.vendor,a.kode_pp,b.nama as nama_pp,a.nilai,
	   a.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas,c.nilai as nilai_kas,a.nilai-isnull(c.nilai,0) as saldo,
	   a.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver
from itt_kpa_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
left join itt_ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_kpa";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No KPA</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='200'  align='center' class='header_laporan'>Pihak Ketiga</td>
     <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td width='90'  align='center' class='header_laporan'>No Ver</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl Ver</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Tgl KasBank</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Bayar</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
     </tr>  ";
		$nilai=0;$nilai_kas=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_kpa</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->vendor</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl_kas</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='4'>&nbsp;</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
