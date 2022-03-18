<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptStrukturKeuangan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		
		$rs = $dbLib->execute($sql);		
		//error_log($this->filter2." ".$sql);
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
		if ($this->filter2=='COA')
		{
			$sql = "select kode_neraca,nama,jenis_akun,modul,level_spasi from neraca ".$this->filter." order by rowindex ";
		}else
		{
			$sql = "select n.kode_neraca,n.nama as nm,m.nama as nmakun,r.kode_akun,m.modul,m.jenis,m.kode_curr,m.block,level_spasi ".
					"from neraca n left outer join relakun r on n.kode_neraca=r.kode_neraca and n.kode_fs=r.kode_fs and n.kode_lokasi=r.kode_lokasi  ".
					"left outer join masakun m on r.kode_akun=m.kode_akun and r.kode_lokasi=m.kode_lokasi ".$this->filter." order by n.rowindex,r.kode_akun ";
		}			
		$rs = $dbLib->execute($sql);		
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan Struktur Keuangan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		if ($this->filter2=='COA')
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
					<tr bgcolor='#CCCCCC'>
					 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
					 <td width='400' class='header_laporan'><div align='center'>Nama</div></td>
					 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
					 <td width='60' class='header_laporan'><div align='center'>Modul</div></td>
					</tr>";		
			while ($row = $rs->FetchNextObject($toupper=false))
			{
			    echo "<tr>
						 <td height='20' class='isi_laporan'>".$row->kode_neraca."</td>
						 <td class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
						 <td class='isi_laporan'>".$row->jenis_akun."</td>
						 <td class='isi_laporan'>".$row->modul."</td>
						</tr>";
			}
			echo "</table>";
		}else
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'>
    <td width='60' height='25' class='header_laporan'>Kode Neraca </td>
    <td width='200' class='header_laporan'>Nama Neraca </td>
    <td width='80' class='header_laporan'>Kode Akun </td>
    <td width='300' class='header_laporan'>Nama Akun </td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$beda = $tmp!=$row->kode_neraca; 
				if ($tmp!=$row->kode_neraca)
				{
					$tmp=$row->kode_neraca;
					$first = true;
				}
			    echo "<tr>
				<td class='isi_laporan'>".($beda && $first? $row->kode_neraca:"")."</td>
				<td class='isi_laporan'>".($beda && $first? $row->nm:"")."</td>
				<td height='20' class='isi_laporan'>".$row->kode_akun."</td>
				<td class='isi_laporan'>".$row->nmakun."</td>
				</tr>";
				
			}
			echo "</table>";
		}
				
		echo "</div";
		return "";
	}
	
}
?>
