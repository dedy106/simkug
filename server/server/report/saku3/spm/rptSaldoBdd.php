<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptSaldoBdd extends server_report_basic
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
		
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,a.kode_proyek,c.nama as nama_proyek,d.nama as nama_cust,a.kode_pp,b.nama as nama_pp,
	   isnull(e.nilai,0) as nilai_bdd,i.alamat as alamatv,i.nama as namav,e.kode_akun as akun
from yk_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi
inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
inner join yk_pb_d h on h.no_pb=a.no_pb and h.kode_lokasi=a.kode_lokasi
inner join vendor i on h.kode_vendor=i.kode_vendor and h.kode_lokasi=i.kode_lokasi
left join (select a.no_pb,a.kode_akun,sum(a.nilai) as nilai
		   from yk_pb_j a
		   where a.kode_lokasi='$kode_lokasi'  and jenis='BEBAN'
		   group by a.no_pb,a.kode_akun
		   )e on a.no_pb=e.no_pb
left join (select a.no_pb,sum(a.nilai) as nilai
		   from yk_pb_j a
		   inner join yk_pb_m b on a.no_pb=b.no_kas and a.kode_lokasi=b.kode_lokasi
		   where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode' and a.modul='REVPB' and a.dc='C'
		   group by a.no_pb
		   )j on a.no_kas=j.no_pb
$this->filter and a.modul='PBPR'
order by a.no_pb,a.kode_proyek,e.kode_akun";
// echo $sql;

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bymhd dan hutang usaha",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'    align='center' class='header_laporan'>No</td>
	 <td width='150'   align='center' class='header_laporan'>No PB</td>
	 <td width='100'   align='center' class='header_laporan'>Kode Proyek</td>
     <td width='300'   align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200'   align='center' class='header_laporan'>Vendor</td>
	 <td width='60'   align='center' class='header_laporan'>Mtp</td>
     <td width='90'   align='center' class='header_laporan'>Kode PP</td>
	 <td width='90'   align='center' class='header_laporan'>Nilai</td>
   </tr>
     ";
		$nilai_bdd=0;$nilai_kas=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_bdd+=$row->nilai_bdd;
			$nilai_kas+=$row->nilai_kas;
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_pb</td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->nama_proyek</td>
	 <td class='isi_laporan'>$row->namav</td>
	  <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bdd,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='right' colspan='8'>".number_format($nilai_bdd,0,",",".")."</td>
		</tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
