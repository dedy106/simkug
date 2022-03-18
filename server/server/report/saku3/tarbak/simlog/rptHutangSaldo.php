<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_simlog_rptHutangSaldo extends server_report_basic
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
		$periode=$tmp[1];
		$tahun=substr($tmp[1],0,4);
		$sql="select a.no_hutang,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.akun_hutang,a.nilai,a.nilai-isnull(pb,0) as saldo,isnull(pb,0) as nilai_bayar,b.kode_vendor+' - '+b.nama as vendor 
        from hutang_m a 
        inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 				 
        inner join pp z on a.kode_pp=z.kode_pp and a.kode_lokasi=z.kode_lokasi 
        left join (select kode_lokasi,no_hutang,sum(nilai_final) as pb 
                   from pbh_pb_m where kode_lokasi='$kode_lokasi' and modul='PBBA' 
                   group by kode_lokasi,no_hutang) c on a.no_hutang=c.no_hutang and a.kode_lokasi=c.kode_lokasi 
        $this->filter        
        ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo hutang",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
        <tr>
            <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
            <tr bgcolor='#CCCCCC'>
                <td width='30'  align='center' class='header_laporan'>No</td>
                <td width='100'  align='center' class='header_laporan'>No Bukti</td>
                <td width='60'  align='center' class='header_laporan'>Tanggal</td>
                <td width='200'  align='center' class='header_laporan'>Vendor</td>
                <td width='200'  align='center' class='header_laporan'>Keterangan</td>
                <td width='60'  align='center' class='header_laporan'>Akun Hutang</td>
                <td width='90'  align='center' class='header_laporan'>Nilai</td>
                <td width='90'  align='center' class='header_laporan'>Nilai Bayar</td>
                <td width='90'  align='center' class='header_laporan'>Saldo</td>
                </tr>  ";
		$nilai=0;$saldo=0;$nilai_bayar=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai+=+$row->nilai;
            $saldo+=+$row->saldo;
            $nilai_bayar+=+$row->nilai_bayar;
			echo "<tr >
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->no_hutang</td>
            <td class='isi_laporan'>$row->tgl</td>
            <td class='isi_laporan'>$row->vendor</td>
            <td class='isi_laporan'>$row->keterangan</td>
            <td class='isi_laporan'>$row->akun_hutang</td>            
            <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
            </tr>";
			$i=$i+1;
        }
        echo "<tr >
            <td class='isi_laporan' align='center' colspan='6'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
        </tr>
        ";
		echo "</table>";
		echo "</td>
        </tr>
        </table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
