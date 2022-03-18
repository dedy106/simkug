<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptSisKwitansiMulti extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql="select 1 ";
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$kode_pp=$tmp[1];
        $periode=$tmp[2];
		
		$sql="select kota from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
        $kota=$row->kota;

        
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/yspt.png";
        $path2= $path . "image/grey.png";
		
        $sql="
        select a.no_kas as no_bukti,a.tanggal,convert(varchar,a.tanggal,103) as tgl,a.periode,d.kota,a.keterangan,a.nik_app,c.nama as nama_app,c.jabatan as jab_app,b.nis,e.nama, b.nilai
                from kas_m a 
                inner join (
                    select a.no_rekon,a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from (
                        select a.no_rekon,a.nis,a.kode_lokasi,a.kode_pp,a.nilai
                        from sis_rekon_d a
                        union all
                        select a.no_bukti,a.nis,a.kode_lokasi,a.kode_pp,a.nilai
                        from sis_cd_d a
                    ) a
                    group by  a.no_rekon,a.nis,a.kode_lokasi,a.kode_pp
                ) b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                left join sis_siswa e on b.nis=e.nis and b.kode_pp=e.kode_pp and b.kode_lokasi=e.kode_lokasi
                inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
                $this->filter 
                order by a.no_kas ";
        // echo $sql;

		$rs = $dbLib->execute($sql);
        $i = 1;
        
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center' >"; 
	
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo $AddOnLib->judul_laporan("laporan kuitansi",$this->lokasi);
echo "<table width='700' border='1' cellspacing='2' cellpadding='1'  class='kotak' >
        <tr>
            <td width='105' style='vertical-align:top;text-align:center;border-right: 2px dotted black;'>
            <img src='$pathfoto' width='80px' height='30px' style='padding-top:20px;padding-bottom: 300px;'></img> <span>KUITANSI
            </span></td>
            <td width='595'>";
        echo "
                    <table width='100%'  border='0' cellspacing='0' cellpadding='1' style='padding-top:20px;margin-left:5px;padding-right:20px'>
                    <tr>
                        <td width='120' class='header_laporan' style='font-size:12px'>Nomor</td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2' class='isi_laporan' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->no_bukti</td>
                       
                    </tr>
                    <tr>
                        <td width='120' class='header_laporan' style='font-size:12px'>Telah diterima dari </td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2' class='isi_laporan' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->nis / $row->nama</td>
                    </tr>
                    <tr>
                        <td class='header_laporan' style='font-size:12px'>Uang Sejumlah</td>
                        <td width='5'>:</td>
                        <td class='isi_laporan' colspan='2' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; <i>".$AddOnLib->terbilang2($row->nilai,"Rupiah")." </i></td>
                    </tr>
                    <tr>
                        <td class='header_laporan' style='font-size:12px'>Untuk Pembayaran</td>
                        <td width='5'>:</td>
                        <td class='isi_laporan' colspan='2' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->keterangan</td>
                    </tr>
                    <tr>
                        <td class='header_laporan' height='80px' style='font-size:12px'></td>
                        <td width='5'></td>
                        <td class='isi_laporan' colspan='2' style='font-size:12px;padding:7px'>&nbsp; </td>
                    </tr>
                    <tr>
                        <td class='header_laporan' colspan='2' height='40px' style='font-size:14px;text-align:center' >Jumlah</td>
                        <td class='header_laporan' style='box-shadow: inset 0 0 0 1000px #a8a6a0;font-size:14px;padding:7px'> ".number_format($row->nilai,0,",",".")."</td>
                        <td width='300'></td>
                    </tr>
                    </table>";

                    $bln = substr($row->periode,4,2);
                    $thn = substr($row->periode,0,4);
                    $tgl = explode("/",$row->tanggal);

                    if (floatval($bln) > 12) $bln = 12;

                    $bln = $AddOnLib->ubah_bulan($bln);
                    $tanggal = $tgl[1] . " ". $bln ." ". $thn;

             echo "<table border='0' width='100%' cellspacing='0' cellpadding='0'>
                    
                    <tr>
                        <td width='10'>&nbsp;</td>
                        <td width='150' align='center' class='header_laporan'> </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td align='center' class='header_laporan' style='font-size:12px' >".$row->kota. ', '.substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))." </td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td height='80'>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td class='header_laporan' align='center' style='font-size:12px' >&nbsp;ORANG TUA / WALI</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150' class='header_laporan' align='center' style='font-size:12px'>PETUGAS</td>
                     </tr>
                </table>";
 	echo "
		</td>
  </tr>
</table>"; 
echo "<br>";
echo "<table width='700' border='0' cellspacing='2' height='150' cellpadding='1'>
<tr>
    <td width='100%'><hr></td>
</tr>
</table>";
echo "<br>";
echo "<table width='700' border='1' cellspacing='2' cellpadding='1'  class='kotak' >
        <tr>
            <td width='105' style='vertical-align:top;text-align:center;border-right: 2px dotted black;'>
            <img src='$pathfoto' width='80px' height='30px' style='padding-top:20px;padding-bottom: 300px;'></img> <span>KUITANSI
            </span></td>
            <td width='595'>";
        echo "
        <table width='100%'  border='0' cellspacing='0' cellpadding='1' style='padding-top:20px;margin-left:5px;padding-right:20px'>
        <tr>
            <td width='120' class='header_laporan' style='font-size:12px'>Nomor</td>
            <td width='5'>:</td>
            <td width='400' colspan='2' class='isi_laporan' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->no_bukti</td>
           
        </tr>
        <tr>
            <td width='120' class='header_laporan' style='font-size:12px'>Telah diterima dari </td>
            <td width='5'>:</td>
            <td width='400' colspan='2' class='isi_laporan' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->nis / $row->nama</td>
        </tr>
        <tr>
            <td class='header_laporan' style='font-size:12px'>Uang Sejumlah</td>
            <td width='5'>:</td>
            <td class='isi_laporan' colspan='2' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; <i>".$AddOnLib->terbilang2($row->nilai,"Rupiah")." </i></td>
        </tr>
        <tr>
            <td class='header_laporan' style='font-size:12px'>Untuk Pembayaran</td>
            <td width='5'>:</td>
            <td class='isi_laporan' colspan='2' style='font-size:12px;border-bottom:1px solid black;padding:7px'>&nbsp; $row->keterangan</td>
        </tr>
        <tr>
            <td class='header_laporan' height='80px' style='font-size:12px'></td>
            <td width='5'></td>
            <td class='isi_laporan' colspan='2' style='font-size:12px;padding:7px'>&nbsp; </td>
        </tr>
        <tr>
            <td class='header_laporan' colspan='2' height='40px' style='font-size:14px;text-align:center' >Jumlah</td>
            <td class='header_laporan' style='box-shadow: inset 0 0 0 1000px #a8a6a0;font-size:14px;padding:7px;-webkit-print-color-adjust: exact;'> ".number_format($row->nilai,0,",",".")."</td>
            <td width='300'></td>
        </tr>
        </table>";

                    $bln = substr($row->periode,4,2);
                    $thn = substr($row->periode,0,4);
                    $tgl = explode("/",$row->tanggal);

                    if (floatval($bln) > 12) $bln = 12;

                    $bln = $AddOnLib->ubah_bulan($bln);
                    $tanggal = $tgl[1] . " ". $bln ." ". $thn;

             echo "<table border='0' width='100%' cellspacing='0' cellpadding='0'>
                    
                    <tr>
                        <td width='10'>&nbsp;</td>
                        <td width='150' align='center' class='header_laporan'> </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td align='center' class='header_laporan' style='font-size:12px'>".$row->kota. ', '.substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td height='80'>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     </tr>
                     <tr>
                     <td width='10'>&nbsp;</td>
                     <td class='header_laporan' align='center' style='font-size:12px' >&nbsp;ORANG TUA / WALI</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150' class='header_laporan' align='center' style='font-size:12px'>PETUGAS</td>
                     </tr>
                </table>";
 	echo "
		</td>
  </tr>
</table>"; 
echo "<br>";

			
			$i=$i+1;
		}
		
		echo "</div>";
		return "";
	}
	
}
?>
  
