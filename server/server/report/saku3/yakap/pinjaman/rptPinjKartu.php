<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakap_pinjaman_rptPinjKartu extends server_report_basic
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
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$no_agg=$tmp[1];
		$sql="select a.no_agg,a.kode_lokasi,b.nama,a.jenis_angs,a.no_pinj,c.nama as nama_param,
	   a.status_bayar,a.nilai,a.p_bunga,a.status_bayar,a.no_pinj,a.kode_lokasi,
	   a.lama_bayar,a.nilai_mat,a.nilai_prov,a.nilai_asur,a.nilai_bunga,a.nilai_pokok,a.nilai_tagihan,
	   a.no_kas,date_format(d.tanggal,'%d/%m/%Y') as tgl_cair,c.nama as nama_param,a.kode_param
from kop_pinj_m a
inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
inner join kop_pinj_param c on a.kode_param=c.kode_param and a.kode_lokasi=b.kode_lokasi
left join trans_m d on a.no_kas=d.no_bukti and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_agg";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kartu pinjaman",$this->lokasi,"");
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
 
  <tr >
    <td height='23' colspan='10' class='header_laporan'><table  border='0' cellspacing='2' cellpadding='1'>
	  <tr>
        <td width='99' class='header_laporan'>Anggota</td>
        <td width='360' class='header_laporan'>: $row->no_agg - $row->nama</td>
      </tr>
      <tr>
        <td width='99' class='header_laporan'>No Pinjaman</td>
        <td width='360' class='header_laporan'>: $row->no_pinj</td>
      </tr>
	  <tr>
        <td width='99' class='header_laporan'>Jenis Pinjaman</td>
        <td width='360' class='header_laporan'>: $row->kode_param | $row->nama_param</td>
      </tr>
	   <tr>
        <td width='99' class='header_laporan'>No Pencairan</td>
        <td width='360' class='header_laporan'>: <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a></td>
      </tr>
       <tr>
        <td width='99' class='header_laporan'>Tgl Pencairan</td>
        <td width='360' class='header_laporan'>: $row->tgl_cair</td>
      </tr>	  
	 
      <tr>
        <td class='header_laporan'>Status Bayar </td>
        <td class='header_laporan'>: $row->status_bayar</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai Pinjman</td>
        <td class='header_laporan'>: ".number_format($row->nilai,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Lama Bayar</td>
        <td class='header_laporan'>: ".number_format($row->lama_bayar,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Bunga (Persen)</td>
        <td class='header_laporan'>: ".number_format($row->p_bunga,2,',','.')."</td>
      </tr>
	  
	  <tr>
        <td class='header_laporan'>Nilai Pokok</td>
        <td class='header_laporan'>: ".number_format($row->nilai_pokok,0,',','.')."</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Nilai Bunga </td>
        <td class='header_laporan'>: ".number_format($row->nilai_bunga,0,',','.')."</td>
      </tr>
	   <tr>
        <td class='header_laporan'>Nilai Angsuran </td>
        <td class='header_laporan'>: ".number_format($row->nilai_tagihan,0,',','.')."</td>
      </tr>
	 
    </table></td>
  </tr>
 
  
  <tr bgcolor='#CCCCCC'>
	<td width='60' class='header_laporan' align='center'>Tgl Angsuran</td>
	<td width='40' class='header_laporan' align='center'>Cicilan Ke</td>
    <td width='90' height='23' class='header_laporan' align='center'>No Bill</td>
    <td width='80' class='header_laporan' align='center'>Tunggakan Bunga</td>
	<td width='90' class='header_laporan' align='center'>Pembayaran Pokok</td>
	<td width='90' class='header_laporan' align='center'>Pembayaran Bunga</td>
	<td width='90' class='header_laporan' align='center'>Jumlah Bayar</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
	<td width='60' class='header_laporan' align='center'>Tgl bayar</td>
	<td width='90' class='header_laporan' align='center'>No Bayar</td>
  </tr>
";
			
			$sql="select a.cicilan_ke,a.tgl_angs,a.nbunga as tbunga,b.no_angs,a.kode_lokasi,
	   a.no_bill,b.no_angs,b.tanggal,ISNULL(b.bayar,0) as bayar ,ISNULL(b.npokok,0) as npokok,ISNULL(b.nbunga,0) as nbunga,
	   date_format(a.tgl_angs,'%d/%m/%Y') as tgl,date_format(b.tanggal,'%d/%m/%Y') as tgl_bayar
from kop_pinj_sch a
left join (select a.no_angs,a.no_pinj,a.cicilan_ke,a.no_bill,b.tanggal,a.npokok,a.nbunga,a.npokok+a.nbunga as bayar
from kop_pinjangs_d a
inner join kop_pinjangs_m b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
		  )b on a.no_pinj=b.no_pinj and a.no_bill=b.no_bill and a.cicilan_ke=b.cicilan_ke
where a.kode_lokasi='$row->kode_lokasi' and a.no_pinj='$row->no_pinj'
order by a.tgl_angs
";
			
			$rs1 = $dbLib->execute($sql);
			$saldo=0;
			$npokok=0;$nbunga=0;$saldo=0;$bayar=0;$tagihan=0;
			$total=0;$tbunga=0; $tsaldo=0;
			$saldo=$row->nilai;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$bunga=$row1->tbunga;
				if ($row1->no_bill=='-')
				{
					$bunga=0;
				}
				$tbunga+=$bunga;	
				$npokok+=$row1->npokok;	
				$nbunga+=$row1->nbunga;
				$saldo+=$bunga-$row1->bayar;
				$bayar+=$row1->bayar;
				$tagihan+=$row1->tagihan;
				if ($row1->bayar==0)
				{
					$saldo=0;
				}
				else
				{
					$tsaldo=$saldo;
				}
					
				echo "<tr>
	 <td   class='isi_laporan'>".$row1->tgl."</td>
	 <td   class='isi_laporan' align='center'>".$row1->cicilan_ke."</td>";
    echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBill('$row1->no_bill','$row1->kode_lokasi');\">$row1->no_bill</a></td>";
    echo "<td  class='isi_laporan' align='right'>".number_format($bunga,0,',','.')."</td>
	   <td  class='isi_laporan' align='right'>".number_format($row1->npokok,0,',','.')."</td>
	   <td  class='isi_laporan' align='right'>".number_format($row1->nbunga,0,',','.')."</td>
	   <td  class='isi_laporan' align='right'>".number_format($row1->bayar,0,',','.')."</td>
	   <td  class='isi_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
	   <td  class='isi_laporan'>".$row1->tgl_bayar."</td>";
	  echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row1->no_angs','$row1->kode_lokasi');\">$row1->no_angs</a></td>";
  echo "</tr>";
				
			}
			echo "<tr>
   <td colspan='3'  class='header_laporan' align='right'>Total&nbsp;</td>
   <td  class='header_laporan' align='right'>".number_format($tbunga,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($npokok,0,',','.')."</td>
   <td  class='header_laporan' align='right'>".number_format($nbunga,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($bayar,0,',','.')."</td>
  <td  class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
 </tr></table><br>";
			
			$i=$i+1;
		}
		return "";
	}
	
}
?>
