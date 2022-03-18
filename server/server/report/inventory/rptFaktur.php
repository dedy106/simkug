<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptFaktur
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
		
		$sql = "select count(*) from inv_invoice_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi
inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi ".$this->filter;
		$rs = $dbLib->execute($sql);
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$html="";
		for ($j = 1; $j <= 2; $j++) {
		$sql = "select b.nama,'Harga Jual' as status,concat(b.alamat,' ',b.kota,' ',b.kodepos) as alamat,b.npwp,b.tgl_pkp,c.nama as nama_app,c.jabatan,
       d.nama as nama_cust,d.alamat2 alamat_cust,d.npwp as npwp_cust,a.nilai_diskon,a.nilai_um,
       a.no_faktur,a.tanggal
from inv_invoice_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_user=c.nik and a.kode_lokasi=c.kode_lokasi
inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi ".$this->filter;
		$invc=$dbLib->execute($sql);
		$rs = $invc->FetchNextObject($toupper=false);
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		if ($rs->nilai_diskon >0) 
		{
			$diskon=number_format($rs->nilai_diskon,0,",",".");
		}
		if ($rs->nilai_um >0) 
		{
			$um=number_format($rs->nilai_um,0,",",".");
		}
		$html.= "<table width='650' border='0' align='center' cellpadding='0' cellspacing='0'>
				  <tr>
				    <td align='right' class='istyle15'><table width='45%' border='0' cellspacing='2' cellpadding='2'>
				      ";
				if ($j==1){
				    $html.="<tr>
				        <td>Lembar ke 1 : </td>
				        <td>Untuk Pembeli BKP/Penerima JKP </td>
				      </tr>
					  <tr>
				        <td>&nbsp;</td>
				        <td>sebagai bukti Pajak Masukan </td>
				      </tr>";
					  
				}else{
					$html.="<tr>
				        <td>Lembar ke 2 : </td>
				        <td>Untuk Penjual BKP/Pemberi JKP </td>
				      </tr>
					  <tr>
				        <td>&nbsp;</td>
				        <td>sebagai bukti Pajak Keluaran </td>
				      </tr>";
				}
				$html.="</table></td>
				  </tr>
				  <tr>
				    <td>&nbsp;</td>
				  </tr>
				  <tr>
				    <td class='istyle18' align='center'>FAKTUR PAJAK STANDAR</td>
				  </tr>
				  <tr>
				    <td>&nbsp;</td>
				  </tr>
				  <tr>
				    <td class='istyle15'><table width='100%' border='1' cellspacing='1' cellpadding='1' class='kotak'>
				      <tr>
				        <td colspan='3' class='istyle15'>Kode dan Nomor Seri Faktur Pajak : $rs->no_faktur </td>
				      </tr>
				      <tr>
				        <td colspan='3' class='istyle15'>Pengusaha Kena Pajak</td>
				      </tr>
				      <tr>
				        <td colspan='3' class='istyle15'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				          <tr>
				            <td width='27%'>Nama</td>
				            <td width='4%' align='center'>:</td>
				            <td width='69%'>$rs->nama</td>
				          </tr>
				          <tr>
				            <td valign='top'>Alamat</td>
				            <td align='center' valign='top'>:</td>
				            <td>$rs->alamat</td>
				          </tr>
				          <tr>
				            <td>NPWP</td>
				            <td align='center'>:</td>
				            <td>$rs->npwp</td>
				          </tr>
				          <tr>
				            <td>Tanggal Pengukuhan PKP </td>
				            <td align='center'>:</td>
				            <td>".substr($rs->tgl_pkp,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tgl_pkp),0,6))."</td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr>
				        <td colspan='3' class='istyle15'>Pembeli Barang Kena Pajak/Penerima Jasa Kena Pajak </td>
				      </tr>
				      <tr>
				        <td colspan='3' class='istyle15'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				          <tr>
				            <td width='27%'>Nama</td>
				            <td width='4%' align='center'>:</td>
				            <td colspan='3'>$rs->nama_cust</td>
				          </tr>
				          <tr>
				            <td valign='top'>Alamat</td>
				            <td align='center' valign='top'>:</td>
				            <td colspan='3'>$rs->alamat_cust</td>
				          </tr>
				          <tr>
				            <td>NPWP</td>
				            <td align='center'>:</td>
				            <td width='28%'>$rs->npwp_cust</td>
				            <td width='9%'>NPPKP : </td>
				            <td width='32%'>$rs->npwp_cust</td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr class='istyle15' align='center'>
				        <td width='6%'>No. Urut </td>
				        <td width='60%'>Nama Barang Kena Pajak/Jasa Kena Pajak </td>
				        <td width='34%'>Harga Jual/Penggantian/Uang Muka/Termin<br />
				          (Rp)</td>
				      </tr>
				      <tr>
				        <td ><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				          
				          <tr>
				            <td height='300' valign='top'><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
							$sql1="select concat(e.nama,' ',d.jumlah,' ',d.satuan) as keterangan,d.jumlah*d.harga as subtot
								from inv_invoice_m a inner join inv_invoice_d b on a.no_inv=b.no_inv and a.kode_lokasi=b.kode_lokasi
								inner join inv_sj_d d on b.no_sj=d.no_sj and b.kode_lokasi=d.kode_lokasi
								inner join inv_brg e on d.kode_barang=e.kode_brg and d.kode_lokasi=e.kode_lokasi 
								where a.no_faktur='$rs->no_faktur' ";
						$data=$dbLib->execute($sql1);
						$i=1;
						while ($kon = $data->FetchNextObject($toupper=false))
						{
							if ($kon->subtot>0)
							{
								$html.="<tr class='istyle15'><td align='center' valign='top'>$i</td></tr>";
								$i=$i+1;
							}
						}
						$html.="</table></td>
				          </tr>
				        </table></td>
				        <td height='300' valign='top'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				         
				          <tr>
				            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data=$dbLib->execute($sql1);
						while ($kon = $data->FetchNextObject($toupper=false))
						{
							$html.="<tr class='istyle15'><td width='100%'>".$kon->keterangan."</td>               
				                </tr>";
						}
						$html.= "</table></td>
				          </tr>
				        </table></td>
				        <td height='300' valign='top'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				         
				          <tr>
				            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data2=$dbLib->execute($sql1);
						$tot=0;
						while ($kon2 = $data2->FetchNextObject($toupper=false))
						{
							$html.="<tr class='istyle15'>
				                  <td align='right'>";
							if ($kon2->subtot > 0)
							{ $html.=number_format($kon2->subtot,0,",",".");}
							else
							{ $html.=""; }
							$html.="</td></tr>";
							$tot+=$kon2->subtot;
						}
						
						$tot1=$tot-$rs->nilai_diskon-$rs->nilai_um;
						$ppn=(0.1*$tot1);
						$tot2=$tot1-$ppn;
						if ($rs->status=="Harga Jual")
						{
							$hj="Harga Jual/<strike>Penggantian/Uang Muka/Termin</strike>";
						}
						if ($rs->status=="Penggantian")
						{
							$hj="<strike>Harga Jual/</strike>Penggantian<strike>/Uang Muka/Termin</strike>";
						}
						if ($rs->status=="Uang Muka")
						{
							$hj="<strike>Harga Jual/Penggantian/</strike>Uang Muka<strike>/Termin</strike>";
						}
						if ($rs->status=="Termin")
						{
							$hj="<strike>Harga Jual/Penggantian/Uang Muka/</strike>Termin ";
						}
						if ($rs->status=="Harga Jual/Penggantian")
						{
							$hj="Harga Jual/Penggantian<strike>/Uang Muka/Termin</strike> ";
						}
						
						$html.= "<tr class='istyle15'>
				                  <td height='7'></td>
				                </tr>
				            </table></td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr class='istyle15'>
				        <td colspan='2'>$hj *) </td>
				        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
				          <tr class='istyle15'>
				            <td align='right'>".number_format($tot,0,",",".")."</td>
				            </tr>
				        </table></td>
				      </tr>
				      <tr>
				        <td colspan='2' class='istyle15'>Dikurangi Potongan Harga</td>
				        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
				          <tr class='istyle15'>
				            <td align='right'>$diskon</td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr>
				        <td colspan='2' class='istyle15'>Dikurangi Uang Muka yang telah diterima </td>
				        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
				          <tr class='istyle15'>
				            <td align='right'>$um</td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr>
				        <td colspan='2' class='istyle15'>Dasar Pengenaan Pajak </td>
				        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
				          <tr class='istyle15'>
				            <td align='right'>".number_format($tot1,0,",",".")."</td>
				          </tr>
				        </table></td>
				      </tr>
				      <tr>
				        <td colspan='2' class='istyle15'>PPN = 10% x Dasar Pengenaan Pajak </td>
				        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
				          <tr class='istyle15'>
				            <td align='right'>".number_format($ppn,0,",",".")."</td>
				          </tr>
				        </table></td>
				      </tr>

				      <tr>
				        <td colspan='3'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				          <tr>
				            <td width='4%' height='50'>&nbsp;</td>
				            <td width='62%'>Pajak Penjual Atas Barang Mewah</td>
				            <td width='34%'>&nbsp;</td>
				          </tr>
				          <tr>
				            <td height='141'>&nbsp;</td>
				            <td valign='top'><table width='80%' border='1' cellspacing='1' cellpadding='1' class='kotak'>
				              <tr>
				                <td width='30%'>Tarif</td>
				                <td width='30%'>DPP</td>
				                <td width='40%'>PPnBM</td>
				              </tr>
				              <tr>
				                <td>.........................%</td>
				                <td>Rp.........................</td>
				                <td>Rp............................</td>
				              </tr>
				              <tr>
				                <td>.........................%</td>
				                <td>Rp.........................</td>
				                <td>Rp............................</td>
				              </tr>
				              <tr>
				                <td>.........................%</td>
				                <td>Rp.........................</td>
				                <td>Rp............................</td>
				              </tr>
				              <tr>
				                <td>.........................%</td>
				                <td>Rp.........................</td>
				                <td>Rp............................</td>
				              </tr>
				              <tr>
				                <td colspan='2'>Jumlah</td>
				                <td>Rp............................</td>
				              </tr>
				            </table></td>
				            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				              <tr>
				                <td>&nbsp;</td>
				              </tr>
				              <tr>
				                <td>Bandung, ".substr($rs->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tanggal),0,6))." </td>
				              </tr>
				              <tr>
				                <td>&nbsp;</td>
				              </tr>
				              <tr>
				                <td>&nbsp;</td>
				              </tr>
				              <tr>
				                <td>&nbsp;</td>
				              </tr>
				              <tr>
				                <td class='istyle18'><u>".strtoupper($rs->nama_app)."</u></td>
				              </tr>
				              <tr>
				                <td>".strtoupper($rs->jabatan)."</td>
				              </tr>
				            </table></td>
				          </tr>
				          
				        </table></td>
				      </tr>
				    </table></td>
				  </tr>
				</table><br>";
		}
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
