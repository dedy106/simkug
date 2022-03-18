<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptInvestasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
	    $sql = "select a.kode_akun,a.nama,ifnull(c.agg_thn,0) agg_thn,ifnull(d.nilai,0) nilai
from masakun a
inner join flag_relasi b on a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun
left join (select x.kode_akun
		  ,sum(case when substring(x.periode,5,2) between '01' and '12' then (case when y.jenis='Pendapatan' then nilai*-1 else nilai end) else 0 end ) as agg_thn
	   from anggaran_d x
	   inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
	   inner join flag_relasi z on x.kode_lokasi=z.kode_lokasi and x.kode_akun=z.kode_akun
	   where x.kode_lokasi='$kode_lokasi' and z.kode_flag='028' and substring(x.periode,1,4)=substring('$periode',1,4)
	   group by x.kode_akun
	   ) c on a.kode_akun=c.kode_akun
left join (select x.kode_akun,sum(case when dc='D' then nilai else -nilai end)nilai
	   from (select y.kode_akun,y.dc,y.nilai 
	         from gldt y
	         inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and y.kode_akun=z.kode_akun
	         where y.periode='$periode' and y.kode_lokasi='$kode_lokasi' and z.kode_flag='028' and substring(y.periode,1,4)=substring('$periode',1,4)
	         union all
	         select y.kode_akun,y.dc,y.nilai 
	         from gldt_h y
	         inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and y.kode_akun=z.kode_akun
	         where y.periode<='$periode' and y.kode_lokasi='$kode_lokasi' and z.kode_flag='028' and substring(y.periode,1,4)=substring('$periode',1,4)
	         ) x
	   group by x.kode_akun
	   ) d on a.kode_akun=d.kode_akun
where b.kode_flag='028' and a.kode_lokasi='$kode_lokasi' order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan investasi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='70'  class='header_laporan' align='center'>Kode Akun</td>
    <td width='250' class='header_laporan' align='center'>Nama Akun</td>
<td width='100' height='25'  class='header_laporan' align='center'>Target</td>
<td width='100' class='header_laporan' align='center'>Realisasi</td>
<td width='80' class='header_laporan' align='center'>% Pencapaian</td>
  </tr>";
		$tot_agg=0;
		$tot_nilai=0;
		$tot_persen=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$agg_thn=number_format($row->agg_thn,0,",",".");
			$nilai=number_format($row->nilai,0,",",".");
			$persen1=0;
			if ($row->agg_thn!=0)
			{
				$persen=($row->nilai/$row->agg_thn)*100;
			}
			$persen1=number_format($persen,2,",",".");
			$tot_agg=$tot_agg+$row->agg_thn;
			$tot_nilai=$tot_nilai+$row->nilai;
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
     <td valign='middle' class='isi_laporan'>$row->nama</td>
    <td height='20' class='isi_laporan' align='right'>$agg_thn</td>
    <td  class='isi_laporan' align='right'>$nilai</td>
	<td  class='isi_laporan' align='right'>$persen1</td>
  </tr>";
			$i=$i+1;
		}
		$tot_persen=0;
		if ($tot_agg!=0)
		{
			$tot_persen=($tot_nilai/$tot_agg)*100;
		}
		echo "<tr>
    <td colspan='2' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td height='25'  class='header_laporan' align='right'>".number_format($tot_agg,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($tot_nilai,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($tot_persen,2,",",".")."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
	
}
?>
