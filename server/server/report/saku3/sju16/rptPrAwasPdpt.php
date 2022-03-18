<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrAwasPdpt extends server_report_basic
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
		$sql="";
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
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
		
		echo "<div align='center'>"; 
		echo "<table  border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>ISPRD</td>
      </tr>
      <tr>
        <td class='style16'>$this->lokasi</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>LAPORAN PENGAWASAN PENDAPATAN (Rupiah)</td>
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
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='2200'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
        <td width='200' rowspan='2' class='header_laporan'>Tertanggung</td>
		<td width='200' rowspan='2' class='header_laporan'>Penanggung</td>
        <td width='120' rowspan='2' class='header_laporan'>No Polis </td>
		<td width='60' rowspan='2' class='header_laporan'>No Sertifikat </td>
		<td width='80' rowspan='2' class='header_laporan'>No Register</td>
		<td width='40' rowspan='2' class='header_laporan'>Termin</td>
		<td width='50' rowspan='2' class='header_laporan'>COB</td>
		<td width='80' rowspan='2' class='header_laporan'>Kategori</td>
        <td width='50' rowspan='2' class='header_laporan'>Acc Exec </td>
        <td width='150' rowspan='2' class='header_laporan'>Periode Polis </td>
		<td width='60' rowspan='2' class='header_laporan'>Jatuh Tempo </td>
        <td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='90' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='90' rowspan='2' class='header_laporan'>Komisi</td>
		<td width='80' rowspan='2' class='header_laporan'>Biaya Adm & Materai</td>
        <td width='80' rowspan='2' class='header_laporan'>PPN</td>
        <td width='80' rowspan='2' class='header_laporan'>PPh</td>
		<td width='80' rowspan='2' class='header_laporan'>Piutang Premi</td>
		<td width='100' rowspan='2' class='header_laporan'>Akru Piutang</td>
		<td width='60' rowspan='2' class='header_laporan'>Tgl Akru</td>
		<td width='100' rowspan='2' class='header_laporan'>Penerimaan Premi</td>
		<td width='60' rowspan='2' class='header_laporan'>Tgl Terima</td>
		<td width='100' rowspan='2' class='header_laporan'>Pembayaran Hutang Premi</td>
		<td width='60' rowspan='2' class='header_laporan'>Tgl Bayar</td>
      </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
	
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
	
		 
			$sql="select  a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
			date_format(d.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(d.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
		(a.fee*a.kurs) as fee,(a.premi*a.kurs) as premi,(a.ppn*a.kurs) as ppn,(a.pph*a.kurs) as pph,
		a.kurs*d.total as total,d.p_premi,d.p_fee,isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,i.nama as nama_klp,
		a.kurs*(a.p_cost+a.materai) as biaya_adm,a.ke,a.kode_lokasi,
		date_format(b.tanggal,'%d/%m/%Y') as tgl_akru,
		case when j.tanggal is not null then date_format(j.tanggal,'%d/%m/%Y') else date_format(l.tanggal,'%d/%m/%Y') end as tgl_kas
		,date_format(k.tanggal,'%d/%m/%Y') as tgl_kashut,date_format(m.due_date,'%d/%m/%Y') as due_date
from sju_bill_d a
inner join sju_polis_m d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
inner join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
inner join sju_tipe_klp i on h.kode_klp=i.kode_klp and h.kode_lokasi=i.kode_lokasi
left join sju_polis_termin m on a.no_bill=m.no_bill and a.kode_lokasi=m.kode_lokasi and a.no_polis=m.no_polis and a.ke=m.ke
left join (select a.no_polis,a.kode_lokasi,a.ke,a.no_bill,a.kode_vendor,
	   ISNULL(a.no_bukti,'-') as no_bukti,ISNULL(a.no_kashut,'-') as no_kashut
from sju_polisbayar_d a
where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode_bayar'
		 union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C' 
		union all
		    select a.no_polis,a.kode_lokasi,a.ke,a.no_billseb as no_bill,a.kode_vendor,
				   ISNULL(a.no_bill,'-') as no_bukti,'-' as no_kashut
			from sju_bill_d a
			inner join ju_m b on a.no_bill=b.no_ju and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode_bayar' and a.dc='C'
		)g on a.no_polis=g.no_polis and a.kode_lokasi=b.kode_lokasi and a.ke=g.ke and a.no_bill=g.no_bill and a.kode_vendor=g.kode_vendor
left join kas_m j on g.no_bukti=j.no_kas and g.kode_lokasi=j.kode_lokasi
left join kas_m k on g.no_kashut=k.no_kas and g.kode_lokasi=k.kode_lokasi
left join ju_m l on g.no_bukti=l.no_ju and g.kode_lokasi=l.kode_lokasi
$this->filter  $tmp and a.dc='D'
order by d.kode_tipe,a.no_polis";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $premi=0; $fee=0; $ppn=0; $pph=0; $biaya_adm=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;
				$premi+=$row1->premi;
				$fee+=$row1->fee;
				$ppn+=$row1->ppn;
				$pph+=$row1->pph;
				$biaya_adm+=$row1->biaya_adm;
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->no_dok2</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan' align='center'>$row1->ke</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->nama_klp</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->due_date</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->biaya_adm,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->ppn,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->pph,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->premi+$row1->biaya_adm,2,',','.')."</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAkru('$row1->no_bill','$row1->kode_lokasi');\">$row1->no_bill</a></td>";
				echo "<td class='isi_laporan'>$row1->tgl_akru</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_kas','$row1->kode_lokasi');\">$row1->no_kas</a></td>";
				echo "<td class='isi_laporan'>$row1->tgl_kas</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_kashut','$row1->kode_lokasi');\">$row1->no_kashut</a></td>";
				echo "<td class='isi_laporan'>$row1->tgl_kashut</td>
				 </tr>";
				$i=$i+1;
			 }
      echo "<tr>
        <td colspan='12' align='center' class='header_laporan'>Jumlah</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($premi+$biaya_adm,2,',','.')."</td>
		<td class='isi_laporan'>&nbsp;</td>
		<td class='isi_laporan'>&nbsp;</td>
      </tr>";
		
    
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
