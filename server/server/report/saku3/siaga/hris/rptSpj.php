<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptSpj extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_spj)
from gr_spj_m a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi $this->filter ";
		
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
		$sts_email=$tmp[0];
		$sql="select a.no_spj,datepart(day,a.tanggal) as tgl_cuti,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,
       datepart(year,a.tanggal) as tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.progress,
       a.nik_buat,c.nama,a.keterangan,b.nama as loker,a.nik_app,d.nama as nama_app,
	   e.nama as jabatan,a.transport,a.harian,a.transport+a.harian as total,a.kode_lokasi,CONVERT(varchar, getdate(), 120) as tgl_input,d.email
from gr_spj_m a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi $this->filter order by a.no_spj";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		// $path = $_SERVER["SCRIPT_NAME"];				
    // $path = substr($path,0,strpos($path,"server/serverApp.php"));	
    $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
		$path = $link."/";		
		$pathfoto = $path . "image/gratika2.jpg";
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		$mail=new server_util_mail();
		$logo=$path."image/gratika2.jpg";
		if ($sts_email=="1")
		{
      // $logo="http://www.gratika.co.id/hris/image/gratika.gif";
      $logo=$path."image/gratika2.jpg";
		}
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$transport=number_format($row->transport,0,',','.');
			$harian=number_format($row->harian,0,',','.');
			$total=number_format($row->total,0,',','.');
			$terbilang=$AddOnLib->terbilang2($row->total);
			$email=$row->email;
			$no_spj=$row->no_spj;
			$nama_app="";
			if ($row->progress=="1")
			{
				$nama_app=$row->nama_app;
			}
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td ><table width='100%'  border='0'>
      <tr>
        <td width='18%' rowspan='3'><img src='$logo' width='120' height='60'></td>
        <td width='43%' rowspan='3' align='center' valign='middle' class='istyle17'>BIAYA PERJALANAN DINAS </td>
        <td width='14%' height='30'>Nomor</td>
        <td width='25%'>: - </td>
      </tr>
      <tr>
        <td height='32'>No. SPPD </td>
        <td>: $row->no_spj </td>
      </tr>
      <tr>
        <td>No. PPSPPD </td>
        <td>: </td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td><table width='100%'  border='0'>
          <tr>
            <td width='3%'>1</td>
            <td width='10%'>Nama</td>
            <td width='40%'>: $row->nama </td>
            <td width='10%'>&nbsp;</td>
            <td width='37%'>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jabatan</td>
            <td>: $row->jabatan </td>
            <td>Kode PP </td>
            <td>: $row->loker</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='0'>
          <tr>
            <td width='3%'>2</td>
            <td width='97%'>Perincian Biaya Perjalanan Dinas</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>a. Biaya Transportasi </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><table width='100%'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
              <tr align='center'>
                <td width='5%'>No</td>
                <td width='26%'>Dari</td>
                <td width='26%'>Ke</td>
                <td width='23%'>Jenis Angkutan </td>
                <td width='20%'>Tarif / Jumlah </td>
              </tr>";
			  $sql1="select a.asal,a.tujuan,b.nama as jenis,a.nilai,a.jumlah
from gr_spj_dt a
inner join gr_spj_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi
where a.no_spj='$row->no_spj' and a.kode_lokasi='$row->kode_lokasi'";
			  $rs1 = $dbLib->execute($sql1);
			  $j=1;
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=number_format($row1->nilai,0,',','.');
				$jumlah="";
				if ($row1->jumlah > 1)
				{
					$jumlah=number_format($row1->jumlah,0,',','.')." X";
				}
              echo "<tr>
                <td align='center'>$j</td>
                <td align='center'>$row1->asal</td>
                <td align='center'>$row1->tujuan &nbsp $jumlah</td>
                <td align='center'>$row1->jenis</td>
                <td align='right'>$nilai</td>
              </tr>";
				$j=$j+1;
			}  
              echo "<tr>
                <td colspan='4'>Jumlah Biaya Transportasi</td>
                <td align='right'>$transport</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>b. Uang Harian </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><table width='100%'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
              <tr align='center'>
                <td width='17%' >Tgl Berangkat</td>
                <td width='19%'>Tgl Tiba </td>
                <td width='21%'>Lama Hari </td>
                <td width='23%'>Tarif Harian </td>
                <td width='20%'>Jumlah Uang </td>
              </tr>";
			$sql1="select date_format(tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(tgl_selesai,'%d/%m/%Y') as tgl_selesai,lama,tarif,nilai
from gr_spj_dh
where no_spj='$row->no_spj' and kode_lokasi='$row->kode_lokasi'";
			  $rs1 = $dbLib->execute($sql1);
			  $j=1;
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=number_format($row1->nilai,0,',','.');
				$tarif=number_format($row1->tarif,0,',','.');
				$lama=number_format($row1->lama,0,',','.');
              echo "<tr>
                <td align='center'>$row1->tgl_mulai</td>
                <td align='center'>$row1->tgl_selesai</td>
                <td align='center'>$lama Hari</td>
                <td align='right'>$tarif</td>
                <td align='right'>$nilai</td>
              </tr>";
				$j=$j+1;
			}
              echo "<tr>
                <td colspan='4'>Jumlah Uang Harian </td>
                <td align='right'>$harian</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jumlah Biaya Trasnportasi dan Uang Harian sebesar : $total </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Terbilang : $terbilang </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='100%'  border='0'>
          <tr>
            <td width='52%' align='center'>PENGAJUAN</td>
            <td width='48%'>Catatan Pengawasan Anggaran </td>
          </tr>
          <tr>
            <td><table width='100%'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
              <tr align='center'>
                <td>Dibuat Oleh </td>
                <td>Disetujui oleh </td>
              </tr>
              <tr align='center' valign='bottom'>
                <td height='60'>$row->nama</td>
                <td>$row->nama_app</td>
              </tr>
              <tr>
                <td>Tanggal : $row->tanggal</td>
                <td>Tanggal : $row->tanggal</td>
              </tr>
            </table></td>
            <td rowspan='3' valign='top'><table width='100%'  border='0'>
              <tr>
                <td colspan='2'>Beban Anggaran Tahun </td>
                <td width='37%'>&nbsp;</td>
              </tr>
              <tr>
                <td width='7%'>a.</td>
                <td width='56%'>Kode Akun </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Sisa anggaran s.d ini </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Anggaran kegiatan dimaksud </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Saldo anggaran </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>b.</td>
                <td width='56%'>Kode Akun </td>
                <td>: </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Sisa anggaran s.d ini </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Anggaran kegiatan dimaksud </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>Saldo anggaran </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            </tr>
          <tr>
            <td><table width='100%'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
              <tr align='center'>
                <td colspan='2'>PEMBAYARAN</td>
              </tr>
              <tr align='center' valign='bottom'>
                <td width='47%' height='60' align='left' valign='top'><table width='100%'  border='0'>
                    <tr>
                      <td width='13%'>&nbsp;</td>
                      <td width='87%'>Kas</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>Bank</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>Nomor Akun</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td></td>
                    </tr>
                </table></td>
                <td width='53%' align='left' valign='top'><table width='100%'  border='0'>
                    <tr>
                      <td width='13%'>&nbsp;</td>
                      <td width='87%'>&nbsp;</td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr align='center'>
                      <td colspan='2'>Treasury Manager</td>
                    </tr>
                    <tr align='center'>
                      <td colspan='2'>Tanggal :  </td>
                    </tr>
                </table></td>
              </tr>
            </table></td>
            </tr>
          <tr>
            <td valign='top'>Catatan : </td>
            <td><table width='100%'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
              <tr align='center'>
                <td colspan='2'>VERIFIKASI</td>
                </tr>
              <tr align='center'>
                <td>Anggaran</td>
                <td>Keuangan</td>
              </tr>
              <tr align='center' valign='bottom'>
                <td height='60'></td>
                <td></td>
              </tr>
              <tr>
                <td>Tanggal : </td>
                <td>Tanggal : </td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>
";
		 
			$i=$i+1;
		}
		echo "</div>";
		if ($sts_email=="1")
		{
			$html=ob_get_contents();
			$numSent = $mail->sendMail("hrd@gratika.co.id",$email,"Pengajuan Perjalanan Dinas $no_spj Tanggal $tgl_input", $html,null);	
		}
		return "";
	}
	
}
?>
  
