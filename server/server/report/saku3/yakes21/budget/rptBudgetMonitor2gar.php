<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetMonitor2gar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
		$jenis_file=$tmp[2];
		$nama_file="rra.xls";
    //echo "lokasi:".$kode_lokasi;
    $filter_lokasi="";
    if ($kode_lokasi!="") {
        $filter_lokasi=" and a.kode_lokasi='$kode_lokasi' ";
    }

		$sql="select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
	  isnull(i.rka_ori,0) as rka_ori,isnull(i.rka_ori,0)+isnull(e.mutasi,0) as mutasi,
    
	  isnull(f.rilis_tw1,0) as rilis_tw1,
    isnull(f.rilis_tw2,0) as rilis_tw2,
	  isnull(f.rilis_tw3,0) as rilis_tw3,
    isnull(f.rilis_tw4,0) as rilis_tw4,

	  isnull(g.aktual_b1,0) as aktual_b1,
    isnull(g.aktual_b2,0) as aktual_b2,
	  isnull(g.aktual_b3,0) as aktual_b3,
    isnull(g.aktual_b4,0) as aktual_b4,
    isnull(g.aktual_b5,0) as aktual_b5,
    isnull(g.aktual_b6,0) as aktual_b6,
    isnull(g.aktual_b7,0) as aktual_b7,
    isnull(g.aktual_b8,0) as aktual_b8,
    isnull(g.aktual_b9,0) as aktual_b9,
    isnull(g.aktual_b10,0) as aktual_b10,
    isnull(g.aktual_b11,0) as aktual_b11,
    isnull(g.aktual_b12,0) as aktual_b12,

	  isnull(h.gl_b1,0) as gl_b1,
    isnull(h.gl_b2,0) as gl_b2,
	  isnull(h.gl_b3,0) as gl_b3,
    isnull(h.gl_b4,0) as gl_b4,
    isnull(h.gl_b5,0) as gl_b5,
    isnull(h.gl_b6,0) as gl_b6,
    isnull(h.gl_b7,0) as gl_b7,
    isnull(h.gl_b8,0) as gl_b8,
    isnull(h.gl_b9,0) as gl_b9,
    isnull(h.gl_b10,0) as gl_b10,
    isnull(h.gl_b11,0) as gl_b11,
    isnull(h.gl_b12,0) as gl_b12,

    isnull(j.rrakpaout_tw1,0) as rrakpaout1,
    isnull(j.rrakpaout_tw2,0) as rrakpaout2,
	  isnull(j.rrakpaout_tw3,0) as rrakpaout3,
    isnull(j.rrakpaout_tw4,0) as rrakpaout4,

    isnull(k.rrakpain_tw1,0) as rrakpain1,
    isnull(k.rrakpain_tw2,0) as rrakpain2,
	  isnull(k.rrakpain_tw3,0) as rrakpain3,
    isnull(k.rrakpain_tw4,0) as rrakpain4,  

    isnull(m.rrarilisout_tw1,0) as rrarilisout1,
    isnull(m.rrarilisout_tw2,0) as rrarilisout2,
	  isnull(m.rrarilisout_tw3,0) as rrarilisout3,
    isnull(m.rrarilisout_tw4,0) as rrarilisout4,

    isnull(n.rrarilisin_tw1,0) as rrarilisin1,
    isnull(n.rrarilisin_tw2,0) as rrarilisin2,
	  isnull(n.rrarilisin_tw3,0) as rrarilisin3,
    isnull(n.rrarilisin_tw4,0) as rrarilisin4

from (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode,1,4) as tahun
	 from anggaran_d a
	 where a.modul='ORGI' and substring(a.periode,1,4)='$tahun' $filter_lokasi
	 group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode,1,4)
   union
   select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode1,1,4) as tahun
from angg_r a inner join anggaran_m b on a.no_bukti=b.no_agg 
where substring(a.periode1,1,4)='$tahun' and a.modul='RELEASE' and b.jenis in ('RRLC','RRRMULTI') $filter_lokasi
group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode1,1,4)
      ) a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun' and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
				sum(case a.dc when 'D' then a.nilai else -a.nilai end) as mutasi
		from anggaran_d a 
		inner join rra_pdrk_m b on a.no_agg=b.no_pdrk and b.progress='2'
		where substring(a.periode,1,4)='$tahun' and b.periode <= '202203' $filter_lokasi
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
				sum(case when substring(a.periode1,5,2) between '01' and '03' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as rilis_tw1,
				sum(case when substring(a.periode1,5,2) between '04' and '06' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as rilis_tw2,
				sum(case when substring(a.periode1,5,2) between '07' and '09' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as rilis_tw3,
				sum(case when substring(a.periode1,5,2) between '10' and '12' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as rilis_tw4
		from angg_r a inner join anggaran_m b on a.no_bukti=b.no_agg 
		where substring(a.periode1,1,4)='$tahun' and a.modul = 'RELEASE' and b.jenis in ('RRA','RRLC','RRRMULTI','RELEASE') $filter_lokasi
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp and a.kode_drk=f.kode_drk

left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,

				sum(case when substring(a.periode1,5,2) between '01' and '01' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b1,
        sum(case when substring(a.periode1,5,2) between '02' and '02' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b2,
        sum(case when substring(a.periode1,5,2) between '03' and '03' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b3,

				sum(case when substring(a.periode1,5,2) between '04' and '04' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b4,
        sum(case when substring(a.periode1,5,2) between '05' and '05' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b5,
        sum(case when substring(a.periode1,5,2) between '06' and '06' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b6,

				sum(case when substring(a.periode1,5,2) between '07' and '07' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b7,
        sum(case when substring(a.periode1,5,2) between '08' and '08' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b8,
        sum(case when substring(a.periode1,5,2) between '09' and '09' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b9,

				sum(case when substring(a.periode1,5,2) between '10' and '10' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b10,
        sum(case when substring(a.periode1,5,2) between '11' and '11' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b11,
        sum(case when substring(a.periode1,5,2) between '12' and '15' then (case a.dc when 'C' then a.nilai else -a.nilai end) else 0 end) as aktual_b12

		from angg_r a 
		where substring(a.periode1,1,4)='$tahun' and a.modul not in ('RELEASE','HOLD') $filter_lokasi
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp and a.kode_drk=g.kode_drk

left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
				sum(case when substring(a.periode,5,2) between '01' and '01' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b1,
        sum(case when substring(a.periode,5,2) between '02' and '02' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b2,
        sum(case when substring(a.periode,5,2) between '03' and '03' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b3,

				sum(case when substring(a.periode,5,2) between '04' and '04' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b4,
        sum(case when substring(a.periode,5,2) between '05' and '05' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b5,
        sum(case when substring(a.periode,5,2) between '06' and '06' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b6,

				sum(case when substring(a.periode,5,2) between '07' and '07' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b7,
        sum(case when substring(a.periode,5,2) between '08' and '08' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b8,
        sum(case when substring(a.periode,5,2) between '09' and '09' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b9,

				sum(case when substring(a.periode,5,2) between '10' and '10' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b10,
        sum(case when substring(a.periode,5,2) between '11' and '11' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b11,
        sum(case when substring(a.periode,5,2) between '12' and '15' then (case a.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as gl_b12

		from gldt a  
		where a.modul<>'TTAPP' and substring(a.periode,1,4)='$tahun' $filter_lokasi
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi and a.kode_pp=h.kode_pp and a.kode_drk=h.kode_drk

    left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
				sum(case a.dc when 'D' then a.nilai else -a.nilai end) as rka_ori
		from anggaran_d a 
		where a.modul='ORGI' and substring(a.periode,1,4)='$tahun' $filter_lokasi
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)i on a.kode_akun=i.kode_akun and a.kode_lokasi=i.kode_lokasi and a.kode_pp=i.kode_pp and a.kode_drk=i.kode_drk

    left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
        sum(case when substring(a.periode,5,2) between '01' and '03' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrakpaout_tw1,
        sum(case when substring(a.periode,5,2) between '04' and '06' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrakpaout_tw2,
        sum(case when substring(a.periode,5,2) between '07' and '09' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrakpaout_tw3,
        sum(case when substring(a.periode,5,2) between '10' and '12' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrakpaout_tw4
    from anggaran_d a inner join anggaran_m b on a.no_agg=b.no_agg 
    where substring(a.periode,1,4)='$tahun' and b.jenis in ('RRA') $filter_lokasi
    group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
    )j on a.kode_akun=j.kode_akun and a.kode_lokasi=j.kode_lokasi and a.kode_pp=j.kode_pp and a.kode_drk=j.kode_drk

    left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
        sum(case when substring(a.periode,5,2) between '01' and '03' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrakpain_tw1,
        sum(case when substring(a.periode,5,2) between '04' and '06' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrakpain_tw2,
        sum(case when substring(a.periode,5,2) between '07' and '09' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrakpain_tw3,
        sum(case when substring(a.periode,5,2) between '10' and '12' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrakpain_tw4
    from anggaran_d a inner join anggaran_m b on a.no_agg=b.no_agg 
    where substring(a.periode,1,4)='$tahun' and b.jenis in ('RRA') $filter_lokasi
    group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
    )k on a.kode_akun=k.kode_akun and a.kode_lokasi=k.kode_lokasi and a.kode_pp=k.kode_pp and a.kode_drk=k.kode_drk

    left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
        sum(case when substring(a.periode1,5,2) between '01' and '03' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrarilisout_tw1,
        sum(case when substring(a.periode1,5,2) between '04' and '06' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrarilisout_tw2,
        sum(case when substring(a.periode1,5,2) between '07' and '09' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrarilisout_tw3,
        sum(case when substring(a.periode1,5,2) between '10' and '12' then (case a.dc when 'C' then a.nilai else 0 end) else 0 end) as rrarilisout_tw4
    from angg_r a inner join anggaran_m b on a.no_bukti=b.no_agg 
    where substring(a.periode1,1,4)='$tahun' and a.modul = 'RELEASE' and b.jenis in ('RRLC','RRRMULTI') $filter_lokasi
    group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
    )m on a.kode_akun=m.kode_akun and a.kode_lokasi=m.kode_lokasi and a.kode_pp=m.kode_pp and a.kode_drk=m.kode_drk

    left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
        sum(case when substring(a.periode1,5,2) between '01' and '03' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrarilisin_tw1,
        sum(case when substring(a.periode1,5,2) between '04' and '06' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrarilisin_tw2,
        sum(case when substring(a.periode1,5,2) between '07' and '09' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrarilisin_tw3,
        sum(case when substring(a.periode1,5,2) between '10' and '12' then (case a.dc when 'D' then a.nilai else 0 end) else 0 end) as rrarilisin_tw4
    from angg_r a inner join anggaran_m b on a.no_bukti=b.no_agg 
    where substring(a.periode1,1,4)='$tahun' and a.modul = 'RELEASE' and b.jenis in ('RRLC','RRRMULTI') $filter_lokasi
    group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
    )n on a.kode_akun=n.kode_akun and a.kode_lokasi=n.kode_lokasi and a.kode_pp=n.kode_pp and a.kode_drk=n.kode_drk

    $this->filter 
    order by a.kode_akun,a.kode_pp,a.kode_drk";
    
    //echo $sql;

    if ($jenis_file=="Excel"){
        header("Pragma: public");
        header("Expires: 0");
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");;
        header("Content-Disposition: attachment;filename=$nama_file"); 
        header("Content-Transfer-Encoding: binary ");
      }
    //echo $sql;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan monitoring anggaran",$this->lokasi,$tahun);
    echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='30' height='25'  align='center' class='header_laporan' rowspan='2'>No</td>
      <td width='60' align='center' class='header_laporan' rowspan='2'>Kode Akun </td>
      <td width='200' align='center' class='header_laporan' rowspan='2'>Nama Akun</td>
      <td width='50' align='center' class='header_laporan' rowspan='2'>Kode PP</td>
      <td width='150' align='center' class='header_laporan' rowspan='2'>Nama PP</td>
      <td width='60'  align='center' class='header_laporan' rowspan='2'>Kode DRK</td>
      <td width='150' align='center' class='header_laporan' rowspan='2'>Nama DRK </td>
      <td width='90' align='center' class='header_laporan' rowspan='2'>RKA ORIGINAL</td>
      <td width='90' align='center' class='header_laporan' rowspan='2'>RKA UPDATE</td>
      <td width='90' align='center' class='header_laporan' colspan='4'>RKA RELEASE UPDATE/SUKKA</td>
      <td width='90' align='center' class='header_laporan' colspan='12'>REALISASI [KPA]</td>
      <td width='90' align='center' class='header_laporan' colspan='4'>SALDO RELEASE [KPA]</td>
      <td width='90' align='center' class='header_laporan' rowspan='2'>SALDO RKA UPDATE</td>

      <td width='90' align='center' class='header_laporan' colspan='8'>RRA RKA OUT - IN</td>
      <td width='90' align='center' class='header_laporan' colspan='8'>RRA RELEASE OUT - IN</td>

    </tr>
    <tr bgcolor='#CCCCCC'>
      <td width='90' align='center' class='header_laporan'>TW1</td>
      <td width='90' align='center' class='header_laporan'>TW2</td>
      <td width='90' align='center' class='header_laporan'>TW3</td>
      <td width='90' align='center' class='header_laporan'>TW4</td>

      <td width='90' align='center' class='header_laporan'>JAN</td>
      <td width='90' align='center' class='header_laporan'>FEB</td>
      <td width='90' align='center' class='header_laporan'>MAR</td>
      <td width='90' align='center' class='header_laporan'>APR</td>
      <td width='90' align='center' class='header_laporan'>MEI</td>
      <td width='90' align='center' class='header_laporan'>JUN</td>
      <td width='90' align='center' class='header_laporan'>JUL</td>
      <td width='90' align='center' class='header_laporan'>AGU</td>
      <td width='90' align='center' class='header_laporan'>SEP</td>
      <td width='90' align='center' class='header_laporan'>OKT</td>
      <td width='90' align='center' class='header_laporan'>NOV</td>
      <td width='90' align='center' class='header_laporan'>DES</td>

      <td width='90' align='center' class='header_laporan'>TW1</td>
      <td width='90' align='center' class='header_laporan'>TW2</td>
      <td width='90' align='center' class='header_laporan'>TW3</td>
      <td width='90' align='center' class='header_laporan'>TW4</td>

      <td width='90' align='center' class='header_laporan'>TW1 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW2 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW3 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW4 OUT</td>

      <td width='90' align='center' class='header_laporan'>TW1 IN</td>
      <td width='90' align='center' class='header_laporan'>TW2 IN</td>
      <td width='90' align='center' class='header_laporan'>TW3 IN</td>
      <td width='90' align='center' class='header_laporan'>TW4 IN</td>

      <td width='90' align='center' class='header_laporan'>TW1 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW2 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW3 OUT</td>
      <td width='90' align='center' class='header_laporan'>TW4 OUT</td>

      <td width='90' align='center' class='header_laporan'>TW1 IN</td>
      <td width='90' align='center' class='header_laporan'>TW2 IN</td>
      <td width='90' align='center' class='header_laporan'>TW3 IN</td>
      <td width='90' align='center' class='header_laporan'>TW4 IN</td>

    </tr>";
    $i=1;
		$rka_ori=0;$mutasi=0;$rilis_tw1=0;$rilis_tw2=0;$rilis_tw3=0;$rilis_tw4=0;
    $aktual_b1=0;$aktual_b2=0;$aktual_b3=0;$aktual_b4=0;
    $aktual_b5=0;$aktual_b6=0;$aktual_b7=0;$aktual_b8=0;
    $aktual_b9=0;$aktual_b10=0;$aktual_b11=0;$aktual_b12=0;

    $gl_b1=0;$gl_b2=0;$gl_b3=0;$gl_b4=0;
    $gl_b5=0;$gl_b6=0;$gl_b7=0;$gl_b8=0;
    $gl_b9=0;$gl_b10=0;$gl_b11=0;$gl_b12=0;

    $rrakpaout1=0; $rrakpaout2=0; $rrakpaout3=0; $rrakpaout4=0;
    $rrakpain1=0; $rrakpain2=0; $rrakpain3=0; $rrakpain4=0;

    $rrarilisout1=0; $rrarilisout2=0; $rrarilisout3=0; $rrarilisout4=0;
    $rrarilisin1=0; $rrarilisin2=0; $rrarilisin3=0; $rrarilisin4=0;
    
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$rka_ori+=$row->rka_ori;
      $mutasi+=$row->mutasi;
      $rilis_tw1+=$row->rilis_tw1;
      $rilis_tw2+=$row->rilis_tw2;
      $rilis_tw3+=$row->rilis_tw3;
      $rilis_tw4+=$row->rilis_tw4;
      
      $aktual_b1+=$row->aktual_b1;
      $aktual_b2+=$row->aktual_b2;
      $aktual_b3+=$row->aktual_b3;
      $aktual_b4+=$row->aktual_b4;
      $aktual_b5+=$row->aktual_b5;
      $aktual_b6+=$row->aktual_b6;
      $aktual_b7+=$row->aktual_b7;
      $aktual_b8+=$row->aktual_b8;
      $aktual_b9+=$row->aktual_b9;
      $aktual_b10+=$row->aktual_b10;
      $aktual_b11+=$row->aktual_b11;
      $aktual_b12+=$row->aktual_b12;

      $gl_b1+=$row->gl_b1;
      $gl_b2+=$row->gl_b2;
      $gl_b3+=$row->gl_b3;
      $gl_b4+=$row->gl_b4;
      $gl_b5+=$row->gl_b5;
      $gl_b6+=$row->gl_b6;
      $gl_b7+=$row->gl_b7;
      $gl_b8+=$row->gl_b8;
      $gl_b9+=$row->gl_b9;
      $gl_b10+=$row->gl_b10;
      $gl_b11+=$row->gl_b11;
      $gl_b12+=$row->gl_b12;

      $rrakpaout1+=$row->rrakpaout1; 
      $rrakpaout2+=$row->rrakpaout2; 
      $rrakpaout3+=$row->rrakpaout3; 
      $rrakpaout4+=$row->rrakpaout4;
      
      $rrakpain1+=$row->rrakpain1; 
      $rrakpain2+=$row->rrakpain2; 
      $rrakpain3+=$row->rrakpain3; 
      $rrakpain4+=$row->rrakpain4;

      $rrarilisout1+=$row->rrarilisout1; 
      $rrarilisout2+=$row->rrarilisout2;
      $rrarilisout3+=$row->rrarilisout3; 
      $rrarilisout4+=$row->rrarilisout4;
    
      $rrarilisin1+=$row->rrarilisin1; 
      $rrarilisin2+=$row->rrarilisin2; 
      $rrarilisin3+=$row->rrarilisin3; 
      $rrarilisin4+=$row->rrarilisin4;

			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka_ori,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->mutasi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw4,0,',','.')."</td>
  
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->aktual_b12,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw1-$row->aktual_b1-$row->aktual_b2-$row->aktual_b3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw2-$row->aktual_b4-$row->aktual_b5-$row->aktual_b6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw3-$row->aktual_b7-$row->aktual_b8-$row->aktual_b9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rilis_tw4-$row->aktual_b10-$row->aktual_b11-$row->aktual_b12,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->mutasi-$row->aktual_b1-$row->aktual_b2-$row->aktual_b3-$row->aktual_b4-$row->aktual_b5-$row->aktual_b6-$row->aktual_b7-$row->aktual_b8-$row->aktual_b9-$row->aktual_b10-$row->aktual_b11-$row->aktual_b12,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->rrakpaout1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpaout2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpaout3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpaout4,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->rrakpain1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpain2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpain3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrakpain4,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->rrarilisout1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisout2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisout3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisout4,0,',','.')."</td>

  <td class='isi_laporan' align='right'>".number_format($row->rrarilisin1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisin2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisin3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rrarilisin4,0,',','.')."</td>

</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='7' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($rka_ori,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($mutasi,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw1,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw2,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw3,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw4,0,',','.')."</td>

  <td class='header_laporan' align='right'>".number_format($aktual_b1,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b2,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b3,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b4,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b5,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b6,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b7,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b8,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b9,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b10,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b11,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($aktual_b12,0,',','.')."</td>

  <td class='header_laporan' align='right'>".number_format($rilis_tw1-$aktual_b1-$aktual_b2-$aktual_b3,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw2-$aktual_b4-$aktual_b5-$aktual_b6,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw3-$aktual_b7-$aktual_b8-$aktual_b9,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($rilis_tw4-$aktual_b10-$aktual_b11-$aktual_b12,0,',','.')."</td>
  
  <td class='header_laporan' align='right'>".number_format($mutasi-$aktual_b1-$aktual_b2-$aktual_b3-$aktual_b4-$aktual_b5-$aktual_b6-$aktual_b7-$aktual_b8-$aktual_b9-$aktual_b10-$aktual_b11-$aktual_b12,0,',','.')."</td>


  <td class='header_laporan' align='right'>".number_format($rrakpaout1,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpaout2,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpaout3,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpaout4,0,',','.')."</td>  

  <td class='header_laporan' align='right'>".number_format($rrakpain1,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpain2,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpain3,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrakpain4,0,',','.')."</td>  


  <td class='header_laporan' align='right'>".number_format($rrarilisout1,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisout2,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisout3,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisout4,0,',','.')."</td>  

  <td class='header_laporan' align='right'>".number_format($rrarilisin1,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisin2,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisin3,0,',','.')."</td>  
  <td class='header_laporan' align='right'>".number_format($rrarilisin4,0,',','.')."</td>  
  
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
