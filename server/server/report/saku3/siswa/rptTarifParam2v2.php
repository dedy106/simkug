<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptTarifParam2v2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$jenis=$tmp[3];
		$tahunaka=$tmp[2];

		if($tahunaka != ""){
			$sql="select substring(convert(varchar,tgl_mulai,112),1,6) as tgl_mulai,substring(convert(varchar,tgl_akhir,112),1,6) as tgl_akhir from sis_ta where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and kode_ta='$tahunaka' ";

			// echo $sql."<br>";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			$tgl_mulai=$row->tgl_mulai;
			$tgl_akhir=$row->tgl_akhir;

			$filta=" and (a.bulan1 >='$tgl_mulai' and a.bulan2 <='$tgl_akhir') ";
		}else{
			$filta="";
		}

		$nama_file="parameter_tarif.xls";
		
		$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_pp=$row->nama;
		

		if ($jenis=="Excel")
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
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar parameter tarif",$this->lokasi."<br>".$nama_pp,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
		<tr bgcolor='#CCCCCC'>
			<td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
			<td width='80' rowspan='2' align='center' class='header_laporan'>Kode PP</td>";
			if($tahunaka!=""){
				echo"
			    <td width='80' rowspan='2' align='center' class='header_laporan'>Tahun Akademik</td>";
			}	
			echo"
			<td width='80' rowspan='2' align='center' class='header_laporan'>Angkatan</td>
			<td width='80' rowspan='2' align='center' class='header_laporan'>Tingkat</td>
			<td width='200' rowspan='2' align='center' class='header_laporan'>Jurusan</td>
			<td width='80' rowspan='2' align='center' class='header_laporan'>Jumlah Siswa</td>";
			
			$sql1="select distinct a.kode_param,a.nama as param from sis_param a where a.kode_lokasi='$kode_lokasi' and a.kode_param not like'%_tk'";

			$rs1 = $dbLib->execute($sql1);	
			$baris = $rs1->GetRows();
			$kolom="";$kolom_tabel="";$kolom2="";
            $left_join = ""; $select_column = "";
			for ($i=0; $i <= count($baris)-1; $i++) 
			{
				$kolom_tabel.="<td align='center' colspan='3' class='header_laporan' width='90'>".$baris[$i][1]."</td>";
                $select_column.=",isnull(d".$i.".tarif,0) as tarif".$i.", isnull(d".$i.".bulan1,'-') as bulan1".$i.", isnull(d".$i.".bulan2,'-') as bulan2".$i;
                $left_join.="
                left join (select a.kode_param,a.kode_pp,a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_lokasi,
                           case when a.tarif=0 then '-' else a.bulan1 end as bulan1,case when a.tarif=0 then '-' else a.bulan2 end as bulan2, a.tarif						   
                           from sis_param_tarif a  
                           where a.kode_lokasi='$kode_lokasi' $filta
                ) d".$i." on a.kode_pp=d".$i.".kode_pp and a.kode_akt=d".$i.".kode_akt and a.kode_tingkat=d".$i.".kode_tingkat and a.kode_jur=d".$i.".kode_jur and a.kode_lokasi=c.kode_lokasi and d".$i.".kode_param='".$baris[$i][0]."' ";
			}
		
			echo $kolom_tabel."
			
			<td width='90' rowspan='2' align='center' class='header_laporan'>Total Tarif</td>
		</tr>
		<tr bgcolor='#CCCCCC'>";
		for ($b=0; $b < $i; $b++) {
			echo"
			<td width='90' align='center' class='header_laporan'>Tarif</td>
			<td width='90' align='center' class='header_laporan'>Periode Awal</td>
			<td width='90' align='center' class='header_laporan'>Periode Akhir</td>";
		}
		echo"
		</tr>";

		$sql="select a.*,isnull(c.jum,0) as jum $select_column
        from (
                select a.kode_pp,a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_lokasi
                from sis_param_tarif a where a.kode_lokasi='$kode_lokasi' $filta
                group by a.kode_pp,a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_lokasi
        ) a
        left join (select a.kode_pp,a.kode_lokasi,a.kode_akt,b.kode_jur,b.kode_tingkat,count(a.nis) as jum
                            from sis_siswa a
                            inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                            where a.flag_aktif='1'
                            group by a.kode_pp,a.kode_lokasi,a.kode_akt,b.kode_jur,b.kode_tingkat
                            ) c on a.kode_pp=c.kode_pp and a.kode_akt=c.kode_akt and a.kode_tingkat=c.kode_tingkat and a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi
        ".$left_join."
        $this->filter
        order by a.kode_pp,a.kode_tingkat,a.kode_akt,a.kode_jur";

		
		echo $sql."<br>";
		$rs = $dbLib->execute($sql);	
		$c = 1;
		// $jum=$rs->RecordCount();
		$tot[]=0;
		$total_all =0;
		$jumsis=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumsis=$jumsis+$row->jum;
			echo "<tr>
			<td class='isi_laporan'>$c</td>
			<td class='isi_laporan'>$row->kode_pp</td>";
			if($tahunaka!=""){
				echo"
			    <td class='isi_laporan'>$tahunaka</td>";
			}
			echo"	
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_tingkat</td>
			<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetTarif('$row->kode_pp','$kode_lokasi','$row->kode_akt','$row->kode_tingkat','$tahunaka','$row->kode_jur');\">$row->kode_jur</a></td>
			<td class='isi_laporan'>$row->jum</td>";
			$total = 0;
			for ($j=0; $j <= count($baris)-1; $j++) 
			{
				echo"
					<td class='isi_laporan' align='right'>".number_format(eval('$row->tarif'.$j),0,',','.')."</td>
					<td class='isi_laporan' align='right'>".eval('$row->bulan1'.$j)."</td>
					<td class='isi_laporan' align='right'>".eval('$row->bulan2'.$j)."</td>";
				$tot[$j]+=+ eval('$row->tarif'.$j);
				$total +=+ eval('$row->tarif'.$j);
			}	
			$total_all +=+ $total;			
			echo"
			<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
			</tr>";	 
			$c=$c+1;
		}

		echo"
		<tr bgcolor='#CCCCCC'>
			<td width='90' align='center' class='header_laporan' colspan='7'>Total</td>";
		for ($b=0; $b < $i; $b++) {
			echo"
			<td width='90' align='right' class='header_laporan'>".number_format($tot[$b],0,",",".")."</td>
			<td width='90' align='center' class='header_laporan'></td>
			<td width='90' align='center' class='header_laporan'></td>";
		}
		echo"
			<td width='90' align='right' class='header_laporan'>".number_format($total_all,0,",",".")."</td>
		</tr>
		</table></div>";
		return "";
	}
	
}
?>
  
