<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptProyekBymhdKas extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];

		
		$nama_file="kartu_proyek.xls";

		$sql="select  a.kode_proyek,a.kode_lokasi,a.nama,a.kode_pp,b.nama as nama_pp,c.nama as nama_cust,a.no_pks,
	   convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
	   a.nilai,a.nilai_or,a.kode_jenis
from spm_proyek a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_proyek ";
		
		if ($jenis=="Excell")
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
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

		echo "<div align='center'>"; 
		
		echo $AddOnLib->judul_laporan("kartu pengawasan proyek",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode PP</td>
        <td width='360' class='header_laporan'>: $row->kode_pp</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Nama PP</td>
        <td width='360' class='header_laporan'>: $row->nama_pp</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Kode Proyek</td>
        <td width='360' class='header_laporan'>: $row->kode_proyek</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Proyek</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
 
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
    <td  width='150' class='header_laporan' align='center'>No Bukti</td>
	<td  width='60' class='header_laporan' align='center'>Tanggal</td>	
	<td  width='60' class='header_laporan' align='center'>Kode PP</td>	
	<td  width='200' class='header_laporan' align='center'>Keterangan</td>
    <td  width='100' class='header_laporan' align='center'>Nilai </td>
	<td  width='100' class='header_laporan' align='center'>Reverse</td>	
    
	";
			
	$sql="select a.no_kas,b.keterangan,convert(varchar,b.tanggal,103) as tgl,a.kode_pp,
	   a.nilai as kas,0 as rev
from yk_pb_m a
inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi'
order by b.tanggal";
			
			$rs1 = $dbLib->execute($sql);
			$kas=0; $rev=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$kas+=$row1->kas;
				$rev+=$row1->rev;
				echo "<tr>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_kas','$row->kode_lokasi');\">$row1->no_kas</a></td>
    <td class='isi_laporan'>$row1->tgl</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
	<td class='isi_laporan'>$row1->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row1->kas,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->rev,0,',','.')."</td>
    
  </tr>";
			
			}
  
  		echo "<tr>
	<td class='header_laporan' colspan='4' align='center'>Total</td>
    <td class='header_laporan' align='right'>".number_format($kas,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($rev,0,',','.')."</td>
  </tr>";
		echo "

 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
