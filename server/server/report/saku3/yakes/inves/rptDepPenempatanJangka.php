<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDepPenempatanJangka extends server_report_basic
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
    $tahun=substr($periode,0,4);
		
		$sql="
    select a.no_depo,a.jenis,'Sdr. Pimpinan ' + h.nama as kepada, h.no_fax, b.hal2, case when a.jenis='DEPOSITO' then 'Deposito Berjangka' else 'Deposito On Call' end + case when just = 'NON' then '' else ' ('+just+')' end as bentuk,a.nilai,
      
      case when jenis='DEPOSITO' then cast (  case when datediff(month,a.tgl_mulai,a.tgl_selesai) >3 then 3 else datediff(month,a.tgl_mulai,a.tgl_selesai) end    as varchar) +' Bulan, ' else '' end as jml_bln,a.tgl_mulai,a.tgl_selesai,' ,('+cast( datediff(day,a.tgl_mulai,a.tgl_selesai)  as varchar)+' hari)' as jml_hari,
      cast (a.p_bunga as varchar) +' % p.a. ('+ cast (a.basis as varchar) +' hari)' as suku_bunga,
      
      d.no_rek + ' a.n '+ d.nama_rek as rekbunga,
      d.nama as bankbunga,
      
      f.no_rek + ' a.n '+ f.nama_rek as rekcair,
      f.nama as bankcair,
      
      e.nama as kabid,
      b.jab3,b.jab2,
      g.nama as manajer,convert(varchar,a.tanggal,103) as tgl
    from inv_depo2_m a
    inner join inv_shop_m b on a.no_shop=b.no_shop
     inner join inv_plan c on a.kode_plan=c.kode_plan
      inner join inv_bank d on a.bbunga=d.kode_bank
      inner join inv_bank f on a.bcair=f.kode_bank
      inner join karyawan e on b.nikttd3=e.nik
      inner join karyawan g on b.nikttd2=g.nik
      inner join inv_bank h on a.bdepo=h.kode_bank
    $this->filter
    order by a.no_depo";
    // echo $sql;
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
    echo "<div align='center' id='contentPrint'>
    <style>
      td,th{
        font-size: 14px !important;
      }
      .judul_bukti{
        font-size: 16px !important;
      }

      @media print {
 
      
        #contentPrint {
          width: 100%; 
          margin: 0; 
          float: none;
        }
            
        /** Seitenränder einstellen */       
        @page { margin: 3.5cm, 2cm, 1.5cm, 2cm }

      }
      
    .printND{
      margin-top:3.5cm;
   }
    </style>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
      $bulan=$AddOnLib->ubah_bulan(substr($row->tgl,3,2));
      $thn=substr($row->tgl,6,4);
      $tgl=substr($row->tgl,0,2);
            echo "<table width='800' border='0' cellspacing='2' cellpadding='1' class='printND' style='text-align: justify'>
            <tr>
    <td align='right' class='judul_bukti'>Nota Konfirmasi </td>
  </tr>
  <tr>
    <td>Nomor : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/KU000/YAKES-30/$tahun </td>
  </tr>
  <tr>
    <td>Bandung, $tgl $bulan $thn</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Kepada Yth, </td>
  </tr>
  <tr>
    <td style='font-weight:bold'>".ucwords($row->kepada)."</td>
  </tr>
  <tr>
    <td style='font-weight:bold'>Nomor Facs. : $row->no_fax</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Perihal : $row->hal2 </td>
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
        <td colspan='2'>Menindaklanjuti negosiasi tingkat suku bunga penempatan dana antara Pihak kami dengan pihak Saudara tanggal ".substr($row->tgl,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl,6,4).substr($row->tgl,3,2)).", dengan ini kami konfirmasikan penempatan dana a.n. Yayasan Kesehatan Pegawai Telkom (Yakes Telkom) di Bank Woori Saudara Bandung dengan kondisi dan ketentuan sebagai berikut : </td>
        </tr>
        <tr>
        <td>&nbsp;</td>
        <td width='200'>a. Bentuk </td>
        <td width='550'>: ".ucwords($row->bentuk)." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>b. Jumlah Dana </td>
        <td>: Rp. ".number_format($row->nilai,0,",",".")."  </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>c. Jangka Waktu </td>
        <td>: $row->jml_bln Tanggal Mulai: ".substr($row->tgl_mulai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_mulai),0,6))." , tanggal jatuh tempo: ".substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6))." $row->jml_hari</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>d. Tingkat Suku Bunga </td>
        <td>: $row->suku_bunga</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>e. Pembayaran Bunga </td>";
        if($row->jenis == 'DEPOSITO'){
        echo"
        <td>: Setiap bulan </td>";
        }else{
        echo"
        <td>: Pada saat jatuh tempo </td>";
        }
        echo"
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
            <td width='424'>: $row->rekbunga </td>
          </tr>
          <tr>
            <td>- Bank </td>
            <td>: $row->bankbunga </td>
          </tr>
        </table></td>
      </tr>";
      if($row->jenis == "DEPOSITO"){
      echo"
      <tr>
        <td>&nbsp;</td>
        <td valign='top'>g. Pencairan Deposito </td>
        <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td colspan='2'>Apabila tidak diintruksikan lain, pokok deposito sebesar nominal pada huruf b di atas pada tanggal jatuh tempo mohon di transfer secara otomatis ke </td>
          </tr>
          <tr>
            <td width='116'>- Nomor </td>
            <td width='424'>: $row->rekcair</td>
          </tr>
          <tr>
            <td>- Bank </td>
            <td>: $row->bankcair </td>
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
      </tr>";
      }else{
        echo"
        <tr>
          <td>&nbsp;</td>
          <td valign='top'>g. Pencairan Deposito </td>
          <td><table width='550' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td colspan='2'>Mohon ditransfer secara otomatis ke rekening giro: </td>
            </tr>
            <tr>
              <td width='116'>- Nomor </td>
              <td width='424'>: $row->rekcair</td>
            </tr>
            <tr>
              <td>- Bank </td>
              <td>: $row->bankcair </td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td valign='top'>h. Lain-lain </td>
          <td style='text-align:justify'>: Surat surat bukti sehubungan penempatan dana ini (bilyet deposito, dll) dikirimkan paling lambat 2 (dua) hari kerja sejak mulai tanggal penempatan kepada kami c.q. Manajer Investasi Yakes-Telkom, Jalan Cisanggarung Nomor 2 Lantai 1, Ruang 43, Bandung</td>
        </tr>";
      }
      echo"
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
        <td style='font-weight:bold'>YAKES-TELKOM</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td style='font-weight:bold'><u>$row->kabid</u></td>
        <td style='font-weight:bold'><u>$row->manajer</u></td>
      </tr>
      <tr>
        <td style='font-weight:bold'>$row->jab3</td>
        <td style='font-weight:bold'>$row->jab2</td>
      </tr>
    </table></td>
  </tr>
</table>
      <br>
      <DIV style='page-break-after:always'></DIV>";
			
			
		}
	echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
