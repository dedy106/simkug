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
            <td width='100' class='header_laporan'>Kode Mitra</td>
            <td width='500' class='header_laporan'>$row->kode_cust</td>
            </tr>
          <tr>
            <td class='header_laporan'>Nama Mitra </td>
            <td class='header_laporan'>$row->nama</td>
            </tr>
        </table></td>
      </tr>
	   <tr>
        <td colspan='18' align='right' class='header_laporan'>Saldo Awal </td>
        <td width='90' align='right' class='header_laporan'>$so_awal</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' rowspan='2' class='header_laporan'>No</td>
        <td width='100' rowspan='2' class='header_laporan'>No Bukti </td>
        <td width='100' rowspan='2' class='header_laporan'>No Dokumen </td>
        <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='250' rowspan='2' class='header_laporan'>Keterangan</td>
      
        <td colspan='5' class='header_laporan'>Biaya Pengobatan</td>
        <td colspan='6' class='header_laporan'>Kunjungan</td>
        <td width='90' rowspan='2' class='header_laporan'>Total Piutang</td>
        <td width='90' rowspan='2' class='header_laporan'>Pembayaran</td>
        <td width='90' rowspan='2' class='header_laporan'>Saldo</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='90' class='header_laporan'>RJTP</td>
        <td width='90' class='header_laporan'>RJTL</td>
        <td width='90' class='header_laporan'>RI</td>
        <td width='90' class='header_laporan'>Restitusi</td>
        <td width='90' class='header_laporan'>Total</td>
        <td width='90' class='header_laporan'>Umum</td>
        <td width='90' class='header_laporan'>Gigi</td>
        <td width='90' class='header_laporan'>KBKIA</td>
        <td width='90' class='header_laporan'>Matkes</td>
        <td width='90' class='header_laporan'>Cost Sharing </td>
        <td width='90' class='header_laporan'>Total</td>
      </tr>";
	  $sql1="select a.no_valid,b.no_bill,date_format(a.tanggal,'%d-%m-%Y') as tgl_bukti,b.keterangan,
       isnull(b.rjtp,0) as rjtp,
       isnull(b.rjtl,0) as rjtl,
       isnull(b.ri,0) as ri,
       isnull(b.rest,0) as rest,
       isnull(b.bp,0)  as bp,
       isnull(b.umum,0) as umum,
       isnull(b.gigi,0) as gigi,
       isnull(b.kbia,0) as kbia,
       isnull(b.matkes,0) as matkes,
       isnull(b.cs,0) as cs,
       isnull(b.kunj,0) as kunj,
       isnull(b.bp,0)+isnull(b.kunj,0) as total,
	   isnull(b.bayar,0) as bayar
from yk_valid_m a
inner join (select a.no_valid,b.no_bill,c.keterangan,
       sum(case when substring(b.kode_produk,1,2) in ('11','12') then b.nilai else 0 end) as rjtp,
       sum(case when substring(b.kode_produk,1,2) in ('20','21','90') then b.nilai else 0 end) as rjtl,
       sum(case when substring(b.kode_produk,1,2) in ('31','32') then b.nilai else 0 end) as ri,
       sum(case when substring(b.kode_produk,1,2) in ('40') then b.nilai else 0 end) as rest,
       sum(case when substring(b.kode_produk,1,2) in ('11','12','20','21','90','31','32','40') then b.nilai else 0 end) as bp,
       0 as umum,0 as gigi,0 as kbia,0 as matkes,0 as cs,0 as kunj,0 as bayar
from yk_valid_m a
inner join yk_bill_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi
inner join yk_bill_m c on b.no_bill=c.no_bill
inner join cust d on b.loker_bast=d.kode_cust and b.kode_lokasi=d.kode_lokasi 
where a.modul in ('BAST','BAREV') and b.kode_lokasi='$row->kode_lokasi' and b.loker_bast='$row->kode_cust' and substring(a.periode,1,4)='$tahun' and d.jenis<>'PENSIUN'
group by a.no_valid,b.no_bill,c.keterangan
union all
select a.no_valid,b.no_bill,c.keterangan,0 as rjtp,0 as rjtl,0 as ri,0 as rest,0 as bp,
       sum(b.umum) as umum,sum(b.gigi) as gigi,sum(b.kbia) as kbia,sum(b.matkes) as matkes,sum(b.cs) as cs,
       sum(b.umum+b.gigi+b.kbia+b.matkes-b.cs) as kunj,0 as bayar
from yk_valid_m a
inner join yk_billkunj_d b on a.no_valid=b.no_piutang and a.kode_lokasi=b.kode_lokasi
inner join yk_billkunj_m c on b.no_bill=c.no_bill
inner join cust d on b.loker_bast=d.kode_cust and b.kode_lokasi=d.kode_lokasi 
where a.modul in ('BAST','BAREV') and b.kode_lokasi='$row->kode_lokasi' and b.loker_bast='$row->kode_cust' and substring(a.periode,1,4)='$tahun' and d.jenis<>'PENSIUN'
group by a.no_valid,b.no_bill,c.keterangan
union all
select a.no_valid,d.no_kirim as no_bill,d.keterangan,0 as rjtp,0 as rjtl,0 as ri,0 as rest,0 as bp,
       0 as umum,0 as gigi,0 as kbia,0 as matkes,0 as cs,0 as kunj,sum(c.nilai) as bayar
from yk_valid_m a
inner join yk_valid_d c on a.no_valid=c.no_valid and a.kode_lokasi=c.kode_lokasi
left join takkirim_m d on c.no_kirim=d.no_kirim and c.kode_lokasi=d.kode_lokasi 
where a.modul='BAST' and c.no_kirim<>'-' and a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun'
group by a.no_valid,d.no_kirim,d.keterangan
	   )b on a.no_valid=b.no_valid
where a.modul in ('BAST','BAREV') ";
		
		$rs1 = $dbLib->execute($sql1);
		$saldo=0; $j=0;$rjtp=0;$rjtl=0;$ri=0;$rest=0;$bp=0;
		$umum=0;$gigi=0;$kbia=0;$matkes=0;$cs=0;$kunj=0;$bayar=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$rjtp=$rjtp + $row1->rjtp;
			$rjtl=$rjtl + $row1->rjtl;
			$ri=$ri + $row1->ri;
			$rest=$rest + $row1->rest;
			$bp=$bp + $row1->bp;
			$umum=$umum + $row1->umum;
			$gigi=$gigi + $row1->gigi;
			$kbia=$kbia + $row1->kbia;
			$matkes=$matkes + $row1->matkes;
			$cs=$cs + $row1->cs;
			$kunj=$kunj + $row1->kunj;
			$total=$total + $row1->total;
			$bayar=$bayar + $row1->bayar;
			$saldo=$saldo + $row1->bp + $row1->kunj-$row1->cs-$row1->bayar;
		echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'>$row1->no_valid</td>
		<td class='isi_laporan'>$row1->no_bill</td>
		<td class='isi_laporan'>$row1->tgl_bukti</td>
        <td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan' align='right'>".number_format($row1->rjtp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->rjtl,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->ri,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->rest,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->bp,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->umum,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->gigi,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kbia,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->matkes,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->cs,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->total,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->bayar,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
      </tr>";
	  }
      echo " <tr align='center'>
		<td colspan='5' align='right' class='header_laporan'>Mutasi</td>
        <td class='isi_laporan' align='right'>".number_format($rjtp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($rjtl,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ri,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($rest,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($bp,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($umum,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($gigi,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kbia,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($matkes,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($cs,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
        <td class='header_laporan'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td colspan='18' align='right' class='header_laporan'>Saldo Akhir</td>
        <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
      </tr>
	 </table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
