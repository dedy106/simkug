<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptGarBulanTu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
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
		$trail=$tmp[2];
		$sql=" select a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
         isnull(a.n1,0) as n1,isnull(a.n2,0) as n2,isnull(a.n3,0) as n3,isnull(a.n4,0) as n4,
         isnull(a.n5,0) as n5,isnull(a.n6,0) as n6,isnull(a.n7,0) as n7,isnull(a.n8,0) as n8,
         isnull(a.n9,0) as n9,isnull(a.n10,0) as n10,isnull(a.n11,0) as n11,isnull(a.n12,0) as n12,
		 isnull(a.n13,0) as total
  from exs_gar_orgi_tahun a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun'and a.kode_lokasi=d.kode_lokasi
  inner join relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
  inner join exs_bidang f on c.kode_bidang=f.kode_bidang and c.kode_lokasi=f.kode_lokasi
  inner join exs_rektor g on f.kode_rektor=g.kode_rektor and f.kode_lokasi=g.kode_lokasi
  $this->filter
  order by a.kode_akun,a.kode_pp,a.kode_drk;";
		if ($trail=="1")
		{
			$sql=" select a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
			 isnull(a.n1,0) as n1,isnull(a.n2,0) as n2,isnull(a.n3,0) as n3,isnull(a.n4,0) as n4,
			 isnull(a.n5,0) as n5,isnull(a.n6,0) as n6,isnull(a.n7,0) as n7,isnull(a.n8,0) as n8,
			 isnull(a.n9,0) as n9,isnull(a.n10,0) as n10,isnull(a.n11,0) as n11,isnull(a.n12,0) as n12,
			 isnull(a.n13,0) as total
	  from exs_gar_orgi_tahun a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
	  inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun'and a.kode_lokasi=d.kode_lokasi
	  inner join relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	  inner join exs_bidang f on c.kode_bidang=f.kode_bidang and c.kode_lokasi=f.kode_lokasi
	  inner join exs_fakultas_bidang g on f.kode_bidang=g.kode_bidang and f.kode_lokasi=g.kode_lokasi
	  $this->filter
	  order by a.kode_akun,a.kode_pp,a.kode_drk;";
		}
		$rs = $dbLib->execute($sql);
		$i=1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data anggaran ",$this->lokasi,"TAHUN ".$tahun);
		echo "<table width='1920' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
<td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode DRK</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama DRK </div></td>
    <td width='90' class='header_laporan'><div align='center'>Januari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Februari</div></td>
    <td width='90' class='header_laporan'><div align='center'>Maret</div></td>
    <td width='90' class='header_laporan'><div align='center'>April</div></td>
<td width='90' class='header_laporan'><div align='center'>Mei</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juni</div></td>
    <td width='90' class='header_laporan'><div align='center'>Juli</div></td>
    <td width='90' class='header_laporan'><div align='center'>Agustus</div></td>
<td width='90' class='header_laporan'><div align='center'>September</div></td>
    <td width='90' class='header_laporan'><div align='center'>Oktober</div></td>
    <td width='90' class='header_laporan'><div align='center'>November</div></td>
    <td width='90' class='header_laporan'><div align='center'>Desember</div></td>


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
			$n5=$n5+$row->n5;
			$n6=$n6+$row->n6;
			$n7=$n7+$row->n7;
			$n8=$n8+$row->n8;
			$n9=$n9+$row->n9;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='7' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
		
	}
	
	
}

