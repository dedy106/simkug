<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptPiutangKartuCd extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,c.nama as nama_jur
from sis_siswa a
inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
inner join sis_jur c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
inner join (select a.kode_pp,a.kode_lokasi
			from sis_cd_d a
			where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
			group by a.kode_pp,a.kode_lokasi
			)g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
$this->filter
order by a.kode_kelas,a.nis ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pdd siswa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:3px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='60' class='header_laporan'>NIS</td>
        <td width='400' class='header_laporan'>: $row->nis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelas</td>
        <td class='header_laporan'>: $row->kode_kelas - $row->nama_kelas</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jurusan</td>
        <td class='header_laporan'>: $row->kode_jur - $row->nama_jur</td>
      </tr>
    </table></td>
  </tr>
    <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'>No</td>
    <td width='60' class='header_laporan'>Tanggal </td>
    <td width='80' class='header_laporan'>No Bukti</td>
	<td width='60' class='header_laporan'>Modul</td>
	<td width='200' class='header_laporan'>Keterangan</td>
    <td width='90' class='header_laporan'>Debet</td>
    <td width='90' class='header_laporan'>Kredit</td>
  </tr>
 ";
			
			$sql1="select a.no_bukti,a.tgl,a.keterangan,a.modul,a.debet,a.kredit
		from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
				   a.nilai as debet,0 as kredit
			from sis_cd_d a
			inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
			where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='D'
			union all
			select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
				   0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit
			from sis_cd_d a
			inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
			where a.nis='$row->nis' and a.kode_lokasi='$row->kode_lokasi' and a.kode_pp='$row->kode_pp' and a.dc='C'
			)a
		order by a.tanggal 
";
		
			$rs1 = $dbLib->execute($sql1);
			$debet=0; $kredit=0;$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{	
				
				$debet+=$row1->debet;
				$kredit+=$row1->kredit;
			  echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->tgl</td>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->modul</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
				<td align='right' class='isi_laporan'>".number_format($row1->kredit,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='5'>Total </td>
				<td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($kredit,0,",",".")."</td>
			  </tr>";
			$n1=0; $n2=0;
			if ($debet-$kredit>0)
			{
				$n1=$debet-$kredit;
			}
			else
			{
				$n2=$debet-$kredit;
			}
			echo "<tr>
				<td align='right' class='header_laporan' colspan='5'>Saldo Akhir</td>
				<td align='right' class='header_laporan'>".number_format($n1,0,",",".")."</td>
				<td align='right' class='header_laporan'>".number_format($n2,0,",",".")."</td>
			  </tr>";
		
			echo "<br>"; 
			$i=$i+1;
		}
		echo "</table></div>";
		return "";
	}
	
}
?>
  
