<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptSaldoIf extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
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
		$periode=$tmp[1];
		$sql="select b.kode_pp,b.nama as nama_pp,c.nik,c.nama as nama_kar,a.keterangan,a.akun_hutif,a.nilai,
 a.nilai-isnull(y.hutawal,0)+isnull(z.bayarawal,0) as saldoawal,isnull(yy.hutnow,0) as hutnow,isnull(zz.bayarnow,0) as bayarnow,
 a.nilai-isnull(y.hutawal,0)+isnull(z.bayarawal,0)-isnull(yy.hutnow,0)+isnull(zz.bayarnow,0) as saldoakhir from if_m a
 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
 inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
 left outer join (select nik_buat,kode_lokasi, sum(case when no_reim=concat(no_reim,'r') then nilai else nilai end) as hutawal
 from if_reim_m where kode_lokasi='24'  group by nik_buat,kode_lokasi) y on y.nik_buat=a.nik and y.kode_lokasi=a.kode_lokasi
 left outer join (select k.nik_buat,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarawal
 from kas_j i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi
 inner join if_reim_m k on i.no_kas=k.no_reim and i.kode_lokasi=k.kode_lokasi
 where i.kode_lokasi='24' and j.periode<'201710' group by k.nik_buat,i.kode_lokasi) z on z.nik_buat=a.nik and z.kode_lokasi=a.kode_lokasi
 left outer join (select nik_buat,kode_lokasi, sum(case when no_reim=concat(no_reim,'r') then nilai else nilai end) as hutnow 
from if_reim_m where kode_lokasi='24' group by nik_buat,kode_lokasi) yy on yy.nik_buat=a.nik and yy.kode_lokasi=a.kode_lokasi 
left outer join (select k.nik_buat,i.kode_lokasi, sum(case when j.no_kas=concat(j.no_del,'r') then -i.nilai else i.nilai end) as bayarnow
 from kas_j i inner join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi 
inner join if_reim_m k on i.no_kas=k.no_reim and i.kode_lokasi=k.kode_lokasi 
where i.kode_lokasi='24' and j.periode='201710'
 group by k.nik_buat,i.kode_lokasi) zz on zz.nik_buat=a.nik and zz.kode_lokasi=a.kode_lokasi
							$this->filter ";
							
							
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo imperst fund",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='100'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='100'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>NIK IF</td>
     <td width='150'  align='center' class='header_laporan'>Nama Karyawan</td>
	 <td width='90'  align='center' class='header_laporan'>Keterangan</td>
     <td width='150'  align='center' class='header_laporan'>Akun IF</td>
	 <td width='150'  align='center' class='header_laporan'>Nilai IF</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Awal IF</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai SPB Reim</td>
	 <td width='150'  align='center' class='header_laporan'>Nilai Pembayaran</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Akhir IF</td>
   </tr>  ";
		$nilai=0;$nilai_curr=0;$nilai_kas=0;$nilai_lain=0;$saldo=0;$nilai_ppn=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
			$nilai1=$nilai+$row->nilai;
			$totawal=$totawal+$row->saldoawal;
			$tothut=$tothut+$row->hutnow;
			$totbyr=$totbyr+$row->bayarnow;
			$totsaldo=$totsaldo+$row->saldoakhir;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>	
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama_kar</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->akun_if</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->saldoawal,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->hutnow,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->bayarnow,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->saldoakhir,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($nilai1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($totawal,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($tothut,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($totbyr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($totsaldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
