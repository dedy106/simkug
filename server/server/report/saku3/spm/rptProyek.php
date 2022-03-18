<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptProyek extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$nama_cab=$tmp[0];
		$kode_lokasi=$tmp[1];
		$status=explode(".",$tmp[2]);
		
		if($tmp[2] != ""){
			$filterstatus=" and a.flag_aktif = '".$status[0]."' ";
		}else{
			$filterstatus="";
		}

		$sql="select a.kode_proyek,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
isnull(e.bdd,0) as bdd,a.nilai_or-isnull(e.bdd,0) as saldo,sum(case when f.dc='D' then f.nilai else -f.nilai end) as npiu,isnull(h.reklas,0) as reklas,case a.flag_aktif when '0' then 'CLOSE' when '1' then 'OGP' when '2' then 'BATAL' when '3' then 'MASALALU' else '-' end as status_proyek 
from spm_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join spm_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as bdd 
          from spm_proyek_bdd 
		  where kode_lokasi='$kode_lokasi' 
		  group by kode_proyek,kode_lokasi
		  ) e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
left join spm_piutang_d f on a.kode_proyek=f.kode_proyek and a.kode_lokasi=f.kode_lokasi 
left join spm_piutang_m g on f.no_piutang=g.no_piutang and f.kode_lokasi=g.kode_lokasi
   left join (select kode_proyek,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as reklas 
from spm_proyek_reklas_d
 where kode_lokasi='$kode_lokasi' 
group by kode_proyek,kode_lokasi ) h on a.kode_proyek=h.kode_proyek and a.kode_lokasi=h.kode_lokasi 
$this->filter $filterstatus
group by h.reklas,a.kode_proyek,a.kode_cust,b.nama,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama,a.no_pks,a.kode_pp,c.nama,a.tgl_mulai,a.tgl_selesai,e.bdd,a.flag_aktif
order by a.kode_proyek";

// echo $sql;
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,$nama_cab);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='150'  align='center' class='header_laporan'>Nama PP</td>
     <td width='80'  align='center' class='header_laporan'>Kode Proyek</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	  <td width='150'  align='center' class='header_laporan'>No Kontrak</td>
	 <td width='100'  align='center' class='header_laporan'>Jenis</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='200'  align='center' class='header_laporan'>Customer</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Kontrak</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Cash Out</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo BDD</td>
	 <td width='90'  align='center' class='header_laporan'>Reklas ke Biaya</td>
	 <td width='110'  align='center' class='header_laporan'>Sisa Saldo BDD</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo RAB</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan</td>
	 <td width='80'  align='center' class='header_laporan'>Status</td>
	 
      </tr>  ";
		$nilai=0;  $nilai_or=0; $bdd=0; $saldo=0; $piu=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_or+=$row->nilai_or;
			$bdd+=$row->bdd;
			$saldo+=$row->saldo;
			$npiu=$row->npiu;
			if($npiu < 0){
				$npiu = 0;
			}
			$piu+=$npiu;
			
			
			$sisa=$row->bdd-$row->reklas;
			$sisa2+=$sisa;
			$reklas+=$row->reklas;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->kode_proyek</td>
	  <td class='isi_laporan'>$row->nama</td>
	  <td class='isi_laporan'>$row->no_pks</td>
	  <td class='isi_laporan'>$row->nama_jenis</td>
	 <td class='isi_laporan'>$row->tgl_mulai</td>
	 <td class='isi_laporan'>$row->tgl_selesai</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_or,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bdd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bdd,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->reklas,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($npiu,0,",",".")."</td>
	<td class='isi_laporan'>".strtoupper($row->status_proyek)."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='10'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bdd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($bdd,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($reklas,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa2,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
	   <td class='header_laporan' align='right'>".number_format($piu,0,",",".")."</td>
	   <td class='header_laporan'>&nbsp;</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
