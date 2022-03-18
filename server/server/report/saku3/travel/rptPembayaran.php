<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptPembayaran extends server_report_basic
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
		$sql="select count(a.no_kwitansi) as cicil,i.nilai1,a.kode_lokasi,a.no_kwitansi,a.kurs, c.nama as peserta,c.telp,CONVERT(varchar, a.tgl_bayar, 105) as tgl_bayar,a.jadwal,a.paket,(a.bayar_paket*a.kurs)+a.bayar_tambahan as bayar,a.sistem_bayar,a.nilai_t, 
		d.nama as paket, b.no_agen,i.nik_user,e.nama_agen as agen,a.no_reg,d.kode_curr,a.nilai_p,a.nilai_t,a.saldo_t - nilai_t as sisat,a.saldo_p - nilai_p as sisap,a.bayar_tambahan, h.nama_marketing,b.harga+b.harga_room as harga_paket
				from dgw_pembayaran a 
				inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi 				
				inner join dgw_peserta c on c.no_peserta=b.no_peserta and c.kode_lokasi=b.kode_lokasi 								
				inner join dgw_paket d on d.no_paket=b.no_paket and d.kode_lokasi=b.kode_lokasi 				
				inner join dgw_agent e on e.no_agen=b.no_agen and b.kode_lokasi=e.kode_lokasi 
				inner join dgw_marketing h on h.no_marketing=b.no_marketing and h.kode_lokasi=b.kode_lokasi
        inner join trans_m i on i.no_bukti=a.no_kwitansi and i.kode_lokasi=a.kode_lokasi
        $this->filter
    group by b.no_agen,i.nilai1,a.kode_lokasi,a.no_kwitansi,a.kurs, c.nama,c.telp,a.tgl_bayar,a.jadwal,a.paket,a.bayar_paket,a.sistem_bayar,a.nilai_t, 
		d.nama, e.nama_agen,i.nik_user,a.no_reg,d.kode_curr,a.nilai_p,a.nilai_t,a.saldo_t,nilai_t,saldo_p ,a.bayar_tambahan, h.nama_marketing,b.harga,b.harga_room
        order by a.no_kwitansi";
        // echo $sql;


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
        <td width='114'><img src=$pathfoto width='150' height='90' /></td>
        <td width='676' align='right'>Jl. Puter No. 7 Bandung<br>
        Tlp. 022-2500307, 022-2531259,<br>02517062</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td width='676' align='center' colspan='2'><span class='istyle17' style='font-size: 14px;'><u>KWITANSI</u><br>$row->no_kwitansi</br></span></td>
    </td>
  </tr>
  <tr><td>&nbsp;</td></tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='154'>TANGGAL BAYAR</td>
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
        <td>: $row->kode_curr ".number_format($row->harga_paket,0,',','.')."</td>
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
        </tr>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td align='center' colspan='2'><b>DATA PEMBAYARAN</b></td>
        </tr>
            <tr>
            <td width='154' style='border-top:1px dotted black;border-bottom:1px dotted black'>BIAYA PAKET (RP) </td>
            <td width='244' style='border-top:1px dotted black;border-bottom:1px dotted black'>: ".number_format($row->nilai1,0,',','.')." - KURS : ".number_format($row->kurs,0,',','.')."</td>
            </tr>
            <tr>
            <td>SISTEM PEMBAYARAN</td>
            <td>: Cicilan Ke-$row->cicil</td>
            </tr>
            <tr>
            <td>TOTAL (RP) </td>
            <td>: ".number_format($row->nilai1,0,',','.')."</td>
            </tr>
            <tr>
            <td>TERBILANG </td>
            <td  width='300'>: ".$AddOnLib->terbilang($row->nilai1)."</td>
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
            <td>&nbsp;</td>
            </tr>
            <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            </tr>
          <tr>
            <td align='left'></td>
            <td align='center'>Customer,</td>
          </tr>
          <tr>
            <td style='border-top:1px dotted black;border-bottom:1px dotted black'>&nbsp;</td>
            <td style='border-top:1px dotted black;border-bottom:1px dotted black'>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='left' valign='top'></td>
            <td align='center'>($row->peserta)</td>
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