<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_droping_rptDropingApp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_spb) from spb_m a $this->filter ";
		
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
		$sql="select  a.no_spb,a.no_bukti as no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.tanggal,a.keterangan,a.no_bukti,
	   a.nik_buat,d.nama as nama_buat,d.jabatan as jabatan_buat,a.nik_sah,e.nama as nama_setuju,e.jabatan as jabatan_setuju, c.kota
from spb_m a
inner join lokasi c on a.kode_lokasi = c.kode_lokasi 
left join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_sah=e.nik and a.kode_lokasi=e.kode_lokasi  $this->filter
order by a.no_spb ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='0' cellspacing='2' cellpadding='1' width ='800'>
    <td ><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
		 <tr>
                <td colspan='2' class='lokasi_laporan' align='center'>PENGAJUAN REIMBURSE DROPING</td>
                </tr>
      <tr>
        <td width='17%' class='header_laporan'>No Bukti</td>
        <td width='73%' class='header_laporan'>: $row->no_spb </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Pengajuan Droping </td>
        <td class='header_laporan'>: $row->no_bukti </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal1 </td>
      </tr>
     
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='100' class='header_laporan'>No Bukti</td>
        <td width='90' class='header_laporan'>No Dokumen</td>
        <td width='60' class='header_laporan'>Tanggal </td>
        <td width='250' class='header_laporan'>Keterangan</td>
        <td width='60' class='header_laporan'>Modul</td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	
	  $sql1="select b.no_kas,a.no_dokumen,date_format(c.tanggal,'%d/%m/%Y') as tanggal,c.keterangan,c.modul,case c.dc when 'D' then -c.nilai else c.nilai end as nilai
from yk_kasdrop_d a
inner join yk_kasaju_d b on a.no_dokumen=b.no_kasaju and a.kode_loktuj=b.kode_lokasi
inner join kas_j c on b.no_kas=c.no_kas and b.kode_lokasi=c.kode_lokasi and b.nu=c.no_urut and b.kode_bank=c.kode_bank
where a.no_spb='$row->no_spb' order by a.no_kas ";
	  $rs1 = $dbLib->execute($sql1);
	  $tot=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$nilai=number_format($row1->nilai,0,",",".");
		$tot=$tot+$row1->nilai;
      echo "<tr>
        <td class='isi_laporan' align='center'>$row1->no_kas</td>
        <td class='isi_laporan'>$row1->no_dokumen</td>
        <td class='isi_laporan'>$row1->tanggal</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan' align='center'>$row1->modul</td>
		<td align='right' class='isi_laporan'>$nilai</td>
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>$ntot</td>
        
        </tr>
		";
	
    echo "</table></td>
  </tr>
  <tr>
    <td class='lokasi_laporan'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
     
      <tr>
        <td class='header_laporan'>&nbsp;</td>
        <td class='header_laporan'>".$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td width='50%' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='60%' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nama_setuju</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->jabatan_setuju</td>
        <td class='header_laporan'>$row->jabatan_buat</td>
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
