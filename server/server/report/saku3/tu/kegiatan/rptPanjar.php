<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kegiatan_rptPanjar extends server_report_basic
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
		$sql="select a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		d.bank,d.no_rek,d.nama_rek,a.nilai,a.kode_drk,e.nama as nama_drk,a.dasar,date_format(a.due_date,'%d/%m/%Y') as due_date,
		a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join it_aju_rek d on a.no_aju=d.no_aju and a.kode_lokasi=d.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_aju";


		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$logo = $path . "image/tu.jpg";
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>FORMULIR PERMOHONAN PANJAR</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td height='25'>Nomor Panjar</td>
        <td class='judul_bukti'> $row->no_aju</td>
      </tr>
      <tr>
        <td width='215' height='25'>Mohon dibayarkan uang sebesar </td>
        <td width='575'>: Rp. ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td height='25'>&nbsp;</td>
        <td>".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
      <tr>
        <td height='25'>Untuk Keperluan </td>
        <td>: $row->keterangan </td>
      </tr>
      <tr>
        <td height='25'>Dasar Permintaan </td>
        <td>: $row->dasar </td>
      </tr>
      <tr>
        <td height='25'>Akan diselesaikan *) </td>
        <td>: Tgl </td>
      </tr>
      <tr>
        <td height='25'>Tanggal Panjar *)</td>
        <td>: $row->tgl</td>
      </tr>
      <tr>
        <td height='25'>Tanggal Penyelesaian *)</td>
        <td>: $row->due_date</td>
      </tr>
	  <tr>
        <td height='25'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='25' colspan='2' align='center' bgcolor='#CCCCCC'>JIKA SAMPAI DENGAN BATAS WAKTU YANG DITENTUKAN, MASIH BELUM DIPERTANGGUNGKAN BERSEDIA DIPOTONG GAJI</td>
      </tr>
      <tr>
        <td height='25'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table  border='0' cellspacing='2' cellpadding='1'>

      <tr>
        <td width='150' align='center'>Fiatur</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Verifikasi</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Pusat Pert. Jawaban (PP)</td>
		<td width='20' align='center'>&nbsp;</td>
        <td width='150' align='center'>Pemohon Panjar </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
		<td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='garis_bawah'>&nbsp;</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>&nbsp;</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>$row->nama_app</td>
		<td>&nbsp;</td>
        <td class='garis_bawah'>$row->nama_user</td>
      </tr>
      <tr>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP :</td>
		<td>&nbsp;</td>
        <td >NIP : $row->nik_app</td>
		<td>&nbsp;</td>
        <td >NIP : $row->nik_user</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='judul_bukti'>SERAH TERIMA PANJAR</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400' valign='top' align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center' class='judul_bukti2'>TANDA TERIMA</td>
          </tr>
          <tr>
            <td>Telah diterima uang sebesar : </td>
          </tr>
          <tr>
            <td>Rp ".number_format($row->nilai,0,",",".")."</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><table width='282' border='0' cellspacing='2' cellpadding='1'>
                <tr>
                  <td width='276'>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='left'>Bandung,  </td>
          </tr>
          <tr>
            <td align='left'>Penerima</td>
          </tr>
          <tr>
            <td height='60' class='garis_bawah'>&nbsp;</td>
          </tr>
        </table></td>
        <td width='400' valign='top' align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center' class='judul_bukti2'>PEMBAYARAN VIA TRANSFER </td>
          </tr>
          <tr>
            <td>Telah ditransfer uang sebesar : </td>
          </tr>
          <tr>
            <td>Rp</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td><table border='0' cellspacing='2' cellpadding='1'>
                <tr>
                  <td width='108'>Kepada</td>
                  <td width='276'>:  </td>
                </tr>
                <tr>
                  <td>No. Rekening </td>
                  <td>:  </td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>:  </td>
                </tr>
            </table></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='left'>Bandung,</td>
          </tr>
          <tr>
            <td align='left'>Bendaharawan</td>
          </tr>
          <tr>
            <td height='60' class='garis_bawah'>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='isi_laporan'>MODUL : KUG=06 </td>
        <td colspan='2' class='isi_laporan'>TELKOM UNIVERSITY </td>
        </tr>
      <tr>
        <td width='299' align='left' class='isi_laporan'>Lembar 1. Bendaharawan </td>
        <td width='225' align='center' class='isi_laporan'>Lembar 2. Akuntansi </td>
        <td width='262' align='right' class='isi_laporan'>Lembar 3. Pemegang Panjar </td>
      </tr>
    </table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
