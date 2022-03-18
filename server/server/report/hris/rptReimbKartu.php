<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_hris_rptReimbKartu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$sql = "select count(a.nik)
from gr_karyawan a   
inner join (select distinct nik_buat as nik from gr_kes_m 
			where kode_lokasi='01' and substring(periode,1,4)='$tahun')b on a.nik=b.nik 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi=e.kode_lokasi
inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=f.kode_lokasi $this->filter";
		
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
		
		$sql = "select a.nik,a.nama,e.nama as nama_jab,f.nama as nama_dept, 
	   isnull(c.gg,0) as tgg,isnull(c.kd,0) as tks,isnull(c.km,0) as tkm,isnull(c.ma,0) as tma,isnull(c.pk,0) as tpk
from gr_karyawan a   
left join (select distinct nik_buat as nik from gr_kes_m 
			where kode_lokasi='01' and substring(periode,1,4)='$tahun')b on a.nik=b.nik 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi=e.kode_lokasi
inner join gr_dept f on a.kode_dept=f.kode_dept and a.kode_lokasi=f.kode_lokasi
left join (select y.nik,sum(case x.kode_jenis when 'GG' then x.nilai else 0 end) as gg, 
				  sum(case x.kode_jenis when 'KD' then x.nilai else 0 end) as kd, 
		  sum(case x.kode_jenis when 'KM' then x.nilai else 0 end) as km, 
		  sum(case x.kode_jenis when 'MA' then x.nilai else 0 end) as ma,
			sum(case x.kode_jenis when 'PK' then x.nilai else 0 end) as pk 
		   from gr_kes_param x 
		   inner join gr_karyawan y on x.kode_grade=y.kode_grade and x.kode_lokasi=y.kode_lokasi 
          inner join gr_jab z on y.kode_jab=z.kode_jab and y.kode_lokasi=z.kode_lokasi and x.kode_klpjab=z.kode_klpjab 
	   where x.kode_lokasi='01' and x.tahun='$tahun'
		   group by y.nik 
		   )c on a.nik=c.nik $this->filter";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu reimburse ",$this->lokasi,"TAHUN ".$tahun);
		while ($row = $rs->FetchNextObject($toupper=false))
		{	
			$tgg=$row->tgg;
			$tks=$row->tks;
			$tkm=$row->tkm;
			$tma=$row->tma;
			$tpk=$row->tpk;
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
        <td class='isi_laporan'>: $row->nama_jab</td>
      </tr>
      <tr>
        <td class='isi_laporan'>Departemen </td>
        <td class='isi_laporan'>: $row->nama_dept</td>
      </tr>
    </table></td>
  </tr>
    <tr>
    <td height='23' colspan='3' class='header_laporan' align='right'>Plafon </td>
    <td class='header_laporan' align='right'>".number_format($row->tgg,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($row->tks,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($row->tkm,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($row->tma,0,',','.')."</td>
	<td class='header_laporan' align='right'>".number_format($row->tpk,0,',','.')."</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='23' class='header_laporan' align='center'>No Cuti</td>
    <td width='60' class='header_laporan' align='center'>Tanggal</td>
    <td width='200' class='header_laporan' align='center'>Keterangan</td>
	<td width='50' class='header_laporan' align='center'>Gigi</td>
	<td width='50' class='header_laporan' align='center'>Kedukaan</td>
	<td width='50' class='header_laporan' align='center'>Kacamata</td>
	<td width='50' class='header_laporan' align='center'>Melahirkan</td>
	<td width='50' class='header_laporan' align='center'>Pernikahan</td>
  </tr>
  
";
			
			$sql="select a.no_kes,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
						case b.kode_jenis when 'GG' then nilai else 0 end as gg,
						case b.kode_jenis when 'KD' then nilai else 0 end as ks,
						case b.kode_jenis when 'KM' then nilai else 0 end as km,
						case b.kode_jenis when 'MA' then nilai else 0 end as ma,
						case b.kode_jenis when 'PK' then nilai else 0 end as pk
from gr_kes_m a
inner join gr_kes_d b on a.no_kes=b.no_kes and a.kode_lokasi=b.kode_Lokasi
where b.nik='$row->nik' and substring(a.periode,1,4)='$tahun'";
			
			$rs1 = $dbLib->execute($sql);
			$gg=0;$ks=0;$km=0;$ma=0;$pk=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$gg=$gg+$row1->gg;
				$ks=$ks+$row1->ks;
				$km=$km+$row1->km;
				$ma=$ma+$row1->ma;
				$pk=$pk+$row1->pk;
				echo "<tr>
    <td class='isi_laporan'>".$row1->no_kes."</td>
    <td height='23' class='isi_laporan'>".$row1->tgl."</td>
	<td class='isi_laporan'>".$row1->keterangan."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->gg,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->ks,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->km,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->ma,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row1->pk,0,',','.')."</td>
  </tr>";
				
			}
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Total &nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($gg,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($ks,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($km,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($ma,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($pk,0,',','.')."</td>
  </tr>";
			echo "<tr>
   <td height='23' colspan='3' valign='top' class='isi_laporan' align='right'>Saldo &nbsp;</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($tgg-$gg,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($tks-$ks,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($tkm-$km,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($tma-$ma,0,',','.')."</td>
   <td valign='top' class='isi_laporan' align='right'>".number_format($tpk-$pk,0,',','.')."</td>
  </tr>";
			echo "</table><br>";
			
			$i=$i+1;
		}
		
		return "";
	}
	
}
?>
