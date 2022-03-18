<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptAssetGer extends server_report_basic
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
        
        $sql="select a.kd_asset,b.nama_klp,a.merk,a.tipe,a.warna,a.satuan,c.nama_gedung,a.no_ruang
        from amu_asset_bergerak a 
        inner join amu_klp_brg b on a.kode_lokasi=b.kode_lokasi and a.kode_klp=b.kode_klp 
        inner join amu_gedung c on a.kode_lokasi=c.kode_lokasi and a.id_gedung=c.id_gedung
        $this->filter
        order by a.kd_asset ";
        
        $rs = $dbLib->execute($sql);	
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
                        <th  colspan='11' style='font-size:14px; text-align: center;'>KARTU MONITORING ASSET BERGERAK</th>
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
                        <td style='text-align:center' rowspan='2'>No</td>
                        <td style='text-align:center' rowspan='2'>Kode Asset</td>
                        <td style='text-align:center' rowspan='2'>Kategori Asset</td>
                        <td style='text-align:center' rowspan='2'>Spesifikasi - Merk/Type</td>
                        <td style='text-align:center' rowspan='2'>Satuan Asset</td>
                        <td style='text-align:center' colspan='2'>Lokasi Asset</td>
                    </tr>
                    <tr>
                        <td style='border-top: medium none; text-align:center'>Gedung</td>
                        <td style='border-top: medium none; text-align:center'>Ruangan</td>
                    </tr>
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td style=' border-top: medium none;text-align:center'>$i</td>
                        <td style=' border-top: medium none;text-align:center'>$row->kd_asset</td>
                        <td style=' border-top: medium none;text-align:center'>$row->nama_klp</td>
                        <td style=' border-top: medium none;text-align:left'>$row->merk, $row->tipe, $row->warna</td>
                        <td style=' border-top: medium none;text-align:center'>$row->satuan</td>
                        <td style=' border-top: medium none;text-align:center'>$row->nama_gedung</td>
                        <td style=' border-top: medium none;text-align:center'>$row->no_ruang</td>
                    </tr>
                    ";
                    $i++;
                }

                    echo"
                </tbody>
            </table>
            <br>";
       
        echo "</div>";
		return "";
		
	}
	
}
?>
