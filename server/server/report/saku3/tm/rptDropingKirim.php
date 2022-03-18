<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tm_rptDropingKirim extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$sql="select a.no_kas,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan
from kas_m a
$this->filter
order by a.no_kas";
		$rs = $dbLib->execute($sql);
		
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN droping KIRIM",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
	  <tr>
        <td colspan='7'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='111' class='header_laporan'>No Kirim</td>
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
     <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
      </tr>";
		
      
    echo "</table></td>
	  </tr>
	  <tr>
            <td colspan='7' style='padding:10px' ><table border='1' cellspacing='2' cellpadding='1' class='kotak'>
              <tr bgcolor='#CCCCCC'>
                <td width='60' class='header_laporan'>Kode Tujuan</td>
                <td width='200' class='header_laporan'>Nama Lokasi Tujuan</td>
                <td width='300' class='header_laporan'>Keterangan</td>
                <td width='90' class='header_laporan'>Nilai</td>
              </tr>";
			  $sql1="select a.kode_loktuj,b.nama,a.keterangan,a.nilai 
from yk_kasdrop_d a
inner join lokasi b on a.kode_loktuj=b.kode_lokasi
where a.no_kas='$row->no_kas' ";
			  $rs1 = $dbLib->execute($sql1);
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
              echo "<tr>
                <td class='isi_laporan'>$row1->kode_loktuj</td>
        <td class='isi_laporan'>$row1->nama</td>
		<td class='isi_laporan'>$row1->keterangan</td>
        <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
              </tr>";
            }
			echo "</table></td>
          </tr>
		 <tr>
            <td colspan='7' style='padding:10px' ><table border='1' cellspacing='2' cellpadding='1' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='80' class='header_laporan'>Kode Akun</td>
        <td width='200' class='header_laporan'>Nama Akun </td>
		<td width='60' class='header_laporan'>Kode PP</td>
        <td width='70' class='header_laporan'>Kode DRK</td>
		<td width='200' class='header_laporan'>Keterangan</td>
		<td width='90' class='header_laporan'>Debet</td>
        <td width='90' class='header_laporan'>Kredit</td>
        </tr>";
	  $sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from kas_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_kas='$row->no_kas' order by a.kode_akun";
	
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
        <td class='isi_laporan'>$row1->kode_drk</td>
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
        </tr>";
       
    echo "</table></td>
          </tr></table><br>";
	}
	echo "</div>";
	return "";
		
	}
	
}
?>
