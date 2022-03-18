<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_aset_rptAset extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(id_aset) as jum from am_aset a
		left join am_proyek b on a.kode_proyek=b.kode_proyek 
		left join am_pp c on a.kode_pp=c.kode_pp 
		left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
		left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
		left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
		left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
		left join am_kateg h on a.kode_kateg=h.kode_kateg 
		left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
		left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
		left join vendor k on a.kode_vendor=k.kode_vendor 
		$this->filter 
		";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			//$totPage = ceil($count / 50);				
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
		$sql="select a.kode_kolom,b.kode_tabel,b.nama,b.lebar
				from gr_kolom_tmp a
				inner join gr_kolom b on a.kode_kolom=b.kode_kolom
				where a.nik_user='$nik_user' and b.kode_klp='AM' ";
		
		$rs = $dbLib->execute($sql);
		$baris=$rs->GetRows();
		
		$kolom="";$kolom_tabel="";
		for ($i=0; $i <= count($baris)-1; $i++) 
		{
			$kolom.=$baris[$i][1]." as ".$baris[$i][2].",";
			$kolom_tabel.="<td width='".$baris[$i][3]."'  align='center' class='header_laporan'>".$baris[$i][0]."</td>";
		}
		$jum=strlen($kolom);
		$kolom_sql="select  ".substr($kolom,0,$jum-1);
		$sql=$kolom_sql." from am_aset a 
		left join am_proyek b on a.kode_proyek=b.kode_proyek 
		left join am_pp c on a.kode_pp=c.kode_pp 
		left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
		left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
		left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
		left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
		left join am_kateg h on a.kode_kateg=h.kode_kateg 
		left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
		left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
		left join vendor k on a.kode_vendor=k.kode_vendor 
			$this->filter 
			order by a.id_aset ";

		// echo $sql;

		//$rs = $dbLib->execute($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data asset",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' colspan='7' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>";
	 echo $kolom_tabel;
	 $y=1;
	  echo "</tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr >
     			<td class='isi_laporan' align='center'>$y</td>";
			for ($i=0; $i <= count($baris)-1; $i++) 
			{
				$kol=$baris[$i][2];
			
				$tmp="\$row->$kol";
				eval("\$str = \"$tmp\";");
				echo "<td class='isi_laporan' >".$str."</td>";
			}
     		echo "</tr>";
			$y++;
		}
	
		echo "</table><br>";
		echo "</div>";
	
		return "";
		
	}
	
}
?>
