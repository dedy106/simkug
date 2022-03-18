<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrBukuPolis extends server_report_basic
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
        <td align='center' class='style16'>LAPORAN BUKU HARIAN POLIS PRODUKSI </td>
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
    <td><table  border='1' cellpadding='0' cellspacing='0' class='kotak' width='1700'>
      <tr align='center' bgcolor='#dbeef3'>
        <td width='25' rowspan='2' class='header_laporan'>No</td>
        <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='80' rowspan='2' class='header_laporan'>No Register</td>
		<td width='100' rowspan='2' class='header_laporan'>No Polis</td>
        <td width='120' rowspan='2' class='header_laporan'>Periode Polis</td>
		<td width='150' rowspan='2' class='header_laporan'>Tertanggung</td>
		<td width='120' rowspan='2' class='header_laporan'>No Placing</td>
        <td width='60' rowspan='2' class='header_laporan'>Tgl Placing </td>
		<td width='120' rowspan='2' class='header_laporan'>No Quotation</td>
		<td width='40' rowspan='2' class='header_laporan'>COB</td>
		<td width='40' rowspan='2' class='header_laporan'>Curr</td>
	    <td width='90' rowspan='2' class='header_laporan'>Nilai Pertanggungan </td>
        <td colspan='2' class='header_laporan'>%tase Rate </td>
        <td width='90' rowspan='2' class='header_laporan'>Premi Bruto </td>
        <td width='90' rowspan='2' class='header_laporan'>Komisi</td>
		<td width='90' rowspan='2' class='header_laporan'>Biaya Adm & Materai</td>
        <td width='80' rowspan='2' class='header_laporan'>PPN</td>
        <td width='80' rowspan='2' class='header_laporan'>PPh</td>
      </tr>
      <tr bgcolor='#dbeef3' align='center'>
        <td width='50' class='header_laporan'>Premi</td>
        <td width='50' class='header_laporan'>Komisi</td>
      </tr>";
		
		  
			$sql="select a.no_polis,c.nama as nama_cust,d.nama as nama_vendor,e.nama as nama_pic,1 as kurs,a.no_dok,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.kode_curr,
	   a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,b.ppn,b.pph,date_format(a.tanggal,'%d/%m/%Y') as tgl_polis,a.objek,a.kode_tipe,a.p_cost+a.materai as biaya_adm,
	   g.no_placing,date_format(g.tanggal,'%d/%m/%Y') as tgl_placing,h.no_quo,a.kode_curr
from sju_polis_m a
inner join sju_polis_termin b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor d on b.kode_vendor=d.kode_vendor and b.kode_lokasi=d.kode_lokasi
inner join sju_pic e on a.kode_pic=e.kode_pic and a.kode_lokasi=e.kode_lokasi
inner join sju_tipe f on a.kode_tipe=f.kode_tipe and a.kode_lokasi=f.kode_lokasi
inner join sju_placing_m g on a.no_polis=g.no_polis and a.kode_lokasi=g.kode_lokasi
inner join sju_quo_m h on a.no_polis=h.no_polis and a.kode_lokasi=h.kode_lokasi
$this->filter
order by a.tanggal ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $ppn=0; $pph=0; $biaya_adm=0;
			$total2=0; $n_premi2=0; $n_fee2=0; $ppn2=0; $pph2=0; $biaya_adm2=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				if ($row1->kode_curr=="IDR")
				{
					$total+=$row1->total;
					$n_premi+=$row1->n_premi;
					$n_fee+=$row1->n_fee;
					$ppn+=$row1->ppn;
					$pph+=$row1->pph;
					$biaya_adm+=$row1->biaya_adm;
				}
				else
				{
					$total2+=$row1->total;
					$n_premi2+=$row1->n_premi;
					$n_fee2+=$row1->n_fee;
					$ppn2+=$row1->ppn;
					$pph2+=$row1->pph;
					$biaya_adm2+=$row1->biaya_adm;
				}
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->tgl_polis</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_selesai</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->no_placing</td>
				<td class='isi_laporan'>$row1->tgl_placing</td>
				<td class='isi_laporan'>$row1->no_quo</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->kode_curr</td>
				<td class='isi_laporan' align='right'>".number_format($row1->total,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_premi,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->p_fee,$koma,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->biaya_adm,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->ppn,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->pph,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
			 }
			if ($total2>0)
			{
      echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Jumlah Curr</td>
        <td class='isi_laporan' align='right'>".number_format($total2,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn2,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph2,2,',','.')."</td>
      </tr>";
			}
		echo "<tr>
        <td colspan='11' align='right' class='header_laporan'>Jumlah IDR</td>
        <td class='isi_laporan' align='right'>".number_format($total,2,',','.')."</td>
        <td colspan='2'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($n_fee,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($biaya_adm,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
