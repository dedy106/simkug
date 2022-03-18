<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptSaldo extends server_report_basic
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
		$sql="select a.no_ttb,a.kode_lokasi,a.tanggal,b.nama,a.lama_bayar,a.nilai*a.lama_bayar as total,
	   ISNULL(d.tagihan,0) as tagihan,ISNULL(f.nilai,0) as bayar,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
	   ISNULL(d.tagihan,0)-ISNULL(f.nilai,0) as saldo,a.kode_pp,c.nama as nama_pp,
	   isnull(d.jml,0) as jml,isnull(f.nilai_bayar,0) as nilai_bayar,isnull(f.nilai_diskon,0) as nilai_diskon
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as tagihan,count(no_ttb) as jml
		   from kre_ttb2_sch
		   where no_bill<>'-'
		   group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi	
left join (select no_ttb,kode_lokasi,SUM(nilai_bayar) as nilai_bayar,sum(nilai_diskon) as nilai_diskon,sum(nilai) as nilai
		   from kre_angsur_d
		   group by no_ttb,kode_lokasi
		  )f on a.no_ttb=f.no_ttb and a.kode_lokasi=f.kode_lokasi
$this->filter order by a.no_ttb";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No TTB</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='100'  align='center' class='header_laporan'>Area Bisnis</td>
     <td width='150'  align='center' class='header_laporan'>Kordinator</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='90' align='center' class='header_laporan'>Total Pinjaman</td>
	 <td width='60' align='center' class='header_laporan'>Cicilan Ke</td>
	  <td width='90'  align='center' class='header_laporan'>Angsuran</td>
     <td width='90'  align='center' class='header_laporan'>Bayar</td>
	<td width='90'  align='center' class='header_laporan'>Diskon</td>
	 <td width='90'  align='center' class='header_laporan'>Total Bayar</td>
	  <td width='90'  align='center' class='header_laporan'>Saldo</td>
   </tr>
     ";
		$total=0;$tagihan=0;$bayar=0;$saldo=0;$nilai_bayar=0;$nilai_diskon=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$tagihan+=$row->tagihan;
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
			$nilai_bayar+=$row->nilai_bayar;
			$nilai_diskon+=$row->nilai_diskon;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_ttb','$row->kode_lokasi');\">$row->no_ttb</a>";
		echo "</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_pp - $row->nama_pp</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='center'>".number_format($row->jml,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='isi_laporan' align='center' >&nbsp;</td>
     <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
