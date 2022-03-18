<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptRealPO extends server_report_basic
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
        $periode2=$tmp[2];
        $nik=$tmp[3];

        $sql = "exec  [dbo].[sp_log_spk_laptw] '$kode_lokasi', '$periode','$periode2','$nik' ";
        $rs2 = $dbLib->execute($sql);

		$sql2="select a.nik_user,a.no_spk,a.kode_lokasi,a.keterangan,a.nilai,isnull(b.total,0) as alok_tahun,a.real_tw1+a.real_tw2+a.real_tw3+a.real_tw4 as real_tahun,isnull(b.tw1,0) as alok_tw1,a.real_tw1,isnull(b.tw2,0) as alok_tw2,a.real_tw2,isnull(b.tw3,0) as alok_tw3,a.real_tw3,isnull(b.tw4,0) as alok_tw4,a.real_tw4 from log_spk_laptw a
		left join (
			select no_bukti,kode_lokasi, 
			sum(case when substring(periode1,5,2) between '01' and '03' then nilai else 0 end) as tw1, 
			sum(case when substring(periode1,5,2) between '04' and '06' then nilai else 0 end) as tw2,
			sum(case when substring(periode1,5,2) between '07' and '09' then nilai else 0 end) as tw3, 
			sum(case when substring(periode1,5,2) between '10' and '12' then nilai else 0 end) as tw4,
			sum(nilai) as total
			from angg_r 
			where dc ='D'
			group by no_bukti,kode_lokasi
		) b on a.no_spk=b.no_bukti and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and a.nik_user='$nik'  ";
        
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$AddOnLib=new server_util_AddOnLib();	
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql2);
		}
		else
		{
			$rs = $dbLib->execute($sql2);
		}
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Realisasi PO",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode)." s.d ".$AddOnLib->ubah_periode($periode2));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
            <td width='100' rowspan='2' align='center' class='header_laporan'>No SPK</td>
            <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
            <td width='90'  rowspan='2' align='center' class='header_laporan'>Nilai</td>
            <td width='90'  rowspan='2' align='center' class='header_laporan'>Realisasi Per Tahun</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>TW1</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>TW2</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>TW3</td>
            <td width='270'  align='center' class='header_laporan' colspan='3'>TW4</td>
            <td width='90'  align='center' class='header_laporan' rowspan='2'>Total Sisa</td>
        </tr> 
        <tr bgcolor='#CCCCCC'>
            <td width='90' align='center' class='header_laporan'>Alokasi</td>
            <td width='90' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' align='center' class='header_laporan'>Sisa</td>
            <td width='90' align='center' class='header_laporan'>Alokasi</td>
            <td width='90' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' align='center' class='header_laporan'>Sisa</td>
            <td width='90' align='center' class='header_laporan'>Alokasi</td>
            <td width='90' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' align='center' class='header_laporan'>Sisa</td>
            <td width='90' align='center' class='header_laporan'>Alokasi</td>
            <td width='90' align='center' class='header_laporan'>Realisasi</td>
            <td width='90' align='center' class='header_laporan'>Sisa</td>
        </tr>";
		$nilai=0;$alok_tw1=0;$alok_tw2=0;$alok_tw3=0;$alok_tw4=0;$real_tw1=0;$real_tw2=0;$real_tw3=0;$real_tw4=0;
        $sisa_tw1=0;$sisa_tw2=0;$sisa_tw3=0;$sisa_tw4=0; $total_sisa=0; $alok_tahun=0;$real_tahun=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$alok_tahun+=$row->alok_tahun;
			$real_tahun+=$row->real_tahun;
            $alok_tw1+=$row->alok_tw1;
            $alok_tw2+=$row->alok_tw2;
            $alok_tw3+=$row->alok_tw3;
            $alok_tw4+=$row->alok_tw4;
            $real_tw1+=$row->real_tw1;
            $real_tw2+=$row->real_tw2;
            $real_tw3+=$row->real_tw3;
            $real_tw4+=$row->real_tw4;
            
            $sisa_tw1+=$row->alok_tw1 - $row->real_tw1;
            $sisa_tw2+=$row->alok_tw2 - $row->real_tw2;
            $sisa_tw3+=$row->alok_tw3 - $row->real_tw3;
            $sisa_tw4+=$row->alok_tw4 - $row->real_tw4;
            $sisa = ($row->alok_tw1 - $row->real_tw1)+($row->alok_tw2 - $row->real_tw2)+($row->alok_tw3 - $row->real_tw3)+($row->alok_tw4 - $row->real_tw4);
            $total_sisa+=$sisa;
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSPK('$row->no_spk','$row->kode_lokasi');\">$row->no_spk</a></td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real_tahun,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real_tw1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw1 - $row->real_tw1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real_tw2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw2 - $row->real_tw2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real_tw3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw3 - $row->real_tw3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real_tw4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->alok_tw4 - $row->real_tw4,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($real_tahun,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($alok_tw1,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($real_tw1,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa_tw1,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($alok_tw2,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($real_tw2,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa_tw2,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($alok_tw3,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($real_tw3,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa_tw3,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($alok_tw4,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($real_tw4,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa_tw4,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($total_sisa,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
		
	}
}
?>
