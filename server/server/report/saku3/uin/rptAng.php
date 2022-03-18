<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_uin_rptAng extends server_report_basic
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
		$kode_pp=$tmp[2];


		$sql="select kdsatker from uin_lokasi where kode_lokasi='$kode_lokasi' ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kdsatker=$row->kdsatker;


		$sql2="select kdsatker,nmsatker from uin_satker where kdsatker='$kdsatker'";
		
		$rs2 = $dbLib->execute($sql2);
		$row = $rs2->FetchNextObject($toupper=false);
		$nmsatker=$row->nmsatker;
		

		$sql2="select nama from pp where kode_pp='$kode_pp'";
		
		$rs2 = $dbLib->execute($sql2);
		$row = $rs2->FetchNextObject($toupper=false);
		$nmpp=$row->nama;
		

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


		$sql="select a.kdsatker,a.kddept,a.kdunit,a.kdprogram 
		from uin_lokasi a 
		where a.kode_lokasi='$kode_lokasi'";

		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdsatker=$row->kdsatker;
		$kdprogram=$row->kdprogram;

		$sql="
		select distinct a.no_aju,a.periode,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl, a.keterangan,a.nilai,b.kdprogram,b.kdgiat,b.kdoutput,c.nmprogram, d.nmgiat,e.nmoutput
						from uin_aju_m a
						inner join uin_aju_d b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi
						inner join uin_program c on b.kdprogram=c.kdprogram and b.kdunit=c.kdunit and b.kddept=c.kddept
						inner join uin_giat d on b.kdgiat=d.kdgiat and b.kdunit=d.kdunit and b.kddept=d.kddept
						inner join uin_output e on b.kdoutput=e.kdoutput and b.kdgiat=e.kdgiat
						$this->filter and b.kddept='$kddept' and b.kdunit='$kdunit' and b.kdprogram='$kdprogram' and substring(b.kode_akun,1,1)='5' ";

		$rs = $dbLib->execute($sql);
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Perhitungan Anggaran Biaya Unit Kerja Per Kegiatan dan Output",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            echo "<table  width='800px' border='2' cellpadding='0' cellspacing='0' class='kotak'>
    <tr>
				<td colspan='3'><table border='0' width='100%' cellpadding='0' cellspacing='0'>
				<tr>
					<td class='header_laporan' width='80px' >Unit Kerja</td>
					<td class='header_laporan'>:&nbsp; UIN STS JAMBI/ $kode_pp</td></tr>
				<tr>
					<td class='header_laporan'>No Formulir</td>
					<td class='header_laporan'>:&nbsp;$row->no_aju</td>
				</tr>
				</table></td>
				<td class='header_laporan' rowspan='2' align='center' width='100px'>&nbsp; Tahun Anggaran ".substr($row->periode,0,4)."</td>
		</tr>
		<tr>
				<td colspan='3'><table border='0' width='100%' cellpadding='0' cellspacing='0'>
				<tr>
						<td class='header_laporan' width='80px'>Program</td>
						<td class='header_laporan'>:&nbsp; $row->nmprogram</td>
				</tr>
				<tr>
						<td class='header_laporan'>Kegiatan</td>
						<td class='header_laporan'>:&nbsp; $row->nmgiat</td>
				</tr>
				<tr>
						<td class='header_laporan'>Sub Kegiatan</td>
						<td class='header_laporan'>:&nbsp; $row->nmoutput</td>
				</tr></table></td>
		</tr>
		
		<tr>
				<td class='header_laporan' colspan='2' align='center' width='50px'>&nbsp;Indikator</td>
				<td class='header_laporan' width='250px' align='center'>&nbsp;Totak Ukur Kerja</td>
				<td class='header_laporan' width='200px' align='center'>&nbsp;Target Kinerja</td>
		</tr>
		<tr>
		<td colspan='2' ><table cellpadding='1' width='100%' cellspacing='2' border='0'>
			<tr>
				<td class='header_laporan' width='15%'>Masukan</td>
				<td class='header_laporan' width='50%'>:&nbsp; Rp. ".number_format($row->nilai,0,",",".")."</td>
			</tr>
			<tr>
				<td class='header_laporan' >Keluaran</td>
				<td class='header_laporan' >:&nbsp;Dosen mampu menggunakan aplikasi siakad</td>
			</tr>
		</table>
		</td>
		<td class='header_laporan' width='250px' align='center'>&nbsp;Dosen mampu menggunakan aplikasi siakad</td>
		<td class='header_laporan' width='200px' align='center' >&nbsp;100%</td>
		</tr>
		<tr>
				<td class='header_laporan' colspan='4' align='center' width='50px'>&nbsp;ANGGARAN BELANJA</td>
		</tr>
		<tr>
				<td class='header_laporan' colspan='2' align='center' width='50px'>&nbsp;Jenis Belanja</td>
				<td class='header_laporan' width='250px' align='center'>&nbsp;Rincian biaya (satuan x harga)</td>
				<td class='header_laporan' width='200px' align='center'>&nbsp;Jumlah Anggaran (Rp.)</td>
		</tr>
		<tr>
				<td style='border-bottom-color:white' class='header_laporan' colspan='2' width='50px'>&nbsp;I. BIAYA LANGSUNG</td>
				<td style='border-bottom-color:white' class='header_laporan' width='250px' align='center'>&nbsp;</td>
				<td style='border-bottom-color:white' class='header_laporan' width='200px' align='center'>&nbsp;</td>
		</tr>
		<tr >
				<td style='border-bottom-color:white' class='header_laporan' colspan='2' width='50px'>&nbsp;&nbsp;&nbsp;A. Biaya Variabel</td>
				<td style='border-bottom-color:white' class='header_laporan' width='250px' align='center'>&nbsp;</td>
				<td style='border-bottom-color:white' class='header_laporan' width='200px' align='center'>&nbsp;</td>
		</tr>";

		$sql1="select distinct a.kode_akun,b.nmakun from uin_aju_d a inner join uin_akun b on a.kode_akun=b.kdakun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju'  ";
		
		$rs1 = $dbLib->execute($sql1);
		$n=1;
		$total=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{

		echo"
		<tr>
				<td class='header_laporan' colspan='2' width='50px'>
					<table border='0' width='100 %' cellspacing='2' cellpadding='0'>
						<tr>
							<td width='10px' align='center' style='vertical-align:top;padding-left:20px' class='isi_laporan'>$row1->kode_akun</td>
							<td width='30px' class='isi_laporan' colspan='2'> $row1->nmakun</td>
						</tr>";

					$sql2="select a.* from uin_aju_d a where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju' and a.kode_akun='$row1->kode_akun'  ";
					$rs2 = $dbLib->execute($sql2);

					$alfa = array('a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
					$z=0;
					while ($row2 = $rs2->FetchNextObject($toupper=false))
					{
					echo"
						<tr>
							<td>&nbsp;</td>
							<td class='isi_laporan'>&nbsp;&nbsp;&nbsp; ".$alfa[$z]."  $row2->keterangan</td>
						</tr>";
						$z++;
					}
						echo"
					</table>
				</td>

				<td class='header_laporan' width='250px' align='center'>
					<table border='0' width='100 %' cellspacing='2' cellpadding='0'>
						<tr>
							<td width='10px' class='isi_laporan'></td>
							<td width='10px' align='center' class='isi_laporan'>&nbsp;</td>
							<td width='30px' class='isi_laporan' align='right'></td>
						</tr>";

					$sql3="select a.* from uin_aju_d a where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju' and a.kode_akun='$row1->kode_akun'  ";
					$rs3 = $dbLib->execute($sql3);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
					echo"
						<tr>
							<td width='10px' class='isi_laporan'>".$row3->vol." ".$row3->satuan."</td>
							<td width='10px' align='center' class='isi_laporan'>x &nbsp;</td>
							<td width='30px' class='isi_laporan' align='right'>&nbsp; ".number_format($row3->tarif,0,",",".")."</td>
						</tr>";
					}
					echo"						
					</table>
				</td>
				<td class='header_laporan' width='200px' align='center'>
					<table border='0' width='100 %' cellspacing='2' cellpadding='0'>
						<tr>
							<td width='30px' class='isi_laporan' colspan='2'>&nbsp;</td>
						</tr>";
					$sql4="select total from uin_aju_d a where a.kode_lokasi='$kode_lokasi' and a.no_aju='$row->no_aju' and a.kode_akun='$row1->kode_akun'  ";
					$rs4 = $dbLib->execute($sql4);
					while ($row4 = $rs4->FetchNextObject($toupper=false))
					{
					echo"
						<tr>
							<td class='isi_laporan' align='right'> ".number_format($row4->total,0,",",".")."</td>
						</tr>";
						$total+=$row4->total;
					}
					echo"
					</table>
				</td>
		</tr>";
		}
	echo"
		<tr bgcolor='#CCCCCC'>
				<td class='header_laporan' colspan='2' width='50px'>&nbsp;<i>Jumlah Biaya Variabel<i></td>
				<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
				<td class='header_laporan' width='200px' align='right'>&nbsp;".number_format($total,0,",",".")."</td>
		</tr>	
	<tr>
		<td class='header_laporan' colspan='2' align='center' width='50px'></td>
		<td class='header_laporan' width='250px' align='center'></td>
		<td class='header_laporan' width='200px' align='center'></td>
	</tr>
	<tr bgcolor='#CCCCCC'>
		<td class='header_laporan' colspan='2' width='50px'>&nbsp;<i>Jumlah Biaya Tetap</i></td>
		<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
		<td class='header_laporan' width='200px' align='center'>&nbsp;</td>
	</tr>
	<tr bgcolor='#CCCCCC'>
		<td class='header_laporan' colspan='2' width='50px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>JUMLAH BIAYA LANGSUNG</i></td>
		<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
		<td class='header_laporan' width='200px' align='right'>&nbsp;".number_format($total,0,",",".")."</td>
	</tr>
	<tr>
			<td class='header_laporan' colspan='2' width='50px'>&nbsp;I. BIAYA TIDAK LANGSUNG</td>
			<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
			<td class='header_laporan' width='200px' align='center'>&nbsp;</td>
	</tr>
	<tr bgcolor='#CCCCCC'>
		<td class='header_laporan' colspan='2' width='50px'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>JUMLAH BIAYA TIDAK LANGSUNG (B)</i></td>
		<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
		<td class='header_laporan' width='200px' align='center'>&nbsp;</td>
	</tr>
	<tr >
	<td class='header_laporan' colspan='2' width='50px'>&nbsp;</td>
	<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
	<td class='header_laporan' width='200px' align='center'>&nbsp;</td>
</tr>
<tr bgcolor='#CCCCCC'>
	<td class='header_laporan' colspan='2' width='50px'>&nbsp;<i>Jumlah Biaya Total (A+B)</i></td>
	<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
	<td class='header_laporan' width='200px' align='right'>&nbsp;".number_format($total,0,",",".")."</td>
</tr>
<tr bgcolor='#CCCCCC'>
	<td class='header_laporan' colspan='2' width='50px'>&nbsp;<i>Biaya Langsung Per Output (A)</i></td>
	<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
	<td class='header_laporan' width='200px' align='right'>&nbsp;".number_format($total,0,",",".")."</td>
</tr> 
<tr bgcolor='#CCCCCC'>
	<td class='header_laporan' colspan='2' width='50px'>&nbsp;<i>Biaya Total Per Output (A+B)/jumlah keluaran</i></td>
	<td class='header_laporan' width='250px' align='center'>&nbsp;</td>
	<td class='header_laporan' width='200px' align='center'>&nbsp;</td>
</tr>    
  ";
  

		echo "</table>";
		echo "<table width='800px' border='0' cellspacing='0' cellpadding='0'>
		<tr>
		<tr><td>&nbsp;</td></tr>
		<td class='header_laporan' colspan='5'>*) PM = data diisi setelah rencana biaya seluruh unit kerja pada satker bersangkutan diperoleh</td>
		</tr>
		<tr>
			<td width='10'>&nbsp;</td>
			<td width='100' align='center' class='header_laporan'> </td>
			<td width='50' align='center'>&nbsp; </td>
			<td width='50' align='center'>&nbsp; </td>
			<td width='50' align='center'>&nbsp; </td>
			<td align='center' class='header_laporan' >Kepala PTI-PD </td>
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
		 <td class='header_laporan' align='center' >&nbsp;</td>
		 <td>&nbsp;</td>
		 <td>&nbsp;</td>
		 <td>&nbsp;</td>
		 <td width='200' class='header_laporan' align='center'> Drs. Ilyas, M.Ag</td>
		 </tr>
		 <tr > 
		 <td width='10'>&nbsp;</td>
		 <td class='header_laporan' align='center'>&nbsp;</td>
		 <td>&nbsp;</td>
		 <td>&nbsp;</td>
		 <td>&nbsp;</td>
		 <td width='200' class='header_laporan' align='center'>  NIP. 196507041993201002 </td>
		 </tr>
		 <tr style='padding: 10px;color:white'>
			<td colspan='6' style='padding:5px;border-bottom-color:white'>&nbsp;</td>
		 </tr>
	</table>";
		}
		echo "</div>";
		return "";
	
	}
	
}
?>
  
