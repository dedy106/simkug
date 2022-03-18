<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$sql="select a.no_ttb,a.kode_lokasi,a.tanggal,b.nama,a.lama_bayar,a.nilai*a.lama_bayar as total,a.nilai,
	    date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,c.nama as nama_pp,
		isnull(d.npokok,0) as npokok,isnull(d.jml,0) as jml
from kre_ttb2_m a
inner join kre_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select no_ttb,kode_lokasi,SUM(npokok) as npokok,COUNT(no_ttb) as jml
from kre_ttb2_sch 
where no_bill<>'-'
group by no_ttb,kode_lokasi
		  )d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi
$this->filter 
order by a.no_ttb";
	
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pinjaman",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='13' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>No TTB</td>
        <td width='300' class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_ttb','$row->kode_lokasi');\">$row->no_ttb</a></td>
      </tr>
	  
	  <tr>
        <td  class='header_laporan'>Tanggal</td>
        <td  class='header_laporan'>: $row->tgl</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Area Bisnis</td>
        <td  class='header_laporan'>: $row->kode_pp - $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kordinator </td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	  
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Total Pinjaman </td>
        <td class='header_laporan'>: ".number_format($row->total,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Jumlah Cicilan </td>
        <td class='header_laporan'>: ".number_format($row->lama_bayar,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Angsuran Per Bulan</td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Jumlah Cicilan Tagihan</td>
        <td class='header_laporan'>: ".number_format($row->jml,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Total Tagihan</td>
        <td class='header_laporan'>: ".number_format($row->npokok,0,',','.')."</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	 <td width='100' height='23' class='header_laporan' align='center'>No Tagihan</td>
	 <td width='80' height='23' class='header_laporan' align='center'>No Kuitansi</td>
	 <td width='100' height='23' class='header_laporan' align='center'>No LHI</td>
	<td width='100' height='23' class='header_laporan' align='center'>No Bayar</td>
	<td width='60' height='23' class='header_laporan' align='center'>Tgl Bayar</td>
   <td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='50' height='23' class='header_laporan' align='center'>Cicilan Ke</td>
	<td width='80' class='header_laporan' align='center'>Tagihan</td>
    <td width='80' class='header_laporan' align='center'>Bayar</td>
	<td width='80' class='header_laporan' align='center'>Diskon</td>
	<td width='80' class='header_laporan' align='center'>Total Bayar</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
	<td width='60' class='header_laporan' align='center'>Tgl Janji</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_bill,c.no_kas,a.npokok,date_format(c.tanggal,'%d/%m/%Y') as tanggal,c.keterangan,b.nilai,a.cicilan_ke,a.no_ttb,a.npokok,
			b.nilai_bayar,b.nilai_diskon,b.nilai_bayar+b.nilai_diskon as bayar,a.saldo,b.sisa,date_format(b.tgl_lunas,'%d/%m/%Y') as tgl_lunas,c.no_dokumen
from kre_ttb2_sch a
left join kre_angsur_d b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi and a.cicilan_ke=b.cicilan_ke
left join kas_m c on b.no_bukti=c.no_kas and b.kode_lokasi=c.kode_lokasi
where a.no_ttb='$row->no_ttb' and a.kode_lokasi='$row->kode_lokasi' and a.no_bill<>'-'";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=0;
			$nilai_bayar=0; $nilai_diskon=0; $bayar=0; $npokok=0;
			$total=0; $tmp=""; $tot=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tagihan=0;
				$nilai_bayar+=$row1->nilai_bayar;
				$nilai_diskon+=$row1->nilai_diskon;
				$bayar+=$row1->bayar;
				$tgl_lunas="";
				if ($row1->sisa > 0)
				{
					$tgl_lunas=$row1->tgl_lunas;
				}
			
				$no_kuitansi=$row1->no_ttb."/".$row1->cicilan_ke;
				//$saldo=$saldo - $row1->bayar ;
				if ($tmp!=$row1->no_bill)
				{
					$tmp=$row1->no_bill;
					$tagihan=$row1->npokok;
					$tot+=$tagihan;
					
				}
				$saldo=$tot-$bayar;
				echo "<tr>
	 
	 <td  valign='top' class='isi_laporan'>".$row1->no_bill."</td>
	 <td  valign='top' class='isi_laporan'>".$no_kuitansi."</td>
	 <td  valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_kas','$row1->kode_lokasi','$periode');\">$row1->no_kas</a>";
				echo "</td>
		
		<td  valign='top' class='isi_laporan'>".$row1->tanggal."</td>
	<td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='center'>".$row1->cicilan_ke."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($tagihan,0,',','.')."</td>
	 <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai_bayar,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai_diskon,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->bayar,0,',','.')."</td>
	   <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	   <td valign='top' class='isi_laporan' align='right'>$tgl_lunas</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='7' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($tot,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($nilai_bayar,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($nilai_diskon,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($bayar,0,',','.')."</td>
  <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
