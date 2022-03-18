<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashSiagaLogDet2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $box=$tmp[2];
		$kunci=$tmp[3];
        $key=$tmp[4];
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div class='panel'>
				<div class='panel-body'>
				<div class='panel-heading'>
					<a href='#' class='small-box-footer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashSiagaLogDet','','$kode_lokasi/$periode/$box/$kunci');\"> Back <i class='fa fa-arrow-circle-left'></i></a>
                </div>";
                
                $sql="select a.id_aset,a.kode_proyek,a.kode_pp,a.kode_subpp,a.kode_klp,a.kode_lokam,a.kode_sublok,a.kode_kateg,a.kode_subkateg,a.kode_klpbarang,a.no_npko,a.jenis,a.dasar,a.jumlah,a.satuan,a.nama,a.no_bukti,a.no_seri,a.lokasi,a.spek,a.kode_vendor,a.status,a.garansi,a.pnj,a.kode_curr,a.kurs,a.nilai,a.tgl_oleh,a.keterangan,b.nama as nama_proyek, c.nama as nama_pp, d.nama as nama_subpp, e.nama as nama_klp, f.nama as nama_lokam, g.nama as nama_sublok,h.nama as nama_kateg,i.nama as nama_subkateg,j.nama as nama_klpbarang,k.nama as nama_vendor from am_aset a 
                    left join am_proyek b on a.kode_proyek=b.kode_proyek 
                    left join am_pp c on a.kode_pp=c.kode_pp 
                    left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                    left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                    left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                    left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                    left join am_kateg h on a.kode_kateg=h.kode_kateg 
                    left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                    left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                    left join vendor k on a.kode_vendor=k.kode_vendor 
                    where a.id_aset='$key'
                    order by a.id_aset ";

                    // echo $sql;

                    $rs=$dbLib->execute($sql);
                    $row = $rs->FetchNextObject(false);
                
                    echo "<table class='table' cellspacing='0' width='800' cellpadding='0' >
                    <tr>
                        <th style='text-align:center'>DETAIL ASSET</th>
                    </tr>
                    <tr>
                        <td align='center'>
                            <table class='table table-striped' cellspacing='0' width='800' cellpadding='0'>
                            <tr>
                                <th width='200' class='header_laporan'>ID Aset</th>
                                <td width='400' class='isi_laporan'>: &nbsp; $row->id_aset</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Proyek</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_proyek - $row->nama_proyek</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>PP</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_pp - $row->nama_pp</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>SubPP</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_subpp - $row->nama_subpp</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kelompok Lokasi</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_klplok - $row->nama_klplok</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Lokasi</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_lokam - $row->nama_lokam</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Sub Lokasi</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_sublok - $row->nama_sublok</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kategori Aset</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_kateg - $row->nama_kateg</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Sub Kategori</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_subkateg - $row->nama_subkateg</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kelompok Aset</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_klpbarang - $row->nama_klpbarang</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>No NPKO</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_npko</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Jenis</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->jenis</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Dasar Pengadaan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->dasar</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Jumlah</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->jumlah</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Satuan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->satuan</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Nama Aset</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->nama</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>No Bukti Akuntansi</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_bukti</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>No Seri</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_seri</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Lokasi Aktual</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->lokasi</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Spesifikasi Teknik</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->spek</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Vendor</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_vendor - $row->na</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Status</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->status</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Garansi [Bulan]</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->garansi</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Penanggung Jawab</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->pnj</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Currency</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_curr</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Nilai Perolehan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->nilai</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Kurs</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->kurs</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Tgl Perolehan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->tgl_oleh</td>
                            </tr>
                            <tr>
                                <th width='200'   class='header_laporan'>Keterangan</th>
                                <td width='400'   class='isi_laporan'>: &nbsp; $row->keterangan</td>
                            </tr>
                        </table>
                        </td>
                        </tr>
                            ";
                      
                        echo "</table><br>";
            
        echo"</div>
            </div>
        </div>";

       

		echo "<script type='text/javascript'>
			      
			</script>
		";
        
		return "";
	}
	
}
?>
