<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptHutangSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
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
		$jenis=$tmp[3];
		$nama_file="saldo_hutang_".$periode.".xls";
		$sql = "select a.kode_vendor,a.nama,f.nama as klp_vendor,
       isnull(b.nilai_bp,0) as sa_bp,isnull(b.nilai_cc,0) as sa_cc,isnull(b.nilai_total,0) as sa_total,
       isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.nilai_total,0) as debet_total,
       isnull(d.nilai_bp,0) as kredit_bp,isnull(d.nilai_cc,0) as kredit_cc,isnull(d.nilai_total,0) as kredit_total,
       isnull(b.nilai_bp,0)+isnull(c.nilai_bp,0)-isnull(d.nilai_bp,0) as saldo_bp,
	   isnull(b.nilai_cc,0)+isnull(c.nilai_cc,0)-isnull(d.nilai_cc,0) as saldo_cc,
	   isnull(b.nilai_total,0)+isnull(c.nilai_total,0)-isnull(d.nilai_total,0) as saldo_total
from vendor a
inner join (select a.kode_vendor,a.kode_lokasi
            from yk_hutang_d a
	    where a.kode_lokasi='$kode_lokasi'
        group by a.kode_vendor,a.kode_lokasi
			union 
			select a.kode_vendor,a.kode_lokasi
            from yk_hutang_sawal a
	    where a.kode_lokasi='$kode_lokasi'
        group by a.kode_vendor,a.kode_lokasi
            )e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join vendor_klp f on a.kode_klpvendor=f.kode_klpvendor and a.kode_lokasi=f.kode_lokasi
left join (select x.kode_vendor,x.kode_lokasi,sum(case when x.dc='D' then x.nilai_bp else -x.nilai_bp end) as nilai_bp,
				  sum(case when x.dc='D' then x.nilai_cc else -x.nilai_cc end) as nilai_cc,
				  sum(case when x.dc='D' then x.nilai_bp+x.nilai_cc else -(x.nilai_bp+x.nilai_cc) end) as nilai_total
		   from (select kode_vendor,kode_lokasi,'D' as dc,sum(nilai_bp) as nilai_bp,sum(nilai_cc) as nilai_cc,sum(nilai_bp+nilai_cc) as nilai_total
			     from yk_hutang_sawal
			     where kode_lokasi='$kode_lokasi' and periode<'$periode' 
				 group by kode_vendor,kode_lokasi
				 union all
				 select a.kode_vendor,a.kode_lokasi,'D' as dc,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
				 from yk_hutang_d a
				 where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' 
				 group by a.kode_vendor,a.kode_lokasi
				 union all
				 select kode_vendor,kode_lokasi,'C' as dc,sum(nilai_bp) as nilai_bp,sum(nilai_cc) as nilai_cc,sum(nilai_bp+nilai_cc) as nilai_total
				 from yk_rekon_sawal
				 where kode_lokasi='$kode_lokasi' and periode<'$periode' 
				 group by kode_vendor,kode_lokasi
				 union all
				 select a.kode_vendor,a.kode_lokasi,'C' as dc,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
				 from yk_hutang_d a
				 inner join (select no_rekon,kode_lokasi,periode from yk_rekon_m union select no_kas as no_rekon,kode_lokasi,periode from kas_m where modul='KBHUTAREA') b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_Lokasi
				 where a.kode_lokasi='$kode_lokasi' and b.periode<'$periode'
				 group by a.kode_vendor,a.kode_lokasi
				)x
	    group by x.kode_vendor,x.kode_lokasi
			)b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
left join (select x.kode_vendor,x.kode_lokasi,sum(case when x.dc='D' then x.nilai_bp else -x.nilai_bp end) as nilai_bp,
				  sum(case when x.dc='D' then x.nilai_cc else -x.nilai_cc end) as nilai_cc,
				  sum(case when x.dc='D' then x.nilai_bp+x.nilai_cc else -(x.nilai_bp+x.nilai_cc) end) as nilai_total
		   from (select kode_vendor,kode_lokasi,'D' as dc,sum(nilai_bp) as nilai_bp,sum(nilai_cc) as nilai_cc,sum(nilai_bp+nilai_cc) as nilai_total
			     from yk_hutang_sawal
			     where kode_lokasi='$kode_lokasi' and periode='$periode' 
				 group by kode_vendor,kode_lokasi
				 union all
				 select a.kode_vendor,a.kode_lokasi,'D' as dc,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
				 from yk_hutang_d a
				 where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' 
				 group by a.kode_vendor,a.kode_lokasi
				)x
	    group by x.kode_vendor,x.kode_lokasi
			)c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
left join (select x.kode_vendor,x.kode_lokasi,sum(x.nilai_bp) as nilai_bp,sum(x.nilai_cc) as nilai_cc,sum(x.nilai_bp+x.nilai_cc) as nilai_total 
		   from (select kode_vendor,kode_lokasi,'C' as dc,sum(nilai_bp) as nilai_bp,sum(nilai_cc) as nilai_cc,sum(nilai_bp+nilai_cc) as nilai_total
				 from yk_rekon_sawal
				 where kode_lokasi='$kode_lokasi' and periode='$periode' 
				 group by kode_vendor,kode_lokasi
				 union all
				 select a.kode_vendor,a.kode_lokasi,'C' as dc,sum(a.nilai_bp) as nilai_bp,sum(a.nilai_cc) as nilai_cc,sum(a.nilai_bp+a.nilai_cc) as nilai_total 
				 from yk_hutang_d a
				 inner join (select no_rekon,kode_lokasi,periode from yk_rekon_m union select no_kas as no_rekon,kode_lokasi,periode from kas_m where modul='KBHUTAREA') b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_Lokasi
				 where a.kode_lokasi='$kode_lokasi' and b.periode='$periode'
				 group by a.kode_vendor,a.kode_lokasi
				)x
	    group by x.kode_vendor,x.kode_lokasi
	   )d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
order by a.kode_klpvendor,a.kode_vendor ";  
		
		$rs = $dbLib->execute($sql);
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		//error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		echo $AddOnLib->judul_laporan("REKAP SALDO HUTANG MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1830'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' rowspan='2' align='center' class='header_laporan'>Kode </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra </td>
	<td width='100' rowspan='2' align='center' class='header_laporan'>Kelompok Mitra</td>
    
    <td colspan='3' align='center' class='header_laporan'>Saldo Awal </td>
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
    <td align='center' class='header_laporan'>Pegawai</td>
    <td align='center' class='header_laporan'>Pensiun</td>
    <td align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_bp=0;$sa_cc=0;$sa_total=0;$debet_bp=0;$debet_cc=0;$debet_total=0;$kredit_bp=0;$kredit_bp=0;$kredit_total=0;$saldo_bp=0;$saldo_cc=0;$saldo_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			$sa_bp=$sa_bp+$row->sa_bp;
			$sa_cc=$sa_cc+$row->sa_cc;
			$sa_total=$sa_total+$row->sa_total;
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
    <td class='isi_laporan'>$row->klp_vendor</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_total,0,",",".")."</td>
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
    <td colspan='3' align='center' class='isi_laporan'>Total</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_bp,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_cc,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_total,0,",",".")."</td>
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
