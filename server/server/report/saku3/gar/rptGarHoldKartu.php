<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptGarHoldKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
		convert(varchar, d.tanggal, 101) as tgl,d.keterangan,
	   isnull(b.nilai,0) as hold
from (select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
	from anggaran_hold a
	where a.kode_lokasi='03' and modul='HOLD'
	group by a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
	 )a
inner join anggaran_m d on a.no_agg=d.no_agg and a.kode_lokasi=d.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,sum(a.nilai) as nilai
		from anggaran_hold a
		where a.kode_lokasi='03' and modul='HOLD'
		group by a.no_agg,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		  )b on a.no_agg=b.no_agg and a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp and a.kode_drk=b.kode_drk

$this->filter";
		echo $sql;
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kartu anggaran hold",$this->lokasi,$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_agg</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Akun </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun </td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp </td>
      </tr>
	  <tr>
        <td class='header_laporan'>Kode DRK </td>
        <td class='header_laporan'>:&nbsp;$row->kode_drk </td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai Hold </td>
        <td class='header_laporan'>:&nbsp;".number_format($row->hold,0,",",".")." </td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' align='center' class='header_laporan'>No Bukti</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun </td>
    <td width='150' align='center' class='header_laporan'>Kode PP</td>
    <td width='60' align='center' class='header_laporan'>Kode DRK</td>
    <td width='60' align='center' class='header_laporan'>Periode</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
	<td width='90' align='center' class='header_laporan'>Saldo</td>
  </tr>";
	  $sql1="select a.kode_akun,a.kode_pp,a.kode_drk,a.periode,a.dc,a.nilai,
       b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk, 
	   case when a.dc='D' then a.nilai else 0 end debet,case when a.dc='C' then a.nilai else 0 end kredit
from anggaran_hold a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='2020'
where a.no_agg='$row->no_agg' and a.kode_lokasi='$row->kode_lokasi' and modul='RILIS' and kode_akun='$row->kode_akun' and a.kode_pp='$row->kode_pp' and a.kode_drk='$row->kode_drk'
order by a.dc,a.kode_akun ";
		echo $sql1;
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$debet=0;
		$kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row1->debet;
			$kredit=$kredit+$row1->kredit;
			echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan'>$row1->nama_pp</td>
    <td class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->nama_drk</td>
    <td class='isi_laporan'>$row1->periode</td>
    <td align='right' class='isi_laporan'>".number_format($row1->debet,0,",",".")."</td>
  </tr>";
		$i=$i+1;
		}
		
		
	  echo " <tr>
    <td colspan='8' align='right' class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($debet,0,",",".")."</td>
  </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
