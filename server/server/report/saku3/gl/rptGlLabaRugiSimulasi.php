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
class server_report_saku3_gl_rptGlLabaRugiSimulasi extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$kode_fs=$tmp[3];
		$lev=$tmp[4];
		$sql="exec sp_neraca_dw_sim '$kode_fs','L','S','$lev','$periode','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);	
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				   case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4
			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Per $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN LABARUGI (SIMULASI)</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='100' class='header_laporan'><div align='center'>Jumlah</div></td>
		</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
				<td class='isi_laporan'><div align='right'>$nilai</div></td>
			  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
						select a.kode_akun,a.nama,case c.jenis_akun when 'Pendapatan' then -a.so_akhir else a.so_akhir end as so_akhir 
						from glma_tmp a
						inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						inner join neraca c on b.kode_neraca=c.kode_neraca and b.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi
						where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
						order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
    <td class='detail_laporan'><div align='right'>$so_akhir</div></td>
  </tr>";
				}
			}
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
