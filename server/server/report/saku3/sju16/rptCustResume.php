<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptCustResume extends server_report_basic
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
		$sql="select a.kode_lokasi,a.kode_cust, a.nama, a.alamat, a.no_tel,a.inisial, a.email, a.npwp, a.pic, a.alamat2,a.kode_segmen,a.kota,a.tgl_lahir,a.tempat_lahir,a.no_ktp,a.tgl_aktif,
	   b.nama as nama_segmen,a.no_fax
from sju_cust a
inner join pp b on a.kode_segmen=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.kode_cust";
	
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		if ($jenis=="Word")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Transfer-Encoding: binary ");
			header("Content-type: application/vnd.ms-word");
			header("Content-Disposition: attachment;Filename=polis.doc");
		}
		echo "<div align='center'>";
    
    
		
	$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='judul_bukti'>RESUME DATA TERTANGGUNG</td>
  </tr>
  
  <tr>
    <td>&nbsp;</td>
  </tr>
  
 
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='196' class='isi_bukti'>Nama</td>
        <td width='494' class='isi_bukti'>: $row->nama </td>
      </tr>
      <tr>
        <td class='isi_bukti'>PP Ttg/Segmen</td>
        <td class='isi_bukti'>: $row->nama_segmen </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Alamat</td>
        <td class='isi_bukti'>: $row->alamat</td>
      </tr>
      <tr>
        <td class='isi_bukti'>Kota</td>
        <td class='isi_bukti'>: $row->kota </td>
      </tr>
      <tr>
        <td  class='isi_bukti'>No Telepon</td>
        <td  class='isi_bukti'>: $row->no_tel </td>
      </tr>
      <tr>
        <td class='isi_bukti'>No Faximile</td>
        <td class='isi_bukti'>: $row->no_fax </td>
      </tr>
      <tr>
        <td class='isi_bukti'>KTP</td>
        <td class='isi_bukti'>: $row->no_ktp</td>
      </tr>
      <tr>
        <td class='isi_bukti'>NPWP</td>
        <td class='isi_bukti'>: $row->npwp </td>
      </tr>
      <tr>
        <td class='isi_bukti'>ID Lainnya</td>
        <td class='isi_bukti'>: $row->id_lain </td>
      </tr>
      <tr>
        <td class='isi_bukti'>No ID</td>
        <td class='isi_bukti'>: $row->no_id </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Pimpinan</td>
        <td class='isi_bukti'>: </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Jenis Usaha</td>
        <td class='isi_bukti'>:   </td>
      </tr>
      <tr>
        <td class='isi_bukti'>Contact Person</td>
        <td class='isi_bukti'>: $row->pic </td>
      </tr>
	  <tr>
        <td class='isi_bukti'>Departemen</td>
        <td class='isi_bukti'>: </td>
      </tr>
	  <tr>
        <td class='isi_bukti'>Email</td>
        <td class='isi_bukti'>: $row->email</td>
      </tr>
	  <tr>
        <td class='isi_bukti'>Hand Phone</td>
        <td class='isi_bukti'>: $row->no_hp</td>
      </tr>
	  <tr>
        <td class='isi_bukti'>Tempat Lahir</td>
        <td class='isi_bukti'>: $row->tempat_lahir</td>
      </tr>
	  <tr>
        <td class='isi_bukti'>Tanggl Lahir/Berdiri</td>
        <td class='isi_bukti'>: $row->tgl_lahir</td>
      </tr>
    </table></td>
  </tr>
 
 
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak' >
      <tr>
        <td colspan='8' class='style16' height=23>&nbsp;Polis SJU</td>
      </tr>
      <tr>
        <td width='50' align='center' class='header_laporan'>Tahun</td>
        <td width='150' align='center' class='header_laporan'>Nomer Polis</td>
        <td width='60' align='center' class='header_laporan'>Periode Polis</td>
        <td width='100' align='center' class='header_laporan'>COB</td>
        <td width='80' align='center' class='header_laporan'>Premi</td>
		<td width='80' align='center' class='header_laporan'>Brokerage</td>
		<td width='60' align='center' class='header_laporan'>Status</td>
		<td width='120' align='center' class='header_laporan'>AM</td>
      </tr>";
    $sql="select a.no_polis,a.no_dok,substring(a.periode,1,4) as tahun,a.periode,a.kode_tipe,a.n_premi,a.n_fee,a.kode_pic,b.nama as nama_pic,
    isnull(g.no_bukti,'Unpaid') as no_kas
from sju_polis_m a 
inner join sju_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_termin c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi
left join sju_polisbayar_d g on c.no_polis=g.no_polis and c.no_bill=g.no_bill and c.kode_lokasi=g.kode_lokasi and c.ke=g.ke and c.kode_vendor=g.kode_vendor
where a.kode_lokasi='$row->kode_lokasi' and a.kode_cust='$row->kode_cust'
order by a.periode ";
	
		$rs1=$dbLib->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      $sts="Paid";
      if ($row1->no_kas=="-")
      {
        $sts="Unpaid";
      }
      echo "<tr>
        <td class='isi_laporan' >$row1->tahun</td>
        <td class='isi_laporan' >$row1->no_dok</td>
        <td class='isi_laporan' >$row1->periode</td>
        <td class='isi_laporan' >$row1->kode_tipe</td>
        <td class='isi_laporan' align='right'>".number_format($row1->n_premi,2,',','.')."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->n_fee,2,',','.')."</td>
        <td class='isi_laporan' align='center'>$sts</td>
        <td class='isi_laporan'>$row1->nama_pic</td>
      </tr>";
		}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak' >
      <tr>
        <td colspan='4' class='style16' height=23>&nbsp;Informasi Dokumen</td>
      </tr>
      <tr>
        <td width='80' align='center' class='header_laporan'>Jenis</td>
        <td width='420' align='center' class='header_laporan'>Dokumen</td>
        <td width='100' align='center' colspan='2' class='header_laporan'>Action</td>
      </tr>";
      $sql="select a.kode_jenis,a.no_gambar 
      from sju_cust_dok a
      where a.kode_lokasi='$row->kode_lokasi' and a.kode_cust='$row->kode_cust'
      order by a.kode_jenis ";
    
      $rs1=$dbLib->execute($sql);
      while ($row1 = $rs1->FetchNextObject($toupper=false))
      {
          $view='media/'.$row1->no_gambar;
      echo "<tr>
        <td class='isi_laporan'>$row1->kode_jenis</td>
        <td class='isi_laporan'>$row1->no_gambar</td>
        <td class='isi_laporan' align='center'><a href='$view' target='_blank'>View</a></td>
        <td class='isi_laporan' align='center'><a href='$view' download>Download</a></td>
      </tr>";
      }
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  

 
 
  <tr>
    <td class='isi_laporan' ><i>Generated by SIM SJU tanggal ".date('d/m/Y h:i:s')." </i></td>
  </tr>
  
</table>";
		echo "<DIV style='page-break-after:always'></DIV>";
		}
		return "</div>";
		
	}
	
}
?>
