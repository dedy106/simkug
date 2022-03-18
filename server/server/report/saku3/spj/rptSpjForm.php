<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_spj_rptSpjForm extends server_report_basic
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
		$sql="select a.no_spj,datepart(day,a.tanggal) as tgl_cuti,datename(weekday,a.tanggal) as hari,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,
       datepart(year,a.tanggal) as tahun,a.tanggal,a.kode_pp,a.nik_perintah as nik_gar,e.nama as nama_nikgar,a.akun_uhar,
       a.nik_buat,a.nama_spj as nama_buat,a.keterangan,b.nama as nama_pp,a.nik_app,d.nama as nama_app,
	   isnull(c.jabatan,'-') as jabatan,a.transport,a.harian,a.transport+a.harian as total,a.kode_lokasi,c.grade,f.nama as lokasi,a.akun_uhar,a.nik_bdh,g.nama as nama_bdh,
	   f.kota
from yk_spj_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik 
inner join karyawan d on a.nik_app=d.nik 
inner join karyawan e on a.nik_perintah=e.nik 
inner join karyawan g on a.nik_bdh=g.nik 
inner join lokasi f on a.kode_lokasi=f.kode_lokasi $this->filter order by a.no_spj";		
		
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
			$transport=number_format($row->transport,0,',','.');
			$harian=number_format($row->harian,0,',','.');
			$total=number_format($row->total,0,',','.');
			$terbilang=$AddOnLib->terbilang2($row->total);
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td ><table width='800' border='0' cellpadding='1' cellspacing='1'>
      <tr>
        <td width='550' align='right'>LAMPIRAN IV : </td>
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
        <td colspan='2' class='judul_form'><u>BIAYA PERJALANAN DINAS </u></td>
	<tr align='center'>
        <td colspan='2' class='judul_form'>$row->no_spj </td>
  </tr>
</table></td>
  </tr>
 
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='206'>Harap dibayar uang sebesar Rp </td>
            <td width='584'>$total</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>$terbilang</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='0'>
          <tr>
            <td width='3%'>1.</td>
            <td width='27%'>a. Nama / NIK </td>
            <td>: $row->nama_buat / $row->nik_buat </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>b. Band Individu / Jabatan </td>
            <td>: $row->grade / $row->jabatan </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>c. Lokasi / Kode Akun </td>
            <td>: $row->lokasi / $row->akun_uhar </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='100%'  border='0'>
          <tr>
            <td width='3%'>2</td>
            <td width='97%'>Untuk Perjalanan Dinas dengan rincian : </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr>
                <td width='15' align='center' class='header_form'>No</td>
                <td width='131'  align='center' class='header_form'>Dari-Ke</td>
                <td width='77' align='center' class='header_form'>Jenis Angkutan </td>
                <td width='77'  align='center' class='header_form'>Tarif Rp. </td>
                <td width='20'  align='center' class='header_form'>DI</td>
                <td width='76'  align='center' class='header_form'>Tanggal Berangkat  </td>
                <td width='82' align='center' class='header_form'>Tanggal Tiba</td>
                <td width='40'  align='center' class='header_form'>Lama Hari </td>
                <td width='60'  align='center' class='header_form'>Tarif</td>
                <td width='82'  align='center' class='header_form'>Jml uang Harian </td>
                <td width='50'  align='center' class='header_form'>Ket</td>
              </tr>
             ";
				 $sql1="select a.no_spj,a.no_urut,b.asal,b.tujuan,d.nama as jenis,b.nilai as tarif,b.jumlah,c.persen,
	   date_format(c.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(c.tgl_selesai,'%d/%m/%Y') as tgl_selesai,c.lama,c.tarif as tarif_uh,c.nilai as nilai_uh
from (select distinct no_spj,no_urut from yk_spj_dt
	  union 
	  select distinct no_spj,no_urut from yk_spj_dh
      )a
left join yk_spj_dt b on a.no_spj=b.no_spj and a.no_urut=b.no_urut
left join yk_spj_dh c on a.no_spj=c.no_spj and a.no_urut=c.no_urut
left join yk_spj_jenis d on b.kode_jenis=d.kode_jenis
where a.no_spj='$row->no_spj' ";
			 
			  $rs1 = $dbLib->execute($sql1);
			  $j=1;
			  $tarif=0;
			  $tot_uh=0;
			  while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$tarif=$tarif+$row1->tarif;
				$tot_uh=$tot_uh+$row1->nilai_uh;
				
				$tarif_uh="";
				$nilai_uh="";
				$lama="";
				$persen="";
				if ($row1->lama >0)
				{
					$tarif_uh=number_format($row1->tarif_uh,0,',','.');
					$nilai_uh=number_format($row1->nilai_uh,0,',','.');
					$lama=number_format($row1->lama,0,',','.');
				}
				if ($row1->persen <>100)
				{
					$persen=number_format($row1->persen,0,',','.')."%";
				}
				     echo "<tr>
                <td class='isi_form' align='center'>$j</td>
                <td class='isi_form'>$row1->asal - $row1->tujuan</td>
                <td class='isi_form'>$row1->jenis</td>
                <td align='right' class='isi_form'>".number_format($row1->tarif,0,',','.')."</td>
                <td class='isi_form'>&nbsp;</td>
                <td align='center' class='isi_form'>$row1->tgl_mulai</td>
                <td align='center' class='isi_form'>$row1->tgl_selesai</td>
                <td align='center' class='isi_form'>$lama</td>
                <td align='right' class='isi_form'>$tarif_uh</td>
                <td align='right' class='isi_form'>$nilai_uh</td>
                <td class='isi_form' align='center'>$persen</td>
              </tr>";
				$j=$j+1;
			}
			echo "<tr>
                <td colspan='3'>&nbsp;</td>
                <td align='right' class='isi_form'> ".number_format($tarif,0,',','.')."</td>
                <td colspan='5'>&nbsp;</td>
                <td align='right' class='isi_form'>".number_format($tot_uh,0,',','.')."</td>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jumlah uang / biaya perjalanan dinas sebesar Rp. $total </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Terbilang : $terbilang </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><hr></td>
      </tr>
      <tr>
        <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='250'>$row->kota, $row->tgl $bulan $row->tahun </td>
            <td width='300'>$row->kota,  </td>
            <td width='250'>$row->kota,  </td>
          </tr>
          <tr>
            <td>Pembuat rincian </td>
            <td>Fiatur</td>
            <td>Telah terima uang </td>
          </tr>
          <tr>
            <td height='50'>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><u>$row->nama_app</u></td>
            <td><u>$row->nama_bdh</u></td>
            <td><u>$row->nama_buat</u></td>
          </tr>
          <tr>
            <td>NIK.$row->nik_app</td>
            <td>NIK.$row->nik_bdh</td>
            <td>NIK.$row->nik_buat</td>
          </tr>
        </table></td>
      </tr>

      <tr>
        <td><hr></td>
      </tr>
      <tr>
        <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='50%'>CATATAN : </td>
            <td width='50%'>&nbsp;</td>
          </tr>
          <tr>
            <td>Perincian biaya angkutan dan uang hari butir 2 sbb : </td>
            <td>Catatan Pengawas Anggaran (a-b) </td>
          </tr>
          <tr>
            <td>untuk SPPD pindah : </td>
            <td>a. Anggaran : </td>
          </tr>
          <tr>
            <td>Uang Harian </td>
            <td>b. Realisasi : </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>c. Sisa : </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
  
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
