<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tak_rptTakTerima extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_terima)
		from takterima_m a
inner join lokasi b on a.kode_lokkirim=b.kode_lokasi $this->filter";
		
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
		$sql="select a.no_terima,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_lokkirim,b.nama as nama_lokasi,a.no_kirim,a.keterangan,c.kota,
			  a.nik_buat,a.nik_setuju,d.nama as nama_buat,e.nama as nama_setuju
from takterima_m a
inner join lokasi b on a.kode_lokkirim=b.kode_lokasi
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
inner join  karyawan d on a.nik_buat=d.nik
inner join  karyawan e on a.nik_setuju=e.nik $this->filter
order by a.no_terima";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TAK TERIMA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No Terima</td>
        <td width='379' class='header_laporan'>: $row->no_terima </td>
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
        <td class='header_laporan'>Lokasi Asal </td>
        <td class='header_laporan'>: $row->kode_lokkirim - $row->nama_lokasi </td>
      </tr>
     <tr >
        <td class='header_laporan'>No Kirim </td>
        <td class='header_laporan'>: $row->no_kirim</td>
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
        <td width='150' class='header_laporan'>Nama PP </td>
		<td width='200' class='header_laporan'>Keterangan</td>
		<td width='90' class='header_laporan'>Debet</td>
        <td width='90' class='header_laporan'>Kredit</td>
        </tr>";
	  $sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from takterima_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
where a.no_terima='$row->no_terima' order by a.kode_akun";
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
        <td class='isi_laporan'>$row1->nama_pp</td>
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
        </tr>
		";
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
                <td>$row->nama_setuju</td>
                <td>$row->nama_buat</td>
              </tr>
              <tr align='center'>
                <td>$row->nik_setuju</td>
                <td>$row->nik_buat</td>
              </tr>
          </table></td>
        </tr>
       </table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
