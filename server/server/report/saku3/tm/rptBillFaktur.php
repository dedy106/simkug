<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tm_rptBillFaktur extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql = "select 1 ";
		
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
		$html="";
		for ($j = 1; $j <= 3; $j++) {
		$sql = "select a.no_bill,b.nama,b.alamat+' '+b.kota as alamat,b.npwp,b.tgl_pkp,c.nama as nama_app,c.jabatan,
       d.nama as nama_cust,d.alamat2 alamat_cust,d.npwp as npwp_cust,a.nilai,
       a.no_faktur,a.tanggal
from bill_m a
inner join lokasi b on a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join cust2 d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi ".$this->filter;
		
		$invc=$dbLib->execute($sql);
		$rs = $invc->FetchNextObject($toupper=false);
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
		echo "<table width='650' border='0' align='center' cellpadding='0' cellspacing='0'>
				  <tr>
				    <td align='right' class='istyle15'><table width='45%' border='0' cellspacing='2' cellpadding='2'>
				      ";
				if ($j==1){
				    echo "<tr>
				        <td>Lembar ke 1 : </td>
				        <td>Untuk Pembeli BKP/Penerima JKP </td>
				      </tr>
					  <tr>
				        <td>&nbsp;</td>
				        <td>sebagai bukti Pajak Masukan </td>
				      </tr>";
					  
				}
				if ($j==2){
					echo "<tr>
				        <td>Lembar ke 2 : </td>
				        <td>Untuk Penjual BKP/Pemberi JKP </td>
				      </tr>
					  <tr>
				        <td>&nbsp;</td>
				        <td>sebagai bukti Pajak Keluaran </td>
				      </tr>";
				}
				if ($j==3){
					echo "<tr>
				        <td>Lembar ke 3 : </td>
				        <td>Untuk Kantor Pelayanan Pajak</td>
				      </tr>
					  <tr>
				        <td>&nbsp;</td>
				        <td>&nbsp; </td>
				      </tr>";
				}
				echo "</table></td>
				  </tr>
				  <tr>
				    <td>&nbsp;</td>
				  </tr>
				  <tr>
				    <td class='istyle18' align='center'>FAKTUR PAJAK</td>
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
				            <td width='9%'></td>
				            <td width='32%'></td>
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
						$sql1="select keterangan,nilai from bill_m where no_bill='$rs->no_bill' ";
						$data=$dbLib->execute($sql1);
						$i=1;
						while ($kon = $data->FetchNextObject($toupper=false))
						{
							if ($kon->nilai>0)
							{
								echo "<tr class='istyle15'><td align='center' valign='top'>$i</td></tr>";
								$i=$i+1;
							}
						}
						echo "</table></td>
				          </tr>
				        </table></td>
				        <td height='300' valign='top'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				         
				          <tr>
				            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data=$dbLib->execute($sql1);
						while ($kon = $data->FetchNextObject($toupper=false))
						{
							echo "<tr class='istyle15'><td width='100%'>".$kon->keterangan."</td>               
				                </tr>";
						}
						echo "</table></td>
				          </tr>
				        </table></td>
				        <td height='300' valign='top'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
				         
				          <tr>
				            <td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data2=$dbLib->execute($sql1);
						$tot=0;
						while ($kon2 = $data2->FetchNextObject($toupper=false))
						{
							echo "<tr class='istyle15'>
				                  <td align='right'>";
							if ($kon2->nilai > 0)
							{ echo number_format($kon2->nilai,0,",",".");}
							else
							{ $html.=""; }
							echo "</td></tr>";
							$tot+=$kon2->nilai;
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
						if ($rs->status=="Termijn")
						{
							$hj="<strike>Harga Jual/Penggantian/Uang Muka/</strike>Termin ";
						}
						if ($rs->status=="Harga Jual/Penggantian")
						{
							$hj="Harga Jual/Penggantian<strike>/Uang Muka/Termin</strike> ";
						}
						
						echo "<tr class='istyle15'>
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
				                <td class='istyle18'>".strtoupper($rs->nama_app)."</td>
				              </tr>
				              <tr>
				                <td class='istyle18'>".strtoupper($rs->jabatan)."</td>
				              </tr>
				            </table></td>
				          </tr>
				          
				        </table></td>
				      </tr>
				    </table></td>
				  </tr>
				  <tr><td align='left'>* Coret yang tidak perlu</td></tr>
				</table>
				<br>
				<DIV style='page-break-after:always'></DIV>";
		}
		return "";
	}
	
}
?>
  
