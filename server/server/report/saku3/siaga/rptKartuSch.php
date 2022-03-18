<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptKartuSch extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1";
		
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.no_kartu,a.keterangan,a.tanggal,a.periode,a.kode_vendor,a.nilai,a.lama_bayar,a.akun_beban,
		a.akun_hutang,a.nik_user,a.tgl_input,a.kode_lokasi, a.kode_pp, c.nama as pp,b.nama as vend
from gr_kartu_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter 
order by a.no_kartu";


		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan expense schedule",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>No. Kartu</td>
        <td  class='header_laporan'>: $row->no_kartu</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Kode PP</td>
        <td class='header_laporan'>: $row->kode_pp - $row->pp</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Kode Vendor</td>
        <td  class='header_laporan'>: $row->kode_vendor - $row->vend</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>: $row->keterangan </td>
			</tr>
			<tr>
			<td width='99' class='header_laporan'>Lama Bayar</td>
			<td class='header_laporan'>: $row->lama_bayar </td>
		</tr>
		<tr>
			<td width='99' class='header_laporan'>Akun Beban</td>
			<td class='header_laporan'>: $row->akun_beban </td>
		</tr>
		<tr>
			<td width='99' class='header_laporan'>Akun BMHD</td>
			<td class='header_laporan'>: $row->akun_hutang </td>
		</tr>
		<tr>
			<td width='99' class='header_laporan'>Nilai</td>
			<td class='header_laporan'>: $row->nilai </td>
		</tr>
    </table></td>
  </tr>";
 
  echo "<tr bgcolor='#CCCCCC'>
	<td width='150' class='header_laporan' align='center'>No. Kartu</td>
    <td width='60' height='23' class='header_laporan' align='center'>Periode</td>
    <td width='90' class='header_laporan' align='center'>Nilai</td>
    <td width='100' class='header_laporan' align='center'>No. Bill</td>
  </tr>
";
			
			$sql="select a.no_kartu,a.kode_lokasi,a.nilai,a.periode,a.no_bill
from gr_kartu_sch a

where a.no_kartu='$row->no_kartu' and a.kode_lokasi='$row->kode_lokasi'

order by nu
 ";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total+=$row1->nilai;	
				
				echo "<tr>
	 <td height='23'  class='isi_laporan'>".$row1->no_kartu."</td>
    <td  class='isi_laporan'>".$row1->periode."</td>
		<td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
		<td  class='isi_laporan'>".$row1->no_bill."</td>

  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='2'  class='header_laporan' align='right'>Total&nbsp;</td>
	 <td  class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
	 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
