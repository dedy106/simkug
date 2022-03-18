<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptKaryawan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.nik)
from gr_karyawan a 
inner join gr_prov b on a.kode_prov=b.kode_prov 
inner join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi 
inner join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi = d.kode_lokasi 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi 
inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi 
inner join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi 
inner join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi 
inner join gr_dept i on a.kode_dept=i.kode_dept and a.kode_lokasi = i.kode_lokasi 
inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi = j.kode_lokasi 
inner join gr_vendor k on a.kode_vendor=k.kode_vendor and a.kode_lokasi = k.kode_lokasi 
inner join gr_status_bank l on a.sts_bank=l.sts_bank and a.kode_lokasi = l.kode_lokasi
inner join gr_jur m on a.kode_jur=m.kode_jur and a.kode_lokasi=m.kode_lokasi $this->filter ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$sql="select a.nik,a.kode_lokasi,a.kode_prov,b.nama as nama_prov,a.no_ktp,a.nama,a.tempat, date_format(a.tgl_lahir,'%d/%m/%Y') as tgl_lahir,a.alamat,a.kota,a.kodepos,a.no_telp,a.no_hp,a.sex,a.email,a.gol_darah, 
a.nik2,a.npwp,a.suku,a.sts_agama,c.nama as nama_agama,a.sts_didik,d.nama as nama_didik,a.foto,a.sts_pajak, date_format(a.tgl_nikah,'%d/%m/%Y') as tgl_nikah, 
 date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,a.kode_jab,a.kode_grade,a.kode_loker,a.kode_dir,a.kode_dept,a.sts_sdm,a.kode_vendor,a.sts_bank,
e.nama as nama_jab,f.nama as nama_grade,g.nama as nama_loker,h.nama as nama_dir,i.nama as nama_dept,j.nama as nama_sdm,k.nama as nama_vendor,l.nama as nama_bank,
a.lembaga,a.asal_lamaran,a.cabang,a.no_rek,a.nama_rek,a.nip,a.flag_gaji 
 from gr_karyawan a 
inner join gr_prov b on a.kode_prov=b.kode_prov 
inner join gr_status_agama c on a.sts_agama=c.sts_agama and a.kode_lokasi = c.kode_lokasi 
inner join gr_strata d on a.kode_strata=d.kode_strata and a.kode_lokasi = d.kode_lokasi 
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi = e.kode_lokasi 
inner join gr_grade f on a.kode_grade=f.kode_grade and a.kode_lokasi = f.kode_lokasi 
inner join gr_loker g on a.kode_loker=g.kode_loker and a.kode_lokasi = g.kode_lokasi 
inner join gr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi = h.kode_lokasi 
inner join gr_dept i on a.kode_dept=i.kode_dept and a.kode_lokasi = i.kode_lokasi 
inner join gr_status_sdm j on a.sts_sdm=j.sts_sdm and a.kode_lokasi = j.kode_lokasi 
inner join gr_vendor k on a.kode_vendor=k.kode_vendor and a.kode_lokasi = k.kode_lokasi 
inner join gr_status_bank l on a.sts_bank=l.sts_bank and a.kode_lokasi = l.kode_lokasi
inner join gr_jur m on a.kode_jur=m.kode_jur and a.kode_lokasi=m.kode_lokasi $this->filter ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"serverApp.php"));		
			$pathfoto = $path . "media/".$row->foto;
			echo "<table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'>DATA KARYAWAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='0' cellspacing='1' cellpadding='2'>
          <tr>
            <td width='154'>Nama</td>
            <td width='374'>: $row->nama </td>
            <td width='162' rowspan='10' align='left' valign='top'><img src='$pathfoto'  /></td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>: $row->nik </td>
            </tr>
          <tr>
            <td>Gender</td>
            <td>: $row->sex </td>
            </tr>
          <tr>
            <td>Agama</td>
            <td>: $row->nama_agama </td>
            </tr>
          <tr>
            <td>Tempat , Tanggal Lahir</td>
            <td>: $row->tempat , $row->tgl_lahir</td>
            </tr>
          <tr>
            <td>Pendidikan</td>
            <td>: $row->nama_didik </td>
            </tr>
          <tr>
            <td>No KTP </td>
            <td>: $row->no_ktp </td>
            </tr>
          <tr>
            <td>Status Pajak </td>
            <td>: $row->sts_pajak </td>
            </tr>
          <tr>
            <td>No NPWP </td>
            <td>: $row->npwp </td>
            </tr>
          <tr>
            <td>Tanggal Nikah</td>
            <td>: $row->tgl_nikah </td>
            </tr>
          <tr>
            <td>Alamat</td>
            <td>: $row->alamat </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Kota</td>
            <td>: $row->kota </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Propinsi</td>
            <td>: $row->nama_prov </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>No Telp </td>
            <td>: $row->no_telp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>No HP </td>
            <td>: $row->no_hp </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>: $row->email </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Golongan Darah </td>
            <td>: $row->gol_darah </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Suku</td>
            <td>: $row->suku </td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
	<tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>DATA KEDINASAN </td>
      </tr>
      <tr>
        <td><table width='100%' border='0' cellspacing='1' cellpadding='2'>
          <tr>
            <td width='154'>Tanggal Masuk </td>
            <td width='536'>: $row->tgl_masuk</td>
            </tr>
          <tr>
            <td>Jabatan</td>
            <td>: $row->nama_jab</td>
            </tr>
          <tr>
            <td>Grade</td>
            <td>: $row->tgl_masuk </td>
            </tr>
          <tr>
            <td>Lokasi Kerja </td>
            <td>: $row->nama_loker </td>
            </tr>
          <tr>
            <td>Direktorat</td>
            <td>: $row->nama_dir </td>
            </tr>
          <tr>
            <td>Departemen</td>
            <td>: $row->nama_dept </td>
            </tr>
          <tr>
            <td>Status SDM </td>
            <td>: $row->nama_sdm</td>
            </tr>
          <tr>
            <td>Pihak Ketiga </td>
            <td>: $row->nama_vendor </td>
            </tr>
          <tr>
            <td>Lembaga</td>
            <td>: $row->lembaga </td>
            </tr>
          <tr>
            <td>Asal Lamaran </td>
            <td>: $row->asal_lamaran </td>
            </tr>
          <tr>
            <td>Bank</td>
            <td>: $row->nama_bank </td>
            </tr>
          <tr>
            <td>Cabang</td>
            <td>: $row->cabang </td>
            </tr>
          <tr>
            <td>No Rekening </td>
            <td>: $row->no_rek </td>
            </tr>
          <tr>
            <td>Nama Rekening </td>
            <td>: $row->nama_rek </td>
            </tr>
        </table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>DATA KELUARGA </td>
      </tr>
      <tr>
        <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='60'>Status</td>
            <td width='165'>Nama</td>
            <td width='49'>Gender</td>
            <td width='121'>Tempat</td>
            <td width='85'>Tgl Lahir </td>
            <td width='142'>Institusi</td>
            <td width='68'>Status</td>
          </tr>";
		  $sql1="select a.nama,a.tempat,convert(varchar,a.tgl_lahir,103) as tgl_lahir,a.sts_kel,b.nama as nama_sts,a.sex,a.institusi,
			a.no_telp,a.nik2,a.alamat,a.kota,a.kodepos,a.kode_prov,a.flag_hidup,a.flag_kerja,a.flag_tanggung,a.flag_anak 
			from gr_keluarga a inner join gr_status_kel b on a.sts_kel=b.sts_kel and a.kode_lokasi=b.kode_lokasi 
			where a.nik = '$row->nik' and a.kode_lokasi='$row->kode_lokasi'";
		$rs1 = $dbLib->execute($sql1);
		$tot_pot=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
         echo "<tr>
            <td>$row1->nama_sts</td>
            <td>$row1->nama</td>
            <td align='center'>$row1->sex</td>
            <td>$row1->tempat</td>
            <td>$row1->tgl_lahir</td>
            <td>$row1->institusi</td>
            <td>$row1->flag_tanggung</td>
          </tr>";
		}  
        echo "</table></td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>
<br>
";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
