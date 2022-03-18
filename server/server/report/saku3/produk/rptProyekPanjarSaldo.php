<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptProyekPanjarSaldo extends server_report_basic
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
// 		$sql="select a.akun_pj,b.nama,a.kode_lokasi
// from panjar_m a
// inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi
// $this->filter
// group by a.akun_pj,b.nama,a.kode_lokasi
// order by a.akun_pj";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		// $rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		// while ($row = $rs->FetchNextObject($toupper=false))
		// {
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>";
// 			echo"
 
//   <tr >
//     <td height='23' colspan='15' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
//       <tr>
//         <td width='99' class='header_laporan'>Akun Panjar</td>
//         <td  class='header_laporan'>: $row->akun_pj</td>
//       </tr>
// 	  <tr>
//         <td width='99' class='header_laporan'>Nama Akun</td>
//         <td class='header_laporan'>: $row->nama</td>
//       </tr>
//     </table></td>
//   </tr>";
 
  echo "<tr bgcolor='#CCCCCC'>
	<td width='25' class='header_laporan' align='center'>No</td>
	<td width='60' class='header_laporan' align='center'>NIK</td>
	<td width='140' class='header_laporan' align='center'>Nama</td>
	<td width='40' class='header_laporan' align='center'>Kode PP</td>
	<td width='120' class='header_laporan' align='center'>Nama PP</td>
    <td width='80' class='header_laporan' align='center'>No Panjar</td>
	<td width='80' class='header_laporan' align='center'>No Kas PJ</td>
	<td width='60' class='header_laporan' align='center'>Tgl Panjar</td>
	<td width='60' class='header_laporan' align='center'>Tgl Jatuh Tempo</td>
	<td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='90' class='header_laporan' align='center'>Nilai Panjar</td>	
	<td width='80' class='header_laporan' align='center'>No PTG</td>
	<td width='80' class='header_laporan' align='center'>No Kas PTG</td>
	<td width='60' class='header_laporan' align='center'>Tgl PTG</td>
	<td width='90' class='header_laporan' align='center'>Nilai PTG</td>
	<td width='90' class='header_laporan' align='center'>Nilai Kasbank</td>	
	<td width='100' class='header_laporan' align='center'>Saldo Panjar</td>
  </tr>
";
			
			$sql="select a.no_pj,a.kode_lokasi,a.keterangan,a.nik_pengaju,c.nama,a.kode_pp,b.nama as nama_pp,
			convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as tgl2,a.progress,a.no_kas,d.no_ptg,
			case when a.no_kas<>'-' then a.nilai else 0 end as nilai, d.nilai as ptg, d.nilai_kas,a.no_dokumen,d.no_kas as kas,convert(varchar,d.tanggal,103) as tgl_ptg
from panjar_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_pengaju=c.nik and a.kode_lokasi=c.kode_lokasi
left join ptg_m d on a.no_pj=d.no_pj and a.kode_lokasi=d.kode_lokasi
$this->filter --and a.akun_pj='$row->akun_pj'
order by a.no_pj ";
			
			$rs1 = $dbLib->execute($sql);
			$debet=0; $kredit=0; $saldo=0;
			$i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo+=$row1->nilai-$row1->ptg-$row1->nilai_kas ;	
				$nilai+=$row1->nilai;
				$ptg+=$row1->ptg;
				$nilai_kas+=$row1->nilai_kas;
				
				echo "<tr>
	 			<td height='23'  class='isi_laporan' align='center'>$i</td>";
				 echo"
				 <td  class='isi_laporan'>$row1->nik_pengaju</td>
				 <td  class='isi_laporan'>$row1->nama</td>
				 <td  class='isi_laporan'>$row1->kode_pp</td>
				 <td  class='isi_laporan'>$row1->nama_pp</td>	
    			<td  class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_pj','$row1->kode_lokasi','$periode');\">$row1->no_pj</a></td>
				<td  class='isi_laporan'>$row1->no_kas</td>
				<td  class='isi_laporan'>$row1->tgl</td>
				<td  class='isi_laporan'>$row1->tgl2</td>
				<td  class='isi_laporan'>$row1->keterangan</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
				<td  class='isi_laporan'>$row1->no_ptg</td>
				<td  class='isi_laporan'>$row1->kas</td>	
				<td  class='isi_laporan'>$row1->tgl_ptg</td>	
				<td  class='isi_laporan' align='right'>".number_format($row1->ptg,0,',','.')."</td>	
				<td  class='isi_laporan' align='right'>".number_format($row1->nilai_kas,0,',','.')."</td>
				<td  class='isi_laporan' align='right'>".number_format($row1->nilai-$row1->ptg-$row1->nilai_kas,0,',','.')."</td>
			</tr>";
			$i++;
				
			}
			echo "<tr>
   <td height='23' colspan='10'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
   <td height='23' colspan='3'  class='header_laporan' align='right'>&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($ptg,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>

 </tr></table><br>";
		// }
		return "";
	}
	
}
?>
