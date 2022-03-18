<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptJadwalProyekNtf extends server_report_basic
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
		$nama_cab=$tmp[1];
		$sql="select a.kode_proyek,a.periode,a.nilai_pend,c.akun_pdpt,a.nilai_beban,c.akun_beban from prb_proyek_d a
        inner join prb_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
        inner join prb_proyek_jenis c on c.kode_jenis=b.kode_jenis and c.kode_lokasi=b.kode_lokasi
        $this->filter 
        order by a.periode
        ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("jadwal schedule proyek",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='90'  align='center' class='header_laporan'>Kode Proyek</td>
            <td width='90'  align='center' class='header_laporan'>Periode</td>
            <td width='90'  align='center' class='header_laporan'>Nilai Pendapatan</td>
            <td width='90'  align='center' class='header_laporan'>Akun Pendapatan</td>
            <td width='90'  align='center' class='header_laporan'>Nilai Beban</td>
            <td width='90'  align='center' class='header_laporan'>Akun Beban</td>
	    </tr>  ";
		$nilai_pend=0;$nilai_beban=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_pend=$nilai_pend+$row->nilai_pend;
			$nilai_beban=$nilai_beban+$row->nilai_beban;
		echo "<tr >
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row->kode_proyek</td>
        <td class='isi_laporan'>$row->periode</td>
        <td class='isi_laporan' align='right'>".number_format($row->nilai_pend,0,",",".")."</td>
        <td class='isi_laporan'>$row->akun_pdpt</td>
        <td class='isi_laporan' align='right'>".number_format($row->nilai_beban,0,",",".")."</td>
        <td class='isi_laporan'>$row->akun_beban</td>
        </tr>";
			$i=$i+1;
		}
    
        echo "<tr >
        <td class='isi_laporan' colspan='3'>Total</td>
        <td class='isi_laporan' align='right'>".number_format($nilai_pend,0,",",".")."</td>
        <td class='isi_laporan'>&nbsp;</td>
        <td class='isi_laporan' align='right'>".number_format($nilai_beban,0,",",".")."</td>
        <td class='isi_laporan'>&nbsp;</td>
        </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
