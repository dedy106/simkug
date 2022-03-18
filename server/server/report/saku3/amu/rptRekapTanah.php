<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptRekapTanah extends server_report_basic
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
        
      	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
        
        echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("REKAPITULASI DATA INVENTARISASI ASET TANAH",$this->lokasi,"");
		
		$sql="select a.id_lahan,convert(varchar, a.tanggal_perolehan, 103) as tanggal_perolehan,a.nama_lahan,a.alamat,b.nama as nama_prov,
        c.nama as nama_kot,a.cara_perolehan,a.atas_nama,a.nilai_perolehan,a.cara_perolehan,a.no_hgb,a.no_ajb,a.status_dokumen,
		convert(varchar, a.tgl_hgb, 103) as tgl_hgb,convert(varchar, a.tgl_jt_hgb, 103) as tgl_jt_hgb,convert(varchar, a.tgl_ajb, 103) as tgl_ajb
from amu_lahan a 
inner join amu_provinsi b on a.id_provinsi = b.id 
inner join amu_kota c on a.id_kota=c.id 
        
        $this->filter
        order by a.id_lahan ";
       
        $rs = $dbLib->execute($sql);
        //echo "$sql";
        echo"<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1800'>
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan' rowspan='3'>No</td>
						<td align='center' class='header_laporan' rowspan='3'>ID Lahan</td>
                        <td align='center' class='header_laporan' rowspan='3'>Tanggal Perolehan</td>
                        <td align='center' class='header_laporan' rowspan='3'>Uraian Asset</td>
                        <td align='center' class='header_laporan' colspan='3'  rowspan='2'>Lokasi</td>
                        <td align='center' class='header_laporan' rowspan='3'>Nilai Perolehan</td>
                        <td align='center' class='header_laporan' rowspan='3'>Cara Perolehan</td>
                        <td align='center' class='header_laporan' rowspan='3'>Atas Nama</td>
                        <td align='center' class='header_laporan' colspan='6'  rowspan='2'>Sertifikat</td>
                        <td align='center' class='header_laporan' colspan='2'  rowspan='2'>AJB</td>
                        <td align='center' class='header_laporan' rowspan='3'>Status Dokumen</td>
                        <td align='center' class='header_laporan' colspan='6'>PBB</td>
                        <td align='center' class='header_laporan' rowspan='3'>Keterangan</td>
                    </tr>
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan' rowspan='2'>NOP / nomor objek pajak</td>
                        <td align='center' class='header_laporan' rowspan='2'>Jatuh Tempo</td>
                        <td align='center' class='header_laporan' colspan='2'>Bumi</td>
                        <td align='center' class='header_laporan' colspan='2'>Bangunan</td>
                    </tr>
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan'>Alamat</td>
                        <td align='center' class='header_laporan'>Kota/Kab</td>
                        <td align='center' class='header_laporan'>Provinsi</td>
                        <td align='center' class='header_laporan'>Luas (M<sup>2</sup>)</td>
                        <td align='center' class='header_laporan'>Status</td>
                        <td align='center' class='header_laporan'>No HGB</td>
                        <td align='center' class='header_laporan'>Tanggal</td>
                        <td align='center' class='header_laporan'>Nomor</td>
                        <td align='center' class='header_laporan'>Jatuh Tempo HGB</td>
                        <td align='center' class='header_laporan'>Nomor</td>
                        <td align='center' class='header_laporan'>Tanggal AJB</td>
                        <td align='center' class='header_laporan'>Luas </td>
                        <td align='center' class='header_laporan'>NJOP/M<sup>2</sup></td>
                        <td align='center' class='header_laporan'>Luas </td>
                        <td align='center' class='header_laporan'>NJOP/M<sup>2</sup></td>                    
                    </tr>
                ";
                while ($row = $rs->FetchNextObject($toupper=false))
                {
                    echo "
                    <tr>
                        <td  class='isi_laporan'>$i</td>
						<td class='isi_laporan'>$row->id_lahan</td>
                        <td class='isi_laporan'>$row->tanggal_perolehan</td>
                        <td  class='isi_laporan'>$row->nama_lahan</td>
                        <td class='isi_laporan'>$row->alamat</td>
                        <td  class='isi_laporan'>$row->nama_kot</td>
                        <td  class='isi_laporan'>$row->nama_prov</td>
                        <td class='isi_laporan' align='right'>".number_format($row->nilai_perolehan,0,',','.')."</td>
                        <td  class='isi_laporan'>$row->cara_perolehan</td>
                        <td  class='isi_laporan'>$row->atas_nama</td> 
                        <td class='isi_laporan' align='right'>".number_format($row->luas,0,',','.')."</td>
                        <td  class='isi_laporan'>$row->status</td>
                        <td  class='isi_laporan'>$row->no_hgb</td>
                        <td  class='isi_laporan'>$row->tgl_hgb</td>
                        <td  class='isi_laporan'>$row->nomor</td>
                        <td  class='isi_laporan'>$row->tgl_jthhgb</td>
                        <td  class='isi_laporan'>$row->no_ajb</td>
                        <td  class='isi_laporan'>$row->tgl_ajb</td>
                        <td  class='isi_laporan'>$row->sts_dok</td>
                        <td  class='isi_laporan'>$row->nop</td>
                        <td  class='isi_laporan'>$row->jatuh_tempo</td>
                        <td  class='isi_laporan' align='right'>".number_format($row->luas_lahan,0,',','.')."</td>
                        <td  class='isi_laporan' align='right'>".number_format($row->njop_tanah,0,',','.')."</td>
                        <td  class='isi_laporan' align='right'>".number_format($row->luas_gedung,0,',','.')."</td>
                        <td  class='isi_laporan' align='right'>".number_format($row->njop_bangunan,0,',','.')."</td>
                        <td  class='isi_laporan' align='right'>$row->keterangan</td>
                    </tr>
                    ";
                    $i++;
                }

                   
       
        echo "</div>";
		return "";
		
	}
	
}
?>
