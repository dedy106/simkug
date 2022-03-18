<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptTanahSewa extends server_report_basic
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
			   a.cara_perolehan,a.atas_nama,a.luas,a.status_dokumen,a.keterangan,a.luas,
			   case when a.flag_aktif='1' then 'Aktif' else 'Non Aktif' end as status_aktif,
			   b.nama as nama_desa,b.kode_pos,c.nama as nama_kec,d.nama as nama_kota,e.nama as nama_prov,f.nama as nama_kawasan,
			   g.mitra, g.no_pks_ypt, g.no_pks_mitra, g.luas, g.nilai,g.keterangan,
			   convert(varchar, g.tgl_mulai, 101) as tgl_mulai,convert(varchar, g.tgl_selesai, 101) as tgl_selesai,
			   convert(varchar, g.tgl_pks, 101) as tgl_pks 
		from amu_lahan a 
		inner join amu_desa b on a.id_desa=b.id
		inner join amu_kecamatan c on b.id_kecamatan=c.id
		inner join amu_kota d on c.id_kota=d.id
		inner join amu_provinsi e on d.id_provinsi=e.id
		inner join amu_kawasan f on a.id_kawasan=f.id_kawasan and a.kode_lokasi=f.kode_lokasi
		left join amu_lahan_sewa g on a.id_lahan=g.id_lahan and a.kode_lokasi=g.kode_lokasi
        $this->filter
        order by a.id_lahan ";
       
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
						<td align='center' class='header_laporan'  width='100'>Mitra</td>
						<td align='center' class='header_laporan'  width='60'>Tgl PKS</td>
						<td align='center' class='header_laporan'  width='200'>No PKS YPT</td>
						<td align='center' class='header_laporan'  width='200'>No PKS Mitra</td>
						<td align='center' class='header_laporan'  width='200'>Tanggal Mulai</td>
						<td align='center' class='header_laporan'  width='200'>Tanggal Berakhir</td>
						<td align='center' class='header_laporan'  width='200'>Luas (m2)</td>
						<td align='center' class='header_laporan'  width='200'>Nilai Sewa</td>
                    </tr>
                   
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td class='isi_laporan' align='center'>$i</td>
						<td class='isi_laporan'>";
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->id_lahan','$row->kode_lokasi');\">$row->id_lahan</a>";
					echo "</td>
                        <td class='isi_laporan'>$row->id_lahan</td>
                        <td class='isi_laporan'>$row->status_aktif</td>
						<td class='isi_laporan'>$row->status_dokumen</td>
						<td class='isi_laporan'>$row->nama_kawasan</td>
						<td class='isi_laporan'>$row->alamat</td>
						<td class='isi_laporan'>$row->nama_prov</td>
						<td class='isi_laporan'>$row->nama_kota</td>
						<td class='isi_laporan'>$row->nama_kec</td>
						<td class='isi_laporan'>$row->nama_desa</td>
						<td class='isi_laporan'>$row->mitra</td>
						<td class='isi_laporan'>$row->tgl_pks</td>
						<td class='isi_laporan'>$row->no_pks_ypt</td>
						<td class='isi_laporan'>$row->no_pks_mitra</td>
						<td class='isi_laporan'>$row->tgl_mulai</td>
						<td class='isi_laporan'>$row->tgl_selesai</td>
						<td class='isi_laporan' align='right'>".number_format($row->luas,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
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
