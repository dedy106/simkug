<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_bengkel_rptFaktur extends server_report_basic
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
		
		
		$sql="select a.no_jual,b.no_spk,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.catatan,a.ket_jasa,a.no_faktur,
	   b.no_polisi,b.tipe,b.merk,b.tahun,d.nama as nama_app,d.jabatan,
	   c.nama as nama_cust,c.alamat,c.npwp,c.npwp,c.no_tel,
	   a.nilai,a.nilai_ppn,a.nilai_diskon,a.nilai_service,a.nilai+a.nilai_service-a.nilai_diskon as netto,a.nilai-a.nilai_diskon+a.nilai_ppn+a.nilai_service as total
from fri_jual_m a 
left join fri_spk_m b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_jual";
		
		$rs = $dbLib->execute($sql);	
		
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/frigia2.jpg";
		$pathfoto2 = $path . "image/denso.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='517'><img src='$pathfoto ' width='150' height='77'></td>
        <td width='273' rowspan='4' valign='bottom' align='right'><img src='$pathfoto2' width='150' height='49'></td>
      </tr>
      <tr>
        <td class='isi_laporan2'>Jalan Naripan No.34 Telp (022) 4234750 Bandung 40112 </td>
        </tr>
      <tr>
        <td class='isi_laporan2'>Jalan Peta No.76 Telp (022) 5205000 bandung 40234 </td>
        </tr>
      <tr>
        <td class='isi_laporan2'>Jalan Soekarno-Hatta No. 511 Telp. (022) 7301895 Bandung 40265 </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><hr size='2'></td>
  </tr>
  <tr>
    <td class='isi_bukti'>NPWP / PKP No. 01.210.957.5-441.00 </td>
  </tr>
  <tr>
    <td align='center' class='istyle17'><table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='400' align='right' class='istyle17'>FAKTUR</td>
    <td width='400' align='center' class='istyle17'>NO : $row->no_faktur</td>
  </tr>
</table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='isi_bukti'>NAMA CUSTOMER </td>
        <td width='280' class='isi_bukti'>: $row->nama_cust</td>
        <td width='124' class='isi_bukti'>NO.ORDER/SPK</td>
        <td width='268' class='isi_bukti'>: $row->no_spk </td>
      </tr>
      <tr>
        <td class='isi_bukti'>ALAMAT</td>
        <td class='isi_bukti'>: $row->alamat </td>
        <td class='isi_bukti'>MERK MOBIL </td>
        <td class='isi_bukti'>: $row->merk </td>
      </tr>
      <tr>
        <td class='isi_bukti'>TELP.</td>
        <td class='isi_bukti'>: $row->no_tel </td>
        <td class='isi_bukti'>PO.POLISI</td>
        <td class='isi_bukti'>: $row->no_polisi</td>
      </tr>
      <tr>
        <td class='isi_bukti'>NPWP CUSTOMER </td>
        <td class='isi_bukti'>: $row->npwp </td>
        <td class='isi_bukti'>NO.C/E</td>
        <td class='isi_bukti'>:  </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center'>
        <td width='500' height='20' class='isi_bukti'>PERINCIAN SUKU CADANG (1) </td>
        <td width='60' class='isi_bukti'>QTY</td>
        <td width='120' class='isi_bukti'>HARGA SATUAN </td>
        <td width='120' class='isi_bukti'>JUMLAH</td>
        </tr><tr>";
		
		echo "<td height='400' valign='top'><table width='100%' border='0' cellspacing='2' cellpadding='1'>";
		$sql1="select case when a.kode_brg='-' then '' else a.kode_brg end as kode_brg,a.item as nama,a.jumlah,a.harga,a.jumlah*a.harga as total 
from fri_jual_d a 
left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' and a.kode_lokasi='$row->kode_lokasi'
 order by a.jenis,a.nu  ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr><td class='isi_bukti'>$row1->nama &nbsp; $row1->kode_brg</td></tr>
        ";
			}
		echo "</table></td>";
        echo "<td height='400' valign='top'><table width='100%' border='0' cellspacing='2' cellpadding='1'>";
		$sql1="select a.kode_brg,b.nama,a.jumlah,a.harga,a.jumlah*a.harga as total 
from fri_jual_d a 
left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' and a.kode_lokasi='$row->kode_lokasi'
 order by a.jenis,a.nu  ";
			$rs1 = $dbLib->execute($sql1);
			$j=1; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah="";
				if ($row1->jumlah!=0)
				{
					$jumlah=number_format($row1->jumlah,0,",",".");
				}
				echo "<tr><td align='center' class='isi_bukti'>$jumlah</td></tr>
        ";
			}
		echo "</table></td>";
        echo "<td height='400' valign='top'><table width='100%' border='0' cellspacing='2' cellpadding='1'>";
		$sql1="select a.kode_brg,b.nama,a.jumlah,a.harga,a.jumlah*a.harga as total 
from fri_jual_d a 
left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' and a.kode_lokasi='$row->kode_lokasi'
 order by a.jenis,a.nu  ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$harga="";
				if ($row1->harga!=0)
				{
					$harga=number_format($row1->harga,0,",",".");
				}
				
				echo "<tr><td align='right' class='isi_bukti'>$harga</td></tr>
        ";
			}
		echo "</table></td>";
        echo "<td height='400' valign='top'><table width='100%' border='0' cellspacing='2' cellpadding='1'>";
		$sql1="select a.kode_brg,b.nama,a.jumlah,a.harga,a.jumlah*a.harga as total 
from fri_jual_d a 
left join fri_barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' and a.kode_lokasi='$row->kode_lokasi'
 order by a.jenis,a.nu  ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$ntotal=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$total="";
				if ($row1->total!=0)
				{
					$total=number_format($row1->total,0,",",".");
				}
				$ntotal+=$row1->total;
				echo "<tr><td align='right' class='isi_bukti'>$total</td></tr>
        ";
			}
		echo "</table></td>";
        
      echo "</tr><tr>
        <td colspan='3' align='right' class='isi_bukti'>JUMLAH (I) </td>
        <td align='right' class='isi_bukti'>".number_format($ntotal,0,",",".")."</td>
        </tr>
		
      <tr>
        <td colspan='3' class='isi_bukti'>PERINCIAN ONGKOS / JASA (II) </td>
         <td align='center' class='isi_bukti'>JUMLAH</td>
        </tr>
      <tr>
	  <tr>
        <td colspan='3' height='30' class='isi_bukti'>$row->ket_jasa</td>
         <td align='right' class='isi_bukti'>".number_format($row->nilai_service,0,",",".")."</td>
        </tr>
      <tr>
        <td colspan='3' align='right' class='isi_bukti'>JUMLAH (II) </td>
        <td align='right' class='isi_bukti'>".number_format($row->nilai_service,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='2' rowspan='5' style='padding:5px'><table width='300' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr>
            <td ><table width='300' border='0' cellspacing='0' cellpadding='0'>
                <tr>
                  <td colspan='2' class='isi_laporan' class='isi_laporan2'>GARANSI : </td>
                </tr>
                <tr>
                  <td class='isi_laporan2'>1.</td>
                  <td class='isi_laporan2'> Instalasi = 6 Bulan </td>
                </tr>
                <tr>
                  <td class='isi_laporan2'>2.</td>
                  <td class='isi_laporan2'> Reparasi = 1 Bulan</td>
                </tr>
                <tr>
                  <td align='right' class='isi_laporan2'>*)</td>
                  <td class='isi_laporan2'> Untuk suku cadang yang diganti </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td class='isi_laporan2'>dengan menunjukan Nota ini </td>
                </tr>
            </table></td>
          </tr>
        </table></td>
       
      </tr>
	  
      <tr>
        <td align='right' class='isi_bukti'>JUMLAH (I+II)</td>
         <td align='right' class='isi_bukti'>".number_format($row->nilai+$row->nilai_service,0,",",".")."</td>
      </tr>
      <tr>
        <td align='right' class='isi_bukti'>Discount</td>
       <td align='right' class='isi_bukti'>".number_format($row->nilai_diskon,0,",",".")."</td>
      </tr>
      <tr>
        <td align='right' class='isi_bukti'>JUMLAH NETTO </td>
        <td align='right' class='isi_bukti'>".number_format($row->netto,0,",",".")."</td>
      </tr>
      <tr>
        <td align='right' class='isi_bukti'>PPN (10%) </td>
         <td align='right' class='isi_bukti'>".number_format($row->nilai_ppn,0,",",".")."</td>
      </tr>
    
	    <tr>
        <td colspan='3' align='right' class='isi_bukti'>NILAI FAKTUR</td>
        <td align='right' class='isi_bukti'>".number_format($row->total,0,",",".")."</td>
      </tr>
      <tr>
        <td colspan='4' height='30' class='isi_bukti'>TERBILANG : ".strtoupper($AddOnLib->terbilang($row->total))." </td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='508' class='isi_bukti'>Catatan : $row->catatan</td>
        <td width='282' align='center' class='isi_bukti'>".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='isi_bukti'><u>$row->nama_app</u></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='isi_bukti'>$row->jabatan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td  valign='center'><table width='800' border='0' cellspacing='2' cellpadding='1' class='kotak'>
      <tr>
        <td width='160' class='isi_laporan2'>Lembar 1 (Asli): Customer </td>
        <td width='200' class='isi_laporan2'>Lembar 2 (Merah ) : Adm. Penjualan</td>
        <td width='380' class='isi_laporan2'>Lembar 3 (Kuning) : Accounting</td>
      </tr>
    </table></td>
  </tr>
 
</table>";
echo "<DIV style='page-break-after:always'></DIV>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
