<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggKpaAkunPp extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$sql = $sql = "select 1 ";
		error_log($sql);
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
		$jenis=$tmp[0];
		$tahun=$tmp[1];
		$kode_pp=$tmp[2];
		$kode_drk=$tmp[3];
		$periode=$tmp[4];
		$nik_user=$tmp[5];
		$realisasi=$tmp[6];
		
		if ($jenis=="Investasi")
		{	$jenis="Neraca"; }
		$sql = "select a.kode_akun,a.kode_lokasi,a.kode_pp,b.nama as nama_akun,d.nama as nama_pp
				, sum(case when substring(a.periode,5,2)='01' then case when dc='D' then nilai else -nilai end else 0 end ) as n1
                , sum(case when substring(a.periode,5,2)='02' then case when dc='D' then nilai else -nilai end else 0 end ) as n2
	            , sum(case when substring(a.periode,5,2)='03' then case when dc='D' then nilai else -nilai end else 0 end ) as n3
	            , sum(case when substring(a.periode,5,2)='04' then case when dc='D' then nilai else -nilai end else 0 end ) as n4
				, sum(case when substring(a.periode,5,2)='05' then case when dc='D' then nilai else -nilai end else 0 end ) as n5
				, sum(case when substring(a.periode,5,2)='06' then case when dc='D' then nilai else -nilai end else 0 end ) as n6
                , sum(case when substring(a.periode,5,2)='07' then case when dc='D' then nilai else -nilai end else 0 end ) as n7
	            , sum(case when substring(a.periode,5,2)='08' then case when dc='D' then nilai else -nilai end else 0 end ) as n8
	            , sum(case when substring(a.periode,5,2)='09' then case when dc='D' then nilai else -nilai end else 0 end ) as n9
				, sum(case when substring(a.periode,5,2)='10' then case when dc='D' then nilai else -nilai end else 0 end ) as n10
				, sum(case when substring(a.periode,5,2)='11' then case when dc='D' then nilai else -nilai end else 0 end ) as n11
	            , sum(case when substring(a.periode,5,2)='12' then case when dc='D' then nilai else -nilai end else 0 end ) as n12
				, sum(case when substring(a.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
from anggaran_d a
inner join masakun b on a.kode_akun=b.kode_akun and b.jenis='$jenis' and a.kode_lokasi=b.kode_lokasi 
inner join lokasi c on a.kode_lokasi=c.kode_lokasi
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
$this->filter 
group by a.kode_akun,a.kode_lokasi,a.kode_pp,b.nama,d.nama
order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pengawasan anggaran (KPA) ",$this->lokasi,"TAHUN $tahun");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
 <tr >
    <td height='23' colspan='9' class='header_laporan'><table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td width='100' class='header_laporan'>Kode Akun</td>
        <td width='500' class='header_laporan'>: $row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>: $row->nama_akun</td>
      </tr>
	  <tr>
        <td width='100' class='header_laporan'>Kode PP</td>
        <td width='500' class='header_laporan'>: $row->kode_pp</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nama PP </td>
        <td class='header_laporan'>: $row->nama_pp</td>
     
      
    </table></td>
    <td align='right' valign='middle'><table border='1' cellspacing='0' cellpadding='0' class='kotak'> 
      <tr align='center'>
        <td colspan='4' class='header_laporan'>RKA TAHUN $tahun </td>
        </tr>
      <tr>
        <td width='80' class='header_laporan'>Januari</td>
        <td width='100' class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
        <td width='80' class='header_laporan'>Juli</td>
        <td width='100' class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Februari</td>
        <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
        <td class='header_laporan'>Agustus</td>
        <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Maret</td>
        <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
        <td class='header_laporan'>September</td>
        <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>April</td>
        <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
        <td class='header_laporan'>Oktober</td>
        <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Mei</td>
        <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
        <td class='header_laporan'>November</td>
        <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Juni</td>
        <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
        <td class='header_laporan'>Desember</td>
        <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
      </tr>
      <tr>
        <td colspan='3' align='right' class='header_laporan'>Total</td>
        <td class='header_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
 
 
  <tr bgcolor='#CCCCCC'>
    <td width='100' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='100' height='23' class='header_laporan' align='center'>No Dokumen</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
   <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Balance</td>
  </tr>
   
";	
			
			if ($realisasi=="Anggaran")
			{
				$sql="select a.no_bukti,a.no_dokumen,convert(varchar(20),a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_lokasi,a.periode,
						   case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit
					from (
						select no_ju as no_bukti,no_dokumen,kode_lokasi,tanggal,periode,kode_akun,kode_pp,dc,nilai,keterangan
						from ju_j
						where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' and kode_pp='$row->kode_pp' 
						union all
						select no_kas as no_bukti,no_dokumen,kode_lokasi,tanggal,periode,kode_akun,kode_pp,dc,nilai,keterangan
						from kas_j
						where kode_lokasi='$row->kode_lokasi' and substring(periode,1,4)='$tahun' and kode_akun='$row->kode_akun' and kode_pp='$row->kode_pp' 
						)a
					where a.kode_lokasi='$row->kode_lokasi'
					order by a.tanggal ";

			}
			else
			{
				$tabel ="(select a.* from gldt_h a
				where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_pp='$row->kode_pp' ".$periode."
union all 
select a.* from gldt a
where a.kode_lokasi='$row->kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.kode_akun='$row->kode_akun' and a.kode_pp='$row->kode_pp' ".$periode." ) ";
				$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,a.kode_lokasi,a.periode,
				case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				from $tabel a order by a.tanggal ";

			}
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->total;
			$debet=0;
			$kredit=0;
			$tmp="";
			$j=1;
			$i = 1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi','$row1->periode');\">$row1->no_bukti</a>";
				echo "</td>
	 <td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='23' valign='top' class='isi_laporan'>".$row1->tgl."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->debet,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->kredit,0,',','.')."</td>
    <td valign='top' class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
				$i=$i+1;
			}
			echo "<tr>
   <td height='23' colspan='4' valign='top' class='header_laporan' align='right'>TOTAL&nbsp;</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($debet,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($kredit,0,',','.')."</td>
   <td valign='top' class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			
		}
		return "";
	}
	
}
?>
