<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bsm_rptPrHutangPremi extends server_report_basic
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
		$periode_bayar=$tmp[4];
		$nama_file="hutang_premi_".$periode.".xls";
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		if ($jenis=="Excell")
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
		echo "<table width='1300' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='1300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>ISHPR</td>
      </tr>
      <tr>
        <td>Jakarta</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>LAPORAN PENGAWASAN HUTANG PREMI </td>
        <td>&nbsp;</td>
      </tr>
    <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>$nama_periode</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='1300' border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' class='header_laporan'>No</td>
        <td width='150' class='header_laporan'>Tertanggung</td>
        <td width='150' class='header_laporan'>Asuradur</td>
        <td width='150' class='header_laporan'>No Polis / Nota </td>
        <td width='80' class='header_laporan'>No Register</td>
        <td width='100' class='header_laporan'>Acc Exec </td>
        <td width='60' class='header_laporan'>Tgl Terima </td>
        <td width='80' class='header_laporan'>Bukti Terima </td>
        <td width='50' class='header_laporan'>Tgl Keluar </td>
        <td width='80' class='header_laporan'>Bukti Keluar</td>
        <td width='90' class='header_laporan'>Hutang Premi </td>
        <td width='80' class='header_laporan'>PPH</td>
        <td width='90' class='header_laporan'>Hutang Premi + PPH</td>
      </tr>";
	
			$sql="select a.no_polis,c.nama as nama_cust,d.nama as nama_vendor,e.nama as nama_pic,1 as kurs,a.no_dok,a.kode_pic,a.no_polis,
			date_format(a.tanggal,'%d/%m/%Y') as tgl_polis,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,a.ppn,a.pph,a.n_premi+a.pph as total,
	   a.no_bayar as no_kas,date_format(h.tanggal,'%d/%m/%Y') as tgl_kas
from bsm_polis_m a
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
inner join sju_pic e on a.kode_pic=e.kode_pic and a.kode_lokasi=e.kode_lokasi
inner join sju_tipe i on a.kode_tipe=i.kode_tipe and a.kode_lokasi=i.kode_lokasi
left join bsm_flag_m h on a.no_bayar=h.no_bukti and a.kode_lokasi=h.kode_lokasi
$this->filter 
order by a.no_polis
";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $ppn=0; $pph=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;
				$n_premi+=$row1->n_premi;
				$pph+=$row1->pph;
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->kode_pic - $row1->nama_pic</td>
				<td class='isi_laporan'>$row1->tgl_polis</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->tgl_kas</td>
				<td class='isi_laporan'>$row1->no_kas</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->pph,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
			  </tr>";
			}
			  echo "<tr>
        <td colspan='10' align='center' class='header_laporan'>Jumlah</td>
        <td class='header_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($pph,2,',','.')."</td>
		<td class='header_laporan' align='right'>".number_format($total,2,',','.')."</td>
      </tr>";
			$tot_n_premi+=$n_premi;
			$tot_pph+=$pph;
			$tot_total+=$total;
		
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
