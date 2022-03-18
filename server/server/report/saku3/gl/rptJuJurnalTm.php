<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptJuJurnalTm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$jenis=$tmp[1];
		$periode2=$tmp[2];
		$jenis2=$tmp[3];
		$nama_file="jurnalsap_".$periode.".xls";
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		if ($jenis=="Range")
		{
			$nama_periode="Periode ".$AddOnLib->ubah_periode($periode)." Sd ".$AddOnLib->ubah_periode($periode2);
		}
		if ($jenis=="All")
		{
			$nama_periode="Semua Periode";
		}
		if ($jenis2=="Excell")
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
		$sql="select a.no_bukti,a.no_dokumen,c.nama_sap as nama_akun,c.akun_sap,a.kode_akun,b.nama as akuntm,a.kode_pp,a.keterangan,a.modul,convert(varchar(10),a.tanggal,103) as tgl,
		case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,
		case when d.kode_cust is null then f.kode_cust else d.kode_cust end as kode_cust,e.akun_vendor, h.kode_sap 
from gldt a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
left join tm_akun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join piutang_m d on a.no_bukti=d.no_piutang and a.kode_lokasi=d.kode_lokasi
left join tm_akun_vendor e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
left join tm_hutang_m g on a.no_bukti=g.no_hutang and a.kode_lokasi=g.kode_lokasi
left join vendor h on h.kode_vendor=g.kode_vendor and a.kode_lokasi=g.kode_lokasi
left join (select a.no_bukti,a.kode_lokasi,b.kode_cust,b.akun_piutang
from piubayar_d a
inner join piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
$this->filter
group by a.no_bukti,a.kode_lokasi,b.kode_cust,b.akun_piutang
		)f on a.no_bukti=f.no_bukti and a.kode_lokasi=f.kode_lokasi and a.kode_akun=f.akun_piutang
$this->filter
union all
select a.no_bukti,a.no_dokumen,b.nama as nama_akun,c.akun_sap,a.kode_akun,b.nama as akuntm,a.kode_pp,a.keterangan,a.modul,convert(varchar(10),a.tanggal,103) as tgl,
		case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,d.kode_cust ,e.akun_vendor, h.kode_sap  
from gldt_h a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
left join tm_akun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join piutang_m d on a.no_bukti=d.no_piutang and a.kode_lokasi=d.kode_lokasi
left join tm_akun_vendor e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
left join tm_hutang_m g on a.no_bukti=g.no_hutang and a.kode_lokasi=g.kode_lokasi
left join vendor h on h.kode_vendor=g.kode_vendor and a.kode_lokasi=g.kode_lokasi
left join (select a.no_bukti,a.kode_lokasi,b.kode_cust,b.akun_piutang
from piubayar_d a
inner join piutang_m b on a.no_piutang=b.no_piutang and a.kode_lokasi=b.kode_lokasi
$this->filter
group by a.no_bukti,a.kode_lokasi,b.kode_cust,b.akun_piutang
		)f on a.no_bukti=f.no_bukti and a.kode_lokasi=f.kode_lokasi and a.kode_akun=f.akun_piutang
$this->filter
order by no_bukti ";
		//error_log($sql);	
		$rs = $dbLib->execute($sql);
		
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TRANSAKSI JURNAL SAP",$this->lokasi,$nama_periode);
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak' width='1300'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='100' class='header_laporan' align='center'>No Bukti</td>
	<td width='100' class='header_laporan' align='center'>No Dokumen</td>
    <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='70' height='25' class='header_laporan' align='center'>Akun TM</td>
	<td width='70' height='25' class='header_laporan' align='center'>Akun SAP</td>
	<td width='70' class='header_laporan' align='center'>Akun Customer</td>
	<td width='70' class='header_laporan' align='center'>Akun Vendor</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun TM</td>
    <td width='200' class='header_laporan' align='center'>Nama Akun SAP</td>
    <td width='40' class='header_laporan' align='center'>PP</td>
	<td width='60' class='header_laporan' align='center'>Modul</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_bukti; 
			if ($tmp!=$row->no_bukti)
			{
				$tmp=$row->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='12' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tgl</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>$row->akun_sap</td>
	<td valign='middle' class='isi_laporan'>$row->kode_cust</td>
	<td valign='middle' class='isi_laporan'>$row->kode_sap</td>
	<td valign='middle' class='isi_laporan'>$row->akuntm</td>
	<td valign='middle' class='isi_laporan'>".$row->nama_akun."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
	<td valign='middle' class='isi_laporan' align='center'>$row->modul</td>
    <td valign='middle' class='isi_laporan'>".$row->keterangan."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='13' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	
}
?>
