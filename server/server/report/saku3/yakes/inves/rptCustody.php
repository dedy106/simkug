<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptCustody extends server_report_basic
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
        // $nik=$tmp[1];
		// $no_app=$tmp[2];
		
		$sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tgl_input,'%d/%m/%Y') as tgl_inp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.nama_rek,e.no_rek,e.bank, a.jab2,a.nik_ttd2,d.nama as nama_ttd2,e.alamat,a.kode_setl,f.nama as jenis_setl
		from inv_shmbeli_m a
		inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_ttd2=d.nik and a.kode_lokasi=d.kode_lokasi
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
				padding: 3px;
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
					<td width='496' colspan='3' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>Bandung,  ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>Kepada Yth, </td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'><b>$row->pic</b></td>
				</tr>
				<tr>
					<td  colspan='3' class='tdpad'>$row->alamat						
					</td>
					<td  colspan='2' class='tdpad'>&nbsp;					
					</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>
					<b>Perihal : Penerimaan Saham</b>				
					</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>
					&nbsp;			
					</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>
					Dengan hormat, 		
					</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'>
					&nbsp;			
					</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad' style='text-align: justify;'>
					Dengan ini kami instruksikan agar $row->pic melaksanakan penyelesaian transaksi saham untuk Yayasan Kesehatan Pegawai TELKOM (YAKES-TELKOM) dengan kondisi dan ketentuan sebagai berikut :				
					</td>
				</tr>
				<tr>
					<td class='tdpad'>1.</td>
					<td class='tdpad'>Tipe <i>Settlement</i></td>
					<td class='tdpad' colspan='3'>:&nbsp;<i>$row->jenis_setl</i></td>
				</tr>
				<tr>
					<td class='tdpad'>2.</td>
					<td class='tdpad'>Tanggal Transaksi</td>
					<td class='tdpad' colspan='3'>:&nbsp;".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
				</tr>
				<tr>
					<td class='tdpad'>3.</td>
					<td class='tdpad'>Tanggal <i>Settlement</i></td>
					<td class='tdpad' colspan='3'>:&nbsp;".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</td>
				</tr>
				<tr>
					<td class='tdpad'>4.</td>
					<td class='tdpad' colspan='4'>Nama Saham, Jumlah Saham, Nominal Pembayaran, dan Nama Broker :</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<th class='tdborder'><i>Nama Saham</i></th>
					<th class='tdborder'><i>Scriptless (Saham)</i></th>
					<th class='tdborder'><i>Nominal Pembayaran kpd Broker(Rp)</i></th>
					<th class='tdborder'></i>Nama Broker</i></th>
				</tr>";
				$sql2 = "select a.kode_saham,a.kode_broker,d.nama as nama_broker,a.jumlah,
				a.n_beli+a.komisi+a.vat+a.levi as beli,a.pph,c.nama as nama_saham,
				a.n_beli-a.komisi+a.vat+a.levi-a.pph as bayar
				from inv_shmbeli_d a
				inner join inv_broker d on a.kode_broker=d.kode_broker
				left join inv_saham c on a.kode_saham=c.kode_saham
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
					<td>&nbsp;</td>
					<td class='tdborder'>$row2->kode_saham - $row2->nama_saham</td>
					<td class='tdborder' style='text-align:right'>".number_format($row2->jumlah,0,",",".")."</td>
					<td class='tdborder' style='text-align:right'>".number_format($row2->bayar,0,",",".")."</td>
					<td class='tdborder' width='150'>$row2->nama_broker</td>
				</tr>";
				}
				echo"
				<tr>
					<td>&nbsp;</td>
					<td class='tdborder'><b>Total</b></td>
					<td class='tdborder'>&nbsp;</td>
					<td class='tdborder' style='text-align:right'><b>".number_format($bayar,0,",",".")."</b></td>
					<td class='tdborder'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad'>5.</td>
					<td class='tdpad'>Saham tersebut dibukukan</td>
					<td class='tdpad' colspan='3'>:&nbsp;$row->nama</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'>Dana untuk settlement pembelian saham secara $row->kode_setl di atas akan kami transfer ke :</td>
				</tr>
				<tr>
					<td class='tdpad'>~</td>
					<td class='tdpad'>Nama Rekening</td>
					<td class='tdpad' colspan='2'>:&nbsp;$row->nama_rek</td>
				</tr>
				<tr>
					<td class='tdpad'>~</td>
					<td class='tdpad'>Nomor Rekening</td>
					<td class='tdpad' colspan='2'>:&nbsp;$row->no_rek</td>
				</tr>
				<tr>
					<td class='tdpad'>~</td>
					<td class='tdpad'>Nama Bank</td>
					<td class='tdpad' colspan='2'>:&nbsp;$row->bank</td>
				</tr>
				<tr >
					<td class='tdpad' colspan='5' style='text-align: justify;'>Demikian disampaikan untuk pelaksanaan lebih lanjut dan setelah selesai transaksi mohon diinformasikan kepada kami pada kesempatan pertama. Atas perhatian dan kerja sama Saudara, kami ucapkan terima kasih.</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='5'>Hormat kami,</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='2'>YAKES-TELKOM</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='2' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
					<td class='tdpad' height='80px'>&nbsp;</td>
				</tr>
				<tr>
					<td class='tdpad' colspan='2'><b><u>$row->nama_ttd1</u></b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;<b><u>$row->nama_ttd2</u></b></td>
				</tr>
				<tr>
					<td class='tdpad' colspan='2'><b>$row->jab1</b></td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;</td>
					<td class='tdpad'>&nbsp;<b>$row->jab2</b></td>
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
