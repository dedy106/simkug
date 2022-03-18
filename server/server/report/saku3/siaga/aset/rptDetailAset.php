<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_aset_rptDetailAset extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(id_aset) as jum from am_aset a
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
		$this->filter 
		";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			//$totPage = ceil($count / 50);				
		}		
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$kode_lokasi=$tmp[1];
		
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
			$this->filter 
			order by a.id_aset ";

		// echo $sql;

		//$rs = $dbLib->execute($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
        echo "<div align='center'>";
        while ($row = $rs->FetchNextObject($toupper=false))
		{ 
		echo $AddOnLib->judul_laporan("detail asset",$this->lokasi,"");
        echo "<table border='1' cellspacing='0' width='800' cellpadding='0' class='kotak'>
    <tr>
        <td align='center'>
            <table border='0' cellspacing='0' width='800' cellpadding='0'>
            <tr>
                <td width='200' class='header_laporan'>ID Aset</td>
                <td width='400' class='isi_laporan'>: &nbsp; $row->id_aset</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Proyek</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_proyek - $row->nama_proyek</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>PP</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_pp - $row->nama_pp</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>SubPP</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_subpp - $row->nama_subpp</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Kelompok Lokasi</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_klplok - $row->nama_klplok</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Lokasi</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_lokam - $row->nama_lokam</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Sub Lokasi</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_sublok - $row->nama_sublok</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Kategori Aset</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_kateg - $row->nama_kateg</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Sub Kategori</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_subkateg - $row->nama_subkateg</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Kelompok Aset</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_klpbarang - $row->nama_klpbarang</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>No NPKO</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_npko</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Jenis</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->jenis</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Dasar Pengadaan</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->dasar</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Jumlah</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->jumlah</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Satuan</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->satuan</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Nama Aset</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->nama</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>No Bukti Akuntansi</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_bukti</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>No Seri</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->no_seri</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Lokasi Aktual</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->lokasi</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Spesifikasi Teknik</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->spek</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Vendor</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_vendor - $row->na</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Status</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->status</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Garansi [Bulan]</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->garansi</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Penanggung Jawab</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->pnj</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Currency</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kode_curr</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Nilai Perolehan</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->nilai</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Kurs</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->kurs</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Tgl Perolehan</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->tgl_oleh</td>
            </tr>
            <tr>
                <td width='200'   class='header_laporan'>Keterangan</td>
                <td width='400'   class='isi_laporan'>: &nbsp; $row->keterangan</td>
            </tr>
        </table>
        </td>
        </tr>
            ";
      
        echo "</table><br>";
    }
		echo "</div>";
	
		return "";
		
	}
	
}
?>
