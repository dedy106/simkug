<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptTanahMilik extends server_report_basic
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
        
        $sql="select a.id_lahan,a.nama_lahan,a.alamat,a.kode_lokasi,
				   a.status_dokumen,a.keterangan,a.luas,
				   case when a.flag_aktif='1' then 'Aktif' else 'Non Aktif' end as status_aktif,
				   b.nama as nama_desa,b.kode_pos,c.nama as nama_kec,d.nama as nama_kota,e.nama as nama_prov,f.nama as nama_kawasan,
				   g.no_sertifikat,g.skhak,g.nilai_perolehan,g.cara_perolehan,g.atas_nama,
				   convert(varchar, g.tanggal_perolehan, 101) as tanggal_perolehan,g.luas,g.letak_lahan,g.status,
				   convert(varchar, g.tanggal_terbit, 101) as tanggal_terbit,convert(varchar, g.jatuh_tempo, 101) as jatuh_tempo
			from amu_lahan a 
			inner join amu_desa b on a.id_desa=b.id
			inner join amu_kecamatan c on b.id_kecamatan=c.id
			inner join amu_kota d on c.id_kota=d.id
			inner join amu_provinsi e on d.id_provinsi=e.id
			inner join amu_kawasan f on a.id_kawasan=f.id_kawasan and a.kode_lokasi=f.kode_lokasi
			left join amu_sertifikat_lahan g on a.id_lahan=g.id_lahan and a.kode_lokasi=g.kode_lokasi
			$this->filter
			order by a.id_lahan ";
        echo $sql;
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
       
        echo "<div align='center'>";
        //echo "$sql";
		echo $AddOnLib->judul_laporan("data lahan",$this->lokasi,"");
        echo"<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan'  width='30'>No</td>
                        <td align='center' class='header_laporan'  width='60'>ID Lahan</td>
                        <td align='center' class='header_laporan' width='60'>Status Lahan</td>
						<td align='center' class='header_laporan' width='60'>Status Milik</td>
                        <td align='center' class='header_laporan'  width='150'>Uraian Aset</td>
						<td align='center' class='header_laporan'  width='150'>Kawasan</td>
						<td align='center' class='header_laporan'  width='150'>Alamat</td>
                        <td align='center' class='header_laporan'  width='100'>Provinsi</td>
						<td align='center' class='header_laporan'  width='100'>Kota</td>
						<td align='center' class='header_laporan'  width='100'>Kecamatan</td>
						<td align='center' class='header_laporan'  width='100'>Kelurahan</td>
						<td align='center' class='header_laporan'  width='60'>Tanggal Perolehan</td>
						<td align='center' class='header_laporan'  width='100'>Cara Perolehan</td>
						<td align='center' class='header_laporan'  width='100'>No AJB/BAST</td>
						<td align='center' class='header_laporan'  width='100'>Nilai Perolehan</td>
						<td align='center' class='header_laporan'  width='100'>Luas (m2)
(Perolehan)</td>
						<td align='center' class='header_laporan'  width='100'>Luas (m2)
(Akhir)</td>
						<td align='center' class='header_laporan'  width='100'>Status Sertifikat</td>
						<td align='center' class='header_laporan'  width='100'>No Sertifikat</td>
						<td align='center' class='header_laporan'  width='100'>Tanggal Terbit</td>
						<td align='center' class='header_laporan'  width='100'>Jatuh Tempo</td>
                    </tr>
                   
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td class='isi_laporan'>$i</td>
                        <td class='isi_laporan'>";
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->id_lahan','$row->kode_lokasi');\">$row->id_lahan</a>";
					echo "</td>
                        <td class='isi_laporan'>$row->status_aktif</td>
						<td class='isi_laporan'>$row->status_dokumen</td>
                        <td class='isi_laporan'>$row->nama_lahan</td>
						<td class='isi_laporan'>$row->nama_kawasan</td>
						<td class='isi_laporan'>$row->alamat</td>
						<td class='isi_laporan'>$row->nama_prov</td>
						<td class='isi_laporan'>$row->nama_kota</td>
						<td class='isi_laporan'>$row->nama_kec</td>
						<td class='isi_laporan'>$row->nama_desa</td>
						<td class='isi_laporan'>$row->tanggal_perolehan</td>
						<td class='isi_laporan'>$row->cara_perolehan</td>
						<td class='isi_laporan'>$row->no_sertifikat</td>
						<td class='isi_laporan'>".number_format($row->nilai_perolehan,0,',','.')."</td>
						<td class='isi_laporan'>".number_format($row->luas,0,',','.')."</td>
						<td class='isi_laporan'>".number_format($row->luas,0,',','.')."</td>
						<td class='isi_laporan'>$row->status</td>
						<td class='isi_laporan'>$row->skhak</td>
						<td class='isi_laporan'>$row->tanggal_terbit</td>
						<td class='isi_laporan'>$row->jatuh_tempo</td>
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
