<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_siaga_rptBuktiBeban extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select 1 ";
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
		$nama_user=$tmp[0];
		$sql = "select a.no_beban as no_kas,a.keterangan,b.nama,a.atensi as ref1,'Jakarta' as kota,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		a.nilai,a.kurs,a.nilai,a.nilai_curr,d.nama as nama_curr,a.kode_curr,isnull(c.no_ju,'-') as no_ju ,date_format(a.tgl_input,'%d/%m/%Y') as tgl_input
from gr_beban_m a
inner join karyawan b on a.nik_buat=b.nik
inner join curr d on a.kode_curr=d.kode_curr
left join ju_m c on a.no_beban=c.no_dokumen and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_beban ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$judul="PENGELUARAN KAS";
			$ket="Dibayarkan Kepada";
			
				echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='504'>PT GRAHA INFORMATIKA NUSANTARA </td>
            <td width='69' class='istyle15'>Bukti No </td>
            <td width='203' class='istyle15'>: </td>
          </tr>
          <tr>
            <td>JL S Parman Kavling 56 JAKARTA </td>
            <td>No Urut </td>
            <td>: $row->no_kas </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td align='center' class='istyle17'>BUKTI $judul </td>
      </tr>
      <tr>
        <td style='padding:10px;'><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='146'>$ket </td>
            <td width='644'>: $row->ref1 </td>
          </tr>
         <tr>
            <td>Uang Sejumlah </td>";
			if ($row->kode_curr=="IDR")
			{
				echo "<td>: ".number_format($row->nilai_curr,0,",",".")." &nbsp;&nbsp;&nbsp;Kurs : ".number_format($row->kurs,0,",",".")." &nbsp;&nbsp;&nbsp; Total Rupiah : ".number_format($row->nilai,0,",",".")." </td>";
			}
			else
			{
				echo "<td>: $row->kode_curr ".number_format($row->nilai_curr,2,",",".")."  </td>";
			}
		  echo "</tr>
          <tr>
            <td>Terbilang</td>";
			if ($row->kode_curr=="IDR")
			{
				echo "<td>: ".$AddOnLib->terbilang($row->nilai_curr)." </td>";
			}
			else
			{
				echo "<td>: ".$AddOnLib->terbilang_curr($row->nilai_curr,$row->nama_curr)." </td>";
			}
          echo "</tr>
          <tr>
            <td>Keterangan</td>
            <td>: $row->keterangan</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td style='padding:10px;'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
          <tr align='center'>
            <td width='350' class='header_laporan'>NAMA PERKIRAAN </td>
            <td width='100' class='header_laporan'>DEBET</td>
            <td width='100' class='header_laporan'>KREDIT</td>
            <td width='120' class='header_laporan'>KODE PERKIRAAN </td>
          </tr>";
		  $sql="select a.kode_akun,b.nama as nama_akun,
					 case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit
				from gr_beban_j a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.no_beban='$row->no_kas'
				order by a.dc desc";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
					<td class='isi_laporan'>$row1->nama_akun</td>
					<td class='isi_laporan' align='right'>".number_format($row1->debet,0,",",".")."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->kredit,0,",",".")."</td>
					<td class='isi_laporan'>$row1->kode_akun</td>
				  </tr>";
			}
        echo "</table></td>
      </tr>";
	
		echo "<tr>
        <td><table width='806' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='176' align='center'>DISETUJUI</td>
            <td width='150' height='30'>&nbsp;</td>
            <td width='143'>&nbsp;</td>
            <td colspan='2'>".$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
            </tr>
          <tr>
            <td align='center'>DIR. ATAU</td>
            <td align='center'>ATASAN YBS. </td>
            <td rowspan='2' align='center'>DIPERIKSA OLEH : </td>
            <td width='147' rowspan='2' align='center'>DIBUAT OLEH : </td>
            <td width='168' rowspan='2' align='center'>PENERIMA : </td>
          </tr>
          <tr>
            <td align='center'>MANAGER KEUANGAN</td>
            <td align='center'>MIN.MANAGER</td>
            </tr>
          <tr valign='bottom'>
            <td align='center'>&nbsp;</td>
            <td height='60' align='center'>&nbsp;</td>
            <td align='center'>&nbsp;</td>
            <td align='center'>$row->nama</td>
            <td align='center'>$row->ref1</td>
          </tr>
          <tr valign='bottom'>
            <td align='center'>( _______________ ) </td>
            <td height='20' align='center'>( _______________ ) </td>
            <td align='center'>( _______________ ) </td>
            <td align='center'>( _______________ )</td>
            <td align='center'>( _______________ )</td>
          </tr>
          <tr>
            <td colspan='5'>dicetak oleh $nama_user tanggal $row->tgl </td>
            </tr>
		   <tr>
            <td colspan='5'>*** Diverifikasi Akunting Tanggal $row->tgl_input *** </td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
 
  ";
		
  
  
	echo "</table><br>
	
	<br>
	<DIV style='page-break-after:always'></DIV>
	";
		
			if ($row->no_ju<>"-")
			{
				$sql="select nama,alamat from lokasi ";
				
				$rs2 = $dbLib->execute($sql);
				$row2 = $rs2->FetchNextObject($toupper=false);
				$nama_lokasi=$row2->nama;
				$alamat=$row2->alamat;
				
				$sql="select a.no_ju,a.kode_lokasi,a.periode,a.tanggal,a.keterangan,a.kode_lokasi,
			   a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_setuju,d.kota 
					from ju_m a
					inner join lokasi d on d.kode_lokasi = a.kode_lokasi 
					left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
					left join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi 
					where a.no_ju='$row->no_ju'
					order by a.no_ju";
				
				$rs2 = $dbLib->execute($sql);
				
				$i = $start+1;
				$jum=$rs->recordcount();
				$AddOnLib=new server_util_AddOnLib();
				echo "<div align='center'>"; 
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					echo "<table border='0' cellspacing='2' cellpadding='1' class='kotak'>
					   <tr>
						<td class='istyle15' >$nama_lokasi</td>
		  </tr>
					  <tr>
						<td class='istyle15' >$alamat</td>
		  </tr>
					  <tr>
						<td align='center' class='istyle17'><u>JURNAL MEMORIAL</u></td>
					  </tr>
					  <tr>
						<td align='center' class='istyle15'>No. $row2->no_ju</td>
					  </tr>
					  
					  <tr>
						<td align='center' class='istyle15' >&nbsp;</td>
					  </tr>
					  <tr>
						<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
						<tr>
						<td width='30' class='header_laporan'><div align='center'>No</div></td>
						<td width='100' class='header_laporan'><div align='center'>Akun</div></td>
						<td width='350' class='header_laporan'><div align='center'>Nama Akun </div></td>
						<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
						<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
					  </tr>";
			  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
					from ju_j a
					inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					where a.no_ju='$row2->no_ju' and a.kode_lokasi='$row2->kode_lokasi'
					order by a.no_urut ";
				//error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				$i=1;
				$tot_debet=0;
				$tot_kredit=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$debet=number_format($row1->debet,0,',','.');
					$kredit=number_format($row1->kredit,0,',','.');
					$tot_debet=$tot_debet+$row1->debet;
					$tot_kredit=$tot_kredit+$row1->kredit;
					echo "<tr>
						<td class='isi_laporan' align='center'>$i</td>
						<td class='isi_laporan'>$row1->kode_akun</td>
						<td class='isi_laporan'>$row1->nama</td>
						<td class='isi_laporan' align='right'>$debet</td>
						<td class='isi_laporan' align='right'>$kredit</td>
					  </tr>";
						$i=$i+1;
				}
				$tot_debet1=number_format($tot_debet,0,',','.');
				$tot_kredit1=number_format($tot_debet,0,',','.');
			  echo "<tr>
		   
			<td colspan='3' class='header_laporan' align='right'>Total</td>
			<td class='isi_laporan' align='right'>$tot_debet1</td>
			<td class='isi_laporan' align='right'>$tot_kredit1</td>
		  </tr>
			</table></td>
		  </tr>
					  <tr>
						<td><span class='header_laporan'>Keterangan : </span></td>
					  </tr>
					  <tr>
						<td><span class='header_laporan'>$row->keterangan</span></td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
					  </tr>
		  <tr>
			<td align='right'><table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td colspan='2' class='header_laporan'>".$row2->kota. ', '.substr($row2->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row2->tanggal),0,6))."</td>
				</tr>
			  <tr>
				<td width='200' class='header_laporan'>Dibuat Oleh : </td>
				<td width='200' class='header_laporan'>Mengetahui : </td>
				
			  </tr>
			  <tr>
				<td height='40'>&nbsp;</td>
				<td>&nbsp;</td>
			  </tr>
			  <tr>
				 <td class='header_laporan'>$row2->nama_buat</td>
				<td class='header_laporan'>$row2->nama_setuju</td>
			   
			  </tr>
			</table></td>
		  </tr>
		</table><br>";
					
					$i=$i+1;
				}
				echo "</div>";
				
					}
		}
		echo "</div>";
		return "";
	}
}
?>