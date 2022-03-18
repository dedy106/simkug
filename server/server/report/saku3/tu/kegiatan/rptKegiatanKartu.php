<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptKegiatanKartu extends server_report_basic
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
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.kode_budget,a.dasar,a.sasaran,a.tempat,a.no_aju,a.keterangan,a.kode_panitia,a.kode_lokasi,
		date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,c.nama,a.nilai
from keg_aju_m a
 inner join keg_panitia_m c on a.kode_panitia=c.kode_panitia and a.kode_lokasi=c.kode_lokasi
$this->filter and a.progress<>'x' ";

	$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kartu kegiatan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Kegiatan</td>
        <td width='360' class='header_laporan'>: $row->no_aju</td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Deskripsi</td>
        <td width='360' class='header_laporan'>: $row->keterangan</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Dasar</td>
        <td width='360' class='header_laporan'>: $row->dasar</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Sasaran</td>
        <td width='360' class='header_laporan'>: $row->sasaran</td>
      </tr>	  
	   <tr>
        <td width='150' class='header_laporan'>Tempat</td>
        <td width='360' class='header_laporan'>: $row->tempat</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>Kode Panitia</td>
        <td width='360' class='header_laporan'>: $row->kode_panitia - $row->nama </td>
      </tr>
	   <tr>
        <td width='150' class='header_laporan'>Tgl Mulai</td>
        <td width='360' class='header_laporan'>: $row->tgl_mulai</td>
      </tr>	
	  <tr>
        <td width='150' class='header_laporan'>Tgl Selesai</td>
        <td width='360' class='header_laporan'>: $row->tgl_selesai</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>ID Budget</td>
        <td width='360' class='header_laporan'>: $row->kode_budget</td>
      </tr>	  
	  <tr>
        <td width='150' class='header_laporan'>Nilai Anggaran</td>
        <td width='360' class='header_laporan'>: ".number_format($row->nilai,0,",",".")."</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td  width='80' class='header_laporan' align='center'>No. Bukti</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
	<td width='50' class='header_laporan' align='center'>Modul</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td  width='80' class='header_laporan' align='center'>Beban</td>
	<td  width='80' class='header_laporan' align='center'>Panjar</td>
	<td  width='80' class='header_laporan' align='center'>PTG Panjar</td>
	<td  width='80' class='header_laporan' align='center'>Saldo</td>
	</tr>

";
			
			$sql="select a.no_aju,convert(varchar(20),a.tanggal,103) as tgl,a.keterangan,a.modul,a.progress,
	   case when a.modul='UMUM' then a.nilai else 0 end as beban,
	   case when a.modul='PANJAR' and a.progress<>'4' then a.nilai else 0 end as panjar,
	   case when a.modul='PJPTG' then a.nilai else 0 end as ptg
from it_aju_m a
where a.no_ajukeg='$row->no_aju' and a.kode_lokasi='$row->kode_lokasi' 
order by a.tanggal
 ";

			$rs1 = $dbLib->execute($sql);
			$sisa=$row->nilai; 
			$beban=0;
			$panjar=0;
			$ptg=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$sisa= $sisa- ($row1->beban + $row1->panjar + $row1->ptg);
				$beban+=$row1->beban;
				$panjar+=$row1->panjar;
				$ptg+=$row1->ptg;
				echo "<tr>
	 <td class='isi_laporan'>$row1->no_aju</td>
	 <td class='isi_laporan'>$row1->tgl</td>
	 <td class='isi_laporan'>$row1->modul</td>
	 <td class='isi_laporan'>$row1->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->beban,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->panjar,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row1->ptg,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($sisa,0,',','.')."</td>

 </tr>";
				
			}
					 echo "<tr>
        <td class='header_laporan' colspan='4' align='right'>Total</td>
		<td class='header_laporan' align='right'>".number_format($beban,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($panjar,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($ptg,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
      </tr>";					
	 
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
