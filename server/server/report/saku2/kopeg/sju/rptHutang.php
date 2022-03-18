<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptHutang extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$periode2=$tmp[3];
		$status=$tmp[4];
		$sql2="";
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$periode_bayar=$periode;
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		$periode_bayar=$periode;
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
			$periode_bayar=$periode2;
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		$tmp="";
		if ($status=="Lunas")
		{
			$tmp=" and isnull(g.no_bukti,'-')<>'-' "; 
		}
		if ($status=="OutStanding")
		{
			$tmp=" and isnull(g.no_bukti,'-')='-' ";
		}
		//(a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn)*a.kurs as hutang,
		$sql="select  a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
			date_format(b.tanggal,'%d/%m/%Y') as tgl,date_format(a.due_date,'%d/%m/%Y') as due_date,
		(a.fee*a.kurs) as fee,(a.premi*a.kurs) as premi,(a.ppn*a.kurs) as ppn,(a.pph*a.kurs) as pph,
		a.kurs*d.total as total,d.p_premi,d.p_fee,isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,i.nama as nama_klp,
		(a.nilai_hutang)*a.kurs as hutang,
		case when j.tanggal is not null then date_format(j.tanggal,'%d/%m/%Y') else date_format(k.tanggal,'%d/%m/%Y') end as tgl_kas
from sju_bill_d a
inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
inner join sju_tipe_klp i on h.kode_klp=i.kode_klp and h.kode_lokasi=i.kode_lokasi
--left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor and g.periode<='$periode'
left join ( select a.no_polis,a.kode_lokasi,a.ke,a.no_bill,a.kode_vendor,
				   ISNULL(a.no_bukti,'-') as no_bukti,ISNULL(a.no_kashut,'-') as no_kashut
			from sju_polisbayar_d a
			where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode_bayar'
		    union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C' 
			union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join ju_m b on a.no_bill=b.no_ju and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C'
		)g on a.no_polis=g.no_polis and a.kode_lokasi=b.kode_lokasi and a.ke=g.ke and a.no_bill=g.no_bill and a.kode_vendor=g.kode_vendor
left join kas_m j on g.no_bukti=j.no_kas and g.kode_lokasi=j.kode_lokasi
left join ju_m k on g.no_bukti=k.no_ju and g.kode_lokasi=k.kode_lokasi
$this->filter $tmp 
order by d.kode_tipe,a.no_polis ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("daftar hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>&nbsp;</td>
      </tr>
      <tr>
        <td class='style16'>$this->lokasi</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>LAPORAN DAFTAR HUTANG </td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>$nama_periode</td>
        <td>&nbsp;</td>
      </tr>
    
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width=1300>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bill</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='80'  align='center' class='header_laporan'>No Register</td>
	 <td width='100'  align='center' class='header_laporan'>No Polis</td>
	 <td width='80'  align='center' class='header_laporan'>No Sertifikat</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	 <td width='40'  align='center' class='header_laporan'>COB</td>
     <td width='60'  align='center' class='header_laporan'>Acc Exec</td>
	 <td width='150'  align='center' class='header_laporan'>Penanggung</td>
	 <td width='80'  align='center' class='header_laporan'>Pph</td>
	 <td width='80'  align='center' class='header_laporan'>Hutang</td>
	 <td width='80'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='80'  align='center' class='header_laporan'>Tgl Bayar</td>
      </tr>  ";
		$hutang=0; $pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hutang+=$row->hutang;
			$pph+=$row->pph;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_bill</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->no_polis</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	  <td class='isi_laporan'>$row->no_dok2</td>
	 
	 <td class='isi_laporan'>$row->due_date</td>
	 <td class='isi_laporan'>$row->kode_tipe</td>
	 <td class='isi_laporan'>$row->nama_pic</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	<td class='isi_laporan' align='right'>".number_format($row->pph,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->hutang,2,",",".")."</td>
	 <td class='isi_laporan'>$row->no_kashut</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='10'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($pph,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($hutang,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div></td>
  </tr>
</table><br>";
		return "";
		
	}
	
}
?>
