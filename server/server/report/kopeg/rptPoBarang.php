<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptPoBarang
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		$filter=explode("//",$this->filter);
		$sql = "select count(*)
from kop_pbrg_m a
inner join kop_jual_d b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
inner join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
inner join kop_agg d on a.kode_agg=d.kode_agg and a.kode_lokasi=d.kode_lokasi
inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi
cross join (select nik,upper(nama) as gm 
            from karyawan 
            where kode_lokasi='".$filter[1]."' and jabatan='General Manager'
           )f ".$filter[0];
		//.$this->filter;
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
	    $AddOnLib=new server_util_AddOnLib();
		$filter=explode("//",$this->filter);
		$sql = "select a.no_pbrg,date_format(a.tanggal,'%d/%m/%Y') as tanggal,c.nama as vendor,c.pic,c.no_fax,a.kode_agg,d.nama,d.kode_loker,e.nama as nama_loker,d.alamat,
       d.no_telp,a.keterangan,f.gm, c.kode_vendor
from kop_pbrg_m a
inner join kop_jual_d b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi
inner join vendor c on b.kode_vendor=c.kode_vendor and b.kode_lokasi=c.kode_lokasi
inner join kop_agg d on a.kode_agg=d.kode_agg and a.kode_lokasi=d.kode_lokasi
inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi
cross join (select nik,upper(nama) as gm 
            from karyawan 
            where kode_lokasi='".$filter[1]."' and jabatan='General Manager'
           )f ".$filter[0];
		   		
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$vendor = "";
		$no_pbrg = "";
		while ($rs = $rs1->FetchNextObject($toupper=false))
		{
			if ($no_pbrg != $rs->no_pbrg){
				$no_pbrg = $rs->no_pbrg;
				$vendor = "";
			}
			if ($vendor != $rs->vendor){
				if ($vendor != ""){
					$html .= "<br><br><br><br><br><br><br>";
				}
				$vendor = $rs->vendor;				
			}
			$sql2="select b.kode_klpbrg,c.nama as nama_jenis,b.kode_brg,b.nama as nama_brg,a.jumlah,a.harga_kont, a.kode_vendor
				from kop_jual_d a 
				inner join kop_brg b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
				inner join kop_brg_klp c on b.kode_klpbrg=c.kode_klpbrg and a.kode_lokasi=c.kode_lokasi
				inner join kop_pbrg_m d on a.no_jual=d.no_jual and a.kode_lokasi=d.kode_lokasi
				where d.no_pbrg='$rs->no_pbrg'";		
			$j=1;$jum=0;$total=0;
			$rs2 = $dbLib->execute($sql2);
			$htmlD = "";//Untuk menghitung jumlah record. jika beda vendor maka keterangan diubah.
			$keterangan = "";
			$bedaVendor = false;
			$first = true;
			while ($row2 = $rs2->FetchNextObject($toupper=false))
			{
				 if ($row2->kode_vendor == $rs->kode_vendor){
					$jum=$jum+$row2->jumlah;
					$total=$total+$row2->harga_kont;
					$harga=number_format($row2->harga_kont,0,",",".");
					$htmlD.="<tr>
						<td align='center' height='20'>$j</td>
						<td style='padding:3px;'>$row2->kode_klpbrg - $row2->nama_jenis</td>
						<td style='padding:3px;'>$row2->kode_brg - $row2->nama_brg</td>
						<td style='padding:3px;' align='center'>$row2->jumlah</td>
						<td align='right' style='padding:3px;'>$harga</td>
					  </tr>";
					if (!$first) $keterangan .= ",";
					$keterangan .= $row2->nama_brg;
					$j=$j+1;
					$first = false;
				}else $bedaVendor = true;
			}
			if (!$bedaVendor){
				$keterangan = $rs->keterangan;
			}
			$i = $start+1;
			$tanggal=$AddOnLib->ubah_tanggal($rs->tanggal);
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";
			$html="<br />";
			$html.=	"<table width='700' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
						<td class='isi_bukti'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
						  <tr>
							<td width='124' rowspan='3' align='center'><img src=$pathfoto width='80' height='99' /></td>
							<td width='666' align='center' class='judul_bukti'>KOPERASI PEGAWAI PT. TELKOM KANTOR PERUSAHAAN</td>
						  </tr>
						  <tr>
							<td align='center'><b>Jl. Sentot Alibasha No. 4 Telp. (022) 720511 Fax 7104676 Bandung 40133 </b></td>
						  </tr>
						  <tr>
							<td height='50' align='right' valign='bottom'><b>BADAN HUKUM No. 8 026/BH - DK - 10/1. TANGGAL 7 JUNI 1994 </b></td>
						  </tr>
						</table></td>
					  </tr>
					  <tr>
						<td><table width='800' border='0' cellspacing='2' cellpadding='1'>
						  <tr>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
							  <tr>
								<td width='363' rowspan='4' valign='top'><b>KONTRAK NO : $rs->no_pbrg</b></td>
								<td width='72'>Kepada</td>
								<td width='345'>&nbsp;</td>
							  </tr>
							  <tr>
								<td>Yth.</td>
								<td>$rs->vendor</td>
							  </tr>
							  <tr>
								<td>U/p</td>
								<td>$rs->pic</td>
							  </tr>
							 <tr>
								<td>No Fax</td>
								<td>$rs->no_fax</td>
							  </tr>
							</table></td>
						  </tr>
						  <tr>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
							  <tr>
								<td colspan='2' height='30'>Perihal : Nota Pengambilan Barang </td>
								</tr>
							  <tr>
								<td width='152'>Dengan Hormat, </td>
								<td width='638'>&nbsp;</td>
							  </tr>
							  <tr>
								<td colspan='2' height='30' valign='top'>Harap diserahkan barang tersebut di bawah ini : </td>
								</tr>
							  <tr>
								<td>Nama / NIK </td>
								<td>: $rs->nama / $rs->kode_agg</td>
							  </tr>
							  <tr>
								<td>Divisi / Bagian</td>
								<td>: $rs->kode_loker / $rs->nama_loker</td>
							  </tr>
							  <tr>
								<td>Telp. Kantor </td>
								<td>: $rs->no_telp</td>
							  </tr>
							  <tr>
								<td>Alamat Rumah </td>
								<td>: $rs->alamat</td>
							  </tr>
							  <tr>
								<td>Keterangan</td>
								<td>: $keterangan</td>
							  </tr>
							</table></td>
						  </tr>
						</table></td>
					  </tr>
					  <tr>
						<td align='center' valign='middle' style='padding:10px;'><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						  <tr bgcolor='#CCCCCC'>
							<td width='34' align='center' height='23'>No</td>
							<td width='186' align='center'>Jenis Barang </td>
							<td width='327' align='center'>Barang</td>
							<td width='73' align='center'>Jumlah</td>
							<td width='158' align='center'>Harga</td>
						  </tr>";
	   
		$html .= $htmlD;//dipindah keatas.
		
		$jum1=number_format($jum,0,",",".");
		$total2=number_format($total,0,",",".");
		$total1=$AddOnLib->terbilang($total);
	  $html.="<tr>
        <td colspan='3' align='right' height='20'>Total&nbsp;</td>
        <td style='padding:3px;' align='center'>$jum1</td>
        <td align='right' style='padding:3px;'>$total2</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='20' style='padding:10px;'><b>Terbilang : $total1</b></td>
  </tr>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='284' height='50'>&nbsp;</td>
        <td width='200'>&nbsp;</td>
        <td width='302' align='center' valign='bottom'>Bandung, $tanggal </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center' height='30' valign='bottom'>General Manager</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td height='50' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td align='center' height='50'><u>$rs->gm</u></td>
      </tr>
      <tr>
        <td align='center'>Yang Menerima Barang </td>
        <td>&nbsp;</td>
        <td align='center'>Yang Menyerahkan Barang </td>
      </tr>
      <tr>
        <td align='center'>ttd</td>
        <td>&nbsp;</td>
        <td align='center' height='50'>ttd&amp; cap toko </td>
      </tr>
      <tr>
        <td align='center' valign='center'>(..............................................................)</td>
        <td>&nbsp;</td>
        <td height='50' align='center' valign='center'>(..............................................................)</td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
";
		}		
		$html .= "<br />";
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
