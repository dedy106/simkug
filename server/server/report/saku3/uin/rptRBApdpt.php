<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptRBApdpt extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$tahun=$tmp[1];
		$nik=$tmp[2];
		$jenis_pp=$tmp[3];
		$kode_pp=$tmp[4];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$nama_pp="";
		if ($jenis_pp=="=")
		{
			$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			$nama_pp="<br>".$row->nama;
			
		}
		$sql="select a.kdsatker,a.kddept,a.kdunit,a.kdprogram 
from uin_lokasi a 
 where a.kode_lokasi='23'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdsatker=$row->kdsatker;
		$kdprogram=$row->kdprogram;
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rincian Kertas Kerja Pendapatan",$this->lokasi.$nama_pp,"TAHUN ".$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='700'>
   <tr bgcolor='#CCCCCC'>
     <td width='40'  align='center' class='header_laporan'>#</td>
	 <td width='80'  align='center' class='header_laporan'>Kode</td>
     <td width='400'  align='center' class='header_laporan'>Program/Kegiatan/Sumber Pendapatan</td>
	 <td width='100'  align='center' class='header_laporan'>Target</td>
     </tr> 
";
		$sql="select a.kddept+'.'+a.kdunit+'.'+a.kdprogram as kode_program,a.nmprogram,isnull(b.total,0) as total 
				from uin_program a
				inner join (select a.kdprogram,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and  a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdprogram='$kdprogram' and substring(a.kode_akun,1,1)='4'
				group by a.kdprogram
						)b on a.kdprogram=b.kdprogram
				where a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdprogram='$kdprogram' 
				order by a.kdprogram
			";
	
		$rs = $dbLib->execute($sql);
		
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo " <tr bgcolor='#ccccf8'>
     <td  class='header_laporan'>Prog</td>
	 <td  class='header_laporan'>$row->kode_program</td>
     <td class='header_laporan'>$row->nmprogram</td>
	<td  align='right' class='header_laporan'>".number_format($row->total,0,",",".")."</td>	
     </tr> ";
			$sql="select a.kdgiat,a.nmgiat,isnull(b.total,0) as total 
				from uin_giat a
				inner join (select a.kdgiat,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.kddept='$kddept' and a.kdunit='$kdunit' and substring(a.kode_akun,1,1)='4'
				group by a.kdgiat
						)b on a.kdgiat=b.kdgiat
				order by a.kdgiat
			";
			$rs1 = $dbLib->execute($sql);
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo " <tr bgcolor='#b5fbb5'>
     <td  class='header_laporan'>Giat</td>
	 <td  class='header_laporan'>$row1->kdgiat</td>
     <td class='header_laporan'>$row1->nmgiat</td>
	 <td  align='right' class='header_laporan'>".number_format($row1->total,0,",",".")."</td>	
	 </tr> ";
	

					$sql="select a.kdakun,a.nmakun,isnull(b.total,0) as total 
				from uin_akun a
				inner join (select a.kode_akun,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and  a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and substring(a.kode_akun,1,1)='4'
				group by a.kode_akun
						)b on a.kdakun=b.kode_akun
				order by a.kdakun";					
					$rs3 = $dbLib->execute($sql);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
							echo " <tr>
							<td class='isi_laporan'>Akun</td>
							<td class='isi_laporan'>$row3->kdakun</td>
							<td class='isi_laporan'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$row3->nmakun</td>
							<td  class='isi_laporan' align='right'>".number_format($row3->total,0,",",".")."</td>	
							</tr> ";
					
					}
					$no++;
				
            }
        }
  
		return "";
	}
	
}

?>
