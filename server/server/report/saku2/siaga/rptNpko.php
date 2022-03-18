<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptNpko extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_npko)
from gr_npko_m a
inner join gr_npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi
inner join karyawan e1 on a.nik_buat=e1.nik and a.kode_lokasi=e1.kode_lokasi
inner join karyawan e2 on a.nik_app=e2.nik and a.kode_lokasi=e2.kode_lokasi
inner join karyawan e3 on a.nik_gar=e3.nik and a.kode_lokasi=e3.kode_lokasi
inner join karyawan e4 on a.nik_fiat=e4.nik and a.kode_lokasi=e4.kode_lokasi
inner join lokasi f on a.kode_lokasi=f.kode_lokasi $this->filter ";
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
		$sql = "select a.no_npko,c.nama as nama_pp,d.nama as nama_dept,a.tanggal,date_format(a.tanggal,'%d/%m/%Y')  as tgl,a.lokasi,a.sarana,a.vol,
	   a.lingkup,a.waktu,a.fasilitas,a.sasaran,a.uraian,b.kode_akun,b.gar_tahun,b.gar_bulan,b.gar_sd,
	   e1.nama as nama1,e1.jabatan as jab1,
	   e2.nama as nama2,e2.jabatan as jab2,e3.nama as nama3,e3.jabatan as jab3,e4.nama as nama4,e4.jabatan as jab4,f.logo
from gr_npko_m a
inner join gr_npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi
inner join karyawan e1 on a.nik_buat=e1.nik and a.kode_lokasi=e1.kode_lokasi
inner join karyawan e2 on a.nik_app=e2.nik and a.kode_lokasi=e2.kode_lokasi
inner join karyawan e3 on a.nik_gar=e3.nik and a.kode_lokasi=e3.kode_lokasi
inner join karyawan e4 on a.nik_fiat=e4.nik and a.kode_lokasi=e4.kode_lokasi
inner join lokasi f on a.kode_lokasi=f.kode_lokasi $this->filter order by a.no_npko ";
		
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
					    <td width='88%'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='69%' align='right' class='istyle15'>Nomor : </td>
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>".$row->no_npko."</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>NOTA PROSES KEGIATAN OPERASIONAL</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td width='50%' class='istyle15'>Departemen : $row->nama_pp</td>
					              <td width='50%' class='istyle15'>Nomor Kegiatan : </td>
					            </tr>
					            <tr>
					              <td class='istyle15'>Unit Kerja : $row->nama_dept </td>
					              <td class='istyle15'>Tanggal : ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td class='istyle15' colspan='2' align='center'>INFO KEGIATAN UMUM</td>
					              <td class='istyle15' width='38%' align='center'>Lingkup Pekerjaan</td>
					              <td class='istyle15' width='12%' align='center'>Waktu</td>
					            </tr>
					            <tr>
					              <td class='istyle15' width='13%' align='center'>LOKASI</td>
					              <td class='istyle15' width='37%' align='center'>".$row->lokasi."</td>
					              <td rowspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td class='istyle15'>".$row->lingkup."</td>
					                </tr>
					              </table></td>
					              <td rowspan='3' align='center' class='istyle15'>".$wkt[0]."-".substr($AddOnLib->ubah_periode($wkt[2].$wkt[1]),0,3)."-".substr($wkt[2],2)."</td>
					            </tr>
					            <tr>
					              <td align='center' class='istyle15'>SARANA</td>
					              <td class='istyle15' align='center'>".$row->sarana."</td>
					            </tr>
					            <tr>
					              <td align='center' class='istyle15'>VOLUME</td>
					              <td class='istyle15' align='center'>".$row->vol."</td>
					            </tr>
					            <tr>
					              <td colspan='2' align='center' class='istyle15'>KONDISI SARANA/FASILITAS</td>
					              <td colspan='2' align='center' class='istyle15'>SASARAN KEGIATAN </td>
					            </tr>
					            <tr>
					              <td height='120' colspan='2' valign='top'><br /><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td class='istyle15'".urldecode($row->fasilitas)."</td>
					                </tr>
					              </table></td>
					              <td height='120' colspan='2' valign='top'><br />
					                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                  <tr>
					                    <td class='istyle15'>".urldecode($row->sasaran)."</td>
					                  </tr>
					                </table></td>
					              </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center' class='istyle15'>GAMBAR SITUASI/URAIAN PEKERJAAN </td>
					              </tr>
					            <tr>
					              <td height='150' valign='top'><br />
					                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                  <tr>
					                    <td class='istyle15'>".urldecode($row->uraian)."</td>
					                  </tr>
					                </table></td>
					              </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center'>Nomor Akun </td>
								  <td align='center'>Nama Akun </td>
					              <td align='center'>Anggaran Tahun ini </td>
					              <td align='center'>Anggaran Bulan ini </td>
					              <td align='center'>Sisa s/d saat ini </td>
					            </tr>";
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
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td width='25%' align='center'>Direncanakan Oleh: </td>
					              <td width='25%' align='center'>Diperiksa Oleh:</td>
					              <td width='25%' align='center'>Disetujui Oleh:</td>
					              <td width='25%' align='center'>Verifikasi Anggaran Oleh : </td>
					            </tr>
					            <tr>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                  </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>$row->nama1</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>$row->jab1</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>$row->nama2</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>$row->jab2</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>$row->nama3</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>$row->jab3</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>$row->nama4</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>$row->jab4</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					            </tr>
					            <tr>
					              <td>Tanggal : </td>
					              <td>Tanggal : </td>
					              <td>Tanggal : </td>
					              <td>Tanggal :</td>
					            </tr>
					          </table></td>
					        </tr>
					      </table></td>
					  </tr>
					</table><br><DIV style='page-break-after:always'></DIV>";
		
		
		}
		echo "</div>";
		return "";
	}
}
?>