<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptNDpbh1 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
		error_log($sql);
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
        // $kode_lokasi=$tmp[0];
		
		// $sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tgl_input,'%d/%m/%Y') as tgl_inp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		// a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.nama_rek,e.no_rek,e.bank,f.kode_setl,f.nama as jenis_setl,a.waktu_setl 
		// from inv_shmbeli_m a
		// inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		// left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		// left join inv_kustodi e on a.kode_kustodi=e.kode_kustodi
		// left join inv_jenis_setl f on a.kode_setl =f.kode_setl
		// $this->filter order by a.no_shmbeli";
		
		// $rs = $dbLib->execute($sql);
		
		$i = 1;
		// $jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body>"; 
		echo "<div align='center'>";
		// while ($row = $rs->FetchNextObject($toupper=false))
		// {
			echo "
			<style>
			.tdborder{
				border: 1px solid black;
			}
			.tdpad{
				padding: 3px;
			}
			@media print {
 
      
				#contentPrint {
				  width: 100%; 
				  margin: 0; 
				  float: none;
				}
					
				/** Seitenränder einstellen */       
				@page { margin: 3.5cm, 2cm, 1.5cm, 2cm }
		  
			  }
			  .printND{
				 margin-top:3.5cm;
			  }
			</style>
			<table  border='0' cellspacing='0' cellpadding='0' class='kotak printND'>
			<tr>
				<td colspan='7' style='padding:5px'>
                <table width='622' border='0' cellspacing='2' cellpadding='1' style='border-collapse: collapse;'>
				<tr>
					<td width='110' colspan='3' class='tdpad'>Nomor</td>
					<td width='496' colspan='4' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
                    <td width='110' colspan='3' class='tdpad'>Kepada</td>
                    <td width='496' colspan='4' class='tdpad'>:&nbsp; <b>Sdr. KABID KEUANGAN</b></td>
				</tr>
				<tr>
                    <td colspan='3' class='tdpad'>Dari</td>
                    <td width='496' colspan='4' class='tdpad'>:&nbsp; POH Kepala Bidang Investasi</td>
				</tr>
				<tr>
					<td width='110' colspan='3' class='tdpad'>Lampiran</td>
					<td width='496' colspan='4' class='tdpad'>:&nbsp; 1 (satu) berkas</td>
				</tr>
				<tr>
					<td  colspan='3' class='tdpad'>Perihal	
                    </td>
                    <td width='496' colspan='4' class='tdpad'>:&nbsp; Transfer Dana Jamkespen untuk Investasi melalui Reksa Dana</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='7'>
					&nbsp;			
					</td>
				</tr>
                <tr>
                    <td class='tdpad' style='vertical-align:top'>1.</td>
					<td colspan='6' class='tdpad' style='text-align: justify;'>
					Sehubungan investasi Yakes-Telkom melalui Reksa Dana, dimohon bantuan Saudara untuk mentransfer Dana Jamkespen dengan kondisi dan ketentuan sebagai berikut :
					</td>
				</tr>
				";
				// $sql2 = "select a.kode_saham,a.kode_broker,d.nama as nama_broker,a.jumlah,
				// a.n_beli+a.komisi+a.vat+a.levi as beli,a.pph,
				// a.n_beli-a.komisi+a.vat+a.levi-a.pph as bayar
				// from inv_shmbeli_d a
				// inner join inv_broker d on a.kode_broker=d.kode_broker
				// where a.no_shmbeli='$row->no_shmbeli' 
				// ";
				// $rs2= $dbLib->execute($sql2);
				// $beli=0;$pph=0;$bayar=0;
				// while($row2=$rs2->FetchNextObject($toupper=false)){
				// 	$beli+=$row2->beli;
				// 	$pph+=$row2->pph;
                // 	$bayar+=$row2->bayar;
                $col=array("a","b","c");
                for ($x=0;$x<count($col);$x++){
                echo"
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>".$col[$x].".</td>
                    <td class='tdpad'>1)</td>
                    <td class='tdpad' colspan='2'>&nbsp;Nama Reksadana
                    </td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>
                    Mandiri Obligasi Utama 2
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>2)</td>
                    <td class='tdpad' colspan='2'>&nbsp;Nama Manager Investasi
                    </td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>PT Mandiri Manajemen Investasi		
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>3)</td>
                    <td class='tdpad' colspan='2'>&nbsp;Jumlah Investasi
                    </td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>Rp. 18.000.000.000 (diulang Rp. 18.000.000.000,-)			
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>4)</td>
                    <td class='tdpad' colspan='2'>&nbsp;Tranfer dialamatkan kepada 
                    </td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>&nbsp;			
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;~
                    </td>
                    <td class='tdpad'>Nama Penerima</td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>Reksa Dana Mandiri Obligasi Utama 2			
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;~
                    </td>
                    <td class='tdpad'>Nama Bank</td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>Bank Mega, KC Jakarta Rasuna Said	
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;~
                    </td>
                    <td class='tdpad'>Nomor Rekening</td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>01.074.0011.240128
                    </td>
                </tr>
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;~
                    </td>
                    <td class='tdpad'>Untuk Pembayaran</td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>Subsc. RD. Mandiri Obligasi Utama II an. Yakes-Telkom
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>5)</td>
                    <td class='tdpad' colspan='2'>&nbsp;Tanggal Tranfer
                    </td>
                    <td class='tdpad'>:</td>
                    <td class='tdpad'>2 September 2019 (Pagi).
                    </td>
                </tr>
                ";
				}
				echo"
                <tr>
					<td class='tdpad' style='vertical-align:top'>2.</td>
					<td class='tdpad' colspan='6' style='text-align:justify'>Berkas/ dokumen yang berkaitan dengan pembelian Reksa Dana dimaksud, kami lampirkan.</td>
                </tr>
                <tr>
					<td class='tdpad' style='vertical-align:top'>3.</td>
					<td class='tdpad' colspan='6' style='text-align:justify'>Demikian kami sampaikan, atas perhatian dan kerja samanya diucapkan terima kasih.</td>
				</tr>
                <tr>
					<td class='tdpad' colspan='5'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
                <tr>
					<td class='tdpad' colspan='5'>Bandung, September 2019</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5' >&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'><b><u>HERLINA R.EKAWATI</u></b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'><b>NIK. 840070</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				</table>
				</td>
			</tr>
			  </table><br>
			  
			  <DIV style='page-break-after:always'></DIV>";
			
			$i=$i+1;
		// }
		echo"</div></body>";
		
		return "";
	}
	
}
?>
