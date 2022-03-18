<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tu_proyek_rptInvoice extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		
		
		$sql="select a.no_bill,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_lokasi,a.tanggal,a.diskon,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as tagihan,f.nama as nama_cust,f.alamat,f.npwp, d.bank,d.no_rek,d.nama_rek,c.nama,c.jabatan 
        from prb_prbill_m a
        inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
        inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
        inner join prb_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
		inner join prb_rabapp_m e on a.kode_proyek=e.kode_proyek and a.kode_lokasi = e.kode_lokasi 
		inner join prb_rab_cust f on a.kode_cust=f.kode_cust and a.kode_lokasi = f.kode_lokasi and e.no_rab=f.no_rab 
		inner join prb_rab_cust g on e.no_rab=g.no_rab and e.kode_cust=g.kode_cust and e.kode_lokasi = g.kode_lokasi 
        $this->filter
        order by a.no_bill";

        // echo $sql;
		
		$rs = $dbLib->execute($sql);	
		
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/frigia.jpg";
		$pathfoto2 = $path . "image/denso.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center' class='istyle17'>INVOICE</td>
  </tr>
  <tr>
    <td align='right'><table width='300' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td align='center'>Date No.</td>
        <td align='center'>Invoice No.</td>
      </tr>
      <tr>
        <td align='center'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        <td align='center'>$row->no_bill</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>Customer</td>
  </tr>
  <tr>
    <td><table width='400' border='1' cellspacing='0' cellpadding='0'  class='kotak'>
      <tr>
        <td><table width='400' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='58'>Nama</td>
            <td width='332'>: $row->nama_cust </td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>: $row->alamat </td>
          </tr>
          <tr>
            <td>NPWP</td>
            <td>: $row->npwp </td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' align='center'>No.</td>
        <td width='350' align='center'>Deskripsi</td>
        <td width='140' align='center'>Harga Satuan</td>
        <td width='140' align='center'>QTY</td>
        <td width='140' align='center'>Jumlah</td>
      </tr>";
      $sql1="select a.*
from prb_prbill_d a 
where a.no_bill='$row->no_bill' and a.kode_lokasi='$row->kode_lokasi'
 order by a.nu  ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
        echo "<tr><td>$row1->nu</td>
              <td>$row1->keterangan</td>
              <td align='right'>".number_format($row1->harga,0,",",".")."</td>
              <td>$row1->jumlah</td>
              <td align='right'>".number_format($row1->total,0,",",".")."</td></tr>";

			}
	
	echo"
      <tr>
        <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
        <td colspan='2'>Subtotal</td>
        <td align='right'>".number_format($row->tagihan,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
        <td colspan='2'>Discount</td>
        <td align='right'>".number_format($row->diskon,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
        <td colspan='2'>Dasar Pengenaan Pajak</td>
        <td align='right'>".number_format($row->tagihan,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
        <td colspan='2'>PPN =10%X Dasar Pengenaan Pajak</td>
        <td align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
        <td colspan='2'>Total Setelah PPN</td>
        <td align='right'>".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
       
        <td colspan='5'>Terbilang Tagihan <br>".strtoupper($AddOnLib->terbilang($row->nilai))."</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
            <td width='336'>Pembayaran dapat ditransfer melalui Bank : </td>
            <td width='154'></td>
      </tr>
      <tr>
        <td width='154'>Nama Rekening Bank</td>
        <td width='636'>: $row->nama_rek </td>
      </tr>
      <tr>
        <td>Nama Bank</td>
        <td>: $row->bank </td>
      </tr>
      <tr>
        <td>No. Rekening Bank</td>
        <td>: $row->no_rek </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'><table width='300' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
      </tr>
      <tr>
        <td height='60' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>$row->nama</td>
      </tr>
      <tr>
        <td align='center'>$row->jabatan</td>
      </tr>
    </table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
