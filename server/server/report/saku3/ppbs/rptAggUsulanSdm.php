<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptAggUsulanSdm extends server_report_basic
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
		$jenis=$tmp[0];
		
		$nama_file="usulan.xls";
		if ($jenis=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		
		$sql="select a.no_gaji,a.kode_lokasi,a.kode_pp,b.nama as nama_pp,a.tahun,a.keterangan
from agg_gaji_m a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
$this->filter
order by a.no_gaji";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("usulan sdm",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='23' style='padding:5px'><table  border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td class='header_laporan' width='100'>No Bukti</td>
        <td width='500' class='header_laporan'>:&nbsp;$row->no_gaji</td>
        </tr>
		<tr>
        <td class='header_laporan' width='137'>Keteragan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan' width='137'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp - $row->nama_pp</td>
        </tr>
	    
        <tr>
        <td class='header_laporan'>Tahun Anggaran   </td>
        <td class='header_laporan'>:&nbsp;$row->tahun</td>
      </tr>
	
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
        <td width='30' align='center' class='header_laporan'>No</td>
		<td width='60' align='center' class='header_laporan'>NIK</td>
        <td width='200' align='center' class='header_laporan'>Nama</td>
        <td width='100' align='center' class='header_laporan'>Status Pegawai</td>
        <td width='200' align='center' class='header_laporan'>Jabatan</td>
        <td width='90' align='center' class='header_laporan'>GAJI DASAR</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN DASAR</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN STRUKTURAL</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN PREMIUM</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN FUNGSIONAL</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN KEHORMATAN</td>
        <td width='90' align='center' class='header_laporan'>THT</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN PAJAK</td>
        <td width='90' align='center' class='header_laporan'>PAKSER</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN JAMSOSTEK</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN JP</td>
        <td width='90' align='center' class='header_laporan'>TUNJANGAN JAMKES</td>
        <td width='90' align='center' class='header_laporan'>KELEBIHAN SKS</td>
        <td width='90' align='center' class='header_laporan'>Uang Makan Bulanan</td>
        <td width='90' align='center' class='header_laporan'>INSENTIF KINERJA</td>
        <td width='90' align='center' class='header_laporan'>THR</td>
        <td width='90' align='center' class='header_laporan'>Total</td>
      </tr>";
    $sql="select a.no_gaji, a.kode_lokasi, a.nik, a.nama,b.status_sdm,b.jabatan, a.n1, a.n2, a.n3, a.n4, a.n5, a.n6, a.n7, a.n8, a.n9, a.n10, a.n11 ,a.n12,
    a.n13,a.n14,a.n15,a.n16,a.n1+a.n2+a.n3+a.n4+a.n5+a.n6+a.n7+a.n8+ a.n9+a.n10+a.n11+a.n12+a.n13+a.n14+a.n15+a.n16 as total
		from agg_gaji_load a
		inner join agg_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
		where a.no_gaji = '$row->no_gaji' and a.kode_lokasi='$row->kode_lokasi' and b.tahun='$row->tahun' order by a.nu";
		
		$rs1 = $dbLib->execute($sql);
		$i=1;
    $n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0; $n13=0; $n14=0; $n15=0; $n16=0; 
    $total=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$n1+=$row1->n1;
			$n2+=$row1->n2;
			$n3+=$row1->n3;
			$n4+=$row1->n4;
			$n5+=$row1->n5;
			$n6+=$row1->n6;
			$n7+=$row1->n7;
			$n8+=$row1->n8;
			$n9+=$row1->n9;
			$n10+=$row1->n10;
			$n11+=$row1->n11;
			$n12+=$row1->n12;
			$n13+=$row1->n13;
			$n14+=$row1->n14;
			$n15+=$row1->n15;
			$n16+=$row1->n16;
			
			$total+=$row1->total;
      echo "<tr>
        <td class='isi_laporan' align='center'>$i</td>
		<td class='isi_laporan'>$row1->nik</td>
        <td class='isi_laporan'>$row1->nama</td>
        <td class='isi_laporan'>$row1->status_sdm</td>
        <td class='isi_laporan'>$row1->jabatan</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n1,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n2,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n3,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n4,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n5,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n6,0,",",".")."</td>
       <td align='right' class='isi_laporan'>".number_format($row1->n7,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n8,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n9,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n10,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n11,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n12,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n13,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n14,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n15,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->n16,0,",",".")."</td>
        <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
      </tr>";
			$i=$i+1;
		}
		 echo "<tr>
        <td class='header_laporan' align='right' colspan='5'>TOTAL</td>
        <td align='right' class='header_laporan'>".number_format($n1,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n2,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n3,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n4,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n5,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n6,0,",",".")."</td>
       <td align='right' class='header_laporan'>".number_format($n7,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n8,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n9,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n10,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n11,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n12,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n13,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n14,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n15,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($n16,0,",",".")."</td>
        <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
      </tr>";
    echo "</table></td>
  </tr>
</table>
  </tr>
  
  ";		
			
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
