<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptKartuProyek extends server_report_basic
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
		$jenis=$tmp[2];

		
		$nama_file="kartu_proyek.xls";

		$sql="select  a.kode_proyek,a.kode_lokasi,a.nama,a.kode_pp,b.nama as nama_pp,c.nama as nama_cust,a.no_pks,
	   convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai,
	   a.nilai,a.nilai_or,a.kode_jenis
from spm_proyek a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_proyek ";

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
		}

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];

		echo "<div align='center'>"; 
		
		echo $AddOnLib->judul_laporan("kartu pengawasan proyek",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode PP</td>
        <td width='360' class='header_laporan'>: $row->kode_pp</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Nama PP</td>
        <td width='360' class='header_laporan'>: $row->nama_pp</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Kode Proyek</td>
        <td width='360' class='header_laporan'>: $row->kode_proyek</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Proyek</td>
        <td class='header_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>No. Kontrak </td>
        <td class='header_laporan'>: $row->no_pks</td>
      </tr>
      <tr>
        <td class='header_laporan'>Jenis </td>
        <td class='header_laporan'>: $row->kode_jenis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal Mulai </td>
        <td class='header_laporan'>: $row->tgl_mulai</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal Selesai </td>
        <td class='header_laporan'>: $row->tgl_selesai</td>
      </tr>
      <tr>
        <td class='header_laporan'>Customer </td>
        <td class='header_laporan'>: $row->nama_cust</td>
      </tr>	  
	   <tr>
        <td class='header_laporan'>Nilai Kontrak </td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nilai RAB </td>
        <td class='header_laporan'>: ".number_format($row->nilai_or,0,',','.')."</td>
      </tr>
	  
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
    <td  width='150' class='header_laporan' align='center'>No Bukti/PB</td>
	<td  width='100' class='header_laporan' align='center'>Tanggal</td>	
	<td  width='50' class='header_laporan' align='center'>Kode PP</td>	
    <td  width='100' class='header_laporan' align='center'>Nilai BDD</td>
	<td  width='100' class='header_laporan' align='center'>Reklas Ke Biaya</td>	
    <td  width='200' class='header_laporan' align='center'>Keterangan</td>
	";
			
// 	$sql="select  a.no_bukti, a.tgl,a.keterangan,isnull(a.bdd,0) as bdd,isnull(a.reklas,0) as reklas,isnull(a.bdd,0)-isnull(a.reklas,0) as saldo,a.kode_pp
// 	from (select a.no_bukti,convert(varchar(20),b.tanggal,103) as tgl,a.keterangan,case when a.dc='D' then a.nilai else -a.nilai end as bdd,0 as reklas,b.kode_pp
// from spm_proyek_bdd a
// inner join yk_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
// inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
// where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp'
// union all
// select a.no_reklas as no_bukti,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,0 as bdd,case when a.dc='D' then a.nilai else -a.nilai end as reklas,b.kode_pp
// from spm_proyek_reklas_d a
// inner join spm_proyek_reklas_m b on a.no_reklas=b.no_reklas and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
// inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi
// where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp'
// union all
// select a.no_bukti,convert(varchar(20),b.tanggal,103) as tgl,a.keterangan,case when a.dc='D' then a.nilai else -a.nilai end as bdd,0 as reklas,b.kode_pp
// from spm_proyek_bdd a
// inner join panjarptg2_m b on a.no_bukti=b.no_ptg and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
// inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
// where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp'
// 		)a
// 		order by convert(date, a.tgl, 103) asc

// 		";
	$sql="select  a.no_bukti, a.tgl,a.keterangan,isnull(a.bdd,0) as bdd,isnull(a.reklas,0) as reklas,isnull(a.bdd,0)-isnull(a.reklas,0) as saldo,a.kode_pp
	from (select a.no_bukti,convert(varchar(20),b.tanggal,103) as tgl,a.keterangan,case when a.modul not in ('REVAKRU','AKRU') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end as bdd,case when a.modul in ('REVAKRU','AKRU') then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end as reklas,b.kode_pp
			from spm_proyek_bdd a
			inner join yk_pb_m b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
			inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
			where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp' 
			union all
			select a.no_reklas as no_bukti,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,case when a.dc='D' and a.no_reklas like '%RBD%' or a.no_reklas like '%JU%' or a.no_reklas like '%BM%' then -a.nilai  when a.dc='C' and a.no_reklas like '%RBD%' or a.no_reklas like '%JU%' or a.no_reklas like '%BM%' then a.nilai else 0 end as bdd,case when a.dc='D' then a.nilai else -a.nilai end as reklas,b.kode_pp
			from spm_proyek_reklas_d a
			inner join spm_proyek_reklas_m b on a.no_reklas=b.no_reklas and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
			inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi
			where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp'
			union all
			select a.no_bukti,convert(varchar(20),b.tanggal,103) as tgl,a.keterangan,case when a.dc='D' then a.nilai else -a.nilai end as bdd,0 as reklas,b.kode_pp
			from spm_proyek_bdd a
			inner join panjarptg2_m b on a.no_bukti=b.no_ptg and a.kode_lokasi=b.kode_lokasi and b.kode_pp='$row->kode_pp'
			inner join spm_proyek c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=c.kode_lokasi 
			where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and c.kode_pp='$row->kode_pp'
		)a
		order by convert(date, a.tgl, 103) asc
		";
			
			$rs1 = $dbLib->execute($sql);
			$bdd=0; $reklas=0; $saldo=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$bdd+=$row1->bdd;
				$reklas+=$row1->reklas;
				$saldo=$saldo+$row1->bdd-$row1->reklas;
				echo "<tr>
	<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row1->no_bukti','$row->kode_lokasi');\">$row1->no_bukti</a></td>

    <td class='isi_laporan'>$row1->tgl</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan' align='right'>".number_format($row1->bdd,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->reklas,0,',','.')."</td>
    <td class='isi_laporan'>$row1->keterangan</td>
  </tr>";
			
			}
  
  			echo "<tr>
	<td class='header_laporan' colspan='3' align='center'>Total</td>
    <td class='header_laporan' align='right'>".number_format($bdd,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($reklas,0,',','.')."</td>
    <td class='header_laporan'>&nbsp;</td>
  </tr>";
    			echo "<tr>
	<td class='header_laporan' colspan='7' align='center'>&nbsp;</td>	
  </tr>";
  			echo "<tr bgcolor='#CCCCCC'>
	<td class='header_laporan' colspan='7' align='center'>Perhitungan Laba Rugi Proyek</td>	
  </tr>";
  			echo "<tr bgcolor='#CCCCCC'>
	<td class='header_laporan' colspan='2'align='center'>No. Bukti Piutang</td>			
	<td class='header_laporan'  align='center'>Tanggal</td>
	<td class='header_laporan' align='center'>Nilai</td>	
	<td class='header_laporan' colspan='3' align='center'>Keterangan</td>
  </tr>";
  
  $sql1="select d.no_piutang,e.keterangan as piu, a.kode_proyek,a.kode_lokasi,a.nama,d.kode_pp,a.kode_lokasi,
convert(varchar(20),e.tanggal,103) as tgl_selesai,case when d.dc='D' then f.nilai else -f.nilai end as npiu
 from spm_proyek a
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi 
inner join spm_piutang_d d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
inner join spm_piutang_m e on d.no_piutang=e.no_piutang and d.kode_lokasi=e.kode_lokasi 
left join (select no_piutang,kode_lokasi,dc,nilai,kode_akun from spm_piutang_j 
		   union
		   select no_ju as no_piutang,kode_lokasi,dc,nilai,kode_akun from ju_J 
		) f on d.no_piutang=f.no_piutang and d.kode_lokasi=f.kode_lokasi and substring(f.kode_akun,1,1) = '4' 
where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi' and e.no_piutang not like '01-nkp%' --and e.modul<>'rev'
group by f.nilai ,d.no_piutang,e.keterangan, a.kode_proyek,a.kode_lokasi,a.nama,d.kode_pp,a.tgl_selesai,d.dc,e.tanggal
order by a.kode_proyek ";

 			$rs2 = $dbLib->execute($sql1);
			$saldo=0; $piut=0;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
 				$piut+=$row2->npiu;
 				$reklas+=$row1->reklas;
 
  				echo "<tr>

	<td class='isi_laporan' colspan='2'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenJurnal('$row2->no_piutang','$row2->kode_lokasi');\">$row2->no_piutang</a></td>
    <td class='isi_laporan'>$row2->tgl_selesai</td>
	<td class='isi_laporan' align='right'>".number_format($row2->npiu,0,',','.')."</td>
    <td class='isi_laporan' colspan='3' align='left'>$row2->piu</td>
 </tr>";
			}
  			echo "<tr>
	<td class='header_laporan' colspan='3' align='right'>Jumlah Pendapatan</td>
    <td class='header_laporan' align='right'>".number_format($piut,0,',','.')."</td>
    <td class='header_laporan' colspan='3'>&nbsp;</td> 
 </tr>";
  			echo "<tr>
	<td class='header_laporan' colspan='3' align='right'>Jumlah Biaya</td>
    <td class='header_laporan' align='right'>".number_format($reklas,0,',','.')."</td>
    <td class='header_laporan' colspan='3'>&nbsp;</td>
  </tr>";
  
    			echo "<tr>
	<td class='header_laporan' colspan='3' align='right'>Net Profit</td>
    <td class='header_laporan' align='right'>".number_format($piut-$reklas,0,',','.')."</td>
    <td class='header_laporan' colspan='3'>&nbsp;</td>
  </tr>";
    			echo "<tr>
	<td class='header_laporan' colspan='3' align='right'>Operating Ratio</td>
    <td class='header_laporan' align='right'>".number_format($reklas/$piut*100,0,',','.')."%</td>
    <td class='header_laporan' colspan='3'>&nbsp;</td>
  </tr>";			
			echo "

 </table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
