<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_akademik_rptPpTarif extends server_report_basic
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
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

		$sql="select a.kode_pp,a.kode_lokasi,b.nama,a.spp,a.dsp,a.lain,a.total,'$periode' as periode
        from (select a.kode_pp,a.kode_lokasi,sum(case when a.kode_param in ('SPP','SPP_TK') then a.tarif else 0 end) as spp,sum(case when a.kode_param in ('DSP','DSP_TK') then a.tarif else 0 end) as dsp,sum(case when a.kode_param not in ('SPP','SPP_TK','DSP','DSP_TK') then a.tarif else 0 end) as lain,sum(a.tarif) as total
            from sis_siswa_tarif a
            inner join sis_siswa b on a.nis=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.flag_aktif=1
            where '$periode' between a.per_awal and a.per_akhir
            group by a.kode_pp,a.kode_lokasi
            )a
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.flag_aktif='1'
        $this->filter
        order by a.kode_pp ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan tarif siswa per pp",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='100'  align='center' class='header_laporan'>Kode PP</td>
            <td width='250'  align='center' class='header_laporan'>Nama</td>
            <td width='80'  align='center' class='header_laporan'>Periode</td>
            <td width='90'  align='center' class='header_laporan'>SPP</td>
            <td width='90'  align='center' class='header_laporan'>DSP</td>
            <td width='90'  align='center' class='header_laporan'>Lainnya</td>
            <td width='90'  align='center' class='header_laporan'>Total</td>";
	    echo "</tr>";
		$j=1;$tot=0;$totdsp=0;$totlain=0;$totspp=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tot+=$row->total;
			$totspp+=$row->spp;
			$totdsp+=$row->dsp;
			$totlain+=$row->lain;
			echo "<tr >
            <td class='isi_laporan' align='center'>$j</td>
            <td class='isi_laporan'>$row->kode_pp</td>
            <td class='isi_laporan'>$row->nama</td>
            <td class='isi_laporan'>$row->periode</td>
            <td class='isi_laporan' align='right'>".number_format($row->spp,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->dsp,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->lain,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>";
			echo "</tr>";
			$j=$j+1;
		}
		
		echo "<tr >
        <td class='header_laporan' align='center' colspan='4'>Total</td>
        <td class='header_laporan' align='right'>".number_format($totspp,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($totdsp,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($totlain,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($tot,0,",",".")."</td>
        </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
