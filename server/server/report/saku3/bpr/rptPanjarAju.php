<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptPanjarAju extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.no_pj,a.kode_lokasi,a.kode_pp,a.akun_pj,a.periode,date_format(a.due_date,'%d/%m/%Y') as tanggal_ptg,a.nik_pengaju, a.catatan,
				a.nik_setuju,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,(a.nilai+a.nilai_pot) as nilai,a.nilai_pot,a.nilai as tot,
				c.nama as nama_akun,b.nama as nama_pp,d.nama as nama_pengaju,e.nama as nama_setuju,f.logo,
				d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju,d.alamat,d.no_rek,d.bank,d.cabang,d.nama_rek
				, g.nama as gm, h.nama as setuju,   i.initial as nmunit,j.no_bukti
				from panjar_m a
				inner join trans_m j on a.no_pj=j.no_ref1 and a.kode_lokasi=j.kode_lokasi
				inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
				inner join masakun c on a.akun_pj=c.kode_akun and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi 
				inner join lokasi f on a.kode_lokasi=f.kode_lokasi 
				inner join pp i on a.kode_lokasi= i.kode_lokasi and i.kode_pp = a.kode_pp 
				 left outer join karyawan g on g.jabatan = 'GENERAL MANAGER' and g.kode_lokasi = a.kode_lokasi  
				 left outer join karyawan h on h.jabatan like 'MANAGER%' and h.kode_lokasi = a.kode_lokasi and substring(h.kode_pp,1,4) = substring(a.kode_pp, 1, 4)
$this->filter";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
				while ($row = $rs->FetchNextObject($toupper=false))
		{

		echo "<table width='700' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td style='border:3px solid #111111; border-bottom-width:0px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td style='border-bottom:1px solid #111111;'><table width='100%' height='110' border='0' cellpadding='0' cellspacing='0'>
					          <tr>
					            <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					            <td width='88%' valign='top' align='center'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td align='center' class='istyle17'><u>SURAT PERMINTAAN PEMBAYARAN</u></td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'>$row->no_pj</td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2' style='padding-left:4px;'>
					          <tr>
					            <td colspan='5'>Mohon bantuan Saudara untuk membayarkan uang sejumlah Rp. ".number_format($row->nilai,0,',','.').",00</td>
					            </tr>
					          <tr>
					            <td valign='top' width='17%'>Terbilang</td>
					            <td valign='top' width='1%'>:</td>
					            <td colspan='3'>".$AddOnLib->terbilang(round($row->nilai))." </td>
					            </tr>
					          <tr>
					            <td colspan='5'>&nbsp;</td>
					            </tr>
					          <tr>
					            <td>Kepada</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td colspan='2' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Verifikasi $row->tgl</td>
					            </tr>
					          <tr>
					            <td height='27'>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td width='19%' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Anggaran $row->tgl</td>
					            <td width='19%' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Pembayaran</td>
					          </tr>
					          <tr>
					            <td>Nama</td>
					            <td>:</td>
					            <td>$row->nama_pengaju</td>
					            <td rowspan='4' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					            <td rowspan='4' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'><table width='100%' border='0' cellspacing='6' cellpadding='0'>
					              <tr>
					                <td width='16%' style='border:1px solid #111111'>&nbsp;</td>
					                <td width='84%'>Cash</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>Transfer</td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td valign='top'>Alamat</td>
					            <td valign='top'>:</td>
					            <td>$row->alamat</td>
					            </tr>
					          <tr>
					            <td>No. Rekening </td>
					            <td>:</td>
					            <td valign='top'>$row->no_rek</td>
					            </tr>
					          <tr>
					            <td>Untuk Pembayaran</td>
					            <td>:</td>
					            <td>$row->keterangan</td>
					            </tr>
					          <tr>
					            <td>Nama Bank</td>
					            <td>:</td>
					            <td>$row->bank</td>
					            <td colspan='2' rowspan='3' valign='top' style='border:1px solid #111111; border-right-width:0px;'>Manager Keuangan</td>
					            </tr>
					          <tr>
					            <td>Alamat Bank</td>
					            <td>:</td>
					            <td>$row->cabang</td>
					            </tr>
					          <tr>
					            <td>Nama Rekening</td>
					            <td>:</td>
					            <td>$row->nama_rek</td>
					            </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td height='517' style='border:3px solid #111111' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='600%' height='5' colspan='6' style='border-top:1px solid #111111'></td>
					      </tr>
					      <tr>
					        <td colspan='6' style='padding:0px' align='right'><table width='98%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='50%' style='border:1px solid #111111; border-right-width:0px;'><table width='93%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td width='2%'>&nbsp;</td>
					                <td width='29%' class='istyle18'>Perhitungan : </td>
					                <td width='4%'>&nbsp;</td>
					                <td width='8%'>&nbsp;</td>
					                <td width='52%'>&nbsp;</td>
					                <td width='2%'>&nbsp;</td>
					                <td width='3%'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td>Nilai Tagihan </td>
					                <td>:</td>
					                <td>Rp.</td>
					                <td align='right'>".number_format($row->nilai,0,',','.').",00</td>
					                <td align='right'>&nbsp;</td>
					                <td align='right'>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td style='border-bottom:1px solid #111111;'>Nilai Potongan </td>
					                <td style='border-bottom:1px solid #111111;'>:</td>
					                <td style='border-bottom:1px solid #111111;'>Rp.</td>
					                <td style='border-bottom:1px solid #111111;' align='right'>".number_format($row->pajak,0,',','.').",00</td>
					                <td align='right'>&nbsp;</td>
					                <td style='border-bottom:1px solid #111111;' align='right'>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td>Ditransfer</td>
					                <td>:</td>
					                <td>Rp.</td>
					                <td align='right'>".number_format($row->nilai,0,',','.').",00</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					            </table></td>
					            <td width='50%' style='border:1px solid #111111; border-right-width:0px;'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td width='2%'>&nbsp;</td>
					                <td rowspan='6' valign='top' class='istyle18'>Catatan : </td>
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
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td height='127' colspan='6' align='right' style='padding:0px;' valign='top'>
							<table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr align='center'>
					            <td class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Fiatur ***) </td>
					            <td colspan='2' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Mengetahui / Menyetujui **) </td>
					            <td width='25%' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Bandung, $row->tgl</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Ketua/Bdh/Sekr</td>";
					//if ($rs->kode_pp == "00080000")
					//	echo " <td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>GM</td>";
					//else 
					//{
						if ($rs->tot >= 5000000)
							echo " <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>GM</td>
									<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Man UNIT $row->nikth</td>";
						else echo "<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Man UNIT $row->nmunit</td>";
					//}
					echo "<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Yang Mengajukan *)</td>
					          </tr>
					          <tr>
					            <td height='55' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					//if ($rs->kode_pp == "00080000")
					//	echo "<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					//else {
						if ($rs->tot >= 5000000)
							echo "<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>					            
					            <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
						else echo "<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					//}
					echo "<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;</td>";
					//if ($rs->kode_pp == "00080000")
					//	echo "<td colspan='2' width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$rs->gm</td>";
					//else{
						if ($rs->tot >= 5000000)
							echo "<td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;</td>
									<td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$row->setuju</td>";
						else echo "<td colspan='2' width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$row->setuju</td>";
					//}
					echo "<td style='border:1px solid #111111; border-right-width:0px;'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
						  	<tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td height='162' colspan='6' align='right' style='padding:0px' valign='top'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr align='center'>
					            <td width='30%' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					            <td width='20%' class='istyle15' style='border:1px solid #111111; border-right-width:0px;' align='left'>Tanggal</td>
					            <td colspan='2' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Kelengkapan Dokumen</td>
					            </tr>
					          <tr align='center' class='istyle15'>
					            <td colspan='2' style='border-left:1px solid #111111;'>Penerima</td>
					            <td width='51%' colspan='2' rowspan='3' style='border:1px solid #111111; border-top-width:0px; border-right-width:0px;'><table width='91%' border='0' cellspacing='3' cellpadding='2'>
					              <tr>
					                <td width='7%' style='border:1px solid #111111'>&nbsp;</td>
					                <td width='93%'>Kuitansi / Faktur </td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>SPK/PKS/ST/DO</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>BAST</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>AKI</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>Faktur Pajak/SSP </td>
					              </tr>
					            </table></td>
					            </tr>
					          <tr>
					            <td height='90' colspan='2' style='border-left:1px solid #111111;'>&nbsp;</td>
					            </tr>
					          <tr align='center' class='istyle15'>
					            <td colspan='2' style='border-left:1px solid #111111; border-bottom:1px solid #111111'>(.............................................................................................)</td>
					            </tr>
					        </table></td>
					      </tr>
						  					      <tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='6' align='right' valign='top' style='padding:0px;'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr>
					            <td height='60' colspan='3' class='istyle15' style='border:1px solid #111111; border-right-width:0px;' valign='top'>Disposisi Manajemen </td>
					            </tr>
					        </table></td>						
					      </tr>
					  					      <tr>
					        <td colspan='6'>&nbsp;</td>
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
					</table>
						<tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
						  						<tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
						  						<tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>";
						  
			$judul="BUKTI JURNAL";
			
			echo "<table align='center' width='800' border='0' cellspacing='2' cellpadding='1' >
  <tr>
    <td><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600'><table width='100%'  border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td class='style16'>$row->loc </td>
          </tr>
          <tr>
            <td class='style16'>$row->kota</td>
          </tr>
        </table></td>
        <td width='200' align='center'><table width='100%'  border='1' cellspacing='0' cellpadding='0' class='kotak'>
        
          <tr>
            <td align='center' class='istyle15'>$row->no_bukti</td>
          </tr>
          <tr>
            <td align='center' class='istyle15'>".substr($row->tgl,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl),0,6))."</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center' class='istyle17'>$judul</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='30' class='header_laporan'>NO</td>
        <td width='100' class='header_laporan'>KODE AKUN </td>
        <td width='200' class='header_laporan'>NAMA AKUN </td>
        <td width='270' class='header_laporan'>KETERANGAN</td>
		<td width='60' class='header_laporan'>PP</td>
        <td width='100' class='header_laporan'>DEBET</td>
        <td width='100' class='header_laporan'>KREDIT</td>
       </tr>";
	   
	 $sql1="select a.kode_akun,b.nama as nama_akun,a.kode_pp,a.nilai,a.keterangan,isnull(a.debet,0) as debet,isnull(a.kredit,0) as kredit,a.kode_curr
					  from (select kode_lokasi,kode_akun,kode_pp,dc,nilai,keterangan,case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit,kode_curr
							from trans_j
							where periode='$row->periode' and kode_lokasi='$row->kode_lokasi' and no_bukti='$row->no_bukti'
							)a 
					  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					order by a.dc desc";
					
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama_akun</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='200' align='center'>Dibuat Oleh : </td>
        <td width='200' align='center'>Diperiksa Oleh : </td>
        <td width='200' align='center'>Diinput Oleh : </td>
        <td width='200' rowspan='3'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        <td align='center'>Paraf &amp; Tanggal </td>
        </tr>
      <tr>
        <td height='80'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='300'>Lembar ke 1 untuk Bag. Keuangan / Akuntansi</td>
        <td width='500'>Lembar ke 2 untuk Penerima </td>
      </tr>
    </table></td>
  </tr>
</table><br>
			<DIV style='page-break-after:always'></DIV>";

		echo "</div>";
					$i=$i+1;

	}
	
	
		return "";
		
	}
	
}

?>
