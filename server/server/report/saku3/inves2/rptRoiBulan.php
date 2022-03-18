<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_inves2_rptRoiBulan extends server_report_basic
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
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$lev=$tmp[3];
		$kode_fs=$tmp[4];
		$tahun=substr($periode,0,4);
		
		
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi
					  from neracainv 
			where kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs'
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN ROI BULANAN</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>TAHUN $tahun</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
		  <tr bgcolor='#CCCCCC'>
			<td width='200' height='25'  class='header_laporan' align='center'>Kelompok Aset dan Jenis Investasi</td>";
		$sql="select tanggal,date_format(tanggal,'%d/%m/%Y') as tgl from inv_tgl  order by tanggal ";
		$rs1 = $dbLib->execute($sql);	
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<td width='60' class='header_laporan' align='center'>$row1->tgl</td>";
		}
		echo "</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			echo "</td>";
				$sql="select tanggal,date_format(tanggal,'%d-%m-%Y') as tgl from inv_tgl  order by tanggal ";
				$rs1 = $dbLib->execute($sql);	
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					
					$tahun=substr($row1->tgl,6,4);
					$bln=substr($row1->tgl,3,2);
					$tgl=substr($row1->tgl,0,2);
					$tanggal=$tahun."-".$bln."-".$tgl;
					
					$sql="select sum(a.roi_kum) as roi_kum 
					from inv_depo_roi a 
					inner join relinv b on a.jenis=b.modul and a.kode_kelola=b.kode_kelola and a.status_dana=b.status_dana
					where a.tanggal='$tanggal' and b.kode_neraca='$row->kode_neraca'
					group by b.kode_neraca ";
					$rs2 = $dbLib->execute($sql);	
					$cek=0;
					
					while ($row2 = $rs2->FetchNextObject($toupper=false))
					{
						echo "<td class='isi_laporan' align='center'>".number_format($row2->roi_kum,4,",",".")."</td>";
						$cek=1;
					}
				
					
					$sql="select sum(a.roi_kum_netto) as roi_kum_netto 
					from inv_saham_roi a 
					inner join relinv b on a.kode_kelola=b.kode_kelola
					where a.tanggal='$tanggal' and b.kode_neraca='$row->kode_neraca' and b.modul='SAHAM'
					group by b.kode_neraca ";
					$rs2 = $dbLib->execute($sql);	
					
					while ($row2 = $rs2->FetchNextObject($toupper=false))
					{
						echo "<td class='isi_laporan' align='center'>".number_format($row2->roi_kum_netto,4,",",".")."</td>";
						$cek=1;
					}
					
					$sql="select sum(a.roi_kum_netto) as roi_kum_netto 
					from inv_rd_roi a 
					inner join relinv b on a.kode_rdklp=b.modul
					where a.tanggal='$tanggal' and b.kode_neraca='$row->kode_neraca' 
					group by b.kode_neraca ";
					$rs2 = $dbLib->execute($sql);	
					
					while ($row2 = $rs2->FetchNextObject($toupper=false))
					{
						echo "<td class='isi_laporan' align='center'>".number_format($row2->roi_kum_netto,4,",",".")."</td>";
						$cek=1;
					}
					
					if ($cek==0)
					{
						echo "<td class='isi_laporan' align='center'>&nbsp;</td>";
					}
				}
				
			echo "</tr>";
			
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>";
		echo "</td></tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
