<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptKartuPinj extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$periode=$tmp[0];
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
left join (select no_sla,year(max(tgl_tempo)) as max_tahun 
		   from sla_kkp_d 
		   group by no_sla
		   )f on a.no_sla=f.no_sla 
left join (select no_sla,
				  sum(ci_bunga) as ci_bunga,sum(ci_pokok) as ci_pokok,sum(beban) as beban,sum(amor) as amor,sum(ci_total) as ci_total
		   from sla_kkp_d 
		   where no_bayar<>'-'
		   group by no_sla
		   )g on a.no_sla=g.no_sla 
$this->filter
order by a.no_sla";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN KARTU PINJAMAN",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
	  <tr>
        <td colspan='9'><table  border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td class='isi_laporan'>Perusahaan</td>
        <td class='isi_laporan'>: $row->nama_cocd </td>
      </tr>
      <tr>
        <td class='isi_laporan'>Bank (Institution)</td>
        <td class='isi_laporan'>: $row->nama_mitra </td>
      </tr>
      <tr>
        <td class='isi_laporan'>Classification</td>
        <td class='isi_laporan'>: $row->nama_class </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>No dokumen </td>
        <td class='isi_laporan'>: $row->no_dok </td>
      </tr>
      <tr >
        <td class='isi_laporan'>Keterangan</td>
        <td class='isi_laporan'>: $row->keterangan </td>
      </tr>
     
      <tr>
        <td class='isi_laporan'>Nilai Nominal</td>
        <td class='isi_laporan'>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Biaya transaksi </td>
        <td class='isi_laporan'>: ".number_format($row->biaya,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Tingkat suku bunga, stated</td>
        <td class='isi_laporan'>: ".number_format($row->bunga,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Tingkat suku bunga pasar</td>
        <td class='isi_laporan'>: ".number_format($row->pasar,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Pembayaran bunga dalam setahun</td>
        <td class='isi_laporan'>: ".number_format($row->jmlbunga,0,",",".")." </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Jatuh tempo (tahun)</td>
        <td class='isi_laporan'>: ".number_format($row->max_tahun,0,",",".")."  </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Jumlah hari dlm setahun</td>
        <td class='isi_laporan'>: ".number_format($row->basis,0,",",".")."  </td>
      </tr>
	  <tr>
        <td class='isi_laporan'>Suku Bunga Efektif</td>
        <td class='isi_laporan'>: ".number_format($row->efektif,0,",",".")."</td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='80' class='header_laporan'>Tgl Bayar</td>
        <td width='100' class='header_laporan'>Pembayaran Bunga </td>
		<td width='100' class='header_laporan'>Cicilan Pokok</td>
        <td width='100' class='header_laporan'>Total Pengeluaran Kas</td>
		<td width='100' class='header_laporan'>Saldo Loan - Outstanding</td>
		<td width='100' class='header_laporan'>Beban Bunga</td>
        <td width='100' class='header_laporan'>Amortisasi</td>
		<td width='100' class='header_laporan'>Amortised Cost</td>
		<td width='100' class='header_laporan'>No Bayar</td>
        </tr>";
	  $sql1="select a.periode,convert(varchar,a.tgl_tempo,103) as tgl_tempo,a.ci_bunga,a.ci_pokok,a.ci_total,a.saldo,a.beban,a.amor,a.saldo,a.no_bayar 
from sla_kkp_d a
where a.no_sla='$row->no_sla'
order by a.periode ";
		
	  $rs1 = $dbLib->execute($sql1);
	  $ci_bunga=0;$ci_pokok=0;$ci_total=0;$saldo=0;$beban=0;$amor=0;$saldo=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$ci_bunga+=$row1->ci_bunga;
		$ci_pokok+=$row1->ci_pokok;
		$ci_total+=$row1->ci_total;
		$saldo+=$row1->saldo;
		$beban+=$row1->beban;
		$amor+=$row1->amor;
		$saldo+=$row1->saldo;
      echo "<tr>
        <td class='isi_laporan'>$row1->tgl_tempo</td>
        <td align='right' class='isi_laporan'>".number_format($row1->ci_bunga,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->ci_pokok,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->ci_total,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->saldo,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->beban,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->amor,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->saldo,0,",",".")."</td>
		<td class='isi_laporan'>$row1->no_bayar</td>
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>".number_format($ci_bunga,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($ci_pokok,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($ci_total,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($beban,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($amor,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($saldo,0,",",".")."</td>
		<td align='right' class='isi_laporan'>&nbsp;</td>
        </tr>";
       
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
