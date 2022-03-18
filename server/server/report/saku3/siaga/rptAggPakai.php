<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptAggPakai extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$sql = "select  a.kode_akun, a.kode_lokasi, substring(a.periode,1,4) as tahun, a.nama_akun, a.periode, 
		n1,n2,n3,
		case when b.jenis='Pendapatan' then -n4 else n4 end as n4,
		case when b.jenis='Pendapatan' then -n5 else n5 end as n5
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		
		//error_log($sql);
		$rs = $dbLib->execute($sql);	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pemakaian anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='27' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='69' rowspan='2'  class='header_laporan'><div align='center'>Kode</div></td>
    <td width='250' rowspan='2' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target / Tahun </div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target S.D Bulan Berjalan </div></td>
	<td width='90' rowspan='2' class='header_laporan'><div align='center'>Target Bulan Berjalan </div></td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='90' rowspan='2' class='header_laporan' align='center'>Sisa Anggaran Bulan</td>
	<td width='90' rowspan='2' class='header_laporan' align='center'>Sisa Anggaran Tahun</td>
  </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan'><div align='center'>Bulan Berjalan </div></td>
    <td width='90' class='header_laporan'><div align='center'>S.D Bulan Berjalan </div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$sisa_bln=0; $sisa_thn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$sisa_bln=$sisa_bln+($row->n3-$row->n4);
			$sisa_thn=$sisa_thn+($row->n1-$row->n5);
			echo "<tr><td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
    <td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n1,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right' >".number_format($row->n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
	<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->periode');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartuSd('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->periode');\">".number_format($row->n5,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3-$row->n4,0,',','.')."</div></td>
	<td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		
		echo "<tr>
    <td height='20' colspan='3' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n1,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n2,0,',','.')."</span></div></td>
	<td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n3,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n4,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n5,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($sisa_bln,0,',','.')."</span></div></td>
	<td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($sisa_thn,0,',','.')."</span></div></td>
  </tr>";
		
		echo "</table></div>";
		return "";
	}
	
}

