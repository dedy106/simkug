<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_fitnes_rptKunjungan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		
		
		$sql="select a.no_kunj,a.kode_lokasi,a.kode_agg,b.nama as nama_agg,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		dbo.fnHari(a.tanggal) as hari,(year(a.tanggal)-year(b.tgl_lahir)) as umur
from fi_kunj_m a
inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_kunj";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='1100' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150'></td>
        <td width='850'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='50'>Nama</td>
            <td width='400'>: $row->kode_agg - $row->nama_agg </td>
            <td width='50'>Hari</td>
            <td width='350'>: $row->hari </td>
          </tr>
          <tr>
            <td>Umur</td>
            <td>: ".number_format($row->umur,0,',','.')." </td>
            <td>Tanggal</td>
            <td>: $row->tgl </td>
          </tr>
          <tr>
            <td colspan='4' align='center'>No Kunjungan : $row->no_kunj </td>
            </tr>
        </table></td>
        <td width='100' align='right' valign='middle'>Form-2</td>
      </tr>
    </table></td>
  </tr>
  <tr >
    <td><table width='1100' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td rowspan='2' align='center' width='30' class='header_laporan'>No.</td>
        <td rowspan='2' align='center' width='200' class='header_laporan'>Nama Gerakan</td>
        <td rowspan='2' align='center' width='60' class='header_laporan'>Beban Maks</td>
        <td rowspan='2' align='center' width='60' class='header_laporan'>Beban Latihan</td>
        <td rowspan='2' align='center' width='60' class='header_laporan'>Berat Alat</td>
        <td colspan='3' align='center' width='60' class='header_laporan'>Rencana</td>
        <td colspan='3' align='center' width='60' class='header_laporan'>Realisasi</td>
        <td align='center' width='150' class='header_laporan'>Keterangan</td>
        <td rowspan='2' align='center' width='60' class='header_laporan'>Paraf</td>
      </tr>
      <tr bgcolor='#CCCCCC'>
        <td align='center' class='header_laporan'>Set-1</td>
        <td align='center' class='header_laporan'>Set-2</td>
        <td align='center' class='header_laporan'>Set-3</td>
        <td align='center' class='header_laporan'>Set-1</td>
        <td align='center' class='header_laporan'>Set-2</td>
        <td align='center' class='header_laporan'>Set-3</td>
        <td align='center' class='header_laporan'>Efek thd tubuh &amp; Kelhan</td>
        </tr>";
	$sql="select a.kode_beban,b.nama,b.keterangan,b.sat, 
	   a.beban_max,a.beban_latih,a.berat,a.set1	,a.set2,a.set3,a.hasil1,a.hasil2,a.hasil3,a.next1,a.next2,a.next3
from fi_kunj_beban a
inner join fi_beban b on a.kode_beban=b.kode_beban and a.kode_lokasi=b.kode_lokasi
where a.no_kunj='$row->no_kunj' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_beban";
	$rs1=$dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td class='isi_laporan' align='center' >$i</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan' align='center'>".number_format($row1->beban_max,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->beban_latih,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->berat,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->set1,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->set2,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->set3,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->hasil1,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->hasil2,0,',','.')."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->hasil3,0,',','.')."</td>
        <td class='isi_laporan'>$row1->ket</td>
		<td class='isi_laporan'>&nbsp;</td>
      </tr>";
		$i+=1;
	}
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='header_laporan'>No</td>
        <td width='300' align='center' class='header_laporan'>Nama Parameter </td>
        <td width='100' align='center' class='header_laporan'>Satuan</td>
        <td width='150' align='center' class='header_laporan'>Pengukuran Awal </td>
        <td width='150' align='center' class='header_laporan'>Pengukuran Akhir </td>
      </tr>";
    $sql="select a.kode_param,b.nama,a.hasil_bef,a.hasil_aft,b.satuan
from fi_kunj_d a
inner join fi_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
where a.no_kunj='$row->no_kunj' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_param";
	
	$rs1=$dbLib->execute($sql);
	$i=1;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{  
	  echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->satuan</td>
        <td class='isi_laporan'>$row1->hasil_bef</td>
        <td class='isi_laporan'>$row1->hasil_aft</td>
      </tr>";
		$i+=1;
	}
    echo "</table></td>
  </tr>
  <tr>
    <td height='50'>Catatan Instruktur  :  </td>
  </tr>
</table><br>";
			
			
		}
	echo "</td>
  </tr>
</table>";
	
		return "";
		
	}
	
}
?>
