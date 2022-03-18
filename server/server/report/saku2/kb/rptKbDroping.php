<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbDroping extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_kas) from kas_m a
inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter ";
		
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
		$sql="select a.no_kas,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.akun_kb,b.nama as nama_akun,a.no_bg,a.keterangan
from kas_m a
inner join masakun b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter
order by a.no_kas ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN DROPING",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table width='500'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No Kas</td>
        <td width='379' class='header_laporan'>: $row->no_kas </td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>: $row->tanggal </td>
      </tr>
      <tr >
        <td class='header_laporan'>Akun KasBank </td>
        <td class='header_laporan'>: $row->akun_kb - $row->nama_akun </td>
      </tr>
      <tr>
        <td class='header_laporan'>No GB </td>
        <td class='header_laporan'>: $row->no_bg </td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>
    </table></td>
	  </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='50' class='header_laporan'>Lok Terima </td>
        <td width='80' class='header_laporan'>Akun</td>
        <td width='200' class='header_laporan'>Nama Akun </td>
        <td width='200' class='header_laporan'>Keterangan</td>
        <td width='90' class='header_laporan'>Nilai</td>
        <td width='80' class='header_laporan'>No Kas Terima</td>
        <td width='60' class='header_laporan'>Tgl Terima </td>
      </tr>";
	  $sql1="select a.kode_loktuj,a.akun_tak,b.nama as nama_akun,a.keterangan,a.nilai,a.no_kasterima,date_format(c.tanggal,'%d/%m/%Y') as tgl_terima
from yk_kasdrop_d a
inner join masakun b on a.akun_tak=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kasterima=c.no_kas and a.kode_loktuj=c.kode_lokasi
where a.no_kas='$row->no_kas' order by a.kode_loktuj";
	  $rs1 = $dbLib->execute($sql1);
	  $tot=0;
      while ($row1 = $rs1->FetchNextObject($toupper=false))
	  {
		$nilai=number_format($row1->nilai,0,",",".");
		$tot=$tot+$row1->nilai;
      echo "<tr>
        <td class='isi_laporan' align='center'>$row1->kode_loktuj</td>
        <td class='isi_laporan'>$row1->akun_tak</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
        <td class='isi_laporan'>$row1->keterangan</td>
        <td align='right' class='isi_laporan'>$nilai</td>
        <td class='isi_laporan'>$row1->no_kasterima</td>
        <td class='isi_laporan'>$row1->tgl_terima</td>
      </tr>";
	  }
	  $ntot=number_format($tot,0,",",".");
      echo "<tr>
        <td colspan='4' align='right' class='isi_laporan'>Total</td>
        <td align='right' class='isi_laporan'>$ntot</td>
        <td colspan='2'>&nbsp;</td>
        </tr>";
    echo "</table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
