<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptSaldoProyek extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$jenis_lap="";
		if ($jenis=="OutStanding")
		{
			$jenis_lap=" and isnull(e.nilai,0)-isnull(f.nilai,0)<>0 ";
		}
		if ($jenis=="Lunas")
		{
			$jenis_lap=" and isnull(e.nilai,0)-isnull(f.nilai,0)=0 ";
		}
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,a.kode_proyek,c.nama as nama_proyek,d.nama as nama_cust,a.kode_pp,b.nama as nama_pp,
	   isnull(e.nilai,0) as nilai_bdd,isnull(e.nilai,0) as total,isnull(e.nilai,0)-isnull(f.nilai,0)-isnull(j.nilai,0) as saldo,
	   isnull(f.nilai,0)+isnull(j.nilai,0) as nilai_kas,
	   case when g.tanggal is not null then convert(varchar(20),g.tanggal,103) else convert(varchar(20),a.tanggal,103) end as tgl_kas,
	   datediff(day,a.tanggal,g.tanggal) as umur,i.alamat as alamatv,i.nama as namav,e.kode_akun as akun
from yk_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi
inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
inner join yk_pb_d h on h.no_pb=a.no_pb and h.kode_lokasi=a.kode_lokasi
inner join vendor i on h.kode_vendor=i.kode_vendor and h.kode_lokasi=i.kode_lokasi
left join (select a.no_pb,a.kode_akun,sum(a.nilai) as nilai
		   from yk_pb_j a
		   where a.kode_lokasi='$kode_lokasi'  and jenis='bmhd'
		   group by a.no_pb,a.kode_akun
		   )e on a.no_pb=e.no_pb
left join (select a.no_kas,sum(a.nilai) as nilai
		   from kas_m a
		   inner join yk_pb_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
		   group by a.no_kas
		   )f on a.no_kas=f.no_kas
left join (select a.no_pb,sum(a.nilai) as nilai
		   from yk_pb_j a
		   inner join yk_pb_m b on a.no_pb=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and a.modul='REVPB' and a.dc='C'
		   group by a.no_pb
		   )j on a.no_kas=j.no_pb
left join kas_m g on f.no_kas=g.no_kas 
$this->filter $jenis_lap and a.modul='PBPR'
order by a.no_pb";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bymhd dan hutang usaha",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>No PB</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>Kode Proyek</td>
	 <td width='100' rowspan='2' align='center' class='header_laporan'>No Dokumen</td>
     <td width='200' rowspan='2' align='center' class='header_laporan'>Perusahaan Pemberi Proyek</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Penerima Pembayaran (Vendor)</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>Alamat</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Mtp</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
     <td colspan='3'  align='center' class='header_laporan'>Nilai Permintaan Bayar</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>Pembayaran</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>Saldo</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Lunas</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Umur Lunas</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>BYMHD</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PPN</td>
	 <td width='90'  align='center' class='header_laporan'>Total Hutang</td>
	
     </tr>  ";
		$nilai_bdd=0;$nilai_kas=0;$nilai_ppn=0;$total=0;$saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_bdd+=$row->nilai_bdd;
			$nilai_kas+=$row->nilai_kas;
			$nilai_ppn+=$row->nilai_ppn;
			$total+=$row->total;
			$saldo+=$row->saldo;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_pb</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->nama_proyek</td>
	 <td class='isi_laporan'>$row->namav</td>
	 <td class='isi_laporan'>$row->alamatv</td>
	  <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bdd,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
	 <td class='isi_laporan' align='center'>".number_format($row->umur,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='10'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($nilai_bdd,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
	<td class='header_laporan'>&nbsp;</td>
	 <td class='header_laporan' align='center'>&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
