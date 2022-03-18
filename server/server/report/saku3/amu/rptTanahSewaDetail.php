<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptTanahSewaDetail extends server_report_basic
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
			   b.nama as nama_desa,b.kode_pos,c.nama as nama_kec,d.nama as nama_kota,e.nama as nama_prov,f.nama as nama_kawasan
		from amu_lahan a 
		inner join amu_desa b on a.id_desa=b.id
		inner join amu_kecamatan c on b.id_kecamatan=c.id
		inner join amu_kota d on c.id_kota=d.id
		inner join amu_provinsi e on d.id_provinsi=e.id
		inner join amu_kawasan f on a.id_kawasan=f.id_kawasan and a.kode_lokasi=f.kode_lokasi
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
        
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
						  <tr>
							<td><table width='800' border='0' cellspacing='2' cellpadding='1' >
							  <tr>
								<td width='30%' class='header_laporan'>ID lahan</td>
								<td width='70%' class='header_laporan'>$row->id_lahan</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Status lahan</td>
								<td class='header_laporan'>$row->status_dokumen</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Uraian Aset</td>
								<td class='header_laporan'>$row->nama_lahan</td>
							  </tr>
							  <tr>
								<td class='header_laporan'>Kawasan</td>
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
								<td class='header_laporan'>Keterangan</td>
								<td class='header_laporan'>$row->keterangan</td>
							  </tr>
							</table></td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
							  <tr bgcolor='#CCCCCC'>
								<td width='30' class='header_laporan' align='center'>No</td>
								<td width='60' class='header_laporan' align='center'>Tgl PKS</td>
								<td width='120' class='header_laporan' align='center'>No PKS YPT</td>
								<td width='120' class='header_laporan' align='center'>No. PKS Mitra</td>
								<td width='200' class='header_laporan' align='center'>Mitra</td>
								<td width='60' class='header_laporan' align='center'>Tgl Mulai</td>
								<td width='60' class='header_laporan' align='center'>Tgl Selesai</td>
								<td width='60' class='header_laporan' align='center'>Luas (m2)</td>
								<td width='100' class='header_laporan' align='center'>Nilai Sewa</td>
							  </tr>";
							$sql="select g.mitra, g.no_pks_ypt, g.no_pks_mitra, g.luas, g.nilai,g.keterangan,
			   convert(varchar, g.tgl_mulai, 101) as tgl_mulai,convert(varchar, g.tgl_selesai, 101) as tgl_selesai,
			   convert(varchar, g.tgl_pks, 101) as tgl_pks 
		from amu_lahan_sewa g 
        where g.id_lahan='$row->id_lahan' and g.kode_lokasi='$row->kode_lokasi'
         ";
							
							$rs1 = $dbLib->execute($sql);
							$i=1;
							while ($row1 = $rs1->FetchNextObject($toupper=false))
							{
							  echo "<tr >
								<td class='isi_laporan' align='center'>$i</td>
								<td class='isi_laporan'>$row1->tgl_pks</td>
								<td class='isi_laporan'>$row1->no_pks_ypt</td>
								<td class='isi_laporan'>$row1->no_pks_mitra</td>
								<td class='isi_laporan'>$row1->mitra</td>
								<td class='isi_laporan'>$row1->tgl_mulai</td>
								<td class='isi_laporan'>$row1->tgl_selesai</td>
								<td class='isi_laporan' align='right'>".number_format($row1->luas,0,',','.')."</td>
								<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
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
