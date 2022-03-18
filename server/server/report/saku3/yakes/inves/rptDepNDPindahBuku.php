<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptDepNDPindahBuku extends server_report_basic
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
		
		
		$sql="
    select a.no_depo,a.kode_lokasi,d.nodin,d.kepada1,d.dari1,d.lamp1,d.hal1,d.nikttd1,d.jab1,b.nama as nama1,a.tanggal,
        substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,c.nama as nama_bank,c.no_fax,
        a.jenis,a.nilai,a.p_bunga,a.basis,a.tgl_mulai,a.tgl_selesai,
        e.nama as bank_cair,e.no_rek as no_rek_cair,e.nama_rek as nama_rek_cair,
        f.nama as bank_bunga,f.no_rek as no_rek_bunga,f.nama_rek as nama_rek_bunga,
        d.nikttd2,d.jab2,g.nama as nama2,d.tanggal,datediff(dd,a.tgl_mulai,a.tgl_selesai) as jml_hari,
        case when a.jenis<>'DOC' then d.jml_bulan else datediff(dd,a.tgl_mulai,a.tgl_selesai) end as jml_bulan,
        case when a.jenis<>'DOC' then 'bulan' else 'hari' end as nama_bulan
      from inv_depo2_m a
    left join inv_shop_m d on a.no_shop=d.no_shop and a.kode_lokasi=d.kode_lokasi
        left join karyawan b on d.nikttd1=b.nik
    left join inv_bank c on a.bdepo=c.kode_bank
    left join inv_bank e on a.bcair=e.kode_bank
    left join inv_bank f on a.bbunga=f.kode_bank 
    left join karyawan g on d.nikttd2=g.nik    
$this->filter order by a.no_depo";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
    echo "<div align='center'>
    <style>
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
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$jml=$AddOnLib->terbilang_hari($row->jml);
			$jml_bulan=$AddOnLib->terbilang_hari($row->jml_bulan);
			$nama_hari="";
			if ($row->jenis=="DEPOSITO")
			{
				$nama_hari=", ($row->jml_hari hari) ";
			}
			
      echo "<table width='800' border='0' class='printND' cellspacing='2' cellpadding='1' style='text-align: justify'>
      <tr>
        <td align='right' colspan='3' class='judul_bukti'>Nota Dinas</td>
      </tr>
      <tr>
        <td width='9%'>Nomor</td>
        <td width='1%'>:</td>
        <td width='90%'>$row->nodin</td>
      </tr>
      <tr>
        <td>Kepada</td>
        <td>:</td>
        <td>$row->kepada1</td>
      </tr>
      <tr>
        <td>Dari</td>
        <td>:</td>
        <td>$row->dari1</td>
      </tr>
      <tr>
        <td>Lampiran</td>
        <td>:</td>
        <td>$row->lamp1</td>
      </tr>
      <tr>
        <td>Perihal</td>
        <td>:</td>
        <td>$row->hal1</td>
      </tr>
  <tr>
    <td colspan='3'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='3'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='36' valign='top'>1.</td>
        <td colspan='2'>Sehubungan penempatan dana Yakes-Telkom pada deposito, dengan ini dimohon bantuan Saudara untuk memindahbukukan dana dengan ketentuan sebagai berikut :</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td width='200'>a. Bentuk </td>
        <td width='550'>: $row->jenis </td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td width='200'>a. Nama Bank </td>
      <td width='550'>: $row->nama_bank </td>
    </tr>
      <tr>
        <td>&nbsp;</td>
        <td>c. Jumlah Dana </td>
        <td>: Rp. ".number_format($row->nilai,0,",",".")." ,- (diulang Rp. ".number_format($row->nilai,0,",",".")." ,-) </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>d. Jangka Waktu </td>
        <td>: Tanggal mulai : ".substr($row->tgl_mulai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_mulai),0,6))." , 
		tanggal jatuh tempo : ".substr($row->tgl_selesai,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_selesai),0,6))." , ($row->jml_hari hari) </td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      <td>e. Tingkat Suku Bunga </td>
      <td>: $row->p_bunga% ($row->basis hari) p.a. </td>
    </tr>
      <tr>
        <td>&nbsp;</td>
        <td>f. Pembayaran Bunga </td>
        <td>: Pada setiap Jatuh Tempo </td>
      </tr>
      <tr>
        <td valign='top'>2.</td>
        <td colspan='2' valign='top'>Demikian konfirmasi ini kami sampaikan, atas perhatian dan kerja sama Saudara diucapkan terima kasih </td>
        </tr>
        </table></td>
      </tr>
      
    </table></td>
  </tr>
  <tr>
    <td colspan='3'>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='3'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'>Bandung, &nbsp;".substr($row->tgl,0,2)." ".$AddOnLib->ubah_bulan($row->bulan)." ".$row->tahun." </td>
        <td width='400'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td style='font-weight:bold'>YAKES-TELKOM</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>A.n. POH Kepala Bidang Investasi</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td style='font-weight:bold'><u>$row->nama1</u></td>
        <td></td>
      </tr>
      <tr>
        <td style='font-weight:bold'>NIK $row->nikttd1</td>
        <td></td>
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
