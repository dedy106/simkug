<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_amu_rptPbbKartu extends server_report_basic
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
        $kode_lokasi=$tmp[0];
        
        $sql="select a.id_pbb,a.kode_lokasi,a.nop,a.obyek,a.nama,a.alamat,b.nama
		from amu_pbb a
		inner join amu_lembaga b on a.id_lembaga=b.id_lembaga and a.kode_lokasi=b.kode_lokasi
		$this->filter
		order by a.id_pbb";
		
        $rs = $dbLib->execute($sql);	
        $i = 1;
        $resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

        $AddOnLib=new server_util_AddOnLib();	
        echo $AddOnLib->judul_laporan("KARTU PBB",$this->lokasi,"");
        echo "<div align='center'>";
        echo "<table border='0' width='800'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            echo "<tr>
                <td>
                    <table width='100%' border='0' cellspacing='2' cellpadding='1'>
						<tr>
                            <td class='header_laporan' width='15%' >ID PBB</td>
                            <td class='header_laporan' width='75%'>: $row->id_pbb</td>
                        </tr>
						<tr>
                            <td class='header_laporan' width='15%' >Lembaga</td>
                            <td class='header_laporan' width='75%'>: $row->nama</td>
                        </tr>
                        <tr>
                            <td class='header_laporan' width='15%' >NOP</td>
                            <td class='header_laporan' width='75%'>: $row->nop</td>
                        </tr>
                        <tr>
                            <td class='header_laporan'>Nama Wajib Pajak</td>
                            <td class='header_laporan'>: $row->nama</td> 
                        </tr>
                        <tr>
                            <td class='header_laporan'>Letak Objek Pajak</td>
                            <td class='header_laporan'>: $row->obyek</td>
                        </tr>
                       
                    </table>
                </td>
            </tr>
           
            <tr>
                <td>
                    <table border=1 cellspacing='0' cellpadding='0' class='kotak' width='1000'>
                        <tr bgcolor='#CCCCCC'>
                            <td rowspan='2' class='header_laporan' align='center' width='60'>Tahun</td>
							<td rowspan='2' class='header_laporan' align='center' width='80'>Luas Bumi</td>
							<td rowspan='2' class='header_laporan' align='center' width='80'>Luas Bangunan</td>
							<td rowspan='2' class='header_laporan' align='center' width='80'>NJOP Bumi</td>
							<td rowspan='2' class='header_laporan' align='center' width='80'>NJOP Bangunan</td>
                            <td rowspan='2' class='header_laporan' align='center' width='80'>Status Bayar</td>
                            <td rowspan='2' class='header_laporan' align='center' width='80'>Jatuh Tempo</td>
                            <td rowspan='2' class='header_laporan' align='center' width='80'>Tanggal Bayar</td>
                            <td colspan='3' class='header_laporan' align='center' width='80' >Terhutang</td>
                            <td colspan='3'class='header_laporan' align='center' width='80' >Dibayar</td>
                        </tr>
                        <tr bgcolor='#CCCCCC'>
                            <td class='header_laporan' align='center' width='90'>PBB</td>
                            <td class='header_laporan' align='center' width='90'>Denda</td>
							<td class='header_laporan' align='center' width='90'>Diskon</td>
                            <td class='header_laporan' align='center' width='90'>PBB</td>
                            <td class='header_laporan' align='center' width='90'>Denda</td>
                            <td class='header_laporan' align='center' width='90'>Total</td>
                        </tr>";
						$sql="select a.tahun,a.luas_gedung,a.luas_lahan,a.njop_gedung,a.njop_lahan,a.njop_pbb,a.njop_pbb,a.tarif,a.pbb_terutang,
							   convert(varchar,a.jatuh_tempo,103) as tgl,convert(varchar,b.tanggal,103) as tgl_bayar,
							   isnull(b.nilai,0) as bayar,case when isnull(b.nilai,0)=0 then 'Belum Bayar' else 'Lunas' end as sts_bayar,
							   isnull(c.nilai,0) as diskon,isnull(d.nilai,0) as denda
						from amu_pbb_d a
						left join amu_pbb_bayar b on a.id_pbb=b.no_pbb and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
						left join amu_pbb_diskon c on a.id_pbb=c.no_pbb and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
						left join amu_pbb_denda d on a.id_pbb=d.no_pbb and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
						where a.id_pbb='$row->id_pbb' and a.kode_lokasi='$row->kode_lokasi'
						order by tahun desc
						";
						$rs1 = $dbLib->execute($sql);	
						while ($row1 = $rs1->FetchNextObject($toupper=false))
						{
                        echo "<tr>
                            <td class='isi_laporan'>$row1->tahun</td>
							<td class='isi_laporan' align='right'>".number_format($row1->luas_lahan,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row1->luas_gedung,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row1->njop_lahan,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row1->njop_gedung,0,",",".")."</td>
                            <td class='isi_laporan'>".ucwords($row1->sts_bayar)."</td>
                            <td class='isi_laporan'>$row1->tgl</td>
                            <td class='isi_laporan'>$row1->tgl_bayar</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->pbb_terutang,0,",",".")."</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->denda,0,",",".")."</td>
							<td class='isi_laporan' align='right'>".number_format($row1->diskon,0,",",".")."</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->bayar,0,",",".")."</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->denda,0,",",".")."</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->bayar+$row->denda-$row->diskon,0,",",".")."</td>
                        </tr>";
						}
                    echo "</table>
                </td>
            </tr>";
		}	
        echo "</table>";
        echo "</div>";
		return "";
		
	}
	
}
?>
