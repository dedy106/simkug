<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptGroup2 extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1";
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
		$sql="select count(a.no_kwitansi) as cicil,i.nilai1,a.kode_lokasi,a.no_kwitansi,a.kurs, c.nama as peserta,c.telp,CONVERT(varchar, a.tgl_bayar, 105) as tgl_bayar,a.jadwal,a.paket,a.bayar_paket,a.sistem_bayar,a.nilai_t, 
		d.nama as paket, b.no_agen,i.nik_user,e.nama_agen as agen,a.no_reg,d.kode_curr,a.nilai_p,a.nilai_t,a.saldo_t - nilai_t as sisat,a.saldo_p - nilai_p as sisap,a.bayar_tambahan, h.nama_marketing
				from dgw_pembayaran a 
				inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi 				
				inner join dgw_peserta c on c.no_peserta=b.no_peserta and c.kode_lokasi=b.kode_lokasi 								
				inner join dgw_paket d on d.no_paket=b.no_paket and d.kode_lokasi=b.kode_lokasi 				
				inner join dgw_agent e on e.no_agen=b.no_agen and b.kode_lokasi=e.kode_lokasi 
				inner join dgw_marketing h on h.no_marketing=e.kode_marketing and h.kode_lokasi=e.kode_lokasi
        inner join trans_m i on i.no_bukti=a.no_kwitansi and i.kode_lokasi=a.kode_lokasi
        $this->filter
    GROUP BY b.no_agen,i.nilai1,a.kode_lokasi,a.no_kwitansi,a.kurs, c.nama,c.telp,a.tgl_bayar,a.jadwal,a.paket,a.bayar_paket,a.sistem_bayar,a.nilai_t, 
		d.nama, e.nama_agen,i.nik_user,a.no_reg,d.kode_curr,a.nilai_p,a.nilai_t,a.saldo_t,nilai_t,saldo_p ,a.bayar_tambahan, h.nama_marketing
        order by a.no_kwitansi";

        $rs = $dbLib->execute($sql);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/dago.png";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_curr=="Rp")
			{
				$nilai=$AddOnLib->terbilang($row->nilai);
			}
			else
			{
				$nilai=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			} 
			echo	"<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='114'><img src=$pathfoto width='200' height='90' /></td>
        <td width='676' align='center'><span class='istyle17'>KWITANSI<br>$row->no_kwitansi</br></span></td>
      </tr>
    </table></td>
  </tr>
  
  <td></td>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>TANGGAL BAYAR</td>
        <td width='244'>: $row->tgl_bayar</td>
      </tr>
      <tr>
        <td>DITERIMA DARI</td>
        <td>: $row->peserta</td>
      </tr>

      <tr>
        <td>PAKET / ROOM</td>
        <td>: $row->paket</td>
      </tr>
      <tr>
        <td>HARGA PAKET (USD) </td>
        <td>: $row->kode_curr ".number_format($row->bayar_paket,0,',','.')."</td>
      </tr>
      <tr>
      <td>KEBERANGKATAN </td>
      <td>: $row->jadwal</td>
      </tr>
      <tr>
      <td>MARKETING / AGEN</td>
      <td>: $row->nama_marketing</td>
      </tr>
      <tr>
        <td>AGEN / REFERAL</td>
        <td>:  $row->agen</td>
      </tr>
    </table></td>
  </tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center' ><b>DATA PEMBAYARAN</b></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='154'>BIAYA PAKET (RP) </td>
            <td width='244'>: ".number_format($row->nilai1,0,',','.')." - KURS : ".number_format($row->kurs,0,',','.')."</td>
          </tr>
          <tr>
            <td>SISTEM PEMBAYARAN</td>
            <td>: Cicilan Ke-$row->cicil</td>
          </tr>

          <tr>
          <td> ANGGOTA GROUP</td>
          <tr align='center'>
        <td width='150' class='header_laporan'>Nama</td>
        <td width='90' class='header_laporan'>Biaya Paket (RP)</td>
        <td width='100' class='header_laporan'>Biaya Paket (USD)</td>
        <td width='90' class='header_laporan'>Wajib</td>
        <td width='90' class='header_laporan'>Transport</td>
        <td width='90' class='header_laporan'>Mahrom</td>
        <td width='90' class='header_laporan'>Lain-lain</td>
      </tr>
      </tr>
";
    $sql1="select e.nama,c.kurs,c.nilai_p,c.kurs*c.nilai_p as idr,sum(case when a.kode_biaya in ('BW-0001','BW-0002','BW-0003','BW-0004','BW-0005','BW-0006','BW-0007') then a.nilai else 0 end) as wajib, 
    sum(case when a.kode_biaya in ('BO-0001','BO-0002','BO-0003','BO-0004') then a.nilai else 0 end) as trans,
    sum(case when a.kode_biaya in ('BO-0005') then a.nilai else 0 end) as mahrom,
    sum(case when a.kode_biaya in ('BO-0006','BO-0007','BO-0008') then a.nilai else 0 end) as lain
                        from dgw_reg_biaya a 
                       inner join dgw_biaya b on a.kode_biaya=b.kode_biaya and a.kode_lokasi=b.kode_lokasi 
                      inner join dgw_pembayaran c on a.no_reg=c.no_reg and a.kode_lokasi=c.kode_lokasi
                      inner join dgw_reg d on a.no_reg=d.no_reg and a.kode_lokasi=d.kode_lokasi
                      inner join dgw_peserta e on d.no_peserta=e.no_peserta and d.kode_lokasi=e.kode_lokasi 			
                      where c.no_kwitansi='$row->no_kwitansi' and a.kode_lokasi='$row->kode_lokasi' and d.no_agen='$row->no_agen'
                      GROUP BY e.nama,c.kurs,c.nilai_p ";
	
		$rs1 = $dbLib->execute($sql1);
		$total=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$total+=$row1->idr;
     echo "<tr>
        <td align='center' class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan' align='center'>".number_format($row1->idr,0,",",".")."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->nilai_p,0,",",".")."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->wajib,0,",",".")."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->trans,0,",",".")."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->mahrom,0,",",".")."</td>
        <td class='isi_laporan' align='center'>".number_format($row1->lain,0,",",".")."</td>
      </tr> <br>
       <br>";
	  }
         echo" <tr>
          <td>TOTAL (RP) </td>
          <td>: ".number_format($total,0,',','.')."</td>
        </tr>
        <tr>
        <td>TERBILANG </td>
        <td  width='300'>: ".$AddOnLib->terbilang($total)."</td>
      </tr>
      <tr>
      <td>TOTAL (USD) </td>
      <td>: ".number_format($row->nilai_p,0,',','.')."</td>
    </tr>
  <tr>
  <td>SISA </td>
  <td>: ".number_format($row->sisap,0,',','.')."</td>
</tr>
<tr>
<td>DIINPUT OLEH </td>
<td>: $row->nik_user </td>
</tr>
        </table></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>

          <tr>
            <td align='left'>Dago Wisata, </td>
            <td align='center'>Customer,</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='left' valign='top'>($row->nik_user)</td>
            <td align='center'>($row->peserta)</td>
          </tr>
        </table></td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
<br><DIV style='page-break-after:always'></DIV>
";
		
		}
		echo "</div>";
		return "";
	}
}
?>