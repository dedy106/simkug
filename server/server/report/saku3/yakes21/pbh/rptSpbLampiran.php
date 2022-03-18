<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptSpbLampiran extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select 1 ";
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
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_sah,d.nama as nama_sah,a.nik_fiat,e.nama as nama_fiat,
	  convert(varchar,a.tanggal,103) as tgl,f.logo,f.alamat,f.nama as nama_lokasi,f.kota,isnull(g.jumlah,0) as jumlah
from spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_sah=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi
left join (select a.no_spb,a.kode_lokasi,count(a.no_pb) as jumlah
from pbh_pb_m a
inner join pbh_rek b on a.no_pb=b.no_bukti
group by a.no_spb,a.kode_lokasi
        )g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
        $this->filter order by a.no_spb";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/tu.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nama_lokasi=strtoupper($row->nama_lokasi);
		
            // if ($row->jumlah>1) {
                echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                        <td align='center' class='isi_bukti'>DAFTAR REKENING </td>
                    </tr>
                    <tr>
                        <td align='center' class='isi_bukti'>NO SPB : $row->no_spb </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr><td>";

                echo "<table width='1000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                        <tr bgcolor='#CCCCCC'>
                        <td width='30' align='center' class='header_laporan'>No</td>
                        <td width='150' align='center' class='header_laporan'>Nama</td>
                        <td width='150' align='center' class='header_laporan'>Alamat</td>
                        <td width='100' align='center' class='header_laporan'>Bank</td>
                        <td width='120' align='center' class='header_laporan'>No Rekening</td>
                        <td width='150' align='center' class='header_laporan'>Nama Rekening </td>
                        <td width='90' align='center' class='header_laporan'>Nilai </td>
                        </tr>";
                $sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai,b.nama_rek,c.alamat
                from pbh_pb_m a
                inner join pbh_rek b on a.no_pb=b.no_bukti
                left join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
                where a.no_spb='$row->no_spb'";
                $rs1 = $dbLib->execute($sql);	
                $j=1; $nilai=0;
                while ($row1 = $rs1->FetchNextObject($toupper=false))
                {
                    $nilai+=$row1->nilai;
                    echo "<tr>
                    <td class='isi_laporan' align='center'>$i</td>
                    <td class='isi_laporan'>$row1->nama</td>
                    <td class='isi_laporan'>$row1->alamat</td>
                    <td class='isi_laporan'>$row1->bank</td>
                    <td class='isi_laporan'>$row1->no_rek</td>
                    <td class='isi_laporan'>$row1->nama_rek</td>
                    <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                    <tr>";
                    $i+=1;
                }
                echo "<tr>
                    <td class='header_laporan' align='center' colspan='6'>Total</td>
                    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                    <tr>";
                echo "</table>";
                echo "</td></tr></table>";
                echo "<br><DIV style='page-break-after:always'></DIV>";
                $j+=1;
                
            // }
			$i=$i+1;
		}
    
		echo "</div>";
		return "";
		
	}
	
}
?>
