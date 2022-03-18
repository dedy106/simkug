<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrPolisEndorsList extends server_report_basic
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
		$lap=$tmp[3];
		$nama_file="polis.xls";
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		
		$sql_jenis="";
		if ($jenis=="Polis")
		{
			$sql_jenis=" and a.no_bill='-' ";
		}
		if ($jenis=="OutStanding")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')='-' ";
		}
		if ($jenis=="Lunas Premi")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')<>'-' and isnull(g.no_kashut,'-')='-' ";
		}
		if ($jenis=="Lunas")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')<>'-' and isnull(g.no_kashut,'-')<>'-' ";
		}
		$i=1;
		
		if ($lap=="Excel")
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
		echo "<div align='center'>"; 
		echo "<table  border='0' cellpadding='1' cellspacing='2' >
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1' >
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
        <td align='center' class='style16'>LAPORAN POSISI POLIS ENDORS</td>
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
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='2700'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
        <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='80' rowspan='2' class='header_laporan'>No Register</td>
		<td width='100' rowspan='2' class='header_laporan'>No Polis</td>
		<td width='100' rowspan='2' class='header_laporan'>No Sertifikat</td>
        <td width='120' rowspan='2' class='header_laporan'>Periode Polis</td>
		<td width='60' rowspan='2' class='header_laporan'>Tgl Jatuh Tempo</td>
		<td width='40' rowspan='2' class='header_laporan'>COB</td>
		<td width='100' rowspan='2' class='header_laporan'>Kategori</td>
		<td width='50' rowspan='2' class='header_laporan'>Kode PP</td>
		<td width='50' rowspan='2' class='header_laporan'>Acc Exec</td>
		<td width='150' rowspan='2' class='header_laporan'>Tertanggung</td>
        <td width='150' rowspan='2' class='header_laporan'>Asuradur</td>
		<td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='80' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='80' rowspan='2' class='header_laporan'>Diskon</td>
        <td width='80' rowspan='2' class='header_laporan'>Komisi</td>
		<td width='80' rowspan='2' class='header_laporan'>Biaya Adm & Materai</td>
        <td width='80' rowspan='2' class='header_laporan'>PPN</td>
        <td width='80' rowspan='2' class='header_laporan'>PPh</td>
		<td width='80' rowspan='2' class='header_laporan'>Piutang Premi</td>
		<td width='120' rowspan='2' class='header_laporan'>Quotation</td>
		<td width='120' rowspan='2' class='header_laporan'>Placing</td>	
		<td width='100' rowspan='2' class='header_laporan'>Akru Piutang</td>
		<td width='100' rowspan='2' class='header_laporan'>Penerimaan Premi</td>
		<td width='100' rowspan='2' class='header_laporan'>Pembayaran Hutang Premi</td>
      </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
		
		$sql="select  a.no_bill,d.kode_pp,a.kode_lokasi,a.no_polis,c.nama as nama_cust,d.no_dok,d.no_dok2,e.nama as nama_vendor,f.nama as nama_pic,a.no_bill,d.kode_pic,d.kode_tipe,
			date_format(d.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(d.tgl_selesai,'%d/%m/%Y') as tgl_selesai,date_format(d.tanggal,'%d/%m/%Y') as tgl_polis,
		case when a.no_bill='-' then a.fee else (a.fee*a.kurs) end as fee,
		case when a.no_bill='-' then a.premi else (a.premi*a.kurs) end as premi,
		case when a.no_bill='-' then a.ppn else (a.ppn*a.kurs) end as ppn,
		case when a.no_bill='-' then a.pph else (a.pph*a.kurs) end as pph,
		case when a.no_bill='-' then d.total else a.kurs*d.total end as total,
		case when a.no_bill='-' then (a.p_cost+a.materai) else a.kurs*(a.p_cost+a.materai) end as biaya_adm,
		d.p_premi,d.p_fee,isnull(g.no_bukti,'-') as no_kas,isnull(g.no_kashut,'-') as no_kashut,i.nama as nama_klp,
		d.no_placing,date_format(a.due_date,'%d/%m/%Y') as due_date,h.kode_klp,j.no_quo,a.diskon
from sju_polis_termin_h a
inner join sju_polis_m_h d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi
left join trans_m b on a.no_bill=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on d.kode_cust=c.kode_cust and d.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
inner join sju_pic f on d.kode_pic=f.kode_pic and d.kode_lokasi=f.kode_lokasi
inner join sju_tipe h on d.kode_tipe=h.kode_tipe and d.kode_lokasi=h.kode_lokasi
inner join sju_tipe_klp i on h.kode_klp=i.kode_klp and h.kode_lokasi=i.kode_lokasi
left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
left join sju_quo_m j on d.no_polis=j.no_polis and d.kode_lokasi=j.kode_lokasi
$this->filter $sql_jenis
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
				<td class='isi_laporan'>$row1->tgl_polis</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolis('$row1->no_polis','$row1->kode_lokasi');\">$row1->no_polis</a></td>";
				echo "<td class='isi_laporan'>&nbsp;$row1->no_dok</td>
				<td class='isi_laporan'>$row1->no_dok2</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->due_date</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->kode_klp - $row1->nama_klp</td>
				<td class='isi_laporan'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->diskon,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->biaya_adm,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->ppn,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->pph,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->premi+$row1->biaya_adm,2,',','.')."</td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenQuo('$row1->no_quo','$row1->kode_lokasi');\">$row1->no_quo</a></td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPlacing('$row1->no_placing','$row1->kode_lokasi');\">$row1->no_placing</a></td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenAkru('$row1->no_bill','$row1->kode_lokasi');\">$row1->no_bill</a></td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_kas','$row1->kode_lokasi');\">$row1->no_kas</a></td>";
				echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_kashut','$row1->kode_lokasi');\">$row1->no_kashut</a></td>";
				
			  echo "
			  </tr>";
				$i=$i+1;
			 }
			$tot_total+=$total;
			$tot_n_premi+=$n_premi;
			$tot_n_fee+=$n_fee;
			$tot_ppn+=$ppn;
			$tot_pph+=$pph;
				$diskon+=$row1->diskon;

      echo "<tr>
        <td colspan='13' align='center' class='header_laporan'>Jumlah</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($premi,2,',','.')."</td>
        <td class='isi_laporan' align='right'>".number_format($diskon,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($premi+$biaya_adm,2,',','.')."</td>
      </tr>";
		
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
