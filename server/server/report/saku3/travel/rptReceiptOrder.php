<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_travel_rptReceiptOrder extends server_report_basic
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
		
		$sql="select a.no_terima,a.kode_lokasi, a.tgl_input,a.periode,convert(varchar,a.tanggal,103) as tgl, a.no_dokumen,a.keterangan,a.nilai,a.no_po,a.no_ba,b.param1,c.nama as nama_vendor 
        from mb_terima_m a
        inner join mb_po_m b on a.no_po=b.no_po and a.kode_lokasi=b.kode_lokasi
        left join vendor c on b.param1=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
        $this->filter
        order by a.no_terima";

	
		// $start = (($this->page-1) * $this->rows);
		// $rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$rs=$dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("Receipt Order ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
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
                            <td class='judul_bukti' colspan='3' style='padding-left:100px'><b>RECEIPT ORDER</b></td>
                        </tr>
                        <tr>
                            <td rowspan='4' style='font-size: 11px;'>Maribaya Natural Hot Spring Resort <br>
                            Jl. Maribaya No.105/212<br>
                            Bandung 40391<br>
                            022-2000190</td>
                            <td width='250'></td>
                            <td width='100'>Rcpt Number#</td><td width='200'>: $row->terima</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Rcpt Date</td>
                            <td>: $row->tgl </td>
                        </tr>
                         <tr>
                            <td></td>
                            <td>Purchase ref</td>
                            <td>: $row->no_po </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Supplier</td>
                            <td>: $row->kode_vendor - $row->nama_vendor </td>
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
                                    <td class='header_laporan' width='220' align='center'>Specs</td>
                                    <td class='header_laporan' width='120' align='center'>Qty Order</td>
                                    <td class='header_laporan' width='120' align='center'>Qty GR</td>
                                    <td class='header_laporan' width='120' align='center'>Unit</td>
                                </tr>";
                                $sql="select a.no_bukti,a.periode,a.nu,a.kode_barang,b.nama,a.satuan,a.jumlah as jml_terima,a.harga,d.jumlah as jml_order
                                from brg_trans_d a
                                inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
                                inner join mb_terima_m c on a.no_bukti=c.no_terima and a.kode_lokasi=c.kode_lokasi
                                inner join mb_po_d d on c.no_po=d.no_po and c.kode_lokasi=d.kode_lokasi and a.kode_barang=d.kode_barang
                                where a.kode_lokasi='$row->kode_lokasi' and a.no_bukti='$row->no_terima' ";
                                $rs1=$dbLib->execute($sql);
                                $no=1;
                                while ($row1 = $rs1->FetchNextObject($toupper=false))
                                {

                                echo"
                                <tr>
                                        <td class='isi_laporan'>$no</td>
                                        <td class='isi_laporan'>$row1->kode_barang</td>
                                        <td class='isi_laporan'>$row1->nama</td>
                                        <td class='isi_laporan'>$row1->jml_order</td>
                                        <td class='isi_laporan'>$row1->jml_terima</td>
                                        <td class='isi_laporan'>$row1->satuan</td>
                                      
                                </tr>";
                                $no++;
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
                    <table width='100%' cellspacing='0' cellpadding='0' border='0'>
                        <tbody>
                            <tr>
                                <td colspan='2'>&nbsp;<u>Memo:</u></td>
                                <td width='100'>&nbsp;Total</td>
                                <td width='100'>:&nbsp;".number_format($row->nilai,0,",",".")."</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td colspan='2'>Bandung, $row->tgl_input</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr align='center'>
                                <td width='200'><b>Receiving </b> </td>
                                <td width='200'><b>Security </b></td>
                                <td width='200' colspan='2'><b>Supplier </b></td>
                               
                            </tr>
                            <tr align='center'>
                                <td width='200' height='80'>&nbsp;</td>
                                <td width='200' height='80'>&nbsp;</td>
                                <td width='200' colspan='2' height='80'>&nbsp;</td>
                                
                            </tr> 
                                <tr align='center'>
                                <td width='200'>(.............................) </td>
                                <td width='200'>(.............................) </td>
                                <td width='200' colspan='2'>(.............................)</td>
                                
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
  
