<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_hris_rptCutiKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql = "select count(a.nik)
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab $this->filter ";
		error_log($sql);
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
		$tahun=$tmp[0];
		$sts_cuti=$tmp[1];
		$nama_cuti=$tmp[2];
		$periode=$tmp[3];
		$bulan=$tmp[4];
		$sql = "select a.nik,a.nama,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,b.nama as jabatan,isnull(c.so_awal_lalu,0) as so_awal_lalu,
		isnull(c.so_awal,0) as so_awal1,isnull(g.so_awal,0)-isnull(f.sd,0)-isnull(e.debet,0)-isnull(c.kurang,0) as sd
from gr_karyawan a
inner join gr_jab b on a.kode_jab=b.kode_jab
left join (select nik,sum(jumlah) as so_awal,sum(kurang) as kurang,sum(tambah) as so_awal_lalu
		   from gr_cuti_karyawan
           where sts_cuti='$sts_cuti' and substring(periode,1,4)='$tahun'
           group by nik,sts_cuti
		   )c on a.nik=c.nik
left join (select nik,sum(lama) as debet
		   from gr_cuti_d
           where sts_cuti='$sts_cuti' and substring(periode,1,4)='$tahun'
           group by nik
		   )e on a.nik=e.nik
left join (select nik_buat,sum(lama) as sd
		   from gr_cuti
           where sts_cuti='$sts_cuti' and periode<='$periode'
           group by nik_buat
		   )f on a.nik=f.nik_buat
left join (select nik,sum(jumlah) as so_awal
		   from gr_cuti_karyawan
           where sts_cuti='$sts_cuti' and periode<='$periode' and substring(periode,1,4)='$tahun'
           group by nik,sts_cuti
		   )g on a.nik=g.nik
 $this->filter ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rincian ".$nama_cuti,$this->lokasi,"TAHUN ".$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='9' ><table width='700' border='0' cellspacing='2' cellpadding='1'>
      <tr >
        <td width='100' class='isi_laporan'>NIK</td>
        <td width='600' class='isi_laporan'>: $row->nik</td>
      </tr>
      <tr>
        <td class='isi_laporan'>Nama</td>
        <td class='isi_laporan'>: $row->nama</td>
      </tr>
      <tr>
        <td class='isi_laporan'>Jabatan</td>
        <td class='isi_laporan'>: $row->jabatan</td>
      </tr>
      <tr>
        <td class='isi_laporan'>Tanggal Masuk </td>
        <td class='isi_laporan'>: $row->tgl_masuk</td>
      </tr>
    </table></td>
  </tr>
    <tr>
    <td height='23' colspan='6' class='header_laporan' align='right'>Hak Cuti </td>
    <td class='header_laporan' align='center'>".number_format($row->so_awal_lalu,0,',','.')."</td>
	<td class='header_laporan' align='center'>".number_format($row->so_awal1,0,',','.')."</td>
	<td class='header_laporan' align='center'>".number_format($row->so_awal_lalu+$row->so_awal1,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Cuti</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='60' class='header_laporan' align='center'>Tgl Mulai</td>
     <td width='60' class='header_laporan' align='center'>Tgl Selesai</td>
    <td width='150' class='header_laporan' align='center'>Alasan</td>
	<td width='150' class='header_laporan' align='center'>Alamat</td>
    <td width='50' class='header_laporan' align='center'>Cuti Tahun Lalu</td>
	<td width='50' class='header_laporan' align='center'>Cuti Tahun Ini</td>
	<td width='50' class='header_laporan' align='center'>Jumlah Cuti</td>
  </tr>
  
";
			
			$sql="select 'SACUTI' as no_cuti,'2011-01-01' as tanggal,'2011-01-01' as tgl_mulai, date_format('2011-01-01','%d/%m/%Y') as tgl,'2011-01-01' as tgl_mulai1,'2011-01-01' as tgl_selesai,'Saldo awal cuti' as alasan,
			kurang as lama,0 as lama_lalu ,'-' as alamat
from gr_cuti_karyawan a
where a.nik='$row->nik' and a.sts_cuti='$sts_cuti' and a.kurang<>0 and substring(a.periode,1,4)='$tahun'
union all
select a.no_cuti,a.tanggal,a.tgl_mulai,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai1,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.alasan,
			a.lama,a.lama_lalu as lama_lalu,a.alamat
from gr_cuti a
where a.nik_buat='$row->nik' and a.sts_cuti='$sts_cuti' and substring(a.periode,1,4)='$tahun'
union all
select a.no_cuti,a.tanggal,a.tgl_mulai,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai1,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,a.alasan,
			a.lama,'0' as lama_lalu,'-' as alamat
from gr_cuti_d a
where a.nik='$row->nik' and a.sts_cuti='$sts_cuti' and substring(a.periode,1,4)='$tahun'
				order by a.tgl_mulai ";
			
			$rs1 = $dbLib->execute($sql);
			$lama=0;$lama_lalu=0;$jml_lama=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo - $row1->debet + $row1->kredit;	
				$lama=$lama+$row1->lama;
				$lama_lalu=$lama_lalu+$row1->lama_lalu;
				$jml_lama=$jml_lama+$row1->lama+$row1->lama_lalu;
				echo "<tr>
    <td class='isi_laporan'>".$row1->no_cuti."</td>
    <td height='23' class='isi_laporan'>".$row1->tgl."</td>
	<td class='isi_laporan'>".$row1->tgl_mulai1."</td>
	<td class='isi_laporan'>".$row1->tgl_selesai."</td>
	<td class='isi_laporan'>".$row1->alasan."</td>
	<td class='isi_laporan'>".$row1->alamat."</td>
	<td class='isi_laporan' align='center'>".number_format($row1->lama_lalu,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($row1->lama,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($row1->lama+$row1->lama_lalu,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='6' valign='top' class='isi_laporan' align='right'>Total Cuti&nbsp;</td>
   <td valign='top' class='isi_laporan' align='center'>".number_format($lama_lalu,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='center'>".number_format($lama,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='center'>".number_format($jml_lama,0,',','.')."</td>
  </tr>";
			echo "<tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Sisa Cuti Sd $bulan&nbsp;</td>
	<td class='header_laporan' align='center'>".number_format($row->sd,0,',','.')."</td>
  </tr>";
			echo "<tr>
    <td height='23' colspan='8' class='header_laporan' align='right'>Sisa Cuti Sd Desember&nbsp;</td>
  	<td class='header_laporan' align='center'>".number_format($row->so_awal1+$row->so_awal_lalu-$jml_lama,0,',','.')."</td>
  </tr>";
			echo "</table><br>";
			
			$i=$i+1;
		}
		
		return "";
	}
	
}
?>
