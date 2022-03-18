<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptUsulan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
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
		$jenis=$tmp[0];
		
		$nama_file="usulan.xls";
		if ($jenis=="Excel")
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
		$sql="select a.no_usul,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_rkm,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_rkm,a.tahun,a.keterangan,
a.kode_drk,e.nama as nama_drk,f.kode_peruntukan,f.kode_gedung,f.kode_ruang,f.kode_lab,g.nama as nama_peruntukan,h.nama as nama_gedung,i.nama as nama_ruang		
from agg_usul_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
left join agg_rkm d on a.kode_rkm=d.kode_rkm and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
inner join agg_drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and a.tahun=e.tahun
inner join log_usul_m f on a.no_usul=f.no_usul and a.kode_lokasi=f.kode_lokasi
left join log_peruntukan g on f.kode_peruntukan=g.kode_peruntukan and f.kode_lokasi=g.kode_lokasi
left join log_gedung h on f.kode_gedung=h.kode_gedung and f.kode_lokasi=h.kode_lokasi
left join log_ruang i on f.kode_ruang=i.kode_ruang and f.kode_lokasi=i.kode_lokasi
$this->filter
order by a.no_usul";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("usulan anggaran",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='34' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan' width='114'>No Bukti</td>
        <td class='header_laporan'>:&nbsp;$row->no_usul</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Keteragan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan' width='114'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Akun</td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>
      
        <tr>
          <td class='header_laporan'>RKM</td>
          <td class='header_laporan'>:&nbsp;$row->kode_rkm -&nbsp; $row->nama_rkm</td>
        </tr>
		 <tr>
          <td class='header_laporan'>DRK</td>
          <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
        </tr>
        <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
        </tr>
        <tr>
        <td class='header_laporan'>Gedung</td>
        <td class='header_laporan'>:&nbsp;$row->kode_gedung -&nbsp; $row->nama_gedung</td>
        </tr>
        <tr>
        <td class='header_laporan'>Ruangan</td>
        <td class='header_laporan'>:&nbsp;$row->kode_ruang -&nbsp; $row->nama_ruang</td>
        </tr>
       
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='150' align='center' class='header_laporan'>Uraian Barang</td>
	<td width='100' align='center' class='header_laporan'>Spesifikasi</td>
    <td width='40' align='center' class='header_laporan'>Vol</td>
    <td width='40' align='center' class='header_laporan'>Satuan</td>
    <td width='80' align='center' class='header_laporan'>Harga Satuan</td>
    <td width=40 align='center' class='header_laporan'>Bulan</td>
    <td width=80 align='center' class='header_laporan'>Total</td>
    <td width=150 align='center' class='header_laporan'>Keterangan</td>
    <td width=60 align='center' class='header_laporan'>Prioritas</td>
  </tr>
  ";
			$sql1="select *,substring(periode,5,2) as bulan from log_usul_d a where no_usul='$row->no_usul'
            order by a.nu ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$harga=0;
			$vol=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total=$total+$row1->total;
				$vol=$vol+$row1->vol;
				$harga=$harga+$row1->harga;
				echo "<tr>
                <td align='center' class='isi_laporan'>$j</td>
                <td  class='isi_laporan'>$row1->uraian</td>
                <td  class='isi_laporan'>$row1->spek</td>
                <td align='right' class='isi_laporan'>".number_format($row1->vol,0,",",".")."</td>
                <td  class='isi_laporan'>$row1->sat</td>
                <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
                <td  class='isi_laporan'>$row1->bulan</td>
                <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
                <td  class='isi_laporan'>$row1->keterangan</td>
                <td  class='isi_laporan' align='center'>$row1->prioritas</td>
                </tr>";		
				$j=$j+1;
			}
			echo "<tr>
            <td colspan='3' align='center'  class='header_laporan'>Total</td>
            <td align='right' class='isi_laporan'>".number_format($vol,0,",",".")."</td>
            <td align='right' class='isi_laporan'></td>
            <td align='right' class='isi_laporan'>".number_format($harga,0,",",".")."</td>
            <td align='right' class='isi_laporan'></td>
            <td align='right' class='isi_laporan'>".number_format($total,0,",",".")."</td>
            <td align='right' class='isi_laporan' colspan='2'></td>
            </tr></table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
