<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_dmt_rptKartuPiutang extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$cust=$tmp[3];
		$sql = "select count(a.kode_cust)
from cust a $cust ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$periode2=$tmp[1];
		$cust=$tmp[3];
		$sql = "select a.kode_cust,a.nama,isnull(b.so_debet,0)-isnull(c.so_kredit,0) as so_awal
from cust a
left join (select a.kode_cust,sum(a.nilai+a.ppn) as so_debet
		   from dmt_ar_m a
		   where a.periode<'$periode'
		   group by a.kode_cust	
		   )b on a.kode_cust=b.kode_cust
left join (select a.kode_cust,sum(b.nilai) as so_kredit
		   from dmt_ar_m a
		   inner join dmt_kaspiutang_d b on a.no_ar=b.no_ar
		   where b.periode<'$periode' 
		   group by a.kode_cust
		   )c on a.kode_cust=c.kode_cust $cust ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i=1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("KARTU PENGAWASAN PIUTANG ",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal=number_format($row->so_awal,0,",",".");
		echo "<table  width='1000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td colspan='13' class='header_laporan'><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='80' class='header_laporan'>Kode Cust </td>
            <td width='500' class='header_laporan'>: $row->kode_cust</td>
            </tr>
          <tr>
            <td class='header_laporan'>Nama Cust </td>
            <td class='header_laporan'>: $row->nama</td>
            </tr>
        </table></td>
      </tr>
	   <tr>
        <td colspan='12' align='right' class='header_laporan'>Saldo Awal </td>
         <td width='90' class='header_laporan' align='right'>".number_format($row->so_awal,0,",",".")."</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='20' rowspan='2' class='header_laporan'>No</td>
        <td width='80' rowspan='2' class='header_laporan'>No Bukti </td>
        <td width='80' rowspan='2' class='header_laporan'>No Dokumen </td>
        <td width='60' rowspan='2' class='header_laporan'>Tanggal</td>
        <td width='200' rowspan='2' class='header_laporan'>Keterangan</td>
       <td colspan='3'  width='90' class='header_laporan'>Debet</td>
        <td colspan='4'  width='90' class='header_laporan'>Kredit</td>
         <td rowspan='2'  width='90' class='header_laporan'>Saldo Akhir</td>
      </tr>
      <tr align='center' bgcolor='#CCCCCC'>
        <td width='90' class='header_laporan'>Tagihan</td>
        <td width='90' class='header_laporan'>PPN</td>
        <td width='90' class='header_laporan'>Total</td>
		<td width='90' class='header_laporan'>Tagihan</td>
        <td width='90' class='header_laporan'>PPH</td>
		<td width='90' class='header_laporan'>ADM</td>
        <td width='90' class='header_laporan'>Total</td>
      </tr>";
	    $sql1="select a.no_bukti,a.dc,date_format(a.tanggal,'%d/%m/%Y') as tgl_bukti,a.no_dokumen,a.keterangan,a.nilai,a.ppn,a.debet,a.kredit,a.kredit_ar,a.kredit_pph,a.kredit_adm
		from (select no_ar as no_bukti,'D' as dc,a.tanggal,a.no_dokumen,a.keterangan,a.nilai ,a.ppn,a.nilai+a.ppn as debet,0 as kredit,0 as kredit_ar,0 as kredit_pph,0 as kredit_adm
from dmt_ar_m a
where kode_cust='$row->kode_cust' $periode2
union all
select a.no_kas as no_bukti,'C' as dc,a.tanggal,a.no_dokumen,a.keterangan,0 as nilai,0 as ppn,0 as debet,b.nilai as kredit,b.kredit_ar,b.kredit_pph,b.kredit_adm
from kas_m a
inner join (select no_kas,sum(nilai) as nilai,
				   sum(case jenis when 'AR' then nilai else 0 end) as kredit_ar,
				  sum(case jenis when 'PPH' then nilai else 0 end) as kredit_pph,
				  sum(case jenis when 'ADM' then nilai else 0 end) as kredit_adm
		    from dmt_kaspiutang_d
			where kode_cust='$row->kode_cust' $periode2
			group by no_kas
		   )b on a.no_kas=b.no_kas

			)a
order by a.tanggal ";
		
		$rs1 = $dbLib->execute($sql1);
		$so_akhir=$row->so_awal;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$j=$j+1;
			$so_akhir=$so_akhir+$row1->debet - $row1->kredit;
		echo "<tr>
        <td align='center' class='isi_laporan'>$j</td>
        <td class='isi_laporan'> <a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDoc2('$row1->no_bukti');\">$row1->no_bukti</a></td>
		<td class='isi_laporan'>$row1->no_dokumen</td>
		<td class='isi_laporan'>$row1->tgl_bukti</td>
        <td class='isi_laporan'>$row1->keterangan</td>
		<td class='isi_laporan' align='right'>".number_format($row1->nilai,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->ppn,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->debet,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($row1->kredit_ar,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit_pph,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit_adm,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($row1->kredit,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($so_akhir,0,",",".")."</td>
         </tr>";
			
	  }
      echo " <tr align='center'>
		<td colspan='5' align='right' class='header_laporan'>Mutasi</td>
        <td class='isi_laporan' align='right'>".number_format($debet_bp,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_kunj,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_cs,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($debet_tot,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_tot,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_tot,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($debet_tot,0,",",".")."</td>
        <td class='isi_laporan' align='right'>".number_format($kredit_bp,0,",",".")."</td>
		
       </tr>";
		 echo " <tr align='center'>
		<td colspan='12' align='right' class='header_laporan'>Saldo Akhir</td>
       <td class='isi_laporan' align='right'>".number_format($sa_tot,0,",",".")."</td>
       </tr>
	   
	 </table><br>";
		}
		echo "</div>";
		return "";
	}
	
	
}
?>
