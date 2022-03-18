<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kredit_rptBayar extends server_report_basic
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
		$sql="select a.no_kas,a.kode_lokasi,a.tanggal,b.nama as nama_colec,
	    date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,c.nama as nama_pp
from kas_m a
inner join karyawan b on a.no_link=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter 
order by a.no_kas";
	
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("angsuran",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No bayar</td>
        <td width='360' class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>
      </tr>
	  
	  <tr>
        <td width='99' class='header_laporan'>Tanggal</td>
        <td width='360' class='header_laporan'>: $row->tgl</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>Area Bisnis</td>
        <td width='360' class='header_laporan'>: $row->kode_pp - $row->nama_pp</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Collector </td>
        <td class='header_laporan'>: $row->nama_colec</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan </td>
        <td class='header_laporan'>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
 
  <tr bgcolor='#CCCCCC'>
    <td width='60' height='23' class='header_laporan' align='center'>No TTB</td>
	<td width='50' height='23' class='header_laporan' align='center'>Cicilan Ke</td>
	<td width='100' height='23' class='header_laporan' align='center'>No Tagihan</td>
	<td width='150' class='header_laporan' align='center'>Kordinator</td>
	
    <td width='80' class='header_laporan' align='center'>Nilai</td>
	<td width='60' class='header_laporan' align='center'>Tgl Janji</td>
  </tr>
";
			
			$sql="select a.kode_lokasi,a.no_ttb,d.nilai,c.nama,a.cicilan_ke,a.no_bill,date_format(d.tgl_lunas,'%d/%m/%Y') as tgl_lunas,d.sisa
from kre_ttb2_sch a
inner join kre_ttb2_m b on a.no_ttb=b.no_ttb and a.kode_lokasi=b.kode_lokasi
inner join kre_agg c on b.no_agg=c.no_agg and b.kode_lokasi=c.kode_lokasi
inner join kre_angsur_d d on a.no_ttb=d.no_ttb and a.kode_lokasi=d.kode_lokasi and a.cicilan_ke=d.cicilan_ke
inner join kas_m e on d.no_bukti=e.no_kas and d.kode_lokasi=e.kode_lokasi
where e.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi' ";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->total;
			$nilai=0;
			
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+= $row1->nilai;	
				$tgl_lunas="";
				if ($row1->sisa > 0)
				{
					$tgl_lunas=$row1->tgl_lunas;
				}
				echo "<tr>
				<td height='23' valign='top' class='isi_laporan'>".$row1->no_ttb."</td>
				 <td height='23' valign='top' class='isi_laporan'>".$row1->cicilan_ke."</td>
				<td height='23' valign='top' class='isi_laporan'>".$row1->no_bill."</td>
	 <td height='23' valign='top' class='isi_laporan'>".$row1->nama."</td>
	
    <td valign='top' class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
	<td valign='top' class='isi_laporan' align='right'>$tgl_lunas</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='4' valign='top' class='isi_laporan' align='right'>Total&nbsp;</td>
   
  <td valign='top' class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
