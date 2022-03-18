<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptBuktiBank extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_kas)
from kas_m a
inner join karyawan b on a.nik_buat=b.nik $this->filter ";
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
		$sql="select nama,alamat from lokasi ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_lokasi=$row->nama;
		$alamat=$row->alamat;
		$sql = "select a.no_kas,a.keterangan,b.nama,a.ref1,a.no_link,c.kota,tanggal,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		a.nilai,a.kurs,a.nilai as nilai_curr,a.nilai*a.kurs as nilai,d.nama as nama_curr,a.kode_curr
from kas_m a
inner join karyawan b on a.nik_buat=b.nik
left join gr_cabang c on a.kode_pp=c.kode_cabang
left join curr d on a.kode_curr=d.kode_curr $this->filter order by a.no_kas ";
		
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
			if (substr($row->no_kas,0,1)=="C")
			{
				if (substr($row->no_kas,1,1)=="D")
				{
					$judul="PENERIMAAN KAS";
					$ket="Telah Terima Dari";
				}
				else
				{
					$judul="PENGELUARAN KAS";
					$ket="Dibayarkan Kepada";
				}
			}
			if (substr($row->no_kas,0,1)=="B")
			{
				if (substr($row->no_kas,1,1)=="D")
				{
					$judul="PENERIMAAN BANK";
					$ket="Telah Terima Dari";
				}
				else
				{
					$judul="PENGELUARAN BANK";
					$ket="Dibayarkan Kepada";
				}
			}
				echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='504'>$nama_lokasi</td>
            <td width='69' class='istyle15'>Bukti No </td>
            <td width='203' class='istyle15'>: $row->no_kas </td>
          </tr>
          <tr>
            <td>$alamat</td>
            <td>No Urut </td>
            <td>: $row->no_link</td>
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
				from kas_j a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.no_kas='$row->no_kas'
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
	  if (substr($row->no_kas,1,1)=="K")
	  {
		echo "<tr>
        <td><table width='806' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='176' align='center'>DISETUJUI</td>
            <td width='150' height='30'>&nbsp;</td>
            <td width='143'>&nbsp;</td>
            <td colspan='2'>".$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
            </tr>
          <tr>
            <td align='center'>DIR ATAU</td>
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
            <td align='center'>&nbsp;</td>
            <td align='center'>&nbsp;</td>
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
        </table></td>
      </tr>
    </table></td>
  </tr>";
		}
		else
		{
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='265' height='30'>Diketahui Oleh : </td>
            <td width='283'>&nbsp;</td>
            <td width='238'>".$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
          </tr>
          <tr>
            <td align='center'>DIR ATAU </td>
            <td rowspan='2' align='center'>DIPERIKSA OLEH : </td>
            <td rowspan='2' align='center'>DIBUAT OLEH : </td>
          </tr>
          <tr>
            <td align='center'>MANAGER KEUANGAN </td>
            </tr>
          <tr valign='bottom'>
            <td height='60' align='center'>( _______________ ) </td>
            <td align='center'>( _______________ ) </td>
            <td align='center'>( $row->nama) </td>
          </tr>
          <tr>
            <td colspan='3'>dicetak oleh $nama_user tanggal $row->tgl </td>
            </tr>
        </table>";
		}
  
  
	echo "</table><br>";
		
		
		}
		echo "</div>";
		return "";
	}
}
?>