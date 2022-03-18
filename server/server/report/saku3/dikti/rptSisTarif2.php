<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dikti_rptSisTarif2 extends server_report_basic
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
		// $kode_pp=$tmp[1];
		$kode_ta=$tmp[1];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql1="select lower(a.kode_param) as kode_param,b.nama
			from dikti_mhs_tarif a
			inner join dikti_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' 
            group by a.kode_param,b.nama
            -- where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and '$periode' between a.per_awal and a.per_akhir
            ";
        // echo $sql1;

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
		

		// $sql="select a.nim,a.kode_lokasi,c.kode_kelas,c.nama,a.kode_akt,$kolom_sql,a.total
        // from (select a.nim,a.kode_lokasi,b.kode_kelas,b.kode_akt,$kolom_sql2,sum(a.tarif) as total
        //     from dikti_mhs_tarif a
        //     inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
        //     inner join dikti_ta d on a.kode_ta=d.kode_ta and a.kode_lokasi=d.kode_lokasi
		// 	where a.kode_lokasi='$kode_lokasi' and a.kode_ta='$kode_ta'
        //     group by a.nim,a.kode_lokasi,b.kode_kelas,b.kode_akt
        //     )a
        // inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
        // inner join dikti_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi 
        // $this->filter
		// order by a.nim,a.kode_kelas ";
		$sql ="select a.nim,a.kode_lokasi,c.kode_kelas,c.nama,a.kode_akt,$kolom_sql,a.total
        from (select a.nim,a.kode_lokasi,b.kode_kelas,b.kode_akt,$kolom_sql2,sum(a.tarif) as total
            from ( select distinct a.kode_lokasi,a.kode_ta,a.nim,a.tarif,a.kode_param
					from dikti_mhs_tarif a  
					where a.kode_lokasi='$kode_lokasi'
				) a
			inner join dikti_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' and a.kode_ta='$kode_ta'
            group by a.nim,a.kode_lokasi,b.kode_kelas,b.kode_akt
            )a
        inner join dikti_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi 
        inner join dikti_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi 
        $this->filter
        order by a.nim,a.kode_kelas ";

        // echo $sql;
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tarif siswa",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	
     <td width='100'  align='center' class='header_laporan'>NIM</td>
	 <td width='250'  align='center' class='header_laporan'>Nama</td>
	 <td width='60'  align='center' class='header_laporan'>Kelas</td>
	 <td width='80'  align='center' class='header_laporan'>Angkatan</td>";
		echo $kolom_tabel;
		echo "<td width='90'  align='center' class='header_laporan'>Total</td>";
	    echo "</tr>  ";
		$j=1;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			echo "<tr >
     <td class='isi_laporan' align='center'>$j</td>
	 <td class='isi_laporan'>$row->nim</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_kelas</td>
	 <td class='isi_laporan'>$row->kode_akt</td>";
			for ($i=0; $i <= count($baris)-1; $i++) 
			{
				$kol=$baris[$i][0];
				$tmp="\$row->$kol";
				eval("\$str = \"$tmp\";");	
				echo "<td class='isi_laporan' align='right'>".number_format($str,0,",",".")."</td>";
			}
			echo "<td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>";
			echo "</tr>";
			$j=$j+1;
		}
		$jum_tabel=5+count($baris);
		echo "<tr >
	  <td class='header_laporan' align='center' colspan='$jum_tabel'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
