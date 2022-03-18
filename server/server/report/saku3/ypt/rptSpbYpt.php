<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_rptSpbYpt extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select 1 ";
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
		$kode_lokasi=$tmp[1];
		$sql="select value1 from spro where kode_lokasi='$kode_lokasi' and kode_spro='MAXFIAT'";
		$rs = $dbLib->execute($sql);		
		$row = $rs->FetchNextObject($toupper=false);
		$value1=$row->value1;
		
		$sql="select value1 from spro where kode_lokasi='$kode_lokasi' and kode_spro='MAXFIAT'";
		$rs = $dbLib->execute($sql);		
		$row = $rs->FetchNextObject($toupper=false);
		$value1=$row->value1;
		
		$sql="select a.nama,a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,a.no_cek,
       a.nik_user,b.nama as nama_buat,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_app1,a.nik_fiat,e.nama as nama_fiat,g.nama as nama_app2,
	   CONVERT(varchar, a.tanggal, 103) as tgl,f.logo,f.nama as nama_lokasi,
	   b.jabatan as jab_buat,c.jabatan as jab_bdh,d.jabatan as jab_app1,e.jabatan as jab_fiat,g.jabatan as jab_app2
from it_spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi
left join karyawan g on a.nik_app2=g.nik and a.kode_lokasi=g.kode_lokasi
 $this->filter";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/tu.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nama_lokasi=strtoupper($row->nama_lokasi);
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150' ><img src='$logo' width='140' height='80'></td>
        <td width='650'>Gedung Sate lantai 2 <br />Jl. Cisanggarung No.2 Bandung 40115 Jawa Barat<br />Tel. 022 423 9717; Fax. 022 710 2444 </td>
      </tr>
      
    </table></td>
  </tr>
 
 
  <tr>
    <td align='center' class='isi_bukti'><b>SURAT PERINTAH BAYAR (SPB) </b></td>
  </tr>
  <tr>
    <td align='center' class='isi_bukti'><b>Nomor : ".strtoupper($row->no_spb)." </b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>BENDAHARAWAN DIMOHON UNTUK MEMBAYARKAN UANG SEBESAR : </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='257' class='isi_bukti'><b>Rp. ".number_format($row->nilai,0,",",".")." </b></td>
        <td width='533' class='isi_bukti'><i><b> ".$AddOnLib->terbilang($row->nilai)." </b></i></td>
      </tr>
     
      <tr>
        <td  height='20' class='isi_bukti'>KEPADA : </td>
        <td> &nbsp; </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>NAMA</td>
        <td class='isi_bukti'>: $row->nama </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>ALAMAT</td>
        <td class='isi_bukti'>: $row->alamat </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>UNTUK PEMBAYARAN KEGIATAN</td>
        <td class='isi_bukti'>: $row->keterangan  </td>
      </tr>
	  <tr>
        <td  height='20' class='isi_bukti'>NOMOR BILYET</td>
        <td class='isi_bukti'>: $row->no_cek  </td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td>DENGAN RINCIAN SBB : </td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO</td>
        <td width='80' align='center' class='isi_bukti'>TANGGAL</td>
        <td width='100' align='center' class='isi_bukti'>NO AGENDA </td>
        <td width='250' align='center' class='isi_bukti'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti'>BRUTO</td>
		<td width='100' align='center' class='isi_bukti'>PAJAK</td>
		<td width='100' align='center' class='isi_bukti'>NETTO</td>
      </tr>";
		$sql="select a.no_aju,a.tanggal,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		isnull(b.nilai,0)+isnull(b.nilai2,0) as nilai,isnull(b.npajak,0) as npajak,isnull(b.nilai,0)+isnull(b.nilai2,0)-isnull(b.npajak,0)  as netto
from it_aju_m a 
left join (select a.no_aju,a.kode_lokasi,
	   sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='C' then a.nilai else 0 end) as npajak, 
	   sum(case when a.kode_akun not in ('1132103','2121101','2121102','4960001','2121103','2121107')  then a.nilai else 0 end) as nilai,
	   sum(case when a.kode_akun in ('1132103','2121101','2121102','4960001','2121103','2121107') and a.dc='D' then a.nilai else 0 end) as nilai2
from it_aju_d a
inner join it_aju_m b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where b.no_spb='$row->no_spb' and b.kode_lokasi='$row->kode_lokasi'
group by a.no_aju,a.kode_lokasi
		)b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_aju ";
	
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$nilai=0;$npajak=0;$netto=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai+=$row1->nilai;
			$npajak+=$row1->npajak;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
		<td class='isi_bukti'>$row1->tgl</td>
        <td class='isi_bukti'>$row1->no_aju</td>
        
        <td class='isi_bukti'>$row1->keterangan</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($row1->npajak,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='4' align='center' class='isi_bukti'>TOTAL</td>
        <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($npajak,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($netto,0,",",".")."</td>
      </tr>
	 
    </table></td>
  </tr>
 <tr>
    <td>&nbsp;</td>
  </tr>
	

  <tr>
    <td>";
	if ($row->nilai<$value1)
	{
	echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr align='center'>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
      <tr>
      <td>&nbsp;</td>
        <td width='250' align='center' class='isi_bukti'>Yang Membuat</td>
        <td width='250' align='center' class='isi_bukti'>Verifikator</td>
        <td width='300' align='center' class='isi_bukti'>Fiatur</td>
      </tr>
          <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>

      </tr>
      <tr>
      <td>&nbsp;</td>
      <td class='isi_bukti' align='center'><u>$row->nama_buat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_buat)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_bdh)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_fiat)."</td>
      </tr>
    </table>";
	}
	else
	{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr align='center'>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
      <tr>
      <td>&nbsp;</td>
        <td width='200' align='center' class='isi_bukti'>Yang Membuat</td>
        <td width='200' align='center' class='isi_bukti'>Verifikator</td>
        <td width='200' align='center' class='isi_bukti'>Fiatur</td>
		<td width='200' align='center' class='isi_bukti'>Menyetujui</td>
      </tr>
          <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>

      </tr>
      <tr>
      <td>&nbsp;</td>
      <td class='isi_bukti' align='center'><u>$row->nama_buat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
		<td class='isi_bukti' align='center'><u>$row->nama_app2</u></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_buat)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_bdh)."</td>
        <td class='isi_bukti' align='center'>".strtoupper($row->jab_fiat)."</td>
		<td class='isi_bukti' align='center'>".strtoupper($row->jab_app2)."</td>
      </tr>
    </table>";
	}
	
	
	echo "</td>
  </tr>
  
</table>";
      $i=$i+1;
    
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
