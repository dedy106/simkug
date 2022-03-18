<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptSpbForm extends server_report_basic
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
		$sql="select a.no_app,a.kode_lokasi,a.periode,a.tanggal,a.kode_lokasi,f.kota,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_fiat,e.nama as nama_fiat,
	   date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   h.no_rek,h.nama_rek,h.bank,h.cabang,
	   
	   --case when g.keterangan is null then i.keterangan else g.keterangan end as keterangan,
	   --case when g.nilai is null then i.nilai else g.nilai end as nilai
	   
	   case when a.modul = 'IFREIM' then g.keterangan
	        when a.modul = 'IFAJU' then i.keterangan
			when substring(a.modul,1,2) = 'PB' then j.keterangan 
			when a.modul = 'PJAJU' then k.keterangan 
			when a.modul = 'PJPR' then q.keterangan 
			when a.modul = 'SPPD' then p.tujuan 
			end as keterangan,
			
		case when a.modul = 'IFREIM' then g.nilai
	        when a.modul = 'IFAJU' then i.nilai
			when substring(a.modul,1,2) = 'PB' then j.nilai 
			when a.modul= 'PJAJU' then k.nilai 
			when a.modul= 'PJPR' then q.nilai 
			when a.modul= 'SPPD' then n.nilai 
			end as nilai
	   
	   
from spm_app_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi
left join spm_ifreim_m g on a.no_bukti=g.no_reim and a.kode_lokasi=g.kode_lokasi
left join spm_if_m i on a.no_bukti=i.no_if and a.kode_lokasi=i.kode_lokasi
left join yk_pb_m j on a.no_bukti=j.no_pb and a.kode_lokasi=j.kode_lokasi
left join panjar2_m k on a.no_bukti=k.no_panjar and a.kode_lokasi=k.kode_lokasi
left join pd_spj_m l on a.no_app=l.no_ver and a.kode_lokasi=l.kode_lokasi
left join spm_rek n on l.no_spj=n.no_bukti and l.kode_lokasi=n.kode_lokasi
left join pd_aju_nik o on o.no_spj=l.no_spj and l.kode_lokasi=o.kode_lokasi
left join pd_aju_m p on o.no_aju=p.no_aju and p.kode_lokasi=o.kode_lokasi
left join panjar2_m q on a.no_bukti=q.no_panjar and a.kode_lokasi=q.kode_lokasi

inner join spm_rek h on a.no_bukti=h.no_bukti and a.kode_lokasi=h.kode_lokasi $this->filter";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/bangtelindo.png";
		$logo2="image/bangtelindo.png";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' align='center'><img src='$logo' width='200' height='70'></td>
        <td width='400' valign='middle'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'><b>PT. BANGTELINDO</b></td>
          </tr>
          <tr>
            <td align='center'></td>
          </tr>
          <tr>
            <td align='center'></td>
          </tr>
        </table></td>
        <td width='200' align='center'><img src='$logo2' width='160' height='70'></td>
      </tr>
    </table></td>
  </tr>
 
   <tr>
    <td height='60'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center' class='istyle17'>SURAT PERINTAH BAYAR (SPB)</td>
      </tr>
      <tr>
        <td align='center' class='istyle17'>Nomor : $row->no_app</td>
      </tr>
    </table></td>
  </tr>
 
 
  <tr>
    <td align='center'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td height='40' class='isi_bukti'>Yang bertanda tangan dibawah ini memerintahkan kepada Bendahara untuk membayarkan sejumlah uang kepada yang namanya tercantum dibawah ini :</td>
      </tr>
      <tr>
        <td><table width='750' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='200' class='isi_bukti'>Nilai</td>
            <td width='550' class='isi_bukti'>: RP : ".number_format($row->nilai,0,",",".")."  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Terbilang</td>
            <td class='isi_bukti'>: ".$AddOnLib->terbilang($row->nilai)." </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Untuk pembayaran</td>
            <td class='isi_bukti'>: $row->keterangan </td>
          </tr>
          <tr>
            <td class='isi_bukti'>&nbsp;</td>
            <td class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Kepada</td>
            <td class='isi_bukti'>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nama</td>
            <td class='isi_bukti'>: $row->nama_rek </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Alamat</td>
            <td class='isi_bukti'>:  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Cara Pembayaran</td>
            <td class='isi_bukti'>: </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nomor Rekening</td>
            <td class='isi_bukti'>: $row->no_rek </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Nama Bank</td>
            <td class='isi_bukti'>: $row->bank </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Cabang</td>
            <td class='isi_bukti'>: $row->cabang </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td class='isi_bukti'>Atas dasar surat bukti </td>
            <td class='isi_bukti'>:  </td>
          </tr>
          <tr>
            <td class='isi_bukti'>Dibebankan pada anggaran </td>
            <td class='isi_bukti'>:  </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
 
  <tr>
    <td align='center' height='30'>$row->keterangan</td>
  </tr>
 
  <tr>
    <td ><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Yang mengajukan</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>$row->nama_rek</td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Mengetahui/ menyetujui</td>
          </tr>
          <tr>
            <td align='center'>SM Keuangan</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'></td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Verifikator</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>$row->nama_user</td>
          </tr>
        </table></td>
        <td><table width='200' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>Fiatur/ Approval</td>
          </tr>
          <tr>
            <td align='center'>Direktur</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td valign='top'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center' class='isi_bukti'>BUKTI PENDUKUNG :</td>
          </tr>
          <tr>
            <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr>
                <td width='45' align='center' class='isi_bukti'>1</td>
                <td width='248' class='isi_bukti'>Surat Permohonan</td>
                <td width='93'>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>2</td>
                <td class='isi_bukti'>Invoice</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>3</td>
                <td class='isi_bukti'>Kuitansi</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>4</td>
                <td class='isi_bukti'>Faktur Pajak Standard</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>5</td>
                <td class='isi_bukti'> Surat Kontrak/PO/SPK</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>6</td>
                <td class='isi_bukti'>Berita Acara</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>7</td>
                <td class='isi_bukti'>Proposal</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>8</td>
                <td class='isi_bukti'>RAB</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>9</td>
                <td class='isi_bukti'>Daftar Pengeluaran</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align='center' class='isi_bukti'>10</td>
                <td class='isi_bukti'>Daftar Terlampir</td>
                <td>&nbsp;</td>
              </tr>
            </table></td>
          </tr>
        </table></td>
        <td width='400' valign='top'><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center' class='isi_bukti'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
          <tr>
            <td class='isi_bukti' align='center'>Penerima</td>
          </tr>
          <tr>
            <td height='60'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>$row->nama_rek</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>CATATAN PENTING</td>
          </tr>
          <tr>
            <td><table width='400' border='1' cellspacing='0' cellpadding='0' class='kotak'>
              <tr>
                <td class='isi_bukti'>*) Untuk pengmbilan Panjar harus dipertanggungkan paling lambat 14 (empat belas) hari sejak tanggal Pengambilan</td>
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
