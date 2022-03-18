<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisCcrPp extends server_report_basic
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
		$tahun=substr($periode,0,4);
		$bulan = substr($periode,4,2);
		$periode_awal=$tahun."01";
		$bulanSeb = intval($bulan)-1;
		if(strlen($bulanSeb) == 1){
			$bulanSeb = "0".$bulanSeb;
		}else{
			$bulanSeb = $bulanSeb;
		}
		$periode_rev=$tahun.$bulanSeb;
		
		$nama_file="ccr.xls";
		
		$sql="select a.kode_pp,a.nama,
				   isnull(b.total,0) as tn1,isnull(c.total,0) as tn2,isnull(b.total,0)+isnull(c.total,0) as tn3,
				   isnull(d.total,0) as pn1,isnull(e.total,0) as pn2,isnull(d.total,0)+isnull(e.total,0) as pn3,
				   isnull(f.total,0)-isnull(g.total,0) as piutang, 
				   isnull(h.total,0) as hn1,isnull(i.total,0) as hn2,isnull(h.total,0)+isnull(i.total,0) as hn3
			from pp a
			left join (select x.kode_lokasi,x.kode_pp, 
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_bill_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and (x.periode between '$periode_awal' and '$periode_rev')
						group by x.kode_lokasi,x.kode_pp
					  )b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
			left join (select x.kode_lokasi,x.kode_pp,
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_bill_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and x.periode='$periode'
						group by x.kode_lokasi,x.kode_pp
					   )c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
			left join (select x.kode_lokasi,x.kode_pp, 
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_rekon_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and (x.periode between '$periode_awal' and '$periode') and (x.periode_bill between '$periode_awal' and '$periode_rev') ";
						// $sql.="
						// and (x.periode between '$periode_awal' and '$periode_rev') and (x.periode_bill between '$periode_awal' and '$periode') ";
						$sql.="
						group by x.kode_lokasi,x.kode_pp
					   )d on a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
			left join (select x.kode_lokasi,x.kode_pp,
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_rekon_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and x.periode='$periode' and x.periode_bill = '$periode' ";
			// $sql.=" and (x.periode_bill between '$periode_awal' and '$periode')  ";
			$sql.="
						group by x.kode_lokasi,x.kode_pp
					   )e on a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
			left join (select x.kode_lokasi,x.kode_pp,
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_bill_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and x.periode<'$periode_awal'
						group by x.kode_lokasi,x.kode_pp
					   )f on a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
			left join (select x.kode_lokasi,x.kode_pp, 
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_rekon_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and x.periode<'$periode_awal' 
						group by x.kode_lokasi,x.kode_pp
					   )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
			left join (select x.kode_lokasi,x.kode_pp, 
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_rekon_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and (x.periode between '$periode_awal' and '$periode_rev') and (x.periode_bill<'$periode_awal') 
						group by x.kode_lokasi,x.kode_pp
					   )h on a.kode_lokasi=h.kode_lokasi and a.kode_pp=h.kode_pp
			left join (select x.kode_lokasi,x.kode_pp,
							   sum(case when x.dc='D' then x.nilai else -x.nilai end) as total 
						from sis_rekon_d x 
						inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
						where x.kode_lokasi='$kode_lokasi' and x.periode='$periode' and (x.periode_bill<'$periode_awal') 
						group by x.kode_lokasi,x.kode_pp
					   )i on a.kode_lokasi=i.kode_lokasi and a.kode_pp=i.kode_pp
			$this->filter and a.kode_bidang in ('1','2','3','4','5')
			order by a.kode_pp";

		//echo $sql;
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
		$nama_bulan=$AddOnLib->ubah_periode($periode);
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN CCR ",$this->lokasi,"s.d. BULAN ".$nama_bulan);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table width='1600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td rowspan='3' class='header_laporan'>No</td>
    <td rowspan='3' class='header_laporan'>LEMDIKDASMEN</td>
    <td rowspan='3' class='header_laporan'>Piutang</td>
    <td colspan='6' class='header_laporan'>Periode Tahun Sebelumnya</td>
    <td colspan='9' class='header_laporan'>Periode Tahun berjalan ($nama_bulan)</td>
    <td rowspan='3' class='header_laporan'>CCR Total</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td colspan='3' class='header_laporan'>Pembayaran</td>
    <td colspan='3' class='header_laporan'>CCR</td>
    <td colspan='3' class='header_laporan'>Tagihan</td>
    <td colspan='3' class='header_laporan'>Pembayaran</td>
    <td colspan='3' class='header_laporan'>CCR</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>Bulan Sebelumnya </td>
    <td align='center' class='header_laporan'>Bulan Berjalan</td>
    <td align='center' class='header_laporan'>YTM</td>
    <td align='center' class='header_laporan'>Bulan Sebelumnya </td>
    <td align='center' class='header_laporan'>Bulan Berjalan</td>
    <td align='center' class='header_laporan'>YTM</td>
    <td align='center' class='header_laporan'>Bulan Sebelumnya </td>
    <td align='center' class='header_laporan'>Bulan Berjalan</td>
    <td align='center' class='header_laporan'>YTM</td>
    <td align='center' class='header_laporan'>Bulan Sebelumnya </td>
    <td align='center' class='header_laporan'>Bulan Berjalan</td>
    <td align='center' class='header_laporan'>YTM</td>
    <td align='center' class='header_laporan'>Bulan Sebelumnya </td>
    <td align='center' class='header_laporan'>Bulan Berjalan</td>
    <td align='center' class='header_laporan'>YTM</td>
  </tr>
  
";
		$tn1=0;$tn2=0;$tn3=0;
		$pn1=0;$pn2=0;$pn3=0;
		$hn1=0;$hn2=0;$hn3=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tn1+=$row->tn1; $tn2+=$row->tn2; $tn3+=$row->tn3;
			$pn1+=$row->pn1; $pn2+=$row->pn2; $pn3+=$row->pn3;
			$hn1+=$row->hn1; $hn2+=$row->hn2; $hn3+=$row->hn3;
			$piutang+=$row->piutang;
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;$persen5=0;$persen6=0;$persen7=0;
			if ($row->tn1!=0)
			{
				$persen1=($row->pn1/$row->tn1)*100;
			}
			if ($row->tn2!=0)
			{
				$persen2=($row->pn2/$row->tn2)*100;
			}
			if ($row->tn3!=0)
			{
				$persen3=($row->pn3/$row->tn3)*100;
			}
			if ($row->piutang+$row->tn3 !=0)
			{
				$persen4=(($row->pn3+$row->hn3)/($row->piutang+$row->tn3))*100;
			}
			if ($row->piutang!=0)
			{
				$persen5=($row->hn1/$row->piutang)*100;
				$persen6=($row->hn2/$row->piutang)*100;
				$persen7=($row->hn3/$row->piutang)*100;
			}
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->nama</td>
   <td class='isi_laporan' align='right'>".number_format($row->piutang,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->hn1,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->hn2,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->hn3,0,",",".")." </td>
	<td class='isi_laporan' align='center'>".number_format($persen5,2,",",".")."%</td>
    <td class='isi_laporan' align='center'>".number_format($persen6,2,",",".")."%</td>
    <td class='isi_laporan' align='center'>".number_format($persen7,2,",",".")."%</td>
    <td class='isi_laporan' align='right'>".number_format($row->tn1,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->tn2,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->tn3,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->pn1,0,",",".")." </td>
    <td class='isi_laporan' align='right'>".number_format($row->pn2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->pn3,0,",",".")."</td>
    <td class='isi_laporan' align='center'>".number_format($persen1,2,",",".")."%</td>
    <td class='isi_laporan' align='center'>".number_format($persen2,2,",",".")."%</td>
    <td class='isi_laporan' align='center'>".number_format($persen3,2,",",".")."%</td>
    <td class='isi_laporan' align='center'>".number_format($persen4,2,",",".")."%</td>
  </tr>";	 
			$i=$i+1;
		}
		
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;$persen5=0;$persen6=0;$persen7=0;
			if ($tn1!=0)
			{
				$persen1=($pn1/$tn1)*100;
			}
			if ($tn2!=0)
			{
				$persen2=($pn2/$tn2)*100;
			}
			if ($tn3!=0)
			{
				$persen3=($pn3/$tn3)*100;
			}
			if ($piutang+$tn3 !=0)
			{
				$persen4=(($pn3+$hn3)/($piutang+$tn3))*100;
			}
			if ($piutang!=0)
			{
				$persen5=($hn1/$piutang)*100;
				$persen6=($hn2/$piutang)*100;
				$persen7=($hn3/$piutang)*100;
			}
			
		echo "<tr>
   <td class='header_laporan' align='center' colspan='2'>Total</td>
    <td class='header_laporan' align='right'>".number_format($piutang,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($hn1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($hn2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($hn3,0,",",".")."</td>
	<td class='header_laporan' align='center' >".number_format($persen5,2,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen6,2,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen7,2,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($tn1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($tn2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($tn3,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pn1,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pn2,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($pn3,0,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen1,2,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen2,2,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen3,2,",",".")."</td>
    <td class='header_laporan' align='center'>".number_format($persen4,2,",",".")."</td>
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
