<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptRekapSerahDokDet extends server_report_basic
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
		$jenis=$tmp[0];
        // $nama_file="tranfer_".$periode.".xls";
    		
        $sql="select a.no_aju as no_agenda,a.keterangan,a.nilai,
        case a.progress when 'A' then 'Unit' 
						when '0' then 'Penyerahan Dokumen' 
                        when '1' then 'Verifikasi Dokumen' 
                        when '2' then 'Verifikasi Akun/Fiat' 
                        when '3' then 'KasBank' 
                        when 'S' then 'SPB' 
                        when 'R' then 'Revisi' 
                        else 'Revisi' end as posisi ,
        '$jenis' as jenis 
        from it_aju_m a 
        where a.no_aju in (select a.no_aju from it_ajuapp_m a $this->filter )
        ";

        // echo $sql;
		
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
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
        echo $AddOnLib->judul_laporan("UNIVERSITAS TELKOM","REKAP PENYERAHAN DOKUMEN",null);
        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='10'  align='center' class='header_laporan'>No</td>
            <td width='60'  align='center' class='header_laporan'>No Agenda</td>
            <td width='250'  align='center' class='header_laporan'>Keterangan</td>
            <td width='90'  align='center' class='header_laporan'>Nilai</td>
            <td width='150'  align='center' class='header_laporan'>Posisi/Progress</td>
            <td width='50'  align='center' class='header_laporan'>Jenis</td>
        </tr>  ";
        $jum=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
				<td class='isi_laporan' >$i</td>
				<td class='isi_laporan' align='center' >$row->no_agenda</td>
				<td class='isi_laporan' align='center' >$row->keterangan</td>
				<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				<td class='isi_laporan' align='center' >$row->posisi</td>
				<td class='isi_laporan' align='center' >$row->jenis</td>
				</tr>";
                $i=$i+1;
                $jum+=$row->nilai;
        }
    echo "<tr>
            <td class='isi_laporan' align='center' colspan='3'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
        </tr>";
        echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
