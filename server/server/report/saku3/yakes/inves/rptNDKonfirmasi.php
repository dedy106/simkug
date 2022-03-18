<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptNDKonfirmasi extends server_report_basic
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
		
		// $i = 1;
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
                
				padding: 3px;
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
				<td colspan='10' style='padding:5px'>
                <table width='622' border='0' cellspacing='2' cellpadding='1' style='border-collapse: collapse;'>
                <tr>
					<td colspan='10' class='tdpad' style='font-weight:bold;font-size:20px;text-align:right'>Nota Konfirmasi</td>
				</tr>
				<tr>
					<td width='110' colspan='3' class='tdpad'>Nomor</td>
					<td width='496' colspan='7' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
                    <td width='110' colspan='10' class='tdpad'>Bandung, September 2019</td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>Kepada Yth</td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'><b>Pimpinan Bank BNI, Cabang JPK Bandung</b></td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>Jalan Perintis Kemerdekaan Nomor 3</td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>
                    Bandung 40117</td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>
                    U.p. <b>Kepala Cabang</b></td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>
                    No. Fax. 022-2501442</td>
                </tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>
                    Perihal Pemindahanbukuan Dana</td>
                </tr>
                <tr>
					<td class='tdpad' colspan='10'>
					&nbsp;			
					</td>
				</tr>
                <tr>
                    <td width='110' colspan='10' class='tdpad'>
                    Dengan hormat,</td>
                </tr>
                <tr>
                    <td class='tdpad' style='vertical-align:top'>1.</td>
					<td colspan='8' class='tdpad' style='text-align: justify;'>
					Dengan ini dimohon bantuan Saudara untuk melakukan pemindahbukuan dana sebagai berikut :								
					</td>
				</tr>
				<tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='9'>Dari</td>
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='4'>Nama Bank</td>
                    </td>
					<td class='tdpad' colspan='5'>:&nbsp;Bank BNI, Cabang JPK Bandung				
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='4'>Nomor Rekening</td>
                    </td>
					<td class='tdpad' colspan='5'>:&nbsp;0022854673			
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='4'>Nama Rekening</td>
                    </td>
					<td class='tdpad' colspan='5'>:&nbsp;Yayasan Kesehatan Pegawai TELKOM	
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='4'>Jumlah Dana</td>
                    </td>
					<td class='tdpad' colspan='5'>:&nbsp;Rp56.000.000.000,- (diulang Rp56.000.000.000,-)		
                    </td>
                </tr>
                <tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='9'>Kepada :</td>
                    </td>
                </tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
					<th class='tdborder' align='center'>No</th>
					<th class='tdborder' align='center' colspan='2'>Nama Bank</th>
					<th class='tdborder' align='center'>Nomor Rekening</th>
                    <th class='tdborder' align='center'>Nama Bank</th>
                    <th class='tdborder' align='center'>Jumlah Dana</th>
                    <th class='tdborder' align='center'>Untuk</td>
                    <th class='tdborder' align='center'>Tanggal Pelaksanaan</td>
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
					<td class='tdborder' align='center'>a.</th>
					<td class='tdborder' align='' colspan='2'>Bank Mega, KC Jakarta Rasuna Said				
                    </td>
					<td class='tdborder' align='center'>01.074.0011.240128		
                    </td>
                    <td class='tdborder' align=''>Reksa Dana Mandiri Obligasi Utama 2	
                    </td>
                    <td class='tdborder' align=''>Rp18.000.000.000,- (diulang Rp18.000.000.000,-)				
                    </td>
                    <td class='tdborder' align=''>Subsc. RD. Mandiri Obligasi Utama II an. Yakes-Telkom</td>
                    <td class='tdborder' align=''> 2  September 2019 (Pagi).				
                    </td>
				</tr>
               ";
				}
				echo"
                <tr>
					<td class='tdpad' style='vertical-align:top'>2.</td>
					<td class='tdpad' colspan='8' style='text-align:justify'>Demikian harap maklum dan mohon pelaksanaannya. Atas perhatian dan kerja samanya diucapkan terima kasih.	
                    </td>
                </tr>
                <tr>
					<td class='tdpad' colspan='5'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
                <tr>
					<td class='tdpad' colspan='5'>Hormat kami,</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
                </tr>
                <tr>
					<td class='tdpad' colspan='5'>Yayasan Kesahatan Pegawai Telkom</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5' >&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'><b><u>TEUKU HERCULES</u></b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='2'><b><u>HARMAWAN</u></b></td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'><b>Kepala Bidang Kesehatan</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='2'><b>Manager Perbendaharaan</b></td>
				</tr>
				</table>
				</td>
			</tr>
			  </table><br>
			  <DIV style='page-break-after:always'></DIV>
			  ";
			
			$i=$i+1;
		// }
		echo"</div></body>";
		
		return "";
	}
	
}
?>
