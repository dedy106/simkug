<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_pbh_rptPbSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tahun=substr($tmp[0],0,4);
		$jenis=$tmp[3];
		
		$status=$tmp[2];
		if($status == "Belum"){
			$filterstatus = "and a.nilai-isnull(c.nilai,0) <> 0 ";
		}else if($status == "Lunas"){
			$filterstatus = "and a.nilai-isnull(c.nilai,0) = 0 ";
		}else{
			$filterstatus = "";
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$nama_file="saldo_pb_".$periode.".xls";
		$sql="select a.no_pb,a.kode_lokasi,a.keterangan,a.nilai,a.kode_pp,b.nama as nama_pp,a.nik_user,g.nama as nama_user,
		a.akun_hutang,d.nama as nama_akun,convert(varchar(20),a.tanggal,103) as tgl_pb,e.kode_vendor,f.nama as nama_v,
isnull(c.nilai,0) as bayar, a.nilai-isnull(c.nilai,0) as saldo,isnull(c.no_kas,'-') as no_kas 
from yk_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun d on a.akun_hutang=d.kode_akun and a.kode_lokasi=d.kode_lokasi
inner join yk_pb_d e on a.no_pb=e.no_pb and a.kode_lokasi=e.kode_lokasi
inner join vendor f on f.kode_vendor=e.kode_vendor and f.kode_lokasi=e.kode_lokasi
inner join karyawan g on a.nik_user=g.nik and a.kode_lokasi=g.kode_lokasi
left join (select a.no_pb,a.kode_lokasi,sum(a.nilai) as nilai,b.no_kas
		   from yk_pb_m a
		   inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode' 
		   group by a.no_pb,a.kode_lokasi,b.no_kas
		   
		   union all
		   
		   select a.no_pb,a.kode_lokasi,sum(a.nilai) as nilai,b.no_ju
		   from yk_pb_m a
		   inner join ju_m b on a.no_kas=b.no_ju and a.kode_lokasi=b.kode_lokasi	   
		   where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode' 
		   group by a.no_pb,a.kode_lokasi,b.no_ju

		   union all
		   
		   select a.no_pb,a.kode_lokasi,sum(a.nilai) as nilai,b.no_bukti
		   from yk_pb_m a
		   inner join trans_m b on a.no_kas=b.no_bukti and a.kode_lokasi=b.kode_lokasi	   
		   where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode' 
		   group by a.no_pb,a.kode_lokasi,b.no_bukti
		   
		   union all
		   
		   select a.no_pb,a.kode_lokasi,sum(a.nilai) as nilai,b.no_pb
		   from yk_pb_m a
		   inner join yk_pb_m b on a.no_kas=b.no_pb and a.kode_lokasi=b.kode_lokasi	   
		   where a.kode_lokasi='$kode_lokasi' and b.periode<='$periode' 
		   group by a.no_pb,a.kode_lokasi,b.no_pb 
		   
		  ) c on a.no_pb=c.no_pb and a.kode_lokasi=c.kode_lokasi
		  
$this->filter and a.modul<>'REVPB' $filterstatus
order by a.no_pb ";
		
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
			$rs = $dbLib->execute($sql);
		}
		else
		{
			$rs = $dbLib->execute($sql);
		}
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo Permintaan Bayar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='60'  align='center' class='header_laporan'>Nik Buat</td>
	 <td width='80'  align='center' class='header_laporan'>Akun Hutang</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Kode Vendor</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Vendor</td>
   <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai PB</td>
	 <td width='90'  align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
	 <td width='90'  align='center' class='header_laporan'>No KasBank</td>
	  </tr> ";
		$bayar=0;$saldo=0;$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bayar+=$row->bayar;
			$saldo+=$row->saldo;
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPb('$row->no_pb','$row->kode_lokasi');\">$row->no_pb</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl_pb</td>
	<td class='isi_laporan'>$row->nama_user</td>
	<td class='isi_laporan'>$row->akun_hutang</td>
	<td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>".ucwords(strtolower($row->nama_pp))."</td>
	 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenVendor('$row->kode_vendor','$row->kode_lokasi');\">$row->kode_vendor</a></td>
	 <td class='isi_laporan'>$row->nama_v</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	 <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
	   </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='11'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
	  <td class='header_laporan' align='center'>&nbsp;</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
