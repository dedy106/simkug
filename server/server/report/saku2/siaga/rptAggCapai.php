<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptAggCapai extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(kode_akun) as jum from glma_drk_tmp where nik_user='$nik_user' ".$this->filter;

		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode1=$tmp[1];
		$periode2=$tmp[2];
		$sql = "select  kode_akun, kode_lokasi, substring(periode,1,4) as tahun, nama_akun, periode, 
		n1,n2,n3,n4 from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pencapaian anggaran",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='25' rowspan='2' class='header_laporan'><div align='center'>No</div></td>
      <td width='90' rowspan='2' class='header_laporan'><div align='center'>Kode Akun</div></td>
      <td width='250' rowspan='2' class='header_laporan'><div align='center'>Nama Akun </div></td>
      <td height='20' colspan='2' class='header_laporan'><div align='center'>Anggaran</div></td>
      <td colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
      <td colspan='2' class='header_laporan'><div align='center'>Pencapaian</div></td>
      <td width='40' rowspan='2' class='header_laporan'><div align='center'>Growth</div></td>
    </tr>
    <tr bgcolor='#CCCCCC'>
    <td width='90' height='20' class='isi_laporan'><div align='center'>$periode1</div></td>
    <td width='90' class='header_laporan'><div align='center'>$periode2</div></td>
    <td width='90' class='header_laporan'><div align='center'>$periode1</div></td>
    <td width='90' class='header_laporan'><div align='center'>$periode2</div></td>
    <td width='30' class='header_laporan'><div align='center'>%</div></td>
    <td width='30' class='header_laporan'><div align='center'>%</div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$sisa=0;$n4=0;$n5=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$sisa=$sisa+$n1-$n5;
			$persen1=0;$persen2=0;$persen3=0;
			if ($row->n1!=0)
			{
				$persen1=($row->n3/$row->n1)*100;  
			}
			
			if ($row->n2!=0)
			{
				$persen2=($row->n4/$row->n2)*100;  
			}
			if ($row->n3!=0)
			{
			    $persen3=($row->n4/$row->n3)*100;  
			}
			echo "<tr>
    <td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan'>&nbsp;$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n1,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n2,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n3,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>".number_format($persen1,2,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($persen2,2,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($persen3,2,',','.')."</div></td>
  </tr>";
			$i=$i+1;
		}
		$jum_persen1=0;$jum_persen2=0;
		if ($n1!=0)
		{
			$jum_persen1=($n3/$n1)*100;  
		}
		if ($n2!=0)
		{
			$jum_persen2=($n4/$n2)*100;  
		}
		echo "<tr>
    <td height='20' colspan='3' class='header_laporan'><div align='right'>Total&nbsp;</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($n4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($jum_persen1,2,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($jum_persen1,2,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($jum_persen3,2,',','.')."</div></td>
  </tr>
</table></div>";
		
		return "";
	}
	
}

