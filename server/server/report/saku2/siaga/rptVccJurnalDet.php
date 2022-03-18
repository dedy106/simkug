<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptVccJurnalDet extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_vcc) as jum
from gr_vcc_m a
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi ".$this->filter;
		
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
		$sql="select distinct a.no_vcc,a.kode_lokasi,a.tanggal,a.keterangan,a.kode_lokasi,
       a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_setuju, d.kota 
			from gr_vcc_m a
			inner join lokasi d on d.kode_lokasi = a.kode_lokasi 
			left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi ".$this->filter."
			order by a.no_vcc";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1' class='kotak'>
			  <tr>
			    <td class='istyle15' >PT GRAHA INFORMATIKA NUSANTARA</td>
  </tr>
			  <tr>
			    <td class='istyle15' >JL S Parman Kavling 56 JAKARTA</td>
  </tr>
			  <tr>
				<td align='center' class='istyle17'><u>JURNAL MEMORIAL</u></td>
			  </tr>
			  <tr>
				<td align='center' class='istyle15'>No. $row->no_vcc</td>
			  </tr>
			  
			  <tr>
				<td align='center' class='istyle15' >&nbsp;</td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30'  colspan='2' class='header_laporan'><div align='center'>No</div></td>
				<td width='100' colspan='2' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='100' colspan='3' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from gr_vcc_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_vcc='$row->no_vcc' and a.kode_lokasi='$row->kode_lokasi'
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
				<td colspan='2' class='isi_laporan' align='center'>$i</td>
				<td colspan='2' class='isi_laporan'>$row1->kode_akun</td>
				<td colspan='3' class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_kredit,0,',','.');
	  echo "<tr>
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>";
  echo"	<tr>
  <td colspan='9' class='header_laporan'><div align='center'>&nbsp;</div></td>
  </tr>";
  echo"<tr>
				<td width='30' class='header_laporan'><div align='center'>No Invoice</div></td>
				<td width='30' class='header_laporan'><div align='center'>Cust</div></td>
				<td width='90' class='header_laporan'><div align='center'>Nilai</div></td>
				<td width='90' class='header_laporan'><div align='center'>Diskon</div></td>
				<td width='90' class='header_laporan'><div align='center'>Netto</div></td>
				<td width='90' class='header_laporan'><div align='center'>PPN</div></td>
				<td width='90' class='header_laporan'><div align='center'>Biaya</div></td>
				<td width='90' class='header_laporan'><div align='center'>Materai</div></td>
				<td width='90' class='header_laporan'><div align='center'>Total</div></td>
				</tr>";
				
			$sql2="select a.no_invoice,a.nama_cust,a.nilai,a.diskon,a.neto,a.ppn,a.biaya,a.materai,a.total  
			from gr_vcc_d a
			where a.no_vcc='$row->no_vcc' and a.kode_lokasi='$row->kode_lokasi'
			order by a.no_invoice ";
						
		$rs2 = $dbLib->execute($sql2);
				$nilai=0;
				$diskon=0;
				$neto=0;
				$ppn=0;
				$biaya=0;
				$materai=0;
				$total=0;
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
						$nilait+=$row2->nilai;
						$diskont+=$row2->diskon;
						$nett+=$row2->neto;
						$ppnt+=$row2->ppn;
						$biayat+=$row2->biaya;
						$materait+=$row2->materai;
						$tot+=$row2->total;

			echo "<tr>
				<td class='isi_laporan' align='center'>$row2->no_invoice</td>
				<td  class='isi_laporan'>$row2->nama_cust</td>
				<td  class='isi_laporan' align='right'>".number_format($row2->nilai,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->diskon,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->neto,0,",",".")."</td>
				<td  class='isi_laporan' align='right'>".number_format($row2->ppn,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->biaya,0,",",".")."</td>
				<td class='isi_laporan' align='right' >".number_format($row2->materai,0,",",".")."</td>
				<td class='isi_laporan' align='right' >".number_format($row2->total,0,",",".")."</td>
			  </tr>";
				$i=$i+1;
		}
			  echo "<tr>
   
				<td colspan='2' class='header_laporan' align='right'>Total</td>
				<td  class='isi_laporan' align='right'>".number_format($nilait,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($diskont,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($nett,0,",",".")."</td>
				<td  class='isi_laporan' align='right'>".number_format($ppnt,0,",",".")."</td>
				<td class='isi_laporan' align='right'>".number_format($biayat,0,",",".")."</td>
				<td class='isi_laporan' align='right' >".number_format($materait,0,",",".")."</td>
				<td class='isi_laporan' align='right' >".number_format($tot,0,",",".")."</td>
  </tr>";


				echo"
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
        <td colspan='2' class='header_laporan'>".$row->kota. ', '.substr($row->tanggal,8,2).' '.$AddOnLib->ubah_periode(substr(str_replace('-','',$row->tanggal),0,6))."</td>
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
	     <td class='header_laporan'>$row->nama_buat</td>
        <td class='header_laporan'>$row->nama_setuju</td>
       
      </tr>
    </table></td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
