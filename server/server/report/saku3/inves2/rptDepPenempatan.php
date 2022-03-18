<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDepPenempatan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		
		
		$sql="select a.no_shop,a.kode_lokasi,a.nodin,a.kepada1,a.dari1,a.lamp1,a.hal1,a.nikttd1,a.jab1,b.nama as nama1,a.tanggal,
		substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,c.nama as nama_bank,c.no_fax,
		d.jenis,a.nilai,d.p_bunga,d.basis,d.tgl_mulai,d.tgl_selesai,
		e.nama as bank_cair,e.no_rek as no_rek_cair,e.nama_rek as nama_rek_cair,
		f.nama as bank_bunga,f.no_rek as no_rek_bunga,f.nama_rek as nama_rek_bunga,
		a.nikttd2,a.jab2,g.nama as nama2,a.tanggal,datediff(dd,d.tgl_mulai,d.tgl_selesai) as jml_hari,
		case when d.jenis<>'DOC' then a.jml_bulan else datediff(dd,d.tgl_mulai,d.tgl_selesai) end as jml_bulan,
		case when d.jenis<>'DOC' then 'bulan' else 'hari' end as nama_bulan
from inv_shop_m a
left join karyawan b on a.nikttd1=b.nik
left join inv_bank c on a.bsumber=c.kode_bank
left join inv_depo2_m d on a.no_shop=d.no_shop and a.kode_lokasi=d.kode_lokasi
left join inv_bank e on d.bcair=e.kode_bank
left join inv_bank f on d.bbunga=f.kode_bank 
left join karyawan g on a.nikttd2=g.nik
$this->filter order by a.no_shop";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$jml=$AddOnLib->terbilang_hari($row->jml);
			$jml_bulan=$AddOnLib->terbilang_hari($row->jml_bulan);
			$nama_hari="";
			if ($row->jenis=="DEPOSITO")
			{
				$nama_hari=", ($row->jml_hari hari) ";
			}
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>Nomor : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$row->nodin </td>
  </tr>
  <tr>
    <td>Bandung, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$bulan $row->tahun</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada Yth, </td>
  </tr>
  <tr>
    <td>Sdr. Pimpinan $row->nama_bank</td>
  </tr>
  <tr>
    <td>Nomor Facs. : $row->no_fax</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Perihal : $row->hal1 </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan Hormat,</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='36' valign='top'>1.</td>
        <td colspan='2'>Menindaklanjuti negosiasi tingkat suku bunga penempatan dana antara Pihak kami dengan pihak Saudara tanggal ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." , dengan ini kami konfirmasikan penempatan dana a.n. Yayasan Kesehatan Pegawai Telkom (Yakes Telkom) di a dengan kondisi dan ketentuan sebagai berikut : </td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td width='200'>a. Bentuk </td>
        <td width='550'>: $row->jenis </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>b. Jumlah Dana </td>
        <td>: Rp. ".number_format($row->nilai,0,",",".")." ,- (diulang Rp. ".number_format($row->nilai,0,",",".")." ,-) </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>c. Jangka Waktu </td>
        <td>: $row->jml_bulan ($jml_bulan) $row->nama_bulan , tanggal mulai : ".substr($row->tgl_mulai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_mulai),0,6))." , 
		tanggal jatuh tempo : ".substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6))." $nama_hari </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>d. Tingkat Suku Bunga </td>
        <td>: ".number_format($row->p_bunga,3,",",".")."% p.a ($row->basis hari)</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>e. Pembayaran Bunga </td>
        <td>: Pada saat jatuh tempo </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td valign='top'>f. Hasil Bunga </td>
        <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td colspan='2'>Mohon ditransfer secara otomatis ke rekening giro : </td>
            </tr>
          <tr>
            <td width='116'>- Nomor </td>
            <td width='424'>: $row->no_rek_bunga a.n. $row->nama_rek_bunga </td>
          </tr>
          <tr>
            <td>- Bank </td>
            <td>: $row->bank_bunga </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td valign='top'>g. Pencairan Deposito </td>
        <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td colspan='2'>Apabila tidak diintruksikan lain, pokok deposito sebesar nominal pada huruf b di atas pada tanggal jatuh tempo mohon di transfer secara otomatis ke </td>
          </tr>
          <tr>
            <td width='116'>- Nomor </td>
            <td width='424'>: $row->no_rek_cair a.n. $row->nama_rek_cair </td>
          </tr>
          <tr>
            <td>- Bank </td>
            <td>: $row->bank_cair </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td valign='top'>h. Lain-lain </td>
        <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='29'>1)</td>
            <td width='511'>Untuk pencairan deposito, pada waktunya kami akan beritahukan kemudian. </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Surat-surat bukti sehubungan penempatan dana ini (bilyet deposito dll) dikirimkan paling lambat 2 (dua) hari sejak mulai tanggal penempatan kepada kami c.q. Manajer investasi Yakes- Telkom , Jalan Cisanggarung Nomor 2, Lantai 1, Ruang 43, Bandung </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td valign='top'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td valign='top'>2.</td>
        <td colspan='2' valign='top'>Demikian konfirmasi ini kami sampaikan, atas perhatian dan kerja sama Saudara diucapkan terima kasih </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'>Hormat kami, </td>
        <td width='400'>&nbsp;</td>
      </tr>
      <tr>
        <td>YAKES-TELKOM</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama1</u></td>
        <td><u>$row->nama2</u></td>
      </tr>
      <tr>
        <td>$row->jab1</td>
        <td>$row->jab2</td>
      </tr>
    </table></td>
  </tr>
</table>
			<br>";
			
			
		}
	echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
