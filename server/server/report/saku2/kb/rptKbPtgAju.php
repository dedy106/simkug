<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbPtgAju extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ptg)
from ptg_m a
inner join yk_pjaju_m h on a.no_pj=h.no_pjaju and a.kode_lokasi=h.kode_lokasi
inner join pp b on h.kode_pp=b.kode_pp and h.kode_lokasi=b.kode_lokasi
inner join karyawan c on h.nik_buat=c.nik and h.kode_lokasi=c.kode_lokasi
left join karyawan d on h.nik_tahu=d.nik and h.kode_lokasi=d.kode_lokasi
left join karyawan e on h.nik_setuju=e.nik and h.kode_lokasi=e.kode_lokasi
left join karyawan f on h.nik_bdh=f.nik and h.kode_lokasi=f.kode_lokasi
inner join masakun g on h.akun_pj=g.kode_akun and h.kode_lokasi=g.kode_lokasi $this->filter ";
		
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_ptg,h.nik_buat,h.nik_tahu,a.nik_setuju,f.flag as nik_bdh,i.flag as nik_manbdh,h.kode_pp,h.nilai as nilai_pj,a.nilai as nilai_ptg,a.nilai_kas,
		h.akun_pj,h.keterangan,substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,
       b.nama as nama_pp,c.nama as nama_buat,d.nama as nama_tahu,e.nama as nama_setuju,f.nama as nama_bdh,g.nama as nama_akun,i.nama as nama_manbdh,
	   f.keterangan as jab_bdh,i.keterangan as jab_manbdh,j.kota
from ptg_m a
inner join yk_pjaju_m h on a.no_pj=h.no_pjaju and a.kode_lokasi=h.kode_lokasi
inner join pp b on h.kode_pp=b.kode_pp and h.kode_lokasi=b.kode_lokasi
inner join karyawan c on h.nik_buat=c.nik and h.kode_lokasi=c.kode_lokasi
left join karyawan d on h.nik_tahu=d.nik and h.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_setuju=e.nik and h.kode_lokasi=e.kode_lokasi
left join spro f on a.kode_lokasi=f.kode_lokasi and f.kode_spro='BDH1'
left join spro i on a.kode_lokasi=i.kode_lokasi and i.kode_spro='BDH2'
inner join masakun g on h.akun_pj=g.kode_akun and h.kode_lokasi=g.kode_lokasi
inner join lokasi j on a.kode_lokasi=j.kode_lokasi $this->filter order by a.no_ptg";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td colspan='2' align='center'><table width='100%' border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td align='center' class='judul_form'><u>DAFTAR PERTANGGUNGAN PANJAR INSIDENTIL</u></td>
      </tr>
      <tr>
        <td align='center' class='judul_form'>$row->no_ptg</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='81'>Panjar</td>
        <td width='703'>: Rp ".number_format($row->nilai_pj,0,",",".")." </td>
      </tr>
      <tr>
        <td>Kode PP </td>
        <td>: $row->kode_pp / $row->nama_pp </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td class='header_form'>Tgl</td>
        <td class='header_form'>No SB </td>
        <td class='header_form'>Uraian Pengeluaran</td>
        <td class='header_form'>Jumlah</td>
        <td class='header_form'>No. DRK </td>
        <td class='header_form'>No. Akun </td>
        <td class='header_form'>Keterangan</td>
      </tr>";
	  $i=1;
		$sql1="select a.no_ptg,date_format(a.tgl_kuitansi,'%d/%m/%Y') as tanggal,a.kode_akun,a.nilai,a.kode_pp,a.kode_drk,a.keterangan
from ptg_j a
where a.no_ptg='$row->no_ptg' and  a.modul='PJPTGAJU' and a.jenis='BEBAN' order by a.kode_akun ";
					
		$rs1 = $dbLib->execute($sql1);
		$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
        <td class='isi_form'>$row1->tanggal</td>
        <td class='isi_form'>$row1->no_ptg</td>
        <td class='isi_form'>$row1->keterangan</td>
        <td class='isi_form' align='right'>".number_format($row1->nilai,0,",",".")."</td>
        <td class='isi_form'>$row1->kode_drk</td>
        <td class='isi_form'>$row1->kode_akun</td>
        <td class='isi_form'>&nbsp;</td>
      </tr>";
		}
    echo "</table></td>
  </tr>
  <tr>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100'>Jumlah Panjar </td>
        <td width='20'>Rp</td>
        <td width='100' align='right'>".number_format($row->nilai_pj,0,",",".")."</td>
        <td width='494'>&nbsp;</td>
      </tr>
      <tr>
        <td>Pertanggungan</td>
        <td>Rp</td>
        <td align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Sisa Panjar </td>
        <td>Rp</td>
        <td align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Titipan PPH </td>
        <td>Rp</td>
        <td align='right'></td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='814' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='250'>&nbsp;</td>
        <td width='300'>&nbsp;</td>
        <td width='250'>$row->kota, $row->tgl $bulan $row->tahun</td>
      </tr>
      <tr>
        <td>Fiatur</td>
        <td>Mengetahui / Menyetujui </td>
        <td>Pemegang Panjar </td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_manbdh</u></td>
        <td><u>$row->nama_setuju</u></td>
        <td><u>$row->nama_buat</u></td>
      </tr>
      <tr>
        <td>$row->nik_manbdh</td>
        <td>$row->nik_setuju</td>
        <td>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='right'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='100' class='header_form'>No.Akun</td>
        <td width='300' class='header_form'>Nama Akun </td>
        <td width='100' class='header_form'>Jumlah</td>
      </tr>";
		$sql1="select a.kode_akun,b.nama,sum(a.nilai) as nilai
from ptg_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_ptg='$row->no_ptg' and  a.modul='PJPTGAJU' and a.jenis='BEBAN'
group by a.kode_akun,b.nama order by a.kode_akun ";
					
		$rs1 = $dbLib->execute($sql1);
		$nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row1->nilai;
      echo "<tr>
        <td class='isi_form'>$row1->kode_akun</td>
        <td class='isi_form'>$row1->nama</td>
        <td class='isi_form' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
		}
    echo "</table></td>
  </tr>
  <tr>
    <td align='right'>Sisa panjar dikembalikan sebesar Rp. ".number_format($row->nilai_kas,0,",",".")." </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>BENDAHARAWAN</td>
        <td>PEMEGANG PANJAR </td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_bdh</u></td>
        <td><u>$row->nama_buat</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_bdh</td>
        <td>NIK.$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
