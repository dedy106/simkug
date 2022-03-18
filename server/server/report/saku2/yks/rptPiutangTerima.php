<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangTerima extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_valid) from yk_valid_m a $this->filter ";
		
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
		$sql="select a.no_valid,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan
from yk_valid_m a $this->filter
order by a.no_valid ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TAK TERIMA PIUTANG",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='10'><table   border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No TAK Terima</td>
        <td width='379' class='header_laporan'>: $row->no_valid </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal </td>
      </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='50' class='header_laporan'>Lok Kirim </td>
        <td width='80' class='header_laporan'>Akun</td>
        <td width='200' class='header_laporan'>Nama Akun </td>
        <td width='200' class='header_laporan'>Keterangan</td>
		<td width='50' class='header_laporan'>Jenis</td>
        <td width='80' class='header_laporan'>Debet</td>
		<td width='80' class='header_laporan'>Kredit</td>
        <td width='80' class='header_laporan'>No TAK Kirim</td>
        <td width='60' class='header_laporan'>Tgl Kirim </td>
      </tr>";
	  $sql1="
select a.kode_loktuj,a.akun_tak,b.nama as nama_akun,a.keterangan,a.kode_lokasi,a.nilai,a.no_valid,date_format(c.tanggal,'%d/%m/%Y') as tgl_kirim,
       case a.dc when 'D' then a.nilai else 0 end as debet,case a.dc when 'C' then a.nilai else 0 end as kredit,a.jenis
from yk_valid_tak a
inner join masakun b on a.akun_tak=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join yk_valid_m c on a.no_valid=c.no_valid and a.kode_lokasi=c.kode_lokasi
where a.no_terima='$row->no_valid' 
order by a.kode_loktuj";
	  $rs1 = $dbLib->execute($sql1);
	  $debet=0;$kredit=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$debet=$debet+$row1->debet;
		$kredit=$kredit+$row1->kredit;
      echo "<tr>
        <td class='isi_laporan' align='center'>$row1->kode_lokasi</td>
        <td class='isi_laporan'>$row1->akun_tak</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
        <td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan'>$row1->jenis</td>
        <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
        <td class='isi_laporan'>$row1->no_valid</td>
        <td class='isi_laporan'>$row1->tgl_kirim</td>
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td colspan='5' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>".number_format($debet,0,",",".")."</td>
		<td align='right' class='isi_laporan'>".number_format($kredit,0,",",".")."</td>
        <td colspan='2'>&nbsp;</td>
        </tr>";
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
