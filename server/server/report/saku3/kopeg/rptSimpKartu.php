<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kopeg_rptSimpKartu extends server_report_basic
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
		$sql="select a.no_agg,a.kode_lokasi,b.nama,a.jenis,a.no_simp,a.kode_param,c.nama as nama_param,
	   a.status_bayar,a.nilai,a.p_bunga,date_format(a.tgl_tagih,'%d/%m/%Y') as tgl_tagih
from kop_simp_m a
inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join kop_simp_param c on a.kode_param=c.kode_param and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.no_agg";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu simpanan",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='99' class='header_laporan'>Anggota</td>
        <td width='360' class='header_laporan'>: $row->no_agg - $row->nama</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>No Simpanan</td>
        <td width='360' class='header_laporan'>: $row->no_simp</td>
      </tr>
	   
	  <tr>
        <td width='99' class='header_laporan'>Tanggal Tagihan</td>
        <td width='360' class='header_laporan'>: $row->tgl_tagih</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Jenis Simpanan </td>
        <td class='header_laporan'>: $row->kode_param - $row->nama_param</td>
      </tr>
      <tr>
        <td class='header_laporan'>Status Bayar </td>
        <td class='header_laporan'>: $row->status_bayar</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai Potongan</td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Bunga </td>
        <td class='header_laporan'>: ".number_format($row->p_bunga,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='50' class='header_laporan' align='center'>Tgl Tagihan</td>
    <td width='80' class='header_laporan' align='center'>No Bill</td>
	<td width='80' class='header_laporan' align='center'>Tagihan</td>
	 <td width='80' class='header_laporan' align='center'>Pokok</td>
	<td width='80' class='header_laporan' align='center'>Bunga</td>
    <td width='80' class='header_laporan' align='center'>Bayar</td>
	<td width='80' class='header_laporan' align='center'>Saldo</td>
    <td width='60' class='header_laporan' align='center'>Tgl Bayar</td>
	<td width='100' class='header_laporan' align='center'>No Bayar</td>
  </tr>
";
			
			$sql="select a.no_simp,a.no_bill,b.tanggal,a.nilai,c.no_angs,
			isnull(c.pokok,0) as pokok,isnull(c.bunga,0) as bunga,isnull(c.pokok,0)+isnull(c.bunga,0) as bayar,
			a.kode_lokasi,
			date_format(b.tanggal,'%d/%m/%Y') as tgl,date_format(d.tanggal,'%d/%m/%Y') as tgl_bayar,d.modul
from kop_simp_d a
inner join kop_simpbill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
left join (select a.no_angs,a.no_bill, a.no_simp,
			      sum(case when substring(a.akun_piutang,1,1)='1' then a.nilai else 0 end) as pokok,
				  sum(case when substring(a.akun_piutang,1,1)<>'1' then a.nilai else 0 end) as bunga
			from kop_simpangs_d a
			where a.kode_lokasi='01'
			group by a.no_angs,a.no_bill, a.no_simp
		  )c on a.no_simp=c.no_simp and a.no_bill=c.no_bill 
inner join kop_simpangs_m d on c.no_angs=d.no_angs and c.kode_lokasi=d.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and a.no_simp='$row->no_simp' and a.kode_lokasi='$row->kode_lokasi'
order by b.tanggal";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0; $bayar=0;$saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai+=$row1->nilai;	
				$bayar+=$row1->bayar;
				$saldo+=$row1->nilai-$row1->bayar;
				echo "<tr>
	 <td height='23'  class='isi_laporan'>".$row1->tgl."</td>
    <td  class='isi_laporan'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row1->no_bill','$row1->kode_lokasi');\">$row1->no_bill</a></td>";
				echo "<td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->pokok,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->bunga,0,',','.')."</td>
	<td  class='isi_laporan' align='right'>".number_format($row1->bayar,0,',','.')."</td>
	   <td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	    <td   class='isi_laporan'>".$row1->tgl_bayar."</td>";
		 echo "<td  class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_angs','$row1->kode_lokasi','$row1->modul');\">$row1->no_angs</a></td>";
		echo "</tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='2'  class='isi_laporan' align='right'>Total&nbsp;</td>
   <td  class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   <td  class='isi_laporan' align='right'>".number_format($bayar,0,',','.')."</td>
  <td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  <td colspan='2'  class='isi_laporan' align='right'>&nbsp;</td>
  
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
