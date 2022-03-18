<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_travel_rptBeliPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_hutang)
from hutang_m a
$this->filter";
		
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
		$periode=$tmp[0];
		$lokasi=$tmp[1];
	
		$sql="select a.no_pesan,a.periode,a.kode_pp,a.no_dokumen,convert(varchar,a.tanggal,103) as tgl_pesan,a.keterangan, isnull(b.no_po,'-') as no_po,isnull(convert(varchar,b.tanggal,103),'-') as tgl_po, isnull(b.nilai1,0) as nilai_po,isnull(c.no_terima,'-') as no_terima, isnull(convert(varchar,c.tanggal,103),'-') as tgl_terima,isnull(c.nilai,0) as nilai_terima,isnull(d.no_ba,'-') as no_ba,isnull(convert(varchar,d.tanggal,103),'-') as tgl_ba, isnull(d.nilai,0) as nilai_ba, isnull(e.no_bukti,'-') as no_bukti,isnull(convert(varchar,e.tgl_input,103),'-') as tgl_bayar,isnull(e.nilai,0) as nilai_bayar
        from mb_pesan_m a
        left join mb_po_m b on a.no_pesan=b.no_ref1 and a.kode_lokasi=b.kode_lokasi
        left join mb_terima_m c on b.no_po=c.no_po and b.kode_lokasi=c.kode_lokasi
        left join mb_ba_m d on c.no_ba=d.no_ba and c.kode_lokasi=d.kode_lokasi
        left join brg_belibayar_d e on b.no_po=e.no_beli and b.kode_lokasi=e.kode_lokasi
        $this->filter
        order by a.no_pesan ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi pembelian",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No PR</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='200'  align='center' class='header_laporan'>Keterangan</td>
	  <td width='100'  align='center' class='header_laporan'>No PO</td>
	 <td width='60'  align='center' class='header_laporan'>Tgl PO</td>
	 <td width='80'  align='center' class='header_laporan'>Nilai PO</td>
	 <td width='100'  align='center' class='header_laporan'>No Terima</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
     <td width='60'  align='center' class='header_laporan'>Nilai Terima</td>
	 <td width='100'  align='center' class='header_laporan'>No Tagihan</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Tagihan</td>
     <td width='60'  align='center' class='header_laporan'>Nilai Tagihan</td>
     <td width='60'  align='center' class='header_laporan'>No Bayar</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Bayar</td>
     <td width='60'  align='center' class='header_laporan'>Nilai Bayar</td>
	  </tr>  ";
		$nilai_po=0;$nilai_terima=0;$nilai_ba=0;$nilai_bayar=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_po=$nilai_po+$row->nilai_po;
			$nilai_terima=$nilai_terima+$row->nilai_terima;
            $nilai_ba=$nilai_ba+$row->nilai_ba;
            $nilai_bayar=$nilai_bayar+$row->nilai_bayar;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_pesan</td>
	 <td class='isi_laporan'>$row->tgl_pesan</td>
	 <td class='isi_laporan'>$row->keterangan</td>
     <td class='isi_laporan'>$row->no_po</td>
     <td class='isi_laporan'>$row->tgl_po</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_po,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_terima</td>
	  <td class='isi_laporan'>$row->tgl_terima</td>
	   <td class='isi_laporan' align='right'>".number_format($row->nilai_terima,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_ba</td>
      <td class='isi_laporan'>$row->tgl_ba</td>
      <td class='isi_laporan' align='right'>".number_format($row->nilai_ba,0,",",".")."</td>
	  <td class='isi_laporan'>$row->no_bukti</td>
      <td class='isi_laporan'>$row->tgl_bayar</td>
      <td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($nilai_po,0,",",".")."</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan' align='right'>".number_format($nilai_terima,0,",",".")."</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan' align='right'>".number_format($nilai_ba,0,",",".")."</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan'>&nbsp;</td>
      <td class='isi_laporan' align='right'>".number_format($nilai_bayar,0,",",".")."</td>
   
     </tr>";
		echo "</table>";
		echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
