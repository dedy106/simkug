<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_logistik_rptPengadaanBayarDet extends server_report_basic
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

		$sql2="

        select a.no_pb,a.tanggal,c.no_spk,a.nilai_final as bayar
            from yk_pb_m a
            inner join log_spk_m c on a.no_hutang=c.no_spk  and a.kode_lokasi=c.kode_lokasi
            $this->filter  
            
            
            union all
            
            select a.no_pb,a.tanggal,c.no_spk,a.nilai_final as bayar
            from yk_pb_m a 
            inner join hutang_m b on a.no_hutang=b.no_hutang and a.kode_lokasi=b.kode_lokasi
            inner join log_spk_m c on b.no_dokumen=c.no_spk  and c.kode_lokasi=b.kode_lokasi
            $this->filter  
        ";
        // echo $sql2;
        
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$AddOnLib=new server_util_AddOnLib();	
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
		echo $AddOnLib->judul_laporan("Monitoring Pengadaan",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='430'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>NO</td>
            <td width='100' align='center' class='header_laporan'>NO PB</td>
            <td width='100' align='center' class='header_laporan'>TANGGAL</td>
            <td width='100' align='center' class='header_laporan'>NO SPK</td>
            <td width='100' align='center' class='header_laporan'>BAYAR</td>
        </tr> ";
        $bayar =0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $bayar+=$row->bayar;
		echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_pb</td>
            <td class='isi_laporan'>$row->tanggal</td>
            <td class='isi_laporan'>$row->no_spk</td>
            <td class='isi_laporan'>".number_format($row->bayar,0,",",".")."</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='4'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
		
	}
}
?>
