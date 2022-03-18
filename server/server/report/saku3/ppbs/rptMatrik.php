<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptMatrik extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$kode_lokasi=$tmp[0];
		$jenis=$tmp[1];
		$tahun=$tmp[2];
		$nama_file="drk.xls";
		if ($jenis=="Excell")
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
	
		
		$sql="select a.kode_program,a.nama as nama_program,b.kode_rkm,b.nama as nama_rkm,c.kode_drk,c.nama as nama_drk,
					isnull(d.inv,0) as inv,isnull(d.beban,0) as beban,isnull(d.pdpt,0) as pdpt
			from agg_program a
			inner join agg_rkm b on a.kode_program=b.kode_program and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
			inner join agg_drk c on b.kode_rkm=c.kode_rkm and b.kode_lokasi=b.kode_lokasi and b.tahun=c.tahun
			inner join (select a.kode_drk,a.kode_lokasi, 
					sum(case when d.jenis='Neraca' then a.total else 0 end) as inv, 
					sum(case when d.jenis='Beban' then a.total else 0 end) as beban, 
					sum(case when d.jenis='Pendapatan' then a.total else 0 end) as pdpt 
					from agg_d a 
					inner join agg_drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi and b.tahun='2022' 
					inner join agg_rkm c on b.kode_rkm=c.kode_rkm and b.kode_lokasi=c.kode_lokasi and c.tahun='2022' 
					inner join masakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
					$this->filter
					group by a.kode_drk,a.kode_lokasi
					)d on c.kode_drk=d.kode_drk and c.kode_lokasi=d.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun'
			order by a.kode_program,b.kode_rkm,c.kode_drk";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA MATRIK DRK",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Kode Program</td>
	  <td width='250'  align='center' class='header_laporan'>Nama Program</td>
	 <td width='80'  align='center' class='header_laporan'>Kode RKM</td>
     <td width='250'  align='center' class='header_laporan'>Nama RKM</td>
	 <td width='100'  align='center' class='header_laporan'>Kode DRK</td>
     <td width='250'  align='center' class='header_laporan'>Nama DRK </td>
	 <td width='100'  align='center' class='header_laporan'>Pendapatan</td>
	 <td width='100'  align='center' class='header_laporan'>Beban</td>
	 <td width='100'  align='center' class='header_laporan'>Investasi</td>
	  </tr>  ";
		$pdpt=0; $beban=0; $inv=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pdpt+=$row->pdpt;
			$beban+=$row->beban;
			$inv+=$row->inv;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_program</td>
	 <td class='isi_laporan'>$row->nama_program</td>
	 <td class='isi_laporan'>$row->kode_rkm</td>
	 <td class='isi_laporan'>$row->nama_rkm</td>
	 <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->nama_drk</td>
	 <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->beban,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->inv,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='7'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($pdpt,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($beban,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($inv,0,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
