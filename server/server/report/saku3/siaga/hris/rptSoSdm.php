<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_siaga_hris_rptSoSdm extends server_report_basic
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
		$tgl_aging=$tmp[1];
		$sql="select a.kode_so,a.kode_lokasi,a.nama,a.level_spasi,a.tipe,convert(varchar(20),a.tgl_awal,103) as tgl1,convert(varchar(20),a.tgl_akhir,103) as tgl2
from gr_so a 
where a.kode_lokasi='01'  
order by a.rowindex";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];
		$path = substr($path,0,strpos($path,"server/serverApp.php"));	
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Struktur Organisasi",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC' align='center'>
	 <td width='250' class='header_laporan'>Deskripsi</td>
	 <td width='60' class='header_laporan'>ID</td>
	 <td width='120' class='header_laporan'>Status</td>
	 <td width='150' class='header_laporan'>Kepala</td>
     <td width='60' class='header_laporan'>Tgl Mulai</td>
	 <td width='60' class='header_laporan'>Tgl Selesai</td>
	 <td width='60' class='header_laporan'>Tgl Update</td>
     </tr>
    ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gb1 = $path . "server/image/folder.png";
			$gb2 = $path . "server/image/user2.bmp";
			$gb3 = $path . "server/image/user.bmp";
			$gb=$gb1;
			if ($row->tipe=="Posting")
			{
				$gb=$gb3;
			}
		echo "<tr >
		
		<td class='isi_laporan' valign='center'>";
		echo fnSpasi($row->level_spasi);
		echo "<img src=$gb  />&nbsp;$row->nama</td>
		<td class='isi_laporan'>$row->kode_so</td>
		<td class='isi_laporan'>$row->status</td>
		<td class='isi_laporan'>$row->kepala</td>
		<td class='isi_laporan'>$row->tgl1</td>
		<td class='isi_laporan'>$row->tgl2</td>
		<td class='isi_laporan'>$row->tgl_update</td>
	 </tr>";
			if ($row->tipe=="Posting")
			{
				$sql="select a.nik,b.nama,convert(varchar(20),a.tgl_awal,103) as tgl1,convert(varchar(20),a.tgl_akhir,103) as tgl2,
				convert(varchar(20),a.tgl_input,103) as tgl3, case when a.tgl_akhir < '$tgl_aging' then 'out' else 'in' end as status
				from gr_dinas a
				inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
				where a.kode_so='$row->kode_so' and a.kode_lokasi='$row->kode_lokasi' and a.tgl_awal <= '$tgl_aging'
				";
				
				$rs1 = $dbLib->execute($sql);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$gb4=$path . "server/image/down.bmp";
					if ($row1->status=="out")
					{
						$gb4=$path . "server/image/up.bmp";
					}
					echo "<tr > <td class='isi_laporan' valign='center'>";
					echo fnSpasi($row->level_spasi+1);
					echo "<img src=$gb2  />&nbsp;<img src=$gb4  /> &nbsp;$row1->nama</td>
					<td class='isi_laporan'>$row1->nik</td>
					<td class='isi_laporan'></td>
					<td class='isi_laporan'></td>
					<td class='isi_laporan'>$row1->tgl1</td>
					<td class='isi_laporan'>$row1->tgl2</td>
					<td class='isi_laporan'>$row1->tgl3</td>
				 </tr>";
				}
			}
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
