<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggPakaiYks extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(a.kode_akun) as jum from glma_drk_tmp a 
				inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
				where a.nik_user='$nik_user' ".$this->filter;
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
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(a.kode_akun) as jum,sum(a.n1) as n1,sum(a.n2) as n2,sum(a.n3) as n3,sum(a.n4) as n4,sum(a.n5) as n5 
		from glma_drk_tmp a 
		inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
		where a.nik_user='$nik_user' ".$this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5;
		error_log($result);
		return $result;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$sql = "select  a.kode_akun, a.kode_lokasi, a.kode_pp, a.kode_drk, a.nama_akun, a.nama_pp, a.nama_drk, a.periode, substring(a.periode,1,4) as tahun,
		n1,n2,n3,
		case when b.jenis='Pendapatan' then -n4 else n4 end as n4,
		case when b.jenis='Pendapatan' then -n5 else n5 end as n5
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pemakaian anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='27' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='69' rowspan='2'  class='header_laporan'><div align='center'>Kode</div></td>
    <td width='190' rowspan='2' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='74' rowspan='2' class='header_laporan'><div align='center'>Kode PP </div></td>
    <td width='150' rowspan='2' class='header_laporan'><div align='center'>Nama PP </div></td>
    <td width='40' rowspan='2' class='header_laporan'><div align='center'>Kode DRK</div></td>
	<td width='150' rowspan='2' class='header_laporan'><div align='center'>Nama DRK</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target / Tahun </div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target S.D Bulan Berjalan </div></td>
	<td width='90' rowspan='2' class='header_laporan'><div align='center'>Target Bulan Berjalan </div></td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='right' class='header_laporan'>
      <div align='center'>Sisa Anggaran </div>
    </div></td>
  </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan'><div align='center'>Bulan Berjalan </div></td>
    <td width='90' class='header_laporan'><div align='center'>S.D Bulan Berjalan </div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$sisa=$sisa+($row->n1-$row->n5);
			echo "<tr><td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->kode_drk</td>
	<td class='isi_laporan'>$row->nama_drk</td>
   <td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk');\">".number_format($row->n1,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right' >".number_format($row->n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
	<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun','$row->kode_pp','$row->kode_drk');\">".number_format($row->n5,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		$n3=$tmp[3];
		$n4=$tmp[4];
		$n5=$tmp[5];
		if ($this->page==$max)
		{
		echo "<tr>
    <td height='20' colspan='7' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n1,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n2,0,',','.')."</span></div></td>
	<td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n3,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n4,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n5,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($sisa,0,',','.')."</span></div></td>
  </tr>";
		}
		
		echo "</table></div>";
		return "";
	}
	
}

