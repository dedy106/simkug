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
class server_report_saku3_siaga_hris_rptSoSdm2 extends server_report_basic
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
		$tmp=explode(";",$this->filter2);
		$kode_lokasi=$tmp[0];
		$jenis=$tmp[1];
		$tgl_awal=$tmp[2];
		$tgl_akhir=$tmp[3];
		
		
		$sql="select kode_so,kode_lokasi,nama,kode_induk,tipe,isnull(flag_atasan,'0') as flag_atasan,
		convert(varchar(20),tgl_awal,103) as tgl1,convert(varchar(20),tgl_akhir,103) as tgl2 
		from gr_so
		where kode_lokasi='$kode_lokasi'
		order by rowindex";
	
		$rs = $dbLib->execute($sql);
		
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$path = $_SERVER["SCRIPT_NAME"];
		$path = substr($path,0,strpos($path,"server/serverApp.php"));	
		
		echo "<br><div class='col-md-12'><div class='panel panel-primary'>
		<div class='panel-heading'>Struktur Organisasi</div>
		<div class='panel-body'>
		
		";
		echo " <table class='tree table table-bordered' >
		<tr bgcolor='#CCCCCC' align='center'>
	 <td width='250' class='header_laporan'>Deskripsi</td>
	 <td width='60' class='header_laporan'>ID</td>
	 <td width='60' class='header_laporan'>Tgl Mulai</td>
	 <td width='60' class='header_laporan'>Tgl Selesai</td>
	 </tr>
		";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_induk=="00")
			{
				echo "<tr class='treegrid-$row->kode_so'>
					<td>$row->nama</td>
					<td>$row->kode_so</td>
					<td>$row->tgl1</td>
					<td>$row->tgl2</td>
				 </tr>";
			}
			else
			{
				echo "<tr class='treegrid-$row->kode_so treegrid-parent-$row->kode_induk'>
					<td>$row->nama</td>
					<td>$row->kode_so</td>
					<td>$row->tgl1</td>
					<td>$row->tgl2</td>
				 </tr>";
			}
			
			if ($row->tipe=="Posting")
			{
				$tgl_aging=$tgl_awal;
				$sql="select a.nik,b.nama,convert(varchar(20),a.tgl_awal,103) as tgl1,convert(varchar(20),a.tgl_akhir,103) as tgl2,
				convert(varchar(20),a.tgl_input,103) as tgl3, case when a.tgl_akhir < '$tgl_aging' then 'out' else 'in' end as status
				from gr_dinas a
				inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
				where a.kode_so='$row->kode_so' and a.kode_lokasi='$row->kode_lokasi' and a.tgl_akhir > '$tgl_aging'";
				if ($jenis=="Range")
				{
					$tgl_aging=$tgl_akhir;
					$sql="select a.nik,b.nama,convert(varchar(20),a.tgl_awal,103) as tgl1,convert(varchar(20),a.tgl_akhir,103) as tgl2,
					convert(varchar(20),a.tgl_input,103) as tgl3, case when a.tgl_akhir < '$tgl_aging' then 'out' else 'in' end as status
					from gr_dinas a
					inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
					where a.kode_so='$row->kode_so' and a.kode_lokasi='$row->kode_lokasi' and (a.tgl_awal >= '$tgl_awal' and  a.tgl_awal<='$tgl_akhir') ";
				}
				
				$rs1 = $dbLib->execute($sql);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$kode_akun=$row->kode_so.$row1->nik;
					$gb2 = "<i class='fa fa-user' aria-hidden='true' style='color:blue'</i>";
					if ($row->flag_atasan=="1")
					{
						$gb2 = "<i class='fa fa-user-circle-o' aria-hidden='true' style='color:orange'</i>";
					}
					$gb4="<i class='fa fa-level-down' aria-hidden='true' style='color:green'</i>";
					if ($row1->status=="out")
					{
						$gb4="<i class='fa fa-level-up' aria-hidden='true' style='color:red'</i>";
					}
					echo "<tr class='treegrid-$kode_akun treegrid-parent-$row->kode_so'>
						<td class='isi_laporan' valign='center'>$gb2 $gb4 $row1->nama</td>
					<td class='isi_laporan'>$row1->nik</td>
					<td class='isi_laporan'>$row1->tgl1</td>
					<td class='isi_laporan'>$row1->tgl2</td>
				 </tr>";
				}
			}
			
		}
		echo "</table>";
		echo "</div></div></div>";
		return "";
		
	}
	
}
?>
