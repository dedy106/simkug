<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptSumurResapan extends server_report_basic
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
        
        $sql="select a.id_sumur,a.nama_sumur,a.tahun,a.id_lahan,b.nama_lahan,a.koordinat,a.no_reg,a.posisi_bangun,a.dimensi_bangun,a.meter_air,a.dalam,a.jambang,a.posisi,'-' as upload 
        from amu_sumur_resap a
        inner join amu_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
        $this->filter
        order by a.id_sumur ";
       
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
       
        echo "<div align='center'>";
        //echo "$sql";
		echo $AddOnLib->judul_laporan("data sumur pantau",$this->lokasi,"");
        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1380'>
                <tr bgcolor='#CCCCCC'>
                    <td align='center' class='header_laporan'  width='30'>No</td>
                    <td align='center' class='header_laporan'  width='80'>No Bukti</td>
                    <td align='center' class='header_laporan'  width='150'>Nama Sumur</td>
                    <td align='center' class='header_laporan'  width='150'>Kode/Nama Lahan</td>
                    <td align='center' class='header_laporan'  width='50'>Tahun</td>
                    <td align='center' class='header_laporan'  width='100'>Koordinat</td>
                    <td align='center' class='header_laporan'  width='100'>Nomor Registrasi</td>
                    <td align='center' class='header_laporan'  width='100'>Posisi Bangunan</td>
                    <td align='center' class='header_laporan'  width='100'>Dimensi Bangunan</td>
                    <td align='center' class='header_laporan'  width='100'>Meter Air</td>
                    <td align='center' class='header_laporan'  width='100'>Kedalaman (m bmt)</td>
                    <td align='center' class='header_laporan'  width='100'>Jambang (D/P)</td>
                    <td align='center' class='header_laporan'  width='100'>Posisi Saringan (D)</td>
                    <td align='center' class='header_laporan'  width='100'>Upload</td>
                </tr>
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td class='isi_laporan'>$i</td>
                        <td class='isi_laporan'>$row->id_sumur</td>
                        <td class='isi_laporan'>$row->nama_sumur</td>
						<td class='isi_laporan'>$row->id_lahan - $row->nama_lahan</td>
                        <td class='isi_laporan'>$row->tahun</td>
                        <td class='isi_laporan'>$row->koordinat</td>
						<td class='isi_laporan'>$row->no_reg</td>
						<td class='isi_laporan'>$row->posisi_bangun</td>
						<td class='isi_laporan'>$row->dimensi_bangun</td>
						<td class='isi_laporan'>$row->meter_air</td>
						<td class='isi_laporan'>$row->dalam</td>
						<td class='isi_laporan'>$row->jambang</td>
						<td class='isi_laporan'>$row->posisi</td>
						<td class='isi_laporan'>$row->upload</td>
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
