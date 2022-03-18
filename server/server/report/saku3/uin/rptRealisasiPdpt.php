<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_uin_rptRealisasiPdpt extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$nik=$tmp[0];
		$kode_lokasi=$tmp[1];
		
		$sql="select a.no_aju,a.kode_lokasi,a.periode,a.kode_pp,b.nama as nama_pp,a.keterangan,a.jenis
			from uin_aju_m a
			inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
			$this->filter 
			order by a.no_aju";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Realisasi RAB",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='145' class='header_laporan'>No Bukti</td>
        <td width='645' class='header_laporan'>:&nbsp;$row->no_aju</td>
      </tr>
      <tr>
        <td class='header_laporan'>Unit</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>";
		$sql="select a.no_aju,a.kdgiat,a.kode_akun,
				   b.nmgiat,i.nmakun
			from (select a.no_aju,a.kdgiat,a.kode_akun
				from uin_aju_d a
				where a.no_aju='$row->no_aju'
				group by a.no_aju,a.kdgiat,a.kode_akun
				 )a
			inner join uin_giat b on a.kdgiat=b.kdgiat
			inner join uin_akun i on a.kode_akun=i.kdakun
			";
		
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
  echo "<tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='145'>Kegiatan</td>
        <td class='header_laporan' width='645'>:&nbsp;$row2->kdgiat -&nbsp; $row2->nmgiat</td>
      </tr>
		<tr>
          <td class='header_laporan'>Akun</td>
          <td class='header_laporan'>:&nbsp;$row2->kode_akun -&nbsp; $row2->nmakun</td>
        </tr>
    </table></td>
  </tr>";
		
  echo "<tr>
    <td><table width='800' border='1' cellspacing='2' cellpadding='1' class='kotak'>
      <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='200' align='center' class='header_laporan'>Deskripsi</td>
	<td width='150' align='center' class='header_laporan'>Norma</td>
	<td width='80' align='center' class='header_laporan'>Satuan</td>
    <td width='80' align='center' class='header_laporan'>Tarif</td>
    <td width='60' align='center' class='header_laporan'>Volume</td>
   	<td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>";
	  $sql1="select a.keterangan,a.kode_norma,a.satuan,a.tarif,a.vol,a.total,b.nama
				from uin_aju_d a
				inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi
				where a.no_aju='$row->no_aju' 
				order by a.nu
				 ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$vol=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->total;
				$vol+=$row1->vol;
      echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
	<td  class='isi_laporan'>$row1->nama</td>
	<td  class='isi_laporan'>$row1->satuan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->vol,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
      </tr>";
				$j+=1;
			}
      echo "<tr>
    <td colspan='5' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($vol,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  
  </tr>
    </table></td>
  </tr>";
			
		}
	echo "</table>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
