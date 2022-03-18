<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptDwMhs2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="SELECT 1 ";
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode1=$tmp[1];
		$periode2=$tmp[2];
		$nama_file="mhs.xls";
		$sql="select a.kode_lokasi,a.kode_akt,a.kode_fakultas,d.nama,isnull(b.jum1,0) as jum1,isnull(c.jum2,0) as jum2
		from (select a.kode_lokasi,a.kode_akt,b.kode_fakultas
		from aka_bill_d a
		inner join aka_jurusan b on a.kode_pp=b.kode_jur and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and a.kode_pp like'5%' and no_bill NOT LIKE '%PLL%'
		group by a.kode_lokasi,a.kode_akt,b.kode_fakultas
			)a
		inner join aka_fakultas d on a.kode_fakultas=d.kode_fakultas and a.kode_lokasi=d.kode_lokasi
		left join (select a.kode_lokasi,a.kode_akt,a.kode_fakultas, count(a.nim) as jum1 
					from (select a.kode_lokasi,a.nim,a.tahunaka,a.no_inv,b.kode_akt,c.kode_fakultas,
					   sum(case a.dc when 'D' then a.nilai else -a.nilai end) as tagihlama 
					   from aka_bill_d a 
					   inner join aka_mahasiswa b on a.nim=b.nim and a.kode_pp=b.kode_jur 
					   inner join aka_jurusan c on a.kode_pp=c.kode_jur and b.kode_jur=c.kode_jur 
					   where a.kode_lokasi='$kode_lokasi' and a.kode_pp like'5%' and a.tahunaka='$periode1' and no_bill NOT LIKE '%PLL%' 
					   group by a.kode_lokasi,a.no_inv,a.nim,a.tahunaka,b.kode_akt,c.kode_fakultas 
					   having sum(case dc when 'D' then a.nilai else -a.nilai end) >0
					   ) a
					group by  a.kode_lokasi,a.kode_akt,a.kode_fakultas
				  )b on a.kode_akt=b.kode_akt and a.kode_lokasi=b.kode_lokasi and a.kode_fakultas=b.kode_fakultas
		left join (select a.kode_lokasi,a.kode_akt,a.kode_fakultas, count(a.nim) as jum2 
					from (select a.kode_lokasi,a.nim,a.tahunaka,a.no_inv,b.kode_akt,c.kode_fakultas,
					sum(case a.dc when 'D' then a.nilai else -a.nilai end) as tagihlama 
					from aka_bill_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_pp=b.kode_jur 
					inner join aka_jurusan c on a.kode_pp=c.kode_jur and b.kode_jur=c.kode_jur 
					where a.kode_lokasi='$kode_lokasi' and a.kode_pp like'5%' and a.tahunaka='$periode2' and no_bill NOT LIKE '%PLL%'
					group by a.kode_lokasi,a.no_inv,a.nim,a.tahunaka,b.kode_akt,c.kode_fakultas 
					having sum(case dc when 'D' then a.nilai else -a.nilai end) >0
					) a
					group by  a.kode_lokasi,a.kode_akt,a.kode_fakultas
				  )c on a.kode_akt=c.kode_akt and a.kode_lokasi=c.kode_lokasi and a.kode_fakultas=c.kode_fakultas
		$this->filter and (b.jum1 > 0 or c.jum2 > 0)
		order by a.kode_fakultas ,a.kode_akt";
		// echo $sql;
		
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
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("jumlah mahasiswa per tahun angkatan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='600'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan' height='23'>No</td>
	 <td width='50' align='center' class='header_laporan'>Kode</td>
    <td width='300' align='center' class='header_laporan'>Fakultas</td>
    <td width='80' align='center' class='header_laporan'>Angkatan</td>
    <td width='80' align='center' class='header_laporan'>$periode1</td>
    <td width='80' align='center' class='header_laporan'>$periode2</td>
   </tr>";
			$jum1=0; $jum2=0;
			$tjum1=0; $tjum2=0;
			$first = true;
			$tmp = "";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				$beda = $tmp!=$row->kode_fakultas; 
				if ($tmp!=$row->kode_fakultas)
				{				
					$first = true;
					
					if ($tmp != "")
					{
						echo "<tr>
							<td class='header_laporan' align='center' colspan='4' >Total</td>
							<td class='header_laporan' align='right'>".number_format($jum1,0,",",".")."</td>
							<td class='header_laporan' align='right'>".number_format($jum2,0,",",".")."</td>
						  </tr>";										
					}
					$tmp=$row->kode_fakultas;
					$i=1;
					$jum1=0; $jum2=0;
				}
				$jum1+=$row->jum1;
				$jum2+=$row->jum2;
				$tjum1+=$row->jum1;
				$tjum2+=$row->jum2;
				echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row->kode_fakultas</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->kode_akt</td>
				<td class='isi_laporan' align='right'>".number_format($row->jum1,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jum2,0,",",".")."</td>
				</tr>";	 
				$i=$i+1;
			}
			echo "<tr>
				<td class='header_laporan' align='center' colspan='4' >Total</td>
				<td class='header_laporan' align='right'>".number_format($jum1,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($jum2,0,",",".")."</td>
				</tr>";	 
			echo "<tr>
				<td class='header_laporan' align='center' colspan='4' >Grand Total</td>
				<td class='header_laporan' align='right'>".number_format($tjum1,0,",",".")."</td>
				<td class='header_laporan' align='right'>".number_format($tjum2,0,",",".")."</td>
				</tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
