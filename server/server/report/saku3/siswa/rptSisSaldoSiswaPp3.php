<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisSaldoSiswaPp3 extends server_report_basic
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
		$periode=$tmp[1];
		$periode_rekon=$periode;
		$kode_pp=$tmp[2];
        $jenis=$tmp[3];
        $range=$tmp[4];
        $range_rekon=$range;
    // echo $range;
    $nama_file="pp.xls";
    $tahun = substr($periode_rekon,0,4);
    $periode_awal = $tahun."01";
    $tahunSeb = intval($tahun)-1;
    $bulan = substr($periode_rekon,4,2);
    $bulanSeb = intval($bulan)-1;
    if(strlen($bulanSeb) == 1){
        $bulanSeb = "0".$bulanSeb;
    }else{
        $bulanSeb = $bulanSeb;
    }
    if(intval($bulan) == 1){
        $bulanSeb = 12;
        $thnblnseb = $tahunSeb.$bulanSeb;
    }else{
        $thnblnseb = $tahun.$bulanSeb;
    }

    // if($range_rekon == "<="){
        // $filter_rekon =  " and (x.periode <= '".$periode_rekon."') ";
    // }else{
    //     $filter_rekon =  " and (x.periode = '".$periode_rekon."') ";
    // }
    $filter_rekon =  " and (x.periode between '$periode_awal' and '".$periode_rekon."') ";

    if($range == "="){
        $filter_1 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode_awal') "; //filter saldo awal
        // $filter_2 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode')  "; //filter tagihan berjalan
        
        $filter_2 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode between '$periode_awal' and '$periode')  "; //filter tagihan berjalan
        // $filter_3 = " where(x.kode_lokasi = '$kode_lokasi')and (x.periode_bill between '".$tahun."01' and '".$thnblnseb."') $filter_rekon "; //filter bayar bulan sebelum
        $filter_3 = " where(x.kode_lokasi = 'xx') "; // biar ga muncul
        $filter_4 = " where(x.kode_lokasi = '$kode_lokasi')and (x.periode_bill <= '".$tahunSeb."12') $filter_rekon "; //filter tahun sebelum
        // $filter_5 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode_bill ='$periode') $filter_rekon  "; // filter bayar berjalan
        $filter_5 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode_bill between '$periode_awal' and '$periode') $filter_rekon  "; // filter bayar berjalan
        $filter_6 = "where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode_awal')";
    }else if($range == "<="){
        $filter_1 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '".$tahunSeb."12')  "; // saldo sampai 201912 ( tahun sebelum)
        $filter_2 = " where(x.kode_lokasi = '$kode_lokasi')and(x.periode between '".$tahun."01' and '$periode' )  ";
        $filter_3 = " where(x.kode_lokasi = 'xx') "; // biar ga muncul
        $filter_4 = " where(x.kode_lokasi = '$kode_lokasi')and (x.periode_bill <= '".$tahunSeb."12') $filter_rekon ";
        $filter_5 = " where(x.kode_lokasi = '$kode_lokasi')and (x.periode_bill between '".$tahun."01' and '$periode' ) $filter_rekon  ";
        $filter_6 = "where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '".$tahunSeb."12')";
    }
    // echo $periode;
    // echo $filter_1."<br>";
    // echo $filter_2."<br>";
    // echo $filter_3."<br>";
    // echo $filter_4."<br>";
    // echo $filter_5."<br>";
    // echo $filter_6."<br>";
		
		$sql="select a.kode_lokasi,a.kode_pp,a.nama ,
        isnull(b.n1,0)-isnull(d.n1,0) as saw_n1, 
        isnull(b.n2,0)-isnull(d.n2,0) as saw_n2,
        isnull(b.n3,0)-isnull(d.n3,0) as saw_n3, 
        isnull(b.total,0)-isnull(d.total,0) as saw_total , 
        isnull(c.n1,0) as debet_n1, 
        isnull(c.n2,0) as debet_n2, 
        isnull(c.n3,0) as debet_n3, 
        isnull(c.total,0) as debet_total , 
        isnull(e.n1,0) as kredit_n1, 
        isnull(e.n2,0) as kredit_n2, 
        isnull(e.n3,0) as kredit_n3, 
        isnull(e.total,0) as kredit_total , 
        isnull(sb.n1,0) as kredit_sb1, 
        isnull(sb.n2,0) as kredit_sb2, 
        isnull(sb.n3,0) as kredit_sb3, 
        isnull(sb.total,0) as kredit_sb , 
        isnull(tb.n1,0) as kredit_tb1, 
        isnull(tb.n2,0) as kredit_tb2, 
        isnull(tb.n3,0) as kredit_tb3, 
        isnull(tb.total,0) as kredit_tb , 
        isnull(b.n1,0)-isnull(d.n1,0)+isnull(c.n1,0)-(isnull(e.n1,0)+isnull(sb.n1,0)+isnull(tb.n1,0)) as sak_n1 , 
        isnull(b.n2,0)-isnull(d.n2,0)+isnull(c.n2,0)-(isnull(e.n2,0)+isnull(sb.n2,0)+isnull(tb.n2,0)) as sak_n2 , 
        isnull(b.n3,0)-isnull(d.n3,0)+isnull(c.n3,0)-(isnull(e.n3,0)+isnull(sb.n3,0)+isnull(tb.n3,0)) as sak_n3 , 
        isnull(b.total,0)-isnull(d.total,0)-isnull(sb.total,0)-isnull(tb.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,
        p.periode as per_dsp, q.periode as per_spp, r.periode as per_lain 
        from pp a 
        inner join (select kode_pp,kode_lokasi 
                    from sis_kelas where kode_lokasi = '$kode_lokasi' 
                    group by kode_pp,kode_lokasi )f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi 
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_bill_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_1
                    group by y.kode_lokasi,y.kode_pp )b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_bill_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_2
                    group by y.kode_lokasi,y.kode_pp )c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_rekon_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_3
                    group by y.kode_lokasi,y.kode_pp )sb on a.kode_lokasi=sb.kode_lokasi and a.kode_pp=sb.kode_pp
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_rekon_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_4
                    group by y.kode_lokasi,y.kode_pp )tb on a.kode_lokasi=tb.kode_lokasi and a.kode_pp=tb.kode_pp 
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_rekon_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_5
                    group by y.kode_lokasi,y.kode_pp )e on a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp 
        left join (select y.kode_lokasi,y.kode_pp, 
                    sum(case when x.kode_param in ('DSP','DSP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                    sum(case when x.kode_param in ('SPP','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n2, 
                    sum(case when x.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n3, 
                    sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
                    from sis_rekon_d x 
                    inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
                    $filter_6 
                    group by y.kode_lokasi,y.kode_pp )d on a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp 
        left join (select a.kode_pp,a.kode_lokasi,max(a.periode) as periode
                    from sis_bill_d a
                    where a.kode_lokasi='$kode_lokasi' and a.kode_param in ('DSP','DSP_TK')
                    group by a.kode_pp,a.kode_lokasi) p on a.kode_lokasi=p.kode_lokasi and a.kode_pp=p.kode_pp
        left join (select a.kode_pp, a.kode_lokasi,max(a.periode) as periode
                    from sis_bill_d a
                    where a.kode_lokasi='$kode_lokasi' and a.kode_param in ('SPP','SPP_TK')
                    group by a.kode_pp,a.kode_lokasi) q on a.kode_lokasi=q.kode_lokasi and a.kode_pp=q.kode_pp
        left join (select a.kode_pp,a.kode_lokasi, max(a.periode) as periode
                    from sis_bill_d a
                    where a.kode_lokasi='$kode_lokasi' and a.kode_param not in ('DSP','SPP','DSP_TK','SPP_TK')
                    group by a.kode_pp,a.kode_lokasi) r on a.kode_lokasi=r.kode_lokasi and a.kode_pp=r.kode_pp
$this->filter
order by a.kode_pp
 ";

//  echo $sql;
	
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN CCR ",$this->lokasi,"s.d. BULAN ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='3' class='header_laporan'>No</td>
	<td width='200' rowspan='3' class='header_laporan'>Nama Sekolah</td>
    <td width='60' rowspan='3' class='header_laporan'>Kode PP</td>
    <td colspan='4' rowspan='2' class='header_laporan'>Saldo Awal </td>
    <td colspan='4' rowspan='2' class='header_laporan'>Tagihan Bulan Berjalan</td>
    <td colspan='12' class='header_laporan'>Pembayaran</td>
    <td colspan='4' rowspan='2' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td colspan='4' class='header_laporan'>Bulan Berjalan </td>
    <td colspan='4' class='header_laporan'>Bulan Sebelumnya</td>
    <td colspan='4' class='header_laporan'>Tahun Sebelumnya</td>
    </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
     <td width='80' align='center' class='header_laporan'>DPP</td>
    <td width='80' align='center' class='header_laporan'>SPP</td>
    <td width='80' align='center' class='header_laporan'>Lainnya</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>DPP</td>
   <td width='80' align='center' class='header_laporan'>SPP</td>
   <td width='80' align='center' class='header_laporan'>Lainnya</td>
   <td width='80' align='center' class='header_laporan'>Total</td>
   <td width='80' align='center' class='header_laporan'>DPP</td>
  <td width='80' align='center' class='header_laporan'>SPP</td>
  <td width='80' align='center' class='header_laporan'>Lainnya</td>
  <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>";
		$saw_n1=0;$saw_n2=0;$saw_n3=0;$saw_total=0;
		$sak_n1=0;$sak_n2=0;$sak_n3=0;$sak_total=0;
		$debet_n1=0;$debet_n2=0;$debet_n3=0;$debet_total=0;
        $kredit_n1=0;$kredit_n2=0;$kredit_n3=0;$kredit_total=0;
        $kredit_sb1=0;$kredit_sb2=0;$kredit_sb3=0;$kredit_sb=0;
        $kredit_tb1=0;$kredit_tb2=0;$kredit_tb3=0;$kredit_tb=0;
		$sak_bpp=0;$sak_sdp2=0;$sak_up3=0;$sak_total=0;$sak_sks=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$saw_n1+=$row->saw_n1;$saw_n2+=$row->saw_n2; $saw_n3+=$row->saw_n3; $saw_total+=$row->saw_total;
			$debet_n1+=$row->debet_n1; $debet_n2+=$row->debet_n2; $debet_n3+=$row->debet_n3; $debet_total+=$row->debet_total;
			$kredit_n1+=$row->kredit_n1; $kredit_n2+=$row->kredit_n2; $kredit_n3+=$row->kredit_n3; $kredit_total+=$row->kredit_total;
			$kredit_sb1+=$row->kredit_sb1; $kredit_sb2+=$row->kredit_sb2; $kredit_sb3+=$row->kredit_sb3; $kredit_sb+=$row->kredit_sb;
			$kredit_tb1+=$row->kredit_tb1; $kredit_tb2+=$row->kredit_tb2; $kredit_tb3+=$row->kredit_tb3; $kredit_tb+=$row->kredit_tb;
            $sak_n1+=$row->sak_n1; $sak_n2+=$row->sak_n2; $sak_n3+=$row->sak_n3; $sak_total+=$row->sak_total;
            
            // if($row->saw_n1 == 0){
            //     $per_dsp = "";
            // }else{
            //     $per_dsp = "($row->per_dsp)";
            // }
            
            // if($row->saw_n2 == 0){
            //     $per_spp = "";
            // }else{
            //     $per_spp = "($row->per_spp)";
            // }

            // if($row->saw_n3 == 0){
            //     $per_lain = "";
            // }else{
            //     $per_lain = "($row->per_lain)";
            // }

			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_pp','$row->kode_lokasi');\">$row->kode_pp</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_n1,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_n2,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_n3,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->saw_total,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_total,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sb1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sb2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sb3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_sb,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_tb1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_tb2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_tb3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit_tb,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_n3,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->sak_total,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
   <td class='header_laporan' align='center' colspan='3'>Total</td>
    <td class='header_laporan' align='right'>".number_format($saw_n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($saw_n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($saw_n3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($saw_total,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($debet_n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($debet_n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($debet_n3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($debet_total,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_n3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_total,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_sb1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_sb2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_sb3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_sb,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_tb1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_tb2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_tb3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($kredit_tb,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sak_n1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sak_n2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sak_n3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($sak_total,0,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
