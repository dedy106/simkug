<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_bill_rptBillGabung extends server_report_basic
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
		$tmp=explode("|",$this->filter2);
		$periode=$tmp[0];
    $filter2=$tmp[1];
		
		
		$sql="select a.no_bill,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_lokasi,a.tanggal,a.no_ba,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai as tagihan,a.nilai-a.nilai_ppn as tagihan2,b.nama as nama_cust,b.divisi,b.alamat,b.npwp, a.bank,a.no_rek,a.nama_rek,c.nama,c.jabatan,c.kota,
		a.nik_user,a.nik_app,f.nama as nama_buat,g.nama as nama_app,f.jabatan as jab_buat,g.jabatan as jab_app,a.no_kuitansi,a.periode 
        from bill_m a
        inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
        inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
        left join kontrak_m d on a.no_kontrak=d.no_kontrak and a.kode_lokasi=d.kode_lokasi
        left join lokasi e on a.kode_lokasi=e.kode_lokasi
        left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
        left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
        $this->filter
        order by a.no_bill";
		
		
		$rs = $dbLib->execute($sql);	
		
		$AddOnLib=new server_util_AddOnLib();
		
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/tpcc.jpeg";
        $path2= $path . "image/grey.png";
        
        $wa= $path . "image/whatapp.png";
        $telegram= $path . "image/telegram.png";
	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
      
    echo "<div align='center' >"; 
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td align='center' class='istyle17'>INVOICE</td>
            </tr>
            <tr>
              <td align='right'><table width='300' border='1' cellspacing='0' cellpadding='0' class='kotak'>
                <tr>
                  <td align='center' style='padding-top: 5px;'>Date No.</td>
                  <td align='center' style='padding-top: 5px;'>Invoice No.</td>
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
                      <td>:</td>
                      <td width='332'>$row->nama_cust </td>
                    </tr>
				    <tr>
                      <td width='58'>Divisi</td>
                      <td>:</td>
                      <td width='332'>$row->divisi </td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>:</td>
                      <td>$row->alamat </td>
                    </tr>
                    <tr>
                      <td>NPWP</td>
                      <td>:</td>
                      <td>$row->npwp </td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td><table width='800' border='1' cellspacing='0' cellpadding='2' class='kotak'>
                <tr>
                  <td width='30' align='center'>No.</td>
                  <td width='350' align='center'>Deskripsi</td>
                  <td width='140' align='center'>Harga Satuan</td>
                  <td width='140' align='center'>Jumlah Peserta</td>
                  <td width='140' align='center'>Total</td>
                </tr>";
                $sql1="select a.nu,a.item as keterangan,a.harga,a.jumlah, a.harga*a.jumlah as total
          from bill_d a 
          where a.no_bill='$row->no_bill' and a.kode_lokasi='$row->kode_lokasi'
          order by a.nu  ";
                $rs1 = $dbLib->execute($sql1);
                $j=1;$jumlah=0; $nilai=0; 
                while ($row1 = $rs1->FetchNextObject($toupper=false))
                {
                  echo "<tr><td>$j</td>
                        <td>$row1->keterangan</td>
                        <td align='right'>".number_format($row1->harga,0,",",".")."</td>
                        <td>$row1->jumlah</td>
                        <td align='right'>".number_format($row1->total,0,",",".")."</td></tr>";
                  $j++;
                }
            
            echo"
                <tr>
                  <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
                  <td colspan='2'>Total</td>
                  <td align='right'>".number_format($row->tagihan,0,",",".")."</td>
                </tr>
                <tr>
                  <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
                  <td colspan='2'>PPN =10%X Dasar Pengenaan Pajak </td>
                  <td align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
                </tr>
                <tr>
                  <td colspan='2' style='border-right:1px solid white'>&nbsp;</td>
                  <td colspan='2'>Total Setelah PPN</td>
                  <td align='right'>".number_format($row->nilai,0,",",".")."</td>
                </tr>
                <tr>
                
                  <td colspan='5'>Terbilang <br>".$AddOnLib->terbilang($row->nilai)."</td>
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
                  <td align='center'><u>$row->nama</u></td>
                </tr>
                <tr>
                  <td align='center'>$row->jabatan</td>
                </tr>
              </table></td>
            </tr>
            </table>
        </div>
        <br>
        <div height='60px'>&nbsp;</div>
        <DIV style='page-break-after:always'></DIV>";
          echo "
		  <div align='center'>
          <table width='700' border='1' cellspacing='2' cellpadding='1'  class='kotak' >
        <tr>
            <td width='105' style='vertical-align:top;text-align:center;border-right: 2px dashed black;padding-bottom:20px'>
            <img src='$pathfoto' width='150px' height='70px' style='padding-top:50px;padding-bottom: 100px;'></img> <span style='font-size:20px;font-weight:bold'>KUITANSI
            </span>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <table style='font-size: 10px !important;padding-left: 5px;'>
            <tbody>
            <tr>
              <td colspan='3' style='font-size: 10px;vertical-align: top;text-align: left;'>Jl. Gegerkalong Hilir No. 47 Bandung 40152. Indonesia</td>
            </tr>
            <tr>
              <td colspan='3' style='font-size: 10px;vertical-align: top;text-align: left;'> telp. (022) 2007891<!--+62 22 2007891 +62 22 82002285 --></td>
            </tr>
            <tr>
              <td colspan='3' style='font-size: 10px;vertical-align: top;text-align: left;'> fax. (022) 2007852<!--+62 22 2007891 +62 22 82002285 --></td>
            </tr>
          </tbody></table>
            <span style='font-size: 11px;'><!--
                    +62 22 82002285<br>
			<img src='$wa' width='22px'><img src='$telegram' width='20px'><br>  +628112282500
			<br>Email : marketing@telkompcc.co.id-->
            </span></td>
            <td width='650'>";
        echo "
                    <table width='100%'  border='0' cellspacing='0' cellpadding='1' style='margin-left:5px;padding-right:20px'>
                    <tr>
                        <td width='120'  style='font-size:12px'>Nomor</td>
                        <td width='5'>:</td>
                        <td width='100' style='font-size:12px;padding:7px;border: 1px solid black;'>$row->no_bill</td>
                        <td></td>
                       
                    </tr>
                    <tr>
                        <td width='120'  style='font-size:12px'>Telah diterima dari </td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2'  style='font-size:12px;padding:7px;border-bottom:1px solid black'>$row->nama_cust</td>
                    </tr>
                    <tr>
                    <td height='10px'></td>
                    </tr>
                    <tr>
                        <td  style='font-size:12px'>Uang Sejumlah</td>
                        <td width='5'>:</td>
                        <td  colspan='2' style='font-size:12px;padding:7px;background: #dbdbdb;font-weight:bold'><i>".$AddOnLib->terbilang2($row->nilai,"Rupiah")." </i></td>
                    </tr>
                    <tr>
                        <td style='font-size:12px;vertical-align: top;padding: 7px 0px;'>Untuk Pembayaran</td>
                        <td style='font-size: 12px;vertical-align: top;padding: 7px 0px;' width='5'>:</td>
                        <td colspan='2' style='font-size:12px;padding:7px;text-align: justify;vertical-align: top;'>$row->no_ba</td>
                    </tr>
                    <tr>
                        <td  height='80px' style='font-size:12px'></td>
                        <td width='5'></td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; </td>
                    </tr>
                    <!-- <tr>
                        <td  colspan='2' height='40px' style='font-size:14px;text-align:center' >Jumlah</td>
                        <td  style='box-shadow: inset 0 0 0 1000px #a8a6a0;font-size:14px;padding:7px;'> ".number_format($row->nilai,0,",",".")."</td>
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
                        <td width='50' align='center' > </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td align='center'  style='font-size:12px' >Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td height='110'>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     </tr>
                     <tr>
                      <td colspan='2' rowspan='2'>&nbsp; Jumlah Rp. </td>
                      <td colspan='2' rowspan='2' style='background: #dbdbdb;font-weight:bold;text-align:right;padding:5px'>&nbsp; <i>".number_format($row->nilai,0,",",".")."</i> </td>
                      <td>&nbsp;</td>
                      <td width='150'  align='center' style='font-size:12px'><u>$row->nama_app</u></td>
                     </tr>
                     <tr>
                      <td>&nbsp;</td>
                      <td width='150'  align='center' style='font-size:12px'>$row->jab_app</td>
                     </tr>
                </table>";
 	echo "
		</td>
  </tr>
</table>"; 
    echo "</div>";

    echo "<br>";
      }

      // JURNAL
      $sql="select a.no_bukti,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.kode_pp,a.keterangan,a.kode_lokasi,a.tanggal,
       a.nik_user,b.nama as nama_buat,a.nik1,c.nama as nama_app, d.kota,a.keterangan,a.no_ref2 
			from trans_m a
			inner join lokasi d on d.kode_lokasi = a.kode_lokasi 
			left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
			left join karyawan c on a.nik1=c.nik and a.kode_lokasi=c.kode_lokasi 
			$filter2
			order by a.no_bukti";

      $rs3 = $dbLib->execute($sql);	
      $row3 = $rs3->FetchNextObject($toupper=false);
      echo "<div align='center' >"; 
      echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>MEMO JURNAL PIUTANG PROYEK </td>
			  </tr>
			  <tr>
				<td>
			<table border='0' cellspacing='2' cellpadding='1'>
			  
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row3->no_bukti</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>Unit PngJawab </td>
					<td width='496' class='header_laporan'>:&nbsp;$row3->kode_pp</td>
					</tr>

					<tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row3->tgl</td>
					</tr>
				 
				<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row3->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='60' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='80' class='header_laporan'><div align='center'>No Dokumen</div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.no_dokumen,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from trans_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_bukti='$row3->no_bukti' and a.kode_lokasi='$row3->kode_lokasi'
			order by a.nu ";
		
		
		$rs4 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row4 = $rs4->FetchNextObject($toupper=false))
		{
			$debet=number_format($row4->debet,0,',','.');
			$kredit=number_format($row4->kredit,0,',','.');
			$tot_debet=$tot_debet+$row4->debet;
			$tot_kredit=$tot_kredit+$row4->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row4->kode_akun</td>
				<td class='isi_laporan'>$row4->nama</td>
				<td class='isi_laporan'>$row4->no_dokumen</td>
				<td class='isi_laporan'>$row4->keterangan</td>
				<td class='isi_laporan' align='center'>$row4->kode_pp</td>
				<td class='isi_laporan' align='center'>$row4->kode_drk</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  
</table></td>
  </tr>
  <tr>
    <td align='left'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'>$row3->kota, ".substr($row3->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row3->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='150' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='150' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row3->nama_app</td>
        <td class='header_laporan'>$row3->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row3->nik_app</td>
        <td class='header_laporan'>$row3->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
echo "</div>"; 
      return "";
	  }
	
}
?>
  
