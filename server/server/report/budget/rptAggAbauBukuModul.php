<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");

class server_report_budget_rptAggAbauBukuModul extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(*) as jum from (select a.kode_pk
from agg_d a
inner join agg_pk b on a.kode_pk=b.kode_pk
inner join agg_drk c on a.kode_drk=c.kode_drk
inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi $this->filter
group by a.kode_pk,b.nama,a.kode_drk,c.nama,a.keterangan,a.kode_pp,a.kode_rka,a.kode_akun,a.bulan) abau ";
		error_log($sql);
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		$sql="select a.modul,a.kode_pk,b.nama as nama_pk,a.kode_drk,c.nama as nama_drk,a.keterangan,a.kode_pp
       ,a.kode_rka,a.kode_akun,a.bulan,sum(a.jumlah) as jumlah,sum(a.volume) as volume
       ,sum(a.nilai) as rka
       ,sum(case when a.jumlah<>0 then (a.nilai/(a.jumlah*a.volume)) else a.nilai end) as satuan
       ,sum(case when bulan between '01' and '03' then nilai else 0 end) as tw1
       ,sum(case when bulan between '04' and '06' then nilai else 0 end) as tw2,
       sum(case when bulan between '07' and '09' then nilai else 0 end) as tw3,
       sum(case when bulan between '10' and '12' then nilai else 0 end) as tw4
from agg_d a
inner join agg_pk b on a.kode_pk=b.kode_pk
inner join agg_drk c on a.kode_drk=c.kode_drk
inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi $this->filter
group by a.modul,a.kode_pk,b.nama,a.kode_drk,c.nama,a.keterangan,a.kode_pp
         ,a.kode_rka,a.kode_akun,a.bulan
order by a.kode_rka,a.bulan";
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		//echo $AddOnLib->judul_laporan("laporan buku rka",$this->lokasi,$AddOnLib->ubah_periode($periode));
		if ($bidang=="")
		{
			$judul="<div class='lokasi_laporan2'>".$this->lokasi."<br>LAPORAN BUKU RKA<br>TAHUN $tahun<br></div>";
		}
		else
		{
			$judul="<div class='lokasi_laporan2'>".$this->lokasi."<br>LAPORAN BUKU RKA<br>$bidang<br>TAHUN $tahun<br></div>";
		}
		echo "<div align='center'>$judul"; 
		echo "<table width='1600' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan' >No</td>
	<td width='60' align='center' class='header_laporan' >Modul</td>
    <td width='60' align='center' class='header_laporan' >NO PK </td>
    <td width='150' align='center' class='header_laporan' >PROGRAM KERJA </td>
    <td width='60' align='center' class='header_laporan' >NO DRK </td>
    <td width='150' align='center' class='header_laporan' >KEGIATAN</td>
    <td width='150' align='center' class='header_laporan' >RINCIAN KEGIATAN </td>
    <td width='60' align='center' class='header_laporan' >LOKER</td>
    <td width='60' align='center' class='header_laporan' >NO RKA </td>
    <td width='60' align='center' class='header_laporan' >NO AKUN </td>
    <td width='30' align='center' class='header_laporan' >BLN</td>
    <td width='30' align='center' class='header_laporan' >JUM PELAK </td>
    <td width='30' align='center' class='header_laporan' >VOL</td>
    <td width='80' align='center' class='header_laporan' >SATUAN</td>
    <td width='80' align='center' class='header_laporan' >RKA</td>
    <td width='80' align='center' class='header_laporan' >TRIWULAN I </td>
    <td width='80' align='center' class='header_laporan' >TRIWULAN II </td>
    <td width='80' align='center' class='header_laporan' >TRIWULAN III </td>
    <td width='80' align='center' class='header_laporan' >TRIWULAN IV </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' >0</td>
    <td align='center' class='header_laporan' >1</td>
    <td align='center' class='header_laporan' >2</td>
    <td align='center' class='header_laporan' >3</td>
    <td align='center' class='header_laporan' >4</td>
    <td align='center' class='header_laporan' >5</td>
    <td align='center' class='header_laporan' >6</td>
    <td align='center' class='header_laporan' >7</td>
    <td align='center' class='header_laporan' >8</td>
    <td align='center' class='header_laporan' >9</td>
    <td align='center' class='header_laporan' >10</td>
    <td align='center' class='header_laporan' >11</td>
    <td align='center' class='header_laporan' >12</td>
    <td align='center' class='header_laporan' >13</td>
    <td align='center' class='header_laporan' >14</td>
    <td align='center' class='header_laporan' >15</td>
    <td align='center' class='header_laporan' >16</td>
    <td align='center' class='header_laporan' >17</td>
    <td align='center' class='header_laporan' >18</td>
  </tr>";
		$tmp="";$nilai=0;$rka=0;$tw1=0;$tw2=0;$tw3=0;$tw4=0;$first = true;
		$totrka=0;$tot1=0;$tot2=0;$tot3=0;$tot4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$vol=number_format($row->volume,2,",",".");
			$nnilai=number_format($row->satuan,0,",",".");
			$nrka=number_format($row->rka,0,",",".");
			$ntw1=number_format($row->tw1,0,",",".");
			$ntw2=number_format($row->tw2,0,",",".");
			$ntw3=number_format($row->tw3,0,",",".");
			$ntw4=number_format($row->tw4,0,",",".");
			$nilai=$nilai+$row->satuan;
			
			
			$beda = $tmp!=$row->kode_drk; 
			if ($tmp!=$row->kode_drk)
			{
				$tmp=$row->kode_drk;
				$first = true;
				
				if ($i>1)
				{
					$nilai=0;$rka=0;$tw1=0;$tw2=0;$tw3=0;$tw4=0;
					echo " <tr bgcolor='#CCCCCC'>
    <td colspan='14' align='center' class='isi_laporan'>SUB TOTAL KEGIATAN </td>
    <td class='isi_laporan' align='right'>$trka</td>
    <td class='isi_laporan' align='right'>$ttw1</td>
    <td class='isi_laporan' align='right'>$ttw2</td>
    <td class='isi_laporan' align='right'>$ttw3</td>
    <td class='isi_laporan' align='right'>$ttw4</td>
  </tr>";
				}
				
			}
			$rka=$rka+$row->rka;
			$tw1=$tw1+$row->tw1;
			$tw2=$tw2+$row->tw2;
			$tw3=$tw3+$row->tw3;
			$tw4=$tw4+$row->tw4; 
			$trka=number_format($rka,0,",",".");
			$ttw1=number_format($tw1,0,",",".");
			$ttw2=number_format($tw2,0,",",".");
			$ttw3=number_format($tw3,0,",",".");
			$ttw4=number_format($tw4,0,",",".");
			$totrka=$totrka+$row->rka;
			$tot1=$tot1+$row->tw1;
			$tot2=$tot2+$row->tw2;
			$tot3=$tot3+$row->tw3;
			$tot4=$tot4+$row->tw4; 
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan' align='center'>$row->modul</td>
    <td class='isi_laporan'>".($beda && $first? $row->kode_pk:"")."</td>
    <td class='isi_laporan'>".($beda && $first? $row->nama_pk:"")."</td>
    <td class='isi_laporan'>$row->kode_drk</td>
    <td class='isi_laporan'>".($beda && $first? $row->nama_drk:"")."</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->kode_rka</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan' align='center'>$row->bulan</td>
    <td class='isi_laporan' align='center'>$row->jumlah</>
    <td class='isi_laporan' align='center'>$vol</td>
    <td class='isi_laporan' align='right'>$nnilai</td>
    <td class='isi_laporan' align='right'>$nrka</td>
    <td class='isi_laporan' align='right'>$ntw1</td>
    <td class='isi_laporan' align='right'>$ntw2</td>
    <td class='isi_laporan' align='right'>$ntw3</td>
    <td class='isi_laporan' align='right'>$ntw4</td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		
		echo " <tr bgcolor='#CCCCCC'>
    <td colspan='14' align='center' class='isi_laporan'>SUB TOTAL KEGIATAN </td>
    <td class='isi_laporan' align='right'>$trka</td>
    <td class='isi_laporan' align='right'>$ttw1</td>
    <td class='isi_laporan' align='right'>$ttw2</td>
    <td class='isi_laporan' align='right'>$ttw3</td>
    <td class='isi_laporan' align='right'>$ttw4</td>
  </tr>";
		$trka=number_format($totrka,0,",",".");
		$ttw1=number_format($tot1,0,",",".");
		$ttw2=number_format($tot2,0,",",".");
		$ttw3=number_format($tot3,0,",",".");
		$ttw4=number_format($tot4,0,",",".");
		echo " <tr bgcolor='#CCCCCC'>
    <td colspan='14' align='center' class='isi_laporan'>TOTAL </td>
    <td class='isi_laporan' align='right'>$trka</td>
    <td class='isi_laporan' align='right'>$ttw1</td>
    <td class='isi_laporan' align='right'>$ttw2</td>
    <td class='isi_laporan' align='right'>$ttw3</td>
    <td class='isi_laporan' align='right'>$ttw4</td>
  </tr> </table><br>";
		echo "</div>";
			
		return "";
	}
	
}
?>
  
