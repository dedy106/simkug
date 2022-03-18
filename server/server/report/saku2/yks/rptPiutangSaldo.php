<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangSaldo extends server_report_basic
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
		$sql = "select a.kode_cust,a.nama, 
        sum(isnull(c.bp,0))-sum(isnull(f.bp,0)) as sa_nilai,sum(isnull(c.kunj,0))-sum(isnull(f.kunj,0)) as sa_nilai_kunj,sum(isnull(c.cs,0))-sum(isnull(f.cs,0)) as sa_nilai_cs,sum(isnull(c.bp+c.kunj-c.cs,0))-sum(isnull(f.bp+f.kunj-f.cs,0)) as sa_total,
        sum(isnull(d.bp,0)) as debet_nilai,sum(isnull(d.kunj,0)) as debet_nilai_kunj,sum(isnull(d.cs,0)) as debet_nilai_cs,sum(isnull(d.bp+d.kunj-d.cs,0)) as debet_total,
	sum(isnull(e.bp,0)) as kredit_nilai,sum(isnull(e.kunj,0)) as kredit_nilai_kunj,sum(isnull(e.cs,0)) as kredit_nilai_cs,sum(isnull(e.bp+e.kunj-e.cs,0)) as kredit_total,
	sum(isnull(c.bp,0))-sum(isnull(f.bp,0))+sum(isnull(d.bp,0))-sum(isnull(e.bp,0)) as sk_nilai,
        sum(isnull(c.kunj,0))-sum(isnull(f.kunj,0))+sum(isnull(d.kunj,0))- sum(isnull(e.kunj,0)) as sk_nilai_kunj,
        sum(isnull(c.cs,0))-sum(isnull(f.cs,0))+sum(isnull(d.cs,0))-sum(isnull(e.cs,0)) as sk_nilai_cs,0 as sk_total
from cust a 
inner join (select distinct a.loker_bast as kode_cust
	    from yk_bill_d a 
		inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
		inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
	    where a.kode_lokasi='$kode_lokasi' and c.modul in ('BAST','BAREV') and b.jenis<>'PENSIUN' 
	    )b on a.kode_cust=b.kode_cust 
left join (select a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
	   from (select a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
 	   from yk_bill_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
	   where a.kode_lokasi='$kode_lokasi' and c.modul in ('BAST','BAREV') and c.periode<'$periode' and b.jenis<>'PENSIUN'
	   group by a.loker_bast
	   union all
       select a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 	   from yk_billkunj_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
	   where a.kode_lokasi='$kode_lokasi' and c.modul in ('BAST','BAREV') and c.periode<'$periode' and b.jenis<>'PENSIUN'
	   group by a.loker_bast 
			)a
	   group by a.kode_cust	
	   )c on b.kode_cust=c.kode_cust 
left join (select a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
	   from (select a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
	   from yk_bill_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
	   where a.kode_lokasi='$kode_lokasi' and c.modul in ('BAST','BAREV') and c.periode='$periode' and b.jenis<>'PENSIUN' 
	   group by a.loker_bast 
	   union all
       select a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 	   from yk_billkunj_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
	   where a.kode_lokasi='$kode_lokasi' and c.modul in ('BAST','BAREV') and c.periode='$periode' and b.jenis<>'PENSIUN' 
	   group by a.loker_bast 
			)a
	   group by a.kode_cust	
	   )d on b.kode_cust=d.kode_cust 
left join (select a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
	   from (select a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
	   from yk_bill_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join ( select no_kas as no_bukti,periode
					from kas_m
					where modul='KBSPIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_kirim as no_bukti,periode
					from takkirim_m
					where jenis='PIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_valid as no_bukti,periode
					from yk_valid_m
					where modul='TTPAR' and kode_lokasi='$kode_lokasi'
				  ) c on c.no_bukti=a.no_selesai 
	   where a.kode_lokasi='$kode_lokasi' and c.periode='$periode' and b.jenis<>'PENSIUN' and a.no_selesai<>'-'
	   group by a.loker_bast 
	   union all
       select a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 	   from yk_billkunj_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join ( select no_kas as no_bukti,periode
					from kas_m
					where modul='KBSPIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_kirim as no_bukti,periode
					from takkirim_m
					where jenis='PIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_valid as no_bukti,periode
					from yk_valid_m
					where modul='TTPAR' and kode_lokasi='$kode_lokasi'
				  ) c on c.no_bukti=a.no_selesai 
	   where a.kode_lokasi='$kode_lokasi' and c.periode='$periode' and b.jenis<>'PENSIUN' and a.no_selesai<>'-'
	   group by a.loker_bast 
			)a
	   group by a.kode_cust	
	   )e on b.kode_cust=e.kode_cust 
left join (select a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
	   from (select a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
	   from yk_bill_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join ( select no_kas as no_bukti,periode
					from kas_m
					where modul='KBSPIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_kirim as no_bukti,periode
					from takkirim_m
					where jenis='PIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_valid as no_bukti,periode
					from yk_valid_m
					where modul='TTPAR' and kode_lokasi='$kode_lokasi'
				  ) c on c.no_bukti=a.no_selesai 
	   where a.kode_lokasi='$kode_lokasi' and c.periode<'$periode' and b.jenis<>'PENSIUN' and a.no_selesai<>'-'
	   group by a.loker_bast 
	   union all
       select a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 	   from yk_billkunj_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	   inner join ( select no_kas as no_bukti,periode
					from kas_m
					where modul='KBSPIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_kirim as no_bukti,periode
					from takkirim_m
					where jenis='PIU' and kode_lokasi='$kode_lokasi'
					union all
					select no_valid as no_bukti,periode
					from yk_valid_m
					where modul='TTPAR' and kode_lokasi='$kode_lokasi'
				  ) c on c.no_bukti=a.no_selesai 
	   where a.kode_lokasi='$kode_lokasi' and  c.periode<'$periode' and b.jenis<>'PENSIUN' and a.no_selesai<>'-'
	   group by a.loker_bast 
			)a
	   group by a.kode_cust	
	   )f on b.kode_cust=f.kode_cust
where a.kode_lokasi='$kode_lokasi'	and a.jenis<>'PENSIUN'
group by a.kode_cust,a.nama   ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI SALDO PIUTANG MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1550'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='70' rowspan='2' align='center' class='header_laporan'>Kode Mitra </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra </td>
	<td colspan='4' align='center' class='header_laporan'>Saldo Awal </td>
    <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
    <td colspan='4' align='center' class='header_laporan'>Pembayaran</td>
    <td colspan='4' align='center' class='header_laporan'>Saldo Akhir</td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Biaya Pengobatan</td>
    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
    <td width='80' align='center' class='header_laporan'>Cost Sharing </td>
    <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>";
		$sa_nilai=0;$sa_nilai_kunj=0;$sa_nilai_cs=0;$sa_total=0;$debet_nilai=0;$debet_nilai_kunj=0;$debet_nilai_cs=0;$debet_total=0;
		$kredit_nilai=0;$kredit_nilai_kunj=0;$kredit_nilai_cs=0;$kredit_total=0;$sk_nilai=0;$sk_nilai_kunj=0;$sk_nilai_cs=0;$sk_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			$sk_mut=0;
			$sa_nilai=$sa_nilai+$row->sa_nilai;
			$sa_nilai_kunj=$sa_nilai_kunj+$row->sa_nilai_kunj;
			$sa_nilai_cs=$sa_nilai_cs+$row->sa_nilai_cs;
			$sa_total=$sa_total+$row->sa_total;
			$debet_nilai=$debet_nilai+$row->debet_nilai;
			$debet_nilai_kunj=$debet_nilai_kunj+$row->debet_nilai_kunj;
			$debet_nilai_cs=$debet_nilai_cs+$row->debet_nilai_cs;
			$debet_total=$debet_total+$row->debet_total;
			$kredit_nilai=$kredit_nilai+$row->kredit_nilai;
			$kredit_nilai_kunj=$kredit_nilai_kunj+$row->kredit_nilai_kunj;
			$kredit_nilai_cs=$kredit_nilai_cs+$row->kredit_nilai_cs;
			$kredit_total=$kredit_total+$row->kredit_total;
			$sk_nilai=$sk_nilai+$row->sk_nilai;
			$sk_nilai_kunj=$sk_nilai_kunj+$row->sk_nilai_kunj;
			$sk_nilai_cs=$sk_nilai_cs+$row->sk_nilai_cs;
			$sk_total=$sk_total+$row->sk_nilai+$row->sk_nilai_kunj-$row->sk_nilai_cs;
			$sk_mut=$row->sk_nilai+$row->sk_nilai_kunj-$row->sk_nilai_cs;
			echo "<tr>
    <td class='isi_laporan' align='center'>$row->kode_cust</td>
    <td class='isi_laporan'>$row->nama</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->sa_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sa_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->debet_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->debet_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->kredit_total,0,",",".")."</td>
     <td width='80' align='right' class='isi_laporan'>".number_format($row->sk_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row->sk_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($row->sk_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_mut,0,",",".")."</td>
  </tr>";
		
		}
		echo "<tr>
    <td colspan='2' align='center' class='isi_laporan'>Total</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($sa_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sa_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($debet_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai_kunj,0,",",".")."</td>
	<td width='80' align='right' class='isi_laporan'>".number_format($kredit_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($kredit_total,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai_kunj,0,",",".")."</td>
	 <td width='80' align='right' class='isi_laporan'>".number_format($sk_nilai_cs,0,",",".")."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($sk_total,0,",",".")."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
	
}
?>
