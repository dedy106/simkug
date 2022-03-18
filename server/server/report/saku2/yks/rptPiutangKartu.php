<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(a.kode_vendor)
from vendor a $this->filter ";
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$tahun_rev=$tahun-1;
		
		$sql = "select a.kode_lokasi,a.kode_cust,a.nama
from cust a $this->filter and a.jenis<>'PENSIUN'
order by a.kode_cust ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU PENGAWASAN PIUTANG MITRA",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=number_format($row->so_awal,0,",",".");
		echo "<table  width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='20' class='header_laporan'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='80' class='header_laporan'>Kode Mitra</td>
            <td width='500' class='header_laporan'>: $row->kode_cust</td>
            </tr>
          <tr>
            <td class='header_laporan'>Nama Mitra </td>
            <td class='header_laporan'>: $row->nama</td>
            </tr>
        </table></td>
      </tr>
	   <tr>
        <td colspan='13' align='right' class='header_laporan'>Saldo Awal </td>
         <td width='90' class='header_laporan' align='right'>0</td>
        <td width='90' class='header_laporan' align='right'>0</td>
        <td width='90' class='header_laporan' align='right'>0</td>
        <td width='90' class='header_laporan' align='right'>0</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='20' rowspan='2' class='header_laporan'>No</td>
        <td width='80' rowspan='2' class='header_laporan'>No Bukti </td>
        <td width='80' rowspan='2' class='header_laporan'>No Dokumen </td>
        <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='200' rowspan='2' class='header_laporan'>Keterangan</td>
      
        <td colspan='4' class='header_laporan'>Tagihan</td>
        <td colspan='4' class='header_laporan'>Pembayaran</td>
         <td colspan='4' class='header_laporan'>Saldo Akhir</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='90' class='header_laporan'>Biaya Pengobatan</td>
        <td width='90' class='header_laporan'>Kunjungan</td>
        <td width='90' class='header_laporan'>Cost Sharing </td>
        <td width='90' class='header_laporan'>Total</td>
        <td width='90' class='header_laporan'>Biaya Pengobatan </td>
        <td width='90' class='header_laporan'>Kunjungan</td>
        <td width='90'class='header_laporan'>Cost Sharing </td>
        <td width='90' class='header_laporan'>Total</td>
       <td width='90' class='header_laporan'>Biaya Pengobatan </td>
        <td width='90' class='header_laporan'>Kunjungan</td>
        <td width='90' class='header_laporan'>Cost Sharing </td>
        <td width='90' class='header_laporan'>Total</td>
      </tr>";
	  $sql1="select b.no_bukti,b.no_bill,a.tanggal,date_format(a.tanggal,'%d-%m-%Y') as tgl_bukti,a.keterangan,
	   isnull(b.bp,0) as debet_bp,isnull(b.kunj,0) as debet_kunj,isnull(b.cs,0) as debet_cs,
       0 as kredit_bp,0 as kredit_kunj,0 as kredit_cs
from yk_valid_m a
left join (select a.no_bukti,a.no_bill,a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
		   from (select c.no_valid as no_bukti,a.no_bill,a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
				 from yk_bill_d a 
				 inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
			     inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
			     where a.kode_lokasi='$row->kode_lokasi' and c.modul in ('BAST','BAREV') and substring(c.periode,1,4)='$tahun' and b.jenis<>'PENSIUN' and a.loker_bast='$row->kode_cust'
			     group by c.no_valid,a.no_bill,a.loker_bast 
			     union all
			     select c.no_valid as no_bukti,a.no_bill,a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 			     from yk_billkunj_d a 
			     inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
			     inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
			     where a.kode_lokasi='$row->kode_lokasi' and c.modul in ('BAST','BAREV') and substring(c.periode,1,4)='$tahun' and b.jenis<>'PENSIUN' and a.loker_bast='$row->kode_cust'
			     group by c.no_valid,a.no_bill,a.loker_bast 
			    )a
	       group by a.no_bukti,a.no_bill,a.kode_cust 
		   )b on b.no_bukti=a.no_valid 
where (isnull(b.bp,0)<>0 or isnull(b.kunj,0)<>0 or isnull(b.cs,0)<>0)
union all
select b.no_bukti,b.no_bill,a.tanggal,date_format(a.tanggal,'%d-%m-%Y') as tgl_bukti,a.keterangan,
	   0 as debet_bp,0 as debet_kunj,0 as debet_cs,
	   isnull(b.bp,0) as kredit_bp,isnull(b.kunj,0) as kredit_kunj,isnull(b.cs,0) as kredit_cs
from (select no_kas as no_bukti,tanggal,keterangan
	  from kas_m
	  where modul='KBSPIU' and kode_lokasi='$row->kode_lokasi'
	  union all
	  select no_kirim as no_bukti,tanggal,keterangan
	  from takkirim_m
	  where jenis='PIU' and kode_lokasi='$row->kode_lokasi'
	  union all
	  select no_valid as no_bukti,tanggal,keterangan
	  from yk_valid_m
	  where modul='TTPAR' and kode_lokasi='$kode_lokasi'
     ) a
left join (select a.no_bukti,a.no_bill,a.kode_cust,sum(a.bp) as bp,sum(a.kunj) as kunj,sum(a.cs) as cs
		   from (select a.no_selesai as no_bukti,a.no_bill,a.loker_bast as kode_cust,sum(a.nilai) as bp,0 as kunj,0 as cs
				 from yk_bill_d a 
				 inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
			     inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
			     where a.kode_lokasi='$row->kode_lokasi' and c.modul in ('BAST','BAREV') and substring(c.periode,1,4)='$tahun' and b.jenis<>'PENSIUN' and a.loker_bast='$row->kode_cust' and a.no_selesai<>'-'
			     group by a.no_selesai,a.no_bill,a.loker_bast 
			     union all
			     select a.no_selesai as no_bukti,a.no_bill,a.loker_bast as kode_cust,0 as bp,sum(a.umum+a.gigi+a.kbia+a.matkes) as kunj,sum(a.cs) as cs
 			     from yk_billkunj_d a 
			     inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
			     inner join yk_valid_m c on c.no_valid=a.no_piutang and c.kode_lokasi=a.kode_lokasi
			     where a.kode_lokasi='$row->kode_lokasi' and c.modul in ('BAST','BAREV') and substring(c.periode,1,4)='$tahun' and b.jenis<>'PENSIUN'  and a.loker_bast='$row->kode_cust' and a.no_selesai<>'-'
			     group by a.no_selesai,a.no_bill,a.loker_bast 
			    )a
	       group by a.no_bukti,a.no_bill,a.kode_cust 
		   )b on b.no_bukti=a.no_bukti
where (isnull(b.bp,0)<>0 or isnull(b.kunj,0)<>0 or isnull(b.cs,0)<>0)
order by tanggal ";
		
		$rs1 = $dbLib->execute($sql1);
		$saldo=0; $j=0;
		$debet_bp=0;$debet_kunj=0;$debet_cs=0;$debet_tot=0;
		$kredit_bp=0;$kredit_kunj=0;$kredit_cs=0;$kredit=0;
		$saldo_bp=0;$saldo_kunj=0;$saldo_cs=0;$saldo_tot=0;
		$sa_bp=0;$sa_kunj=0;$sa_cs=0;$sa_tot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$debet_bp=$debet_bp+$row1->debet_bp;
			$debet_kunj=$debet_kunj+$row1->debet_kunj;
			$debet_cs=$debet_cs+$row1->debet_cs;
			$debet_tot=$debet_bp+$row1->debet_bp+$row1->debet_kunj-+$row1->debet_cs;
			$kredit_bp=$kredit_bp+$row1->kredit_bp;
			$kredit_kunj=$kredit_kunj+$row1->kredit_kunj;
			$kredit_cs=$kredit_cs+$row1->kredit_cs;
			$kredit_tot=$kredit_bp+$row1->kredit_bp+$row1->kredit_kunj-+$row1->kredit_cs;
			$tot_debet=$row1->debet_bp+$row1->debet_kunj-$row1->debet_cs;
			$tot_kredit=$row1->kredit_bp+$row1->kredit_kunj-$row1->kredit_cs;
			$tot=$tot_debet-$tot_kredit;
		echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->no_bukti</td>
		<td class='isi_laporan'>$row1->no_bill</td>
		<td class='isi_laporan'>$row1->tgl_bukti</td>
        <td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan' align='right'>".number_format($row1->debet_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->debet_kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->debet_cs,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($tot_debet,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->kredit_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->kredit_kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit_cs,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($tot_kredit,0,",",".")."</td>
      	<td class='isi_laporan' align='right'>".number_format($sa_bp+$row1->debet_bp-$row1->kredit_bp,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_kunj+$row1->debet_kunj-$row1->kredit_kunj,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($sa_cs+$row1->debet_cs-$row1->kredit_cs,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_tot+$tot,0,",",".")."</td>
      </tr>";
			$sa_bp=$sa_bp+$row1->debet_bp-$row1->kredit_bp;
			$sa_kunj=$sa_kunj+$row1->debet_kunj-$row1->kredit_kunj;
			$sa_cs=$sa_cs+$row1->debet_cs-$row1->kredit_cs;
			$sa_tot=$sa_tot+$tot;
	  }
      echo " <tr align='center'>
		<td colspan='5' align='right' class='header_laporan'>Mutasi</td>
        <td class='isi_laporan' align='right'>".number_format($debet_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_cs,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_tot,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($kredit_bp,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kredit_kunj,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($kredit_cs,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kredit_tot,0,",",".")."</td>
       <td class='isi_laporan' align='right' colspan='4'>&nbsp;</td>
	
       </tr>";
		 echo " <tr align='center'>
		<td colspan='13' align='right' class='header_laporan'>Saldo Akhir</td>
        <td class='isi_laporan' align='right'>".number_format($sa_bp+$row1->debet_bp-$row1->kredit_bp,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_kunj+$row1->debet_kunj-$row1->kredit_kunj,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($sa_cs+$row1->debet_cs-$row1->kredit_cs,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sa_tot,0,",",".")."</td>
       </tr>
	   
	 </table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
