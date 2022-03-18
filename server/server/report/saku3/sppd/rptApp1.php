<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptApp1 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_aju)
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.no_spj,a.nilai_trans,a.nilai_uhar ,e.status,e.form,e.no_app,e.no_bukti,a.no_spj as no_bukti,
		convert(varchar,d.tgl_mulai,103) as tglawal, convert(varchar,d.tgl_selesai,103) as tglakhir,c.nama as pp,b.keterangan,a.tempat, 
		a.nik_spj,a.nama_spj as nik,a.no_app1,convert(varchar,a.tgl_input,101) as tglinput, 
		a.kode_pp,a.nik_app2,a.nik_app1,a.kode_lokasi,h.nama as app1
		from sp_spj_m a 
		inner join sp_perintah_m b on a.no_perintah = b.no_perintah and a.kode_lokasi=b.kode_lokasi 
		inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi 
		inner join ( 					
			select no_spj,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai 
			from sp_spj_dh 
			 group by no_spj 						
		) d on a.no_spj=d.no_spj
inner join sp_spj_app_m e on a.no_spj=e.no_bukti and e.kode_lokasi=a.kode_lokasi  and e.status in ('1','R','Z') and e.form ='APPATS' and e.no_flag='-'
inner join karyawan h on a.nik_app1=h.nik and a.kode_lokasi=h.kode_lokasi 

$this->filter and a.progress in ('1','R','Z')
order by a.no_spj";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
      echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr ><table width='800'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
      <td colspan='2' align='center'><br><b>DATA APPROVE 1</b><br></br></td>
        <tr>
        
        <td ><table width='800' border='0' cellpadding='1' cellspacing='1'>
    
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
  <tr>
    <td width='200'>No PD</td>
    <td width='600'>: $row->no_spj </td>
  </tr>
  <tr>
    <td width='200'>No App</td>
    <td width='600'>: $row->no_app </td>
  </tr>
  <tr>
    <td>NIK App</td>
    <td>: $row->nik_app1  </td>
  </tr>
  <tr>
    <td>Tanggal Mulai</td>
    <td>:  $row->tglawal </td>
  </tr>
  <tr>
    <td>Tanggal Selesai</td>
    <td>: $row->tglakhir </td>
  </tr>
  <tr>
    <td>PP Perintah</td>
    <td>: $row->kode_pp - $row->pp </td>
  </tr>
  <tr>
    <td>Maksud/Tujuan</td>
    <td>: $row->keterangan </td>
  </tr> 
   <tr>
  <td>NIK PD</td>
  <td>: $row->nik_spj - $row->nik  </td>
</tr>
<tr>
<td>Total Transport</td>
<td>: ".number_format($row->nilai_trans,0,",",".")."</td>
</tr>
<tr>
<td>Total Uang Harian</td>
<td>: ".number_format($row->nilai_uhar,0,",",".")."</td>
</tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td colspan='2'>Bandung, ".$row->tglinput." </td>
  </tr>
 
  <tr>
    <td>Dibuat Oleh : </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'>NIK App </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nik_app1</td>
      </tr>
      <tr>
      <td>$row->app1</td>
    </tr>

    </table></td>
  </tr>
</table>
</table><br>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
