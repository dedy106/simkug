<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptDaftarInisiasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		
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
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        $sql = "select year(a.tgl_mulai) tahun, a.kode_pp, a.kode_proyek, a.no_pks, a.nama, 
        convert(varchar, a.tgl_mulai, 103) tgl_mulai, convert(varchar, a.tgl_selesai, 103) tgl_selesai, 
        a.nilai_or, 
        sum(case dc when 'D' then b.nilai else -b.nilai end) as alokasi
        from prb_proyek a
        inner join prb_prbeban_d b on a.kode_lokasi=b.kode_lokasi and a.kode_proyek=b.kode_proyek 
        $this->filter
        group by a.kode_pp, a.kode_proyek, 
        year(a.tgl_mulai), a.no_pks, a.nama, 
        convert(varchar, a.tgl_mulai, 103), convert(varchar, a.tgl_selesai, 103), a.nilai_or
        order by a.kode_proyek";
        $rs = $dbLib->execute($sql);
        
		$no = 1;
        $AddOnLib=new server_util_AddOnLib();
        
        echo "<div align='center'>"; 

        echo "
        <table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' >
        <style>
        td{
            border:1px solid black;
            padding:4px;
        }
        </style>
        <thead>
            <tr>
                <th  colspan='11' style='font-size:14px; text-align: center;'>LAPORAN DAFTAR INISIASI</th>
            </tr>
            <!--tr style='height: 12.0pt;'>
                <th style='text-align: center;' colspan='11'><span>Per </span>".substr($tmp[1],8,2)." ".$AddOnLib->ubah_periode($periode)."</th>
            </tr-->
            <tr style=''>
                <th style='' colspan='11'>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr bgcolor='#CCCCCC'>
                <td style='text-align:center' rowspan='' class='header_laporan'>No</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Tahun</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Unit</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>No Inisiasi</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>No Dokumen</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Nama Inisiasi</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Tgl Mulai</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Tgl Selesai</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Total Nilai Inisiasi</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Realisasi Real</td>
                <td style='text-align:center' rowspan='' class='header_laporan'>Saldo Alokasi</td>
            </tr>
        ";
		while($row = $rs->FetchNextObject($toupper=false)){
            echo "
                <tr>
                    <td style=' border-top: medium none;text-align:center'>$no</td>
                    <td style=' border-top: medium none;text-align:center'>$row->tahun</td>
                    <td style=' border-top: medium none;text-align:center'>$row->kode_pp</td>
                    <td style=' border-top: medium none;text-align:center'>$row->kode_proyek</td>
                    <td style=' border-top: medium none;text-align:center'>$row->no_pks</td>
                    <td style=' border-top: medium none;text-align:center'>$row->nama</td>
                    <td style=' border-top: medium none;text-align:center'>$row->tgl_mulai</td>
                    <td style=' border-top: medium none;text-align:center'>$row->tgl_selesai</td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row->nilai_or,0,',','.')."</td>
                    <td style=' border-top: medium none;text-align:right'>
                    <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_proyek','$row->kode_pp','$kode_lokasi');\">
                    ".number_format($row->alokasi,0,',','.')."</a></td>
                    <td style=' border-top: medium none;text-align:right'>".number_format($row->nilai_or-$row->alokasi,0,',','.')."</td>
                </tr>
            ";
            $no++;
        }
		
        echo "
        </tbody>
        </table>
        ";
	
		echo "</div>";
		return "";
	}
	
}
?>
