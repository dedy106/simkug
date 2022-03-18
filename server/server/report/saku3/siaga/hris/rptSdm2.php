<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptSdm2 extends server_report_basic
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
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

		$sql="select a.kode_kolom,b.kode_tabel,b.nama,b.lebar
				from gr_kolom_tmp a
				inner join gr_kolom b on a.kode_kolom=b.kode_kolom and a.kode_lokasi=b.kode_lokasi
				where a.nik_user='$nik_user' and a.kode_lokasi='$kode_lokasi' and kode_klp='HR' ";

		
		$rs = $dbLib->execute($sql);
		$baris=$rs->GetRows();
		
		$kolom="";$kolom_tabel="";
		for ($i=0; $i <= count($baris)-1; $i++) 
		{
			if($baris[$i][1] == "a.tgl_masuk" || $baris[$i][1] == "a.tgl_lahir" || $baris[$i][1] == "a.tgl_nikah"){
				$kolom.="convert(varchar,".$baris[$i][1].",103) as ".$baris[$i][2].",";
			}else{
				$kolom.=$baris[$i][1]." as ".$baris[$i][2].",";
			}
			$kolom_tabel.="<td width='".$baris[$i][3]."'  align='center' class='header_laporan'>".$baris[$i][0]."</td>";
		}
		$jum=strlen($kolom);
		$kolom_sql="select ".substr($kolom,0,$jum-1);
	
		$sql=$kolom_sql." from gr_karyawan a
		left join gr_status_agama b on a.sts_agama=b.sts_agama and a.kode_lokasi = b.kode_lokasi 
		left join gr_so c on a.kode_so=c.kode_so and a.kode_lokasi = c.kode_lokasi
		left join gr_jab d on a.kode_jab=d.kode_jab
		left join gr_vendor e on a.kode_vendor=e.kode_vendor
		left join gr_loker f on a.kode_loker=f.kode_loker
		left join gr_dir g on a.kode_dir=g.kode_dir
		left join gr_grade h on a.kode_grade=h.kode_grade
		left join gr_prov i on a.kode_prov=i.kode_prov
		left join gr_dept j on a.kode_dept=j.kode_dept
		left join gr_kota k on a.kode_kota=k.kode_kota 
		left join gr_lokkantor l on a.lok_kantor=l.kode_lokkantor 
		left join gr_dinas m on a.nik=m.nik and a.kode_lokasi=m.kode_lokasi and m.flag_aktif='1'
		left join gr_status_sdm n on a.sts_sdm=n.sts_sdm
		left join gr_jur p on a.kode_jur=p.kode_jur
			$this->filter
			order by a.nik ";

			// echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data karyawan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
	 <td width='30'  align='center' class='header_laporan'>No</td>";
	 echo $kolom_tabel;
	  echo "</tr>  ";
	  
		$j=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr >
				 <td class='isi_laporan' align='center'>$j</td> ";
			for ($i=0; $i <= count($baris)-1; $i++) 
			{
				$kol=$baris[$i][2];
				
				$tmp="\$row->$kol";
				eval("\$str = \"$tmp\";");
				
				if ($kol=='nik')
				{
					echo "
				 <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->nik');\">$row->nik</a>";
			echo "</td>";

				} elseif ($kol=='nik_seb')
				{
					echo "
				 <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpen('$row->nik_seb');\">$row->nik_seb</a>";
			echo "</td>";
				}
				else{

					echo "<td class='isi_laporan' >".$str."</td>";
				}
				
			}

     		echo "</tr>";
			 $j=$j+1;

		}

		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
