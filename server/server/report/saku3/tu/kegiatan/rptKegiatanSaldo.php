<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptKegiatanSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$kode_lokasi=$tmp[0];
		$kode_aju=$tmp[1];
		$sql="select a.no_aju,a.kode_lokasi,a.keterangan,date_format(a.tgl_input,'%d/%m/%Y') as tgl,a.nilai as angg,isnull(b.nilai,0) as beban,
		case when isnull(d.nilai,0)>0 then isnull(c.nilai,0) else 0 end as panjar,
			isnull(d.nilai,0) as ptg
from keg_aju_m a
left join (select a.no_ajukeg,a.kode_lokasi,sum(a.nilai) as nilai
				   from it_aju_m a
					 where a.kode_lokasi='$kode_lokasi' and a.modul='UMUM'
					 group by a.no_ajukeg,a.kode_lokasi
				   )b on a.no_aju=b.no_ajukeg and a.kode_lokasi=b.kode_lokasi 
left join (select a.no_ajukeg,a.kode_lokasi,sum(a.nilai) as nilai
				   from it_aju_m a
					 where a.kode_lokasi='$kode_lokasi' and a.modul='PANJAR' and a.progress<>'4'
					 group by a.no_ajukeg,a.kode_lokasi
				   )c on a.no_aju=c.no_ajukeg and a.kode_lokasi=c.kode_lokasi
left join (select a.no_ajukeg,a.kode_lokasi,sum(a.nilai) as nilai
				   from it_aju_m a
					 where a.kode_lokasi='$kode_lokasi' and a.modul='PJPTG'
					 group by a.no_ajukeg,a.kode_lokasi
				   )d on a.no_aju=d.no_ajukeg and a.kode_lokasi=d.kode_lokasi 
$this->filter and a.progress<>'X'
order by a.no_aju ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo kegiatan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>No Kegiatan</td>
     <td width='250'  align='center' class='header_laporan'>Nama Kegiatan</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='90'  align='center' class='header_laporan'>Anggaran</td>
	 <td width='90'  align='center' class='header_laporan'>Beban</td>
	 <td width='90'  align='center' class='header_laporan'>Panjar</td>
     <td width='90'  align='center' class='header_laporan'>PTG Panjar</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 
   </tr>  ";
		$beban=0;$ptg=0;$panjar=0;$angg1=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saldo=$row->angg-$row->beban-$row->panjar-$row->ptg;
			$angg1+=$row->angg;			
			$beban1+=$row->beban;
			$panjar1+=$row->panjar;
			$ptg1+=$row->ptg;
			$saldo1+=$saldo;
			
		echo "<tr >
			<td class='isi_laporan' align='center'>$i</td>
			<td valign='top' class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_aju','$row->kode_lokasi');\">$row->no_aju</a></td>
		<td class='isi_laporan'>$row->keterangan</td>
		<td class='isi_laporan'>$row->tgl</td>
		<td class='isi_laporan' align='right'>".number_format($row->angg,0,",",".")."</td>		
	 <td class='isi_laporan' align='right'>".number_format($row->beban,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->panjar,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>	
	  </tr>";
			$i=$i+1;
		}
	  echo "<tr>
   
    <td colspan='4' class='header_laporan' align='right'>Total</td>
	
    <td class='header_laporan' align='right'>".number_format($angg1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($beban1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($panjar1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($ptg1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($saldo1,0,",",".")."</td>
  </tr>
  </table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
