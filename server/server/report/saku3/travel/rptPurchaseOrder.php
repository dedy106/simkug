<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptPurchaseOrder extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bukti)
from brg_kirim_m a  $this->filter ";
		error_log($sql);
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
        
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/aki.jpg";
		
		$sql="select a.no_po,a.kode_lokasi, a.tgl_input,a.periode,convert(varchar,a.tanggal,103) as tgl, a.no_dokumen,a.keterangan,a.nilai1,a.nilai2,a.nilai3,a.no_ref1,a.no_ref2,a.param1,b.nama,b.alamat,b.no_tel,b.no_fax 
        from mb_po_m a
        inner join vendor b on a.param1=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
        $this->filter
        order by a.no_po";

        // echo $sql;

	
		// $start = (($this->page-1) * $this->rows);
		// $rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$rs=$dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("Purchase Order",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "
            <table width='800' cellspacing='0' cellpadding='0' border='0'>
              <tbody>
              <tr>
                  <td>
                      <table width='100%' border='0'>
                       <tbody>
                          
                          <tr>
                              <td><img src='/image/aki.jpg' width='200' height='120'></td>
                              <td class='judul_bukti' colspan='3' style='padding-left:100px'><b>PURCHASE ORDER</b></td>
                          </tr>
                          <tr>
                              <td style='font-size: 11px;vertical-align: top;' rowspan='7'>Maribaya Natural Hot Spring Resort <br>
                              Jl. Maribaya No.105/212<br>
                              Bandung 40391<br>
                              022-2000190</td>
                              <td width='250'></td>
                              <td width='100'>PO Number#</td>
                              <td width='270'>: $row->no_po </td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>PO Date</td>
                              <td>: $row->tgl </td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>PR Ref#</td>
                              <td>: $row->no_ref1</td>
                          </tr>
                          <tr>
                              <td></td>
                              <td>Supplier</td>
                              <td>: $row->param1 - $row->nama</td>
                          </tr>
                           <tr>
                              <td></td>
                              <td>Address</td>
                              <td>: $row->alamat</td>
                          </tr>
                           <tr>
                              <td></td>
                              <td>Contact Pers</td>
                              <td>: </td>
                          </tr>
                           <tr>
                              <td></td>
                              <td>Phone/Fax</td>
                              <td>: $row->no_telp / $row->no_fax</td>
                          </tr>
                          <tr>
                             <td>&nbsp;</td>
                             <td>&nbsp;</td>
                             <td>&nbsp;</td>
                          </tr>
                          <tr>
                              <td colspan='4'>
                                  <table class='kotak' cellspacing='0' cellpadding='0' border='1'>
                                  <tbody>
                                  <tr bgcolor='#CCCCCC'>
                                      <td class='header_laporan' width='20' align='center'>No</td>
                                      <td class='header_laporan' width='100' align='center'>Item</td>
                                      <td class='header_laporan' width='200' align='center'>Specs</td>
                                      <td class='header_laporan' width='90' align='center'>QtyStock</td>
                                      <td class='header_laporan' width='90' align='center'>Unit</td>
                                      <td class='header_laporan' width='90' align='center'>Unit Price</td>
                                      <td class='header_laporan' width='100' align='center'>Total</td>
                                  </tr>";
                                  $sql="  
                                  select a.no_po,a.periode,a.nu,a.kode_barang,b.nama,a.satuan,a.jumlah,a.harga,a.total,a.no_pesan
                                  from mb_po_d a
                                  inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
                                  where a.kode_lokasi='$row->kode_lokasi' and a.no_po='$row->no_po' and a.no_pesan='$row->no_ref1' ";
                                  $rs1=$dbLib->execute($sql);
                                  $no=1;
                                  $total=0;
                                  while ($row1 = $rs1->FetchNextObject($toupper=false))
                                  {
                                      $total=$total+$row1->total;
                                  echo"
                                  <tr>
                                          <td class='isi_laporan'>$no</td>
                                          <td class='isi_laporan'>$row1->kode_barang</td>
                                          <td class='isi_laporan'>$row1->nama</td>
                                          <td class='isi_laporan'>$row1->jumlah</td>
                                          <td class='isi_laporan'>$row1->satuan</td>
                                          <td class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
                                          <td class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
                                        
                                  </tr>";
                                  }
                                  echo"
                                  </tbody>
                                  </table>
                              </td>
                          </tr>
                          <tr>
                              <td height='400'>&nbsp;</td>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                          </tr>
                      </tbody>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td>
                      <table cellspacing='0' cellpadding='0' border='0'>
                          <tbody>
                              <tr>
                                  <td colspan='3'>&nbsp;<u>Memo:</u></td>
                                  <td>Sub Total</td>
                                  <td>: ".number_format($total,0,",",".")."</td>
                              </tr>
                              <tr>
                                  <td colspan='3'>&nbsp;</td>
                                  <td> Reg Discount</td>
                                  <td>: ".number_format($row->nilai3,0,",",".")."</td>
                              </tr>
                              <tr>
                                <td colspan='3'>&nbsp;</td>
                                <td>Tax</td>
                                <td>: ".number_format($row->nilai2,0,",",".")."</td>
                              </tr>
                              <tr>
                                <td colspan='3'>&nbsp;</td>
                                <td>Delivery Charge</td>
                                <td>: 0</td>
                              </tr>
                              <tr>
                                <td colspan='3'>&nbsp;</td>
                                <td>Grand Total</td>
                                <td>: ".number_format($row->nilai1,0,",",".")."</td>
                              </tr>
                              <tr>
                                  <td>&nbsp;</td>
                              </tr>
                              <tr>
                                  <td colspan='5'>Bandung, $row->tgl_input</td>
                              </tr>
                              <tr>
                                  <td>&nbsp;</td>
                              </tr>
                              <tr align='center'>
                                  <td width='160'><b>Purchasing </b> </td>
                                  <td width='160'><b>Purchase Manager </b></td>
                                  <td width='160'><b>Chief Acct </b></td>
                                  <td width='160'><b>General Manager </b></td>
                                  <td width='140'><b>Supplier </b></td>
                              </tr>
                              <tr align='center'>
                                  <td width='160' height='80'>&nbsp;</td>
                                  <td width='160' height='80'>&nbsp;</td>
                                  <td width='160' height='80'>&nbsp;</td>
                                  <td width='160' height='80'>&nbsp;</td>
                                  <td width='140' height='80'>&nbsp;</td>
                              </tr> 
                                  <tr align='center'>
                                  <td width='160'>(.............................) </td>
                                  <td width='160'>(.............................) </td>
                                  <td width='160'>(.............................)</td>
                                  <td width='160'>(.............................)</td>
                                  <td width='140'>(.............................)</td>
                              </tr>
                              <tr valign='bottom' align='center'>
                                  <td class='garis_bawah' height='70'>&nbsp;</td>
                                  <td>&nbsp;</td>
                                  <td>&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
              </tbody>
            </table>
           ";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
