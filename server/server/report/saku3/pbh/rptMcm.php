<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_rptMcm extends server_report_basic
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
        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $no_app=$tmp[2];
        $status=$tmp[3];
				$jenis=$tmp[4];
				$kode_pp=$tmp[5];
		$sql="select a.periode,a.kode_lokasi,a.no_spb,convert(varchar,a.tanggal,103) as tgl,convert(varchar,a.due_date,103) as due_date,a.keterangan,a.nilai,a.no_dokumen,a.nik_fiat,b.nama as nama_ketua,a.nik_bdh,c.nama as nama_bdh,d.nama as nama_gm,e.nama as nama_mk,f.nama as nama_buat,a.no_cek 
		from spb_m a
		left join karyawan b on a.nik_fiat=b.nik and a.kode_lokasi=b.kode_lokasi
		left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_gm=d.nik and a.kode_lokasi=d.kode_lokasi
		left join karyawan e on a.nik_sah=e.nik and a.kode_lokasi=e.kode_lokasi
		left join karyawan f on a.nik_buat=f.nik and a.kode_lokasi=f.kode_lokasi
        $this->filter
        order by a.no_spb";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
        echo "<body >
        <style>
            .border{
                border: 1px solid black;
            }
            .no-border{
                border:none;
            }
        </style>
        "; 
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $email=$row->email;
			// $header="Pengajuan RRA - ".$row->no_pdrk;
		echo "<table border='0' cellspacing='2' cellpadding='1' width='1200' style='border-collapse:collapse'>
                    <tr>
                        <td class='header_laporan' colspan='8'>LAPORAN LEMBAR PENGESAHAN PENCAIRAN DPC</td>
                        <td class='header_laporan' colspan='3' align='center' >YAYASAN TARUNA BAKTI</td>
                    </tr>
                    <tr>
                        <td class='header_laporan' colspan='8'>DPC $row->no_dokumen</td>
                        <td class='header_laporan' colspan='3' align='center'>JL IL.RE. MARTADINATA NO. 52</td>
                    </tr>
                    <tr>
                        <td class='header_laporan' colspan='8'>Cek No. $row->no_cek</td>
                        <td class='header_laporan' colspan='3' align='center'>Telp. (022) 4203206</td>
                    </tr>
                    <tr >
                        <td align='center' class='header_laporan' coslpan='11'>&nbsp;</td>
                    </tr>
                    <tr >
                        <td align='center' class='header_laporan border'>1</td>
                        <td align='center' class='header_laporan border'>2</td>
                        <td align='center' class='header_laporan border' colspan='3'>3</td>
                        <td align='center' class='header_laporan border' colspan='2'>4</td>
                        <td align='center' class='header_laporan border' colspan='2'>5</td>
                        <td align='center' class='header_laporan border'>6</td>
                        <td align='center' class='header_laporan border'>7</td>
                    </tr>
                    <tr>
                        <td colspan='11' class='header_laporan border' align='left'>Biaya Gabungan</td>
                    </tr>
                    <tr>
                        <td align='center' class='header_laporan border' rowspan='2' width='30'>No</td>
                        <td align='center' class='header_laporan border' rowspan='2' width='100'>No Account</td>
                        <td align='center' class='header_laporan border' rowspan='2' width='350' colspan='3'>Keterangan</td>
                        <td align='center' class='header_laporan border' colspan='2' width='240'>Anggaran</td>
                        <td align='center' class='header_laporan border' colspan='2' width='240'>Penyerapan Anggaran</td>
                        <td align='center' class='header_laporan border' rowspan='2' width='120'>Pencairan <br> DPC</td>
                        <td align='center' class='header_laporan border' rowspan='2' width='120'>Saldo</td>
                    </tr>
                    <tr>
                        <td align='center' class='header_laporan border' width='120'>RKA</td>
                        <td align='center' class='header_laporan border' width='120'>NON RKA</td>
                        <td align='center' class='header_laporan border' width='120'>RKA</td>
                        <td align='center' class='header_laporan border' width='120'>NON RKA</td>
                    </tr>";
                    $sql1="
                    select a.no_dokumen,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,nilai,a.keterangan from spb_j a 
                    where a.no_spb='$row->no_spb' and a.kode_lokasi='$row->kode_lokasi'
                    order by a.dc desc ";
                    // echo $sql1;
                    
                    $rs1 = $dbLib->execute($sql1);
                    $i=1;
                    $nilai=0;
                    $kredit=0;
                    while ($row1 = $rs1->FetchNextObject($toupper=false))
                    {
                        $nilai=$nilai+$row1->nilai;
                        echo "<tr>
                        <td align='center' class='isi_laporan border'>$i</td>
                        <td class='isi_laporan border'>$row1->kode_akun</td>
                        <td class='isi_laporan border' colspan='3'>$row1->keterangan</td>
                        <td align='right' class='isi_laporan border'>".number_format($row1->nilai,0,",",".")."</td>
                        <td align='right' class='isi_laporan border'>".number_format(0,0,",",".")."</td>
                        <td align='right' class='isi_laporan border'>".number_format($row1->nilai,0,",",".")."</td>
                        <td align='right' class='isi_laporan border'>".number_format(0,0,",",".")."</td>
                        <td align='right' class='isi_laporan border'>".number_format($row1->nilai,0,",",".")."</td>
                        <td align='right' class='isi_laporan border'>".number_format($row1->nilai,0,",",".")."</td>
                        </tr>";
                        $i=$i+1;
                    } 
                echo "
                    <tr>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border' colspan='3'>&nbsp</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                        <td align='right' class='header_laporan border'>".number_format($nilai,0,",",".")."</td>
                        <td align='right' class='header_laporan border'>&nbsp</td>
                    </tr>
                    <tr>
                        <td colspan='11'></td>
                    </tr>
                    <tr>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan' colspan='3'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='left' class='header_laporan border'>Subtotal</td>
                        <td align='right' class='header_laporan border'>".number_format($nilai,0,",",".")."</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                    </tr>
                    <tr>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan' colspan='3'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='left' class='header_laporan border'>Pembualatan</td>
                        <td align='right' class='header_laporan border'>".number_format(0,0,",",".")."</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                    </tr>
                    <tr>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan' colspan='3'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                        <td align='left' class='header_laporan border'>Total</td>
                        <td align='right' class='header_laporan border'>".number_format($nilai,0,",",".")."</td>
                        <td align='right' class='header_laporan'>&nbsp</td>
                    </tr>
                    <tr>
                        <td colspan='11'></td>
                    </tr>
                    <tr>
                        <td align='center' class='header_laporan border' colspan='3'>Disetujui:</td>
                        <td align='center' class='header_laporan border' >Disetujui:</td>
                        <td align='center' class='header_laporan' ></td>
                        <td align='center' class='header_laporan border' colspan='2'>Diperiksa,</td>
                        <td align='center' class='header_laporan border' colspan='2'>Diperiksa,</td>
                        <td align='center' class='header_laporan border' colspan='2'>Dibuat,</td>
                    </tr>
                    <tr>
                        <td align='left' class='header_laporan border' colspan='3' height='60' style='vertical-align:bottom;border-bottom:0'></td>
                        <td align='left' class='header_laporan border' style='vertical-align:bottom;border-bottom:0'></td>
                        <td align='left' class='header_laporan' style='vertical-align:bottom;border-bottom:0'></td>
                        <td align='left' class='header_laporan border' colspan='2' style='vertical-align:bottom;border-bottom:0'></td>
                        <td align='left' class='header_laporan border' colspan='2' style='vertical-align:bottom;border-bottom:0'></td>
                        <td align='left' class='header_laporan border' colspan='2' style='vertical-align:bottom;border-bottom:0'></td>
                    </tr>
                    <tr>
                        <td align='left' class='header_laporan border' colspan='3' style='border-top:0'><u>$row->nama_ketua</u><br>Ketua Umum Pengawas YTB <br>
                        Tanggal : </td>
                        <td align='left' class='header_laporan border' style='border-top:0'><u>$row->nama_bdh</u><br>Bendahara Umum Pengurus YTB  <br>
                        Tanggal : </td>
                        <td align='left' class='header_laporan' style='border-top:0'>&nbsp;</td>
                        <td align='left' class='header_laporan border' colspan='2' style='border-top:0'><u>$row->nama_gm</u><br>General Manager YTB <br>
                        Tanggal : </td>
                        <td align='left' class='header_laporan border' colspan='2' style='border-top:0'><u>$row->nama_mk</u><br>Manager Keuangan YTB <br>
                        Tanggal : </td>
                        <td align='left' class='header_laporan border' colspan='2' style='border-top:0'><u>$row->nama_buat</u><br>Staf Verifikasi <br>
                        Tanggal : </td>
                    </tr>
            </table>
         ";
	        $i=$i+1;
		}
		echo"</div></body>";
		
		return "";
	}
	
}
?>
