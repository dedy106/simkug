<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbPjAju extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_pjaju) from yk_pjaju_m a $this->filter ";
		
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
		$sql="select a.no_pjaju,a.nik_buat,a.nik_tahu,a.nik_setuju,a.nik_bdh,a.nik_manbdh,a.kode_pp,a.nilai,a.akun_pj,a.keterangan,substring(a.periode,1,4) as tahun,
       b.nama as nama_pp,c.nama as nama_buat,d.nama as nama_tahu,e.nama as nama_setuju,f.nama as nama_bdh,g.nama as nama_akun,h.nama as nama_manbdh,
	   substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,e.jabatan as jab_setuju
from yk_pjaju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_tahu=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
left join karyawan f on a.nik_bdh=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan h on a.nik_manbdh=h.nik and a.kode_lokasi=h.kode_lokasi
left join masakun g on a.akun_pj=g.kode_akun and a.kode_lokasi=g.kode_lokasi $this->filter order by a.no_pjaju";
		
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
    <td align='right'>Model PK-1 </td>
  </tr>
  <tr>
    <td align='right'>Formulir Pengajuan / Pengambilan Panjar Kerja </td>
  </tr>
  <tr>
    <td align='center'>YAYASAN KESEHATAN PEGAWAI TELKOM / BIDANG KEUANGAN </td>
  </tr>
  <tr>
    <td colspan='2' align='center'><table width='100%' border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td align='center' class='judul_form'><u>DAFTAR PERMOHONAN PANJAR INSIDENTIL</u></td>
      </tr>
      <tr>
        <td align='center' class='judul_form'>$row->no_pjaju</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600' height='30' valign='top'>Yang bertanda tangan dibawah ini : </td>
        <td width='200' >&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>Nama : $row->nama_buat / NIK . $row->nik_buat </td>
      </tr>
      <tr>
        <td colspan='2'>$row->keterangan</td>
      </tr>
      <tr>
        <td colspan='2'>Sejumlah : Rp. ".number_format($row->nilai,0,',','.')." (".$AddOnLib->terbilang($row->nilai).") </td>
      </tr>
	   <tr>
        <td colspan='2'>&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td width='89' align='center'  class='header_form'>Kode Akun </td>
            <td width='188' align='center' class='header_form'>Nama Akun </td>
            <td width='81' align='center' class='header_form'>Kode PP</td>
            <td width='153' align='center' class='header_form'>Nama PP </td>
            <td width='74' align='center' class='header_form'>Kode DRK </td>
            <td width='222' align='center' class='header_form'>Nama DRK </td>
            <td width='110' align='center' class='header_form'>Nilai</td>
          </tr>";
		 $sql1="select a.kode_akun,b.nama,a.nilai,a.kode_pp,a.kode_drk,c.nama as nama_pp,d.nama as nama_drk
from yk_pjaju_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$row->tahun'
where a.no_pjaju='$row->no_pjaju' order by a.kode_akun ";
			 
			  $rs1 = $dbLib->execute($sql1);
			  $j=1;
			  $tarif=0;
			  $nilai_uh=0;
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
						$nilai=$nilai+$row1->nilai;
					echo "<tr>
					<td class='isi_form'>$row1->kode_akun</td>
					<td class='isi_form'>$row1->nama</td>
					<td class='isi_form'>$row1->kode_pp</td>
					<td class='isi_form'>$row1->nama_pp</td>
					<td class='isi_form'>$row1->kode_drk</td>
					<td class='isi_form'>$row1->nama_drk</td>
					<td class='isi_form' align='right'>".number_format($row1->nilai,0,",",".")."</td>
					</tr>";
					}
        echo "</table></td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='30' valign='bottom'>Bandung, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>Mengetahui / Menyetujui </td>
        <td>Yang Mengajukan </td>
      </tr>
      <tr>
        <td>$row->jab_setuju</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_setuju</u></td>
        <td><u>$row->nama_buat</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_setuju</td>
        <td>NIK.$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'>Model PK-1 </td>
  </tr>
  <tr>
    <td align='right'>Formulir Pengajuan / Pengambilan Panjar Kerja </td>
  </tr>
  
  <tr>
    <td align='center' class='judul_form'>FIAT BAYAR </td>
  </tr>
  <tr>
        <td colspan='2'>Harap dibayarkan kepada : $row->nama_buat / NIK $row->nik_buat</td>
      </tr>
      <tr>
        <td colspan='2'>sejumlah Rp ".number_format($row->nilai,0,",",".")." (".$AddOnLib->terbilang($row->nilai).")</td>
      </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='600'>&nbsp;</td>
        <td width='200' height='30' valign='bottom'>Bandung, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Fiatur</td>
      </tr>
      <tr>
        <td>Bendaharawan</td>
        <td>MGR PERBENDAHARAN </td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_bdh</u></td>
        <td><u>$row->nama_manbdh</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_bdh </td>
        <td>NIK.$row->nik_manbdh</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr align='center'>
        <td colspan='2' class='judul_form'>TANDA PENERIMAAN UANG </td>
      </tr>
      <tr>
        <td width='184'>Telah diterima uang sebesar </td>
        <td width='606'>Rp. ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='600'>&nbsp;</td>
        <td width='200'>Bandung, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Pemegang Panjar Kerja </td>
      </tr>
      <tr>
        <td height='50' valign='bottom'><u>Perhatian </u></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Panjar akan di pertanggungkan paling lama 25 (dua puluh lima) hari </td>
        <td><u>$row->nama_buat<u></td>
      </tr>
      <tr>
        <td>kalender sejak uang panjar diterima </td>
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
