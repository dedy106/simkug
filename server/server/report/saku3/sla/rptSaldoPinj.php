<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptSaldoPinj extends server_report_basic
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
		$sql="select a.no_sla	,a.kode_mitra	,a.no_dok,convert(varchar,a.tanggal,103) as tgl	,a.keterangan,a.no_dok,a.nilai
		,a.biaya	,a.bunga	,b.nama as nama_mitra,h.company_name as nama_cocd
	   ,a.basis,a.kode_curr,c.nama as nama_class,d.nama as nama_subclass,e.nama as nama_detail,isnull(f.max_tahun,0) as max_tahun,
	   isnull(ci_bunga,0) as ci_bunga,isnull(ci_pokok,0) as ci_pokok,isnull(beban,0) as beban,isnull(amor,0) as amor,isnull(ci_total,0) as ci_total,
	   a.nilai-isnull(ci_total,0) as saldo
from sla_kkp_m a
inner join sla_mitra b on a.kode_mitra=b.kode_mitra 
inner join sla_class c on a.kode_class=c.kode_class 
inner join sla_detailclass d on c.kode_detail=d.kode_detail 
inner join sla_subclass e on d.kode_subclass=e.kode_subclass 
inner join mysym_company_code h on a.kode_cocd=h.cocd
left join (select no_sla,kode_lokasi,year(max(tgl_tempo)) as max_tahun 
		   from sla_kkp_d 
		   group by no_sla,kode_lokasi
		   )f on a.no_sla=f.no_sla 
left join (select no_sla,kode_lokasi,
				  sum(ci_bunga) as ci_bunga,sum(ci_pokok) as ci_pokok,sum(beban) as beban,sum(amor) as amor,sum(ci_total) as ci_total
		   from sla_kkp_d 
		   where no_bayar<>'-'
		   group by no_sla,kode_lokasi
		   )g on a.no_sla=g.no_sla 
$this->filter
order by a.no_sla";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1700'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>Sub Class</td>
	 <td width='100'  align='center' class='header_laporan'>Details</td>
	 <td width='100'  align='center' class='header_laporan'>Classification</td>
	  <td width='100'  align='center' class='header_laporan'>Company</td>
	 <td width='100'  align='center' class='header_laporan'>Bank (Institution)</td>
     <td width='100'  align='center' class='header_laporan'>No dokumen</td>
     <td width='100'  align='center' class='header_laporan'>Nilai Nominal</td>
	 <td width='100'  align='center' class='header_laporan'>Biaya transaksi</td>
	 <td width='60'  align='center' class='header_laporan'>Suku Bunga Stated</td>
	 <td width='60'  align='center' class='header_laporan'>Suku Bunga pasar</td>
	 <td width='60'  align='center' class='header_laporan'>Pembayaran bunga</td>
	 <td width='60'  align='center' class='header_laporan'>Jatuh Tempo</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah hari</td>
	 <td width='60'  align='center' class='header_laporan'>Suku Bunga Efektif</td>
	 <td width='100'  align='center' class='header_laporan'>Bayar Pokok</td>
	 <td width='100'  align='center' class='header_laporan'>Bayar Bunga</td>
	 <td width='100'  align='center' class='header_laporan'>Total Bayar</td>
	 <td width='100'  align='center' class='header_laporan'>Saldo</td>
	  </tr>  ";
		$nilai=0;$biaya=0;$bunga=0;$ci_pokok=0;$ci_bunga=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$biaya+=$row->biaya;
			$ci_pokok+=$row->ci_pokok;
			$ci_bunga+=$row->ci_bunga;
			$saldo+=$row->saldo;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td  class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_sla');\">$row->no_sla</a></td>
	 <td class='isi_laporan'>$row->nama_subclass</td>
	 <td class='isi_laporan'>$row->nama_detail</td>
	 <td class='isi_laporan'>$row->nama_class</td>
	 <td class='isi_laporan'>$row->nama_cocd</td>
	 <td class='isi_laporan'>$row->nama_mitra</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->biaya,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bunga,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pasar,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jmlbunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>$row->max_tahun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->basis,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->efektif,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_pokok,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_bunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ci_total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='8'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($biaya,0,",",".")."</td>
	 <td class='header_laporan' align='center' colspan='6'>&nbsp;</td>
	 <td class='header_laporan' align='right'>".number_format($ci_pokok,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ci_bunga,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ci_total,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
