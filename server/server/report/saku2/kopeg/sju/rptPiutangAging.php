<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPiutangAging extends server_report_basic
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$tgl_aging=$tmp[2];
		$sql="select  a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
			date_format(b.tanggal,'%d/%m/%Y') as tgl,date_format(a.due_date,'%d/%m/%Y') as due_date,
		(a.fee*a.kurs) as fee,(a.premi*a.kurs) as premi,(a.ppn*a.kurs) as ppn,(a.pph*a.kurs) as pph,
		a.kurs*d.total as total,d.p_premi,d.p_fee,isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,i.nama as nama_klp,
		case when datediff(day,b.tanggal,'$tgl_aging')<=30 then a.premi else 0 end as aging1,
	   case when datediff(day,b.tanggal,'$tgl_aging') between 31 and 60 then a.premi else 0 end as aging2,
       case when datediff(day,b.tanggal,'$tgl_aging') between 61 and 90 then a.premi else 0 end as aging3,
       case when datediff(day,b.tanggal,'$tgl_aging')>90 then a.premi else 0 end as aging4
from sju_polis_termin a
inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
inner join sju_tipe_klp i on h.kode_klp=i.kode_klp and h.kode_lokasi=i.kode_lokasi
left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor and g.periode<='$periode'
$this->filter and isnull(g.no_bukti,'-')='-'
order by d.kode_tipe,a.no_polis ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aging piutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width=1300>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='80' rowspan='2' align='center' class='header_laporan'>No Bill</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Tertanggung</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Register</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Polis</td>
	 <td width='80' rowspan='2'  align='center' class='header_laporan'>No Sertifikat</td>
     <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
	 <td width='40' rowspan='2' align='center' class='header_laporan'>COB</td>
     <td width='60' rowspan='2' align='center' class='header_laporan'>Acc Exec</td>
	 <td colspan='4'  align='center' class='header_laporan'>Aging</td>
      </tr>
	<tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>0 - 30 HARI</td>
     <td width='90'  align='center' class='header_laporan'>30-60 HARI </td>
     <td width='90'  align='center' class='header_laporan'>60-90 HARI</td>
     <td width='90'  align='center' class='header_laporan'>> 90 HARI</td>
   </tr> ";
		$aging1=0; $aging2=0; $aging3=0; $aging4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$aging1+=$row->aging1;
			$aging2+=$row->aging2;
			$aging3+=$row->aging3;
			$aging4+=$row->aging4;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_bill</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->no_polis</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	  <td class='isi_laporan'>$row->no_dok2</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_tipe</td>
	 <td class='isi_laporan'>$row->nama_pic</td>
	<td class='isi_laporan' align='right'>".number_format($row->aging1,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->aging2,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->aging3,2,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->aging4,2,",",".")."</td>
   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='9'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($aging1,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($aging2,2,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($aging3,2,",",".")."</td>
       <td class='isi_laporan' align='right'>".number_format($aging4,2,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
