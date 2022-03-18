<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

function fnSpasi($str)
{
	$tmp=$str;
	for ($i=1; $i<=162; $i++)
	{
		$tmp=$tmp."&nbsp;";
	}
	return $tmp;
}

class server_report_saku3_pajak_rptBukPot extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];

		$sql="select substring(b.periode,5,2) as bulan,substring(b.periode,1,4) as tahun,c.keterangan,
		isnull(p.nama,'-') as nama_rek,c.kode_pajak,d.alamat,c.npwp,e.nama as sts_pjk,case when d.flag_dosen='1' then 'Pegawai' else 'Dosen Luar Biasa' end as jenis_sdm,
		case when d.sts_wni='wni' then upper('N') else upper('Y') end as wni,
		case when c.kode_pajak='5A' then upper('Y') else upper('N') end as wni,p.nik,
		sum(c.pajak) as pajak,
		sum(case when c.nama_rek=c.nama_rek and c.kode_pajak=c.kode_pajak and d.flag_dosen='1' then c.nilai else c.nilai+c.pajak end) as nilai,
		sum(case when c.nama_rek=c.nama_rek and c.kode_pajak=c.kode_pajak and d.flag_dosen='1' then c.nilai-c.pajak else c.nilai end) as netto
from it_aju_m a
		inner join kas_m b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi
		inner join it_aju_rek c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi
		
		left join  it_dosen d on c.keterangan=d.kode_dosen and c.kode_lokasi=d.kode_lokasi
		inner join it_pegawai p on c.nama_rek=p.nama_rek and c.kode_lokasi=p.kode_lokasi
		left join  it_stspajak e on c.kode_pajak=e.kode_pajak and c.kode_lokasi=e.kode_lokasi
		where c.npwp='679307991444000'
		GROUP BY substring(b.periode,5,2),substring(b.periode,1,4),c.keterangan,
		p.nama,c.kode_pajak,d.sts_wni,p.nik,d.alamat,c.npwp,e.nama,d.flag_dosen
		order by c.keterangan
";
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
        echo "
        <style>
        body{
            font-family: Arial;
        }
        .col-isi{
            font-size:12px;
        }
        .center{
            text-align:center;
        }
        .grey{
            background:#C0C0C0;
        }
        .bold{
            font-weight:bold;
        }
        .h40{
            height:40px;
        }
        .b1{
            border:1px solid black;
        }

        .w20{
            width:20px;
        }
        .vtop{
            vertical-align:top;
        }
        .colorprint{
            -webkit-print-color-adjust: exact !important;   /* Chrome, Safari */
        color-adjust: exact !important;
        }  
        </style>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo "<div align='center' class='colorprint'>"; 
		// echo $AddOnLib->judul_laporan("REKAP DETAIL HONOR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='800px' style='border-collapse:collapse'>
        <tr>
            <td width='20'  style='border-bottom: 1px dotted #000000'>&nbsp;</td>
            <td style='border-bottom: 1px dotted #000000' colspan=13 height='20' valign=middle><b><span style='font-family:Arial;color:#969696'>a r e a   s t a p l e s</span></b></td>
            <td width='20'  style='border-bottom: 1px dotted #000000'>&nbsp;</td>
        </tr>
        <tr>
            <td></td>
            <td style='background:black;height:10px;width:20px'></td>
            <td></td>
            <td></td>
            <td style='border-right: 2px solid black;'></td>
            <td></td>
            <td></td>
            <td></td>
            <td style='border-right: 2px solid black;'></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style='background:black;height:10px;width:20px'></td>
            <td></td>
        </tr>
        <tr>
            <td width='20'  >&nbsp;</td>
            
            <td width='240' colspan='4' style='text-align:center;border-right: 2px solid black;'><img height='90' src='http://simkug.ypt.or.id/image/logo_menkeu.png'></img></td>
            
            <td width='300' height='90' colspan='4' style='font-size:14px;text-align:center;font-weight:bold;vertical-align: top;border-right: 2px solid black;border-bottom: 2px solid black;'>BUKTI PEMOTONGAN PAJAK<br>
            PENGHASILAN PASAL 21 (TIDAK FINAL)<br>
            ATAU PASAL 26</td>
            <td width='240' height='90' colspan='5' style='vertical-align:top;border-bottom: 2px solid black;'>
                <table width='100%' style='padding-top:5px'>
                    <tr>
                        <td width='140'></td>
                        <td style='background:black;height:10px;width:15px'></td>
                        <td style='border:1px solid black;height:10px;width:15px'></td>
                        <td style='background:black;height:10px;width:15px'></td>
                        <td style='border:1px solid black;height:10px;width:15px'></td>
                    </tr>
                    <tr>
                        <td colspan='5' style='text-align:right;font-size:14px;font-weight:bold'>FORMULIR 1721 - VI</td>
                    </tr>
                    <tr>
                    <td colspan='5' style='font-size:10px'> Lembar ke-1 : untuk Penerima Penghasilan</td>
                    </tr>
                    <tr>
                    <td colspan='5' style='font-size:10px'> Lembar ke-2 : untuk Pemotong</td>
                    </tr>
                </table>
            </td>        
        </tr>
        <tr>
            <td ></td>
            <td colspan='4' style='font-size:14px;text-align:center;border-right: 2px solid black;'>KEMENTERIAN KEUANGAN RI</td>
            <td colspan='9' rowspan='2' style='font-size:14px;border-bottom: 2px solid black;font-weight:bold'><span style='padding-left:20px'>NOMOR: <sub><span style='color:#969696;font-size:10px'>H.01</span></sub> 1. 3 - _________ - _________ - __________________</span></td>
            <td ></td>
        </tr>
        <tr>
            <td ></td>
            <td colspan='4' style='font-size:14px;text-align:center;border-right: 2px solid black;border-bottom: 2px solid black;'>DIREKTORAT JENDERAL PAJAK</td>
            <td ></td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 valign=bottom height=25 style='font-size:14px;font-weight:bold'>A. IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG</td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 style='border:2px solid black;padding:5px'>
                <table width='100%' cellpadding='4'>
                    <tr>
                        <td class='col-isi'>1.</td>
                        <td class='col-isi'>NPWP</td>
                        <td class='col-isi'>:</td>
                        <td class='col-isi'><sub><span style='color:#969696;font-size:10px'>A.01</span></sub></td>
                        <td class='col-isi' colspan='2'>________________________-________-________</td>
                        <td class='col-isi'>2.</td>
                        <td class='col-isi' colspan='4'>NIK/NO. PASPOR : <sub><span style='color:#969696;font-size:10px'>A.02</span></sub> ______________________</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>2.</td>
                        <td class='col-isi'>NAMA</td>
                        <td class='col-isi'>:</td>
                        <td class='col-isi'><sub><span style='color:#969696;font-size:10px'>A.03</span></sub></td>
                        <td class='col-isi' colspan=8><ins>".fnSpasi($row->nama_rek)."</ins></td>
                    </tr>
                    <tr>
                        <td class='col-isi'>3.</td>
                        <td class='col-isi'>ALAMAT</td>
                        <td class='col-isi'>:</td>
                        <td class='col-isi'><sub><span style='color:#969696;font-size:10px'>A.04</span></sub></td>
                        <td class='col-isi' colspan=8>______________________________________________________________________________________</td>
                    </tr>
                    <tr>
                        <td class='col-isi'></td>
                        <td class='col-isi'></td>
                        <td class='col-isi'></td>
                        <td class='col-isi'></td>
                        <td class='col-isi' colspan=8>______________________________________________________________________________________</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>5.</td>
                        <td class='col-isi' colspan='5'>WAJIB PAJAK LUAR NEGERI : <sub><span style='color:#969696;font-size:10px'>A.05</span></sub> <span style='border:1px solid black;width: 20px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> YA</td>
                        <td class='col-isi'>6.</td>
                        <td class='col-isi' colspan='3'>KODE NEGARA DOMISILI : <sub><span style='color:#969696;font-size:10px'>A.06</span></sub></td> 
                        <td class='col-isi'>____________</td>
                    </tr>
                    <tr></tr>
                    <tr></tr>
                    <tr></tr>
                </table>
            </td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 valign=bottom height=25 style='font-size:14px;font-weight:bold'>B. PPh PASAL 21 DAN/ATAU PASAL 26 YANG DIPOTONG</td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13>
                <table width='100%' height='100%' style='border-collapse:collapse' border=1>
                    <tr>
                        <td class='col-isi center bold'>KODE OBJEK PAJAK</td>
                        <td class='col-isi center bold'>JUMLAH <br>PENGHASILAN BRUTO <br>(Rp)</td>
                        <td class='col-isi center bold'>DASAR PENGENAAN <br>PAJAK <br>(Rp)</td>
                        <td class='col-isi center bold'>TARIF LEBIH <br>TINGGI 20% <br>(TIDAK BER-NPWP)</td>
                        <td class='col-isi center bold'>TARIF(%)</td>
                        <td class='col-isi center bold'>PPh DIPOTONG <br> (RP)</td>
                    </tr>
                    <tr>
                        <td class='col-isi center grey bold'>(1)</td>
                        <td class='col-isi center grey bold'>(2)</td>
                        <td class='col-isi center grey bold'>(3)</td>
                        <td class='col-isi center grey bold'>(4)</td>
                        <td class='col-isi center grey bold'>(5)</td>
                        <td class='col-isi center grey bold'>(6)</td>
                    </tr>
                    <tr>
                        <td class='col-isi center bold h40'> <span class='bold'>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span></td>
                        <td class='col-isi center bold h40'></td>
                        <td class='col-isi center bold h40'></td>
                        <td class='col-isi center bold h40'></td>
                        <td class='col-isi center bold h40'><span class='b1 w20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
                        <td class='col-isi center bold h40'></td>
                    </tr>
                </table>
            </td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 valign=bottom height=25 style='font-size:14px;font-weight:bold'>C. IDENTITAS PEMOTONG</td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 style='border:1px solid black;padding:5px'>
            <table width='100%' cellpadding='4' >
                    <tr>
                        <td class='col-isi vtop'>1.</td>
                        <td class='col-isi vtop'>NPWP</td>
                        <td class='col-isi vtop'>:</td>
                        <td class='col-isi vtop'><sub><span style='color:#969696;font-size:10px'>C.01</span></sub></td>
                        <td class='col-isi vtop' colspan='2'>_____________________-______-______</td>
                        <td class='col-isi vtop'>3.</td>
                        <td class='col-isi vtop' >TANGGAL & TANDA TANGAN	: </td>
                        <td class='col-isi vtop b1' colspan='3' style='height:60px;width:150px' rowspan='2'></td>
                    </tr>
                    <tr>
                        <td class='col-isi'>2.</td>
                        <td class='col-isi'>NAMA</td>
                        <td class='col-isi'>:</td>
                        <td class='col-isi'><sub><span style='color:#969696;font-size:10px'>C.02</span></sub></td>
                        <td class='col-isi' colspan=3>______________________________________</td>
                        <td><sub><span style='color:#969696;font-size:10px'>C.03</span></sub> ____-____-______<br><span class='bold' style='font-size:10px;padding-left:30px'>[dd-mm-yyyy]</span></td>
                    </tr>
                </table>
            </td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr><td width='20' >&nbsp;</td></tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 class='grey b1' valign=bottom height=25 style='font-size:14px;font-weight:bold'>KODE OBJEK PAJAK PENGHASILAN PASAL 21 (TIDAK FINAL) ATAU PASAL 26</td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td width='20' >&nbsp;</td>
            <td colspan=13 class='b1' valign=bottom height=25 style='font-size:14px;padding:5px'>
                <table width='100%'>
                    <tr>
                        <td>&nbsp;</td>
                        <td colspan='2' class='bold'>PPh PASAL 21 TIDAK FINAL</td>
                    </tr>
                    <tr>
                        <td class='col-isi' width='5%'>1.</td>
                        <td class='col-isi' width='10%'>21-100-03</td>
                        <td class='col-isi' width='85%'>Upah Pegawai Tidak Tetap atau Tenaga Kerja Lepas</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>2.</td>
                        <td class='col-isi'>21-100-04</td>
                        <td class='col-isi'>Imbalan Kepada Distributor Multi Level Marketing (MLM)	</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>3.</td>
                        <td class='col-isi'>21-100-05</td>
                        <td class='col-isi'>Imbalan Kepada Petugas Dinas Luar Asuransi</td>	
                    </tr>
                    <tr>
                        <td class='col-isi'>4.</td>
                        <td class='col-isi'>21-100-06</td>
                        <td class='col-isi'>Imbalan Kepada Penjaja Barang Dagangan</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>5.</td>
                        <td class='col-isi'>21-100-07</td>
                        <td class='col-isi'>Imbalan Kepada Tenaga Ahli</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>6.</td>
                        <td class='col-isi'>21-100-08</td>
                        <td class='col-isi'>Imbalan Kepada Bukan Pegawai yang Menerima Penghasilan yang Bersifat Berkesinambungan</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>7.</td>
                        <td class='col-isi'>21-100-09</td>
                        <td class='col-isi'>Imbalan Kepada Bukan Pegawai yang Menerima Pengasilan yang Tidak Bersifat Berkesinambungan</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>8.</td>
                        <td class='col-isi'>21-100-10</td>
                        <td class='col-isi'>Honorarium atau Imbalan Kepada Anggota Dewan Komisaris atau Dewan Pengawas yang tidak Merangkap sebagai Pegawai Tetap</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>9.</td>
                        <td class='col-isi'>21-100-11</td>
                        <td class='col-isi'>Jasa Produksi, Tantiem, Bonus atau imbalan Kepada Mantan Pegawai</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>10.</td>
                        <td class='col-isi'>21-100-12</td>
                        <td class='col-isi'>Penarikan Dana Pensiun oleh Pegawai</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>11.</td>
                        <td class='col-isi'>21-100-13</td>
                        <td class='col-isi'>Imbalan Kepada Peserta Kegiatan</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>12.</td>
                        <td class='col-isi'>21-100-99</td>
                        <td class='col-isi'>Objek PPh Pasal 21 Tidak Final Lainnya</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td colspan='2' class='bold'>PPh PASAL 26</td>
                    </tr>
                    <tr>
                        <td class='col-isi'>1.</td>
                        <td class='col-isi'>21-100-99</td>
                        <td class='col-isi'>Imbalan Sehubungan dengan jasa, pekerjaan dan kegiatan, hadiah dan penghargaan, pensiun dan pembayaran berkala lainnya yang dipotong PPh Pasal 26</td>
                    </tr>
                </table>
            </td>
            <td width='20' >&nbsp;</td>
        </tr>
        <tr>
            <td height='100px'>&nbsp;</td>
        </tr>
        <tr>
            <td></td>
            <td style='background:black;height:10px;width:20px'></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style='background:black;height:10px;width:20px'></td>
            <td></td>
        </tr>
    </table>";
		echo "</div>";
		}
		return "";
		
	}
	
}
?>
