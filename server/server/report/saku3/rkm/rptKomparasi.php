<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rkm_rptKomparasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$filter3=$tmp[2];
			
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		$sql=" select a.kode_akun,a.kode_pp,a.kode_ip,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_ip, 
					isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.agg_total,0) as agg_total,
					isnull(f.n1,0)+isnull(g.n1,0) as n1,isnull(f.n2,0)+isnull(g.n2,0) as n2,isnull(f.n3,0)+isnull(g.n3,0) as n3,isnull(f.n4,0)+isnull(g.n4,0) as n4,
					d.kode_pu,h.nama as nama_pu,h.kode_ss,i.nama as nama_ss,
					isnull(f.nt,0)+isnull(g.nt,0) as nt
				from (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
					from rkm_target_d x
					inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
					inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					$this->filter
					group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip) a 
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join rkm_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				inner join rkm_ip d on a.kode_ip=d.kode_ip and a.kode_lokasi=d.kode_lokasi 
				left join rkm_pu h on d.kode_pu=h.kode_pu and d.kode_lokasi=h.kode_lokasi and c.kode_bidang=h.kode_bidang
				left join rkm_ss i on h.kode_ss=i.kode_ss and h.kode_lokasi=i.kode_lokasi and i.tahun='$tahun'
			    left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip, 
					sum(case when substring(x.periode,5,2) between '01' and '03' then nilai else 0 end ) as agg_tw1 , 
					sum(case when substring(x.periode,5,2) between '04' and '06' then nilai else 0 end ) as agg_tw2 ,
					sum(case when substring(x.periode,5,2) between '07' and '09' then nilai else 0 end ) as agg_tw3 , 
					sum(case when substring(x.periode,5,2) between '10' and '12' then nilai else 0 end ) as agg_tw4 ,
					sum(case when substring(x.periode,5,2) between '01' and '12' then nilai else 0 end ) as agg_total
					from rkm_target_d x 
					inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi 
					inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					$this->filter
					group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
					) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_ip=e.kode_ip and a.kode_lokasi=e.kode_lokasi 
				left join (select x.kode_lokasi,x.kode_akun ,x.kode_drk,
					SUM(case when substring(x.periode,5,2) between '01' and '03' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n1, 
					SUM(case when substring(x.periode,5,2) between '04' and '06' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n2, 
					SUM(case when substring(x.periode,5,2) between '07' and '09' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n3, 
					SUM(case when substring(x.periode,5,2) between '10' and '12' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n4,
					SUM(case when substring(x.periode,5,2) between '01' and '12' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as nt 					
					from gldt x
					inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi  
					inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					$filter3
					group by x.kode_lokasi,x.kode_akun,x.kode_drk
					) f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and a.kode_ip=f.kode_drk
				left join (select x.kode_lokasi,x.kode_akun ,x.kode_drk,
					SUM(case when substring(x.periode,5,2) between '01' and '03' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n1, 
					SUM(case when substring(x.periode,5,2) between '04' and '06' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n2, 
					SUM(case when substring(x.periode,5,2) between '07' and '09' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n3, 
					SUM(case when substring(x.periode,5,2) between '10' and '12' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as n4,
					SUM(case when substring(x.periode,5,2) between '01' and '12' then (case when x.dc='D' then x.nilai else -x.nilai end ) else 0 end) as nt 
					from gldt_h x 
					inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi  
					inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
					$filter3
					group by x.kode_lokasi,x.kode_akun,x.kode_drk
					) g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi and a.kode_ip=g.kode_drk
				order by a.kode_akun,a.kode_pp,a.kode_ip ";
		
		$rs = $dbLib->execute($sql);	
	
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"PERIODE ".$tahun);
		echo "<table width='1600' border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
<tr bgcolor='#CCCCCC'>
	<td width='25' height='25'  class='header_laporan' align='center' rowspan='2'>No</div></td>
	<td width='60' class='header_laporan' align='center' rowspan='2'>Kode Akun </div></td>
	<td width='150' class='header_laporan' align='center' rowspan='2'>Nama Akun</div></td>
	<td width='50' class='header_laporan' align='center' rowspan='2'>Kode PP</div></td>
	<td width='150' class='header_laporan' align='center' rowspan='2'>Nama PP</div></td>
	<td width='50' class='header_laporan' align='center' rowspan='2'>Kode Tujuan Strategis</div></td>
	<td width='150' class='header_laporan' align='center' rowspan='2'>Nama Tujuan Strategis</div></td>
	<td width='50'  class='header_laporan' align='center' rowspan='2'>Kode Sasaran Strategis</div></td>
    <td width='150' class='header_laporan' align='center' rowspan='2'>Nama Sasaran Strategis</div></td>
    <td width='70'  class='header_laporan' align='center' rowspan='2'>Kode IP</div></td>
    <td width='190' class='header_laporan' align='center' rowspan='2'>Nama IP </div></td>
	<td width='90' class='header_laporan' colspan='4'><div align='center'>Evaluasi  </div></td>
    <td width='90' class='header_laporan' colspan='5'><div align='center'>Target  </div></td>
    <td width='90' class='header_laporan' colspan='5'><div align='center'>Realisasi  </div></td>
  </tr>";
  echo
	 "<tr bgcolor='#CCCCCC'>
	 <td width='80' align='center' class='header_laporan'>Triwulan I</td>
	<td width='80' align='center' class='header_laporan'>Triwulan II</td>
    <td width='80' align='center' class='header_laporan'>Triwulan III</td>
	<td width='80' align='center' class='header_laporan'>Triwulan IV</td>
    <td width='80' align='center' class='header_laporan'>Triwulan I</td>
	<td width='80' align='center' class='header_laporan'>Triwulan II</td>
    <td width='80' align='center' class='header_laporan'>Triwulan III</td>
	<td width='80' align='center' class='header_laporan'>Triwulan IV</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>Triwulan I</td>
	<td width='80' align='center' class='header_laporan'>Triwulan II</td>
    <td width='80' align='center' class='header_laporan'>Triwulan III</td>
	<td width='80' align='center' class='header_laporan'>Triwulan IV</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
    </tr>";
		$i=$start+1;
		$agg_tw1=0;$agg_tw2=0;$agg_tw3=0;$agg_tw4=0;$agg_total=0;
		$n1=0; $n2=0; $n3=0; $n4=0; $ntot=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$ntot=$ntot+$row->n1+$row->n2+$row->n3+$row->n4;
			$agg_tw1+=$row->agg_tw1;
			$agg_tw2+=$row->agg_tw2;
			$agg_tw3+=$row->agg_tw3;
			$agg_tw4+=$row->agg_tw4;
			$agg_total+=$row->agg_tw1+$row->agg_tw2+$row->agg_tw3+$row->agg_tw4;
			$ltw1= $path ."image/red.png";
			$ltw2= $path ."image/red.png";
			$ltw3= $path ."image/red.png";
			$ltw4= $path ."image/red.png";
			if ($row->agg_tw1!=0 && $row->n1!=0)
			{
				$ltw1= $path ."image/green.png";
			}
			if ($row->agg_tw2!=0 && $row->n2!=0)
			{
				$ltw2= $path ."image/green.png";
			}
			if ($row->agg_tw3!=0 && $row->n3!=0)
			{
				$ltw3= $path ."image/green.png";
			}
			if ($row->agg_tw4!=0 && $row->n4!=0)
			{
				$ltw4= $path ."image/green.png";
			}
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
   <td  class='isi_laporan'>$row->kode_ss</td>
  <td class='isi_laporan'>$row->nama_ss</td>
  <td  class='isi_laporan'>$row->kode_pu</td>
  <td class='isi_laporan'>$row->nama_pu</td>
   <td  class='isi_laporan'>$row->kode_ip</td>
  <td class='isi_laporan'>$row->nama_ip</td>
  <td class='isi_laporan' align='center'><img src=$ltw1  /></td>
  <td class='isi_laporan' align='center'><img src=$ltw2  /></td>
  <td class='isi_laporan' align='center'><img src=$ltw3  /></td>
  <td class='isi_laporan' align='center'><img src=$ltw4  /></td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_total,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1+$row->n2+$row->n3+$row->n4,0,',','.')."</td>
  
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
     <td height='23' colspan='15' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw4,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($agg_total,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($ntot,0,',','.')."</td>
	
	
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

