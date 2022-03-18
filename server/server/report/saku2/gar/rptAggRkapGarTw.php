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
class server_report_saku2_gar_rptAggRkapGarTw extends server_report_basic
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
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];
		$ttd=$tmp[6];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
					case jenis_akun when  'Pendapatan' then -(n1+n2+n3) else (n1+n2+n3) end as n1,
					case jenis_akun when  'Pendapatan' then -(n4+n5+n6) else (n4+n5+n6) end as n2,
					case jenis_akun when  'Pendapatan' then -(n7+n8+n9) else (n7+n8+n9) end as n3,
					case jenis_akun when  'Pendapatan' then -(n10+n11+n12) else (n10+n11+n12) end as n4,
					case jenis_akun when  'Pendapatan' then -(n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12) else (n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12) end as total
			from neraca_tmp 
			where nik_user='$nik_user' 
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
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
			<td width='90' class='header_laporan'><div align='center'>Triwulan 1 </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 2</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 3</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 4</div></td>
	<td width='100' class='header_laporan'><div align='center'>Total</div></td>
		</tr>";
	$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			
			$total=$total+$row->total;
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
				<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
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
  </tr>
  <tr>
    <td align='right'>";
		if ($ttd=="Ya")
		{
			$sql="select a.kota,b.nik as nik1,upper(b.nama) as nama1,upper(b.jabatan) as jabatan1,getdate() as tanggal,
       c.nik as nik2,upper(c.nama) as nama2,upper(c.jabatan) as jabatan2 
from lokasi a
left join (select b.nik,b.nama,b.jabatan,a.kode_lokasi
           from spro a  
           inner join karyawan b on a.flag=b.nik
           where a.kode_spro='TTD1' and a.kode_lokasi='$lokasi'
           )b on a.kode_lokasi=b.kode_lokasi
left join (select b.nik,b.nama,b.jabatan,a.kode_lokasi
           from spro a  
           inner join karyawan b on a.flag=b.nik
           where a.kode_spro='TTD2' and a.kode_lokasi='$lokasi'
           )c on a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$lokasi'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			echo "<table border='0' cellspacing='2' cellpadding='1'>
     
		<tr>
        <td width='200' class='header_laporan' align='center'>&nbsp;</td>
        <td width='200' class='header_laporan' align='center'>".$row->kota. ", &nbsp;&nbsp;&nbsp;".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
		<tr>
        <td width='200' class='header_laporan' align='center'>Mengetahui / Menyetujui</td>
        <td width='200' class='header_laporan' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td width='200' class='header_laporan' align='center'>$row->jabatan1 </td>
        <td width='200' class='header_laporan' align='center'>$row->jabatan2</td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan' align='center'>$row->nama1</td>
        <td class='header_laporan' align='center'>$row->nama2</td>
      </tr>
      <tr>
        <td class='header_laporan' align='center'>$row->nik1</td>
        <td class='header_laporan' align='center'>$row->nik2</td>
      </tr>
    </table>";
		}
		echo "</td>
  </tr>
</table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
