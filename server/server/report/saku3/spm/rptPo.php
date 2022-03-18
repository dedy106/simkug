<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spm_rptPo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$sql="select a.no_po,a.pp_pesan,a.kode_lokasi,a.keterangan,a.tanggal,a.keterangan,a.no_pesan,
    a.kode_vendor,b.nama as vendor,d.nama as lokasi,b.alamat,b.no_tel,b.pic,
  b.email,d.alamat as almt,d.no_telp
from log_po_m a
inner join vendor b on a.kode_lokasi=b.kode_lokasi and a.kode_vendor=b.kode_vendor
inner join lokasi d on a.kode_lokasi=d.kode_lokasi $this->filter";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/spm.jpg";
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='609' align='center' class='istyle17' valign='bottom'>PURCHASE ORDER </td>
      </tr>
      
    </table></td>
  </tr>
  <tr><td height='30'>&nbsp;</td></tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
    <tr>
    <td width='181' rowspan='2'><img src='$logo' width='251' height='100'></td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='200' class='istyle15'  ><b>PT. SANDHY PUTRA MAKMUR</b></td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'>Area &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: $row->pp_pesan </td>
      </tr>
      <tr>
        <td width='200' class='istyle15'  >TELKOM BUILDING JL. SISINGAMANGARAJA KAV 4 - 6 KEBAYORAN BARU </td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'>Project &nbsp;: $row->keterangan</td>
      </tr>
      <tr>
        <td class='istyle15'  >Jakarta Selatan</td>
      </tr>
      <tr>
        <td class='istyle15'  >Phone: (62-21) 7257368</td>
      </tr>
      <tr>
        <td class='istyle15'   valign='top'>Fax: (62-21) 7257383 </td>
      </tr>
      <tr>
      <td>&nbsp;</td>
    </tr>
    <tr>
    <td width='612' class='istyle15'  >Tanggal Order &nbsp;: $row->tanggal</td>
</tr>
<tr>
    <td width='612' class='istyle15'  >Nomor Order &nbsp;&nbsp;&nbsp;: $row->no_pesan</td>
</tr>

<tr>
<td>&nbsp;</td>
</tr>
<tr>
        <td width='200' class='istyle15'  >$row->vendor</td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'> $row->lokasi </td>
      </tr>
      <tr>
        <td width='200' class='istyle15'  >$row->pic </td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'> $row->almt </td>
      </tr>
      <tr>
        <td width='200' class='istyle15'  >$row->alamat</td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'> $row->no_telp </td>
      </tr>
      <tr>
        <td width='200' class='istyle15'  >$row->no_tel </td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'>&nbsp;</td>
      </tr>
      <tr>
        <td width='200' class='istyle15'  >$row->email</td>
        <td width='200' class='istyle15'>&nbsp; </td>
        <td width='300' class='istyle15'>&nbsp;</td>
      </tr>
     
    </table></td>
  </tr>
  
  <tr><td height='50'>&nbsp;</td></tr>
 
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='istyle15' height='25'><div align='center'>No</div></td>
				<td width='90' class='istyle15'><div align='center'>DESIGNATOR</div></td>
				<td width='150' class='istyle15'><div align='center'>DESCRIPTION </div></td>
				<td width='90' class='istyle15'><div align='center'>UNIT </div></td>
				<td width='40' class='istyle15'><div align='center'>PO </div></td>
				<td width='100' class='istyle15'><div align='center'>UNIT PRICE * </div></td>
				<td width='90' class='istyle15'><div align='center'>TOTAL PRICE</div></td>
				<td width='200' class='istyle15'><div align='center'>KETERANGAN</div></td>
			  </tr>";
	  $sql1="select a.no_pesan,a.item,a.kode_lokasi,a.tipe,a.jumlah,a.harga,b.keterangan,a.jumlah*a.harga as total
    from log_po_d a
    inner join log_po_m b on a.kode_lokasi=b.kode_lokasi and a.no_po=b.no_po
			where a.no_po='$row->no_po' and a.kode_lokasi='$row->kode_lokasi'
      order by a.no_pesan ";
      
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$harga=number_format($row1->harga,0,',','.');
			$total=number_format($row1->total,0,',','.');
			$sub_total=$total+$row1->total;
      $pph=$sub_total*10/100;
      $jml=$sub_total+$pph;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->no_pesan</td>
				<td class='isi_laporan'>$row1->item</td>
				<td class='isi_laporan'>$row1->tipe</td>
				<td class='isi_laporan' align='center'>$row1->jumlah</td>
        <td class='isi_laporan' align='right'>$harga</td>
        <td class='isi_laporan' align='right'>$total</td>
        <td class='isi_laporan'>$row1->keterangan</td>

			  </tr>";
				$i=$i+1;
		}
		
	echo"</table></td>
  </tr>
  <tr>
    <td align='left'><table width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
      <td width='160' class='istyle15'  >&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; Sub Total</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($sub_total,2,",",".")." </td>
      </tr>
      <tr>
      <td width='350' class='istyle15'  >Note :    Pembayaran  DP 30 % pelunasan  45 hari </td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; PPN 10%</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($pph,2,",",".")." </td>
      </tr>
      <tr>
      <td width='160' class='istyle15'  >&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15'>&nbsp;</td>
      <td width='160' class='istyle15' ><b>&nbsp; Total</b></td>
      <td width='160' class='istyle15'>&nbsp;Rp. ".number_format($jml,2,",",".")." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
        <td height='25' colspan='1' align='center' bgcolor='#CCCCCC'><b>Terbilang : ".$AddOnLib->terbilang($jml)."</b></td>
      </tr>
      <tr>
    <td>Catatan : Harga  franco  Jakarta </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>&nbsp; </td>
        <td width='200' align='center'>&nbsp; </td>
        <td width='200' align='center'>&nbsp; </td>
        <td width='200'  align='center'>Cianjur, $row->tanggal </td>
      </tr>
      <tr>
      <td width='200' align='center'>Diterima/Disetujui</td>
      <td width='200' align='center'>&nbsp; </td>
      <td width='200' align='center'>&nbsp; </td>
        <td align='center' >Dipesan Oleh : </td>
        </tr>
        <tr>
      <td width='200' align='center'><b> $row->vendor</b></td>
      <td width='200' align='center'>&nbsp; </td>
      <td width='200' align='center'>&nbsp; </td>
        <td align='center' ><b> $row->lokasi</b></td>
        </tr>
        <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
        <tr>
        <td width='200' class='header_laporan' align='center'> --------------------</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td width='200' class='header_laporan' align='center'> ------------------- </td>
        </tr>
        <tr>
        <td >&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
</table>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
