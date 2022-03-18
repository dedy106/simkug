<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptSumurProduksi extends server_report_basic
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
        
        $sql="select a.id_sumur,a.tahun,a.id_lahan,b.nama_lahan,a.nomor_sumur,a.koordinat,a.no_ijin,a.volume,a.kelompok,a.cek_air,a.zonasi,a.kualitas,a.dalam,a.material_pipa,a.dia_pipa,a.pj_saring,a.pos_saring,a.dia_isap,a.pj_piso,a.dia_piso,a.mat,a.pompa,a.kapasitas,a.posisi,a.akifer,a.mat_statis,a.mat_dinamis,a.debit_pompa,a.transmisivitas,a.debit_ambil,a.debit_pompa2,a.waktu_pompa,a.jt_ijin,'-' as upload 
        from amu_sumur_bor a
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
        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='3260'>
                <tr bgcolor='#CCCCCC'>
                    <td align='center' class='header_laporan'  width='30'>No</td>
                    <td align='center' class='header_laporan'  width='80'>No Bukti</td>
                    <td align='center' class='header_laporan'  width='150'>Kode/Nama Lahan</td>
                    <td align='center' class='header_laporan'  width='100'>Tahun Pembuatan</td>
                    <td align='center' class='header_laporan'  width='100'>Nomor Sumur (Izin)</td>
                    <td align='center' class='header_laporan'  width='100'>Koordinat</td>
                    <td align='center' class='header_laporan'  width='100'>No Izin (IPAT)</td>
                    <td align='center' class='header_laporan'  width='100'>Volume NPA (m3/bln)</td>
                    <td align='center' class='header_laporan'  width='50'>Kelompok</td>
                    <td align='center' class='header_laporan'  width='100'>Cekungan Air</td>
                    <td align='center' class='header_laporan'  width='50'>Zonasi</td>
                    <td align='center' class='header_laporan'  width='100'>Kualitas Air Tanah</td>
                    <td align='center' class='header_laporan'  width='100'>Kedalaman Sumur (m)</td>
                    <td align='center' class='header_laporan'  width='100'>Material Pipa Konstruksi</td>
                    <td align='center' class='header_laporan'  width='100'>Diameter Pipa Konstruksi (Inch)</td>
                    <td align='center' class='header_laporan'  width='100'>Panjang Saringan (m)</td>
                    <td align='center' class='header_laporan'  width='100'>Posisi Saringan</td>
                    <td align='center' class='header_laporan'  width='100'>Diameter Pipa Isap (Inch)</td>
                    <td align='center' class='header_laporan'  width='100'>Panjang Pipa Pisometer (m)</td>
                    <td align='center' class='header_laporan'  width='100'>Diameter Pipa Pisomer (Inch)</td>
                    <td align='center' class='header_laporan'  width='100'>MAT (m)</td>
                    <td align='center' class='header_laporan'  width='100'>Jenis Pompa</td>
                    <td align='center' class='header_laporan'  width='100'>Kapasitas (HP)</td>
                    <td align='center' class='header_laporan'  width='100'>Posisi (m.bmt)</td>
                    <td align='center' class='header_laporan'  width='100'>Jenis Akifer yang disadap</td>
                    <td align='center' class='header_laporan'  width='100'>Muka Air Tanah Statis (m.bmt)</td>
                    <td align='center' class='header_laporan'  width='100'>Muka Air Tanah Dinamis (m.bmt)</td>
                    <td align='center' class='header_laporan'  width='100'>Debit Pemompaan (L/dtk)</td>
                    <td align='center' class='header_laporan'  width='100'>Transmisivitas (m2/hr)</td>
                    <td align='center' class='header_laporan'  width='100'>Debit Pengambilan Air Tanah (m3/hr)</td>
                    <td align='center' class='header_laporan'  width='100'>Debit Pemompaan (L/dtk)</td>
                    <td align='center' class='header_laporan'  width='100'>Waktu Pemompaan (Jam/Hr)</td>
                    <td align='center' class='header_laporan'  width='100'>Jatuh Tempo Izin</td>
                    <td align='center' class='header_laporan'  width='100'>Upload</td>
                </tr>
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td class='isi_laporan'>$i</td>
                        <td class='isi_laporan'>$row->id_sumur</td>
                        <td class='isi_laporan'>$row->tahun</td>
						<td class='isi_laporan'>$row->id_lahan - $row->nama_lahan</td>
                        <td class='isi_laporan'>$row->nomor_sumur</td>
                        <td class='isi_laporan'>$row->koordinat</td>
						<td class='isi_laporan'>$row->no_ijin</td>
						<td class='isi_laporan'>$row->volume</td>
						<td class='isi_laporan'>$row->kelompok</td>
                        <td class='isi_laporan'>$row->cek_air</td>
                        <td class='isi_laporan'>$row->zonasi</td>
                        <td class='isi_laporan'>$row->kualitas</td>
                        <td class='isi_laporan'>$row->dalam</td>
                        <td class='isi_laporan'>$row->material_pipa</td>
                        <td class='isi_laporan'>$row->dia_pipa</td>
                        <td class='isi_laporan'>$row->pj_saring</td>
                        <td class='isi_laporan'>$row->pos_saring</td>
                        <td class='isi_laporan'>$row->dia_isap</td>
                        <td class='isi_laporan'>$row->pj_piso</td>
                        <td class='isi_laporan'>$row->dia_piso</td>
                        <td class='isi_laporan'>$row->mat</td>
                        <td class='isi_laporan'>$row->pompa</td>
                        <td class='isi_laporan'>$row->kapasitas</td>
                        <td class='isi_laporan'>$row->posisi</td>
                        <td class='isi_laporan'>$row->akifer</td>
                        <td class='isi_laporan'>$row->mat_statis</td>
                        <td class='isi_laporan'>$row->mat_dinamis</td>
                        <td class='isi_laporan'>$row->debit_pompa</td>
                        <td class='isi_laporan'>$row->transmisivitas</td>
                        <td class='isi_laporan'>$row->debit_ambil</td>
                        <td class='isi_laporan'>$row->debit_pompa2</td>
                        <td class='isi_laporan'>$row->waktu_pompa</td>
                        <td class='isi_laporan'>$row->jt_ijin</td>
                        <td class='isi_laporan'>$row->upload </td>
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
