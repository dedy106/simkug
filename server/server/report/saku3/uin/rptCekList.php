<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_uin_rptCekList extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$nik=$tmp[0];
        $kode_lokasi=$tmp[1];
        
        $sql="select a.kdsatker,a.kddept,a.kdunit,a.kdprogram 
		from uin_lokasi a 
		where a.kode_lokasi='$kode_lokasi'";

		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdprogram=$row->kdprogram;
		
		$i = 1;
		
        $AddOnLib=new server_util_AddOnLib();
        $sql="select alamat,no_fax,no_telp,nama,logo from lokasi where kode_lokasi='$kode_lokasi'";
		
        $rs = $dbLib->execute($sql);
        $row = $rs->FetchNextObject($toupper=false);
        $alamat = $row->alamat;
        $logo="image/".$row->logo;
        $no_telp= $row->no_telp;
        $no_fax = $row->no_fax;
        $nama =$row->nama;
        

        $path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/checklist.png";
		
		$sql2="select a.no_aju,a.keterangan,a.kode_pp+' | '+b.nama as pp,b.nama as nama_pp, c.kode_akun,c.saldo,c.nilai, c.saldo-c.nilai as sisa,a.no_ver, d.nik_terima, d.nik_tahu,d.nik_periksa, e.nama as nama_terima, f.nama as nama_periksa, g.nama as nama_tahu, f.nip as nip_periksa, g.nip as nip_tahu,c.kdoutput,c.kdsoutput,c.kdkmpnen,c.kdskmpnen,c.kode_akun,i.nmakun,c.kdgiat,a.jenis,h.nama as nama_kabag,h.nip as nip_kabag
        from uin_aju_m a 
        inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
        inner join uin_aju_r c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi 
        inner join uin_ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
		inner join karyawan e on d.nik_terima=e.nik and d.kode_lokasi=e.kode_lokasi
		inner join karyawan f on d.nik_periksa=f.nik and d.kode_lokasi=f.kode_lokasi
		inner join karyawan g on d.nik_tahu=g.nik and d.kode_lokasi=g.kode_lokasi
    inner join uin_akun i on c.kode_akun=i.kdakun 
    inner join karyawan h on d.nik_kabag=h.nik and d.kode_lokasi=h.kode_lokasi
        
        $this->filter
        order by a.kode_pp,a.no_aju  ";
		
        $rs2 = $dbLib->execute($sql2);
        
		echo "<div align='center'>"; 
		// echo $AddOnLib->judul_laporan("Laporan Verifikasi",$this->lokasi,"");
		while ($row = $rs2->FetchNextObject($toupper=false))
		{
            echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>         
    <tr>
        <td colspan='34' style='padding:5px' class='header_laporan' align='center'>LEMBAR CHECKLIST KEGIATAN<br/>
        No Bukti : $row->no_ver </td>
    </tr>
    <tr>
    <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
    <tr rowspan='2' >
        <td  style='padding-bottom:15px' class='header_laporan' align='center'>&nbsp;</td>
        <td colspan='2' style='padding-bottom:15px;padding-left:100px;' class='header_laporan' align='center'>Fakultas / Unit : $row->pp</td>
    </tr>
      <tr>
        <td class='header_laporan'>Nama Kegiatan   </td>
        <td class='header_laporan'>:&nbsp;$row->nmakun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Sub Kegiatan   </td>
        <td class='header_laporan'>:&nbsp;".$row->kdgiat.".".$row->kdoutput.".".$row->kdsoutput.".".$row->kdkmpnen.".".$row->kdskmpnen."</td>
      </tr>
		<tr>
        <td class='header_laporan' width='114'>MAK</td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Pagu/ Sumber Dana</td>
        <td class='header_laporan'>&nbsp;Rp ".number_format($row->saldo,0,",",".")." / ".$row->jenis."</td>
        </tr>
      <tr>
        <td class='header_laporan' width='114'>Sisa Pagu</td>
        <td class='header_laporan' style='padding-left:100px'>&nbsp;Rp ".number_format($row->saldo,0,",",".")."</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Permintaan Sekarang</td>
        <td class='header_laporan' style='padding-left:100px'>&nbsp;Rp ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      
        <tr>
          <td class='header_laporan'>Saldo</td>
          <td class='header_laporan'style='padding-left:100px'>&nbsp;Rp ".number_format($row->sisa,0,",",".")."</td>
        </tr>
	
    </table></td>
  </tr>
  <tr>
  <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='1' style='border-collapse:collapse' cellspacing='2' cellpadding='1'>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='300' colspan='3' align='center' class='header_laporan'>Uraian</td>
	<td width='50' align='center' class='header_laporan'>Cek</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
  </tr>
  
  ";
			$sql1="select isnull(b.status,'UNCHECK') as status,isnull(b.catatan,'-') as catatan,a.kode_dok,a.nama 
            from uin_dok_ver a left join uin_ver_d b on a.kode_dok=b.kode_dok and a.kode_lokasi=b.kode_lokasi 
            where b.no_ver='$row->no_ver' and b.kode_lokasi='$kode_lokasi' order by a.idx
				 ";
			$rs1 = $dbLib->execute($sql1);
			$j=1;$total=0;$vol=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{              
				echo "<tr>
                        <td align='center' class='isi_laporan'>$j</td>
                        <td  class='isi_laporan' colspan='3'>$row1->nama</td>
                        <td  class='isi_laporan' align='center'>&nbsp;</td>
                        <td  class='isi_laporan'>&nbsp;</td>   
                      </tr>";	
           
				$j=$j+1;
            }
    echo"</table></td>
    </tr>";
    echo " 
        <tr style='padding: 10px;color:white'>
        <td colspan='6'>&nbsp; </td>
        </tr>
        <tr>
        <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='1' style='border-collapse:collapse' cellspacing='2' cellpadding='1'>
        <tr bgcolor='#CCCCCC'>
            <td rowspan ='2' colspan='2' width='20' align='center' class='header_laporan'>Tgl Pengajuan</td>
            <td colspan='2' width='250' align='center' class='header_laporan'>Paraf</td>
            <td  rowspan ='2' colspan='2' width='120' align='center' class='header_laporan'>Catatan</td>
        </tr>
        <tr bgcolor='#CCCCCC'>
            <td width='110' align='center' class='header_laporan'>Yang Menyerahkan</td>
            <td width='110' align='center' class='header_laporan'>Penerima</td>
        </tr>
          
    ";
    echo "<tr>
            
            <td align='center' class='isi_laporan' colspan='2'></td>
            <td align='center' class='isi_laporan'></td>
            <td  class='isi_laporan'>&nbsp; </td>
            <td colspan='2' class='isi_laporan'>&nbsp; </td> 
        </tr>";	

    echo "<tr>
            
        <td align='center' class='isi_laporan' colspan='2'></td>
        <td align='center' class='isi_laporan'></td>
        <td  class='isi_laporan'>&nbsp; </td>
        <td colspan='2' class='isi_laporan'>&nbsp; </td> 
    </tr>";	
    echo "<tr>
            
        <td align='center' class='isi_laporan' colspan='2'></td>
        <td align='center' class='isi_laporan'></td>
        <td  class='isi_laporan'>&nbsp; </td>
        <td colspan='2' class='isi_laporan'>&nbsp; </td> 
    </tr>";	
    echo "<tr>
    <td align='center' class='isi_laporan' colspan='2'></td>
    <td align='center' class='isi_laporan'></td>
    <td  class='isi_laporan'>&nbsp; </td>
    <td colspan='2' class='isi_laporan'>&nbsp; </td> 
    </tr>";	

    echo"</table></td>
    </tr>";
    
    echo "<tr style='padding: 10px;color:white'>
        <td colspan='6' style='padding:5px;border-bottom-color:white'>&nbsp; </td>
    </tr>
    <tr>
    <td colspan='6' style='padding:5px;border-bottom-color:white'><table width='100%' border='0' cellspacing='0' cellpadding='0' class='kotak'>
    <tr>
        <td width='10' >&nbsp;</td>
        <td class='isi_laporan' colspan='5'> Catatan Pejabat Penguji Tagihan : </td>
    </tr>
    <tr>
        <td width='10' >&nbsp;</td>
        <td style='border-bottom: 1pt solid black;'  class='isi_laporan' colspan='5'>&nbsp; </td>
    </tr>
    <tr>
        <td width='10' >&nbsp;</td>
        <td style='border-bottom: 1pt solid black;'  class='isi_laporan' colspan='5'>&nbsp; </td>
    </tr>
    <tr>
        <td width='10' >&nbsp;</td>
        <td style='border-bottom: 1pt solid black;'  class='isi_laporan' colspan='5'>&nbsp; </td>
    </tr>
    <tr>
        <td width='10' >&nbsp;</td>
        <td class='isi_laporan' colspan='5'>&nbsp; </td>
    </tr>
    </table>
    </td>
    </tr>";	


    echo "<tr>
    <td colspan='6' style='padding:5px;border-bottom-color:white' ><table width='750' border='0' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='10'>&nbsp;</td>
        <td width='100' align='center' colspan='4'>&nbsp;</td>
        <td width='150' class='header_laporan' align='center'>Telah diperiksa kebenarannya sesuai dengan PAGU dan Standar Biaya yang berlaku </td>
      </tr>
      <tr>
        <td width='10'>&nbsp;</td>
        <td width='120' colspan='2' align='center' class='header_laporan'>Kasubbag Keuangan, <br> UIN Sulthan Thaha Saifudin Jambi</td>
        <td  align='center' width='70' colspan='2' class='header_laporan'>&nbsp; Penerima Berkas, <br> UIN Sulthan Thaha Saifudin Jambi</td>
        <td align='center' class='header_laporan' width='150'>Pemeriksa Berkas, <br> Kepala Pusat $row->nama_pp</td>
       </tr>
       <tr>
       <td width='10'>&nbsp;</td>
       <td height='70' colspan='2'>&nbsp;</td>
       <td align='center' colspan='2'>&nbsp;</td>
       <td>&nbsp;</td>
       </tr>
       <tr>
       <td width='10'>&nbsp;</td>
       <td class='header_laporan' align='center' colspan='2' >&nbsp;$row->nama_periksa</td>
       <td align='center' colspan='2' class='header_laporan'>&nbsp;$row->nama_terima</td>
       <td width='200' class='header_laporan' align='center'> $row->nama_tahu</td>
       </tr>
       <tr>
       <td width='10'>&nbsp;</td>
       <td class='header_laporan' align='center' colspan='2'>&nbsp;NIP. $row->nip_periksa</td>
       <td align='center' colspan='2' class='header_laporan'>&nbsp;</td>
       <td width='200' class='header_laporan' align='center'>  NIP. $row->nip_tahu </td>
       </tr>
       <tr style='padding: 10px;color:white'>
        <td colspan='6' style='padding:5px;border-bottom-color:white'>&nbsp;</td>
       </tr>
      <tr>
      <td width='10'>&nbsp;</td>
      <td height='100' colspan='2'>&nbsp;</td>
      <td  class='header_laporan'colspan='2' width='180' align='center'>&nbsp; Kabag Keuangan <br> UIN Sulthan Thaha Saifudin Jambi</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td width='10'>&nbsp;</td>
      <td height='70'>&nbsp;</td>
      <td >&nbsp;</td>
      <td >&nbsp;</td>
      <td >&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td width='10'>&nbsp;</td>
      <td class='header_laporan' colspan='2'></td>
      <td colspan='2'  class='header_laporan' align='center'>&nbsp;$row->nama_kabag</td>
      <td width='200' class='header_laporan' ></td>
      </tr>
      <tr>
      <td width='10'>&nbsp;</td>
      <td class='header_laporan' colspan='2'>&nbsp; </td>
      <td colspan='2'  class='header_laporan' align='center'>&nbsp;NIP. $row->nip_kabag</td>
      <td width='200'> </td>
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
  
