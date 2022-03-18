<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptSahamBeliGabung extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
// 		$sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
// 		a.kode_kelola,b.nama as nama_kelola
// from inv_shmbeli_m a
// inner join inv_kelola b on a.kode_kelola=b.kode_kelola
// $this->filter order by a.no_shmbeli";

$sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tgl_input,'%d/%m/%Y') as tgl_inp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola,a.jab1,a.nik_ttd1,c.nama as nama_ttd1,e.nama,e.pic,e.nama_rek,e.no_rek,e.bank, a.jab2,a.nik_ttd2,d.nama as nama_ttd2,e.alamat,f.nama as jenis_setl,a.kode_setl,a.waktu_setl
		from inv_shmbeli_m a
		inner join inv_kelola b on a.kode_kelola=b.kode_kelola
		left join karyawan c on a.nik_ttd1=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_ttd2=d.nik and a.kode_lokasi=d.kode_lokasi
        left join inv_kustodi e on a.kode_kustodi=e.kode_kustodi
		left join inv_jenis_setl f on a.kode_setl =f.kode_setl
		$this->filter order by a.no_shmbeli";

		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<div class='row'>
					<div class='col-md-12'><h3>PEMBELIAN SAHAM BURSA</h3></div>
				  </div>
				  <table border=0>
				  <tr>
					  <td width='150px'>TANGGAL TRANSAKSI</td>
					  <td width='10px'>:</td>
					  <td width='100px'>&nbsp;$row->tanggal</td>
				  </tr>
				  <tr>
					  <td>TANGGAL SETTLEMENT</td>
					  <td>:</td>
					  <td>&nbsp;$row->tgl_set</td>
				  </tr>
				   </table>
				  <div class='row'>
					<div class='col-md-12 text-right' style='font-size:11px;padding-right:30px'>$row->no_shmbeli/$row->nama_kelola</div>
				  </div>
                  <table class='table table-hover'>
                  
					<thead>
					  <tr>
						<th>No</th>
						<th>Nama Saham</th>
						<th>Jumlah Saham</th>
						<th>Harga Per Saham (Rp)</th>
						<th>Jumlah Harga + Biaya Transaksi (Rp)</th>
						<th>Jumlah Pembayaran - Biaya Transaksi (Rp)</th>
						<th>Broker</th>
					  </tr>
					</thead>
					<tbody>";
					 $sql1="select a.kode_saham,a.kode_broker,b.nama as nama_saham,d.nama as nama_broker,
				  a.komisi,a.vat,a.levi,a.pph,a.h_oleh,a.harga,a.jumlah,a.n_beli,a.n_beli+a.komisi+a.vat+a.levi as jual,
				  a.n_beli-a.komisi+a.vat+a.levi as bayar
			from inv_shmbeli_d a
			inner join inv_saham b on a.kode_saham=b.kode_saham
			inner join inv_saham_d c on a.kode_saham=c.kode_saham and a.kode_kelola=c.kode_kelola
			inner join inv_broker d on a.kode_broker=d.kode_broker
			where a.no_shmbeli='$row->no_shmbeli' 
			order by a.kode_saham ";
					
					$rs1 = $dbLib->execute($sql1);
					$i=0;
					$jml_saham=0;$harga=0;$komisi=0;$pph=0;$levi=0;$jumlah=0;$gainlos=0;
					while ($row1 = $rs1->FetchNextObject($toupper=false))
					{
						$jumlah+=$row1->jumlah;
						$harga+=$row1->harga;
						$jual+=$row1->jual;
						$bayar+=$row1->bayar;

						$i=$i+1;
					  echo "<tr>
						<td>$i</td>
						<td>$row1->kode_saham ($row1->nama_saham)</td>
						<td align='right'>".number_format($row1->jumlah,0,",",".")."</td>
						<td align='right'>".number_format($row1->harga,2,",",".")."</td>
						<td align='right'>".number_format($row1->jual,0,",",".")."</td>
						<td align='right'>".number_format($row1->bayar,0,",",".")."</td>
						<td>$row1->nama_broker</td>

					  </tr>";
					}
					echo "</tbody>
				  </table>
				  <br>
				  <DIV style='page-break-after:always'></DIV>
                  <div align='center' style=''>";
                  echo"<table border='0' cellspacing='0' cellpadding='0'>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>REKAPITULASI REALISASI PEMBELIAN SAHAM BURSA</td>
        </tr>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>TANGGAL TRANSAKSI : ".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
        </td>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>TANGGAL SETTLEMENT : ".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</td>
        </tr>
        <tr>
            <td style='text-align:right;font-size:10px;padding-bottom:10px'>$row->no_shmbeli/$row->nama_kelola</td>
        </tr>
        <tr>
            <td>
            <style>
            td,th{
                padding:3px
            }
            </style>";
            echo "<table border='1' cellspacing='2' cellpadding='1' class='kotak'>  
            <tr>
                <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
                <td width='200'  align='center' class='header_laporan' rowspan='2'>Nama Saham</td>
                <td width='240'  align='center' class='header_laporan' colspan='3'>Pembelian</td>
                <td width='240'  align='center' class='header_laporan' colspan='3'>Cost</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>Total Harga Pembelian  (termasuk Cost) (Rp)</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>PPh Pasal 23 atas Komisi Broker (Rp)</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>Pembayaran kepada Broker (Rp)</td>
                <td width='150'  align='center' class='header_laporan' rowspan='2'>Broker</td>
            </tr>
            <tr>
                <td  width='80' align='center' class='header_laporan'>Harga Per Lembar (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Jumlah Lembar</td>
                <td  width='80' align='center' class='header_laporan'>Total Harga Pembelian (sebelum Fee Broker & Tax) (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Komisi  Broker (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>VAT (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Biaya (Rp) </td>
            </tr> 
            <tr>
                <td  align='center' class='header_laporan'>1</td>
                <td  align='center' class='header_laporan'>2</td>
                <td  align='center' class='header_laporan'>3</td>
                <td  align='center' class='header_laporan'>4</td>
                <td  align='center' class='header_laporan'>5=3x4</td>
                <td  align='center' class='header_laporan'>6</td>
                <td  align='center' class='header_laporan'>7</td>
                <td  align='center' class='header_laporan'>8</td>
                <td  align='center' class='header_laporan'>9=5+6+7+8</td>
                <td  align='center' class='header_laporan'>10=6x2,0%</td>
                <td  align='center' class='header_laporan'>11=9-10</td>
                <td  align='center' class='header_laporan'>12</td>
            </tr> ";
            $sql2="select a.kode_saham,a.nama,round(b.harga,2) as harga,b.jumlah,b.n_beli,b.komisi,b.vat,b.levi,b.n_beli+b.komisi+b.vat+b.levi as total,b.pph,b.n_beli+b.komisi+b.vat+b.levi-b.pph as bayar, c.nama as nama_broker
            from inv_saham a
            left join inv_shmbeli_d b on a.kode_saham=b.kode_saham
            left join inv_broker c on b.kode_broker=c.kode_broker
            where b.no_shmbeli='$row->no_shmbeli' ";
    
            $rs2 = $dbLib->execute($sql2);
            $jum=0;$n_beli=0;$komisi=0;$vat=0;$levi=0;$total=0;$pph;$bayar=0;
            $nu=1;
            while ($row2 = $rs2->FetchNextObject($toupper=false))
            {
                $jum+=$row2->jum;
                $n_beli+=$row2->n_beli;	
                $komisi+=$row2->komisi;
                $vat+=$row2->vat;
                $levi+=$row2->levi;
                $pph+=$row2->pph;
                $bayar+=$row2->bayar;	
    
            echo "<tr >
                <td class='isi_laporan' align='center'>$nu</td>
                <td class='isi_laporan'>$row2->kode_saham-$row2->nama</td>
                <td class='isi_laporan' align='right'>".number_format($row2->harga,2,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row2->jumlah,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row2->n_beli,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->komisi,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->vat,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->levi,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->total,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->pph,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->bayar,0,",",".")."
                </td>
                <td class='isi_laporan'>$row2->nama_broker
                </td>
                </tr>";
                $nu++;
        
            }
            echo "<tr >
                    <td class='isi_laporan' align='center'></td>
                    <td class='isi_laporan'><b><i>TOTAL (Rp)</i><b></td>
                    <td class='isi_laporan' align='right'>&nbsp;</td>
                    <td class='header_laporan' align='right'> &nbsp;</td>
                    <td class='header_laporan' align='right'>".number_format($n_beli,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($komisi,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($vat,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($levi,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($total,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($pph,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."
                    </td>
                    <td class='header_laporan'>-
                    </td>
                    </tr>
                </table>";
        echo"</td>
        </tr>
        </table>
		<br>
		<DIV style='page-break-after:always'></DIV>";
        echo "
			<style>
			.tdborder{
				border: 1px solid black;
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
              </table><br>";
			  echo "
			  <DIV style='page-break-after:always'></DIV>
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
				<td colspan='10' style='padding:5px'>
				<table width='622' border='0' cellspacing='2' cellpadding='1' style='border-collapse: collapse;'>
				<tr>
					<td width='110' colspan='2' class='tdpad'>Nomor</td>
					<td width='496' colspan='3' class='tdpad'>:&nbsp; /KU000/YAKES-30/2019</td>
				</tr>
				<tr>
					<td colspan='5' class='tdpad'>Bandung,  August 2019</td>
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
              </div>";
                  
		
		}
		return "";
	}
	
}
?>
