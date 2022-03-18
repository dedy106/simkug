<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptPrQuoList extends server_report_basic
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
		$periode2=$tmp[2];
		$koma=$tmp[3];
		
		$koma=2;
		$AddOnLib=new server_util_AddOnLib();
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($tipe=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($tipe=="All")
		{
			$nama_periode="Semua Periode";
		}
		$i=1;
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
        <td align='center' class='style16'>LAPORAN DATA QUOTATION LIST </td>
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
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='1600'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
		<td width='120' rowspan='2' class='header_laporan'>No Quotation </td>
		<td width='60' rowspan='2' class='header_laporan'>Tanggal </td>
		<td width='110' rowspan='2' class='header_laporan'>Periode </td>
        <td width='150' rowspan='2' class='header_laporan'>Tertanggung</td>
        <td width='150' rowspan='2' class='header_laporan'>Asuradur</td>
        <td width='60' rowspan='2' class='header_laporan'>Acc Exec </td>
        <td width='50' rowspan='2' class='header_laporan'>COB </td>
		<td width='130' rowspan='2' class='header_laporan'>Object of Loss </td>
		<td width='40' rowspan='2' class='header_laporan'>Kode Curr</td>
        <td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='90' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='90' rowspan='2' class='header_laporan'>Komisi</td>
      
     </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
    
		 
			$sql="select a.no_quo,b.nama as nama_cust,d.nama as nama_pic,convert(varchar(20),a.tanggal,103) as tgl_quo,a.kode_pic,
	   convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,
	   a.occup,a.lokasi,a.objek,a.ttd,a.catat,a.kode_tipe,a.lokasi,a.kode_cust,
	   dbo.fnGetQuoVendor(a.no_quo,a.kode_lokasi) as nama_vendor 
from sju_quo_m a 
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
inner join sju_tipe h on a.kode_tipe=h.kode_tipe and a.kode_lokasi=h.kode_lokasi
$this->filter
order by a.no_quo ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $ppn=0; $pph=0;
			$total2=0; $n_premi2=0; $n_fee2=0; $ppn2=0; $pph2=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				if ($row1->kode_curr=="IDR")
				{
					$total+=$row1->total;
					$n_premi+=$row1->n_premi;
					$n_fee+=$row1->n_fee;
					$ppn+=$row1->ppn;
					$pph+=$row1->pph;
				}
				else
				{
				
					$total2+=$row1->total;
					$n_premi2+=$row1->n_premi;
					$n_fee2+=$row1->n_fee;
					$ppn2+=$row1->ppn;
					$pph2+=$row1->pph;
				}
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->no_quo</td>
				<td class='isi_laporan'>$row1->tgl_quo</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->objek</td>
				<td class='isi_laporan'>$row1->kode_curr</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
				
			  </tr>";
				$i=$i+1;
			 }
			if ($total2>0)
			{
      echo "<tr>
        <td colspan='10' align='right' class='header_laporan'>Total (Curr)</td>
        <td class='isi_laporan' align='right'>".number_format($total2,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee2,2,',','.')."</td>
		
      </tr>";
			}
		echo "<tr>
        <td colspan='10' align='right' class='header_laporan'>Total IDR</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee,2,',','.')."</td>
		
      </tr>";
	  echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
