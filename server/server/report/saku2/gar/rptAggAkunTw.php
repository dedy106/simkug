<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gar_rptAggAkunTw extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select count(a.akun_konsol)
  from (select c.kode_lokkonsol,c.akun_konsol
        from anggaran_d a
	    inner join konsol_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi $this->filter
		group by c.kode_lokkonsol,c.akun_konsol) a ";
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
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun,kode_pp,kode_drk ";
		$sql=" select b.kode_akun,b.nama as nama_akun,
         isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,isnull(e.total,0) as total
  from (select c.kode_lokkonsol,c.akun_konsol
        from anggaran_d a
	    inner join konsol_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi $this->filter
		group by c.kode_lokkonsol,c.akun_konsol) a
  inner join masakun b on a.akun_konsol=b.kode_akun and a.kode_lokkonsol=b.kode_lokasi
  left join (select c.kode_lokkonsol,c.akun_konsol
	  	              , sum(case when substring(a.periode,5,2) between '01' and '03' then case when dc='D' then a.nilai else -a.nilai end else 0 end ) as agg_01
                    , sum(case when substring(a.periode,5,2) between '04' and '06' then case when dc='D' then a.nilai else -a.nilai end else 0 end ) as agg_02
                    , sum(case when substring(a.periode,5,2) between '07' and '09' then case when dc='D' then a.nilai else -a.nilai end else 0 end ) as agg_03
                    , sum(case when substring(a.periode,5,2) between '10' and '12' then case when dc='D' then a.nilai else -a.nilai end else 0 end ) as agg_04
					, sum(case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then a.nilai else -a.nilai end else 0 end ) as total
            from anggaran_d a
	        inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			inner join konsol_relasi c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi $this->filter
			group by c.kode_lokkonsol,c.akun_konsol) e on a.akun_konsol=e.akun_konsol and a.kode_lokkonsol=e.kode_lokkonsol
			 order by a.akun_konsol ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
   <td width='90' class='header_laporan'><div align='center'>Triwulan 1 </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 2</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 3</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan 4</div></td>
    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
 
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='3' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
		
	}
	
	
}

