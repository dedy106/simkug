<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisBeaLemdikti extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$nik_user=$tmp[2];
        $sqlex = "exec dbo.sp_tulapbea '$kode_lokasi','$tahun','$nik_user';";
        $rsex = $dbLib->execute($sqlex);

		$sql=" 
        select a.kode_lokasi,a.nama,a.tahun,isnull(b.qty1,0) as qty1,isnull(b.real1,0) as real1,isnull(b.qty2,0) as qty2,isnull(b.real2,0) as real2,
        isnull(b.real1,0) + isnull(b.real2,0) as total1, isnull(c.qty3,0) as qty3,isnull(c.real3,0) as real3,isnull(b.real1,0) + isnull(b.real2,0)+isnull(c.real3,0) as total2
        from (
            select a.kode_lokasi,a.nama, b.tahun 
            from lokasi a
            inner join tu_lap_bea b on a.kode_lokasi=b.kode_lokasi
            group by a.kode_lokasi,a.nama, b.tahun 
        ) a
        left join ( select a.tahun, a.kode_lokasi,
                    sum(case when substring(a.periode_lap,5,2) between '01' and '07' then a.jml_nim else 0 end) as qty1,
                    sum(case when substring(a.periode_lap,5,2) between '08' and '12' then a.jml_nim else 0 end) as qty2,
                    sum(case when substring(a.periode_lap,5,2) between '01' and '07' then a.nilai else 0 end) as real1,
                    sum(case when substring(a.periode_lap,5,2) between '08' and '12' then a.nilai else 0 end) as real2
                    from tu_lap_bea a
                    where a.status ='MALA'
                    group by a.tahun,a.kode_lokasi
                ) b on a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
        left join ( select a.tahun, a.kode_lokasi,
                    sum(a.jml_nim) as qty3,
                    sum(a.nilai) as real3
                    from tu_lap_bea a
                    where a.status ='MABA'
                    group by a.tahun,a.kode_lokasi
                ) c on a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
        $this->filter
        order by a.tahun
        ";
		// echo $sql;
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Serapan Beasiswa Lemdikti YPT",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1120'>
        <tr align='center' bgcolor='#CCCCCC'>
            <td width='20' class='header_laporan' rowspan='3'>No</td>
            <td width='100' class='header_laporan' rowspan='3'>LEMDIKTI</td>
            <td width='100' class='header_laporan' rowspan='3'>Tahun</td>
            <td width='400' class='header_laporan' colspan='4'>Mahasiswa Eksisting</td>
            <td width='100' class='header_laporan' rowspan='3'>Total (Mala)</td>
            <td width='200' class='header_laporan' colspan='2'>Mahasiswa Baru</td>
            <td width='100' class='header_laporan' rowspan='3'>TOTAL (Mala+Maba)</td>
        </tr>
        <tr align='center' bgcolor='#CCCCCC'>
            <td class='header_laporan' colspan='2'>Realisasi Jan-Juli</td>
            <td class='header_laporan' colspan='2'>Realisasi Agus-Des</td>
            <td class='header_laporan' colspan='2'>Terserap</td>
        </tr>
        <tr align='center' bgcolor='#CCCCCC'>
            <td class='header_laporan' >QTY</td>
            <td class='header_laporan' >REALISASI</td>
            <td class='header_laporan' >QTY</td>
            <td class='header_laporan' >REALISASI</td>
            <td class='header_laporan' >QTY</td>
            <td class='header_laporan' >REALISASI</td>
        </tr>";
		$qty1=0;$qty2=0;$qty3=0;
		$real1=0;$real2=0;$real3=0;
		$total1=0;$total2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$qty1+=$row->qty1; 
			$qty2+=$row->qty2; 
			$qty3+=$row->qty3; 
			$real1+=$row->real1; 
			$real2+=$row->real2; 
			$real3+=$row->real3; 
			$total1+=$row->total1; 
			$total2+=$row->total2; 
			echo "<tr>
            <td class='isi_laporan' align='center'>$i</td>
            <td class='isi_laporan'>$row->nama</td>
            <td class='isi_laporan'>$row->tahun</td>
            <td class='isi_laporan' align='right'>".number_format($row->qty1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->qty2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real2,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->total1,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->qty3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->real3,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($row->total2,0,",",".")."</td>
            </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
        <th class='isi_laporan' align='center' colspan='3'>Total</th>
        <th class='isi_laporan' align='right'>".number_format($qty1,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($real1,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($qty2,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($real2,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($qty3,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($real3,0,",",".")."</th>
        <th class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</th>
        </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>