<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptNotaDinas extends server_report_basic
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
		
		$sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tgl_input,'%d/%m/%Y') as tgl_inp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.nama_rek,e.no_rek,e.bank,f.kode_setl,f.nama as jenis_setl,a.waktu_setl 
		from inv_shmbeli_m a
		inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		left join inv_kustodi e on a.kode_kustodi=e.kode_kustodi
		left join inv_jenis_setl f on a.kode_setl =f.kode_setl
		$this->filter order by a.no_shmbeli";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		// $jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body>"; 
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "
			<style>
			.tdborder{
				border: 1px solid black;
			}
			.tdpad{
				padding: 3px;
			}
			.printND{
				margin-top:3.5cm;
			 }
			</style>
			<table  border='0' cellspacing='0' cellpadding='0' class='printND' width='800'>
			<tr>
				<td colspan='10' style='padding:5px' align='center'>
                <table border='0' width='700' cellspacing='2' cellpadding='1' style='border-collapse: collapse;'>
				<tr>
					<td colspan='8' class='tdpad' style='font-weight:bold;font-size:20px;text-align:right'>Nota Dinas</td>
				</tr>
				<tr>
					<td width='110' colspan='3' class='tdpad'>Nomor</td>
					<td width='496' colspan='5' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
                    <td width='110' colspan='3' class='tdpad'>Kepada</td>
                    <td width='496' colspan='5' class='tdpad'>:&nbsp; <b>Sdr. KABID KEUANGAN</b></td>
				</tr>
				<tr>
                    <td colspan='3' class='tdpad'>Dari</td>
                    <td width='496' colspan='5' class='tdpad'>:&nbsp; $row->jab1</td>
				</tr>
				<tr>
					<td width='110' colspan='3' class='tdpad'>Lampiran</td>
					<td width='496' colspan='5' class='tdpad'>:&nbsp; 1 (satu) berkas</td>
				</tr>
				<tr>
					<td  colspan='3' class='tdpad'>Perihal	
                    </td>
                    <td width='496' colspan='5' class='tdpad'>:&nbsp; Transfer Dana untuk Pembelian Saham Bursa</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='8'>
					&nbsp;			
					</td>
				</tr>
                <tr>
                    <td class='tdpad' style='vertical-align:top'>1.</td>
					<td colspan='7' class='tdpad' style='text-align: justify;'>
					Sehubungan  pembelian  saham  di Bursa  oleh  YAKES-TELKOM,  dimohon  bantuan  Saudara  untuk mentransfer dana dengan kondisi dan ketentuan sebagai berikut :
					</td>
				</tr>
				<tr>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>a.</td>
                    <td class='tdpad' colspan='2'>Tipe Settlement</td>
                    <td class='tdpad' colspan='4'>:&nbsp;<i>$row->jenis_setl</i>
                    </td>
				</tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>b.</td>
                    <td class='tdpad' colspan='2'>Tanggal Transaksi</td>
                    <td class='tdpad' colspan='4'>:&nbsp;".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."
                    </td>
				</tr>
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>c.</td>
					<td class='tdpad' colspan='2'>Tanggal Settlement</td>
					<td class='tdpad' colspan='4'>:&nbsp;".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</td>
				</tr>
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>d.</td>
					<td class='tdpad' colspan='6'>Nama Saham, Jumlah Saham, Nominal Pembayaran, dan Nama Broker :</td>
				</tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
					<th class='tdborder' align='center'><i>Kode Saham</i></th>
					<th class='tdborder' align='center'><i>Jumlah Saham (Lembar)</i></th>
					<th class='tdborder' align='center'><i>Nominal biaya Pembelian (Rp)</i></th>
                    <th class='tdborder' align='center'><i>PPh Pasal 23 Komisi Broker (Rp)</i></th>
                    <th class='tdborder' align='center'><i>Nominal Pembayaran kpd Broker (Rp)</i></th>
                    <th class='tdborder' align='center'><i>Broker</i></td>
				</tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdborder' align='center'>1</td>
                    <td class='tdborder' align='center'>2</td>
                    <td class='tdborder' align='center'>3</td>
                    <td class='tdborder' align='center'>4</td>
                    <td class='tdborder' align='center'>5=3-4</td>
                    <td class='tdborder' align='center'>6</td>
				</tr>";
				$sql2 = "select a.kode_saham,a.kode_broker,d.nama as nama_broker,a.jumlah,
				a.n_beli+a.komisi+a.vat+a.levi as beli,a.pph,
				a.n_beli-a.komisi+a.vat+a.levi-a.pph as bayar
				from inv_shmbeli_d a
				inner join inv_broker d on a.kode_broker=d.kode_broker
				where a.no_shmbeli='$row->no_shmbeli' 
				";
				$rs2= $dbLib->execute($sql2);
				$beli=0;$pph=0;$bayar=0;
				while($row2=$rs2->FetchNextObject($toupper=false)){
					$beli+=$row2->beli;
					$pph+=$row2->pph;
					$bayar+=$row2->bayar;
				echo"
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdborder' align='center'>$row2->kode_saham</td>
                    <td class='tdborder' align='right'>".number_format($row2->jumlah,0,",",".")."</td>
                    <td class='tdborder' align='right'>".number_format($row2->beli,0,",",".")."</td>
                    <td class='tdborder' align='right'>".number_format($row2->pph,0,",",".")."</td>
                    <td class='tdborder' align='right'>".number_format($row2->bayar,0,",",".")."</td>
                    <td class='tdborder' align='center'>$row2->nama_broker</td>
				</tr>";
				}
				echo"
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdborder' align='center'><b>Total</b></td>
                    <td class='tdborder' align='center'>&nbsp;</td>
                    <td class='tdborder' align='right'><b> ".number_format($beli,0,",",".")."</b></td>
                    <td class='tdborder' align='right'> <b>".number_format($pph,0,",",".")."</b></td>
                    <td class='tdborder' align='right'> <b>".number_format($bayar,0,",",".")."</b></td>
                    <td class='tdborder' align='center'>&nbsp;</td>
				</tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad' style='vertical-align:top'>e.</td>
					<td class='tdpad' colspan='6' style='text-align:justify'>Transfer dana untuk pembelian saham bursa tipe settlement $row->kode_setl ini dengan jumlah nominal tersebut pada kolom 5 (lima) di atas dialamatkan kepada :	
                    </td>
				</tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad' colspan='2'>1) &nbsp;&nbsp; Nama Penerima
                    </td>
                    <td class='tdpad' colspan='4'>:&nbsp;$row->nama_rek</td>
                </tr>
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad' colspan='2'>2) &nbsp;&nbsp; Nama Bank/ Cabang
                    </td>
                    <td class='tdpad' colspan='4'>:&nbsp;$row->bank</td>
                </tr>
                <tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad' colspan='2'>3) &nbsp;&nbsp; Nomor Rekening
                    </td>
                    <td class='tdpad' colspan='4'>:&nbsp;$row->no_rek</td>
                </tr>
				<tr>
                    <td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>f.</td>
					<td class='tdpad' colspan='3' style='text-align:justify'>Tanggal pembayaran/ transfer dana
                    </td>
                    <td class='tdpad' colspan='3' style='text-align:justify'>:&nbsp; ".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))." ($row->waktu_setl)
                    </td>
                </tr>
                <tr>
					<td class='tdpad' style='vertical-align:top'>2.</td>
					<td class='tdpad' colspan='7' style='text-align:justify'>Berkas/ dokumen yang berkaitan dengan pembelian saham dimaksud, kami lampirkan, dan bila terdapat kewajiban Pajak Broker mohon bantuan penyelesaian lebih lanjut.</td>
                </tr>
                <tr>
					<td class='tdpad' style='vertical-align:top'>3.</td>
					<td class='tdpad' colspan='7' style='text-align:justify'>Demikian kami sampaikan dan mohon pelaksanaannya. Atas perhatian dan kerja samanya diucapkan terima kasih.</td>
				</tr>
                <tr>
					<td class='tdpad' colspan='5'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
                <tr>
					<td class='tdpad' colspan='5'>Bandung, ".$AddOnLib->ubah_periode(substr($row->tgl_inp,6,4).substr($row->tgl_inp,3,2))."</td>
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
					<td class='tdpad' colspan='5'><b><u>$row->nama_ttd1</u></b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'><b>NIK. $row->nik_ttd1</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				</table>
				</td>
			</tr>
			  </table><br>
			  <DIV style='page-break-after:always'></DIV>";
			
			$i=$i+1;
		}
		echo"</div></body>";
		
		return "";
	}
	
}
?>
