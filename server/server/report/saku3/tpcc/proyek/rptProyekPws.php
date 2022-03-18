<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tpcc_proyek_rptProyekPws extends server_report_basic
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
		$sql="select a.kode_proyek,a.nama,a.kode_cust,a.nilai,a.nilai_or,b.nama as nama_cust,a.p_or,a.kode_cons,b.nama as nama_cons, a.kode_jenis,d.nama as nama_jenis
from pr_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join consumer c on a.kode_cons=c.kode_cons and a.kode_lokasi=c.kode_lokasi
inner join pr_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_proyek ";


		
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
    <td height='23' colspan='8' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	      <tr>
        <td class='header_laporan'>Customer </td>
        <td class='header_laporan'>: $row->nama_cust</td>
      </tr>	  
	      <tr>
        <td class='header_laporan'>Consumer </td>
        <td class='header_laporan'>: $row->kode_cons - $row->nama_cons </td>
      </tr>	  
	  <tr>
        <td width='99' class='header_laporan'>Kode Proyek</td>
        <td width='360' class='header_laporan'>: $row->kode_proyek</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Proyek</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Jenis Proyek</td>
        <td class='header_laporan'>: $row->kode_jenis - $row->nama_jenis </td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai Kontrak </td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td class='header_laporan'>Beban  </td>
        <td class='header_laporan'>: ".number_format($row->nilai_or,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>OR</td>
        <td class='header_laporan'>: $row->p_or %</td>
      </tr>	  
    </table></td>
  </tr>
  
  <tr bgcolor='#CCCCCC'>
    <td  width='100' class='header_laporan' align='center'>No Dokumen</td>
	<td  width='60' class='header_laporan' align='center'>Tanggal</td>	
    <td  width='200' class='header_laporan' align='center'>Keterangan</td>
	<td  width='100' class='header_laporan' align='center'>Jenis</td>		
	<td  width='100' class='header_laporan' align='center'>Kode DRK</td>	
	<td  width='100' class='header_laporan' align='center'>Kode Akun</td>
    <td  width='100' class='header_laporan' align='center'>Beban</td>
    <td  width='100' class='header_laporan' align='center'>Non Beban</td>
	
	";
			
	$sql1="select a.no_bukti, c.keterangan,convert(varchar(20),c.tanggal,103) as tgl,a.kode_drk,
case when a.jenis in ('BEBAN','PJBEBAN') then (case when a.dc = 'D' then a.nilai else -a.nilai end) else 0 end as beban, 
case when a.jenis in ('PJ','BDD') then (case when a.dc = 'D' then a.nilai else -a.nilai end) else 0 end as nonbeban,
a.kode_akun,a.jenis
	from pr_or_d a
inner join pr_proyek b on a.kode_proyek=b.kode_proyek and a.kode_lokasi=b.kode_lokasi	
left join (select keterangan,tanggal,no_dokumen, no_ref1
          from trans_m 
		  group by keterangan,tanggal,no_dokumen,no_ref1
		  ) c on a.kode_proyek=c.no_dokumen and a.no_bukti=c.no_ref1

where a.kode_proyek='$row->kode_proyek'
order by a.jenis,a.kode_akun asc
		";
		
			$rs1 = $dbLib->execute($sql1);
			$beban=0; $nonbeban=0; $tot=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$beban+=$row1->beban;
				$nonbeban+=$row1->nonbeban;
				$tot=$beban+$nonbeban;
				
				echo "<tr>
	<td class='isi_laporan'>$row1->no_bukti</td>
    <td class='isi_laporan'>$row1->tgl</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	<td class='isi_laporan'>$row1->jenis</td>	
	<td class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
	<td class='isi_laporan' align='right'>".number_format($row1->beban,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->nonbeban,0,',','.')."</td>
	
  </tr>";
				
			}
			echo "<tr>
	<td class='header_laporan' colspan='6' align='right'>Total Beban</td>
    <td class='header_laporan' align='right'>".number_format($beban,0,',','.')."</td>
	 <td class='header_laporan' align='right'>".number_format($nonbeban,0,',','.')."</td>
  </tr>";
 			echo "<tr>
	<td class='header_laporan' colspan='7' align='right'>Total Pengeluaran</td>
    <td class='header_laporan' align='right'>".number_format($tot,0,',','.')."</td>
  </tr>"; 
			echo "
 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}

?>
