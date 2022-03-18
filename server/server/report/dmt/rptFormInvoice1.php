<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptFormInvoice1 extends server_report_basic
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
inner join cust c on b.kode_cust=c.kode_cust $this->filter ";
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
		$nama_ver=$tmp[0];
		$sql="select a.no_ar,a.tanggal,a.keterangan,a.no_kontrak,a.nilai,substring(b.periode,1,4) as thn_kontrak,a.due_date,d.nama as nama_app,d.jabatan
	   ,c.nama as nama_cust,c.alamat,c.kota,c.kode_pos,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,datepart(year,a.tanggal) as tahun
	   ,datepart(day,a.due_date) as tgl2,datepart(month,a.due_date) as bulan2,datepart(year,a.due_date) as tahun2
from dmt_ar_m a
inner join dmt_kontrak_m b on a.no_kontrak=b.no_kontrak
inner join cust c on b.kode_cust=c.kode_cust
left join karyawan d on a.nik_app=d.nik $this->filter ";
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
			$bulan2=$AddOnLib->ubah_bulan($row->bulan2);
			echo "<table width='750' border='0' align='center' cellpadding='1' cellspacing='0'>
					  <tr>
					    <td width='293'>&nbsp;</td>
					    <td width='231'>&nbsp;</td>
					    <td width='220' align='center' class='nstyle16'>INVOICE / FAKTUR </td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td align='right' class='istyle18'>No. : </td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>INV. ".$row->no_ar."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td align='right' class='istyle18'>Date : </td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>$row->tgl $bulan $row->tahun</td>
					  </tr>
					  <tr>
					    <td class='istyle18'>To / Kepada Yth :</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>".$row->nama_cust."</td>
					    <td>&nbsp;</td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-bottom:1px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>CONTRACT REF / NO. KONTRAK </td>
					  </tr>
					  <tr>
					    <td align='center' class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;'>".$row->alamat." <br />".$row->kota." ".$row->kode_pos."</td>
					    <td>&nbsp;</td>
					    <td align='center' class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;'>PERJANJIAN INDUK <br />No. : ".$row->no_kontrak." <br /> Tahun ".$row->thn_kontrak."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='2' cellspacing='0' cellpadding='1' style='border:2px solid #111111; border-collapse:collapse'>
					      <tr>
					        <td width='6%' class='istyle18' align='center'>NO<br />NO</td>
					        <td width='72%' class='istyle18' align='center'>DESCRIPTION<br />
					          URAIAN</td>
					        <td width='22%' class='istyle18' align='center'>AMOUNT<br />
					          JUMLAH </td>
					      </tr>";
					      $sql1="select a.no_site,b.nama as nama_site,b.alamat,a.nilai_ar,a.periode_awal,a.periode_akhir
								from (select a.no_site,sum(a.nilai_ar) as nilai_ar,min(periode) as periode_awal,max(periode) as periode_akhir
									  from dmt_bill_d a
									  inner join dmt_site b on a.no_site=b.no_site
									  where no_ar='$row->no_ar'
									  group by a.no_site
									  )a
								inner join dmt_site b on a.no_site=b.no_site ";

							$rs1 = $dbLib->execute($sql1);
							$j=1;
							$nilai_ar=0;
							$ppn=0;
							while ($row1 = $rs1->FetchNextObject($toupper=false))
							{
								$nilai_ar=$nilai_ar+$row1->nilai_ar;
						  echo "<tr valign='top'>
					        <td height='122'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>$j</td>
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
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
							<tr>
					            <td class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Biaya Sewa Tower / Menara Site <strong>".$row1->nama_site."</strong></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Nomor Site : ".$row1->no_site."</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Alamat Site : ".$row1->alamat."</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Periode Sewa : ".$row1->periode_awal." s/d ".$row1->periode_akhir." </td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					       </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td width='15%' class='istyle18'>Rp.</td>
					            <td width='85%' class='istyle18' align='right'>".number_format($row1->nilai_ar,0,",",".")."</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>";
							$j=$j+1;
						  }
						  $ppn=$nilai_ar*0.1;
						  $tot=$ppn+$nilai_ar;
					      echo "<tr style='border-left:0px solid'>
					        <td colspan='2' rowspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td width='7%'>&nbsp;</td>
					            <td width='75%' rowspan='3' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					              <tr>
					                <td class='istyle18'>Terbilang : </td>
					              </tr>
					              <tr>
					                <td class='istyle18'># $terbilang # </td>
					              </tr>
					            </table></td>
					            <td width='18%' class='istyle18'>SUB TOTAL</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td class='istyle18'>PPN 10%</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td class='istyle18'>TOTAL</td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($nilai_ar,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($ppn,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($tot,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td width='6%'>&nbsp;</td>
					        <td width='94%' class='istyle18'>Remittance to / Pembayaran ke : </td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>Rekening PT. Dayamitra Telekomunikasi </td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111; background:#F7F7F7' align='center'>Due Date/Jatuh Tempo</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>No. 0070-0004492349 </td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>$row->tgl2 $bulan2 $row->tahun2</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>Bank Mandiri</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>Cabang Jakarta MT. Haryono</td>
					        <td>&nbsp;</td>
					        <td class='istyle18'>Hormat Kami, </td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>( Rupiah )</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>PT. DAYAMITRA TELEKOMUNIKASI </td>
					      </tr>
					      <tr>
					        <td height='97'>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'><u>".strtoupper($row->nama_app)."</u> </td>
					      </tr>
					      <tr>
					        <td width='6%'>&nbsp;</td>
					        <td width='33%'>&nbsp;</td>
					        <td width='25%'>&nbsp;</td>
					        <td width='36%' class='istyle15' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>".strtoupper($row->jabatan)."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					</table>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
