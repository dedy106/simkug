<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptPbSpp extends server_report_basic
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
    
    $kode_lokasi = $tmp[1];
		$sql="select a.no_pb,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai,a.nik_user,a.tanggal,
          h.logo,h.alamat,h.kota,a.nik_user,a.nik_app,f.nama as nama_user,g.nama as nama_app,substring(a.periode,1,4) as tahun
      from pbh_pb_m a
      left join karyawan f on a.nik_user=f.nik and a.kode_lokasi=f.kode_lokasi
      left join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi
      left join lokasi h on a.kode_lokasi=h.kode_lokasi
    $this->filter order by a.no_pb";
        
    $root_app="http://".$_SERVER['SERVER_NAME']."/web/server/pbh/";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
    echo "<style>
    .table-spp{
        border:0;
        border-collapse:collapse;
        width:100%;
    }
    .table-spp td, .table-spp th{
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
		
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$logo="image/".$row->logo;
			$alamat=$row->alamat;
			$nilai=$nilai+$row->nilai;
			
		echo "<div class='sai-rpt-table-export row mx-auto' style='width:80%' >
    <table class='table-spp'>
        <tr>
            <th colspan='7'><h6>YAYASAN KESEHATAN TELKOM</h6></th>
        </tr>
        <tr>
            <th colspan='7'>&nbsp;</th>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <th class='border' colspan='4' style='width:50%'>&nbsp;</th>
            <th class='border' colspan='3' style='width:50%'><h6>SURAT PERMINTAAN BAYAR (SPP)</h6></th>
        </tr>
        <tr>
            <th class='border-left border-right' colspan='4'>&nbsp;</th>
            <th class='border-left border-right' colspan='3'>&nbsp;</th>
        </tr>
        <tr>
            <td class='border-left' style='width:15%'>No. P.O</td>
            <td class='border-right' style='width:35%' colspan='3'>:</td>
            <td class='border-left' style='width:15%'>No. SPP</td>
            <td class='border-right' style='width:35%' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>Tgl. P.O</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>Tgl. SPP</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>No./Tgl.BA/Log TR</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>No./Tgl.PRPK</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>No.Dokumen</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>No.DRK/TRIW</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>No.Ref.Dok</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>Keg.Menurut DRK</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>Tgl.Dok</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>Beban Angg Thn</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        
        <tr>
            <td class='border-left'>Kode Perkiraan</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>Rekening</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        
        <tr>
            <td class='border-left'>Kode Lokasi</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'>Jenis Transaksi</td>
            <td class='border-right' colspan='2'>:</td>
        </tr>
        <tr>
            <td class='border-left'>Cost Center</td>
            <td class='border-right' colspan='3'>:</td>
            <td class='border-left'></td>
            <td class='border-right' colspan='2'></td>
        </tr>
        <tr>
            <th class='border-left border-right border-bottom' colspan='4'>&nbsp;</th>
            <th class='border-left border-right border-bottom' colspan='3'>&nbsp;</th>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='border-left text-center'>Semarang, 02.11.2021</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='border-left text-center'>Dokumen penagihan disahkan oleh:</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='border-left text-center'>Staf Keuangan</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%;height:80px' class='border-left text-center'>&nbsp;</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%;text-decoration: underline;' class='text-center border-left'>Nur Hasanah S</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='text-center border-left'>NIK. 839014</td>
            <td class='border-right' colspan='4'></td>
        </tr>
        <tr>
            <th class='border-left border-right border-bottom' colspan='7'>&nbsp;</th>
        </tr>
        <tr>
            <td colspan='7' class='border-left border-right'>Bendaharawan Kantor Pusat Yayasan Kesehatan Telkom diminta membayar uang:</td>
        </tr>
        <tr>
            <td class='border-left' style='width:15%'>Sebesar</td>
            <td class='border-right' style='width:85%' colspan='6'>:&nbsp; 20.911.592 IDR</td>
        </tr>
        <tr>
            <td class='border-left' style='width:15%'>Sebesar</td>
            <td class='border-right' style='width:85%' colspan='6'>:&nbsp; DUAPULUH JUTA SEMBILAN RATUS SEBELAS RIBU LIMA RATUS SEMBILAN PULUH</td>
        </tr>
        <tr>
            <td class='border-left' style='width:15%'>Kepada</td>
            <td class='border-right' style='width:85%' colspan='6'>:&nbsp; Imprest Fund Operasional - Area 4</td>
        </tr>
        <tr>
            <td class='border-left' style='width:15%'></td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; (Nama di rekening =drg. ADE RAFIANI. YAKES TELKOM AREA 4)</td>
        </tr>
        
        <tr>
            <td class='border-left' style='width:15%'>Alamat</td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; Semarang</td>
        </tr>
        
        <tr>
            <td class='border-left' style='width:15%'>No. Rekening</td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; 135-001-565-481</td>
        </tr>
        
        <tr>
            <td class='border-left' style='width:15%'>Bank</td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; BANK MANDIRI-Pahlawan</td>
        </tr>
        
        <tr>
            <td class='border-left' style='width:15%'>Alamat Bank</td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; Jl. Pahlawan No. 3-Semarang</td>
        </tr>
        
        <tr>
            <td class='border-left' style='width:15%'>Untuk Pembayaran</td>
            <td class='border-right' style='width:85% 'colspan='6'>:&nbsp; Pengajuan Reimburse IF Ops tgl. 02 Nov 2021</td>
        </tr>
        <tr>
            <td colspan='7' class='border-left border-right'>Semarang, 02.11.2021</td>
        </tr>
        <tr>
            <td colspan='7' class='border-left border-right'>Fiatur:</td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='text-center border-left'>Asman Kug dan Umum</td>
            <td colspan='4' class='border-right'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%;height:80px' class='text-center border-left'>&nbsp;</td>
            <td colspan='4' class='border-right'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%;text-decoration: underline;' class='text-center border-left'>Siti Zulaekhah</td>
            <td colspan='4' class='border-right'></td>
        </tr>
        <tr>
            <td colspan='3' style='width:30%' class='text-center border-left'>NIK. 690399</td>
            <td colspan='4' class='border-right'></td>
        </tr>
        <tr>
            <th class='border-left border-right border-bottom' colspan='7'>&nbsp;</th>
        </tr>
        <tr>
            <td colspan='4' style='font-weight:bold;text-decoration:underline;font-size:0.85rem !important' class='border-left border-right'>Catatan Pembayaran:</td>
            <td colspan='3' style='font-weight:bold;text-decoration:underline;font-size:0.85rem !important' class='border-right'>Catatan Penerimaan:</td>
        </tr>
        <tr>
            <td class='border-left'>Jumlah Tagihan  :</td>
            <td></td>
            <td class='text-right'>20.911.592</td>
            <td class='border-right'>IDR</td>
            <td></td>
            <td></td>
            <td class='border-right'></td>
        </tr>
        <tr>
            <td class='border-left'>Potongan</td>
            <td></td>
            <td></td>
            <td class='border-right'></td>
            <td colspan='3' class='border-right'>Telah diterima uang sejumlah: </td>
        </tr>
        <tr>
            <td class='border-left border-right' colspan='4'></td>
            <td colspan='3' class='border-right'>Terbilang: </td>
        </tr>
        <tr>
            <td class='border-left border-right' colspan='4'></td>
            <td colspan='3' class='border-right' >Semarang, ...............</td>
        </tr>
        <tr>
            <td colspan='4' class='border-left border-right' style='height:80px'></td>
            <td colspan='3' class='border-right'></td>
        </tr>
        <tr>
            <td colspan='4' class='border-left border-right'></td>
            <td colspan='3' class='border-right'>NIK.</td>
        </tr>
        <tr>
            <td class='border-left'>Jumlah Potongan :</td>
            <td></td>
            <td class='text-right'>0 </td>
            <td class='border-right'>IDR</td>
            <td class='border-right' colspan='3'></td>
        </tr>
        <tr>
            <td colspan='2' class='border-left'>Jumlah Yang Dibayarkan :</td>
            <td class='text-right'>20.911.592</td>
            <td class='border-right'>IDR</td>
            <td class='border-right' colspan='3'></td>
        </tr>
        <tr>
            <th class='border-left border-right border-bottom' colspan='4'>&nbsp;</th>
            <th class='border-left border-right border-bottom' colspan='3'>&nbsp;</th>
        </tr>
        <tr>
            <td colspan='4' style='font-weight:bold;text-decoration:underline;font-size:0.85rem !important' class='border-left border-right'>Catatan Perpajakan</td>
            <td colspan='3' style='font-weight:bold;text-decoration:underline;font-size:0.85rem !important' class='border-right'>Catatan Pembendaharaan</td>
        </tr>
        <tr>
            <td colspan='4' class='border-left border-right' style='height:100px'></td>
            <td colspan='3' class='border-right'></td>
        </tr>
        <tr>
            <th class='border-left border-right border-bottom' colspan='4'>&nbsp;</th>
            <th class='border-left border-right border-bottom' colspan='3'>&nbsp;</th>
        </tr>
        <tr> 
            <td colspan='7' style='font-style:italic;'>Disclaimer Clause :</td>
        </tr>
        <tr>
            <td colspan='7' style='font-style:italic;text-align: justify;'>
            Dokumen ini di-approve sesuai dengan dokumen yang seharusnya (kebenaran formil). Apabila ditemukan dokumen yang berbeda dengan dokumen yang seharusnya, maka hal tersebut bukan menjadi tanggung jawab pemberi approval.
            </td>
        </tr>
    </table>
      </div>
      <br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
}
?>
