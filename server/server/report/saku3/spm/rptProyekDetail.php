<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptProyekDetail extends server_report_basic
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
		$sql="select a.kode_proyek,a.kode_lokasi,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_or,a.nama,a.kode_jenis,d.nama as nama_jenis,a.no_pks,
a.kode_pp,c.nama as nama_pp ,convert(varchar(20),a.tgl_mulai,103) as tgl_mulai,convert(varchar(20),a.tgl_selesai,103) as tgl_selesai
from spm_proyek a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join spm_proyek_jenis d on a.kode_jenis=d.kode_jenis and a.kode_lokasi=d.kode_lokasi
$this->filter 
order by a.kode_proyek";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data proyek detail",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='99' class='header_laporan'>Kode Proyek</td>
        <td width='360' class='header_laporan'>: $row->kode_proyek</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>No Kontrak</td>
        <td width='360' class='header_laporan'>: $row->no_pks</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Keterangan</td>
        <td width='360' class='header_laporan'>: $row->nama</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Cabang</td>
        <td width='360' class='header_laporan'>: $row->kode_pp - $row->nama_pp</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nama Customer </td>
        <td class='header_laporan'>: $row->nama_cust</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Jangka Waktu Mulai</td>
        <td width='360' class='header_laporan'>: $row->tgl_mulai Sd $row->tgl_selesai</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>Jenis</td>
        <td width='360' class='header_laporan'>: $row->nama_jenis</td>
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
   <tr >
    <td height='23' colspan='7' class='header_laporan'><table width='600' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='4' class='header_laporan'>Rincian Pendapatan </td>
        </tr>
      <tr bgcolor='#CCCCCC'>
        <td width='31' align='center' class='header_laporan'>No</td>
        <td width='86' align='center' class='header_laporan'>Kode PP </td>
        <td width='253' align='center' class='header_laporan'>Nama PP </td>
        <td width='112' align='center' class='header_laporan'>Nilai</td>
      </tr>";
		$sql="select a.kode_proyek,a.kode_lokasi,a.kode_pp,b.nama as nama_pp,a.nilai
from spm_proyek_pdpt a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_pp";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0; $i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->kode_pp</td>
        <td class='isi_laporan'>$row1->nama_pp</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
				$i=$i+1;
			}
    echo "</table></td>
  </tr>
  <tr >
    <td height='23' colspan='7' class='header_laporan'><table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr> 
        <td colspan='5' class='header_laporan'>Rincian Beban </td>
      </tr>
      <tr bgcolor='#CCCCCC'>
        <td width='35' align='center' class='header_laporan'>No</td>
        <td width='83' align='center' class='header_laporan'>Kode Akun </td>
        <td width='220' align='center' class='header_laporan'>Nama Akun </td>
        <td width='235' align='center' class='header_laporan'>Keterangan</td>
        <td width='105' align='center' class='header_laporan'>Nilai</td>
      </tr>";
	  $sql="select a.kode_proyek,a.kode_lokasi,a.kode_akun,b.nama as nama_akun,a.keterangan,a.nilai
from spm_proyek_beban a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_proyek='$row->kode_proyek' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_akun";
			
			$rs1 = $dbLib->execute($sql);
			$nilai=0; $i=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
      echo "<tr>
       <td class='isi_laporan' align='center'>$i</td>
        <td class='isi_laporan'>$row1->kode_akun</td>
        <td class='isi_laporan'>$row1->nama_akun</td>
		 <td class='isi_laporan'>$row1->keterangan</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
				$i=$i+1;
			}
    echo "</table></td>
  </tr>
 </table><br>";
			
			
		}
		return "";
	}
	
}
?>
