<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_ppbs_rptAggUsul extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$tahun=$tmp[0];
		
		$sql="select a.no_usul,a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,a.tahun,a.keterangan 
from agg_usul_m a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join agg_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun' 
$this->filter
order by a.no_usul";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("usulan anggaran",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='34' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan' width='114'>No Bukti</td>
        <td class='header_laporan'>:&nbsp;$row->no_usul</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Keteragan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan' width='114'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Akun</td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>
      
        <tr>
          <td class='header_laporan'>DRK</td>
          <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
        </tr>
        <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='79' align='center' class='header_laporan'>Rincian Kegiatan</td>
    <td width='49' align='center' class='header_laporan'>Tarif</td>
    <td colspan=2 align='center' class='header_laporan'>Januari</td>
    <td colspan=2 align='center' class='header_laporan'>Februari</td>
    <td colspan=2 align='center' class='header_laporan'>Maret</td>
    <td colspan=2 align='center' class='header_laporan'>April</td>
    <td colspan=2 align='center' class='header_laporan'>Mei</td>
    <td colspan=2 align='center' class='header_laporan'>Juni</td>
   	<td colspan=2 align='center' class='header_laporan'>Juli</td>
   	<td colspan=2 align='center' class='header_laporan'>Agustus</td>
   	<td colspan=2 align='center' class='header_laporan'>September</td>
   	<td colspan=2 align='center' class='header_laporan'>Oktober</td>
   	<td colspan=2 align='center' class='header_laporan'>November</td>
   	<td colspan=2 align='center' class='header_laporan'>Desember</td>
   	<td colspan=2 align='center' class='header_laporan'>Total</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td width='40' align='center' class='header_laporan'>Vol</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=80 align='center' class='header_laporan'>Jumlah</td>
    <td width=40 align='center' class='header_laporan'>Vol</td>
    <td width=90 align='center' class='header_laporan'>Jumlah</td>
  </tr>
  ";
			$sql1="
select kode_lokasi,kode_akun,kode_pp,kode_drk,keterangan,sum(tarif)/12 as tarif,
	   sum(case when substring(periode,5,2)='01' then vol else 0 end) as vol01,
	   sum(case when substring(periode,5,2)='01' then total else 0 end) as tot01,
	   sum(case when substring(periode,5,2)='02' then vol else 0 end) as vol02,
	   sum(case when substring(periode,5,2)='02' then total else 0 end) as tot02,
	   sum(case when substring(periode,5,2)='03' then vol else 0 end) as vol03,
	   sum(case when substring(periode,5,2)='03' then total else 0 end) as tot03,
	   sum(case when substring(periode,5,2)='04' then vol else 0 end) as vol04,
	   sum(case when substring(periode,5,2)='04' then total else 0 end) as tot04,
	   sum(case when substring(periode,5,2)='05' then vol else 0 end) as vol05,
	   sum(case when substring(periode,5,2)='05' then total else 0 end) as tot05,
	   sum(case when substring(periode,5,2)='06' then vol else 0 end) as vol06,
	   sum(case when substring(periode,5,2)='06' then total else 0 end) as tot06,
	   sum(case when substring(periode,5,2)='07' then vol else 0 end) as vol07,
	   sum(case when substring(periode,5,2)='07' then total else 0 end) as tot07,
	   sum(case when substring(periode,5,2)='08' then vol else 0 end) as vol08,
	   sum(case when substring(periode,5,2)='08' then total else 0 end) as tot08,
	   sum(case when substring(periode,5,2)='09' then vol else 0 end) as vol09,
	   sum(case when substring(periode,5,2)='09' then total else 0 end) as tot09,
	   sum(case when substring(periode,5,2)='10' then vol else 0 end) as vol10,
	   sum(case when substring(periode,5,2)='10' then total else 0 end) as tot10,
	   sum(case when substring(periode,5,2)='11' then vol else 0 end) as vol11,
	   sum(case when substring(periode,5,2)='11' then total else 0 end) as tot11,
	   sum(case when substring(periode,5,2)='12' then vol else 0 end) as vol12,
	   sum(case when substring(periode,5,2)='12' then total else 0 end) as tot12,
	   sum(vol) as vol,sum(total) as total	
from agg_d
where no_bukti='$row->no_usul' and kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$row->tahun' and kode_akun='$row->kode_akun'  and kode_pp='$row->kode_pp' and kode_drk='$row->kode_drk' 
group by kode_lokasi,kode_akun,kode_pp,kode_drk,keterangan ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$vol=0;
			$vol01=0 ; $tot01=0; $vol02=0 ; $tot02=0; $vol03=0 ; $tot03=0; $vol04=0 ; $tot04=0; $vol05=0 ; $tot05=0; $vol06=0 ; $tot06=0;
			$vol07=0 ; $tot07=0; $vol08=0 ; $tot08=0; $vol09=0 ; $tot09=0; $vol10=0 ; $tot10=0; $vol11=0 ; $tot11=0; $vol12=0 ; $tot12=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total=$total+$row1->total;
				$vol=$vol+$row1->vol;
				$vol01=$vol01+$row1->vol01;
				$tot01=$tot01+$row1->tot01;
				$vol02=$vol02+$row1->vol02;
				$tot02=$tot02+$row1->tot02;
				$vol03=$vol03+$row1->vol03;
				$tot03=$tot03+$row1->tot03;
				$vol04=$vol04+$row1->vol04;
				$tot04=$tot04+$row1->tot04;
				$vol05=$vol05+$row1->vol05;
				$tot05=$tot05+$row1->tot05;
				$vol06=$vol06+$row1->vol06;
				$tot06=$tot06+$row1->tot06;
				$vol07=$vol07+$row1->vol07;
				$tot07=$tot07+$row1->tot07;
				$vol08=$vol08+$row1->vol08;
				$tot08=$tot08+$row1->tot08;
				$vol09=$vol09+$row1->vol09;
				$tot09=$tot09+$row1->tot09;
				$vol10=$vol10+$row1->vol10;
				$tot10=$tot10+$row1->tot10;
				$vol11=$vol11+$row1->vol11;
				$tot11=$tot11+$row1->tot11;
				$vol12=$vol12+$row1->vol12;
				$tot12=$tot12+$row1->tot12;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tarif,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol01,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot01,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->vol02,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot02,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol03,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->tot03,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->vol04,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot04,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol05,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->tot05,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->vol06,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot06,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol07,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->tot07,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->vol08,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot08,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol09,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->tot09,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->vol10,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot10,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol11,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->tot11,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->vol12,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->tot12,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($row1->vol,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
    
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='3' align='center'  class='header_laporan'>Total</td>
	<td align='center' class='isi_laporan'>".number_format($vol01,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot01,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($vol02,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot02,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol03,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($tot03,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($vol04,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot04,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol05,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($tot05,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($vol06,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot06,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol07,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($tot07,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($vol08,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot08,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol09,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($tot09,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($vol10,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot10,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol11,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($tot11,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($vol12,2,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($tot12,0,",",".")."</td>
	<td align='center' class='isi_laporan'>".number_format($vol,2,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($total,0,",",".")."</td>
  </tr></table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
