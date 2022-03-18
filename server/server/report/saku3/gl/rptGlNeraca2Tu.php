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
class server_report_saku3_gl_rptGlNeraca2Tu extends server_report_basic
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$bentuk=$tmp[3];
		$bulan=substr($periode,4,2);
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		$periode2=$tahun_rev.$bulan;
		$sql="exec sp_neraca2_dw 'FS2','A','S','1','$periode','$periode2','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
	   
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
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
		$tgl=$totime[0];
		$totime = $tgl . " ". $bln ." ". $totime[2];
		$totime2 = $tgl . " ". $bln ." ". $tahun_rev;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("laporan keuangan",$this->lokasi,"Posisi : $totime dan $tahun_rev");
		
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				  <tr bgcolor='#CCCCCC'>
					<td width='400' height='25'  class='header_laporan' align='center'>Keterangan</td>
					<td width='120' class='header_laporan' align='center'>Posisi Neraca <br>Per $totime</td>
					<td width='120' class='header_laporan' align='center'>Posisi Neraca <br>Per $totime2</td>
				</tr>
				";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,level_spasi,n1,n2,level_spasi 
			from neraca_tmp 
			where modul='A' and nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";$nilai2="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n1,0,",",".");
				$nilai2=number_format($row->n2,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting")
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
					<td class='isi_laporan'><div align='right'>$nilai</div></td>
					<td class='isi_laporan'><div align='right'>$nilai2</div></td>
				  </tr>";
			
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='2' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,n1*-1 as n1,n2*-1 as n2,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user' order by rowindex ";

		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";$nilai2="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n1,0,",",".");
				$nilai2=number_format($row->n2,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" )
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
					<td class='isi_laporan'><div align='right'>$nilai</div></td>
					<td class='isi_laporan'><div align='right'>$nilai2</div></td>
				  </tr>";
			
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="	select a.kode_akun,c.nama,n1*-1 as n1,n2*-1 as n2
						from glma_tmp a
						inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
						inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
						where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.nik_user='$nik_user' and (a.n1<>0 or a.n2<>0 or a.n3<>0 or a.n4<>0)
						group by a.kode_akun,c.nama
						order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
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
			$sql="select a.kota,b.nik as nik1,upper(b.nama) as nama1,upper(b.jabatan) as jabatan1,getdate() as tanggal
from lokasi a
left join (select b.nik,b.nama,b.jabatan,a.kode_lokasi
           from spro a  
           inner join karyawan b on a.flag=b.nik
           where a.kode_spro='TTD1' and a.kode_lokasi='$lokasi'
           )b on a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$lokasi'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			echo "<table border='0' cellspacing='2' cellpadding='1'>
     		<tr>
        <td width='200' class='header_laporan' align='center'>".$row->kota. ", &nbsp;&nbsp;&nbsp;".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
		<tr>
        <td width='200' class='header_laporan' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td width='200' class='header_laporan' align='center'>$row->jabatan</td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan' align='center'>$row->nama</td>
      </tr>
     
    </table";
		}
		echo "</td>
  </tr>
</table>";
		
		echo "</div>";
		
		return "";
	}
	
}
?>