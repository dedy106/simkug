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
class server_report_saku2_gl_rptRkma extends server_report_basic
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
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$pp=strtoupper($tmp[4]);
		$lokasi=$tmp[5];
		$ttd=$tmp[6];
		$bulan=substr($periode,4,2);
		switch ($bulan) 
		{
			case "01":
				$bln="JANUARI";
				break;
			case "02":
				$bln="FEBRUARI";
				break;
			case "03":
				$bln="MARET";
				break;
			case "04":
				$bln="APRIL";
				break;
			case "05":
				$bln="MEI";
				break;
			case "06":
				$bln="JUNI";
				break;
			case "07":
				$bln="JULI";
				break;
			case "08":
				$bln="AGUSTUS";
				break;
			case "09":
				$bln="SEPTEMBER";
				break;
			case "10":
				$bln="OKTOBER";
				break;
			case "11":
				$bln="NOVEMBER";
				break;
			case "12":
				$bln="DESEMBER";
				break;
		}
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,
				   case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5
			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("RENCANA KERJA MANAJERIAL & ANGGARAN (RKMA) ","","TAHUN $tahun<br>$pp");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
		<tr><td><table width='100%'  border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td align='center' class='lokasi_laporan2'>RENCANA KERJA MANAJERIAL & ANGGARAN (RKMA)</td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>TAHUN $tahun</td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>$pp</td>
  </tr>
</table></td></tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
		    <td width='30' rowspan='2' align='center'  class='header_laporan'>NO</td>
			<td width='250' rowspan='2' align='center'  class='header_laporan'><div align='center'>URAIAN KEGIATAN / AKTIFITAS</div></td>
			<td width='100' rowspan='2' align='center' class='header_laporan'>TARGET/RKA THN</td>
			<td width='100' rowspan='2' align='center' class='header_laporan'>TARGET S/D $bln</td>
			<td width='100' rowspan='2' align='center' class='header_laporan'>REAL SD $bln</td>
			<td height='25' colspan='2' align='center' class='header_laporan'>%</td>
			<td colspan='2' align='center' class='header_laporan'>SALDO</td>
		</tr>
		  <tr bgcolor='#CCCCCC'>
		    <td width='60' height='25' align='center' class='header_laporan'>THD TGT THN</td>
		    <td width='60' align='center' class='header_laporan'>THD TGT SD $bln</td>
		    <td width='100' align='center' class='header_laporan'>TARGET THN</td>
		    <td width='100' align='center' class='header_laporan'>TARGET S/D $bln</td>
  </tr>";
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->n1!=0 || $row->n2!=0 ||  $row->n5!=0)
			{
				$nilai="";
				if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
				{
					$nilai=number_format($row->n5,0,",",".");
				}
				if ($row->n1<>0)
				{
					$persen1=($row->n5/$row->n1)*100;
				}
				if ($row->n2<>0)
				{
					$persen2=($row->n5/$row->n2)*100;
				}
				echo "<tr><td class='isi_laporan' align='center'>$i</td>";
				echo "<td height='20' class='isi_laporan'>";
				echo fnSpasi($row->level_spasi);
				if ($row->tipe=="Posting" && $row->n5 <> 0)
				{
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
				}
				else
				{
					echo "$row->nama";
				}
				echo "</td>
					<td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,",",".")."</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n1-$row->n5,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2-$row->n5,0,",",".")."</td>
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
		}
		echo "</table></td></tr>";
		
		echo "</div>";
		return "";
	}
	
}
?>
