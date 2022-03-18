<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggRealSemTelu extends server_report_basic
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
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$jenis_file=$tmp[2];
		$kode_lokasi=$tmp[3];
		$jenis=$tmp[4];
		$nama_file="komparasi_sem_".$tahun.".xls";
		
		if ($jenis=='Investasi')
		{
			$jenis='Neraca';
		}

		if ($kode_lokasi == "11"){
				$filterakun= "  and a.kode_akun not in ('5213116xxxx') ";
		}else{
				$filterakun= "";
		}
		//$sql="exec sp_agg_real_sem '$kode_lokasi','$jenis','$tahun','$nik_user'";
		//$rs = $dbLib->execute($sql);	
		
		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,a.nama_akun,a.nama_pp,a.nama_drk,a.periode,substring(a.periode,1,4) as tahun,
					a.n1+a.n2+a.n3+a.n4+a.n5+a.n6 as nsem1,a.n7+a.n8+a.n9+a.n10+a.n11+a.n12 as nsem2,
					a.n13+a.n14+a.n15+a.n16+a.n17+a.n18 as rsem1,a.n19+a.n20+a.n21+a.n22+a.n23+a.n24 as rsem2
				from exs_glma_drk a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.jenis='$jenis'
				".$this->filter." $filterakun order by a.kode_akun";
		
		
		
		if ($jenis_file=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);
		
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan realisasi komparasi anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table width='1120' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' class='kotak'>
<tr>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>No</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode Akun</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode Dept </div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama Dept</div></td>
    <td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Kode RKM</div></td>
<td rowspan='2' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Nama RKM</div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Semester I </div></td>
    <td colspan='3' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Semester II </div></td>
  </tr>
  <tr>
      <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Anggaran</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='80' bgcolor='#CCCCCC' class='header_laporan'><div align='center'>Sisa</div></td>
  </tr>";
		$i=$start+1;
		$nsem1=0;$nsem2=0;
		$rsem1=0;$rsem2=0;
		$ssem1=0;$ssem2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nsem1+=$row->nsem1;
			$nsem2+=$row->nsem2;
			
			$rsem1+=$row->rsem1;
			$rsem2+=$row->rsem2;
			
			
			$ssem1+=$row->nsem1-$row->rsem1;
			$ssem2+=$row->nsem2-$row->rsem2;
			echo "<tr>
    <td width='25' class='header_laporan'><div align='center'>$i</div></td>
    <td width='70' height='20' class='isi_laporan'>$row->kode_akun</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_akun</td>
    <td width='70' class='isi_laporan'>$row->kode_pp</td>
<td width='100' height='20' class='isi_laporan'>$row->nama_pp</td>
    <td width='50' class='isi_laporan'>$row->kode_drk</td>
<td width='200' height='20' class='isi_laporan'>$row->nama_drk</td>
     <td class='isi_laporan'><div align='right'>".number_format($row->nsem1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->rsem1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->nsem1-$row->rsem1,0,',','.')."</div></td>
   <td class='isi_laporan'><div align='right'>".number_format($row->nsem2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->rsem2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->nsem2-$row->rsem2,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='7' class='isi_laporan'><div align='right'>Total&nbsp;</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($nsem1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rsem1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ssem1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($nsem2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($rsem2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($ssem2,0,',','.')."</div></td>
  </tr>
</table>";
		
		return "";
	}
	
	
}

