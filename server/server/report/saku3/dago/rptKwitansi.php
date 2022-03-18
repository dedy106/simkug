<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dago_rptKwitansi extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_kwitansi,a.kurs, c.nama as peserta,c.telp,a.tgl_bayar,a.jadwal,a.paket,a.bayar_paket,a.sistem_bayar,a.nilai_t, 
		d.nama as paket, e.nama_agen as agen,a.no_reg,d.kode_curr,a.nilai_p,a.nilai_t,a.saldo_t - nilai_t as sisat,a.saldo_p - nilai_p as sisap,a.bayar_tambahan, h.nama_marketing
				from dgw_pembayaran a 
				inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi 				
				inner join dgw_peserta c on c.no_peserta=b.no_peserta and c.kode_lokasi=b.kode_lokasi 								
				inner join dgw_paket d on d.no_paket=b.no_paket and d.kode_lokasi=b.kode_lokasi 				
				inner join dgw_agent e on e.no_agen=b.no_agen and b.kode_lokasi=e.kode_lokasi 
				inner join dgw_marketing h on h.no_marketing=b.no_marketing and h.kode_lokasi=b.kode_lokasi

        $this->filter";
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
        <td width='114'><img src=$pathfoto width='200' height='90' /></td>
        <td width='676' align='center'><span class='istyle17'>KWITANSI</span></td>
      </tr>
    </table></td>
  </tr>
  
  <td></td>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>Tanggal Bayar</td>
        <td width='244'>:$row->tgl_bayar</td>
        <td width='155'>No. Kwitansi</td>
        <td width='225'>: $row->no_kwitansi</td>
      </tr>
      <tr>
        <td>Terima Dari</td>
        <td>: $row->peserta</td>
        <td>Nomor Telepon</td>
        <td>: $row->telp</td>
      </tr>
      <tr>
        <td>Keberangkatan </td>
        <td>: $row->jadwal</td>
        <td>Paket</td>
        <td>: $row->paket</td>
      </tr>
      <tr>
        <td>Harga Paket </td>
        <td>: $row->kode_curr ".number_format($row->bayar_paket,0,',','.')."</td>
        <td>Sistem Pembayaran</td>
        <td>: $row->sistem_bayar</td>
      </tr>
      <tr>
        <td>Agen</td>
        <td>:  $row->agen</td>
        <td>Marketing</td>
        <td>: $row->nama_marketing</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><b>Untuk Pembayaran </b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><b>Pembayaran Paket </b></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='154'>Dollar</td>
            <td width='244'>: $row->kode_curr</td>
            <td width='155'>Sisa Pembayaran</td>
            <td width='229'>: ".number_format($row->sisap,0,',','.')."</td>
          </tr>
          <tr>
            <td>Nilai Pembayaran</td>
            <td>: ".number_format($row->nilai_p,0,',','.')."</td>
            <td>Kurs</td>
            <td>: ".number_format($row->kurs,0,',','.')."</td>
          </tr>
        </table></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='401'><b>Pembayaran Biaya Tambahan</b></td>
          </tr>
          <tr>
            <td>Biaya Tambahan </td>
            ";
	$sql="select a.kode_biaya,c.nama,a.nilai, a.jml
from dgw_reg_biaya a
inner join dgw_reg b on a.no_reg=b.no_reg and a.kode_lokasi=b.kode_lokasi
inner join dgw_biaya c on c.kode_biaya=a.kode_biaya and c.kode_lokasi=a.kode_lokasi
where a.no_reg='$row->no_reg' and a.kode_lokasi='$row->kode_lokasi'";
	$rs1 = $dbLib->execute($sql);	  
	  while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
      echo "<tr>
        <td>- $row1->nama </td>
        <td>: ".number_format($row1->nilai,0,',','.')."</td>
		
		
      </tr>";
    }
	echo "
          <tr>
            <td>&nbsp;</td>
            <td>-----------------------------------------------</td>
          </tr>
          <tr>
            <td><b>Total</b></td>
            <td>: ".number_format($row->bayar_tambahan,0,',','.')."</td>
          </tr>
          <tr>
            <td>Nilai Pembayaran</td>
            <td>: ".number_format($row->nilai_t,0,',','.')."</td>
          </tr>
          <tr>
            <td>Sisa Pembayaran</td>
            <td>: ".number_format($row->sisat,0,',','.')."</td>
          </tr>
		  
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>Best Regards, </td>
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
            <td align='center' valign='top'>()</td>
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