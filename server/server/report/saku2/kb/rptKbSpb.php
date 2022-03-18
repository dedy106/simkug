<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbSpb extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_spb)
from yk_spb_m a 
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
 $this->filter ";
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
		$sql = "select a.no_spb,a.no_dokumen,a.tanggal,a.kode_pp,substring(a.periode,1,4) as tahun,a.nilai,b.nama as nama_vendor,
'-' as catatan, a.keterangan,a.nik_buat,'-' as nik_fiat,'-' as nik_man,'-' as nik_bdh,c.nama as nama_buat,'-' as nama_fiat,
'-' as nama_man,'-' as nama_bdh, b.npwp,b.no_rek,b.nama_rek,b.bank,b.cabang,b.alamat2
from yk_spb_m a 
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi 
 $this->filter order by a.no_spb  ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center' class='judul_form'>SURAT PERINTAN BAYAR (SPB) </td>
      </tr>
      <tr>
        <td align='center' class='judul_form'>YAKES TELKOM</td>
      </tr>
    </table></td>
  </tr>
  <tr valign='top'>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='150'>No SPB</td>
        <td width='450'>: $row->no_spb </td>
      </tr>
      <tr>
        <td>No Penunjukan Pesanan</td>
        <td>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td>Beban Anggaran Tahun </td>
        <td>: $row->tahun </td>
      </tr>
       <tr>
        <td colspan='2'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center' width='80' class='header_form'>Kode Akun </td>
								  <td align='center' width='200' class='header_form'>Nama Akun </td>
					              <td align='center' width='60' class='header_form'>Kode PP </td>
								  <td align='center' width='120' class='header_form'>Nama PP </td>
					              <td align='center' width='60' class='header_form'>Kode DRK</td>
								  <td align='center' width='180' class='header_form'>Nama DRK </td>
					              <td align='center' width='90' class='header_form'>Nilai</td>
					            </tr>";
				$i=1;
				$sql1="select a.kode_akun,b.nama,a.nilai,a.kode_pp,a.kode_drk,c.nama as nama_pp,d.nama as nama_drk
from yk_spb_j a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$row->tahun'
where a.no_spb='$row->no_spb' order by a.kode_akun ";
					
					$rs1 = $dbLib->execute($sql1);
					$nilai=0;
				    while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
						$nilai=$nilai+$row1->nilai;
					echo "<tr>
					<td class='isi_form'>$row1->kode_akun</td>
					<td class='isi_form'>$row1->nama</td>
					<td class='isi_form'>$row1->kode_pp</td>
					<td class='isi_form'>$row1->nama_pp</td>
					<td class='isi_form'>$row1->kode_drk</td>
					<td class='isi_form'>$row1->nama_drk</td>
					<td class='isi_form' align='right'>".number_format($row1->nilai,0,",",".")."</td>
					</tr>";
					}
					      
				echo "<tr>
					              <td colspan='6' align='right'>Total&nbsp;</td>
					              <td align='right'>".number_format($nilai,0,",",".")."</td>
  </tr></table>
		</td>
	   </tr>
    </table></td>
  </tr>
 
  <tr valign='top'>
    <td width='500'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Check List : </td>
      </tr>
      <tr>
        <td valign='top'>".urldecode($row->catatan)."</td>
      </tr>
    </table></td>
    <td width='300' style='padding:10px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td>Yang Mengesahkan </td>
      </tr>
      <tr>
        <td>Mgr.PBDH</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_man</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_man </td>
      </tr>
    </table></td>
  </tr>
  <tr valign='center'>
    <td><table width='500'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Pemegang Kas Kantor Yayasan Kesehatan Pegawai Telkom Pusat diminta untuk membayarkan uang </td>
        </tr>
      <tr>
        <td width='100'>Sebesar</td>
        <td width='400'>: Rp ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><em>".$AddOnLib->terbilang($row->nilai)."</em></td>
      </tr>
      <tr>
        <td>Kepada a/n </td>
        <td>: $row->nama_vendor </td>
      </tr>
      <tr>
        <td>NPWP</td>
        <td>: $row->npwp </td>
      </tr>
      <tr>
        <td>Jumlah</td>
        <td>: Rp ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><em>".$AddOnLib->terbilang($row->nilai)."</em></td>
      </tr>
      <tr>
        <td>No. Rekening</td>
        <td>: $row->no_rek </td>
      </tr>
      <tr>
        <td>Pada Bank</td>
        <td>: $row->bank $row->cabang</td>
      </tr>
	  <tr>
        <td>&nbsp;</td>
        <td>: $row->alamat2</td>
      </tr>
      <tr>
        <td colspan='2'>Untuk Pembayaran : </td>
        </tr>
      <tr>
        <td colspan='2'>$row->keterangan</td>
      </tr>
    </table></td>
    <td style='padding:10px'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
     
      <tr>
        <td>Fiatur,</td>
      </tr>
      <tr>
        <td>Kabid Keuangan , </td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_fiat</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_fiat </td>
      </tr>
    </table></td>
  </tr>
  <tr valign='top'>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='18'>1.</td>
        <td width='329'>Cara Pembayaran / Transfer </td>
        <td width='23'>&nbsp;</td>
        <td width='112'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Jumlah harus dibayar </td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,",",".")."</td>
      </tr>
    </table></td>
    <td><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='19'>2.</td>
        <td >Catatan Pembayaran : </td>
        </tr>
    </table></td>
  </tr>
  <tr valign='top'>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='19'>3.</td>
        <td width='327'>Catatan Penerimaan</td>
        <td width='21'>&nbsp;</td>
        <td width='115'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Telah diterima uang sejumlah </td>
        <td>Rp</td>
        <td>".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='3'><em>".$AddOnLib->terbilang($row->nilai)."</em></td>
        </tr>
    </table></td>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='8%'>4.</td>
        <td colspan='2'>Catatan Transfer </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td width='50%'>Transfer tanggal </td>
        <td width='50%'>:</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No / Tgl GB </td>
        <td>:</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Rek. Bank No </td>
        <td>:</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='2'>Bandung , </td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='2'>Bendaharawan YAKES TELKOM</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='50' colspan='2'>&nbsp;</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='2'><u>$row->nama_bdh</u></td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td colspan='2'>NIK.$row->nik_bdh </td>
        </tr>
    </table></td>
  </tr>
  <tr valign='top'>
    <td colspan='2'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='161'>5. Catatan Pembukuan : </td>
        <td width='629'>Dicatat dalam SIMAK : ..................... Tgl. ................. .. </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No. Bukti Pembukuan : ...................... Tgl Entry ........... </td>
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