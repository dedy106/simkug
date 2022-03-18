<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptGedungSewa extends server_report_basic
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
        
        $sql="select a.id_gedung,a.kode_lokasi,convert(varchar, a.tanggal_perolehan, 101) as tanggal_perolehan,a.nama_gedung,a.alamat,a.nilai_perolehan, 
			   a.id_lahan,a.luas_lantai,a.luas_lain,a.jumlah_ruang,h.nama as nama_lembaga,a.jumlah_lantai,a.status,
			   case when a.flag_aktif='1' then 'Aktif' else 'Non Aktif' end as status_aktif,
			   c.nama as nama_desa,c.kode_pos,d.nama as nama_kec,e.nama as nama_kota,f.nama as nama_prov,g.nama as nama_kawasan,
			   i.no_bukti,i.no_pks,i.mitra,i.nilai,i.luas,i.keterangan,
			   convert(varchar, i.tgl_mulai, 101) as tgl_mulai,convert(varchar, i.tgl_selesai, 101) as tgl_selesai
		from amu_gedung a
		inner join amu_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
		inner join amu_desa c on b.id_desa=c.id
		inner join amu_kecamatan d on c.id_kecamatan=d.id
		inner join amu_kota e on d.id_kota=e.id
		inner join amu_provinsi f on e.id_provinsi=f.id
		inner join amu_kawasan g on a.id_kawasan=g.id_kawasan and a.kode_lokasi=g.kode_lokasi
		inner join amu_lembaga h on a.id_kawasan=h.id_kawasan and a.kode_lokasi=h.kode_lokasi
		left join amu_gedung_sewa i on a.id_gedung=i.id_gedung and a.kode_lokasi=i.kode_lokasi
        $this->filter
        order by a.id_gedung ";
       
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
        
        echo "<div align='center'>";
        //echo "$sql";
		

		echo $AddOnLib->judul_laporan("data gedung",$this->lokasi,"");
        echo"<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
                <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan'  width='30'>No</td>
                        <td align='center' class='header_laporan'  width='60'>ID Gedung</td>
                        <td align='center' class='header_laporan' width='60'>Status Gedung</td>
						<td align='center' class='header_laporan' width='60'>Status Milik</td>
                        <td align='center' class='header_laporan'  width='150'>Nama Gedung</td>
						<td align='center' class='header_laporan'  width='150'>Kawasan</td>
						<td align='center' class='header_laporan'  width='150'>Lembaga</td>
						<td align='center' class='header_laporan'  width='150'>Alamat</td>
                        <td align='center' class='header_laporan'  width='100'>Provinsi</td>
						<td align='center' class='header_laporan'  width='100'>Kota</td>
						<td align='center' class='header_laporan'  width='100'>Kecamatan</td>
						<td align='center' class='header_laporan'  width='100'>Kelurahan</td>
						<td align='center' class='header_laporan'  width='60'>Jumlah Lantai</td>
						<td align='center' class='header_laporan'  width='60'>Luas Lantai</td>
						<td align='center' class='header_laporan'  width='60'>Jumlah Ruangan</td>
						<td align='center' class='header_laporan'  width='100'>Tgl PKS</td>
						<td align='center' class='header_laporan'  width='100'>Mitra</td>
						<td align='center' class='header_laporan'  width='100'>Luas</td>
						<td align='center' class='header_laporan'  width='100'>Nilai</td>
						<td align='center' class='header_laporan'  width='100'>Tgl Mulai</td>
						<td align='center' class='header_laporan'  width='100'>Tgl Berakhir</td>
						<td align='center' class='header_laporan'  width='100'>Keterangan</td>
                    </tr>   
                   
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr >
                        <td class='isi_laporan'>$i</td>
                        <td class='isi_laporan'>";
					echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->id_gedung','$row->kode_lokasi');\">$row->id_gedung</a>";
					echo "</td>
                        <td class='isi_laporan'>$row->status_aktif</td>
						<td class='isi_laporan'>$row->status</td>
                        <td class='isi_laporan'>$row->nama_gedung</td>
						<td class='isi_laporan'>$row->nama_kawasan</td>
						<td class='isi_laporan'>$row->nama_lembaga</td>
						<td class='isi_laporan'>$row->alamat</td>
						<td class='isi_laporan'>$row->nama_prov</td>
						<td class='isi_laporan'>$row->nama_kota</td>
						<td class='isi_laporan'>$row->nama_kec</td>
						<td class='isi_laporan'>$row->nama_desa</td>
						<td class='isi_laporan' align='right'>".number_format($row->jumlah_lantai,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->luas_lantai,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->jumlah_ruang,0,',','.')."</td>
						<td class='isi_laporan'>$row->no_bukti</td>
						<td class='isi_laporan'>$row->no_pks</td>
						<td class='isi_laporan'>$row->mitra</td>
						<td class='isi_laporan' align='right'>".number_format($row->luas,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
						<td class='isi_laporan'>$row->tgl_mulai</td>
						<td class='isi_laporan'>$row->tgl_selesai</td>
						<td class='isi_laporan'>$row->keterangan</td>
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
