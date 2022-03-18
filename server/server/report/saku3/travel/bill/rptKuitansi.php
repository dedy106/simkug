<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_bill_rptKuitansi extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];

        // $sql="select kota from pp where kode_lokasi='$kode_lokasi' ";
		// $rs = $dbLib->execute($sql);
		// $row = $rs->FetchNextObject($toupper=false);
        // $kota=$row->kota;
        
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/tpcc.jpeg";
        $path2= $path . "image/grey.png";
		
        $sql="select a.no_bill,a.no_dokumen,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,
		a.nilai+a.nilai_ppn as nilai,a.nilai_ppn,a.nilai-a.nilai_ppn as tagihan,b.nama as nama_cust,c.kota,
		a.nik_user,a.nik_app,d.nama as nama_buat,e.nama as nama_app,d.jabatan as jab_buat,e.jabatan as jab_app,no_kuitansi,a.periode
        from bill_m a
        inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
        inner join lokasi c on a.kode_lokasi=c.kode_lokasi
        left join karyawan d on a.nik_user=d.nik and a.kode_lokasi=d.kode_lokasi
        left join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi
        $this->filter order by a.no_bill";

        

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
            <img src='$pathfoto' width='100px' height='40px' style='padding-top:20px;padding-bottom: 200px;'></img> <span>KUITANSI
            </span>
            <br>
            <br>
            <br>
            <br>
            <br>
            <span style='font-size: 8px;'>
            Jl. Telekomunikasi Terusan 
            Buah Batu No.01
            Bandung, Jawa Barat 40257
            telp. +62 (22) 7564 108
            www.telkomuniversity.ac.id
            </span></td>
            <td width='595'>";
        echo "
                    <table width='100%'  border='0' cellspacing='0' cellpadding='1' style='margin-left:5px;padding-right:20px'>
                    <tr>
                        <td width='120'  style='font-size:12px'>Nomor</td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2'  style='font-size:12px;padding:7px'>&nbsp; $row->no_bill</td>
                       
                    </tr>
                    <tr>
                        <td width='120'  style='font-size:12px'>Telah diterima dari </td>
                        <td width='5'>:</td>
                        <td width='400' colspan='2'  style='font-size:12px;padding:7px'>&nbsp; $row->nama_cust</td>
                    </tr>
                    <tr>
                        <td  style='font-size:12px'>Uang Sejumlah</td>
                        <td width='5'>:</td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; <i>".$AddOnLib->terbilang2($row->nilai,"Rupiah")." </i></td>
                    </tr>
                    <tr>
                        <td  style='font-size:12px'>Untuk Pembayaran</td>
                        <td width='5'>:</td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; $row->keterangan</td>
                    </tr>
                    <tr>
                        <td  height='80px' style='font-size:12px'></td>
                        <td width='5'></td>
                        <td  colspan='2' style='font-size:12px;padding:7px'>&nbsp; </td>
                    </tr>
                    <!-- <tr>
                        <td  colspan='2' height='40px' style='font-size:14px;text-align:center' >Jumlah</td>
                        <td  style='box-shadow: inset 0 0 0 1000px #a8a6a0;font-size:14px;padding:7px'> ".number_format($row->nilai,0,",",".")."</td>
                        <td width='300'></td>
                    </tr> -->
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
                        <td width='150' align='center' > </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td width='50' align='center'>&nbsp; </td>
                        <td align='center'  style='font-size:12px' >Bandung, $tanggal </td>
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
                     <td width='10' colspan='2' rowspan='2'>&nbsp; Jumlah : <i>Rp. ".number_format($row->nilai,0,",",".")."</i> </td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150'  align='center' style='font-size:12px'><u>$row->nama_app</u></td>
                     </tr>
                     <tr>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td>&nbsp;</td>
                     <td width='150'  align='center' style='font-size:12px'><u>$row->jab_app</u></td>
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
		
	}
	
}
?>
