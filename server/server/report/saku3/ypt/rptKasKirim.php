<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_rptKasKirim extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$sql="select a.no_kas,a.no_dokumen,a.tanggal,convert(varchar(20),a.tanggal,103) as tgl,a.no_link as kode_loktuj,b.nama as nama_lokasi,a.keterangan,b.kota,
		a.nik_buat,a.nik_app,d.nama as nama_buat,e.nama as nama_app
from kas_m a
inner join lokasi b on a.no_link=b.kode_lokasi
left join  karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
left join  karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi
$this->filter
order by a.no_kas";
		$rs = $dbLib->execute($sql);
		
		
		$AddOnLib=new server_util_AddOnLib();	 
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN DROPING KIRIM",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No Kirim</td>
        <td width='379' class='header_laporan'>: $row->no_kas </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
      <tr >
        <td class='header_laporan'>Lokasi Tujuan </td>
        <td class='header_laporan'>: $row->kode_loktuj - $row->nama_lokasi </td>
      </tr>
     
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='80' class='header_laporan'>Kode Akun</td>
        <td width='200' class='header_laporan'>Nama Akun </td>
		<td width='60' class='header_laporan'>Kode PP</td>
        <td width='70' class='header_laporan'>Kode DRK</td>
		<td width='200' class='header_laporan'>Keterangan</td>
		<td width='90' class='header_laporan'>Debet</td>
        <td width='90' class='header_laporan'>Kredit</td>
        </tr>";
	  $sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from kas_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_kas='$row->no_kas' order by a.kode_akun";
	
	  $rs1 = $dbLib->execute($sql1);
	  $debet=0;$kredit=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$debet=$debet+$row1->debet;
		$kredit=$kredit+$row1->kredit;
      echo "<tr>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
		<td class='isi_laporan'>$row1->kode_pp</td>
        <td class='isi_laporan'>$row1->kode_drk</td>
		<td class='isi_laporan'>$row1->keterangan</td>
        <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
        
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>".number_format($debet,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($kredit,0,",",".")."</td>
        </tr>";
       echo "
	<tr>
          <td colspan='7' align='right'><table width='431' border='0' cellspacing='2' cellpadding='1'>
				<tr align='center'>
                <td align='center'>&nbsp;</td>
                <td align='left'>&nbsp; </td>
              </tr>
              <tr align='center'>
                <td colspan='2' align='center'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
              </tr>
              <tr align='center'>
                <td width='203'>Disetujui </td>
                <td width='218'>Dibuat </td>
              </tr>
              <tr>
                <td height='50'>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr align='center'>
                <td>$row->nama_app</td>
                <td>$row->nama_buat</td>
              </tr>
              <tr align='center'>
                <td>$row->nik_app</td>
                <td>$row->nik_buat</td>
              </tr>
          </table></td>
        </tr>";
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
