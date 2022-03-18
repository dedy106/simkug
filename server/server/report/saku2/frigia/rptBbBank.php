<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptBbBank extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_akun=$tmp[2];
		$kode_pp=$tmp[3];
		$sql="select count(*) from (select a.kode_pp,a.nama as nama_pp,d.kode_akun,d.nama as nama_akun,a.kode_lokasi,isnull(b.so_awal,0) as so_awal,isnull(c.debet,0) as debet,isnull(c.kredit,0) as kredit, 
					 	   isnull(b.so_awal,0)+isnull(c.debet,0)-isnull(c.kredit,0) as so_akhir 
					 	from pp a 
						inner join (select kode_lokasi,kode_pp  
									from gldt_h 
									where kode_lokasi='$kode_lokasi' 
									group by kode_lokasi,kode_pp 
									) e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi  
					 	left join (select y.kode_akun,y.kode_pp,sum(case when y.dc='D' then y.nilai else -y.nilai end) so_awal 
					 			   from gldt_h y 
					 			   inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 			   where y.periode<'$periode' and y.kode_lokasi ='$kode_lokasi' and y.kode_akun='$kode_akun' 
					 			   group by y.kode_akun,y.kode_pp
					 			  ) b on a.kode_pp=b.kode_pp 
					 	left join (select x.kode_akun,x.kode_pp,sum(case when x.dc='D' then x.nilai else 0 end) as debet, 
					 					  sum(case when x.dc='C' then x.nilai else 0 end) as kredit 
					 			   from (select y.kode_akun,y.kode_pp,y.dc,y.nilai 
					 					 from gldt y 
					 			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 					 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					 union all 
					 					 select y.kode_akun,y.kode_pp,y.dc,y.nilai 
					 					 from gldt_h y 
					 			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 					 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					) x 
					 			   group by x.kode_akun,x.kode_pp 
					 			  ) c on a.kode_pp=c.kode_pp 
						left join masakun d on c.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
					 where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' )a ";
		
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
		$kode_akun=$tmp[2];
		$kode_pp=$tmp[3];
		$sql="select a.kode_pp,a.nama as nama_pp,d.kode_akun,d.nama as nama_akun,a.kode_lokasi,isnull(b.so_awal,0) as so_awal,isnull(c.debet,0) as debet,isnull(c.kredit,0) as kredit, 
					 	   isnull(b.so_awal,0)+isnull(c.debet,0)-isnull(c.kredit,0) as so_akhir 
					 	from pp a 
						inner join (select kode_lokasi,kode_pp  
									from gldt_h 
									where kode_lokasi='$kode_lokasi' 
									group by kode_lokasi,kode_pp 
									) e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi  
					 	left join (select y.kode_akun,y.kode_pp,sum(case when y.dc='D' then y.nilai else -y.nilai end) so_awal 
					 			   from gldt_h y 
					 			   inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 			   where y.periode<'$periode' and y.kode_lokasi ='$kode_lokasi' and y.kode_akun='$kode_akun' 
					 			   group by y.kode_akun,y.kode_pp
					 			  ) b on a.kode_pp=b.kode_pp 
					 	left join (select x.kode_akun,x.kode_pp,sum(case when x.dc='D' then x.nilai else 0 end) as debet, 
					 					  sum(case when x.dc='C' then x.nilai else 0 end) as kredit 
					 			   from (select y.kode_akun,y.kode_pp,y.dc,y.nilai 
					 					 from gldt y 
					 			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 					 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					 union all 
					 					 select y.kode_akun,y.kode_pp,y.dc,y.nilai 
					 					 from gldt_h y 
					 			   		 inner join flag_relasi z on y.kode_lokasi=z.kode_lokasi and z.kode_flag='001' and y.kode_akun=z.kode_akun 	
					 					 where y.periode='$periode' and y.kode_lokasi ='$kode_lokasi' and substring(y.periode,1,4)=substring('$periode',1,4) and y.kode_akun='$kode_akun' 
					 					) x 
					 			   group by x.kode_akun,x.kode_pp 
					 			  ) c on a.kode_pp=c.kode_pp 
						left join masakun d on c.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
					 where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'  ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan buku besar kas&bank" ,$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr>
    <td height='23' colspan='9' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>Periode </td>
        <td width='496' class='header_laporan'>:&nbsp;$periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Akun  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>:&nbsp;$row->nama_akun</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Kode PP  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama PP </td>
        <td class='header_laporan'>:&nbsp;$row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Lokasi </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan' align='center'>No Bukti</td>
	<td width='74' class='header_laporan' align='center'>No Dokumen</td>
    <td width='69' class='header_laporan' align='center'>Tanggal</td>
    <td width='233' class='header_laporan' align='center'>Keterangan</td>
    <td width='70' class='header_laporan' align='center'>Kode PP</td>
    <td width='70' class='header_laporan' align='center'>Kode Cust</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>";
			$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";
			
			$sql="select a.no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_pp,a.keterangan,
       case when a.dc='D' then nilai else 0 end as debet,
       case when a.dc='C' then nilai else 0 end as kredit 
from $tabel a  
where a.kode_akun='$kode_akun' and a.kode_lokasi='$kode_lokasi' 
order by a.tanggal ";
			error_log($sql);
			$rs1 = $dbLib->execute($sql);
			$saldo=$row->so_awal;
			$debet=0;
			$kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$saldo=$saldo + $row1->debet - $row1->kredit;	
				$debet=$debet+$row1->debet;
				$kredit=$kredit+$row1->kredit;	
				echo "<tr>
    <td valign='top' class='isi_laporan'>".$row1->no_bukti."</td>
	<td valign='top' class='isi_laporan'>".$row1->no_dokumen."</td>
    <td height='20' valign='top' class='isi_laporan'>".$row1->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row1->keterangan))."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row1->kode_cust."</td>
    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row1->debet,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row1->kredit,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
  </tr>";
			}
			echo "<tr>
    <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
    <td valign='top' class='sum_laporan'></td>
  </tr>
  <tr>
    <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
    <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
  