<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekTagihan2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tahun=substr($tmp[0],0,4);
		$sql=" select a.no_bill,a.no_dokumen,a.tanggal,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as tagihan,g.nama as nama_cust,f.kota,a.nik_user,a.nik_app,e.nama as nama_buat,c.nama as nama_app,e.jabatan as jab_buat,c.jabatan as jab_app,'-' as no_kuitansi,a.periode,a.kode_lokasi,
		g.alamat,g.npwp, d.bank,d.no_rek,d.nama_rek
        from prb_prbill_m a
        inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
        inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
        inner join prb_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
		left join karyawan e on a.nik_user=e.nik
		inner join lokasi f on a.kode_lokasi=f.kode_lokasi
		inner join prb_prbill_cust g on a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi
        $this->filter order by a.no_bill";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
        $nilai=0;$nilai_ppn=0;$tagihan=0;
        
        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/tu.jpg";
        $path2= $path . "image/grey.png";
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
            $nu=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
        echo "<tr><td>$nu</td>
              <td>$row1->keterangan</td>
              <td align='right'>".number_format($row1->harga,0,",",".")."</td>
              <td>$row1->jumlah</td>
              <td align='right'>".number_format($row1->total,0,",",".")."</td></tr>";
                $nu++;
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
        <td align='right'>".number_format($row->disc,0,",",".")."</td>
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
echo"<br>";
echo $AddOnLib->judul_laporan("laporan kuitansi",$this->lokasi);
echo "<table width='700' border='1' cellspacing='2' cellpadding='1'  class='kotak' >
        <tr>
            <td width='105' style='vertical-align:top;text-align:center;border-right: 2px dotted black;'>
            <img src='$pathfoto' width='80px' height='30px' style='padding-top:20px;padding-bottom: 200px;'></img> <span>KUITANSI
            </span>
            <br>
            <br>
            <br>
            <br>
            <br>
            <span style='font-size: 8px;'>
            Jl. Telekomunikasi Terusan 
            Buah Batu No.01
            Bandung, Jawa Barat 40257
            telp. +62 (22) 7564 108
            www.telkomuniversity.ac.id
            </span></td>
            <td width='595'>";
        echo "
                    <table width='100%'  border='0' cellspacing='0' cellpadding='1' style='margin-left:5px;padding-right:20px'>
                    <tr>
                        <td width='120'  style='font-size:12px'>Nomor</td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2'  style='font-size:12px;padding:7px'>&nbsp; $row->no_bill</td>
                       
                    </tr>
                    <tr>
                        <td width='120'  style='font-size:12px'>Telah diterima dari </td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2'  style='font-size:12px;padding:7px'>&nbsp; $row->nama_cust</td>
                    </tr>
                    <tr>
                        <td  style='font-size:12px'>Uang Sejumlah</td>
                        <td width='5'>:</td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; <i>".$AddOnLib->terbilang2($row->nilai,"Rupiah")." </i></td>
                    </tr>
                    <tr>
                        <td  style='font-size:12px'>Untuk Pembayaran</td>
                        <td width='5'>:</td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; $row->keterangan</td>
                    </tr>
                    <tr>
                        <td  height='80px' style='font-size:12px'></td>
                        <td width='5'></td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; </td>
                    </tr>
                    <!-- <tr>
                        <td  colspan='2' height='40px' style='font-size:14px;text-align:center' >Jumlah</td>
                        <td  style='box-shadow: inset 0 0 0 1000px #a8a6a0;font-size:14px;padding:7px'> ".number_format($row->nilai,0,",",".")."</td>
                        <td width='300'></td>
                    </tr> -->
                    </table>";

                    $bln = substr($row->periode,4,2);
                    $thn = substr($row->periode,0,4);
                    $tgl = explode("/",$row->tanggal);

                    if (floatval($bln) > 12) $bln = 12;

                    $bln = $AddOnLib->ubah_bulan($bln);
                    $tanggal = $tgl[1] . " ". $bln ." ". $thn;

             echo "<table border='0' width='100%' cellspacing='0' cellpadding='0'>
                    
                    <tr>
                        <td width='10'>&nbsp;</td>
                        <td width='150' align='center' > </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td align='center'  style='font-size:12px' >Bandung, $tanggal </td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td height='80'>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     </tr>
                     <tr>
                     <td width='10' colspan='2' rowspan='2'>&nbsp; Jumlah : <i>Rp. ".number_format($row->nilai,0,",",".")."</i> </td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150'  align='center' style='font-size:12px'><u>$row->nama_app</u></td>
                     </tr>
                     <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150'  align='center' style='font-size:12px'><u>$row->jab_app</u></td>
                     </tr>
                </table>";
 	echo "
		</td>
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
