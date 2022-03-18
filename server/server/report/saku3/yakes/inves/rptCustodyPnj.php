<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptCustodyPnj extends server_report_basic
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

        $sql="select a.kode_lokasi,a.no_shmjual,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.up,e.nama_rek,e.no_rek,e.bank, a.jab2,a.nik_ttd2,d.nama as nama_ttd2,e.alamat,a.kode_setl,f.nama as jenis_setl,a.kode_bank,g.nama as nama_bank,g.nama_rek as nama_rek_bank,g.alamat as alamat_bank,g.no_rek as no_rek_bank
		from inv_shmjual_m a
		inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_ttd2=d.nik and a.kode_lokasi=d.kode_lokasi
		left join inv_kustodi e on a.kode_kustodi=e.kode_kustodi
		left join inv_jenis_setl f on a.kode_setl =f.kode_setl
		left join inv_bank g on a.kode_bank=g.kode_bank
		$this->filter order by a.no_shmjual";

		// echo $sql;
		
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
				padding:3px;
			}
			.tdpad{
				padding: 3px;
			}
			</style>
			<table  border='0' cellspacing='0' cellpadding='0' class='kotak'>
			<tr>
				<td colspan='10' style='padding:5px'>
				<table width='622' border='0' cellspacing='2' cellpadding='1' style='border-collapse: collapse;'>
				<tr>
					<td colspan='8' class='tdpad' style='font-weight:bold;font-size:20px;text-align:right'>&nbsp;</td>
				</tr>
				<tr>
					<td width='110' colspan='3' class='tdpad'>&nbsp;</td>
					<td width='496' colspan='5' class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
                    <td width='110' colspan='3' class='tdpad'>&nbsp;</td>
                    <td width='496' colspan='5' class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
                    <td colspan='3' class='tdpad'>&nbsp;</td>
                    <td width='496' colspan='5' class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td width='110' colspan='2' class='tdpad'>Nomor</td>
					<td width='496' colspan='5' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'>Bandung, ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'>Kepada Yth, </td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'><b>$row->pic $row->up</b></td>
				</tr>
				<tr>
					<td  colspan='7' class='tdpad'>$row->alamat
					</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'>
					<b>Perihal : Penyerahan Saham</b>				
					</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'>
					&nbsp;			
					</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad'>
					Dengan hormat, 		
					</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='7'>
					&nbsp;			
					</td>
				</tr>
				<tr>
					<td colspan='7' class='tdpad' style='text-align: justify;'>
					Sehubungan penjualan saham milik Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM), dengan ini kami instruksikan agar $row->pic melaksanakan penyerahan/ pelepasan saham dari Rekening Efek  Nomor : 104291, atas nama YAKES TELKOM, pada $row->pic, dengan kondisi dan ketentuan sebagai berikut :			
					</td>
				</tr>
				<tr>
					<td class='tdpad'>1.</td>
					<td class='tdpad' colspan='3'>Tipe <i>Settlement</i></td>
					<td class='tdpad' colspan='3'>:&nbsp;<b>$row->jenis_setl</b></td>
				</tr>
				<tr>
					<td class='tdpad'>2.</td>
					<td class='tdpad' colspan='3'>Tanggal Transaksi</td>
					<td class='tdpad' colspan='3'>:&nbsp;<b>".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</b></td>
				</tr>
				<tr>
					<td class='tdpad'>3.</td>
					<td class='tdpad' colspan='3'>Tanggal <i>Settlement</i></td>
					<td class='tdpad' colspan='3'>:&nbsp;<b>".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</b></td>
				</tr>
				<tr>
					<td class='tdpad'>4.</td>
					<td class='tdpad' colspan='6'>Rincian Saham dan Nominal Pembayaran :</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<th class='tdborder'>Nama Saham</th>
					<th class='tdborder'>Scriptless (Saham)</th>
                    <th class='tdborder'>Nominal Hasil Penjualan(Rp)</th>
                    <th class='tdborder'>PPh Ps 23 Komisi Broker(Rp)</th>
                    <th class='tdborder'>Nominal Hasil Penjualan + PPh Ps 23 Komisi Broker (Rp)
                    </th>
					<th class='tdborder'>Broker</th>
                </tr>
                <tr>
					<td>&nbsp;</td>
					<th class='tdborder'></i>a</i></th>
					<th class='tdborder'></i>b</i></th>
                    <th class='tdborder'></i>c</i></th>
                    <th class='tdborder'></i>d</i></th>
                    <th class='tdborder'></i>e=(c+d)</i></th>
					<th class='tdborder'></i>f</i></th>
				</tr>";
				$sql2 = "select a.kode_saham,a.kode_broker,d.nama as nama_broker,a.jumlah,
				a.n_jual-a.komisi-a.vat-a.levi as jual,a.pph,c.nama as nama_saham,
				a.n_jual-a.komisi-a.vat-a.levi+a.pph as bayar
				from inv_shmjual_d a
				inner join inv_broker d on a.kode_broker=d.kode_broker
				left join inv_saham c on a.kode_saham=c.kode_saham
				where a.no_shmjual='$row->no_shmjual' 
				";
				$rs2= $dbLib->execute($sql2);
				$jual=0;$pph=0;$bayar=0;
				while($row2=$rs2->FetchNextObject($toupper=false)){
					$jual+=$row2->jual;
					$pph+=$row2->pph;
					$bayar+=$row2->bayar;
				echo"
				<tr>
					<td>&nbsp;</td>
					<td class='tdborder'>$row2->kode_saham ($row2->nama_saham)			
                    </td>
					<td class='tdborder' style='text-align:right'>".number_format($row2->jumlah,0,",",".")."</td>
					<td class='tdborder' style='text-align:right'>".number_format($row2->jual,0,",",".")."</td>
					<td class='tdborder' style='text-align:right'>".number_format($row2->pph,0,",",".")."</td>
                    <td class='tdborder' style='text-align:right'>".number_format($row2->bayar,0,",",".")."</td>
                    <td class='tdborder'>$row2->nama_broker</td>
				</tr>";
				}
				echo"
                <tr>
                    <td class='tdpad'>&nbsp;</td>
					<td class='tdborder' colspan='4'><b><i>Nominal Hasil Penjualan + PPh Ps 23 Komisi Broker(Rp)</i></b></td>
					<td class='tdborder' style='text-align:right'><b><i>".number_format($bayar,0,",",".")."</i></b></td>
					<td class='tdborder'>&nbsp;</td>
				</tr>
				<tr>
                    <td class='tdpad' colspan='7'>Dana hasil settlement penjualan saham termasuk PPh Ps 23 Komisi Broker (butir 4 kolom e) secara $row->kode_setl di atas agar ditransfer ke rekening  giro YAKES-TELKOM sebagai berikut :
                    </td>
				</tr>
				<tr>
					<td class='tdpad'>~</td>
					<td class='tdpad' colspan='3'>Nama Bank</td>
					<td class='tdpad' colspan='3'>:&nbsp;$row->nama_bank </td>
				</tr>
				<tr>
                    <td class='tdpad'>~</td>
                    <td class='tdpad' colspan='3'>Alamat Bank</td>
                    <td class='tdpad' colspan='3'>:&nbsp;$row->alamat_bank </td>
				</tr>
				<tr>
					<td class='tdpad'>~</td>
					<td class='tdpad' colspan='3'>Nomor dan Nama Rekening</td>
					<td class='tdpad' colspan='3'>:&nbsp;$row->no_rek_bank atas nama $row->nama_rek_bank
                    </td>
				</tr>
				<tr >
					<td class='tdpad' colspan='7' style='text-align: justify;'>Demikian disampaikan dan mohon setelah selesai transaksi diinformasikan kepada kami pada kesempatan pertama. Atas perhatian dan kerja sama Saudara, kami ucapkan terima kasih.</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='7'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='7'>Hormat kami,</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='2'><b>YAKES-TELKOM</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='3' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='3'><b><u>$row->nama_ttd1</u></b></td>
					<td class='tdpad'>&nbsp;</td>
                    <td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='2'>&nbsp;<b><u>$row->nama_ttd2</u></b></td>
				</tr>
				<tr>
					<td class='tdpad' colspan='3'><b>$row->jab1</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad' colspan='2'>&nbsp;<b>$row->jab2</b></td>
                </tr>
                <tr>
                    <td class='tdpad' colspan='7'>&nbsp;</td>
                </tr>
                
                <tr>
                    <td class='tdpad' colspan='7'>Tembusan : Sdr. Kabid Keuangan YAKES-TELKOM</td>
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
