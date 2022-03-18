<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_budget_rptBudgetRelease extends server_report_basic
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
		$tahun=$tmp[0];
		$jenis_file=$tmp[1];
		$nama_file="rra.xls";

		$sql="select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.tw1,a.tw2,a.tw3,a.tw4,a.total
    from 
    (
    select substring(periode1,1,4) as tahun,kode_lokasi,kode_akun,kode_pp,kode_drk,
    sum(case when substring(periode1,5,2) ='01' then nilai end) as tw1,
    sum(case when substring(periode1,5,2) ='04' then nilai end) as tw2,
    sum(case when substring(periode1,5,2) ='07' then nilai end) as tw3,
    sum(case when substring(periode1,5,2) ='10' then nilai end) as tw4,
    sum(nilai) as total
    from angg_r 
    where periode1 in ('".$tahun."01','".$tahun."04','".$tahun."07','".$tahun."10') and modul='RELEASE'
    group by kode_akun,kode_pp,kode_drk,substring(periode1,1,4),kode_lokasi
    ) a 
    inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
    inner join drk d on a.kode_drk=d.kode_drk and a.tahun=d.tahun and a.kode_lokasi=d.kode_lokasi
    $this->filter
    ";

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

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan release budget",$this->lokasi,$tahun);
    echo "<table width='1200' border='1' cellspacing='0' cellpadding='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
      <td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
      <td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
      <td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
      <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
      <td width='135' class='header_laporan'><div align='center'>Nama PP</div></td>
      <td width='70'  class='header_laporan'><div align='center'>Kode DRK</div></td>
      <td width='190' class='header_laporan'><div align='center'>Nama DRK </div></td>
      <td width='90' class='header_laporan'><div align='center'>Triwulan I </div></td>
      <td width='90' class='header_laporan'><div align='center'>Triwulan II </div></td>
      <td width='90' class='header_laporan'><div align='center'>Triwulan III</div></td>
      <td width='90' class='header_laporan'><div align='center'>Triwulan IV </div></td>
      <td width='100' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
    $i=$start+1;
		$tw1=0;$tw2=0;$tw3=0;$tw4=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tw1=$tw1+$row->tw1;
			$tw2=$tw2+$row->tw2;
			$tw3=$tw3+$row->tw3;
			$tw4=$tw4+$row->tw4;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='7' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw4,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
