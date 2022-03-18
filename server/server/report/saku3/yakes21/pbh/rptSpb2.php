<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptSpb2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select 1 ";
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
		$sql="select a.no_spb,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,f.kota,a.nilai,
       a.nik_user,b.nama as nama_user,a.nik_bdh,c.nama as nama_bdh,a.nik_sah as nik_ver,d.nama as nama_ver,a.nik_fiat,e.nama as nama_fiat,
	  convert(varchar,a.tanggal,103) as tgl,f.logo,f.alamat,f.nama as nama_lokasi,f.kota
from spb_m a
inner join lokasi f on a.kode_lokasi=f.kode_lokasi
left join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_bdh=c.nik and a.kode_lokasi=c.kode_lokasi
left join karyawan d on a.nik_sah=d.nik and a.kode_lokasi=d.kode_lokasi
left join karyawan e on a.nik_fiat=e.nik and a.kode_lokasi=e.kode_lokasi $this->filter";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$logo="image/tu.jpg";
    echo "<style>
    .table-spb{
        border:1px solid black;
        border-collapse:collapse;
        width:100%;
    }
    .table-spb td, .table-spb th{
        padding:2px 8px !important;
    }
    .border{
        border:1px solid black !important;
    }
    .border-left{
        border-left:1px solid black !important;
    }
    .border-right{
        border-right:1px solid black !important;
    }
    .border-top{
        border-top:1px solid black !important;
    }
    .border-bottom{
        border-bottom:1px solid black !important;
    }
</style>";
		echo "<div align='center'>"; 
	

		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nama_lokasi=strtoupper($row->nama_lokasi);
		echo "<div class='sai-rpt-table-export row mx-auto' style='width:80%' >
    <table class='table-spb'>
        <tr>
            <th colspan='15'>YAYASAN KESEHATAN PEGAWAI TELKOM</th>
        </tr>
        <tr>
            <th colspan='15'>KANTOR PUSAT</th>
        </tr>
        <tr>
            <th colspan='15'>JL. CISANGGARUNG NO. 2 BANDUNG</th>
        </tr>
        <tr>
            <th colspan='15'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='15' class='text-center'><h6>SURAT PERINTAH BAYAR (SPB)</h6></th>
        </tr>
        <tr>
            <th colspan='15'>&nbsp;</th>
        </tr>
        <tr>
            <td colspan='15' class='border-left border-bottom border-right'></td>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>&nbsp;</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th width='3%'>1</th>
            <th width='17%'>Nomor DRK</th>
            <th width='2%'>:</th>
            <th width='28%' colspan='4' class='border-right'></th>
            <th width='3%'>5</th>
            <th width='17%' colspan='2'>Beban Anggaran</th>
            <th width='2%'>:</th>
            <th width='15%'>Triwulan ...</th>
            <th width='5%'>Th</th>
            <th width='2%'>:</th>
            <th width='6%'>2021</th>
        </tr>
        <tr>
            <th width='3%'>2</th>
            <th width='17%'>Nama Kegiatan</th>
            <th width='2%'>:</th>
            <th width='28%' colspan='4' class='border-right'>Pembayaran Mitra Yakes Telkom Area 1 sd 7 Periode Tanggal 28 Agustus 2021</th>
            <th width='3%'>6</th>
            <th width='17%' colspan='2'>Kode Lokasi PP</th>
            <th width='2%'>:</th>
            <th width='15%'>Bidang Keuangan</th>
            <th width='5%'></th>
            <th width='2%'></th>
            <th width='6%'></th>
        </tr>
        <tr>
            <th width='3%'>3</th>
            <th width='17%'>Nomor Akun</th>
            <th width='2%'>:</th>
            <th width='28%' colspan='4' class='border-right'></th>
            <th width='3%'>7</th>
            <th width='17%' colspan='2'>Kode Penunjukan Pesanan</th>
            <th width='2%'>:</th>
            <th width='15%'>-</th>
            <th width='5%'></th>
            <th width='2%'></th>
            <th width='6%'></th>
        </tr>
        <tr>
            <th width='3%'>4</th>
            <th width='17%'>Nama Akun</th>
            <th width='2%'>:</th>
            <th width='28%' colspan='4' class='border-right'></th>
            <th width='3%'></th>
            <th width='17%' colspan='2'></th>
            <th width='2%'></th>
            <th width='15%'></th>
            <th width='5%'></th>
            <th width='2%'></th>
            <th width='6%'></th>
        </tr>
        <tr>
            <th colspan='7' class='border-right border-bottom'>&nbsp;</th>
            <th colspan='8' class='border-bottom'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>&nbsp;</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>Dokumen Penagihan Berdasarkan :</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;Bandung,</th>
            <th colspan='2' class=''>&nbsp;&nbsp;&nbsp;20/12/2021 14:38</th>
            <th colspan='2' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th >1</th>
            <th colspan='6' class='border-right'>&nbsp;PDF</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='4' class=''>&nbsp;Disahkan oleh :</th>
            <th colspan='2' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th >2</th>
            <th colspan='6' class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;PGS MGR PERBENDAHARAAN</th>
        </tr>
        <tr>
            <th >3</th>
            <th colspan='6' class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th style='height:70px'></th>
            <th colspan='6' class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th ></th>
            <th colspan='6' class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' style='text-decoration:underline'>&nbsp;INNE DWI WIDYA RATNA ERNAWATI</th>
        </tr>
        <tr>
            <th ></th>
            <th colspan='6' class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;NIK : 750061</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right border-bottom'>&nbsp;</th>
            <th colspan='8' class='border-bottom'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>&nbsp;</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>Bendaharawan / Pemegang Kas Yayasan Kesehatan Pegawai Telkom Kantor Pusat Diminta Untuk Membayarkan Uang :</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='2'>Sebesar</th>
            <th class=''>:</th>
            <th class=''>Rp</th>
            <th colspan='2' class=''>8.345.938.419</th>
            <th class='border-right'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;Fiatur</th>
        </tr>
        
        <tr>
            <th colspan='2'>Terbilang</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4' rowspan='2'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;SM KEUANGAN</th>
        </tr>
        <tr>
            <th colspan='2'></th>
            <th class=''>:</th>
            <th class='' colspan='4'>&nbsp;</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='2'>Kepada</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4'>&nbsp;Mitra YAKES-TELKOM</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='2'>Alamat</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4'>&nbsp;Terlampir</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' style='text-decoration:underline'>&nbsp;LINA HERLIANA</th>
        </tr>
        <tr>
            <th colspan='2'>No. Rekening</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4'>&nbsp;Terlampir</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6'>&nbsp;NIK : 660259</th>
        </tr>
        <tr>
            <th colspan='2'>Pada Bank</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4'>&nbsp;Bank Mandiri</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' style='text-decoration:underline'></th>
        </tr>
        <tr>
            <th colspan='2'>Untuk Pembayaran</th>
            <th class=''>:</th>
            <th class='border-right' colspan='4'>&nbsp;Pembayaran Mitra Yakes Telkom Area 1 sd 7
Periode Tanggal 28 Agustus 2021</th>
            <th colspan='2' class=''>&nbsp;</th>
            <th colspan='6' style='text-decoration:underline'></th>
        </tr>
        <tr>
            <th colspan='7' class='border-right border-bottom'>&nbsp;</th>
            <th colspan='8' class='border-bottom'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>&nbsp;</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='4' class='' style='text-decoration:underline'>1. Catatan Pembayaran</th>
            <th colspan='3' class='border-right text-right' style='text-decoration:underline'>Jumlah (Rp)</th>
            <th colspan='8' class='' style='text-decoration:underline'>2. Catatan Uang Muka :</th>
        </tr>
        <tr>
            <th>1)</th>
            <th>YAKES AREA</th>
            <th>I</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'>Rp. ...........</th>
            <th></th>
        </tr>
        <tr>
            <th>2)</th>
            <th>YAKES AREA</th>
            <th>II</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'>Rp. ...........</th>
            <th></th>
        </tr>
        <tr>
            <th>3)</th>
            <th>YAKES AREA</th>
            <th>III</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4' class='border-bottom'>Rp. ...........</th>
            <th></th>
        </tr>
        <tr>
            <th>4)</th>
            <th>YAKES AREA</th>
            <th>IV</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'>Rp. ...........</th>
            <th></th>
        </tr>
        <tr>
            <th>5)</th>
            <th>YAKES AREA</th>
            <th>V</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'></th>
            <th></th>
        </tr>
        <tr>
            <th>6)</th>
            <th>YAKES AREA</th>
            <th>V</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'></th>
            <th></th>
        </tr>
        <tr>
            <th>7)</th>
            <th>YAKES AREA</th>
            <th>V</th>
            <th></th>
            <th></th>
            <th>=</th>
            <th class='text-right border-right border-bottom'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'></th>
            <th></th>
        </tr>
        <tr>
            <th></th>
            <th colspan='4'>Jumlah Pembayaran Mitra</th>
            <th>=</th>
            <th class='text-right border-right'>431.258.465</th>
            <th colspan='3'></th>
            <th colspan='4'></th>
            <th></th>
        </tr>
        <tr>
            <th colspan='7' class='border-right border-bottom'>&nbsp;</th>
            <th colspan='8' class='border-bottom'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right'>&nbsp;</th>
            <th colspan='8' class=''>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='4' class='' style='text-decoration:underline'>Cara Pembayaran</th>
            <th colspan='3' class='border-right text-right' style='text-decoration:underline'></th>
            <th colspan='8' class='' style='text-decoration:underline'></th>
        </tr>
        <tr>
            <th colspan='7' class='border-right' style='text-decoration:underline'>3. Tunai</th>
            <th colspan='8' class='' style='text-decoration:underline'>4. Transfer</th>
        </tr>
        <tr>
            <th></th>
            <th colspan='4'>Telah Diterima Uang Sejumlah</th>
            <th>=</th>
            <th class='border-right'></th>
            <th ></th>
            <th >Transfer Tanggal</th>
            <th >:</th>
            <th colspan='5'></th>
        </tr>
        <tr>
            <th></th>
            <th colspan='4'></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th >No./ Tgl.GB</th>
            <th >:</th>
            <th colspan='5'></th>
        </tr>
        <tr>
            <th></th>
            <th colspan='4'></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th >Rek. Bank. No</th>
            <th >:</th>
            <th colspan='5'></th>
        </tr>
        <tr>
            <th></th>
            <th>Bandung,</th>
            <th>2021</th>
            <th></th>
            <th></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th >Bandung,</th>
            <th ></th>
            <th colspan='5'>2021</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th colspan='7'>Bendaharawan/ Pemegang Kas Yakes Pusat</th>
        </tr>
        <tr>
            <th colspan='7' style='height:40px' class='border-right'></th>
            <th colspan='8' ></th>
        </tr>
        <tr>
            <th></th>
            <th>(.............)</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th colspan='7' style='text-decoration:underline'>YANTI HERAWATI</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th class='border-right'></th>
            <th ></th>
            <th colspan='7'>NIK: 889005</th>
        </tr>
        <tr>
            <th colspan='7' class='border-right border-bottom'>&nbsp;</th>
            <th colspan='8' class='border-bottom'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='15'>&nbsp;</th>
        </tr>
        <tr>
            <th colspan='2'>5. <u>Catatan Pembukuan</u></th>
            <th colspan='2'>Tgl. Entry</th>
            <th>:</th>
            <th colspan='10'>..............</th>
        </tr>
        <tr>
            <th colspan='2'></th>
            <th colspan='2'>No. Bukti</th>
            <th>:</th>
            <th colspan='10'>..............</th>
        </tr>
    </table>
</div>";
			$i=$i+1;
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
