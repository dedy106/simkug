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
class server_report_saku3_uin_rptRinciBeb extends server_report_basic
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
		$jenis=$tmp[2];
        $nik=$tmp[3];		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql="select a.kdsatker,a.kdprogram,a.kdgiat,b.kddept,b.kdunit 
			from uin_user a inner join uin_satker b on a.kdsatker=b.kdsatker 
			where a.nik ='$nik' and a.kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdprogram=$row->kdprogram;
        $kdgiat=$row->kdgiat;
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Rincian Beban",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
    <tr bgcolor='#CCCCCC'>
        <td width='80'  align='center' class='header_laporan' rowspan='2'>Kode</td>
        <td width='400'  align='center' class='header_laporan' rowspan='2'>Program/Kegiatan/Sumber Pendapatan</td>
        <td width='200'  align='center' class='header_laporan' colspan='3'>TA $tahun</td>
    </tr>
    <tr  bgcolor='#CCCCCC'> 
        <td width='100' align='center' class='header_laporan' >Target</td>
        <td width='100'  align='center' class='header_laporan' >Realisasi / Prognosa *)</td>
        <td width='30'  align='center' class='header_laporan' >%</td>    <tr>
    </tr>
";
		$sql="select kddept,kdunit,kddept+'.'+kdunit+'.'+kdprogram as kode_program, nmprogram from uin_program where kddept='$kddept' and kdunit='$kdunit' and kdprogram='$kdprogram'  ";
		$rs = $dbLib->execute($sql);
		
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo " <tr>
	 <td  class='header_laporan'>$row->kode_program</td>
     <td class='header_laporan'>$row->nmprogram</td>
     <td  align='right' class='header_laporan'>&nbsp;</td>
     <td  align='right' class='header_laporan'>&nbsp;</td>
     <td  align='right' class='header_laporan'>&nbsp;</td>
     </tr> ";
			$sql="select a.kdgiat,a.nmgiat,isnull(c.total,0) as tot_target 
            from uin_giat a
            left join ( select a.kdgiat,sum(a.total) as total 
                        from uin_aju_d a 
                        inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                        where b.jenis<>'PDPT'
                        group by a.kdgiat ) c on a.kdgiat=c.kdgiat
            where a.kddept='$kddept' and a.kdunit='$kdunit' and c.total <> 0 ";
            $rs1 = $dbLib->execute($sql);
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo " <tr>
                        <td  class='header_laporan'>$row1->kdgiat</td>
                        <td class='header_laporan'>$row1->nmgiat</td>
                        <td  align='right' class='header_laporan'>".number_format($row1->tot,0,",",".")."</td>
                        <td  align='right' class='header_laporan'>&nbsp;</td>	
                        <td  align='right' class='header_laporan'>&nbsp;</td>
	            </tr> ";
	
			
				$sql="select a.kode_neraca,a.nama,isnull(b.total,0) as realisasi,isnull(c.total,0) as anggaran 
from uin_neraca a
left join (select a.kode_neraca,a.kode_lokasi,sum(b.total) as total
from uin_relakun a
inner join uin_aju_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join uin_aju_m c on b.no_aju=c.no_aju and b.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.kode_fs='FS1' and substring(c.periode,1,4)='$tahun' and b.kdgiat='$row1->kdgiat'
group by a.kode_neraca,a.kode_lokasi
		)b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_neraca,a.kode_lokasi,sum(b.total) as total
from uin_relakun a
inner join uin_usul_d b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join uin_usul_m c on b.no_usul=c.no_usul and b.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.kode_fs='FS1' and substring(c.tahun,1,4)='$tahun' and b.kdgiat='$row1->kdgiat'
group by a.kode_neraca,a.kode_lokasi
		)c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi
where a.jenis_akun='Beban' and a.kode_lokasi='$kode_lokasi' and a.kode_neraca like '2%'
order by a.rowindex  ";
				
				$no=1;
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					
					echo " <tr>
							<td class='isi_laporan'>&nbsp;</td>
							<td  class='isi_laporan'>".fnSpasi($row2->level_spasi)."".$row2->nama."</td>
                            <td  class='isi_laporan' align='right'>".number_format($row2->anggaran,0,",",".")."</td>	
                            <td  align='right' class='isi_laporan'>".number_format($row2->realisasi,0,",",".")."</td>
                            <td  align='right' class='isi_laporan'>".number_format(($row2->anggaran/$row2->realisasi)*100,2,",",".")."</td>
							</tr> ";
                    
				}
                $total=$total+$row1->tot;
			}
            $i=$i+1;
            
        }
  
		return "";
	}
	
}

?>
