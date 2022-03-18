<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptFaktur extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ar)
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
";
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
		$lembar=$tmp[0];
		if ($lembar=="Lembar 1")
		{
			$ket1="Lembar ke 1 :";
			$ket2="untuk Pembeli BKP/Penerima JKP sebagai bukti Pajak Masukan";
		}
		if ($lembar=="Lembar 2")
		{
			$ket1="Lembar ke 2 :";
			$ket2="untuk Penjual BKP/Pemberi JKP sebagai bukti Pajak Keluaran";
		}
		if ($lembar=="Lembar 3")
		{
			$ket1="Lembar ke 3 :";
			$ket2="Ekstra Copy";
		}
		if ($lembar=="Lembar 4")
		{
			$ket1="Lembar ke 4 :";
			$ket2="Ekstra Copy";
		}
		$sql="select a.no_ar,a.no_dokumen,a.tanggal,a.keterangan,a.no_kontrak,a.nilai,substring(b.periode,1,4) as thn_kontrak,d.nama as nama_app,d.jabatan
	   ,c.nama as nama_cust,c.alamat,c.kota,c.npwp,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,datepart(year,a.tanggal) as tahun
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
left join karyawan d on a.nik_app=d.nik ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$terbilang=$AddOnLib->terbilang2($row->nilai);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='650' border='0' align='center' cellpadding='0' cellspacing='0'>
						  <tr>
						    <td align='right' class='istyle15'><table width='45%' border='0' cellspacing='2' cellpadding='2'>
						      <tr>
						        <td width='31%'>&nbsp;</td>
						        <td width='69%'>Lampiran I A </td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td>Peraturan Direktur Jenderal Pajak </td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td>Nomor : PER- 13 /PJ./2010</td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td>Tanggal : 24 Maret 2010</td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						      </tr><tr>
							        <td valign='top'>$ket1</td>
							        <td>$ket2</td>
							      </tr>
						    </table></td>
						  </tr>
						  <tr>
						    <td>&nbsp;</td>
						  </tr>
						  <tr>
						    <td class='istyle18' align='center'>FAKTUR PAJAK </td>
						  </tr>
						  <tr>
						    <td>&nbsp;</td>
						  </tr>
						  <tr>
						    <td class='istyle15'><table width='100%' border='1' cellspacing='1' cellpadding='1' class='kotak'>
						      <tr>
						        <td colspan='3' class='istyle15'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
                                  <tr>
                                    <td width='30%'>Kode dan Nomor Seri Faktur Pajak</td>
                                    <td width='4%' align='center'>:</td>
                                    <td width='66%'>010.000.08.00000004 </td>
                                  </tr>
                                </table></td>
						      </tr>
						      <tr>
						        <td colspan='3' class='istyle15'>Pengusaha Kena Pajak</td>
						      </tr>
						      <tr>
						        <td colspan='3' class='istyle15'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						          <tr>
						            <td width='30%'>Nama</td>
						            <td width='4%' align='center'>:</td>
						            <td width='66%'>PT. DAYAMITRA TELEKOMUNIKASI </td>
						          </tr>
						          <tr>
						            <td valign='top'>Alamat</td>
						            <td align='center' valign='top'>:</td>
						            <td>GEDUNG GRAHA PRATAMA LT 5 JL MT HARYONO KAV 15 JAKARTA</td>
						          </tr>
						          <tr>
						            <td>NPWP</td>
						            <td align='center'>:</td>
						            <td>01.071.244.6.051.000</td>
						          </tr>
						        </table></td>
						      </tr>
						      <tr>
						        <td colspan='3' class='istyle15'>Pembeli Barang Kena Pajak/Penerima Jasa Kena Pajak </td>
						      </tr>
						      <tr>
						        <td colspan='3' class='istyle15'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
                                  <tr>
                                    <td width='30%'>Nama</td>
                                    <td width='4%' align='center'>:</td>
                                    <td width='66%'>$row->nama_cust</td>
                                  </tr>
                                  <tr>
                                    <td valign='top'>Alamat</td>
                                    <td align='center' valign='top'>:</td>
                                    <td>$row->alamat</td>
                                  </tr>
                                  <tr>
                                    <td>NPWP</td>
                                    <td align='center'>:</td>
                                    <td>$row->npwp</td>
                                  </tr>
                                </table></td>
						      </tr>
						      <tr class='istyle15' align='center'>
						        <td width='6%'>No. Urut </td>
						        <td width='60%'>Nama Barang Kena Pajak/Jasa Kena Pajak </td>
						        <td width='34%'>Harga Jual/Penggantian/Uang Muka/Termin<br />
						          (Rp)</td>
						      </tr>
						      <tr height='260' valign='top'>
						        <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						          <tr>
						            <td class='istyle15' height='50'>&nbsp;</td>
						          </tr>
						          <tr>
						            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
									<tr class='istyle15'>
						                  <td height='7'></td>
						                </tr>
						            </table></td>
						          </tr>
						        </table></td>
						        <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						          <tr>
						            <td class='istyle15' height='50'>Sewa Supporting Facility CME/Sitac Shelter<br />
						              Sesuai Invoice Nomor : ".$row->no_dokumen." terlampir <br />
						              </td>
						          </tr>
						          <tr>
						            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
									$sql1="select a.no_site,b.nama as nama_site from dmt_bill_d a 
										inner join dmt_site b on a.no_site=b.no_site 
										where a.no_ar='$row->no_ar'
										group by a.no_site,b.nama 
										order by a.no_site";
									$rs1 = $dbLib->execute($sql1);
									while ($row1 = $rs1->FetchNextObject($toupper=false))
									{
									echo "<tr class='istyle15'>
						                  <td width='51%'>".$row1->nama_site."</td>
						                  <td width='49%'>".$row1->no_site."</td>
						                </tr>";
									}
								echo "<tr class='istyle15'>
						                  <td height='7' colspan='2'></td>
						                </tr>
						            </table></td>
						          </tr>
						        </table></td>
						        <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						          <tr>
						            <td class='istyle15' height='50'>&nbsp;</td>
						          </tr>
						          <tr>
						            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
									$sql1="select sum(a.nilai_ar) as nilai_ar from dmt_bill_d a 
										inner join dmt_site b on a.no_site=b.no_site 
										where a.no_ar='$row->no_ar'
										group by a.no_site
										order by a.no_site";
									
									$rs1 = $dbLib->execute($sql1);
									$nilai=0;
									while ($row1 = $rs1->FetchNextObject($toupper=false))
									{
										$nilai=$nilai+$row1->nilai_ar;
									echo "<tr class='istyle15'>
						                  <td align='right'>".number_format($row1->nilai_ar,0,",",".")."</td>
						                </tr>";
									}	
									$ppn=$nilai*0.1;
									echo "<tr class='istyle15'>
						                  <td height='7'></td>
						                </tr>
						            </table></td>
						          </tr>
						        </table></td>
						      </tr>
						      <tr class='istyle15'>
						        <td colspan='2'><strike>Harga Jual</strike>/Penggantian/<strike>Uang Muka/Termin</strike> *) </td>
						        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
						          <tr class='istyle15'>
						            <td align='right'>".number_format($nilai,0,",",".")."</td>
						            </tr>
						        </table></td>
						      </tr>
						      <tr>
						        <td colspan='2' class='istyle15'>Dikurangi Potongan Harga</td>
						        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
						          <tr class='istyle15'>
						            <td align='right'>&nbsp;</td>
						          </tr>
						        </table></td>
						      </tr>
						      <tr>
						        <td colspan='2' class='istyle15'>Dikurangi Uang Muka yang telah diterima </td>
						        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
						          <tr class='istyle15'>
						            <td align='right'>&nbsp;</td>
						          </tr>
						        </table></td>
						      </tr>
						      <tr>
						        <td colspan='2' class='istyle15'>Dasar Pengenaan Pajak </td>
						        <td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
						          <tr class='istyle15'>
						            <td align='right'>".number_format($nilai,0,",",".")."</td>
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
						            <td width='4%' height='40'>&nbsp;</td>
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
						                <td>Jakarta, $row->tgl $bulan $row->tahun </td>
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
						                <td class='istyle18'><u>".strtoupper($row->nama_app)."</u></td>
						              </tr>
						              <tr>
						                <td>".strtoupper($row->jabatan)."</td>
						              </tr>
						            </table></td>
						          </tr>
						          
						        </table></td>
						      </tr>
						    </table></td>
						  </tr>
						  <tr><td>*) Coret yang tidak perlu</td></tr>
						</table>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
