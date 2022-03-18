<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyekSisih extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$tmp="";
		if ($jenis=='Revisi')
		{
			$tmp=" and a.progress='R' ";
		}
		if ($jenis=='Approve')
		{
			$tmp=" and a.progress<>'R' ";
		}
		$sql="select a.kode_lokasi,substring(convert(varchar,a.tgl_mulai,112),1,4) as tahun, a.kode_pp, p.nama as nama_pp,a.kode_proyek,a.no_pks,a.nama,a.kode_cust,c.nama as nama_cust, convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,convert(varchar(20),a.tgl_admin,103) as tgl_admin,'-' as tgl_perpanjangan1,'-' as tgl_perpanjangan2,a.nilai,isnull(d.pdpt,0) as pdpt,e.piuppn,0 as piu_hapus,a.nilai+e.piuppn+0 as nilai_tot,isnull(pb.pbyr,0)-isnull(pbn.ppn,0) as pbyr_real,isnull(pbn.ppn,0) as pbyr_ppn, 0 as jumpiu_hapus, isnull(pb.pbyr,0)+0 as pbyr_aud,(a.nilai+e.piuppn)-(isnull(pb.pbyr,0)) as piu_real,(a.nilai+e.piuppn+0)-(isnull(pb.pbyr,0)+0) as piu_aud,a.nilai_or, (a.nilai_or/a.nilai) as p_or, b.beban,bb.beban_real, (b.beban/d.pdpt) as real,a.nilai-b.beban as laba,a.nilai-isnull(d.pdpt,0) as piu,(b.beban/ a.nilai) as real2,0 as p_sisih, 0 as penyisihan, 0 as umur_piu, '-' as status
    from prb_proyek a 
    inner join pp p on a.kode_pp=p.kode_pp and a.kode_lokasi=p.kode_lokasi 
    left join (select a.no_dokumen,a.kode_lokasi,sum(a.nilai) as pdpt 
          from trans_j a 
          where a.kode_lokasi='$kode_lokasi' and a.jenis='PDPT' and a.modul='GENPYT' 
          group by a.no_dokumen,a.kode_lokasi) d on a.kode_proyek=d.no_dokumen and a.kode_lokasi=d.kode_lokasi 
    left join (select a.no_ref1,a.kode_lokasi,sum(a.nilai1) as piuppn 
          from trans_m a 
          where a.kode_lokasi='$kode_lokasi' and a.form='PRPPN' and a.modul='AR' 
          group by a.no_ref1,a.kode_lokasi) e on a.kode_proyek=e.no_ref1 and a.kode_lokasi=e.kode_lokasi 
    left join (select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban 
          from prb_prbeban_d a 
          left join (select a.no_aju,a.no_kas,a.kode_lokasi 
                 from it_aju_m a 
                 inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
                 where b.kode_lokasi='$kode_lokasi' ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi 
          where a.modul = 'AJUBEBAN' and a.kode_lokasi='$kode_lokasi' and ( isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-') ) 
          group by a.kode_proyek,a.kode_lokasi,a.periode_sch )b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi and dbo.fnPeriode(a.tgl_app) = b.periode_sch 
      left join (select a.kode_proyek,a.kode_lokasi,a.periode_sch,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as beban_real 
          from prb_prbeban_d a 
          left join (select a.no_aju,a.no_kas,a.kode_lokasi 
                 from it_aju_m a 
                 inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi 
                 where b.kode_lokasi='$kode_lokasi' ) b on a.no_bukti = b.no_aju and a.kode_lokasi=b.kode_lokasi 
          where a.modul = 'AJUBEBAN' and a.kode_lokasi='$kode_lokasi' and ( isnull(b.no_kas,'-') <> '-' or (a.no_ref1<>'-')  and a.jenis <> 'NONITAJU') 
          group by a.kode_proyek,a.kode_lokasi,a.periode_sch )bb on a.kode_proyek=bb.kode_proyek and a.kode_lokasi=bb.kode_lokasi and dbo.fnPeriode(a.tgl_app) = bb.periode_sch 
    left join (select substring(a.keterangan,23,14) as kode_proyek,a.kode_lokasi,sum(a.nilai) as pbyr 
          from trans_j a 
          where a.kode_lokasi='$kode_lokasi' and a.jenis='PIU' and a.modul='PIUPRO' 
          group by substring(a.keterangan,23,14),a.kode_lokasi) pb on a.kode_proyek=pb.kode_proyek and a.kode_lokasi=pb.kode_lokasi 
    left join (select c.kode_proyek,a.kode_lokasi,sum(a.nilai) as ppn 
          from trans_j a 
          inner join prb_prbill_bayar b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
          left join prb_prbill_m c on b.no_bill=c.no_bill and b.kode_lokasi=c.kode_lokasi
          where a.kode_lokasi='$kode_lokasi' and a.jenis='HUTPPN' and a.modul='PIUPRO' 
          group by c.kode_proyek,a.kode_lokasi) pbn on a.kode_proyek=pb.kode_proyek and a.kode_lokasi=pb.kode_lokasi 
    inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi 
    $this->filter
    order by a.kode_proyek 
";

// echo $sql;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
            $AddOnLib=new server_util_AddOnLib();	
            
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>No Proyek</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Kontrak</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Mitra</td>
	 <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Selesai</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Penyelesaian Adm</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Perpanjangan 1</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Perpanjangan 2</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Proyek/Nilai Pendapatan (Real diluar PPN)</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Yang Telah Diakui s.d Bulan Berjalan (Akru Pendapatan)</td>
     <td width='90'  align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'  align='center' class='header_laporan'>Piutang yang telah dihapuskan namun dibayar oleh vendor</td>
     <td width='90'  align='center' class='header_laporan'>Total Nilai Proyek</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Pembayaran Real</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Pembayaran PPN</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Penghapusan Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Pembayaran Audited</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Piutang Real</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Piutang Audited</td>
     <td width='90'  align='center' class='header_laporan'>Beban Max (OR)</td>
     <td width='60'  align='center' class='header_laporan'>% OR Max</td>
     <td width='90'  align='center' class='header_laporan'>Realisasi Real</td>
	  <td width='90'  align='center' class='header_laporan'>Realisasi Beban (Termasuk BMHD)</td>
	 <td width='90'  align='center' class='header_laporan'>% Realisai Beban Thd Realisasi Pendapatan (Bulan Berjalan)</td>
	 <td width='90'  align='center' class='header_laporan'>Laba Rugi</td>
     <td width='90'  align='center' class='header_laporan'>% Total Beban Thd Total Pendapatan </td>
     <td width='90' align='center' class='header_laporan'>Umur Piutang </td>
     <td width='90' align='center' class='header_laporan'>% Penyisihan </td>
     <td width='90' align='center' class='header_laporan'>Penyisihan Piutang s.d bulan berjalan </td>
     <td width='90' align='center' class='header_laporan'>Status</td>
    </tr> 
    <tr bgcolor='#CCCCCC'>
      <td align='center' class='header_laporan'>a</td>
      <td align='center' class='header_laporan'>b</td>
      <td align='center' class='header_laporan'>c</td>
      <td align='center' class='header_laporan'>d</td>
      <td align='center' class='header_laporan'>e = a+c+d</td>
      <td align='center' class='header_laporan'>f</td>
      <td align='center' class='header_laporan'>g</td>
      <td align='center' class='header_laporan'>h</td>
      <td align='center' class='header_laporan'>i = f+g+h</td>
      <td align='center' class='header_laporan'>j = (a+c)-(f+g)</td>
      <td align='center' class='header_laporan'>k = e-h</td>
      <td align='center' class='header_laporan'>l</td>
      <td align='center' class='header_laporan'>m = (l/a)</td>
      <td align='center' class='header_laporan'>n</td>
      <td align='center' class='header_laporan'>o</td>
      <td align='center' class='header_laporan'>p = (o/b) </td>
      <td align='center' class='header_laporan'>q = a-o </td>           
      <td align='center' class='header_laporan'>r = o/a </td>
      <td align='center' class='header_laporan'>s(dihitung dari jurnal piutang) </td>
      <td align='center' class='header_laporan'>t</td>
      <td align='center' class='header_laporan'>u=k*t</td>
      <td align='center' class='header_laporan'>v</td>

    </tr>";
      
		$nilai=0;  $nilai_or=0; $shu=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai+=$row->nilai;
            $pdpt+=$row->pdpt;
            $piuppn+=$row->piuppn;
            $piu_hapus+=$row->piu_hapus;
            $nilai_tot+=$row->nilai_tot;
            $pbyr_real+=$row->pbyr_real;
            $pbyr_ppn+=$row->pbyr_ppn;
            $jumpiu_hapus+=$row->jumpiu_hapus;
            $pbyr_aud+=$row->pbyr_aud;
            $piu_real+=$row->piu_real;
            $piu_aud+=$row->piu_aud;
            $nilai_or+=$row->nilai_or;
            $beban+=$row->beban;
            $beban_real+=$row->beban_real;
            $laba+=$row->laba;
            

echo "<tr >
      <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>$row->kode_proyek</td>
      <td class='isi_laporan'>$row->no_pks</td>
      <td class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan'>$row->nama_cust</td>
      <td class='isi_laporan'>$row->tgl_mulai</td>
      <td class='isi_laporan'>$row->tgl_selesai</td>
      <td class='isi_laporan'>$row->tgl_admin</td>
      <td class='isi_laporan'>$row->tgl_perpanjangan1</td>
      <td class='isi_laporan'>$row->tgl_perpanjangan2</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->piuppn,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->piu_hapus,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->nilai_tot,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->pbyr_real,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->pbyr_ppn,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->jumpiu_hapus,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->pbyr_aud,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->piu_real,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->piu_aud,0,",",".")."</td>      
      <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	  <td class='isi_laporan'>".number_format($row->p_or,2,",",".")." %</td>
      <td class='isi_laporan' align='right'>".number_format($row->beban_real,0,",",".")."</td>
      <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_proyek','$row->kode_lokasi');\">".number_format($row->beban,0,",",".")."</a></td>
      <td class='isi_laporan'>".number_format($row->real,2,",",".")." %</td>
	  <td class='isi_laporan' align='right'>".number_format($row->laba,0,",",".")."</td>
      <td class='isi_laporan'>".number_format($row->real2,2,",",".")." %</td>
      <td class='isi_laporan'>".number_format($row->umur_piu,0,",",".")." </td>
      <td class='isi_laporan'>".number_format($row->p_sisih,0,",",".")." %</td>
      <td class='isi_laporan'>".number_format($row->penyisihan,0,",",".")." </td>
      <td class='isi_laporan'>".number_format($row->status,0,",",".")." </td>
     </tr>";
			$i=$i+1;
		}
echo "<tr >
	   <td class='isi_laporan' align='center' colspan='10'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piuppn,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piu_hapus,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($nilai_tot,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($pbyr_real,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($pbyr_ppn,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($jumpiu_hapus,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($pbyr_aud,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piu_real,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($piu_aud,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
       <td class='isi_laporan' align='right'>&nbsp;</td>
       <td class='isi_laporan' align='right'>".number_format($beban_real,0,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($beban,0,",",".")."</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
       <td class='isi_laporan' align='right'>".number_format($laba,0,",",".")."</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
       <td class='isi_laporan' align='right'>&nbsp;</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
       <td class='isi_laporan' align='right'>&nbsp;</td>
       <td class='isi_laporan' align='center' >&nbsp;</td>
     </tr>";
echo "</table><br>";
echo "</div>";
		return "";
		
	}
	
}
?>
