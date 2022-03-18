<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrAwasPdptSum extends server_report_basic
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
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='1500'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
        <td width='200' rowspan='2' class='header_laporan'>Tertanggung</td>
		<td width='200' rowspan='2' class='header_laporan'>Penanggung</td>
        <td width='120' rowspan='2' class='header_laporan'>No Polis </td>
		<td width='60' rowspan='2' class='header_laporan'>No Sertifikat </td>
		<td width='80' rowspan='2' class='header_laporan'>No Register</td>
		<td width='50' rowspan='2' class='header_laporan'>COB</td>
		<td width='80' rowspan='2' class='header_laporan'>Kategori</td>
        <td width='50' rowspan='2' class='header_laporan'>Acc Exec </td>
        <td width='150' rowspan='2' class='header_laporan'>Periode Polis </td>
		<td width='40' rowspan='2' class='header_laporan'>Curr</td>
        <td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='90' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='90' rowspan='2' class='header_laporan'>Komisi</td>
		<td width='80' rowspan='2' class='header_laporan'>Biaya Adm & Materai</td>
      </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
	
		$tot_total=0; $tot_n_premi=0; $tot_n_fee=0; $tot_ppn=0; $tot_pph=0;
	
		 
			$sql="select a.no_polis,a.total,a.kode_curr,a.p_premi,a.n_premi,a.n_fee,a.materai,a.p_cost,a.no_dok,a.no_dok2,a.p_fee,a.p_cost+a.materai as biaya_adm,
	   convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.kode_tipe,
	   c.nama as nama_cust,e.nama as nama_vendor,f.nama as nama_pic,g.nama as nama_tipe,a.kode_curr,a.kode_pic,h.nama as nama_klp
from sju_polis_m a
inner join (select a.no_polis,a.kode_lokasi 
			from sju_polis_m a
			inner join sju_polis_termin b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' 
			group by a.no_polis,a.kode_lokasi
			) b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_polis_vendor d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi and d.status='LEADER'
inner join sju_vendor e on d.kode_vendor=e.kode_vendor and d.kode_lokasi=e.kode_lokasi
inner join sju_pic f on a.kode_pic=f.kode_pic and a.kode_lokasi=f.kode_lokasi
inner join sju_tipe g on a.kode_tipe=g.kode_tipe and a.kode_lokasi=g.kode_lokasi
inner join sju_tipe_klp h on g.kode_klp=h.kode_klp and g.kode_lokasi=h.kode_lokasi
$this->filter
order by a.no_polis";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $biaya_adm=0;
			$total2=0; $n_premi2=0; $n_fee2=0; $biaya_adm2=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				if ($row1->kode_curr=="IDR")
				{
					$total+=$row1->total;
					$n_premi+=$row1->n_premi;
					$n_fee+=$row1->n_fee;
					$biaya_adm+=$row1->biaya_adm;
				}
				else
				{
					$total2+=$row1->total;
					$n_premi2+=$row1->n_premi;
					$n_fee2+=$row1->n_fee;
					$biaya_adm2+=$row1->biaya_adm;
				}
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->no_dok2</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->nama_klp</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->kode_curr</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->biaya_adm,2,',','.')."</td>";
				echo "</tr>";
				$i=$i+1;
			 }
		if ($total2>0)
		{	
		 echo "<tr>
        <td colspan='11' align='center' class='header_laporan'>Jumlah (USD)</td>
        <td class='isi_laporan' align='right'>".number_format($total2,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm2,2,',','.')."</td>
      </tr>";
		}
      echo "<tr>
        <td colspan='11' align='center' class='header_laporan'>Jumlah (IDR)</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm,2,',','.')."</td>
      </tr>";
		
    
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
