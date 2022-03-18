<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_droping_rptDropingKirim extends server_report_basic
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
		$sql="select a.no_kasaju,a.kode_lokasi,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_bank,b.nama as nama_bank,a.kode_pp,c.nama as nama_pp,a.keterangan,a.nilai,
		a.nik_buat,a.nik_setuju,d.nama as nama_buat,e.nama as nama_setuju,f.kota,d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju
from yk_kasaju_m a
inner join bank_rek b on a.kode_bank=b.kode_rek and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik
inner join karyawan e on a.nik_setuju=e.nik
inner join lokasi f on a.kode_lokasi=f.kode_lokasi 
$this->filter
order by a.no_kasaju ";
		
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
        <td colspan='8'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
		 <tr>
                <td colspan='2' class='lokasi_laporan' align='center'>PENGAJUAN DROPING</td>
                </tr>
      <tr>
        <td width='17%' class='header_laporan'>No Bukti</td>
        <td width='73%' class='header_laporan'>: $row->no_kasaju </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tgl </td>
      </tr>
	   <tr>
        <td class='header_laporan'>Kode PP</td>
        <td class='header_laporan'>: $row->kode_pp - $row->nama_pp</td>
      </tr>
     <tr>
        <td class='header_laporan'>Bank</td>
        <td class='header_laporan'>: $row->kode_bank - $row->nama_bank </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
	    <td width='30' class='header_laporan'>No</td>
        <td width='80' class='header_laporan'>No Bukti</td>
        <td width='60' class='header_laporan'>Tanggal </td>
        <td width='250' class='header_laporan'>Keterangan</td>
        <td width='60' class='header_laporan'>Modul</td>
        <td width='90' class='header_laporan'>Nilai</td>
      </tr>";
	
	  $sql1="select a.no_kas,a.kode_lokasi,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,b.modul,b.dc,b.nilai
from yk_kasaju_d a 
inner join kas_j b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.nu=b.no_urut and a.kode_bank=b.kode_bank
where a.no_kasaju='$row->no_kasaju' and a.kode_lokasi='$row->kode_lokasi'
order by b.tanggal,a.no_kas ";
	
	  $rs1 = $dbLib->execute($sql1);
	  $nilai=0;$i=1;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$nilai+=$row1->nilai;
      echo "<tr>
		 <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan' >$row1->no_kas</td>
        <td class='isi_laporan'>$row1->tgl</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan' align='center'>$row1->modul</td>
		<td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
			$i+=1;
	  }
	   echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>".number_format($nilai,0,",",".")."</td>
        
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
