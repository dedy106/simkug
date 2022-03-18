<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptSahamSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.kode_saham) from inv_saham a
inner join inv_saham_d b on a.kode_saham=b.kode_saham
inner join inv_kelola c on b.kode_kelola=c.kode_kelola
inner join inv_saham_d e on a.kode_saham=e.kode_saham and b.kode_kelola=e.kode_kelola
left join (select kode_saham,kode_kelola,
			      sum(case when dc='D' then jumlah else -jumlah end) as jumlah,
				  sum(case when dc='D' then h_oleh else -h_oleh end) as h_oleh,
				  sum(case when dc='D' then h_buku else -h_buku end) as h_buku,
				  sum(case when dc='D' then h_wajar else -h_wajar end) as h_wajar
		   from inv_shmspi_d
		   group by kode_saham,kode_kelola
		   )d on b.kode_saham=d.kode_saham and b.kode_kelola=d.kode_kelola $this->filter ";
		
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
		$sql="select d.kode_lokasi,sum(isnull(d.jumlah,0)*isnull(d.h_wajar,0)) as h_wajar
from inv_saham a
inner join inv_saham_d b on a.kode_saham=b.kode_saham
inner join inv_kelola c on b.kode_kelola=c.kode_kelola
left join (select kode_lokasi,kode_saham,kode_kelola,
			      sum(case when dc='D' then jumlah else -jumlah end) as jumlah,
				  sum(case when dc='D' then h_wajar else -h_wajar end) as h_wajar
		   from inv_shmspi_d
		   group by kode_lokasi,kode_saham,kode_kelola
		   )d on b.kode_saham=d.kode_saham and b.kode_kelola=d.kode_kelola $this->filter
group by d.kode_lokasi
";
		
		$rs = $dbLib->execute($sql);
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->h_wajar;
		}
		
		$sql="select a.kode_saham,a.nama as nama_saham,b.kode_kelola,c.nama as nama_kelola,
	   isnull(d.jumlah,0) as jumlah,isnull(d.h_oleh,0) as h_oleh,
	   isnull(d.h_buku,0) as h_buku,isnull(d.h_wajar,0) as h_wajar
from inv_saham a
inner join inv_saham_d b on a.kode_saham=b.kode_saham
inner join inv_kelola c on b.kode_kelola=c.kode_kelola
left join (select kode_saham,kode_kelola,
			      sum(case when dc='D' then jumlah else -jumlah end) as jumlah,
				  sum(case when dc='D' then h_oleh else -h_oleh end) as h_oleh,
				  sum(case when dc='D' then h_buku else -h_buku end) as h_buku,
				  sum(case when dc='D' then h_wajar else -h_wajar end) as h_wajar
		   from inv_shmspi_d
		   group by kode_saham,kode_kelola
		   )d on b.kode_saham=d.kode_saham and b.kode_kelola=d.kode_kelola
$this->filter order by b.kode_kelola,a.kode_saham";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi spi saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='3' align='center' class='header_laporan'>No</td>
    <td rowspan='3' align='center' class='header_laporan' width='60'>Kode Saham </td>
    <td rowspan='3' align='center' class='header_laporan' width='150'>Nama Perusahaan</td>
	 <td rowspan='3' align='center' class='header_laporan' width='60'>Kode Kelola </td>
    <td rowspan='3' align='center' class='header_laporan' width='150'>Nama Nama Kelola</td>
	<td rowspan='3' align='center' class='header_laporan' width='60'>Jumlah Saham (Lbr)</td>
    <td colspan='2' rowspan='2' align='center' class='header_laporan'>Harga Perolehan</td>
    <td colspan='2' rowspan='2' align='center' class='header_laporan'>Nilai Buku</td>
    <td colspan='3' rowspan='2' align='center' class='header_laporan'>Nilai Wajar</td>
    <td colspan='4' align='center' class='header_laporan'>Unrealised Gain (Loss)</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td colspan='2' align='center' class='header_laporan'>Harga Perolehan</td>
    <td colspan='2' align='center' class='header_laporan'>Nilai Buku </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Harga Rata-Rata Per Saham (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Harga Rata-Rata Per Saham (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Harga Rata-Rata Per Saham (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    <td width='90' align='center' class='header_laporan'>Kompo-sisi</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='90' align='center' class='header_laporan'>Jumlah (Rp)</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>1</td>
    <td align='center' class='header_laporan'>2</td>
	<td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
	<td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>3</td>
    <td align='center' class='header_laporan'>4</td>
    <td align='center' class='header_laporan'>5=3x4</td>
    <td align='center' class='header_laporan'>6</td>
    <td align='center' class='header_laporan'>7=3x6</td>
    <td align='center' class='header_laporan'>8</td>
    <td align='center' class='header_laporan'>9=3x8</td>
    <td align='center' class='header_laporan'>10=9/ Total 9</td>
    <td align='center' class='header_laporan'>11=9-5</td>
    <td align='center' class='header_laporan'>12=11/5</td>
    <td align='center' class='header_laporan'>13=9-7</td>
    <td align='center' class='header_laporan'>14=13/7</td>
  </tr> ";
		$jumlah=0;$h_oleh=0;$h_buku=0;$h_wajar=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			$h_oleh=$h_oleh+$row->h_oleh*$row->jumlah;
			$h_buku=$h_buku+$row->h_buku*$row->jumlah;
			$h_wajar=$h_wajar+$row->h_wajar*$row->jumlah;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_saham</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_oleh*$row->jumlah,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_buku,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_buku*$row->jumlah,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_wajar,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_wajar*$row->jumlah,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format((($row->h_wajar*$row->jumlah)/$total)*100,2,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(($row->h_wajar*$row->jumlah)-($row->h_oleh*$row->jumlah),0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format(((($row->h_wajar*$row->jumlah)-($row->h_oleh*$row->jumlah))/($row->h_oleh*$row->jumlah))*100,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format(($row->h_wajar*$row->jumlah)-($row->h_buku*$row->jumlah),0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format(((($row->h_wajar*$row->jumlah)-($row->h_buku*$row->jumlah))/($row->h_buku*$row->jumlah))*100,2,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='5'>Total</td>
      <td class='header_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='1'>&nbsp;</td>
	  <td class='header_laporan' align='right'>".number_format($h_oleh,2,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='1'>&nbsp;</td>
	  <td class='header_laporan' align='right'>".number_format($h_buku,2,",",".")."</td>
	  <td class='header_laporan' align='center' colspan='1'>&nbsp;</td>
	  <td class='header_laporan' align='right'>".number_format($h_wajar,2,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format(($h_wajar/$total)*100,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($h_wajar-$h_oleh,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format((($h_wajar-$h_oleh)/$h_oleh)*100,2,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($h_wajar-$h_buku,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format((($h_wajar-$h_buku)/$h_buku)*100,2,",",".")."</td>
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
