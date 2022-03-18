<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptTanah extends server_report_basic
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
        
        $sql="select a.id_lahan,convert(varchar, a.tanggal_perolehan, 101) as tanggal_perolehan,a.nama_lahan,a.alamat,b.nama as nama_prov,
        c.nama as nama_kot,a.cara_perolehan,a.atas_nama,a.luas,a.status_dokumen,a.nilai_perolehan,a.nop,a.keterangan,a.luas,
		case when a.flag_aktif='1' then 'Aktif' else 'Non Aktif' end as status_aktif,f.nama as nama_kawasan,
        case when d.nama = '' then '-' else isnull(d.nama,'-') end as nama_kec,
        case when e.nama = '' then '-' else isnull(e.nama,'-') end as nama_des
        from amu_lahan a 
		inner join amu_provinsi b on a.id_provinsi = b.id 
		inner join amu_kota c on a.id_kota=c.id 
        inner join amu_kecamatan d on a.id_kecamatan=d.id 
		inner join amu_desa e on a.id_desa=e.id
		left join amu_kawasan f on a.id_kawasan=f.id_kawasan and a.kode_lokasi=f.kode_lokasi
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
						<td align='center' class='header_laporan'  width='60'>Luas (M2)</td>
						<td align='center' class='header_laporan'  width='200'>Keterangan</td>
                    </tr>
                   
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td class='isi_laporan'>$i</td>
                        <td class='isi_laporan'>$row->id_lahan</td>
                        <td class='isi_laporan'>$row->status_aktif</td>
						<td class='isi_laporan'>$row->status_dokumen</td>
                        <td class='isi_laporan'>$row->nama_lahan</td>
						<td class='isi_laporan'>$row->nama_kawasan</td>
						<td class='isi_laporan'>$row->alamat</td>
						<td class='isi_laporan'>$row->nama_prov</td>
						<td class='isi_laporan'>$row->nama_kot</td>
						<td class='isi_laporan'>$row->nama_kec</td>
						<td class='isi_laporan'>$row->nama_des</td>
						<td class='isi_laporan'>".number_format($row->luas,0,',','.')."</td>
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
