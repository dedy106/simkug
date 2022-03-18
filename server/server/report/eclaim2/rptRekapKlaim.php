<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptRekapKlaim extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$filter2=$tmp[0];
		$tahun=$tmp[1];
		$sql = "select a.kode_lok,b.nama,a.jml,a.nilai_est,a.nilai_adjust,a.nilai_ddct,a.nilai_settle 
from (select c.kode_lok,count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_ddct,0)) as nilai_ddct,sum(ifnull(b.nilai,0))-sum(ifnull(b.nilai_ddct,0)) as nilai_settle 
      from tlk_klaim a 
      inner join tlk_lokasi c on a.kode_lok=c.kode_lok 
      left join tlk_adjust b on a.no_klaim=b.no_klaim  $this->filter
      group by c.kode_lok 
      )a 
inner join tlk_lokasi b on a.kode_lok=b.kode_lok 
order by a.kode_lok";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI KLAIM ASSET PT. TELEKOMUNIKASI INDONESIA, Tbk.","","TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='40' class='header_laporan'>Kode</td>
    <td width='250' class='header_laporan'>Nama Lokasi </td>
    <td width='50' class='header_laporan'>Berkas</td>
    <td width='100' class='header_laporan'>Estimasi</td>
    <td width='100' class='header_laporan'>Adjustment</td>
    <td width='100' class='header_laporan'>Deductible</td>
    <td width='100' class='header_laporan'>Settled</td>
  </tr>";
		$jml=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml=$jml+$row->jml;
			$nilai_est=$nilai_est+$row->nilai_est;
			$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
			$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
			$nilai_settle=$nilai_settle+$row->nilai_settle;
			echo "<tr>
    <td align='center' class='isi_laporan'>$row->kode_lok</td>
    <td class='isi_laporan'>$row->nama</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Total</td>
    <td align='center' class='isi_laporan'>".number_format($jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr>";
		echo "</table><br>";
		$sql = "select a.kode_sebab,b.nama,a.jml,a.nilai_est,a.nilai_adjust,a.nilai_ddct,a.nilai_settle 
from (select c.kode_sebab,count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_ddct,0)) as nilai_ddct,sum(ifnull(b.nilai,0))-sum(ifnull(b.nilai_ddct,0)) as nilai_settle 
      from tlk_klaim a 
      inner join tlk_sebab c on a.kode_sebab=c.kode_sebab 
      left join tlk_adjust b on a.no_klaim=b.no_klaim $this->filter
      group by c.kode_sebab 
      )a 
inner join tlk_sebab b on a.kode_sebab=b.kode_sebab 
order by a.kode_sebab";
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='40' class='header_laporan'>Kode</td>
    <td width='250' class='header_laporan'>Nama Penyebab </td>
    <td width='50' class='header_laporan'>Berkas</td>
    <td width='100' class='header_laporan'>Estimasi</td>
    <td width='100' class='header_laporan'>Adjustment</td>
    <td width='100' class='header_laporan'>Deductible</td>
    <td width='100' class='header_laporan'>Settled</td>
  </tr>";
		$jml=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml=$jml+$row->jml;
			$nilai_est=$nilai_est+$row->nilai_est;
			$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
			$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
			$nilai_settle=$nilai_settle+$row->nilai_settle;
			echo "<tr>
    <td align='center' class='isi_laporan'>$row->kode_sebab</td>
    <td class='isi_laporan'>$row->nama</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Total</td>
    <td align='center' class='isi_laporan'>".number_format($jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr>
</table><br>";
		$sql = "select a.progress,b.nama,a.jml,a.nilai_est,a.nilai_adjust,a.nilai_ddct,a.nilai_settle 
from (select a.progress,count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_ddct,0)) as nilai_ddct,sum(ifnull(b.nilai,0))-sum(ifnull(b.nilai_ddct,0)) as nilai_settle 
      from tlk_klaim a 
      left join tlk_adjust b on a.no_klaim=b.no_klaim $this->filter
      group by a.progress 
      )a 
inner join tlk_proses b on b.kode_proses=a.progress 
order by b.no_urut";
		$rs = $dbLib->execute($sql);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='290' class='header_laporan'>Nama Proses </td>
    <td width='50' class='header_laporan'>Berkas</td>
    <td width='100' class='header_laporan'>Estimasi</td>
    <td width='100' class='header_laporan'>Adjustment</td>
    <td width='100' class='header_laporan'>Deductible</td>
    <td width='100' class='header_laporan'>Settled</td>
  </tr>";
		$jum=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		$loss=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jum=$jum+$row->jum;
			$nilai_est=$nilai_est+$row->nilai_est;
			$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
			$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
			$nilai_settle=$nilai_settle+$row->nilai_settle;
			if ($row->progress < 9)
			{
				$loss=$loss+$row->nilai_est;
			}
			else
			{
				$loss=$loss+$row->nilai_settle;
			}
			
			echo "<tr>
   <td class='isi_laporan'>$row->nama</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='1' align='center'>Total</td>
    <td align='center' class='isi_laporan'>".number_format($jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr>";
		$sql = "select premi from tlk_polis a $filter2 ";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$rasio=($loss/$row->premi)*100;
			echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Premi</td>
    <td align='right' class='isi_laporan'>".number_format($row->premi,0,',','.')."</td>
    <td align='right' class='isi_laporan' colspan='3'>&nbsp;</td>
  </tr>";
			echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Estimasi Loss</td>
    <td align='right' class='isi_laporan'>".number_format($loss,0,',','.')."</td>
    <td align='right' class='isi_laporan' colspan='3'>&nbsp;</td>
  </tr>";
			echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>Loss Ratio</td>
     <td align='right' class='isi_laporan'>".number_format($rasio,2,',','.')."%</td>
    <td align='right' class='isi_laporan' colspan='3'>&nbsp;</td>
  </tr>";
		}
		echo "</table><br>";
		
		echo "</div>";
			
		return "";
	}
	
}
?>
  
