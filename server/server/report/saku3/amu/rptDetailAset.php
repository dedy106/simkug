<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptDetailAset extends server_report_basic
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
        
        /*$sql="select a.kd_asset, b.nama_klp, count(a.kd_asset) as jumlah, a.nilai_perolehan
        from amu_asset_bergerak a inner join amu_klp_brg b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
        $this->filter
        group by a.kd_asset,b.nama_klp,a.nilai_perolehan
        order by a.kd_asset ";*/
        
        //$rs = $dbLib->execute($sql);	
		$i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        $AddOnLib=new server_util_AddOnLib();	
        
        echo "<div align='center'>";
        //echo "$sql";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' >
                <style>
                    td{
                        border:1px solid black;
                        padding:4px;
                    }
                </style>
                <thead>
                    <tr>
                        <th  colspan='11' style='font-size:14px; text-align: center;'>DETAIL BARANG INVENTARIS</th>
                    </tr>
                    <tr>
                        <td  style='border-style: none;'>Kode Barang</td>
                        <td  style='border-style: none;'>:</td>
                    </tr>
                    <!--tr style='height: 12.0pt;'>
                        <th style='text-align: center;' colspan='16'><span>Per </span>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
                    </tr-->
                    <tr style=''>
                        <th style='' colspan='16'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style='text-align:center'>Spesifikasi</td>
                        <td style='text-align:center'>Nilai Perolehan per Satuan</td>
                        <td style='text-align:center'>Tanggal Perolehan</td>
                    </tr>
                ";
                //while ($row = $rs->FetchNextObject($toupper=false))
                //{
                    /*echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$i</td>
                        <td style=' border-top: medium none;text-align:center'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->kd_asset');\">$row->kd_asset</a></td>
                        <td style=' border-top: medium none;text-align:center'>$row->nama_klp</td>
                        <td style=' border-top: medium none;text-align:center'>$row->jumlah</td>
                        <td style=' border-top: medium none;text-align:left'>".number_format($row->nilai_perolehan*$row->jumlah,0,',','.')."</td>
                    </tr>
                    ";
                    $i++;*/
                //}

                    echo"
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
		return "";
		
	}
	
}
?>
