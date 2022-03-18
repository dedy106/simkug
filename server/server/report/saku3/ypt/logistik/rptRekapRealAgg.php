<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptRekapRealAgg extends server_report_basic
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
        $periode=$tmp[1];

		$sql2 = "select a.kode_lokasi,a.nama, b.kode_akun,b.kode_pp,b.tahun,isnull(b.agg,0) as agg,isnull(c.po,0) as po
		from lokasi a 
		inner join (
				select a.kode_akun,a.kode_pp,a.kode_lokasi,substring(a.periode,1,4) as tahun, sum(nilai) as agg
				from anggaran_d a
				group by a.kode_akun,a.kode_pp,a.kode_lokasi,substring(a.periode,1,4)
		) b on a.kode_lokasi=b.kode_lokasi
		left join (
			select a.kode_akun,b.kode_pp,a.kode_lokasi,substring(a.periode,1,4) as tahun,sum(a.nilai) as po
			from log_spk_m a 
			inner join log_pesan_m b on a.no_pesan=b.no_pesan and a.kode_lokasi=b.kode_lokasi
			group by a.kode_akun,b.kode_pp,a.kode_lokasi,substring(a.periode,1,4)
			) c on a.kode_lokasi=c.kode_lokasi and b.kode_akun=c.kode_akun and b.kode_pp=c.kode_pp and b.tahun=c.tahun
		$this->filter and isnull(c.po,0) <> 0 
		order by a.kode_lokasi,b.kode_akun,b.kode_pp";
        
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$AddOnLib=new server_util_AddOnLib();	
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		// if ($jenis=="Excell")
		// {
		// 	header("Pragma: public");
		// 	header("Expires: 0");
		// 	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
		// 	header("Content-Type: application/force-download");
		// 	header("Content-Type: application/octet-stream");
		// 	header("Content-Type: application/download");;
		// 	header("Content-Disposition: attachment;filename=$nama_file"); 
		// 	header("Content-Transfer-Encoding: binary ");
		// 	$rs = $dbLib->execute($sql2);
		// }
		// else
		// {
			$rs = $dbLib->execute($sql2);
		// }
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rekap Realisasi Anggaran",$this->lokasi,"TAHUN ".$periode);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='660'>
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'>No</td>
            <td width='90' align='center' class='header_laporan'>Lembaga</td>
            <td width='90' align='center' class='header_laporan'>Akun</td>
            <td width='90' align='center' class='header_laporan'>PP</td>
            <td width='120' align='center' class='header_laporan'>Anggaran</td>
            <td width='120' align='center' class='header_laporan'>PO</td>
            <td width='120' align='center' class='header_laporan'>% PO thd Anggaran</td>
        </tr> 
        <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='header_laporan'></td>
            <td width='90' align='center' class='header_laporan'>a</td>
            <td width='90' align='center' class='header_laporan'>b</td>
            <td width='90' align='center' class='header_laporan'>c</td>
            <td width='120' align='center' class='header_laporan'>d</td>
            <td width='120' align='center' class='header_laporan'>e</td>
            <td width='120' align='center' class='header_laporan'>f = (e/d)*100%</td>
        </tr>";
		$agg=0;$po=0;$persen=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$agg+=$row->agg;
			$po+=$row->po;
			$r_persen = ($row->agg != 0 ? ($row->po/$row->agg)*100 : 0);
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->kode_lokasi</td>
            <td class='isi_laporan'>$row->kode_akun</td>
            <td class='isi_laporan'>$row->kode_pp</td>
            <td class='isi_laporan' align='right'>".number_format($row->agg,0,",",".")."</td>
            <td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetailSPK('$row->kode_lokasi','$row->kode_akun','$row->kode_pp','$row->tahun');\">".number_format($row->po,0,",",".")."</a></td>
            <td class='isi_laporan' align='right'>".number_format($r_persen,2,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
		$persen = ($agg != 0 ? ($po/$agg)*100 : 0);
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='4'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($agg,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($po,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($persen,2,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
		
	}
}
?>
