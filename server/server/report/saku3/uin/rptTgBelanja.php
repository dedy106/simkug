<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptTgBelanja extends server_report_basic
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
		
		$sql="select kdsatker from uin_lokasi where kode_lokasi='$kode_lokasi' ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kdsatker=$row->kdsatker;


		$sql2="select kdsatker,nmsatker from uin_satker where kdsatker='$kdsatker'";
		
		$rs2 = $dbLib->execute($sql2);
		$row = $rs2->FetchNextObject($toupper=false);
		$nmsatker=$row->nmsatker;

		$i = 1;
		
        $AddOnLib=new server_util_AddOnLib();
        $sql="select alamat,no_fax,no_telp,nama,logo, website, email from lokasi where kode_lokasi='$kode_lokasi'";
		
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
		
		$sql="select distinct a.no_aju,a.periode,a.kode_lokasi,a.keterangan,a.nik_app,convert(varchar,a.tanggal,103) as tgl, b.kdgiat,b.kdkmpnen,b.kdoutput,b.kdskmpnen,b.kdsoutput,b.kddept,b.kdunit,b.kdprogram,b.kode_akun,isnull(c.nama,'-') as nama_app, isnull(d.nama,'-') as nama_bdh,a.nik_bdh,c.nip as nip_app, d.nip as nip_bdh
		from uin_aju_m a
		inner join uin_aju_d b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
		left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
		left join karyawan d on a.nik_bdh=d.nik and a.kode_lokasi=d.kode_lokasi
		$this->filter order by a.no_aju ";

		$rs = $dbLib->execute($sql);
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("surat pernyataan tanggung jawab belanja",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{

			
			$bln = substr($row->periode,4,2);
			$thn = substr($row->periode,0,4);
			$tgl = substr($row->tgl,0,2);
	  
			if (floatval($bln) > 12) $bln = 12;
			
			$bln = $AddOnLib->ubah_bulan($bln);
			$bulan=$bln." ".$thn;
			$tanggal=$tgl." ".$bln." ".$thn;

            echo "<table   width='800' border='0' cellpadding='0' cellspacing='0' class='kotak' >
           
    <tr>
    <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
    <tr>
        <td class='header_laporan'>Kode Satuan Kerja   </td>
        <td class='header_laporan' colspan='2'>:&nbsp;$kdsatker</td>
      </tr>
		<tr>
        <td class='header_laporan' >Satuan Kerja</td>
        <td class='header_laporan' colspan='2'>:&nbsp;$nmsatker</td>
        </tr>
		<tr>
        <td class='header_laporan'>Tgl & No. DIPA</td>
        <td class='header_laporan' colspan='2'>:&nbsp;$tanggal, SP DIPA-025.04.2.424186/2019</td>
        </tr>
      <tr>
        <td class='header_laporan'>Klasifikasi Belanja</td>
        <td class='header_laporan' colspan='2'>:&nbsp;".$row->kdgiat.".".$row->kdoutput.".".$row->kdsoutput.".".$row->kdkmpnen.".".$row->kdskmpnen.".".$row->kode_akun."</td>
	  </tr>
	  <tr>
		<td class='header_laporan' ></td>
		<td class='header_laporan' colspan='2'></td>
	  </tr>
	  <tr>
        <td class='header_laporan' width='200' colspan='3' rowspan='3'><div style='text-align:justify'>Yang bertanda tangan di bawah ini Pejabat Kuasa Pengguna Anggaran/ Pejabat Pembuat Komitmen satuan kerja IAIN STS Jambi menyatakan bahawa saya bertanggung jawab secara formal dan material atas segala pengaturan yang telah dibayar lunas oleh Bendahara Pengeluaran kepada yang berhak menerima serta perhitungan dan setoran pajak yang telah dipungut atas pembayaran tersebut dengan perincian sebagai berikut : </div></td>
      </tr>
	
    </table></td>
  </tr>
  
  <tr>
  <td colspan='34' style='padding:5px;border-bottom-color:white'><table width='100%' border='1' style='border-collapse:collapse' cellspacing='2' cellpadding='1'>
  <tr bgcolor='#CCCCCC'>
	<td width='30'  align='center' class='header_laporan' rowspan='2'>No</td>
	<td width='100'  align='center' class='header_laporan' rowspan='2'>Mak</td>
	<td width='100'  align='center' class='header_laporan' rowspan='2'>Penerima</td>
	<td width='300'  align='center' class='header_laporan' rowspan='2'>Uraian</td>
	<td width='90'  align='center' class='header_laporan'>Bukti</td>
	<td width='90'  align='center' class='header_laporan' rowspan='2'>Jumlah</td>
	<td width='90'  align='center' class='header_laporan' rowspan='2'>PPN</td>
	<td width='90'  align='center' class='header_laporan' rowspan='2'>PPH</td>
	<td width='90'  align='center' class='header_laporan' rowspan='2'>Jumlah Bersih</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	<td width='90'  align='center' class='header_laporan'>Tanggal</td>
  </tr>
  
  ";
			$sqldet="select a.*,b.nama,c.nama as atensi, a.total+a.ppn-a.pph as neto
			from uin_aju_d a inner join uin_norma b on a.kode_norma=b.kode_norma and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun 
			inner join uin_atensi c on a.kode_atensi=c.kode_atensi and a.kode_lokasi=c.kode_lokasi 
			where a.no_aju='$row->no_aju' and a.kode_lokasi='$row->kode_lokasi' ";

			$rsd = $dbLib->execute($sqldet);
			$j=1;$total=0;$vol=0;
			while ($rowd = $rsd->FetchNextObject($toupper=false))
			{
				$total+=$rowd->total;
				$ppn+=$rowd->ppn;
				$pph+=$rowd->pph;
				$netto+=$rowd->neto;
				
				echo "<tr>
				<td align='center' class='isi_laporan' rowspan='2'>$j</td>
				<td  class='isi_laporan' align='center' rowspan='2'>$rowd->kode_akun</td>
				<td  class='isi_laporan' rowspan='2'>$rowd->atensi</td>
				<td  class='isi_laporan' rowspan='2'>$rowd->keterangan</td>   
				<td  class='isi_laporan' align='center'>$row->no_aju</td>   
				<td  class='isi_laporan' rowspan='2' align='center'>".number_format($rowd->total,0,",",".")."</td>   
				<td  class='isi_laporan' rowspan='2' align='center'>".number_format($rowd->ppn,0,",",".")."</td>
				<td  class='isi_laporan' rowspan='2' align='center'>".number_format($rowd->pph,0,",",".")."</td>
				<td  class='isi_laporan' rowspan='2' align='center'>".number_format($rowd->netto,0,",",".")."</td>   
				</tr>";	
				echo "<tr><td  class='isi_laporan' align='center'>$row->tgl</td>
				</tr>";		
           			
				$j=$j+1;
			}
			echo "<tr>
            <td align='center' class='isi_laporan' colspan='5'>Jumlah</td> 
			<td  class='isi_laporan'  align='center'>".number_format($total,0,",",".")."</td>   
			<td  class='isi_laporan' align='center'>".number_format($ppn,0,",",".")."</td>
			<td  class='isi_laporan'  align='center'>".number_format($pph,0,",",".")."</td>
			<td  class='isi_laporan'  align='center'>".number_format($neto,0,",",".")."</td>   
            </tr>";	
    echo"</table></td>
    </tr>";
    
    echo "<tr>
	<td colspan='6' style='padding:5px;border-bottom-color:white' ><table width='100%' border='0' cellspacing='0' cellpadding='0' class='kotak'>
		<tr>
			<td class='header_laporan' width='200' colspan='6' ><div style='text-align:justify'>Bukti-bukti pengeluaran anggaran dan  asli setoran pajak (SSP/BPN) tersebut dia atas disimpan oleh Pengguna Anggaran/ Kuasa Pengguna Anggaran untuk kelengkapan administrasi dan pemeriksaan aparat pengawasan fungsional.</div></td>
		</tr>
      <tr>
        <td width='100' class='header_laporan' colspan='6'>Demikian Surat Pernyataan ini dibuat dengan sebenarnya. </td>
	   </tr>
	   <tr>
        <td width='100' class='header_laporan'>Pejabat Pembuat Komitmen </td>
		<td width='150' align='center'>&nbsp; </td>
		<td width='100'>&nbsp;</td>
        <td width='150' align='center'>&nbsp; </td>
        <td width='100' align='center'>&nbsp; </td>
        <td class='header_laporan' >Bendahara Pengeluaran</td>
	   </tr>
       <tr>
       <td height='80'>&nbsp;</td>
	   <td>&nbsp;</td>
	   <td width='10'>&nbsp;</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       </tr>
       <tr>
       <td width='200' class='header_laporan'>&nbsp;$row->nama_app</td>
	   <td>&nbsp;</td>
	   <td width='10'>&nbsp;</td>
       <td>&nbsp;</td>
       <td>&nbsp;</td>
       <td width='200' class='header_laporan' > $row->nama_bdh</td>
       </tr>
       <tr>
       <td class='header_laporan'>&nbsp;NIP. $row->nip_app</td>
	   <td>&nbsp;</td>
	   <td width='10'>&nbsp;</td>
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
