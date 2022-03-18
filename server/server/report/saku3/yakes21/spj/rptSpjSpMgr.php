<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_yakes21_spj_rptSpjSpMgr extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_spj)
from yk_spj_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik 
inner join karyawan d on a.nik_app=d.nik  $this->filter";
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
		$nama_ver=$tmp[0];
	$sql="select substring(a.periode,1,4) as tahun,a.no_spj,datepart(day,a.tanggal) as tgl_cuti,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,
       datepart(year,a.tanggal) as tahun,a.tanggal,a.kode_pp,a.nik_perintah as nik_gar,e.nama as nama_nikgar,datepart(day,a.tanggal) as tgl,
       a.nik_buat,a.nama_spj as nama,a.keterangan,b.nama as nama_pp,a.nik_app,d.nama as nama_app,
	   c.jabatan,a.transport,a.harian,a.transport+a.harian as total,a.kode_lokasi,a.keterangan,'-' as dasar,c.grade,f.nama as lokasi,
	   a.akun_uhar,g.nama as nama_akun,isnull(h.lama,0) as lama,d.jabatan as jab_app,
	   a.nik_perintah,i.nama as nama_perintah,a.jabatan as jab_perintah,h.tgl_mulai,h.tgl_selesai,a.tempat,f.kota
	   --,dbo.fnSpjTujuan(a.no_spj) as tujuan,dbo.fnSpjAngkutan(a.no_spj) as angkutan
from yk_spj_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik 
inner join karyawan d on a.nik_app=d.nik 
inner join karyawan e on a.nik_perintah=e.nik 
inner join karyawan i on a.nik_perintah=i.nik 
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
inner join masakun g on a.akun_uhar=g.kode_akun and a.kode_lokasi=g.kode_lokasi
left join (select no_spj,kode_lokasi,sum(lama) as lama,min(tgl_mulai) as tgl_mulai,max(tgl_selesai) as tgl_selesai
		   from yk_spj_dh
		   group by no_spj,kode_lokasi
		  )h on  a.no_spj=h.no_spj and a.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_spj";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$lama=number_format($row->lama,0,',','.');
			$harian=number_format($row->harian,0,',','.');
			$total=number_format($row->total,0,',','.');
			$terbilang=$AddOnLib->terbilang2($row->total);
			$lama=$AddOnLib->terbilang($row->lama);
			$lama=str_replace("Rupiah", "", $lama);
			echo "<table width='800' border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td><table width='800'  border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td ><table width='800' border='0' cellpadding='1' cellspacing='1'>
      <tr>
        <td width='550' align='right'>LAMPIRAN III : </td>
        <td width='250'>KEPUTUSAN DIREKTUR </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>YAYASAN KESEHATAN PEGAWAI TELKOM </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>NOMOR : KD.27/PS330/YAKES-00/2008</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>TANGGAL : 18 JUNI 2008 </td>
      </tr>
    
      <tr align='center'>
        <td colspan='2' class='judul_form'>&nbsp;</td>
      <tr align='center'>
        <td colspan='2' class='judul_form'>&nbsp;</td>
      <tr align='center'>
        <td colspan='2' class='judul_form'><u>SURAT PERINTAH PERJALANAN DINAS</u></td>
	<tr align='center'>
        <td colspan='2' class='judul_form'>NOMOR : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ PS330/YAKES/$row->tahun </td>
  </tr>
</table></td>
  </tr>
 <tr>
    <td>&nbsp; </td>
  </tr>
  <tr>
    <td>&nbsp; </td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21' height='30'>1</td>
            <td width='250'>Nama / NIK </td>
            <td >: $row->nama /  $row->nik_buat</td>
           
          </tr>
		  
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21' height='30'>2</td>
            <td width='250'>Band Individu  / Jabatan </td>
            <td>: $row->grade / $row->jabatan </td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21' height='30'>3</td>
            <td width='250'>Maksud / Tugas Perjalanan Dinas </td>
            <td>: $row->keterangan </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21'>4</td>
            <td width='250'>Rute Perjalanan Dinas tempat yang dituju  </td>
            <td>: $row->tempat </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Angkutan yang digunakan </td>
            <td>: KA / BUS / TAXI /PLANE / DINAS </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21'>5</td>
            <td width='250'>a. Lama Waktu Perjalanan Dinas </td>
            <td>: ".number_format($row->lama,0,',','.')." ( $lama ) hari</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>b. Berangkat / Kembali </td>
            <td>: ".substr($row->tgl_mulai,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tgl_mulai),0,6))."  s/d ".substr($row->tgl_selesai,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tgl_selesai),0,6))." </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='21'>6</td>
            <td width='250'>Beban Anggaran </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>a. Nomor Perkiraan </td>
            <td>: $row->akun_uhar / $row->nama_akun </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>b. Kode Lokasi </td>
            <td>: $row->lokasi </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
   <tr>
    <td>&nbsp; </td>
  </tr>
  <tr>
    <td>CATATAN : </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width='457'>&nbsp;</td>
            <td width='333'>$row->kota , $row->tgl $bulan $row->tahun </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Yang memberi perintah </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>$row->jab_perintah</td>
          </tr>

          <tr>
            <td>&nbsp;</td>
            <td height='50'>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><u>$row->nama_perintah</u></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>NIK.$row->nik_perintah</td>
          </tr>
        </table>
    </td>
  </tr>
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
