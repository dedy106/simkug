<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptUsulanHis extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$jenis=$tmp[0];
		
		$nama_file="usulan.xls";
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}

		$sql="
        select a.no_app,convert(varchar,a.tanggal,103) as tgl,a.tgl_input,a.nik_user,
        case a.status when '1' then 'Evaluasi Usulan - Keuangan' 
            when '2' then 'Evaluasi Usulan - Logistik' 
            when '3' then 'Approval Usulan Final - Keuangan' 
            when '4' then 'Evaluasi Usulan - Yayasan'
            when 'K' then 'Return Evaluasi Usulan - Keuangan' 
            when 'L' then 'Return Evaluasi Usulan - Logistik' 
            when 'F' then 'Return Usulan Final - Keuangan' 
            when 'Y' then 'Return Evaluasi Usulan - Yayasan'  
            else '-' end as status
        ,a.keterangan 
        from log_usul_app a
        $this->filter
        union all
        select a.no_app,convert(varchar,a.tanggal,103) as tgl,a.tgl_input,a.nik_user,'Penyesuaian Usulan Final' as status,a.keterangan 
        from log_usul_ajus a
        $this->filter
        union all
        select b.no_app,convert(varchar,b.tanggal,103) as tgl,b.tgl_input,b.nik_user,'Release Finalisasi Usulan' as status,b.keterangan 
        from log_real_m b
        inner join log_real_d a on b.no_app=a.no_app and b.kode_lokasi=a.kode_lokasi
        $this->filter
        ";
        // echo $sql;
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("histori usulan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='100'  align='center' class='header_laporan'>No App</td>
            <td width='80'  align='center' class='header_laporan'>Tanggal</td>
            <td width='80'  align='center' class='header_laporan'>NIK User</td>
            <td width='200'  align='center' class='header_laporan'>Status</td>
            <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	    </tr>  ";
        while ($row = $rs->FetchNextObject($toupper=false))
        {
            echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_app</td>
            <td class='isi_laporan'>$row->tgl</td>
            <td class='isi_laporan'>$row->nik_user</td>
            <td class='isi_laporan'>".strtoupper($row->status)."</td>
            <td class='isi_laporan'>$row->keterangan</td>
            </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
  
