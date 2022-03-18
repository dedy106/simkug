<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptRinciPiu extends server_report_basic
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
        $kode_lokasi = $tmp[0];
		$periode=$tmp[1];
		$kode_kantin=$tmp[2];
        $tahun=substr($tmp[1],0,4);

        $sql = "select nama from ktu_kantin where kode_kantin='$kode_kantin' and kode_lokasi='$kode_lokasi' ";
        $res = $dbLib->execute($sql);
        $nama_kantin= $res->fields[0];

		$sql="select a.no_load,convert(varchar,a.tanggal,106) as tanggal,b.kode_bayar,b.jumlah,b.nilai,a.kode_kantin,c.nama,
		(CASE WHEN DATENAME(dw, a.tanggal)='Sunday' then 'Minggu'
WHEN DATENAME(dw, a.tanggal)='Monday' THEN 'Senin'
WHEN DATENAME(dw, a.tanggal)='Tuesday' THEN 'Selasa'
WHEN DATENAME(dw, a.tanggal)='Wednesday' THEN 'Rabu'
WHEN DATENAME(dw, a.tanggal)='Thursday' THEN 'Kamis'
WHEN DATENAME(dw, a.tanggal)='Friday' THEN 'Jumat' ELSE 'Sabtu' END ) as hari
        from kantin_load a
        inner join kantin_bayar b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi
        inner join ktu_kantin c on a.kode_kantin=c.kode_kantin and a.kode_lokasi=c.kode_lokasi
        $this->filter
        order by a.no_load,a.tanggal";
		
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		// while ($row = $rs->FetchNextObject($toupper=false))
		// {
			$nilai=$nilai+$row->nilai;
        echo"<table width='600' border='0' cellspacing='0' cellpadding='0' >
                <tr>
                    <td><img src='$logo' width='200' height='72'></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td height='30' align='center' valign='middle' class='judul_bukti'>Rincian Tagihan Voucher Dosen Lb <br> $nama_kantin</td>
                </tr>
                <tr>
                    <td colspan='2' style='padding:10px;'>
                    <table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                        <tr bgcolor='#CCCCCC'>
                            <td width='30' align='center' class='header_laporan' rowspan='2'>No</td>
                            <td width='80' align='center' class='header_laporan' rowspan='2'>Hari</td>
                            <td width='100' align='center' class='header_laporan' rowspan='2'>Tanggal</td>
                            <td width='300' align='center' class='header_laporan' rowspan='2'>Kantin</td>
                            <td width='80' align='center' class='header_laporan' rowspan='2'>Jenis Pembayaran</td>
                            <td width='180' align='center' class='header_laporan' colspan='2'>Jumlah</td>
                        </tr>
                        <tr bgcolor='#CCCCCC'>
                            <td width='80' align='center' class='header_laporan'>LBR</td>
                            <td width='100' align='center' class='header_laporan'>Nominal @Rp</td>
                        </tr>";
         
                        $jumlah=0; $nilai=0; $no=1;
                        while ($row1 = $rs->FetchNextObject($toupper=false))
                            {
                                $jumlah+=$row1->jumlah;
                                $nilai+=$row1->nilai;
                        echo "<tr>
                            <td class='isi_laporan'>$no</td>
                            <td class='isi_laporan'>".ucwords($row1->hari)."</td>
                            <td class='isi_laporan'>$row1->tanggal</td>
                            <td class='isi_laporan'>$row1->nama</td>
                            <td class='isi_laporan'>$row1->kode_bayar</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->jumlah,0,",",".")."</td>
                            <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                        </tr>";
                        $no++;
                            }
                        echo "<tr>
                        <td class='header_laporan' colspan='5' align='right'>Total</td>
                    
                        <td class='header_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
                        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                    </tr>";
            echo "</table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td style='padding:10px'>Keterangan : Mohon untuk di transfer ke No Rekening<br>  <b>131-000-3877-000</b> a.n <b>UNIVERSITAS TELKOM</b>		
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
            <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
            <tr align='center'>
                <td width='25%'>&nbsp;</td>
                <td width='25%'>&nbsp;</td>
                <td width='15%'>&nbsp;</td>
                <td width='35%' align='center'>Bandung, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            </tr>
            <tr align='center'>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >Pembuat Daftar,</td>
            </tr>
            
            <tr align='center' valign='bottom'>
                <td height='70' class='garis_bawah'>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td class='garis_bawah'>Dinna</td>
            </tr>
            <tr align='center' valign='bottom'>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>Administrasi</td>
            </tr>
            </table></td>
        </tr>
    </table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		// }
		
		echo "</div>";
		return "";
		
	}
	
}
?>
