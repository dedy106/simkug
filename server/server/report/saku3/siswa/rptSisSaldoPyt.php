<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoPyt extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $tahunaka = $tmp[1];
		$sql="select y.kode_jur,y.nama as nama_jur,z.nim,z.nama,x.no_inv,x.tahunaka,x.bill,x.rekon,x.saldo,x.kode_produk
        from
        (
            select a.*,isnull(b.rekon,0) as rekon,a.bill - isnull(b.rekon,0)  as saldo
            from 
            (
                select nim,no_inv,kode_pp,tahunaka,sum(case dc when 'D' then nilai else -nilai end) as bill ,kode_produk
                from aka_bill_d  
                where kode_lokasi ='$kode_lokasi'  and kode_produk in ('BPPP','BPPNP')
                group by nim,no_inv,tahunaka,kode_pp,kode_produk
            )a
        
            left join 
            (
                select no_inv,sum(case dc when 'D' then nilai else -nilai end) as rekon 
                from aka_amor_d  
                where kode_lokasi ='$kode_lokasi' 
                group by no_inv
            ) b on a.no_inv=b.no_inv
            where a.bill - isnull(b.rekon,0) > 0
        ) x
        
        inner join aka_jurusan y on x.kode_pp=y.kode_jur and y.kode_lokasi='$kode_lokasi'
        inner join aka_mahasiswa z on x.nim=z.nim and z.kode_lokasi='$kode_lokasi'
        $this->filter
        order by x.kode_pp,x.nim,x.tahunaka
        ";
		// echo $sql;
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pyt",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1070'>
        <tr align='center' bgcolor='#CCCCCC'>
            <td width='20' class='header_laporan'>No</td>
            <td width='100' class='header_laporan'>NIM</td>
            <td width='200' class='header_laporan'>Nama</td>
            <td width='250' class='header_laporan'>Jurusan</td>
            <td width='100' class='header_laporan'>Tahun Akademik</td>
            <td width='100' class='header_laporan'>No Inv</td>
            <td width='100' class='header_laporan'>parameter</td>
            <td width='100' class='header_laporan'>Nilai Tagihan</td>
            <td width='100' class='header_laporan'>Nilai PYT</td>
            <td width='100' class='header_laporan'>Saldo PYT</td>
        </tr>";
		$bill=0;$rekom=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bill+=$row->bill; 
			$rekon+=$row->rekon; 
			$saldo+=$row->saldo; 
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->nim</td>
            <td class='isi_laporan'>$row->nama</td>
            <td class='isi_laporan'>$row->kode_jur - $row->nama_jur</td>
            <td class='isi_laporan'>$row->tahunaka</td>
            <td class='isi_laporan'>$row->kode_produk</td>
            <td class='isi_laporan'>$row->no_inv</td>
            <td class='isi_laporan' align='right'>".number_format($row->bill,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->rekon,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
            </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='isi_laporan' align='center' colspan='7'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($bill,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($rekon,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
