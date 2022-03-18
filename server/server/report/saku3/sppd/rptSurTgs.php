<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptSurTgs extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		
				
				
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		$tahun=substr($periode,0,4);
        $sql="select  a.no_stugas,a.kode_lokasi,a.nik_buat,a.nik_app,b.nama as nama_app,c.nama as nama_buat,
                a.keterangan, a.tanggal as tgl,c.jabatan as jab_buat,b.jabatan as jab_app,a.tanggal,
                a.catatan,a.no_aju
                from sp_stugas_m a 
                inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi 
                inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
                $this->filter order by a.no_stugas ";
	 
      $rs = $dbLib->execute($sql);
      $AddOnLib=new server_util_AddOnLib();	
	  $i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
	  while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td align='center'><img src='$logo' width='200' height='72'></td>
                </tr>
                <tr>
                    <td align='center' class='judul_bukti'>SURAT PERMOHONAN MELAKSANAKAN PERJALANAN DINAS (SPMD)</td>
                </tr>
                <tr>
                    <td align='center' class='judul_bukti'>Nomor : $row->no_stugas</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                </tr>
                <tr>
                    <td>Dengan ini kami mohon persetujuannya bagi pegawai yang namanya tersebut di bawah ini untuk diberikan</td>
                </tr>
                <tr>
                    <td>Surat Perintah Perjalanan Dinas (SPPD) sebagai berikut :</td>
                </tr>
                <tr>
                    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                    <tr>
                        <td width='24' align='center' class='header_laporan'>NO</td>
                        <td width='200' align='center' class='header_laporan'>NAMA/ NIP</td>
                        <td width='121' align='center' class='header_laporan'>TINGKAT/ JABATAN</td>
                        <td width='180' align='center' class='header_laporan'>LOKASI KERJA</td>
                        <td width='120' align='center' class='header_laporan'>Paraf Atasan Langsung Khusus Bagi Pegawai dari Lokasi Kerja Lain</td>
                        <td width='127' align='center' class='header_laporan'>KETERANGAN (Tarif SPPD) </td>
                    </tr>";
        $sql="select a.no_stugas,convert(varchar,a.tanggal,103) as tgl,a.no_perintah,a.keterangan,c.nik_spj,
				c.nama_spj,d.jabatan,c.nilai_trans+c.nilai_uhar as nilai,c.kode_pp,e.nama as nama_pp,
				c.no_spj 
                from sp_stugas_m a inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
                                inner join sp_spj_m c on a.no_stugas = c.no_stugas and a.kode_lokasi=c.kode_lokasi
                                inner join karyawan d on c.nik_spj=d.nik and a.kode_lokasi=d.kode_lokasi
                                inner join pp e on c.kode_pp=e.kode_pp and c.kode_lokasi=d.kode_lokasi
                where a.kode_lokasi='$row->kode_lokasi' and a.no_stugas='$row->no_stugas' and c.progress<>'Z'
                order by a.no_stugas ";					 
		
        $rs1 = $dbLib->execute($sql);
        $j=1; $nilai=0;
        while ($row1 = $rs1->FetchNextObject($toupper=false))
            {
                $nilai+=$row1->nilai;
        echo "<tr>
                    <td class='isi_laporan' align='center'>$j</td>
                    <td class='isi_laporan'>$row1->nik_spj / $row1->nama_spj</td>
                    <td class='isi_laporan'>$row1->jabatan</td>
                    <td class='isi_laporan'>$row1->kode_pp / $row1->nama_pp</td>
                    <td class='isi_laporan'>&nbsp;</td>
                    <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
                </tr>";
                $j=$j+1;
            }   
        echo "
			<tr>
                    <td class='header_laporan' align='right' colspan='5'>Total</td>
                    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
                </tr>
				</table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
           
            <tr>
                <td>Demikian permohonan kami dan atas persetujuannya diucapkan terimakasih.</td>
            </tr>
            <tr>
                <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                    <td width='172' align='center'>&nbsp;</td>
                    <td width='293' align='center'>Menyetujui/ Mengetahui</td>
                    <td width='321'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td align='center'>a.n Rektor</td>
                    <td align='center'>diBuat oleh</td>
                </tr>
                <tr>
                    <td height='60'>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>$row->nama_app</td>
                    <td align='center'>$row->nama_buat</td>
                </tr>
                <tr>
                    <td align='center'>&nbsp;</td>
                    <td align='center'>$row->jab_app</td>
                    <td align='center'>$row->jab_buat</td>
                </tr>
                </table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
        </table>";
	echo "</table><br>";
			$i=$i+1;    
         
		
		
		
		echo "</table><br>";        
        }       
		echo "<DIV style='page-break-after:always'></DIV>";
		
		$sql="select e.tempat,e.no_spj,datepart(day,e.tanggal) as tgl_cuti,datename(weekday,e.tanggal) as hari,datepart(day,e.tanggal) as tgl,
    datepart(month,e.tanggal) as bulan,datepart(year,e.tanggal) as tahun,e.tanggal,e.kode_pp,
    e.nik_user,c.nama as nama_buat,b.nama as nama_pp,e.nik_spj,d.nama as nama_app,e.nama_spj,
	  isnull(d.jabatan,'-') as jabatan,e.nilai_trans,e.nilai_uhar,e.nilai_trans+e.nilai_uhar as total,e.kode_lokasi,d.grade,f.nama as lokasi,f.kota
    from sp_stugas_m a
	inner join sp_spj_m e on a.no_stugas=e.no_stugas and a.kode_lokasi=e.kode_lokasi
    inner join pp b on e.kode_pp=b.kode_pp and e.kode_lokasi=b.kode_lokasi
    inner join karyawan c on e.nik_user=c.nik 
    inner join karyawan d on e.nik_spj=d.nik 
    inner join lokasi f on e.kode_lokasi=f.kode_lokasi
	$this->filter ";		
		
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$transport=number_format($row->nilai_trans,0,',','.');
			$harian=number_format($row->nilai_uhar,0,',','.');
			$total=number_format($row->total,0,',','.');
			$terbilang=$AddOnLib->terbilang2($row->total);
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800'  border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td ><table width='800' border='0' cellpadding='1' cellspacing='1'>
      
     
    
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
            <td>: $row->nama_spj / $row->nik_spj </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>b. Band Individu / Jabatan </td>
            <td>: $row->grade / $row->jabatan </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>c. Lokasi </td>
            <td>: $row->lokasi</td>
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
				<td width='50'  align='center' class='header_form'>Jumlah</td>
                <td width='77'  align='center' class='header_form'>Tarif Rp. </td>
                <td width='20'  align='center' class='header_form'>DI</td>
                <td width='76'  align='center' class='header_form'>Tanggal Berangkat  </td>
                <td width='82' align='center' class='header_form'>Tanggal Tiba</td>
                <td width='40'  align='center' class='header_form'>Lama Hari </td>
                <td width='60'  align='center' class='header_form'>Tarif</td>
				
                <td width='82'  align='center' class='header_form'>Jml uang Harian </td>
                <td width='50'  align='center' class='header_form'>Ket</td>
                <td width='70'  align='center' class='header_form'>Kota</td>
              </tr>
             ";
				 $sql1="select a.no_spj,a.no_urut,b.asal,b.tujuan,d.nama as jenis,b.nilai as tarif,b.jumlah,isnull(c.persen,0) as persen,
              date_format(c.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(c.tgl_selesai,'%d/%m/%Y') as tgl_selesai,c.lama,c.tarif as tarif_uh,c.nilai as nilai_uh
          from (select distinct no_spj,no_urut from sp_spj_dt
              union 
              select distinct no_spj,no_urut from sp_spj_dh
                )a
          left join sp_spj_dt b on a.no_spj=b.no_spj and a.no_urut=b.no_urut
          left join sp_spj_dh c on a.no_spj=c.no_spj and a.no_urut=c.no_urut
          left join sp_jenis d on b.kode_jenis=d.kode_jenis
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
				$jumlah="";
				if ($row1->lama >0)
				{
					$tarif_uh=number_format($row1->tarif_uh,0,',','.');
					$nilai_uh=number_format($row1->nilai_uh,0,',','.');
					$lama=number_format($row1->lama,0,',','.');
					
				}
				$jumlah=number_format($row1->jumlah,0,',','.');
				if ($row1->persen <>100)
				{
					$persen=number_format($row1->persen,0,',','.')."%";
				}
				if ($row1->persen ==0)
				{
					$persen="";
				}
				     echo "<tr>
                <td class='isi_form' align='center'>$j</td>
                <td class='isi_form'>$row1->asal - $row1->tujuan</td>
                <td class='isi_form'>$row1->jenis</td>
				<td align='center' class='isi_form'>$jumlah</td>
                <td align='right' class='isi_form'>".number_format($row1->tarif,0,',','.')."</td>
                <td class='isi_form'>&nbsp;</td>
                <td align='center' class='isi_form'>$row1->tgl_mulai</td>
                <td align='center' class='isi_form'>$row1->tgl_selesai</td>
                <td align='center' class='isi_form'>$lama</td>
                <td align='right' class='isi_form'>$tarif_uh</td>
				
                <td align='right' class='isi_form'>$nilai_uh</td>
                <td class='isi_form' align='center'>$persen</td>
                <td class='isi_form' align='center'>$row->tempat</td>
              </tr>";
				$j=$j+1;
			}
			echo "<tr>
                <td colspan='4'>&nbsp;</td>
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
     

    
      
    </table></td>
  </tr>
</table></td>
  </tr>
  
</table><br>";
		 
			$i=$i+1;
		}
		
		echo "<DIV style='page-break-after:always'></DIV>";
		$sql=  "select a.no_aju,a.kode_lokasi,a.keterangan,a.kode_pp,b.nama as nama_pp,d.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun, 
		a.kode_drk,e.nama as nama_drk, a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app,convert(varchar,a.tanggal,103) as tgl 
				from sp_stugas_m a
				inner join it_aju_m d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_Lokasi 
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
                left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
                $this->filter 
                order by a.no_aju";
        $rs2 = $dbLib->execute($sql);
		
		$i=1;
	
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row2->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
                <tr>
                    <td align='center'><img src='$logo' width='200' height='72'></td>
                </tr>
                <tr>
                    <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr>
                    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERTANGGUNGAN BEBAN</td>
                </tr>
                
                <tr>
                    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
                <tr>
                    <td><table width='100%'  border='0'>
                    <tr>
                        <td width='200'>No Pertanggungan</td>
                        <td width='600' class='judul_bukti'>$row2->no_aju </td>
                    </tr>
                    <tr>
                        <td>Tanggal</td>
                        <td>: $row2->tgl </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td width='200'>PP</td>
                        <td width='600'>: $row2->kode_pp - $row2->nama_pp </td>
                    </tr>
                    <tr>
                        <td>MTA</td>
                        <td>: $row2->kode_akun - $row2->nama_akun </td>
                    </tr>
                    <tr>
                        <td>DRK</td>
                        <td>: $row2->kode_drk - $row2->nama_drk </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Keterangan</td>
                        <td>: $row2->keterangan </td>
                    </tr>
                    <tr>
                        <td>Nilai</td>
                        <td>: ".number_format($row2->nilai,0,",",".")." </td>
                    </tr>
                    <tr>
                        <td>Terbilang</td>
                        <td>: ".$AddOnLib->terbilang($row2->nilai)." </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    
                    </table></td>
                </tr>
                <tr>
                    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
                    <tr>
                        <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
                        <td width='150' align='center' class='header_laporan'>No Rekening</td>
                        <td width='150' align='center' class='header_laporan'>Bank</td>
                        <td width='80' align='center' class='header_laporan'>Bruto</td>
                        <td width='80' align='center' class='header_laporan'>Pajak</td>
                        <td width='80' align='center' class='header_laporan'>Netto</td>
                    </tr>";
	  $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as bruto,isnull(pajak,0) as pajak,nilai as netto 
            from it_aju_rek
            where no_aju='$row2->no_aju' and kode_lokasi='$row2->kode_lokasi' 
            order by no_rek";
	 
      $rs1 = $dbLib->execute($sql);
	  $bruto=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$bruto+=$row1->bruto;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      echo "<tr>
                <td class='isi_laporan'>$row1->nama_rek</td>
                <td class='isi_laporan'>$row1->no_rek</td>
                <td class='isi_laporan'>$row1->bank</td>
                <td class='isi_laporan' align='right'>".number_format($row1->bruto,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
            </tr>";
		}
		 echo "<tr>
                    <td class='header_laporan' colspan='3' align='right'>Total</td>
                
                    <td class='header_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
                    <td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
                    <td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
                </tr>";
    echo "</table></td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr
            <tr>
                <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
                <tr align='center'>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td align='center'>Bandung, ".substr($row2->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row2->tanggal),0,6))."</td>
                </tr>
                <tr align='center'>
                    <td width='200'>Mengetahui/Menyetujui :</td>
                    <td width='400'>&nbsp;</td>
                    <td width='200'>&nbsp;</td>
                </tr>
                <tr align='center'>
                    <td >Ka .PP</td>
                    <td >&nbsp;</td>
                    <td >Dibuat Oleh,</td>
                </tr>
                
                <tr align='center' valign='bottom'>
                    <td height='70' class='garis_bawah'>$row2->nama_app</td>
                    <td>&nbsp;</td>
                    <td class='garis_bawah'>$row2->nama_user </td>
                </tr>
                <tr align='center' valign='bottom'>
                    <td>NIP : $row2->nik_app</td>
                    <td>&nbsp;</td>
                    <td>NIP : $row2->nik_user</td>
                </tr>
                </table></td>
            </tr>
            
            
          </table></td>
            </tr>
          </table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
        echo "</div>";
		
	}
	
}
?>
