<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");

class server_report_kopeg_rptPtgProyek extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(distinct a.no_ptg) ".
			"from ptg_m a ".$this->filter." and a.modul='PTG_P' and a.no_del='-' ";
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
		$sql0="select distinct a.no_ptg, a.keterangan ".
              "from ptg_m a 
				inner join  karyawan j on j.nik = a.nik_user and j.kode_lokasi = a.kode_lokasi 
				left outer join karyawan g on g.jabatan = 'GENERAL MANAGER' and g.kode_lokasi = a.kode_lokasi 
				left outer join karyawan h on h.jabatan like 'MANAGER%' and h.kode_lokasi = a.kode_lokasi and substring(h.kode_pp,1,4) = substring(a.kode_pp, 1, 4) 
              ".$this->filter." and a.modul='PTG_P' and a.no_del='-' ";
		//error_log($sql0);
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while ($row = $page->FetchNextObject(false))
		{
			$sql = "select distinct b.no_pj, date_format(b.tanggal,'%d-%m-%Y') as tanggal, b.keterangan, b.nilai from ptg_j a 				
				inner join panjar_m b on b.no_pj = a.no_dokumen and b.kode_lokasi = a.kode_lokasi				
				where a.no_ptg ='".$row->no_ptg."' order by b.no_pj";			
			$invc=$dbLib->execute($sql);
			$sql = "select a.kode_akun, b.nama, a.keterangan, a.dc, a.nilai from ptg_j a 				
				inner join masakun b on b.kode_akun = a.kode_akun and b.kode_lokasi = a.kode_lokasi				
				where a.no_ptg ='".$row->no_ptg."' and a.jenis = 'BBN' order by a.no_urut";			
			$ptgj = $dbLib->execute($sql);
			
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";
			$html="<br />";
			$html.=	"<table width='800' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td style='border:3px solid #111111; border-bottom-width:0px;'>
							<table width='100%' border='0' cellspacing='0' cellpadding='0'>
							<tr>
					        <td style='border-bottom:1px solid #111111;'><table width='100%' height='110' border='0' cellpadding='0' cellspacing='0'>
					          <tr>
					            <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					            <td width='88%' valign='top' align='center'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td align='center' class='istyle17'><u>PERTANGGUNGAN PANJAR PROYEK</u></td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><b>Nomor:".$row->no_ptg."</b></td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					      <td height ='30' style='border-bottom:1px solid #111111' valign='middle'> &nbsp;<b>Keterangan</b> : $row->keterangan</td>
					      </tr>					      
					      <tr>
					        <td >
							  <table width='790' border='0' cellspacing='0' cellpadding='2' style='padding-left:4px;'>
					          <tr>
					            <td><b>Daftar Panjar</b></td>
					          </tr>
					          <tr>
								<td align='center'><table width='100%' border='1' cellspacing='0' cellpadding='3' class='kotak'>
										<tr bgcolor='#cccccc'>
											<th class='header_laporan' align='center'>No Panjar</th>
											<th class='header_laporan' align='center'>Tanggal</th>
											<th class='header_laporan' align='center' width='60%'>Uraian</th>
											<th class='header_laporan' align='center'>Nilai</th>
										</tr>";
								$tot = 0;
								while ($rs = $invc->FetchNextObject($toupper=false)){
									$tot += $rs->nilai;
									$html .= "<tr>
												<td class='isi_laporan'  >$rs->no_pj</td>
												<td class='isi_laporan'  >$rs->tanggal</td>
												<td class='isi_laporan'  >$rs->keterangan</td>
												<td class='isi_laporan'  align='right'>".number_format($rs->nilai,0,",",".")."</td>
											</tr>";
								}								
								$html .= "<tr>
									<td class='isi_laporan' colspan='3' align='right'>Total</td>
									<td class='isi_laporan' align='right'>".number_format($tot,0,",",".")."</td>
								</tr></table></td>
					          </tr>					          
					          <tr><td></td></tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td style='border:3px solid #111111;border-top-width:1px;border-bottom-width:1px;' valign='top'>
						  <table width='790' border='0' cellspacing='0' cellpadding='2' >
					      <tr>
					        <td ><b>Daftar Pertanggungan</b></td>
					      </tr>
					      <tr>
					        <td align='center'>	
								<table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
								<tr bgcolor='#cccccc'>
									<th class='header_laporan' align='center' width='80'>Kode Akun</th>
									<th class='header_laporan' align='center'>Nama Akun</th>
									<th class='header_laporan' align='center' width='50%'>Uraian</th>
									<th class='header_laporan' align='center'>DC</th>
									<th class='header_laporan' align='center'>Nilai</th>
								</tr>";
							$tot2 = 0;
							while ($rs = $ptgj->FetchNextObject($toupper=false)){
									$tot2 += ($rs->dc == "D" ? 1: -1 ) * $rs->nilai;
									$html .= "<tr>
												<td class='isi_laporan'  >$rs->kode_akun</td>
												<td class='isi_laporan'  >$rs->nama</td>
												<td class='isi_laporan'  >$rs->keterangan</td>
												<td class='isi_laporan'  >$rs->dc</td>
												<td class='isi_laporan'  align='right'>".number_format($rs->nilai,0,",",".")."</td>												
											</tr>";
							}								
							$html .= "<tr>
									<td class='isi_laporan' colspan='4' align='right'>Total</td>
									<td class='isi_laporan' align='right'>".number_format($tot2,0,",",".")."</td>
								</tr></table>
							</td>
					      </tr>	
					      <tr><td ></td>					    
					      </tr></table>			
					<tr>
					  <td style='border:3px solid #111111; border-top-width:0px;' align='center'>
							<table width='790' border='0' cellspacing='0' cellpadding='2'>
							<tr>
								<td width='80%' align='right'>Kas Bayar (kas Terima) </td>
								<td align='right'>:</td>
								<td align='right'>".number_format($tot2 - $tot,0,",","." )."</td>
							</tr>
						</table></td>
					  </tr>	     
					  <tr>
					    <td style='border:3px solid #111111;border-top-width:0px' valign='top'>
						  <table width='790' border='0' cellspacing='0' cellpadding='2' >
						  <tr><td>&nbsp;</td></tr>
					      <tr>
					        <td height='127' colspan='6' align='right' style='padding:0px;' valign='top'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr align='center'>
					            <td class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; '>Fiatur ***) </td>
					            <td colspan='2' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; '>Mengetahui / Menyetujui **) </td>
					            <td width='25%' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px;'>Bandung, ".$rs->tgl."</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td style='border:1px solid #111111; border-bottom-width:0px; '>Ketua/Bdh/Sekr</td>";
					if ($rs->tot >= 5000000 || $rs->kode_pp == "00080000")
						$html .= " <td style='border:1px solid #111111; border-bottom-width:0px; '>GM</td>
								<td style='border:1px solid #111111; border-bottom-width:0px; '>Man UNIT $rs->nmunit</td>";
					else $html .= "<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; '>Man UNIT $rs->nmunit</td>";
					$html .= "<td style='border:1px solid #111111; border-bottom-width:0px; '>Yang Mengajukan *)</td>
					          </tr>
					          <tr>
					            <td height='55' style='border:1px solid #111111; border-bottom-width:0px; '>&nbsp;</td>";
					if ($rs->tot >= 5000000 || $rs->kode_pp == "00080000")
					     $html .="<td style='border:1px solid #111111; border-bottom-width:0px; '>&nbsp;</td>					            
					            <td style='border:1px solid #111111; border-bottom-width:0px; '>&nbsp;</td>";
					else $html .="<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; '>&nbsp;</td>";
					$html .= "<td style='border:1px solid #111111; border-bottom-width:0px; '>&nbsp;</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td width='25%' style='border:1px solid #111111; '>&nbsp;</td>";
					if ($rs->tot >= 5000000 || $rs->kode_pp == "00080000")
					    $html .= "<td width='25%' style='border:1px solid #111111; '>&nbsp;$rs->gm</td>
					            <td width='25%' style='border:1px solid #111111; '>&nbsp;$rs->setuju</td>";
					else $html .= "<td colspan='2' width='25%' style='border:1px solid #111111; '>&nbsp;$rs->setuju</td>";
					$html .="<td style='border:1px solid #111111; '>&nbsp;$rs->nama_buat</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='100' colspan='6' align='right' style='padding:0px' valign='top'>
								<table width='98%' border='0' cellspacing='0' cellpadding='3'>
								<tr align='center'>
									<td width='30%' class='istyle15' >&nbsp;</td>
									<td width='20%' class='istyle15' >&nbsp;</td>
									<td colspan='2' class='istyle15' style='border:1px solid #111111;'>Verifikasi</td>
					            </tr>
								<tr align='center' class='istyle15'>
									<td colspan='2' >&nbsp;</td>
									<td width='51%' colspan='2' rowspan='3' style='border:1px solid #111111'>
										<table width='91%' border='1' cellspacing='3' cellpadding='2' class='kotak'>
											<tr>
												<td align='center' >Anggaran ".$rs->tgl."</td>
												<td align='center' >Pembayaran</td>
											</tr>
											<tr>
											<td>
												<table width='100%' border='0' cellspacing='6' cellpadding='0'>
												<tr>
													<td width='16%' style='border:1px solid #111111'>&nbsp;</td>
													<td width='84%'>Cash</td>
												</tr>
												<tr>
													<td style='border:1px solid #111111'>&nbsp;</td>
													<td>Transfer</td>
												</tr>
												</table>
											</td>											
											</tr>
										</table>
									</td>
					            </tr>					              
					            </table>
					            </td>
					            </tr>
					          <tr>
					            <td colspan='2' >&nbsp;</td>
					            </tr>
					          <tr align='center' class='istyle15'>
					            <td colspan='2' >&nbsp;</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='6' align='right' valign='top' style='padding:0px;'>&nbsp;</td>
					      </tr>
					      
					    </table></td>
					  </tr>					  
					  
					</table>
					
					
					<table width='700' border='0' align='center' cellpadding='0' cellspacing='2'>
					  <tr>
					    <td colspan='2' class='istyle14'>Catatan : </td>
					  </tr>
					  <tr>
					    <td class='istyle14' width='23'>*)</td>
					    <td class='istyle14' width='671'>Pemegang Imprest Fund/Panjar atau Petugas penanggung jawab pekerjaan. </td>
					  </tr>
					  <tr>
					    <td class='istyle14'>**)</td>
					    <td class='istyle14'>Dibawah Rp. 5.000.000 ditandatangani oleh Manajer. Diatas Rp. 5.000.000 ditandatangani oleh Manajer dan GM.</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle14'>***)</td>
					    <td valign='top' class='istyle14'>Dibawah Rp. 5.000.000 ditandatangani oleh Sekretaris. Diatas Rp. 5.000.000 s/d 50.000.000 ditandatangani oleh Bendahara. Diatas Rp.  50.000.000 ditandatangani oleh Ketua.</td>
					  </tr>
					</table>";
			
			$html .= "<br />";
			$page->MoveNext();
		}
		$html = str_replace(chr(9),"",$html);
		return $html;
	}	
}
?>
