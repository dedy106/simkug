<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptRekapSerahDok extends server_report_basic
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
		$periode=$tmp[0];
		$jenis=$tmp[1];
        $nama_file="tranfer_".$periode.".xls";
    		
		$sql="select a.jenis, a.kode_lokasi,count(a.no_app) as jumlah 
        from it_ajuapp_m a
        $this->filter and isnull(a.jenis,'-') <> '-'
        group by a.jenis,a.kode_lokasi
        order by a.jenis desc ";
		
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
            <td width='10'  align='center' class='header_laporan'>NO</td>
            <td width='50'  align='center' class='header_laporan'>Jenis</td>
            <td width='90'  align='center' class='header_laporan'>Jumlah</td>
        </tr>  ";
        $jum=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
				<td class='isi_laporan' >$i</td>
				<td class='isi_laporan' align='center' >$row->jenis</td>
				<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->jenis','$row->kode_lokasi');\">".number_format($row->jumlah,0,",",".")."</a></td>
				</tr>";
                $i=$i+1;
                $jum+=$row->jumlah;
        }
    echo "<tr>
            <td class='isi_laporan' align='center' colspan='2'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($jum,0,",",".")."</td>
        </tr>";
        echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
