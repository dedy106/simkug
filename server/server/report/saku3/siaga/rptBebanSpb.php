<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBebanSpb extends server_report_basic
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
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,a.nama,a.alamat,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_ver,d.nama as nama_ver,a.nik_fiat,e.nama as nama_fiat,
	   convert(varchar(20),a.tanggal,103) as tgl,f.kota, a.rek, a.jtran, a.bank, a.norek, a.alrek
from gr_spb2_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_ver=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi $this->filter";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
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
    <td>BENDAHARAWAN  DIMOHON UNTUK MEMBAYARKAN UANG SEBESAR : </td>
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
    </table></td>
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
        <td width='120' align='center' class='isi_bukti'>NO AGENDA </td>
        <td width='250' align='center' class='isi_bukti'>URAIAN</td>
        <td width='100' align='center' class='isi_bukti'>BRUTO</td>
		<td width='100' align='center' class='isi_bukti'>PAJAK</td>
		<td width='100' align='center' class='isi_bukti'>NETTO</td>
      </tr>";
		$sql="select a.no_beban,a.tanggal,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.nilai
from gr_beban_m a 
where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_beban ";
		
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
        <td class='isi_bukti'>$row1->no_beban</td>
        
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
    <td align='right'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." &nbsp;&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' align='center' class='isi_bukti'>BENDAHARA</td>
        <td width='200' align='center' class='isi_bukti'>FIATUR</td>
        <td width='200' align='center' class='isi_bukti'>VERIFIKATOR </td>
        <td width='200' align='center' class='isi_bukti'>YANG MEMBUAT </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='isi_bukti'> </td>
        <td align='center' class='isi_bukti'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='isi_bukti' align='center'><u>$row->nama_bdh</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_fiat</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_ver</u></td>
        <td class='isi_bukti' align='center'><u>$row->nama_user</u></td>
      </tr>
      <tr>
        <td class='isi_bukti' align='center'>NIP : $row->nik_bdh</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_fiat</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_ver</td>
        <td class='isi_bukti' align='center'>NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
  
  
</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
