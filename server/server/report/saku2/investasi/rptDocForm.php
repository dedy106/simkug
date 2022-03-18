<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptDocForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_depo)
from inv_depo_m a
inner join inv_bank b on a.kode_bank=b.kode_bank
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
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_depo, a.kode_lokasi,a.tanggal,a.no_dokumen, a.keterangan,  
		a.tgl_mulai,a.tgl_selesai, 
       a.jml_hari, a.basis, a.p_bunga, a.nilai, a.kode_bank, a.nik_app1, a.nik_app2, a.bsumber, a.bcair, a.bbunga, a.no_fax, 
	   a.p_yakes,a.p_mitra,b.nama as nama_bank,c.nama as nama_app1,d.nama as nama_app2,c.jabatan as jab_app1,d.jabatan as jab_app2,
	   e.nama as nama_bcair,f.nama as nama_bbunga,e.no_rek as rek_bcair,f.no_rek as rek_bbunga
from inv_depo_m a
inner join inv_bank b on a.bsumber=b.kode_bank
inner join karyawan c on a.nik_app1=c.nik
inner join karyawan d on a.nik_app2=d.nik
inner join inv_bank e on a.bcair=e.kode_bank
inner join inv_bank f on a.bbunga=f.kode_bank
$this->filter order by a.no_depo";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tanggal=substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6));
			$tgl_mulai=substr($row->tgl_mulai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_mulai),0,6));
			$tgl_selesai=substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6));
			$nilai=number_format($row->nilai,0,",",".");
			$p_bunga=number_format($row->p_bunga,0,",",".");
			$jml_hari=number_format($row->jml_hari,0,",",".");
			$basis=number_format($row->basis,0,",",".");
			echo "<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='right' ><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='508'>&nbsp;</td>
            <td width='282' class='istyle17'>NOTA KONFIRMASI</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='15'>&nbsp;</td>
            <td width='140'>Nomor</td>
            <td width='645'>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KU120/YAKES-20/2012 $row->no_depo</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Kepada Yth </td>
            <td>: Pimpinan $row->nama_bank </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Fax No </td>
            <td>: $row->no_fax </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Dari</td>
            <td>: KABIDKUG YAKES-TELKOM </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Perihal</td>
            <td>: Penempatan Deposito On Call (DOC) </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>1.</td>
            <td colspan='2'>Sesuai kesepakatan / persetujuan per telepon : </td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td colspan='2'>Tanggal $tanggal antara $row->p_yakes dari Kantor Pusat YAKES TELKOM , dengan $row->p_mitra dari $row->nama_bank , dengan ini kami konfirmasikan bahwa penempatan dana atas nama YAKES TELKOM sebagai beikut : </td>
            </tr>
          <tr>
            <td width='23'>&nbsp;</td>
            <td width='140'>Bentuk</td>
            <td width='623'>: Deposito On Call (DOC) </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jumlah Dana </td>
            <td>: IDR $nilai (diulangi IDR $nilai) </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Jangka Waktu </td>
            <td>: $jml_hari hari ( tanggal $tgl_mulai sd $tgl_selesai ) </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Tingkat Bunga</td>
            <td>: $p_bunga % ( diulangi $p_bunga % ) ( $basis hari ) </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Pembayaran Bunga </td>
            <td>: Per jatuh tempo</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td align='center'>2.</td>
            <td colspan='2'>Untuk pencairan deposito pada waktunya , harap secara otomatis ditransfer ke rekening kami pada : </td>
          </tr>
          <tr>
            <td width='23'>&nbsp;</td>
            <td width='140'>Bank</td>
            <td width='623'>: $row->nama_bcair </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Nomor Rekening </td>
            <td>: $row->rek_bcair </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td colspan='2'>Sedangkan hasil bunganya secara otomatis di transfer ke rekening kami pada : </td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td width='140'>Bank</td>
            <td width='623'>: $row->nama_bbunga </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>Nomor Rekening </td>
            <td>: $row->rek_bbunga </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='23' align='center' valign='top'>3.</td>
            <td width='763'>Mohon agar surat -surat bukti tersebut ( bilyet deposito, kredit nota bunga dan Pph-nya ) dikirimkan paling lambat 2 hari sejak sekarang kepada manajer perbendaharaan Kantor Pusat YAKES TELKOM, Jl Cisanggarung No 2 Lantai 1 Ruang 39 Bandung </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='23' align='center' valign='top'>4.</td>
            <td width='763'>Demikian harap maklum , dan terima kasih atas kerja samanya. </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='10'>&nbsp;</td>
            <td height='70' colspan='4' valign='top'>Bandung, $tanggal </td>
            </tr>
          <tr>
            <td>&nbsp;</td>
            <td width='186' align='center'>$row->nama_app1</td>
            <td width='297'>&nbsp;</td>
            <td width='202' align='center'>$row->nama_app2</td>
            <td width='83'>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td align='center'>$row->jab_app1</td>
            <td>&nbsp;</td>
            <td align='center'>$row->jab_app2</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>";
			echo "<br>";
			$i=$i+1;
		}
		
	
		echo "</div>";
		return "";
		
	}
	
}
?>
