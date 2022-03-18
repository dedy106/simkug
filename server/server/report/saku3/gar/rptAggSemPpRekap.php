<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggSemPpRekap extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$sql=" select 1";
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
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select a.kode_pp,c.nama as nama_pp,
         isnull(e.n1,0) as n1,isnull(e.n2,0) as n2,isnull(e.total,0) as total 
  from (select x.kode_lokasi,x.kode_pp
        from anggaran_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
        group by x.kode_lokasi,x.kode_pp) a
  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  left join (select x.kode_lokasi,x.kode_pp
	  	              , sum(case when substring(x.periode,5,2) between '01' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as n1
                    , sum(case when substring(x.periode,5,2) between '07' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as n2
	                  , sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
	           from anggaran_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
             group by x.kode_lokasi,x.kode_pp) e on  a.kode_pp=e.kode_pp  and a.kode_lokasi=e.kode_lokasi
order by a.kode_pp ";		
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan' align='center'>No</td>
<td width='50' class='header_laporan' align='center'>Kode PP</td>
<td width='200' class='header_laporan' align='center'>Nama PP</td>
    <td width='90' class='header_laporan' align='center'>Semester I  </td>
    <td width='90' class='header_laporan' align='center'>Semester II </td>
    <td width='100' class='header_laporan' align='center'>Total</td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='3' align='right'  class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

