<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrPlacingList extends server_report_basic
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
		$nama_file="placing_".$periode.".xls";
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
		$i=1;
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($tipe=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($tipe=="All")
		{
			$nama_periode="Semua Periode";
		}
		echo "<div align='center'>"; 
		echo "<table width='1300' border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='1300' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
          <td width='668'>&nbsp;</td>
          <td width='212' align='right' class='style16'>ISCLOSL</td>
        </tr>
        <tr>
          <td class='style16'>Jakarta</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td align='center' class='style16'>LAPORAN PLACING LIST</td>
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
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#dbeef3'>
	    <td width='25' class='header_laporan'>No</td>
        <td width='200' class='header_laporan'>Placing No</td>
        <td width='80' class='header_laporan'>Insured</td>
        <td width='80' class='header_laporan'>Trans Date</td>
        <td width='120' class='header_laporan'>Policy No</td>
        <td width='60' class='header_laporan'>Policy Date</td>
        <td width='40' rowspan='4' class='header_laporan'>Curr</td>
        <td width='90' class='header_laporan'>Sum Insured </td>
        <td width='90' class='header_laporan'>Premium rate</td>
        <td width='90' class='header_laporan'>Premium</td>
        <td width='90' class='header_laporan'>Prem eq rate </td>
        <td width='90' class='header_laporan'>Premium eq</td>
        <td width='150' class='header_laporan'>Occupation of Risk</td>
        <td width='150' class='header_laporan'>DN/CN/Inv Ins</td>
      </tr>
      <tr align='center' bgcolor='#dbeef3'>
		<td>&nbsp;</td>
        <td class='header_laporan'>Type Of Insurance</td>
        <td class='header_laporan'>Group</td>
        <td class='header_laporan'>Acc Exc</td>
        <td class='header_laporan'>Endorsement No</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='header_laporan'>Brokerage rate </td>
        <td class='header_laporan'>Brokerage</td>
        <td class='header_laporan'>roke eq rate</td>
        <td class='header_laporan'>Brokerage eq</td>
        <td class='header_laporan'>Location of Risk</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center' bgcolor='#dbeef3'>
		<td>&nbsp;</td>
        <td class='header_laporan'>Insured</td>
        <td>&nbsp;</td>
        <td class='header_laporan'>Status</td>
        <td class='header_laporan'>Certificate/Delc No</td>
        <td>Format Code</td>
        <td>&nbsp;</td>
        <td class='header_laporan'>Document directory</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td class='header_laporan'>Signer</td>
        <td class='header_laporan'>Ex Policy No</td>
        <td class='header_laporan'>QQ Name</td>
      </tr>
      <tr align='center bgcolor='#dbeef3'>
		<td>&nbsp;</td>
        <td class='header_laporan'>Object of Loss</td>
        <td>&nbsp;</td>
        <td class='header_laporan'> Remark</td>
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
		$sql="select a.no_placing,date_format(a.tanggal,'%d/%m/%Y') as tanggal,
	   date_format(c.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(c.tgl_selesai,'%d/%m/%Y') as tgl_selesai,c.kode_curr,c.total,c.p_premi,c.n_premi,c.p_fee,c.n_fee,c.ppn,c.pph,
	   c.occup,c.lokasi,c.objek,c.ttd,c.catat,c.kode_curr,c.kode_pic,f.nama as nama_pic,g.nama as nama_cust, 
	   e.no_polis,date_format(e.tanggal,'%d/%m/%Y') as tgl_polis,h.nama as nama_tipe,a.kode_tipe
from sju_placing_m a
inner join sju_placing_d b on a.no_placing=b.no_placing and a.kode_lokasi=b.kode_lokasi
inner join sju_quo_m c on b.no_bukti=c.no_quo and b.kode_lokasi=c.kode_lokasi
left join sju_polis_d d on a.no_placing=d.no_bukti and a.kode_lokasi=d.kode_lokasi
left join sju_polis_m e on d.no_polis=e.no_polis and d.kode_lokasi=e.kode_lokasi
inner join sju_pic f on c.kode_pic=f.kode_pic and c.kode_lokasi=f.kode_lokasi
inner join sju_cust g on c.kode_cust=g.kode_cust and c.kode_lokasi=g.kode_lokasi
inner join sju_tipe h on a.kode_tipe=h.kode_tipe and a.kode_lokasi=h.kode_lokasi
";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		  echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_placing</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>$row->tanggal</td>
			<td class='isi_laporan'>$row->no_polis</td>
			<td class='isi_laporan'>$row->tgl_polis</td>
			<td class='isi_laporan'>$row->kode_curr</td>
			<td class='isi_laporan' align='right'>".number_format($row->total,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->p_premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n_premi,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(0,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format(0,2,',','.')."</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td class='isi_laporan'>$row->kode_tipe - $row->nama_tipe</td>
			<td>&nbsp;</td>
			<td class='isi_laporan'>$row->kode_pic - $row->nama_pic</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td class='isi_laporan' align='right'>".number_format($row->p_fee,2,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->n_fee,2,',','.')."</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td class='isi_laporan'>$row->nama_cust</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
			<td class='isi_laporan'>$row->objek</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td>&nbsp;</td>
			<td class='isi_laporan'>Detail Item/Coverage :</td>
			<td colspan='12'>&nbsp;</td>
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
