<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_bymhd_rptBymhd extends server_report_basic
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
		$periode=$tmp[1];
    $kode_lokasi=$tmp[0];
    $jenis=$tmp[2];
		$nama_file="pb_".$periode.".xls";
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user,a.tanggal,a.modul,a.no_hutang,
          h.logo,h.alamat,h.kota,a.nik_buat,a.nik_app,f.nama as nama_buat,g.nama as nama_app,substring(a.periode,1,4) as tahun,
          a.nik_ver,b.nama as nama_ver
      from pbh_pb_m a
      left join karyawan f on a.nik_buat=f.nik and a.kode_lokasi=f.kode_lokasi
      left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
      left join lokasi h on a.kode_lokasi=h.kode_lokasi
      left join karyawan b on a.nik_ver=b.nik
    $this->filter and a.modul='PBBMHD' order by a.no_pb";
    
    $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
    if ($jenis=="Excel")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			$rs = $dbLib->execute($sql);
		}

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;$pg=1;
		echo "<div align='center'>"; 
		
		$count_page = $rs->RecordCount();
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
			
		echo "<table width='900' border='0' cellspacing='0' cellpadding='0' >
  
  
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>PERMINTAAN BAYAR</td>
  </tr>
  <tr>
	<td align='right' >
		<img alt='$row->no_pb' src='$root_app/barcode.php?size=30&amp;text=$row->no_pb'>
	</td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='200'>No Bukti</td>
        <td width='600' class='judul_bukti'>$row->no_pb </td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl </td>
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
      <tr>
        <td colspan='2'><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='900'>
      <tr bgcolor='#CCCCCC'>
        <td width='80' align='center' class='header_laporan'>Kode Akun</td>
        <td width='160' align='center' class='header_laporan'>Nama Akun</td>
        <td width='70' align='center' class='header_laporan'>Kode PP</td>
		<td width='150' align='center' class='header_laporan'>Nama PP</td>
		<td width='70' align='center' class='header_laporan'>Kode DRK</td>
		<td width='150' align='center' class='header_laporan'>Nama DRK</td>
		<td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='90' align='center' class='header_laporan'>Potongan</td>
    <td width='90' align='center' class='header_laporan'>Pajak</td>
      </tr>";
      $sql="select a.kode_akun,a.kode_lokasi,a.kode_drk,a.kode_pp,a.dc,
      b.nama as nama_pp,c.nama as nama_akun,d.nama as nama_drk,isnull(a.beban,0) as beban,
      isnull(a.potongan,0) as potongan,isnull(a.pajak,0) as pajak
 from (select a.kode_akun,a.kode_lokasi,a.kode_pp,a.kode_drk,a.dc,
 			case when (a.jenis<>'PAJAK' and a.dc='D') then a.nilai else 0 end as beban,
 			case when (a.jenis<>'PAJAK' and a.dc='C') then a.nilai else 0 end as potongan,
 			case when a.jenis='PAJAK' then a.nilai else 0 end as pajak
 from pbh_pb_j a
 where a.no_pb='$row->no_pb' 
   )a
 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
 inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
 left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$row->tahun' 
 order by a.dc desc,a.kode_akun";
     
     $rs1 = $dbLib->execute($sql);
     $beban=0; $potongan=0; $pajak=0;
     while ($row1 = $rs1->FetchNextObject($toupper=false))
     {
        $beban+=$row1->beban;
        $potongan+=$row1->potongan;
        $pajak+=$row1->pajak;
       echo "<tr>
         <td class='isi_laporan'>$row1->kode_akun</td>
         <td class='isi_laporan'>$row1->nama_akun</td>
         <td class='isi_laporan'>$row1->kode_pp</td>
        <td class='isi_laporan'>$row1->nama_pp</td>
         <td class='isi_laporan'>$row1->kode_drk</td>
         <td class='isi_laporan'>$row1->nama_drk</td>
        <td class='isi_laporan' align='right'>".number_format($row1->beban,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->potongan,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
       </tr>";
     }
     echo "<tr>
         <td class='header_laporan' colspan='6' align='right'>Total</td>
		    <td class='header_laporan' align='right'>".number_format($beban,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($potongan,0,",",".")."</td>
        <td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
       </tr>";
		
    echo "</table></td>
      </tr>";
	  echo "
     
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      
     
    </table></td>
  </tr>
   
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td class='header_laporan'>Daftar Rekening :</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>";
  echo "<tr><td>";
     if ($row->modul!="PBHKES") {
          echo "<table width='900' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                <tr bgcolor='#CCCCCC'>
                  <td width='30' align='center' class='header_laporan'>No</td>
                  <td width='150' align='center' class='header_laporan'>Nama</td>
                  <td width='100' align='center' class='header_laporan'>Bank</td>
                  <td width='120' align='center' class='header_laporan'>No Rekening</td>
                  <td width='150' align='center' class='header_laporan'>Nama Rekening </td>
                  <td width='90' align='center' class='header_laporan'>Nilai </td>
                </tr>";
          $sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai,b.nama_rek,c.alamat
          from pbh_pb_m a
          inner join pbh_rek b on a.no_pb=b.no_bukti
          left join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
          where a.no_pb='$row->no_pb'";
          $rs1 = $dbLib->execute($sql);	
          $j=1; $nilai=0;
          while ($row1 = $rs1->FetchNextObject($toupper=false))
          {
              $nilai+=$row1->nilai;
              echo "<tr>
              <td class='isi_laporan' align='center'>$j</td>
              <td class='isi_laporan'>$row1->nama</td>
              <td class='isi_laporan'>$row1->bank</td>
              <td class='isi_laporan'>$row1->no_rek</td>
              <td class='isi_laporan'>$row1->nama_rek</td>
              <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
              <tr>";
              $j+=1;
          }
          echo "<tr>
              <td class='header_laporan' align='right' colspan='5'>Total</td>
              <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
              <tr>";
          echo "</table>";
      }
      else {

        echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
      <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
      <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Penerima </td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>No Rekening</td>
      <td width='250' rowspan='2' align='center' class='header_laporan'>Nama Bank</td>
       <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
    </tr>
    <tr bgcolor='#CCCCCC'> 
      <td width='80' align='center' class='header_laporan'>Pegawai</td>
      <td width='80' align='center' class='header_laporan'>Pensiun</td>
      <td width='80' align='center' class='header_laporan'>Nilai PPH</td>
      <td width='80' align='center' class='header_laporan'>Total</td>
    </tr>
    <tr align='center' bgcolor='#CCCCCC'>
      <td class='isi_laporan'>1</td>
      <td class='isi_laporan'>2</td>
      <td class='isi_laporan'>3</td>
      <td class='isi_laporan'>4</td>
      <td class='isi_laporan'>5</td>
      <td class='isi_laporan'>6</td>
      <td class='isi_laporan'>7</td>
      <td class='isi_laporan'>8=5+6-7</td>
      <td class='isi_laporan'>9</td>
    </tr>";

    $sql1="select a.nama_rek,a.no_rek,a.bank, a.nilai_bp+a.pajak_bp as nilai_bp,a.nilai_cc+a.pajak as nilai_cc,a.pajak+a.pajak_bp as pajak,a.nilai_bp+a.nilai_cc as total,b.nama as nama_vendor
		from yk_hutang_d a 
		inner join vendor b on a.kode_vendor=b.kode_vendor 
		where a.no_pb='$row->no_pb' 
		order by a.bank";
		$rs1 = $dbLib->execute($sql1);
		$nilai_bp=0;$nilai_cc=0;$total=0; $i=1;
		$pajak = 0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai_bp+=$row1->nilai_bp;
			$nilai_cc+=$row1->nilai_cc;
			$pajak+=$row1->pajak;
			$total+=$row1->total;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->nama_rek</td>
    <td class='isi_laporan'>$row1->no_rek</td>
    <td class='isi_laporan'>$row1->bank &nbsp; $row1->cabang</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->nilai_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->nilai_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->pajak,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->total,0,',','.')."</td>
	<td class='isi_laporan'>$row1->nama_vendor</td>
    </tr>";
			$i=$i+1;
		}
	echo "<tr>
    <td colspan='4' align='right' class='header_laporan'>Total</td>
   <td width='80' align='right' class='header_laporan'>".number_format($nilai_bp,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($nilai_cc,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($pajak,0,',','.')."</td>
    <td width='80' align='right' class='header_laporan'>".number_format($total,0,',','.')."</td>
	<td width='150' align='center' class='header_laporan'>&nbsp;</td>
     </tr>
    </table>
    ";
      }

  echo "</td></tr>";
  echo "<tr>
  <td>&nbsp;</td>
</tr>";

if ($row->modul!="PBHKES") {
  echo "<tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
		    <td>&nbsp;</td>
        <td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr height='20'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
		    <td >&nbsp;</td>
        <td >&nbsp;</td>
      </tr>
	   <tr align='center'>
        <td width='200'>&nbsp;</td>
         <td width='200'>&nbsp;</td>
        <td width='200'>Mengetahui</td>
        <td width='200'>Dibuat Oleh,</td>
      </tr>
      <tr height='60'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
		    <td >&nbsp;</td>
        <td >&nbsp;</td>
      </tr>
  
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
		    <td>$row->nama_app</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
		    <td>$row->nik_app</td>
        <td>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>";
}
else {
  echo "<tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
		    <td>&nbsp;</td>
        <td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr height='20'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
		    <td >&nbsp;</td>
        <td >&nbsp;</td>
      </tr>
	   <tr align='center'>
        <td width='200'>&nbsp;</td>
         <td width='200'>Menyetujui</td>
        <td width='200'>Mengetahui</td>
        <td width='200'>Dibuat Oleh,</td>
      </tr>
      <tr height='60'>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
		    <td >&nbsp;</td>
        <td >&nbsp;</td>
      </tr>
  
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>$row->nama_app</td>
		    <td>$row->nama_ver</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center' valign='bottom'>
        <td>&nbsp;</td>
        <td>$row->nik_app</td>
		    <td>$row->nik_ver</td>
        <td>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>";

}
  
echo "</table></td>
  </tr>
</table><br>";
      if($pg != $count_page ){
        echo "
        <DIV style='page-break-after:always'></DIV>";
      }

      
			$i=$i+1;
      $pg++;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
}
?>
