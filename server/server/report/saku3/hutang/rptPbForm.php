<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_hutang_rptPbForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_pb)
from yk_pb_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.no_pb,a.kode_lokasi,a.no_dokumen,a.tanggal,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   c.nama as nama_pp,a.kode_pp,a.nik_user as nik_buat,d.nama as nama_buat,a.nik_app,e.nama as nama_app,f.kota,a.no_agenda
from yk_pb_m a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_user=d.nik
inner join karyawan e on a.nik_app=e.nik
inner join lokasi f on a.kode_lokasi=f.kode_lokasi 
$this->filter order by a.no_pb";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("pengajuan kpa",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center'>
    <td height='30' class='istyle17'>PERMOHONAN PEMBAYARAN</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
        <tr>
          <td align='center'>Nomor : $row->no_pb</td>
        </tr>
		
        <tr>
          <td align='left'><table width='600' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='107'>PP</td>
              <td width='483'>: $row->kode_pp - $row->nama_pp </td>
            </tr>
            <tr>
              <td>No Dokumen </td>
              <td>: $row->no_dokumen </td>
            </tr>
            
            <tr>
              <td>Keterangan</td>
              <td>: $row->keterangan </td>
            </tr>
            <tr>
              <td>No Agenda</td>
              <td>: $row->no_agenda </td>
            </tr>
          </table></td>
        </tr>
		
        <tr>
          <td align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr align='center'>
                <td width='30' class='judul_laporan'>No</td>
                <td width='70' class='judul_laporan'>Kode Akun </td>
                <td width='200' class='judul_laporan'>Nama Akun </td>
                <td width='60' class='judul_laporan'>Kode PP </td>
                <td width='60' class='judul_laporan'>Kode DRK </td>
                <td width='270' class='judul_laporan'>Keterangan</td>
				<td width='40' class='judul_laporan'>DC</td>
                <td width='90' class='judul_laporan'>Nilai</td>
              </tr>'";
			$sql="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.dc,a.kode_drk,a.keterangan,a.nilai,
			case when a.dc='D' then a.nilai else -a.nilai end as total
from yk_pb_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi' ";
			
			$rs1 = $dbLib->execute($sql);
			$i=1;
			$total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total=$total+$row1->total;
              echo "<tr>
                <td align='center' class='isi_laporan'>$i</td>
                <td class='isi_laporan'>$row1->kode_akun</td>
                <td class='isi_laporan'>$row1->nama_akun</td>
                <td class='isi_laporan'>$row1->kode_pp</td>
                <td class='isi_laporan'>$row1->kode_drk</td>
                <td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->dc</td>
                <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,',','.')."</td>
              </tr>";
				$i=$i+1;
			}                                                       
			
              echo "<tr>
                <td colspan='7' align='right' class='isi_laporan'>Total</td>
                <td align='right' class='isi_laporan'>".number_format($total,0,',','.')."</td>
              </tr>
            
          </table></td>
        </tr>
		<tr>
          <td>&nbsp;</td>
        </tr>
		<tr>
          <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='36' class='header_laporan'>No.</td>
        <td width='293' class='header_laporan'>Keterangan </td>
        <td width='322' class='header_laporan'>No REKENING &amp; BANK</td>
        <td width='131' class='header_laporan'>JUMLAH (Rp) </td>
      </tr>";
		$sql="select b.nama as nama_vendor,a.bank,a.cabang,a.no_rek,a.nilai
from yk_pb_d a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokvendor=b.kode_lokasi
		where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi'
		union all
		select b.nama as nama_vendor,a.bank,a.cabang,a.no_rek,a.nilai
from yk_pb_d a
inner join karyawan b on a.kode_vendor=b.nik
		where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi'
		 ";
		
		$rs1 = $dbLib->execute($sql);
		$i=1; $nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai+=$row1->nilai;
      echo "<tr>
        <td class='isi_laporan'  align='center'>$i</td>
        <td class='isi_laporan'>$row1->nama_vendor</td>
        <td class='isi_laporan'>$row1->bank $row->cabang No. Rek. $row1->no_rek</td>
        <td class='isi_laporan'  align='right'>".number_format($row1->nilai,0,',','.')."</td>
      </tr>";
			$i=$i+1;
		}
      echo "<tr>
        <td>&nbsp;</td>
        <td colspan='2' class='header_laporan'>TOTAL</td>
        <td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='3' class='header_laporan'>Terbilang : ( ".$AddOnLib->terbilang($nilai)." ) </td>
        </tr>
    </table></td>
        </tr>
		<tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align='right'><table width='431' border='0' cellspacing='2' cellpadding='1'>
				<tr align='center'>
                <td align='center'>&nbsp;</td>
                <td align='left'>&nbsp; </td>
              </tr>
              <tr align='center'>
                <td colspan='2' align='center'>$row->kota, ".substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
              </tr>
              <tr align='center'>
                <td width='203'>Disetujui </td>
                <td width='218'>Dibuat </td>
              </tr>
              <tr>
                <td height='50'>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr align='center'>
                <td>$row->nama_app</td>
                <td>$row->nama_buat</td>
              </tr>
              <tr align='center'>
                <td>$row->nik_app</td>
                <td>$row->nik_buat</td>
              </tr>
          </table></td>
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
