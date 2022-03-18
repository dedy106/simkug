<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptGedungMilikDetail extends server_report_basic
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
			   c.nama as nama_desa,c.kode_pos,d.nama as nama_kec,e.nama as nama_kota,f.nama as nama_prov,g.nama as nama_kawasan
		from amu_gedung a
		inner join amu_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
		inner join amu_desa c on b.id_desa=c.id
		inner join amu_kecamatan d on c.id_kecamatan=d.id
		inner join amu_kota e on d.id_kota=e.id
		inner join amu_provinsi f on e.id_provinsi=f.id
		inner join amu_kawasan g on a.id_kawasan=g.id_kawasan and a.kode_lokasi=g.kode_lokasi
		inner join amu_lembaga h on a.id_kawasan=h.id_kawasan and a.kode_lokasi=h.kode_lokasi
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
        
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
						  <tr>
							<td><table width='800' border='0' cellspacing='2' cellpadding='1' >
							  <tr>
								<td width='30%' class='header_laporan'>ID Gedung</td>
								<td width='70%' class='header_laporan'>$row->id_gedung</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Status Aktif</td>
								<td class='header_laporan'>$row->status_aktif</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Status Gedung</td>
								<td class='header_laporan'>$row->status</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Nama Gedung </td>
								<td class='header_laporan'>$row->nama_gedung</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Kawasan</td>
								<td class='header_laporan'>$row->nama_kawasan</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Lembaga</td>
								<td class='header_laporan'>$row->nama_kawasan</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Alamat</td>
								<td class='header_laporan'>$row->alamat</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Provinsi</td>
								<td class='header_laporan'>$row->nama_prov</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Kota</td>
								<td class='header_laporan'>$row->nama_kota</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Kecamatan</td>
								<td class='header_laporan'>$row->nama_kec</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Kelurahan</td>
								<td class='header_laporan'>$row->nama_desa</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Jumlah Lantai</td>
								<td class='header_laporan'>".number_format($row->jumlah_lantai,0,',','.')."</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Luas Lantai</td>
								<td class='header_laporan'>".number_format($row->luas_lantai,0,',','.')."</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Jumlah Ruangan HGB</td>
								<td class='header_laporan'>".number_format($row->jumlah_ruang,0,',','.')."</td>
							  </tr>
							
							</table></td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
							  <tr bgcolor='#CCCCCC'>
								<td width='30' class='header_laporan' align='center'>No</td>
								<td width='150' class='header_laporan' align='center'>No IMB</td>
								<td width='300' class='header_laporan' align='center'>Keterangan</td>
								<td width='60' class='header_laporan' align='center'>Tgl Terbit</td>
							  </tr>";
							$sql="select i.no_imb,i.nama as nama_imb,convert(varchar, i.tgl_terbit, 101) as tgl_terbit
		from amu_imb i
        where i.id_gedung='$row->id_gedung' and i.kode_lokasi='$row->kode_lokasi'
         ";
							
							$rs1 = $dbLib->execute($sql);
							$i=1;
							while ($row1 = $rs1->FetchNextObject($toupper=false))
							{
							  echo "<tr >
								<td class='isi_laporan' align='center'>$i</td>
								<td class='isi_laporan'>$row1->no_imb</td>
								<td class='isi_laporan'>$row1->nama_imb</td>
								<td class='isi_laporan'>$row1->tgl_terbit</td>
								
							  </tr>";
								$i=$i+1;
							}
							echo "</table></td>
						  </tr>
						</table>
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
