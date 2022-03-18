<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptPbbRekap extends server_report_basic
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
        
        $sql="select a.kode_lokasi,c.nama,isnull(year(b.jatuh_tempo),'-') as tahun,
			   sum(b.luas_lahan) as luas_lahan,sum(b.luas_gedung) as luas_gedung,
			   sum(b.pbb_terutang) as pbb_terutang,sum(isnull(d.nilai,0)) as nilai_diskon,
			   sum(isnull(e.nilai,0)) as nilai_bayar
		from amu_pbb a
		inner join amu_pbb_d b on a.id_pbb=b.id_pbb and a.kode_lokasi=b.kode_lokasi
		left join amu_lembaga c on a.id_lembaga=c.id_lembaga 
		left join amu_pbb_diskon d on b.no_bukti=d.no_sppt and a.kode_lokasi=d.kode_lokasi
		left join amu_pbb_bayar e on b.no_bukti=e.no_sppt and a.kode_lokasi=e.kode_lokasi
		$this->filter
		group by a.kode_lokasi,c.nama,isnull(year(b.jatuh_tempo),'-') ";
		//echo $sql;
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
        echo $AddOnLib->judul_laporan("DAFTAR REKAP PBB",$this->lokasi,"");
        echo "<div align='center'>";
        //echo "$sql";
        echo"<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000' >
                
                    <tr bgcolor='#CCCCCC'>
                        <td align='center' class='header_laporan' width='30'>No</td>
						<td align='center' class='header_laporan' width='100'>Lembaga </td>
                        <td align='center' class='header_laporan' width='60'>Tahun</td>
						<td align='center' class='header_laporan' width='90'> Luas Bumi (m2)</td>
						<td align='center' class='header_laporan' width='90'> Luas Bangunan (m2)</td>
						<td align='center' class='header_laporan' width='90'>Total PBB Terhutang</td>
						<td align='center' class='header_laporan' width='90'>Total Nilai Discount</td>
						<td align='center' class='header_laporan' width='90'>Total Nilai Bayar</td>
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
						 <td class='isi_laporan'>$row->nama</td>
						<td class='isi_laporan'>$row->tahun</td>
                        <td class='isi_laporan' align='right'>".number_format($row->luas_lahan,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($row->luas_gedung,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->pbb_terutang,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,',','.')."</td>
                    </tr>
                    ";
                    $i++;
                }
				echo "
                    <tr>
                        <td class='isi_laporan' align='center' colspan='3'>Total</td>
                        <td class='isi_laporan' align='right'>".number_format($luas_lahan,0,',','.')."</td>
                        <td class='isi_laporan' align='right'>".number_format($luas_gedung,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($pbb_terutang,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,',','.')."</td>
						<td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,',','.')."</td>
                    </tr>
                    ";
                    echo"
               
            </table>
            <br>";
       
        echo "</div>";
		return "";
		
	}
	
}
?>
