<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptBebanFormTuPdd extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
    $tahun=substr($tmp[0],0,4);
    $kode_lokasi = $tmp[1];
    $filter3 = $tmp[2];
		$sql="select a.no_aju,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		a.kode_drk,e.nama as nama_drk,h.logo,h.alamat,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app,a.no_ref1
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
left join lokasi h on a.kode_lokasi=h.kode_lokasi
inner join (select no_bukti, kode_lokasi, count(nim) as jum 
from aka_cd_d
$filter3
group by no_bukti,kode_lokasi) o on a.kode_lokasi=o.kode_lokasi and a.no_aju=o.no_bukti
$this->filter order by a.no_aju";
		
$root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>$alamat</td>
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
        <td width='600' class='judul_bukti'>$row->no_aju </td>
        <td rowspan='8' style='vertical-align:top'><img alt='$row->no_aju' src='$root_app/barcode.php?size=30&amp;text=$row->no_aju'></td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl </td>
      </tr>
	   <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td width='200'>PP</td>
        <td width='600'>: $row->kode_pp - $row->nama_pp </td>
      </tr>
      <tr>
        <td>MTA</td>
        <td>: $row->kode_akun - $row->nama_akun </td>
      </tr>
      <tr>
        <td>DRK</td>
        <td>: $row->kode_drk - $row->nama_drk </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Keterangan</td>
        <td>: $row->keterangan </td>
      </tr>
      <tr>
        <td>Nilai</td>
        <td>: ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>Terbilang</td>
        <td>: ".$AddOnLib->terbilang($row->nilai)." </td>
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
        <td width='150' align='center' class='header_laporan'>No Peserta/NIM</td>
        <td width='200' align='center' class='header_laporan'>Tahun Akademik</td>
        <td width='200' align='center' class='header_laporan'>Nama Rekening</td>
        <td width='150' align='center' class='header_laporan'>No Rekening</td>
        <td width='150' align='center' class='header_laporan'>Bank</td>
        <td width='80' align='center' class='header_laporan'>Bruto</td>
		<td width='80' align='center' class='header_laporan'>Pajak</td>
		<td width='80' align='center' class='header_laporan'>Netto</td>
      </tr>";
	  $sql="select a.nim,a.no_rek,a.nama_rek,a.bank,a.nilai+0 as nilai,0 as pajak,a.nilai as netto ,a.tahunaka, isnull(b.jum,0) as jum
    from aka_cd_d a
    left join (select no_aju,no_rek,kode_lokasi,count(*) as jum
          from it_aju_rek 
          where no_kastitip is not null
          group by no_aju,no_rek,kode_lokasi
        ) b on a.no_bukti=b.no_aju and a.kode_lokasi=b.kode_lokasi and a.no_rek=b.no_rek
    where a.no_bukti='$row->no_aju' and a.kode_lokasi='$row->kode_lokasi' 
    order by a.nim";
      $rs1 = $dbLib->execute($sql);
	  $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      // if($row1->jum > 0){
      //   $color="yellow";
      // }else{
      //   $color="none";
      // }
      echo "<tr>
        <td class='isi_laporan'>$row1->nim</td>
        <td class='isi_laporan'>$row1->tahunaka</td>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td class='isi_laporan'>$row1->bank</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
		}
		 echo "<tr>
        <td class='header_laporan' colspan='5' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
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
		<td>&nbsp;</td>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
	   <tr align='center'>
        <td width='200'>Mengetahui/Menyetujui :</td>
         <td width='200'>Fiat Bayar </td>
        <td width='200'>Verifikasi</td>
        <td width='200'>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td >Ka .PP</td>
        <td >&nbsp;</td>
		<td >&nbsp;</td>
        <td >Dibuat Oleh,</td>
      </tr>
    
      <tr align='center' valign='bottom'>
        <td height='70' class='garis_bawah'>$row->nama_app</td>";
        if($kode_lokasi == "11"){

          echo"
          <td>Nurlaela</td>
          <td>Lilies Soenaryati</td>";
        }else{
          
          echo"
          <td>&nbsp;</td>
          <td>&nbsp;</td>";
        }
        echo"
        <td class='garis_bawah'>$row->nama_user </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>NIP : $row->nik_app</td>
        <td>&nbsp;</td>
		<td>&nbsp;</td>
        <td>NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
 
  
</table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
            // LAPORAN KE 2
            if($row->no_ref1 == "MALA"){

              echo "
              <table width='800' border='0' cellspacing='0' cellpadding='0' >
    <tr>
      <td height='30' align='center' valign='middle' class='judul_bukti'>DAFTAR PERTANGGUNGAN PENGEMBALIAN LEBIH BAYAR MAHASISWA</td>
    </tr>
    
    <tr>
      <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
    <tr>
      <td><table width='100%'  border='0'>
      <tr>
          <td width='200'>No Pertanggungan</td>
          <td width='600' class='judul_bukti'>$row->no_aju </td>
          <td rowspan='8' style='vertical-align:top'></td>
        </tr>
        <tr>
          <td>Keterangan</td>
          <td>: $row->keterangan </td>
        </tr>
        <tr>
          <td>Nilai</td>
          <td>: ".number_format($row->nilai,0,",",".")." </td>
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
          <td width='150' align='center' class='header_laporan'>NIM</td>
          <td width='200' align='center' class='header_laporan'>Nama</td>
          <td width='200' align='center' class='header_laporan'>Tagihan</td>
          <td width='150' align='center' class='header_laporan'>Potongan</td>
          <td width='150' align='center' class='header_laporan'>Beasiswa</td>
          <td width='80' align='center' class='header_laporan'>Tot Tagihan</td>
      <td width='80' align='center' class='header_laporan'>Tot Bayar</td>
      <td width='80' align='center' class='header_laporan'>Lebih Bayar</td>
      <td width='80' align='center' class='header_laporan'>No Rek</td>
      <td width='80' align='center' class='header_laporan'>Bank</td>
      <td width='80' align='center' class='header_laporan'>Nama Rek</td>
      <td width='80' align='center' class='header_laporan'>Jenis Beasiswa</td>
      <td width='80' align='center' class='header_laporan'>Thn Akademik</td>
      <td width='80' align='center' class='header_laporan'>No Duplikasi</td>
        </tr>";
      $sql="select nim,nama,tagihan,beasiswa,potongan,tot_tagih,tot_bayar,lebih_bayar,no_rek,bank,nama_rek,jenis_bea, tahun_aka,no_duplikat 
      from aka_pddout_d
      where no_bukti='$row->no_aju' and kode_lokasi='$row->kode_lokasi' 
      order by nim";
        $rs2 = $dbLib->execute($sql);
      $tgh=0; $bea=0; $pot=0; $tot_tgh=0;$tot_byr=0;$lebih=0;
      while ($row2 = $rs2->FetchNextObject($toupper=false))
      {
        $tgh+=$row2->tagihan;
        $bea+=$row2->beasiswa;
        $netto+=$row2->netto;
        $pot+=$row2->potongan;
        $tot_tgh+=$row2->tot_tagih;
        $tot_byr+=$row2->tot_bayar;
        $lebih+=$row2->lebih_bayar;
        echo "<tr>
          <td class='isi_laporan'>$row2->nim</td>
          <td class='isi_laporan'>$row2->nama</td>
          <td class='isi_laporan' align='right'>".number_format($row2->tagihan,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row2->beasiswa,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row2->potongan,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row2->tot_tagih,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row2->tot_bayar,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row2->lebih_bayar,0,",",".")."</td>
          <td class='isi_laporan'>$row2->no_rek</td>
          <td class='isi_laporan'>$row2->bank</td>
          <td class='isi_laporan'>$row2->nama_rek</td>
          <td class='isi_laporan'>$row2->jenis_bea</td>
          <td class='isi_laporan'>$row2->tahun_aka</td>
          <td class='isi_laporan'>$row2->no_duplikat</td>
        </tr>";
      }
    // 	 echo "<tr>
      //     <td class='header_laporan' colspan='2' align='right'>Total</td>
        
      //     <td class='header_laporan' align='right'>".number_format($tgh,0,",",".")."</td>
    // 	<td class='header_laporan' align='right'>".number_format($bea,0,",",".")."</td>
    // 	<td class='header_laporan' align='right'>".number_format($pot,0,",",".")."</td>
      //     <td class='header_laporan' align='right'>".number_format($tot_tgh,0,",",".")."</td>
    // 	<td class='header_laporan' align='right'>".number_format($tot_byr,0,",",".")."</td>
    // 	<td class='header_laporan' align='right'>".number_format($lebih,0,",",".")."</td>
      //     <td class='header_laporan' colspan='6' align='right'></td>
      //   </tr>";
      echo "</table></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr
    <tr>
      <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
        <tr align='center'>
          <td>Mengetahui/Menyetujui :</td>
          <td>&nbsp;</td>
      <td>&nbsp;</td>
          <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
        <tr align='center'>
          <td >Ka .PP</td>
          <td >&nbsp;</td>
      <td >&nbsp;</td>
          <td >Dibuat Oleh,</td>
        </tr>
        <tr align='center' valign='bottom'>
          <td height='70' class='garis_bawah'>$row->nama_app</td>";
            echo"
            <td>&nbsp;</td>
            <td>&nbsp;</td>";
          echo"
          <td class='garis_bawah'>$row->nama_user </td>
        </tr>
        <tr align='center' valign='bottom'>
          <td>NIP : $row->nik_app</td>
          <td>&nbsp;</td>
      <td>&nbsp;</td>
          <td>NIP : $row->nik_user</td>
        </tr>
      </table></td>
    </tr>
   
    
  </table></td>
    </tr>
  </table><br>
  <DIV style='page-break-after:always'></DIV>
              ";
            }
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
