<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptKegiatan extends server_report_basic
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

		// $sql="select 1 ";
		// $rs = $dbLib->execute($sql);
		// $row = $rs->FetchNextObject($toupper=false);
		// $kddept=$row->kddept;
		// $kdunit=$row->kdunit;
		// $kdprogram=$row->kdprogram;
		
    $sql="select a.no_aju,a.periode,a.tanggal,a.kode_lokasi,isnull(c.nama,'-') as nama_app, isnull(d.nama,'-') as nama_bdh,a.nik_bdh,c.nip as nip_app, d.nip as nip_bdh,convert(varchar,a.tanggal,103) as tgl, b.kode_atensi,e.nama as atensi,sum(b.total) as total1,a.keterangan
    from uin_aju_m a
    inner join uin_aju_d b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
    left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
    left join karyawan d on a.nik_bdh=d.nik and a.kode_lokasi=d.kode_lokasi
    inner join uin_atensi e on b.kode_atensi=e.kode_atensi
    $this->filter
    group by a.no_aju,a.periode,a.tanggal,a.kode_lokasi,c.nama,d.nama,a.nik_bdh,c.nip,d.nip,b.kode_atensi,e.nama,a.keterangan
    order by a.no_aju";

    $rs1 = $dbLib->execute($sql);
		$i = 1;
		
        $AddOnLib=new server_util_AddOnLib();
        $sql="select alamat,no_fax,no_telp,nama,logo, website, email from lokasi where kode_lokasi='23'";
		
        $rs = $dbLib->execute($sql);
        $row = $rs->FetchNextObject($toupper=false);
        $alamat = $row->alamat;
        $logo="image/".$row->logo;
        $no_telp= $row->no_telp;
        $no_fax = $row->no_fax;
        $nama =$row->nama;
        $email = $row->email;
        $website = $row->website;
        

        $path = $_SERVER["SCRIPT_NAME"];				
        $path = substr($path,0,strpos($path,"server/serverApp.php"));		
        $pathfoto = $path . "image/checklist.png";
		
		
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("Laporan Verifikasi",$this->lokasi,"");
		while ($row = $rs1->FetchNextObject($toupper=false))
		{

      $bln = substr($row->periode,4,2);
      $thn = substr($row->periode,0,4);
      $tgl = substr($row->tgl,0,2);

      if (floatval($bln) > 12) $bln = 12;

      $bln = $AddOnLib->ubah_bulan($bln);
      $tanggal = $tgl . " ". $bln ." ". $thn;
      $bulan = $bln." ".$thn;
    

            echo "<table   width='800' border='0' cellpadding='0' cellspacing='0' class='kotak' >
            <tr>
            <td><table width='800' border='0' cellspacing='2' cellpadding='1' style='border-bottom: 3px solid black'>
              <tr>
				<td width='120' ><img src='$logo' width='120' height='80'></td>
                <td width='570' align='center'><span style='font-size:20px'>KEMENTERIAN AGAMA </span><br /><span style='font-size:15px'>$nama</span> <br /><span <span style='font-size:20px'>PUSAT TEKNOLOGI INFORMASI dan PANGKALAN DATA </span><br />$alamat Tel. $no_telp; <br /> Website : $website Email : $email </td>
              </tr>
              
            </table></td>
          </tr>
    <tr>
    <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
    <tr>
        <td  colspan='2'  style='padding-bottom:15px' class='header_laporan' align='center'>&nbsp;</td>
        <td style='padding-bottom:15px;padding-left:100px;' class='header_laporan' align='center'>Jambi,     $tanggal</td>
    </tr>
    <tr>
        <td class='header_laporan'>Nomor   </td>
        <td class='header_laporan'>:&nbsp;$row->no_aju</td>
      </tr>
		<tr>
        <td class='header_laporan' width='114'>Sifat</td>
        <td class='header_laporan'>:&nbsp;Penting</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Lamp/ Sumber Dana</td>
        <td class='header_laporan'>&nbsp;1 Bundel</td>
        </tr>
      <tr>
        <td class='header_laporan' width='114'>Hal</td>
        <td class='header_laporan'>&nbsp;Permohonan Dana Kegiatan</td>
      </tr>
	
    </table></td>
  </tr>

  <tr>
  <td colspan='34' style='border-bottom-color:white'><table width='100%' border='0' style='border-collapse:collapse' cellspacing='0' cellpadding='0'>
  <tr >
	<td width='10' class='header_laporan'></td>
	<td width='300' colspan ='3' class='header_laporan'>Kepada Yth : </td>
	<td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr >
	<td width='10' class='header_laporan'></td>
	<td width='300'  colspan ='3'  class='header_laporan'>Kepala Biro AUPKK </td>
	<td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr >
	<td width='10'  class='header_laporan'></td>
	<td width='300'  colspan ='3'  class='header_laporan'>c.q Kabag Keuangan dan Perencanaan </td>
	<td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr >
	<td width='10' class='header_laporan'></td>
	<td width='300'  colspan ='3'  class='header_laporan'>UIN Sulthan Thaha Saifuddin </td>
	<td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='3' class='header_laporan'>Jambi </td>
  <td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='5' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='3' class='header_laporan'>Dengan hormat, </td>
  <td width='50' align='center' class='header_laporan'></td>
	<td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='5' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='3' class='header_laporan'>Bersama ini kami ajukan permintaan pembayaran sebagai berikut</td>
  <td width='50' class='header_laporan'>: </td>
  <td width='200' align='center' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='5' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'>1</td>
  <td width='100' class='header_laporan'>Jenis Pembayaran</td>
  <td width='80' class='header_laporan'>:&nbsp; a. Dengan angka</td>
  <td colspan='2' class='header_laporan'>:&nbsp; Rp ".number_format($row->total1,0,",",".")."</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'></td>
  <td width='100' class='header_laporan'></td>
  <td width='80' class='header_laporan'>:&nbsp; b. Dengan huruf</td>
  <td colspan='2' class='header_laporan'>:&nbsp;".$AddOnLib->terbilang2($row->total1," Rupiah ")."</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='5' class='header_laporan'></td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'>2</td>
  <td width='100' class='header_laporan'>Untuk Keperluan</td>
  <td width='80' colspan='3' class='header_laporan'>:&nbsp; $row->keterangan</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'>3</td>
  <td width='100' class='header_laporan'>Atas Nama</td>
  <td width='80' colspan='3' class='header_laporan'>:&nbsp; $row->atensi</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'>4</td>
  <td width='100' class='header_laporan'>Untuk Bulan</td>
  <td width='80' colspan='3' class='header_laporan'>:&nbsp; $bulan</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='10' class='header_laporan'>5</td>
  <td width='100' colspan='4' class='header_laporan'>Dengan perincian sebagai berikut</td>
  </tr>
  <tr>
  <td width='10' class='header_laporan'></td>
  <td width='300'  colspan ='5' class='header_laporan'></td>
  </tr>
  </table>
  </td>
  </tr>
  
  <tr>
  <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='1' style='border-collapse:collapse' cellspacing='2' cellpadding='1'>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>Uraian Jenis Pengeluaran</td>
	<td width='50' align='center' class='header_laporan'>Mak</td>
	<td width='100' align='center' class='header_laporan'>Rencana Anggaran</td>
	<td width='80' align='center' class='header_laporan'>Sudah Digunakan</td>
	<td width='100' align='center' class='header_laporan'>Diminta Sekarang</td>
	<td width='100' align='center' class='header_laporan'>Sisa Anggaran</td>
  </tr>
  
  ";
			$sql1="select distinct a.kode_akun,b.nmakun from uin_aju_d a inner join uin_akun b on a.kode_akun=b.kdakun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju' and a.kode_atensi='$row->kode_atensi'  ";
      $rs2 = $dbLib->execute($sql1);
      
      $j=1;$totRA=0;$totSD=0;$totDS=0;$totSA=0;

			while ($row1 = $rs2->FetchNextObject($toupper=false))
			{
				
				echo "<tr>
            <td align='center' class='isi_laporan'>$j</td>
            <td  class='isi_laporan'>$row1->nmakun</td>
            <td  class='isi_laporan' align='center'></td>
            <td  class='isi_laporan'></td>   
            <td  class='isi_laporan'></td>   
            <td  class='isi_laporan'></td>   
            <td  class='isi_laporan'></td>   
            </tr>";	

            $sql2="select a.*,b.nmakun from uin_aju_d a inner join uin_akun b on a.kode_akun=b.kdakun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju' and a.kode_atensi='$row->kode_atensi'  ";
            $rs3 = $dbLib->execute($sql2);
            $z=0;
            $alfa = array('a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

            while ($row2 = $rs3->FetchNextObject($toupper=false))
            {

                $totDS+=$row2->total;
                echo "<tr>
                <td align='center' class='isi_laporan'></td>
                <td class='isi_laporan'>".$alfa[$z].". &nbsp;&nbsp;&nbsp; $row2->keterangan</td>
                <td class='isi_laporan' align='center'>$row2->kode_akun</td>
                <td class='isi_laporan' align='right'>".number_format($row2->total,0,",",".")."</td>  
                <td class='isi_laporan' align='right'></td>
                <td class='isi_laporan' align='right'>".number_format($row2->total,0,",",".")."</td>
                <td class='isi_laporan' align='right'></td>
                </tr>";		
                $z++;
            }	           			
				$j=$j+1;
       }
            echo "<tr>
            <td align='center' class='isi_laporan' colspan='3'>JUMLAH</td>
            <td class='isi_laporan' align='right'>".number_format($totDS,0,",",".")."</td>  
            <td class='isi_laporan' align='right'></td> 
            <td class='isi_laporan' align='right'>".number_format($totDS,0,",",".")."</td>
            <td class='isi_laporan'></td>
                  </tr>";		  
    echo"</table></td>
    </tr>";
    
    echo "<tr>
    <td colspan='6' style='padding:5px;border-bottom-color:white' ><table width='100%' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='10'>&nbsp;</td>
        <td width='100' class='header_laporan'>Mengetahui/Menyetujui, </td>
        <td width='50' align='center'>&nbsp; </td>
        <td width='50' align='center'>&nbsp; </td>
        <td width='50' align='center'>&nbsp; </td>
        <td class='header_laporan' </td>
	   </tr>
	   <tr>
        <td width='10'>&nbsp;</td>
        <td width='150' class='header_laporan'>Pejabat Pembuat Komitmen </td>
        <td width='100' align='center'>&nbsp; </td>
        <td width='100' align='center'>&nbsp; </td>
        <td width='100' align='center'>&nbsp; </td>
        <td class='header_laporan' >Bendahara Pengeluaran</td>
	   </tr>
	   <tr>
        <td width='10'>&nbsp;</td>
        <td width='100' class='header_laporan'>UIN STS Jambi </td>
        <td width='50' align='center'>&nbsp; </td>
        <td width='50' align='center'>&nbsp; </td>
        <td width='50' align='center'>&nbsp; </td>
        <td class='header_laporan' >UIN Sulthan Thaha Saifuddin Jambi</td>
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
       <td class='header_laporan'>&nbsp;$row->nama_app</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td width='200' class='header_laporan' > $row->nama_bdh</td>
       </tr>
       <tr>
       <td width='10'>&nbsp;</td>
       <td class='header_laporan'>&nbsp;NIP. $row->nip_app</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td width='200' class='header_laporan'>  NIP. $row->nip_bdh </td>
       </tr>
       <tr style='padding: 10px;color:white'>
        <td colspan='6' style='padding:5px;border-bottom-color:white'>&nbsp;NIP. 197901272007011010</td>
       </tr>
    </table></td>
    </tr>";

		echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
