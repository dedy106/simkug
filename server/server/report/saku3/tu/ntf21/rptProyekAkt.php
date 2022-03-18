<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_ntf21_rptProyekAkt extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
    $sql = "select substring(convert(varchar,a.tgl_app2),1,4) as tahun,a.pp_rab,a.kode_pp,a.kode_proyek,a.no_pks,a.nama,a.kode_cust,a.tgl_mulai,a.tgl_selesai,b.nama as nama_cust,a.tgl_admin,a.nilai,isnull(c.pdpt,0) as pdpt, a.nilai_ppn, isnull(c.pdpt,0)+a.nilai_ppn as total_ntf,isnull(d.bayar,0) as bayar, (isnull(c.pdpt,0)+a.nilai_ppn) - isnull(d.bayar,0) as sisa_piutang, a.nilai - (isnull(c.pdpt,0)+a.nilai_ppn) as sisa_tagihan,a.nilai_or as beban_or, a.p_or as persen_or 
    from prb_proyek a
    inner join prb_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
	left join (select a.kode_proyek,a.kode_lokasi, sum(a.nilai) as pdpt
				from prb_prbill_m a
				group by a.kode_proyek,a.kode_lokasi
			) c on a.kode_proyek=c.kode_proyek and a.kode_lokasi=b.kode_lokasi
	left join (select b.kode_proyek,a.kode_lokasi, sum(a.nilai+a.nilai_pph+a.nilai_adm) as bayar
				from prb_prbill_bayar a
				inner join prb_prbill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
				group by b.kode_proyek,a.kode_lokasi
			) d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
    $this->filter ";
    $rs=$dbLib->execute($sql);
    $AddOnLib=new server_util_AddOnLib();	
            
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPoran DATA NTF v.AKT",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2470'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
     <td width='30' rowspan='2' align='center' class='header_laporan'>Tahun</td>
     <td width='30' rowspan='2' align='center' class='header_laporan'>Unit RAB</td>
     <td width='30' rowspan='2' align='center' class='header_laporan'>Unit Kelola</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>No Proyek</td>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Kode Kontrak</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
	 <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Mulai</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Selesai</td>
	 <td width='80'  rowspan='2' align='center' class='header_laporan'>TANGGAL PENYELESAIAN ADM</td>
     <td width='80'  rowspan='2' align='center' class='header_laporan'>Tgl Perpanjangan</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai NTF (diluar PPN)</td>
	 <td width='90'  align='center' class='header_laporan'>Pendapatan Yang Telah Diakui / Total Tagihan</td>
     <td width='90'  align='center' class='header_laporan'>PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total Nilai NTF</td>
     <td width='90'  align='center' class='header_laporan'>Jumlah Pembayaran</td>
     <td width='90'  align='center' class='header_laporan'>Sisa Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Sisa Tagihan</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Penyisihan Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Penghapusan Piutang</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Piutang Real (Tanpa penghapusan piutang)</td>
     <td width='90'  align='center' class='header_laporan'>Saldo Piutang Audited </td>
     <td width='90'  align='center' class='header_laporan'>Beban Max (OR)</td>
     <td width='60'  align='center' class='header_laporan'>% OR Max</td>
     <td width='90'  align='center' class='header_laporan'>Realisasi Beban termasuk BYMHD</td>
	 <td width='90'  align='center' class='header_laporan'>% Realisai Beban Thd Realisasi Pendapatan (Bulan Berjalan)</td>
	 <td width='90'  align='center' class='header_laporan'>Laba Rugi</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>Selisih </td>
    </tr> 
    <tr bgcolor='#CCCCCC'>
      <td align='center' class='header_laporan'>a</td>
      <td align='center' class='header_laporan'>b</td>
      <td align='center' class='header_laporan'>c</td>
      <td align='center' class='header_laporan'>d = b+c</td>
      <td align='center' class='header_laporan'>e</td>
      <td align='center' class='header_laporan'>f = d-e</td>
      <td align='center' class='header_laporan'>g = a-d</td>
      <td align='center' class='header_laporan'>f</td>
      <td align='center' class='header_laporan'>g</td>
      <td align='center' class='header_laporan'>h = d-e</td>
      <td align='center' class='header_laporan'>l = d-e-g</td>
      <td align='center' class='header_laporan'>m</td>
      <td align='center' class='header_laporan'>n = m/b</td>
      <td align='center' class='header_laporan'>o</td>
      <td align='center' class='header_laporan'>p = (o/b) </td>
      <td align='center' class='header_laporan'>q = b-o </td>      
      </tr>";
      $nilai=0;  $nilai_ppn=0; $pdpt=0;$total_ntf=0; $bayar=0; $sisa_piutang=0; $sisa_tagihan=0; $beban_or=0;
      while ($row = $rs->FetchNextObject($toupper=false))
      {
        $nilai+=$row->nilai;
        $pdpt+=$row->pdpt;
        $nilai_ppn+=$row->nilai_ppn;
        $total_ntf+=$row->total_ntf;
        $bayar+=$row->bayar;
        $sisa_piutang+=$row->sisa_piutang;
        $sisa_tagihan+=$row->sisa_tagihan;
		$beban_or+=$row->beban_or;
        echo "<tr >
      <td class='isi_laporan' align='center'>$i</td>
      <td class='isi_laporan'>$row->tahun</td>
      <td class='isi_laporan'>$row->pp_rab</td>
      <td class='isi_laporan'>$row->kode_pp</td>
      <td class='isi_laporan'>$row->kode_proyek</td>
      <td class='isi_laporan'>$row->no_pks</td>
      <td class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan'>$row->nama_cust</td>
      <td class='isi_laporan'>$row->tgl_mulai</td>
      <td class='isi_laporan'>$row->tgl_selesai</td>
      <td class='isi_laporan'>$row->tgl_admin</td>
      <td class='isi_laporan'>$row->tgl_admin</td>
	    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->pdpt,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->total_ntf,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->bayar,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->sisa_piutang,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->sisa_tagihan,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->beban_or,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->persen_or,1,",",".")."%</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format(0,0,",",".")."</td>
     </tr>";
      } echo "<tr >
      <td class='header_laporan' align='right' colspan='12'>Total</td>
	    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($pdpt,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($total_ntf,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($sisa_piutang,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($sisa_tagihan,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format($beban_or,0,",",".")."</td>
	    <td class='header_laporan' align='right'></td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
	    <td class='header_laporan' align='right'>".number_format(0,0,",",".")."</td>
     </table><br>";
echo "</div>";
		return "";
		
	}
	
}
?>
