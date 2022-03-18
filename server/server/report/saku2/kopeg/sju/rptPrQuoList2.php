<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrQuoList extends server_report_basic
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
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$nama_file="quotation_".$periode.".xls";
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
		echo "<table width='1300' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='1300' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
          <td width='668'>&nbsp;</td>
          <td width='212' align='right' class='style16'>ISQUOTL<br></td>
        </tr>
        <tr>
          <td class='style16'>Jakarta</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>LAPORAN QUOTATION LIST</td>
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
    <td><table width='1300' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#dbeef3'>
        <td width='25' rowspan='3' align='center' class='header_laporan'>No</td>
        <td width='200' align='center' class='header_laporan'>Quotation No </td>
        <td width='60' rowspan='3' align='center' class='header_laporan'>Format </td>
        <td width='60' rowspan='3' align='center' class='header_laporan'>Trans Date<br></td>
        <td width='100' align='center' class='header_laporan'>Type of Ins </td>
        <td width='100' align='center' class='header_laporan'>Account Executive </td>
        <td width='60' align='center' class='header_laporan'>Period From</td>
        <td width='200' align='center' class='header_laporan'>Occupation of Risk </td>
        <td width='40' align='center' rowspan='3' class='header_laporan'>Curr</td>
        <td width='90' align='center' rowspan='3' class='header_laporan'>Sum Insured </td>
        <td width='50' align='center' rowspan='3' class='header_laporan'>Prem.Rate</td>
        <td width='50' align='center' rowspan='3' class='header_laporan'>Brok.Rate </td>
        <td width='90' align='center' rowspan='3' class='header_laporan'>Premium</td>
        <td width='90' align='center' rowspan='3' class='header_laporan'>Brokerage</td>
      </tr>
      <tr bgcolor='#dbeef3'>
        <td align='center' class='header_laporan'>Insured </td>
        <td align='center' class='header_laporan'>Status </td>
        <td align='center' class='header_laporan'>Signer </td>
        <td align='center' class='header_laporan'>Period To</td>
        <td align='center' class='header_laporan'>Location of Risk</td>
        </tr>
      <tr bgcolor='#dbeef3'>
        <td align='center' class='header_laporan'>Insurer</td>
        <td align='center' class='header_laporan'>Object of Loss</td>
        <td align='center' class='header_laporan'>&nbsp;</td>
        <td align='center' class='header_laporan'>Remark</td>
        <td align='center' class='header_laporan'>&nbsp;</td>
        </tr>";
		$sql="select a.no_quo,b.nama as nama_cust,e.nama as nama_vendor,d.nama as nama_pic,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_pic,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee,a.ppn,a.pph,
	   a.occup,a.lokasi,a.objek,a.ttd,a.catat,a.kode_tipe,a.lokasi,a.kode_cust,c.kode_vendor
from sju_quo_m a 
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join sju_pic d on a.kode_pic=d.kode_pic and a.kode_lokasi=d.kode_lokasi
inner join sju_quo_vendor c on a.no_quo=c.no_quo and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor e on c.kode_vendor=e.kode_vendor and c.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_quo";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_quo</td>
			<td class='isi_laporan'>QS$row->kode_tipe</td>
			<td class='isi_laporan'>$row->tanggal</td>
			<td class='isi_laporan'>$row->kode_tipe</td>
			<td class='isi_laporan'>$row->kode_pic - $row->nama_pic</td>
			<td class='isi_laporan'>$row->tgl_mulai</td>
			<td class='isi_laporan'>$row->occup</td>
			<td class='isi_laporan'>$row->kode_curr</td>
			<td class='isi_laporan' align='right'>".number_format($row->total,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->p_premi,4,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->p_fee,4,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n_premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n_fee,2,',','.')."</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td class='isi_laporan' colspan='2'>$row->kode_cust - $row->nama_cust</td>
		
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td class='isi_laporan'>$row->ttd</td>
			<td class='isi_laporan'>$row->tgl_selesai</td>
			
			<td class='isi_laporan'>$row->lokasi</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td class='isi_laporan' colspan='2'>$row->kode_vendor - $row->nama_vendor</td>
			
			<td>&nbsp;</td>
			<td class='isi_laporan' colspan='2'>$row->objek</td>
			
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		  </tr>";
			$i=$i+1;
		}
    echo "</table></td>
  </tr>
</table>";
	
		echo "</div>";
		return "";
		
	}
	
}
?>
