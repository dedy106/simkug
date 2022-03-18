<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptDocKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select count(a.no_depo)
		from inv_depo_m a
$this->filter ";
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kartu=$tmp[2];
		$sql="select a.no_depo,a.kode_lokasi,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.modul,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
	   a.jml_hari,a.basis,a.p_bunga,a.nilai,
	   b.nama as nama_bank,c.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas,c.keterangan as ket_kas
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi 
$this->filter order by a.no_depo";
		$tmp_periode="";
		if ($kartu!="kartu")
		{
			$tmp_periode=" and b.periode<='$periode' ";
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu deposito",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>No Bukti</td>
        <td width='360' class='header_laporan'>: $row->no_depo</td>
      </tr>
	   <tr>
        <td class='header_laporan'>No Dokumen</td>
        <td class='header_laporan'>: $row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tanggal</td>
        <td  class='header_laporan'>: $row->tanggal</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Bank </td>
        <td class='header_laporan'>: $row->nama_bank</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tanggal Mulai</td>
        <td class='header_laporan'>: $row->tgl_mulai</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Tanggal Selesai </td>
        <td class='header_laporan'>: $row->tgl_selesai</td>
      </tr>
	 
	  <tr>
        <td class='header_laporan'>Jumlah Hari </td>
        <td class='header_laporan'>: ".number_format($row->jml_hari,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Bunga </td>
        <td class='header_laporan'>: ".number_format($row->p_bunga,2,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Hari Pembagi </td>
        <td class='header_laporan'>: ".number_format($row->basis,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='90' height='23' class='header_laporan' align='center'>No Bukti</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Akru Bunga</td>
	<td width='80' class='header_laporan' align='center'>Reverse Akru</td>
	<td width='80' class='header_laporan' align='center'>Bunga Cair</td>
	  </tr>
  ";
 
  echo "<tr>
					<td height='23' valign='top' class='isi_laporan'>".$row->tgl_kas."</td>
					<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
				echo "</td>
					<td valign='top' class='isi_laporan'>".$row->ket_kas."</td>
					<td height='23' colspan='2' class='header_laporan' align='right'>Nilai Penempatan</td>
					<td class='header_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
				  </tr>
  
";
			
		
			$sql="select a.kode_lokasi,1 as no,b.tanggal,a.no_akru as no_bukti,a.nilai-a.pajak_akru as akru,0 as rev,0 as cair,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan
from inv_depoakru_d a
inner join inv_depoakru_m b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi
where a.no_depo='$row->no_depo' and a.kode_lokasi='$row->kode_lokasi' $tmp_periode
union
select a.kode_lokasi,2 as no,b.tanggal,a.no_cair as no_bukti,0 as akru,b.nilai_rev as rev,0 as cair,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan
from inv_depoakru_d a
inner join inv_depocair_m b on a.no_cair=b.no_cair and a.kode_lokasi=b.kode_lokasi
where a.no_depo='$row->no_depo' and a.kode_lokasi='$row->kode_lokasi' $tmp_periode
union
select a.kode_lokasi,3 as no,b.tanggal,a.no_kas as no_bukti,0 as akru,0 as rev,b.nilai as cair,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan
from inv_depoakru_d a
inner join inv_depocair_m b on a.no_cair=b.no_cair and a.kode_lokasi=b.kode_lokasi
where a.no_depo='$row->no_depo' and a.kode_lokasi='$row->kode_lokasi' and a.no_kas<>'-' $tmp_periode
order by tanggal,no";
			
			$rs1 = $dbLib->execute($sql);
			$akru=0; $rev=0; $cair=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$akru=$akru + $row1->akru;	
				$rev=$rev+$row1->rev;
				$cair=$cair+$row1->cair;
				echo "<tr>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi');\">$row1->no_bukti</a>";
				echo "</td>
    <td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->akru,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->rev,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>".number_format($row1->cair,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='header_laporan' align='right'>Total&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($akru,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($rev,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($cair,0,',','.')."</td>
 </tr>";
			$sql=" select b.no_kas as no_bukti ,b.kode_lokasi,date_format(b.tanggal,'%d/%m/%Y') as tgl,b.keterangan,b.nilai
				from inv_depotutup_m b
				where b.kode_lokasi='$row->kode_lokasi' and b.no_depo='$row->no_depo' and b.no_kas<>'-' $tmp_periode";
			
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
					<td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
					<td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row1->kode_lokasi');\">$row1->no_bukti</a>";
				echo "</td>
					<td valign='top' class='isi_laporan'>".$row1->keterangan."</td>
					<td height='23' colspan='2' class='header_laporan' align='right'>Nilai Penutupan</td>
					<td class='header_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
				  </tr>";
			}
			echo "</table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
