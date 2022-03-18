<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptHutangAkruSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$sql = "select a.kode_vendor,a.nama,e.no_hutang,date_format(f.tanggal,'%d/%m/%Y') as tanggal,f.keterangan,
       isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.nilai_total,0) as debet_total,
       isnull(d.nilai_bp,0) as kredit_bp,isnull(d.nilai_cc,0) as kredit_cc,isnull(d.nilai_total,0) as kredit_total,
       isnull(c.nilai_bp,0)-isnull(d.nilai_bp,0) as saldo_bp,
       isnull(c.nilai_cc,0)-isnull(d.nilai_cc,0) as saldo_cc,
       isnull(c.nilai_bp,0)-isnull(d.nilai_bp,0)-isnull(c.nilai_cc,0)-isnull(d.nilai_cc,0) as saldo_total
from vendor a
inner join (select distinct a.kode_vendor,a.no_hutang
            from yk_hutang_d a
	    where a.kode_lokasi='$kode_lokasi' 
            )e on a.kode_vendor=e.kode_vendor
inner join yk_hutang_m f on e.no_hutang=f.no_hutang
left join (select a.kode_vendor,a.no_hutang,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
	   from yk_hutang_d a
	   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
	   group by a.kode_vendor,a.no_hutang
           )c on a.kode_vendor=c.kode_vendor
left join (select a.kode_vendor,a.no_hutang,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
	   from yk_hutang_d a
	   inner join yk_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_Lokasi
	   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
	   group by a.kode_vendor,a.no_hutang
	   )d on a.kode_vendor=d.kode_vendor
order by a.kode_vendor ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("RINCIAN SALDO HUTANG MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
  <tr bgcolor='#CCCCCC'>
    <td width='70' rowspan='2' align='center' class='header_laporan'>Kode Mitra </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra </td>
	<td width='100' rowspan='2' align='center' class='header_laporan'>No Akru</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='3' align='center' class='header_laporan'>Tagihan</td>
    <td colspan='3' align='center' class='header_laporan'>Pembayaran</td>
    <td colspan='3' align='center' class='header_laporan'>Saldo Akhir</td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='80' align='center' class='header_laporan'>Pegawai</td>
    <td align='center' class='header_laporan'>Pensiun</td>
    <td align='center' class='header_laporan'>Total</td>
    <td align='center' class='header_laporan'>Pegawai</td>
    <td align='center' class='header_laporan'>Pensiun</td>
    <td align='center' class='header_laporan'>Total</td>
    <td align='center' class='header_laporan'>Pegawai</td>
    <td align='center' class='header_laporan'>Pensiun</td>
    <td align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_bp=0;$sa_cc=0;$sa_total=0;$debet_bp=0;$debet_cc=0;$debet_total=0;$kredit_bp=0;$kredit_bp=0;$kredit_total=0;$saldo_bp=0;$saldo_cc=0;$saldo_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			
			$debet_bp=$debet_bp+$row->debet_bp;
			$debet_cc=$debet_cc+$row->debet_cc;
			$debet_total=$debet_total+$row->debet_total;
			$kredit_bp=$kredit_bp+$row->kredit_bp;
			$kredit_cc=$kredit_cc+$row->kredit_cc;
			$kredit_total=$kredit_total+$row->kredit_total;
			$saldo_bp=$saldo_bp+$row->saldo_bp;
			$saldo_cc=$saldo_cc+$row->saldo_cc;
			$saldo_total=$saldo_total+$row->saldo_total;
			echo "<tr>
    <td class='isi_laporan' align='center'>$row->kode_vendor</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->no_hutang</td>
    <td class='isi_laporan'>$row->tanggal</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->saldo_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->saldo_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->saldo_total,0,",",".")."</td>
  </tr>";
		
		}
		echo "<tr>
    <td colspan='5' align='center' class='isi_laporan'>Total</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($saldo_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($saldo_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($saldo_total,0,",",".")."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
	
}
?>
