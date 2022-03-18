<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_belajar_rptSaldoTagihan extends server_report_basic
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
		$sql="select c.nim,c.keterangan,a.nilai as nilai_t,d.nama,
		b.nilai as nilai_b, a.nilai-b.nilai as saldo
		from dev_tagihan_m c inner JOIN
		(select a.nim,a.no_tagihan,sum(b.nilai) as nilai from dev_tagihan_m a inner join dev_tagihan_d b on a.no_tagihan=b.no_tagihan group by a.nim,a.no_tagihan) a on c.no_tagihan=a.no_tagihan 
		inner join 
		(select a.nim,a.no_bayar,b.no_tagihan,sum(b.nilai) as nilai from dev_bayar_m a inner join dev_bayar_d b on a.no_bayar=b.no_bayar 
		group by a.nim,a.no_bayar,b.no_tagihan) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan
		inner join dev_siswa d on a.nim=d.nim 
		$this->filter";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Saldo Tagihan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='600'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>No</td>
            <td width='70' align='center' class='header_laporan'>NIM</td>
            <td width='200' align='center' class='header_laporan'>Nama</td>
			<td width='100' align='center' class='header_laporan'>Nilai Tagihan</td>
			<td width='100' align='center' class='header_laporan'>Nilai Bayar</td>
			<td width='100' align='center' class='header_laporan'>Saldo</td>
        </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row->nilai_t,0,',','.');
			$nilai_byr=number_format($row->nilai_b,0,',','.');
			$saldo=number_format($row->saldo,0,',','.');
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>";
			echo "<td><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTagihan('$row->nim');\">$row->nim</a></td>";
			echo"<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan' align='right'>$nilai</td>
			<td class='isi_laporan' align='right'>$nilai_byr</td>
			<td class='isi_laporan' align='right'>$saldo</td>
			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
