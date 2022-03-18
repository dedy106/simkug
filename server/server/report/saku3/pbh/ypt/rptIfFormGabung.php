<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_ypt_rptIfFormGabung extends server_report_basic
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
// 		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,i.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,i.kode_akun,c.nama as nama_akun,
// 		i.kode_drk,e.nama as nama_drk,h.logo,h.alamat,
// 		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
// from pbh_pb_m a
// inner join pbh_pb_j i on a.no_pb=i.no_pb and a.kode_lokasi=i.kode_lokasi
// inner join pp b on i.kode_pp=b.kode_pp and i.kode_lokasi=b.kode_lokasi
// inner join masakun c on i.kode_akun=c.kode_akun and i.kode_lokasi=c.kode_lokasi
// left join drk e on i.kode_drk=e.kode_drk and i.kode_lokasi=e.kode_lokasi and e.tahun='2020'
// left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
// left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
// left join lokasi h on a.kode_lokasi=h.kode_lokasi
// $this->filter order by a.no_pb";

$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,
        a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,i.kode_akun,c.nama as nama_akun,
                d.bank,d.no_rek,d.nama_rek,i.kode_drk,e.nama as nama_drk,
                a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app,h.logo,h.alamat,isnull(j.kode_project,'-') as status
                from pbh_pb_m a
                left join pbh_pb_j i on a.no_pb=i.no_pb and a.kode_lokasi=i.kode_lokasi
                inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
                left join masakun c on i.kode_akun=c.kode_akun and i.kode_lokasi=c.kode_lokasi
                left join pbh_rek d on a.no_pb=d.no_bukti and a.kode_lokasi=d.kode_lokasi
                left join drk e on i.kode_drk=e.kode_drk and i.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
                left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
                left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
                left join lokasi h on a.kode_lokasi=h.kode_lokasi
                left join hutang_m j on a.no_pb=j.no_hutang and a.kode_lokasi=j.kode_lokasi
                $this->filter order by a.no_pb";

                // echo $sql;
		
$root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
        $i=1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tu.jpg";
        
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR REIMBURSE IMPREST FUND</td>
  </tr>
  <tr>
	<td align='right' >
		<img alt='$row->no_pb' src='$root_app/barcode.php?size=30&amp;text=$row->no_pb'>
	</td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
	  <tr>
        <td width='200'>No Pertanggungan</td>
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
        <td>Status</td>
        <td>: $row->status </td>
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
	  $sql="select no_rek,nama_rek,bank,nilai+isnull(pajak,0) as nilai,isnull(pajak,0) as pajak,nilai as netto 
from pbh_rek
where no_bukti='$row->no_pb' and kode_lokasi='$row->kode_lokasi' 
order by no_rek";
      $rs1 = $dbLib->execute($sql);
	  $nilai=0; $pajak=0; $netto=0;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_laporan'>$row1->nama_rek</td>
        <td class='isi_laporan'>$row1->no_rek</td>
        <td class='isi_laporan'>$row1->bank</td>
        <td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->pajak,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
		}
		 echo "<tr>
        <td class='header_laporan' colspan='3' align='right'>Total</td>
      
        <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($pajak,0,",",".")."</td>
		<td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti' class='header_laporan'>NO.</td>
        <td width='100' align='center' class='isi_bukti' class='header_laporan'>MTP</td>
        <td width='80' align='center' class='isi_bukti' class='header_laporan'>KODE PP </td>
        <td width='100' align='center' class='isi_bukti' class='header_laporan'>KODE DRK </td>
        <td width='250' align='center' class='isi_bukti' class='header_laporan'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti' class='header_laporan'>JUMLAH (RP) </td>
      </tr>";
	  $sql="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.nilai 
      from hutang_j a
      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
      where a.no_hutang='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and a.dc='D'
      union all
      select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.nilai*-1 as nilai 
      from hutang_j a
      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
      where a.no_hutang='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and a.dc='C' and a.jenis='PAJAK'
      order by a.kode_akun";
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
      echo "<tr>
        <td class='isi_bukti' align='center'>$j</td>
        <td class='isi_bukti'>$row1->kode_akun</td>
        <td class='isi_bukti'>$row1->kode_pp</td>
        <td class='isi_bukti'>$row1->kode_drk</td>
        <td class='isi_bukti'>$row1->keterangan</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
      </tr>";
			$j+=1;
		}
	
      echo "<tr>
        <td colspan='5' align='center' class='isi_bukti'>TOTAL</td>
        <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400' class='isi_bukti'>REALISASI :</td>
        <td width='400' class='isi_bukti'>TERBILANG :</td>
      </tr>
      <tr>
        <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr bgcolor='#CCCCCC'>
            <td width='30' align='center' class='isi_bukti'>NO</td>
            <td width='80' align='center' class='isi_bukti'>MTP</td>
            <td width='200' align='center' class='isi_bukti'>NAMA MTP </td>
            <td width='90' align='center' class='isi_bukti'>JUMLAH</td>
          </tr>";
		  $sql="
          select a.kode_akun,b.nama,sum(a.nilai) as nilai 
          from hutang_j a
          inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
          where a.no_hutang='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and a.dc='D'
          group by a.kode_akun,b.nama
          union all
          select a.kode_akun,b.nama,sum(a.nilai)*-1 as nilai 
          from hutang_j a
          inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
          where a.no_hutang='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' and a.dc='C' and a.jenis='PAJAK'
          group by a.kode_akun,b.nama ";
            
	  $rs1 = $dbLib->execute($sql);
	  $j=1;
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
          echo "<tr>
            <td class='isi_bukti' align='center'>$j</td>
            <td class='isi_bukti'>$row1->kode_akun</td>
           <td class='isi_bukti'>$row1->nama</td>
             <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
          </tr>";
			$j+=1;
		}
		  
          echo "<tr>
            <td colspan='3' align='center'>TOTAL REALISASI</td>
            <td class='isi_bukti' align='right'>".number_format($row->nilai,0,",",".")."</td>
          </tr>
        </table></td>
        <td valign='top'>".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td class='isi_bukti' align='right'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>

      <tr>
        <td width='150' align='center'>Fiatur</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Verifikasi</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Mengetahui Ka. PP</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Yang Mempertanggungkan </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
		<td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='garis_bawah' align='center'></td>
		<td>&nbsp;</td>
        <td class='garis_bawah' align='center'></td>
		<td>&nbsp;</td>
        <td class='garis_bawah' align='center'>$row->nama_app</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>$row->nama_user</td>
      </tr>
      <tr>
        <td align='center' ></td>
		<td>&nbsp;</td>
        <td align='center' ></td>
		<td>&nbsp;</td>
        <td align='center' >NIP : $row->nik_app</td>
		<td>&nbsp;</td>
        <td >NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='isi_laporan'>MODUL : KUG=06 </td>
        <td colspan='2' class='isi_laporan'>YAYASAN PENDIDIKAN TELKOM </td>
        </tr>
      <tr>
        <td width='299' align='left' class='isi_laporan'>Lembar 1. Bendaharawan </td>
        <td width='225' align='center' class='isi_laporan'>Lembar 2. Akuntansi </td>
        <td width='262' align='right' class='isi_laporan'>Lembar 3. Pemegang Panjar </td>
      </tr>
    </table></td>
  </tr>
  
</table></td>
  </tr>
</table>
	<br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
        echo "</div>";
        
		return "";
		
	}
	
}
?>
