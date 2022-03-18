<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptPBB extends server_report_basic
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
        
        $sql="select a.id_pbb,a.kode_lokasi,a.nop,a.obyek,a.nama,a.alamat,c.nama as nama_lembaga,
			   year(b.jatuh_tempo) as tahun,b.jatuh_tempo,b.luas_lahan,b.luas_gedung,b.njop_lahan,b.njop_gedung,b.njop_tkp,b.njop_pbb,b.tarif,
			   b.pbb_terutang,convert(varchar, d.tanggal, 103) as tgl_diskon,isnull(d.nilai,0) as nilai_diskon,d.keterangan as ket_diskon,
			   convert(varchar, e.tanggal, 103) as tgl_bayar,isnull(e.nilai,0) as nilai_bayar,e.keterangan as ket_bayar
		from amu_pbb a
		left join amu_pbb_d b on a.id_pbb=b.id_pbb and a.kode_lokasi=b.kode_lokasi
		left join amu_lembaga c on a.id_lembaga=c.id_lembaga 
		left join amu_pbb_diskon d on b.no_bukti=d.no_sppt and a.kode_lokasi=d.kode_lokasi
		left join amu_pbb_bayar e on b.no_bukti=e.no_sppt and a.kode_lokasi=e.kode_lokasi
        $this->filter
        order by a.id_pbb ";
       
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
        echo $AddOnLib->judul_laporan("DAFTAR PBB",$this->lokasi,"");
        echo "<div align='center'>";
        //echo "$sql";
        echo"<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1600' >
                
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan' width='30'>No</td>
                        <td align='center' class='header_laporan' width='60'>Id PBB</td>
						<td align='center' class='header_laporan' width='100'>Lembaga </td>
						<td align='center' class='header_laporan' width='100'>NOP </td>
						<td align='center' class='header_laporan' width='150'>Lahan Objek Pajak</td>
						<td align='center' class='header_laporan' width='150'>Nama</td>
						<td align='center' class='header_laporan' width='150'>Alamat</td>
                        <td align='center' class='header_laporan' width='60'>Tahun</td>
						<td align='center' class='header_laporan' width='60'>Jatuh Tempo</td>
                        <td align='center' class='header_laporan' width='60'>Luas Lahan (m2)</td>
                        <td align='center' class='header_laporan' width='60'>Luas Bangunan (m2)</td>
						<td align='center' class='header_laporan' width='90'>NJOP Tanah</td>
						<td align='center' class='header_laporan' width='90'>NJOP Gedung</td>
						<td align='center' class='header_laporan' width='90'>NJOP TKP</td>
						<td align='center' class='header_laporan' width='90'>NJOP PBB</td>
						<td align='center' class='header_laporan' width='90'>Tarif</td>
						<td align='center' class='header_laporan' width='90'>PBB Terhutang</td>
						<td align='center' class='header_laporan' width='60'>Tgl Discount</td>
						<td align='center' class='header_laporan' width='90'>Nilai Discount</td>
						<td align='center' class='header_laporan' width='100'>Ket Discount</td>
						<td align='center' class='header_laporan' width='60'>Tgl Bayar</td>
						<td align='center' class='header_laporan' width='90'>Nilai Bayar</td>
						<td align='center' class='header_laporan' width='100'>Ket Bayar</td>
                    </tr>
                    
                ";
				$luas_lahan=0; $luas_gedung=0; $pbb_terutang=0; $nilai_diskon=0; $nilai_bayar=0; 
                while ($row = $rs->FetchNextObject($toupper=false))
                {
					$luas_lahan+=$row->luas_lahan;
					$luas_gedung+=$row->luas_gedung;
					$pbb_terutang+=$row->pbb_terutang;
					$nilai_diskon+=$row->nilai_diskon;
					$nilai_bayar+=$row->nilai_bayar;
                    echo "
                    <tr>
                        <td class='isi_laporan' align='center'>$i</td>
                        <td class='isi_laporan'>$row->id_pbb</td>
						 <td class='isi_laporan'>$row->nama_lembaga</td>
						<td class='isi_laporan'>$row->nop</td>
						<td class='isi_laporan'>$row->obyek</td>
                        <td class='isi_laporan'>$row->nama</td>
                        <td class='isi_laporan'>$row->alamat</td>
						<td class='isi_laporan'>$row->tahun</td>
                        <td class='isi_laporan'>$row->jatuh_tempo</td>
                        <td class='isi_laporan' align='right'>".number_format($row->luas_lahan,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->luas_gedung,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->njop_lahan,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->njop_gedung,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->njop_tkp,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->njop_pbb,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->pbb_terutang,0,',','.')."</td>
						<td class='isi_laporan'>$row->tgl_diskon</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,',','.')."</td>
						<td class='isi_laporan'>$row->ket_diskon</td>
						<td class='isi_laporan'>$row->tgl_bayar</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,',','.')."</td>
						<td class='isi_laporan'>$row->ket_bayar</td>
                    </tr>
                    ";
                    $i++;
                }
				 echo "
                    <tr>
                        <td class='isi_laporan' align='center' colspan='9'>Total</td>
                        <td class='isi_laporan' align='right'>".number_format($luas_lahan,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($luas_gedung,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>/td>
                        <td class='isi_laporan' align='right'></td>
						<td class='isi_laporan' align='right'></td>
						<td class='isi_laporan' align='right'></td>
						<td class='isi_laporan' align='right'></td>
						<td class='isi_laporan' align='right'>".number_format($pbb_terutang,0,',','.')."</td>
						<td class='isi_laporan'>$row->tgl_diskon</td>
						<td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,',','.')."</td>
						<td class='isi_laporan'>$row->ket_diskon</td>
						<td class='isi_laporan'>$row->tgl_bayar</td>
						<td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,',','.')."</td>
						<td class='isi_laporan'>$row->ket_bayar</td>
                    </tr>";
                    echo"
               
            </table>
            <br>";
       
        echo "</div>";
		return "";
		
	}
	
}
?>
