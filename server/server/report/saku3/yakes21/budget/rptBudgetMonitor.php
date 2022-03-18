<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetMonitor extends server_report_basic
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

		$sql="select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk,
	  isnull(a.rka_orgi,0) as rka_orgi,isnull(a.rka_rra,0) as rka_rra,isnull(e.rka_release,0) as rka_release,isnull(e.rka_hold,0) as rka_hold,
	  isnull(a.rka_orgi,0)-isnull(e.rka_release,0)+-isnull(e.rka_hold,0) as saldo,
	  isnull(f.rra_ori,0) as rra_ori,isnull(f.rra_release,0) as rra_release,isnull(f.rra_masuk,0) as rra_masuk,
	  isnull(g.nilai,0) as realisasi,isnull(e.rka_release,0)-isnull(g.nilai,0)+isnull(f.rra_masuk,0) as saldo_release,
    isnull(h.nilai,0) as nilai_gl
from (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode,1,4) as tahun,
			   sum(case when a.modul='ORGI' then a.nilai else 0 end) as rka_orgi,
			   sum(a.nilai) as rka_rra
	 from anggaran_d a
	 where a.kode_lokasi='$kode_lokasi' and a.modul='ORGI' and substring(a.periode,1,4)='$tahun'
	 group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,substring(a.periode,1,4)
      ) a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and d.tahun='$tahun' and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
		  sum( case when a.modul='RELEASE' then a.nilai else 0 end) as rka_release,
		  sum( case when a.modul='HOLD' then a.nilai else 0 end) as rka_hold
		from angg_r a
    inner join anggaran_m b on a.no_bukti=b.no_agg and b.jenis='RELEASE'
		where a.kode_lokasi='$kode_lokasi' and a.modul='RELEASE' and substring(a.periode1,1,4)='$tahun'
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp and a.kode_drk=e.kode_drk
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,
				sum(case when b.sts_pdrk='RRRMULTI' and a.dc='C' then a.nilai else 0 end) as rra_ori,
				sum(case when b.sts_pdrk='RRLC' and a.dc='C' then a.nilai else 0 end) as rra_release,
				sum(case when a.dc='D' then a.nilai else 0 end) as rra_masuk
		from rra_pdrk_d a
		inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk
		where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp and a.kode_drk=f.kode_drk
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,sum(a.nilai) as nilai
		from angg_r a
		where a.kode_lokasi='$kode_lokasi' and a.modul not in ('RELEASE','HOLD') and substring(a.periode1,1,4)='$tahun'
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp and a.kode_drk=g.kode_drk
left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk,sum(case when dc='D' then a.nilai else -nilai end) as nilai
		from gldt a
		where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
		group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk
		)h on a.kode_akun=h.kode_akun and a.kode_lokasi=h.kode_lokasi and a.kode_pp=h.kode_pp and a.kode_drk=h.kode_drk
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
      <td width='30' height='25'  align='center' class='header_laporan'>No</td>
      <td width='60' align='center' class='header_laporan'>Kode Akun </td>
      <td width='200' align='center' class='header_laporan'>Nama Akun</td>
      <td width='50' align='center' class='header_laporan'>Kode PP</td>
      <td width='150' align='center' class='header_laporan'>Nama PP</td>
      <td width='60'  align='center' class='header_laporan'>Kode DRK</td>
      <td width='150' align='center class='header_laporan''>Nama DRK </td>
      <td width='90' align='center' class='header_laporan'>RKA ORI</td>
      <td width='90' align='center' class='header_laporan'>RKA Setelah RRA</td>
      <td width='90' align='center' class='header_laporan'>Saldo Anggaran </td>
      <td width='90' align='center' class='header_laporan'>Release</td>
      <td width='90' align='center' class='header_laporan'>RRA Keluar Dari Saldo</td>
      <td width='90' align='center' class='header_laporan'>RRA Keluar Dari Release</td>
      <td width='90' align='center' class='header_laporan'>Hold</td>
      <td width='90' align='center' class='header_laporan'>RRA Masuk</td>
      <td width='90' align='center' class='header_laporan'>Realisasi Anggaran</td>
      <td width='90' align='center' class='header_laporan'>Saldo Release Anggaran</td>
      <td width='90' align='center' class='header_laporan'>Realisasi GL</td>
      <td width='90' align='center' class='header_laporan'>Saldo Release GL</td>
    </tr>";
    $i=1;
		$rka_orgi=0;$rka_rra=0;$saldo=0;$release=0;$rra_ori=0;$rra_release=0;$rra_hold=0;
    $rra_masuk=0;$realisasi=0;$saldo_release=0;$nilai_gl=0;$saldo_gl=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$rka_orgi+=$row->rka_orgi;
      $rka_rra+=$row->rka_orgi-$row->rra_ori+$row->rra_masuk;
      $saldo+=$row->saldo;
      $rka_release+=$row->rka_release;
      $rra_ori+=$row->rra_ori;
      $rra_release+=$row->rra_release;
      $rra_hold+=$row->rra_hold;
      $rra_masuk+=$row->rra_masuk;
      $realisasi+=$row->realisasi;
      $saldo_release+=$row->saldo_release;
      $nilai_gl+=$row->nilai_gl;
      $saldo_gl+=$row->saldo-$row->rra_ori-$row->realisasi;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka_orgi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka_orgi-$row->rra_ori+$row->rra_masuk-$row->rra_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->saldo,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rra_ori,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rra_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rra_hold,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rra_masuk,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->realisasi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->saldo_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->nilai_gl,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka_release+$row->rra_masuk-$row->nilai_gl,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='7' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($rka_orgi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rka_rra,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rka_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rra_ori,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rra_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rra_hold,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($rra_masuk,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($realisasi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($saldo_release,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($nilai_gl,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($saldo_gl,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
