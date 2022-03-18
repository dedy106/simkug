<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptTglAdmHistory extends server_report_basic
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
		$periode=$tmp[1];
        $sql=" select a.kode_proyek,a.tgl_adm,a.kode_lokasi
        from prb_proyektgl_his a
                $this->filter
                order by a.tgl_adm 
            ";
		// $start = (($this->page-1) * $this->rows);
        // $rs=$dbLib->LimitQuery($sql,$this->rows,$start);
        $rs=$dbLib->execute($sql);
        $AddOnLib=new server_util_AddOnLib();	
            
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar perubahan tgl administrasi proyek",$this->lokasi);
        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='400'>
            <thead>
            <tr bgcolor='#CCCCCC'>
                <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
                <td width='30' rowspan='2' align='center' class='header_laporan'>Kode Proyek</td>
                <td width='80' rowspan='2' align='center' class='header_laporan'>Tgl Administrasi</td>
            </tr>
            </thead>
            <tbody>";
            while ($row = $rs->FetchNextObject($toupper=false))
            {   
            echo "<tr>
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>$row->kode_proyek</td>
                <td class='isi_laporan'>$row->tgl_adm</td>
                </tr>";
            }
    echo "</tbody>
    </table>
    <br>";
    echo "</div>";
		return "";
		
	}
	
}
?>
