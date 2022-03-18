<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrRenewalList extends server_report_basic
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
		$tmp=explode(";",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$periode2=$tmp[2];
		$koma=$tmp[3];
		$tgl_aging=$tmp[4];
		$tgl_aging2=$tmp[5];		
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
        <td align='center' class='style16'>RENEWAL LIST </td>
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
        <td width='25'  class='header_laporan'>No</td>
		<td width='150'  class='header_laporan'>Tertanggung</td>
        <td width='60'  class='header_laporan'>Tanggal Jatuh Tempo</td>
        <td width='80'  class='header_laporan'>No Register</td>
		<td width='100'  class='header_laporan'>No Polis</td>
		<td width='100'  class='header_laporan'>No Sertifikat</td>
        <td width='120'  class='header_laporan'>Periode Polis</td>
		<td width='40'  class='header_laporan'>COB</td>
		<td width='50'  class='header_laporan'>Acc Exec</td>
		
        <td width='150'  class='header_laporan'>Asuradur</td>
		<td width='80'  class='header_laporan'>Premi Bruto </td>
        <td width='80'  class='header_laporan'>Komisi</td>
	  </tr>
     ";
		
		  
			$sql="select a.no_polis,c.nama as nama_cust,d.nama as nama_vendor,e.nama as nama_pic,1 as kurs,a.no_dok,a.no_dok2,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_akhir,a.kode_curr,
	   a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,b.ppn,b.pph,date_format(a.tanggal,'%d/%m/%Y') as tgl_polis,a.objek,a.kode_tipe
from sju_polis_m a
inner join sju_polis_termin b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor d on b.kode_vendor=d.kode_vendor and b.kode_lokasi=d.kode_lokasi
inner join sju_pic e on a.kode_pic=e.kode_pic and a.kode_lokasi=e.kode_lokasi
inner join sju_tipe f on a.kode_tipe=f.kode_tipe and a.kode_lokasi=f.kode_lokasi
$this->filter and (a.tgl_selesai between '$tgl_aging' and '$tgl_aging2') 
order by a.kode_cust,a.tgl_selesai ";
			
			$rs1=$dbLib->execute($sql);
			$i=1;
			$total=0; $n_premi=0; $n_fee=0; $ppn=0; $pph=0; $biaya_adm=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;
				$n_premi+=$row1->n_premi;
				$n_fee+=$row1->n_fee;
				$ppn+=$row1->ppn;
				$pph+=$row1->pph;
				$biaya_adm+=$row1->biaya_adm;
			  echo "<tr>
				<td align='center' class='isi_laporan'>$i</td>
				<td class='isi_laporan'>$row1->nama_cust</td>
				<td class='isi_laporan'>$row1->tgl_akhir</td>
				<td class='isi_laporan'>$row1->no_polis</td>
				<td class='isi_laporan'>$row1->no_dok</td>
				<td class='isi_laporan'>$row1->no_dok2</td>
				<td class='isi_laporan'>$row1->tgl_mulai - $row1->tgl_akhir</td>
				<td class='isi_laporan'>$row1->kode_tipe</td>
				<td class='isi_laporan'>$row1->nama_pic</td>
				
				<td class='isi_laporan'>$row1->nama_vendor</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
			  </tr>";
				$i=$i+1;
			 }
			$tot_total+=$total;
			$tot_n_premi+=$n_premi;
			$tot_n_fee+=$n_fee;
			$tot_ppn+=$ppn;
			$tot_pph+=$pph;
      echo "<tr>
        <td colspan='10' align='center' class='header_laporan'>Jumlah</td>
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
