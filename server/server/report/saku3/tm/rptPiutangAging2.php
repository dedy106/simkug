<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tm_rptPiutangAging2 extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$tgl_aging=$tmp[2];
		$sql="select a.kode_lokasi,a.no_dokumen,a.no_piutang,convert(varchar,a.tanggal,103) as tgl,b.nama as nama_cust,a.nilai+a.nilai_ppn as tagihan,
        case when datediff(day,a.tanggal,'$tgl_aging')<=180 then a.nilai+a.nilai_ppn else 0 end as aging1,
        case when datediff(day,a.tanggal,'$tgl_aging') between 181 and 360 then a.nilai+a.nilai_ppn else 0 end as aging2,   
        case when datediff(day,a.tanggal,'$tgl_aging') > 360 then a.nilai+a.nilai_ppn else 0 end as aging3,
        isnull(c.nilai_kas,0) as nilai_kas,a.nilai+a.nilai_ppn-isnull(c.nilai_kas,0)  as saldo, isnull(datediff(day,a.tanggal,d.tgl),0) as jum_hari,keterangan
 from piutang_m a
 inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
 left join (select a.no_piutang,a.kode_lokasi,sum(a.nilai) as nilai_kas
            from piubayar_d a
            inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='08' and b.tanggal<='$tgl_aging'  
            group by a.no_piutang,a.kode_lokasi
            )c on a.no_piutang=c.no_piutang and a.kode_lokasi=b.kode_lokasi
 left join (select a.no_piutang,a.kode_lokasi, max(b.tanggal) as tgl
            from piubayar_d a
            inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='08' and b.tanggal<='$tgl_aging'  
            group by a.no_piutang,a.kode_lokasi
 ) d on a.no_piutang=d.no_piutang and a.kode_lokasi=b.kode_lokasi
 $this->filter
 order by a.no_piutang";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aging piutang",$this->lokasi,"Tanggal Aging ".$tgl_aging);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
     <td width='100' rowspan='2'  align='center' class='header_laporan'>No Piutang</td>
	 <td width='100' rowspan='2'  align='center' class='header_laporan'>Dasar Pekerjaan</td>
	 <td width='60' rowspan='2'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150' rowspan='2'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='200' rowspan='2'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='90'  rowspan='2' align='center' class='header_laporan'>Nilai Tagihan</td>
	 <td colspan='3'  align='center' class='header_laporan'>Aging</td>
     <td width='90' rowspan='2'  align='center' class='header_laporan'>Bayar</td>
     <td width='90' rowspan='2'  align='center' class='header_laporan'>Jumlah Hari</td>
	 <td width='90' rowspan='2'  align='center' class='header_laporan'>Saldo</td>
     </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>0 - 180 HARI </td>
     <td width='90'  align='center' class='header_laporan'>180 - 360 HARI</td>
     <td width='90'  align='center' class='header_laporan'> > 360 HARI</td>
   </tr>  ";
		$tagihan=0;$nilai_kas=0;$aging1=0;$aging2=0;$aging3=0;$saldo=0;$jum_hari=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tagihan=$tagihan+$row->tagihan;
		
			$nilai_kas=$nilai_kas+$row->nilai_kas;
            $saldo=$saldo+$row->saldo;
            $jum_hari=$jum_hari+$row->jum_hari;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPiutang('$row->no_piutang','$row->kode_lokasi');\">$row->no_piutang</a>";
		echo "</td>
		<td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tagihan,0,",",".")."</td>";
     if ($row->saldo!=0)
			{
				$aging1=$aging1+$row->aging1;
				$aging2=$aging2+$row->aging2;
				$aging3=$aging3+$row->aging3;
				echo "<td class='isi_laporan' align='right'>".number_format($row->aging1,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->aging2,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($row->aging3,0,",",".")."</td>";
			}
			else
			{
				echo "<td class='isi_laporan' align='right'>0</td>
		 <td class='isi_laporan' align='right'>0</td>
		 <td class='isi_laporan' align='right'>0</td>";
			}
	 echo "<td class='isi_laporan' align='right'>";
	 echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_piutang','$row->kode_lokasi','$periode');\">".number_format($row->nilai_kas,0,",",".")."</a>";
        echo "</td>
     <td class='isi_laporan' align='right'>".number_format($row->jum_hari,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
      <td class='isi_laporan' align='right'>".number_format($tagihan,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging1,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($aging2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($aging3,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($jum_hari,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
