<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptGarRekapRab extends server_report_basic
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
        $tahun=$tmp[1];
		
		$sql="select a.kode_pp,a.nama,isnull(b.total,0) as gar_pdpt,isnull(c.total,0) as gar_beban,
			isnull(d.total,0) as real_pdpt,isnull(e.total,0) as real_beban,
			isnull(b.total,0)-isnull(d.total,0) as saldo_pdpt,
			isnull(c.total,0)-isnull(e.total,0) as saldo_beban
from pp a
left join (select a.kode_pp,a.kode_lokasi,sum(a.total) as total 
		   from uin_usul_d a
		   inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
		   $this->filter and substring(a.kode_akun,1,1)='4' 
		   group by a.kode_pp,a.kode_lokasi
		  )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,sum(a.total) as total 
		   from uin_usul_d a
		   inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
		   $this->filter and substring(a.kode_akun,1,1)='5' 
		   group by a.kode_pp,a.kode_lokasi
		  )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,sum(a.total) as total 
		   from uin_aju_d a
		   inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		   $this->filter and substring(a.kode_akun,1,1)='4' 
		   group by a.kode_pp,a.kode_lokasi
		  )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,sum(a.total) as total 
		   from uin_aju_d a
		   inner join uin_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		   $this->filter and substring(a.kode_akun,1,1)='5' 
		   group by a.kode_pp,a.kode_lokasi
		  )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_pp";
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
		$rs = $dbLib->execute($sql);
       
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan rekapapitulasi anggaran ",$this->lokasi,"TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000' >
        <tr bgcolor='#CCCCCC'>
            <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
			<td width='50' rowspan='2'  align='center' class='header_laporan'>Kode Unit</td>
            <td width='250' rowspan='2'  align='center' class='header_laporan'>Nama Unit</td>
            <td height='23' colspan='2'  align='center' class='header_laporan'>Anggaran</td>
            <td colspan='2'  align='center' class='header_laporan'>Realisasi</td>
			<td colspan='2'  align='center' class='header_laporan'>Saldo</td>
            </tr>
        <tr bgcolor='#CCCCCC'>
          <td width='90' height='23'  align='center' class='header_laporan'>Pendapatan</td>
          <td width='90'  align='center' class='header_laporan'>Belanja</td>
          <td width='90'  align='center' class='header_laporan'>Pendapatan</td>
          <td width='90'  align='center' class='header_laporan'>Belanja</td>
		  <td width='90'  align='center' class='header_laporan'>Pendapatan</td>
          <td width='90'  align='center' class='header_laporan'>Belanja</td>
        </tr>  ";
		$gar_pdpt=0; $gar_beban=0; $real_pdpt=0; $real_beban=0; $saldo_pdpt=0; $saldo_beban=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$gar_pdpt+=$row->gar_pdpt;
			$gar_beban+=$row->gar_beban;
			$real_pdpt+=$row->real_pdpt;
			$real_beban+=$row->real_beban;
			$saldo_pdpt+=$row->saldo_pdpt;
			$saldo_beban+=$row->saldo_beban;
			echo "<tr >
		     <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_pp</td>
            <td class='isi_laporan'>$row->nama</td>
         	<td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPdpt('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->gar_pdpt,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->gar_beban,0,",",".")."</a></td>
			<td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPdpt('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->real_pdpt,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->real_beban,0,",",".")."</a></td>
			<td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPdpt('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->saldo_pdpt,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBeban('$row->kode_pp','$kode_lokasi','$tahun');\">".number_format($row->saldo_beban,0,",",".")."</a></td>

			</tr>";
			$i=$i+1;
		}
		 echo "<tr >
    
            <td class='header_laporan' align='center' colspan='3'>Total</td>
            <td class='header_laporan' align='right'>".number_format($gar_pdpt,0,",",".")."</td>
            <td class='header_laporan' align='right'>".number_format($gar_beban,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($real_pdpt,0,",",".")."</td>
            <td class='header_laporan' align='right'>".number_format($real_beban,0,",",".")."</td>
			<td class='header_laporan' align='right'>".number_format($saldo_pdpt,0,",",".")."</td>
            <td class='header_laporan' align='right'>".number_format($saldo_beban,0,",",".")."</td>
	
        </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
