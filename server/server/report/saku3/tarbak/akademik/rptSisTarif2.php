<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_akademik_rptSisTarif2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql1="select lower(a.kode_param) as kode_param,b.nama
			from sis_siswa_tarif a
			inner join sis_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
			where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and '$periode' between a.per_awal and a.per_akhir
			group by a.kode_param,b.nama
			";
		
		// echo $sql1."<br>";

		$rs1 = $dbLib->execute($sql1);	
		$baris=$rs1->GetRows();
		$kolom="";$kolom_tabel="";$kolom2="";
		for ($i=0; $i <= count($baris)-1; $i++) 
		{
			$kolom.="a.".$baris[$i][0].",";
			$kolom2.="sum(case when a.kode_param='".$baris[$i][0]."' then a.tarif else 0 end) as ".$baris[$i][0].",";
			$kolom_tabel.="<td align='center' class='header_laporan' width='90'>".$baris[$i][1]."</td>";
		}
		$jum=strlen($kolom);
		$kolom_sql=substr($kolom,0,$jum-1);
		$jum2=strlen($kolom2);
		$kolom_sql2=substr($kolom2,0,$jum2-1);
		

		$sql="select b.id_bank,a.nis,a.kode_pp,a.kode_lokasi,b.kode_kelas,b.nama,a.kode_akt,$kolom_sql,a.total,'$periode' as periode
from (select a.nis,a.kode_pp,a.kode_lokasi,a.kode_kelas,a.kode_akt,$kolom_sql2,sum(a.tarif) as total
	from sis_siswa_tarif a
	where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and '$periode' between a.per_awal and a.per_akhir
	group by a.nis,a.kode_pp,a.kode_lokasi,a.kode_kelas,a.kode_akt
	)a
inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
inner join sis_kelas c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
$this->filter 
order by a.nis,a.kode_kelas ";
// echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tarif siswa",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>NIS</td>
	 <td width='250'  align='center' class='header_laporan'>ID Bank</td>
	 <td width='250'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kelas</td>
	 <td width='80'  align='center' class='header_laporan'>Angkatan</td>
	 <td width='80'  align='center' class='header_laporan'>Periode</td>";
		echo $kolom_tabel;
		echo "<td width='90'  align='center' class='header_laporan'>Total</td>";
	    echo "</tr>  ";
		$j=1;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			echo "<tr >
     <td class='isi_laporan' align='center'>$j</td>
	 <td class='isi_laporan'>$row->nis</td>
	 <td class='isi_laporan'>$row->id_bank</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_kelas</td>
	 <td class='isi_laporan'>$row->kode_akt</td>
	 <td class='isi_laporan'>$row->periode</td>
	 ";
			for ($i=0; $i <= count($baris)-1; $i++) 
			{
				
				$kol=$baris[$i][0];
				$tot[$i]+=$row->$kol;
				$tmp="\$row->$kol";
				eval("\$str = \"$tmp\";");	
				echo "<td class='isi_laporan' align='right'>".number_format($str,0,",",".")."</td>";
			}
			echo "<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>";
			echo "</tr>";
			$j=$j+1;
		}
		$jum_tabel=7+count($baris);
		
		echo "<tr >
		<td class='header_laporan' align='center' colspan='7'>Total</td>";
		for ($i=0; $i <= count($baris)-1; $i++) 
		{
			echo "<td class='header_laporan' align='right'>".number_format($tot[$i],0,",",".")."</td>";
		}
		echo "<td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
