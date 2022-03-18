<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptProyekList extends server_report_basic
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
		$nama_cab=$tmp[0];
		$kode_lokasi=$tmp[1];
		$sql="select a.kode_proyek,a.kode_cust,b.nama as nama_cust,a.nilai,a.nilai_ppn,a.p_or,a.nilai_or,a.nama,isnull(c.nilai,0) as tot_tgh,isnull(c.ppn,0) as tot_tgh_ppn,isnull(d.nilai,0) as tot_beban, isnull(((c.nilai-d.nilai)/c.nilai)*100,0) as laba,a.kode_pp,e.nama as nama_pp
        from pr_proyek a
        inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
        inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
        left join (select kode_project,kode_lokasi,sum(nilai) as nilai, sum(nilai_ppn) as ppn from piutang_d group by kode_project,kode_lokasi ) c on a.kode_proyek=c.kode_project and a.kode_lokasi=c.kode_lokasi
        left join (select kode_proyek,kode_lokasi, sum(nilai) as nilai from pr_beban_d group by kode_proyek,kode_lokasi) d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
        $this->filter
        order by a.kode_proyek ";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar proyek",$this->lokasi,$nama_cab);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'    align='center' class='header_laporan'>No</td>
     <td width='80'    align='center' class='header_laporan'>Kode Proyek</td>
	  <td width='250'    align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='150'    align='center' class='header_laporan'>Customer</td>
     <td width='90'    align='center' class='header_laporan'>Nilai Proyek</td>
     <td width='90'   align='center' class='header_laporan'>Nilai PPN</td>
     <td width='90'   align='center' class='header_laporan'>Nilai POR</td>
     <td width='90'   align='center' class='header_laporan'>Nilai OR</td>
     <td width='90'   align='center' class='header_laporan'>Total Tagihan</td>
     <td width='90'   align='center' class='header_laporan'>Total PPN Tagihan</td>
     <td width='90'   align='center' class='header_laporan'>Total Beban</td>
     <td width='90'   align='center' class='header_laporan'>Persen Laba</td>
       </tr>  ";
		$nilai=0;  $nilai_ppn=0;  $byr=0; $nilai_or=0; $bdd=0; $saldo=0; $nilai_pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
            $nilai+=$row->nilai;
            $ppn+=$row->nilai_ppn;
            $nilai_or+=$row->nilai_or;
            $tot_tgh+=$row->tot_tgh;
            $tot_tgh_ppn+=$row->tot_tgh_ppn;
            $tot_laba+=$row->laba;
            $tot_beban+=$row->tot_beban;


		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_proyek</td>
	  <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>$row->p_or %</td>
     <td class='isi_laporan'align='right'>".number_format($row->nilai_or,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tot_tgh,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tot_ppn_tgh,0,",",".")."</td> 
     <td class='isi_laporan' align='right'>".number_format($row->tot_beban,0,",",".")."</td>  
     <td class='isi_laporan' align='right'>$row->laba %</td>    
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='4'>Total</td>
          <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
          <td class='header_laporan' align='right'>".number_format($ppn,0,",",".")."</td>
          <td class='header_laporan' align='right'></td>
          <td class='header_laporan' align='right'>".number_format($nilai_or,0,",",".")."</td>
          <td class='header_laporan' align='right'>".number_format($tot_tgh,0,",",".")."</td>
          <td class='header_laporan' align='right'>".number_format($tot_tgh_ppn,0,",",".")."</td>
          <td class='header_laporan' align='right'>".number_format($tot_beban,0,",",".")."</td>
          <td class='header_laporan' align='right'></td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
