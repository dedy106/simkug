<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptSpb extends server_report_basic
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
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_sah,d.nama as nama_sah,a.nik_fiat,e.nama as nama_fiat,
	  convert(varchar,a.tanggal,103) as tgl,f.logo,f.alamat,f.nama as nama_lokasi,f.kota,isnull(g.jumlah,0) as jumlah
from spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_sah=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi
left join (select a.no_spb,count(a.no_pb) as jumlah
from pbh_pb_m a
inner join pbh_rek b on a.no_pb=b.no_bukti
group by a.no_spb
        )g on a.no_spb=g.no_spb 
        $this->filter order by a.no_spb";
    //echo $sql;
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
    <td align='center' class='istyle17'>SURAT PERINTAH BAYAR (SPB) </td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>NO SPB : $row->no_spb</td>
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
        <td width='257' class='isi_bukti'>RP : ".number_format($row->nilai,0,",",".")." </td>
        <td width='533' class='isi_bukti'>: ".$AddOnLib->terbilang($row->nilai)." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>";
      if ($row->jumlah==1) {
        $sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai,b.nama_rek,c.alamat
        from pbh_pb_m a
        inner join pbh_rek b on a.no_pb=b.no_bukti
        left join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
        where a.no_spb='$row->no_spb'";
        $rs1 = $dbLib->execute($sql);	
        while ($row1 = $rs1->FetchNextObject($toupper=false))
        {
        echo "<tr>
          <td  height='20' class='isi_bukti'>Kepada : </td>
          <td> &nbsp; </td>
        </tr>
        <tr>
          <td  height='20' class='isi_bukti'>Alamat</td>
          <td class='isi_bukti'>: $row1->alamat </td>
        </tr>
        <tr>
          <td  height='20' class='isi_bukti'>Bank</td>
          <td class='isi_bukti'>: $row1->bank </td>
        </tr>
        <tr>
          <td  height='20' class='isi_bukti'>No Rekening</td>
          <td class='isi_bukti'>: $row1->no_rek </td>
        </tr>
        <tr>
          <td  height='20' class='isi_bukti'>Nama Rekening</td>
          <td class='isi_bukti'>: $row1->nama_rek </td>
        </tr>
        <tr>
          <td  height='20' class='isi_bukti'>Untuk Pembayaran</td>
          <td class='isi_bukti'>: $row->keterangan  </td>
        </tr>";
       }  
      }
      else {
        echo "<tr>
        <td  height='20' class='isi_bukti'>Kepada : </td>
        <td> &nbsp; </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Rekening</td>
        <td class='isi_bukti'>: Terlampir </td>
      </tr>
      <tr>
        <td  height='20' class='isi_bukti'>Untuk Pembayaran</td>
        <td class='isi_bukti'>: $row->keterangan  </td>
      </tr>";

      }
    echo "</table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>DENGAN RINCIAN SBB : </td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='isi_bukti'>NO</td>
        <td width='80' align='center' class='isi_bukti'>TANGGAL</td>
        <td width='100' align='center' class='isi_bukti'>NO PB </td>
        <td width='250' align='center' class='isi_bukti'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti'>BRUTO</td>
		<td width='100' align='center' class='isi_bukti'>PAJAK</td>
		<td width='100' align='center' class='isi_bukti'>NETTO</td>
      </tr>";
		$nilai=0;$pajak=0;$netto=0;
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai as netto,isnull(b.nilai,0) as pajak,a.nilai+isnull(b.nilai,0) as nilai
    from pbh_pb_m a
    left join (select a.no_pb,a.kode_lokasi,sum(a.nilai) as nilai
        from pbh_pb_j a
        where a.kode_lokasi='$row->kode_lokasi' and a.jenis='PAJAK'
        group by a.no_pb,a.kode_lokasi
        )b on a.no_pb=b.no_pb and a.kode_lokasi=b.kode_lokasi
    where a.no_spb='$row->no_spb' ";
	
		$rs1 = $dbLib->execute($sql);
		$i=1;
		$nilai=0;$pajak=0;$netto=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$nilai+=$row1->nilai;
			$pajak+=$row1->pajak;
			$netto+=$row1->netto;
      echo "<tr>
        <td class='isi_bukti' align='center'>$i</td>
		    <td class='isi_bukti'>$row1->tgl</td>
        <td class='isi_bukti'>$row1->no_pb</td>
        
        <td class='isi_bukti'>$row1->keterangan</td>
        <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($row1->pajak,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($row1->netto,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td colspan='4' align='center' class='isi_bukti'>TOTAL</td>
        <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($pajak,0,",",".")."</td>
		<td class='isi_bukti' align='right'>".number_format($netto,0,",",".")."</td>
      </tr>
	 
    </table></td>
  </tr>
 


  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr align='center'>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td align='center'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
  </tr>
      <tr>
      <td>&nbsp;</td>
        <td width='200' align='center' class='isi_bukti'>BENDAHARA</td>
        <td width='250' align='center' class='isi_bukti'>FIATUR</td>
        <td width='200' align='center' class='isi_bukti'>VERIFIKASI</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center' class='isi_bukti'> </td>
        <td align='center' class='isi_bukti'>&nbsp;</td>
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
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_sah</u></td>
      </tr>
      <tr>
      <td>&nbsp;</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_bdh</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_fiat</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_sah</td>
      </tr>
    </table></td>
  </tr>
  
</table>";
      if ($row->jumlah > 0) {
          echo "<br><DIV style='page-break-after:always'></DIV>";
          echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
              <tr>
                <td align='center' class='isi_bukti'>DAFTAR REKENING </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr><td>";

          echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                <tr bgcolor='#CCCCCC'>
                  <td width='30' align='center' class='isi_bukti'>No</td>
                  <td width='150' align='center' class='isi_bukti'>Nama</td>
                  <td width='150' align='center' class='isi_bukti'>Alamat</td>
                  <td width='100' align='center' class='isi_bukti'>Bank</td>
                  <td width='120' align='center' class='isi_bukti'>No Rekening</td>
                  <td width='150' align='center' class='isi_bukti'>Nama Rekening </td>
                  <td width='90' align='center' class='isi_bukti'>Nilai </td>
                </tr>";
          $sql="select a.no_pb,b.bank,b.no_rek,b.nama,b.bruto,b.pajak,b.nilai,b.nama_rek,c.alamat
          from pbh_pb_m a
          inner join pbh_rek b on a.no_pb=b.no_bukti
          left join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
          where a.no_spb='$row->no_spb'";
          $rs1 = $dbLib->execute($sql);	
          $j=1; $nilai=0;
          while ($row1 = $rs1->FetchNextObject($toupper=false))
          {
              $nilai+=$row1->nilai;
              echo "<tr>
              <td class='isi_bukti' align='center'>$j</td>
              <td class='isi_bukti'>$row1->nama</td>
              <td class='isi_bukti'>$row1->alamat</td>
              <td class='isi_bukti'>$row1->bank</td>
              <td class='isi_bukti'>$row1->no_rek</td>
              <td class='isi_bukti'>$row1->nama_rek</td>
              <td class='isi_bukti' align='right'>".number_format($row1->nilai,0,",",".")."</td>
              <tr>";
          }
          echo "<tr>
              <td class='isi_bukti' align='center' colspan='6'>Total</td>
              <td class='isi_bukti' align='right'>".number_format($nilai,0,",",".")."</td>
              <tr>";
          echo "</table>";
          echo "</td></tr></table>";
          $j+=1;
         
      }
			$i=$i+1;
		}
    
		echo "</div>";
		return "";
		
	}
	
}
?>
