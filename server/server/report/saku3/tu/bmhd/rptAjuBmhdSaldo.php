<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_bmhd_rptAjuBmhdSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$tmp="";
		if ($jenis=="Lunas")
		{
			$tmp=" and  a.nilai-isnull(c.nilai_kas,0)=0 ";
		}
		if ($jenis=="Outstanding")
		{
			$tmp=" and  a.nilai-isnull(c.nilai_kas,0)<>0 ";
		}
		$sql = "select DISTINCT a.periode,a.no_bmhd,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_vendor,a.nilai,a.kode_akun,a.kode_pp,a.kode_lokasi,
		b.nama as nama_vendor,b.bank,b.no_rek,g.nama as nama_titip,
		c.nilai_kas,
		a.nilai-c.nilai_kas as saldo
	   --dbo.fnGetBuktiBmhd(c.no_bmhd,'11') as ket_bmhd
  from bmhd_m a 
  inner join it_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
  left join (
						  select sum(a.nilai) as nilai_kas,a.no_bmhd
						  from bmhd_bayar a
						  left join  it_aju_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi
						  left join kas_m f on d.no_kas=f.no_kas and d.kode_lokasi=f.kode_lokasi
							GROUP BY a.no_bmhd
					  )c  on a.no_bmhd=c.no_bmhd 
  inner join masakun g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi
$this->filter $tmp
order by a.no_bmhd ";
// echo $sql;


		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo "$sql"; 
		echo $AddOnLib->judul_laporan("SALDO BMHD",$this->lokasi," SD PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='110' class='header_laporan' align='center'>No Bukti</td>
    <td width='40'  class='header_laporan' align='center'>Kode PP</td>
    <td width='60'  class='header_laporan' align='center'>Tanggal</td>
	<td width='60'  class='header_laporan' align='center'>Akun Bmhd</td>
	<td width='120'  class='header_laporan' align='center'>Nama Akun</td>
	<td width='60' class='header_laporan' align='center'>Kode Vendor</td>
	<td width='150' class='header_laporan' align='center'>Nama Vendor</td>
	<td width='100' class='header_laporan' align='center'>Bank</td>
	<td width='100' class='header_laporan' align='center'>No Rekening</td>
    <td width='150'  class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Nilai Titipan</td>
	<td width='90' class='header_laporan' align='center'>Nilai Pertanggungan</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
	<td width='90' class='header_laporan' align='center'>No PTG</td>
  </tr>
 ";
		$nilai=0;$nilai_kas=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
			$tmp=explode(";",$row->ket_bmhd);
			$ket_bmhd="";
			// if($row->no_kas != '-'){
			// 	$kas = $row->nilai_kas;
			// }else{
			// 	$kas = 0;
			// }
			for ($j = 0; $j < count($tmp); $j++) {
				$ket_bmhd.=$tmp[$j]."<br>";
			}
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row->no_bmhd','$row->kode_lokasi','$row->periode');\">$row->no_bmhd</a></td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan' align='center'>$row->tgl</td>
	<td class='isi_laporan'>$row->kode_akun</td>
	<td class='isi_laporan'>$row->nama_titip</td>
	<td class='isi_laporan'>$row->kode_vendor</td>
	<td class='isi_laporan'>$row->nama_vendor</td>
	<td class='isi_laporan'>$row->bank</td>
	<td class='isi_laporan'>$row->no_rek</td>
	<td class='isi_laporan'>$row->keterangan</td>
<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,',','.')."</td>
	<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_bmhd','$row->kode_lokasi');\">".number_format(($row->nilai-$row->nilai_kas),0,',','.')."</a></td>
	<td class='isi_laporan'>$ket_bmhd</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='11'>Total</td>
<td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	<td class='header_laporan' align='right'>&nbsp;</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
