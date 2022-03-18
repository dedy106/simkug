<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_pbh_rptPengajuanDana extends server_report_basic
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
		$sql="select a.no_dokumen,a.kode_pp,e.nama as nama_unit,a.periode,convert(varchar,a.tanggal,103) as tgl,a.no_pb,a.kode_lokasi,a.keterangan,a.nik_tahu,b.nama as nama_tahu,
		a.nik_app,c.nama as nama_app,substring(a.periode,1,4) as tahun,d.kota,a.tanggal,b.email,a.due_date,c.jabatan,a.nilai
        from pbh_pb_m a
        inner join karyawan b on a.nik_tahu=b.nik and a.kode_lokasi=b.kode_lokasi
		inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
        inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
        inner join lokasi d on a.kode_lokasi=d.kode_lokasi
        $this->filter
        order by a.no_pb";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<body >"; 
		// echo $AddOnLib->judul_laporan("form pengajuan dana ",null,null);
		echo "<div align='center'>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $email=$row->email;
            // $header="Pengajuan RRA - ".$row->no_pdrk;
            echo "<h3><u>FORM PENGAJUAN DANA</u></h3>
            <style>
                .isi_laporan{
                    border:1px solid black !important;
                }
                .header_laporan2{
                    border:1px solid black !important;
                    color:
                    #000000;
                    font-family: Arial;
                    font-size: 11px;
                    text-decoration: none;
                    font-weight: bold;
                    padding: 3px;
                }

                .kotak td{
                    padding:4px !important;
                }
            </style>";
			echo "<table  border='0' cellspacing='0' cellpadding='0' class='kotak'>
            <tr>
                <td colspan='10' style='padding:5px'>
                    <table width='622' border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                        <td width='110' class='header_laporan'>NOMOR</td>
                        <td width='496' class='header_laporan'>:&nbsp;$row->no_dokumen</td>
                    </tr>
                    <tr>
                        <td class='header_laporan'>UNIT/MANAGER </td>
                        <td class='header_laporan'>:&nbsp;$row->nama_unit</td>
                        </tr>
                    <tr>
                        <td class='header_laporan'>JENIS ANGGARAN </td>
                        <td class='header_laporan'>:&nbsp;Operasional</td>
                        </tr>
                    
                    <tr>
                        <td class='header_laporan'>KLASIFIKASI ANGGARAN</td>
                        <td class='header_laporan'>:&nbsp;Rutin/Non Rutin</td>
                    </tr>
                    <tr>
                        <td class='header_laporan'>NILAI ANGGARAN</td>
                        <td class='header_laporan'>:&nbsp;".number_format($row->nilai,0,",",".")."</td>
                    </tr>
                    <tr>
                        <td class='header_laporan'>SIFAT</td>
                        <td class='header_laporan'>:&nbsp;Segera/Biasa</td>
                    </tr>
                    <tr>
                        <td class='header_laporan'>KEGIATAN</td>
                        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
                    </tr>
                    <tr>
                        <td class='header_laporan'>WAKTU PELAKSANAAN</td>
                        <td class='header_laporan'>:&nbsp;".substr($row->due_date,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->due_date),0,6))."</td>
                    </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan='10' style='padding:10px !important'>
                <table width='700' border='1' cellspacing='2' cellpadding='1' class='kotak'>
                <tr bgcolor='#CCCCCC'>
                    <td width='20' align='center' class='header_laporan2'>NO</td>
                    <td width='80' align='center' class='header_laporan2'>NAMA AKUN</td>
                    <td width='300' align='center' class='header_laporan2'>URAIAN</td>
                    <td width='60' align='center' class='header_laporan2'>VOL</td>
                    <td width='90' align='center' class='header_laporan2'>SATUAN</td>
                    <td width='90' align='center' class='header_laporan2'>JUMLAH</td>
                </tr>";
            $sql1="select a.kode_akun,a.periode,a.dc,a.nilai,
            b.nama as nama_akun,a.keterangan
            from pbh_pb_j a
            inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
            where a.no_pb='$row->no_pb' and a.kode_lokasi='$row->kode_lokasi'
            order by a.dc desc ";
            
            $rs1 = $dbLib->execute($sql1);
            $i=1;
            $nilai=0;
            while ($row1 = $rs1->FetchNextObject($toupper=false))
            {
                $nilai=$nilai+$row1->nilai;
                echo "<tr>
                <td align='center' class='isi_laporan'>$i</td>
                <td class='isi_laporan'>$row1->kode_akun</td>
                <td class='isi_laporan'>$row1->keterangan</td>
                <td class='isi_laporan'>1</td>
                <td class='isi_laporan'>&nbsp;</td>
                <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }
                    
            echo "<tr>
                    <td colspan='5' align='right' class='header_laporan2'>Total</td>
                    <td align='right' class='header_laporan2'>".number_format($nilai,0,",",".")."</td>
                </tr>
                <tr>
                    <td colspan='6' class='header_laporan2'>".$AddOnLib->terbilang($nilai)."</td>
                </tr>
                </table>
                </td>
            </tr>
            <tr>
                <td colspan='6' style='font-size: 11px;padding-left: 10px !important'><i>Catatan:</i></td>
            </tr>
            <tr>
                <td colspan='6' style='font-size: 11px;padding-left: 10px !important'><i>- Setiap pengajuan dana wajib melampirkan lampiran Anggaran RKA Tahun berjalan</i></td>
            </tr>
            <tr>
                <td colspan='6' style='font-size: 11px;padding-left: 10px !important'><i>- Coret yang tidak perlu</i></td>
            </tr>
            <tr>
                <td colspan='6' class='header_laporan'>&nbsp;</td>
            </tr>
            <tr>
                <td align='' colspan='10'>
                    <table border='0' cellspacing='2' cellpadding='1'>
                    <tr>
                        <td colspan='2' class='header_laporan'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
                        </tr>
                    <tr>
                        <td colspan='2' class='header_laporan'> Yayasan Taruna Bakti </td>
                    </tr>
                    <tr>
                        <td colspan='2' class='header_laporan'>$row->jabatan</td>
                    </tr>
                    <tr>
                        <td height='40'>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan='2' class='header_laporan'>$row->nama_app</td>
                    </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align='right' colspan='10'><table border='1' class='kotak' cellspacing='2' cellpadding='1'>
                    <tr>
                        <td colspan='3' class='header_laporan' style='text-align:center;border:0'>Diterima Oleh</td>
                    </tr>
                    <tr>
                        <td style='border:0'>Sekretariat</td>
                        <td style='border:0'>Tgl ___________________</td>
                        <td style='border:0'>Paraf .....................</td>
                    </tr>
                    <tr>
                        <td style='border:0'>Keuangan</td>
                        <td style='border:0'>Tgl ___________________</td>
                        <td style='border:0'>Paraf .....................</td>
                    </tr>
                    </table>
                </td>
            </tr>
            </table><br>";
			
			$i=$i+1;
		}
		
		
		echo"</div></body>";
		
		return "";
	}
	
}
?>
