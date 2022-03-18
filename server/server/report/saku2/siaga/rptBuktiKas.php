<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptBuktiKas extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_spb)
from gr_spb_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi $this->filter ";
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
		$sql = "select a.no_spb,a.no_dokumen,a.kode_pp,substring(a.periode,1,4) as tahun,a.nilai,b.nama as nama_vendor,
       a.keterangan,c.nama as nama_buat,d.nama as nama_setuju,a.no_npko
from gr_spb_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_setuju=d.nik and a.kode_lokasi=d.kode_lokasi $this->filter order by a.no_spb ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo	"<table width='750' border='1' align='center' cellpadding='5' cellspacing='0' class='kotak'>
					  <tr>
					    <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					    <td width='88%'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					      <tr>
					        <td width='69%' align='right' class='istyle15'>Nomor : </td>
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>".$row->no_spb."</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>SURAT PERINTAH BAYAR </td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='19%' class='istyle15'>Kode Lokasi PP</td>
					        <td width='2%' class='istyle15'>:</td>
					        <td width='22%' class='istyle15' style='border:1px solid #111111;'>".$row->kode_pp."</td>
					        <td width='5%'>&nbsp;</td>
					        <td width='22%' class='istyle15'>Beban Anggaran tahun </td>
					        <td width='22%' class='istyle15' style='border:1px solid #111111;'>".$row->tahun."</td>
					        <td width='8%'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td colspan='3' class='istyle15'>Mohon dibayarkan uang</td>
					        </tr>
					      <tr>
					        <td width='16%' class='istyle15'>sebesar</td>
					        <td width='27%' class='istyle15' style='border:1px solid #111111;'>Rp ".number_format($row->nilai,0,",",".")."</td>
					        <td width='57%'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>terbilang</td>
					        <td class='istyle15' valign='top' colspan='2' style='border:1px solid #111111; background-color:#CCCCCC;'>".$AddOnLib->terbilang($row->nilai)."</td>
					        </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>kepada</td>
					        <td class='istyle15' valign='top' colspan='2' style='border:1px solid #111111;'>".$row->no_dokumen."</td>
					        </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>untuk pembayaran </td>
					        <td height='50' class='istyle15' colspan='2' valign='top' style='border:1px solid #111111;'>".$row->keterangan."</td>
					        </tr>
						  <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center'>Nomor Akun </td>
								  <td align='center'>Nama Akun </td>
					              <td align='center'>Anggaran Tahun ini </td>
					              <td align='center'>Anggaran Bulan ini </td>
					              <td align='center'>Sisa s/d saat ini </td>
					            </tr>";
				$i=1;
				$sql1="select a.kode_akun,b.nama,a.nilai,a.gar_tahun,a.gar_bulan,a.gar_sd
from gr_npko_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.no_npko='$row->no_npko' order by a.kode_akun ";
					
					$rs1 = $dbLib->execute($sql1);
				    while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
					echo "<tr>
					<td>$row1->kode_akun</td>
								   <td>$row1->nama</td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($row1->gar_tahun,0,",",".")."</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($row1->gar_bulan,0,",",".")."</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($row1->gar_sd,0,",",".")."</td>
					                </tr>
					              </table></td>
					            </tr>";
					}
					      
				echo "</table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='46%' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='2' align='center' class='istyle15'>PENGAJUAN</td>
					            </tr>
					          <tr>
					            <td width='50%' align='center' class='istyle15'>Dibuat oleh :</td>
					            <td width='50%' align='center' class='istyle15'>Disetujui oleh :</td>
					          </tr>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              
					              <tr>
					                <td align='center' class='istyle15'><em><u>Administration Staff</u></em></td>
					                </tr>
					            </table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><em><u>General Manager / Director </u></em></td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					        </table></td>
					        <td width='31%' align='center' valign='top'><table width='94%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='7'><table width='100%' border='0' cellspacing='1' cellpadding='2'>
					              <tr>
					                <td class='istyle15' colspan='3'>Dokumen Pendukung </td>
					                <td class='istyle15'>OK</td>
					                <td width='3%'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td colspan='5' height='5'></td>
					                </tr>
					              <tr>
					                <td class='istyle15'>1.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>2.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>3.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>4.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>5.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15' width='10%'>6.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td width='12%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td width='12%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
								  <tr>
					                <td colspan='5' height='5'></td>
					                </tr>
					            </table></td>
					            </tr>
					        </table></td>
					        <td width='23%' align='center' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td class='istyle15' align='center'>VERIFIKASI</td>
					          </tr>
					          <tr>
					            <td class='istyle15' align='center'>Anggaran</td>
					          </tr>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><em><u>Budget Analyst </u></em></td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					          <tr>
					            <td class='istyle15' align='center'>Keuangan</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='2' align='center' class='istyle15'>PEMBAYARAN</td>
					          </tr>
					          
					          <tr>
					            <td width='50%' rowspan='2' valign='top'><table width='100%' border='0' cellspacing='3' cellpadding='1'>
					              <tr>
					                <td colspan='2' height='5'></td>
					                </tr>
					              <tr>
					                <td width='17%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td width='83%' class='istyle15'>Kas</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td class='istyle15'>Bank</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td class='istyle15'>Nomor Akun Bank </td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td class='istyle15' style='border:1px solid #111111;' height='28'>&nbsp;</td>
					              </tr>
					            </table></td>
					            <td width='50%'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='71'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center' class='istyle15'><em><u>Treasury Manager </u></em></td>
					                </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					        </table></td>
					        <td valign='top' align='center'><table width='94%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='7'><table width='100%' height='96' border='0' cellpadding='1' cellspacing='1'>
					              <tr>
					                <td class='istyle15'>Catatan :</td>
					              </tr>
					              <tr>
					                <td height='105' valign='top' class='istyle15'>&nbsp;</td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='90'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center' class='istyle15'><em><u>Verification Staff </u></em></td>
					                </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					          
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					</table><br>";
		
		
		}
		echo "</div>";
		return "";
	}
}
?>