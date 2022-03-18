<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_uin_rptGarDetail extends server_report_basic
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
		$tahun=$tmp[1];
		$nik=$tmp[2];
		$jenis_pp=$tmp[3];
		$kode_pp=$tmp[4];
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$nama_pp="";
		if ($jenis_pp=="=")
		{
			$sql="select nama from pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			$nama_pp="<br>".$row->nama;
			
		}
		$sql="select a.kdsatker,a.kddept,a.kdunit,a.kdprogram 
from uin_lokasi a 
 where a.kode_lokasi='23'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$kddept=$row->kddept;
		$kdunit=$row->kdunit;
		$kdsatker=$row->kdsatker;
		$kdprogram=$row->kdprogram;
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Rincian Realisasi Kertas Kerja Belanja",$this->lokasi.$nama_pp,"TAHUN ".$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='900' >
   <tr bgcolor='#CCCCCC'>
     <td width='40'  align='center' class='header_laporan' height='25'>#</td>
	 <td width='80'  align='center' class='header_laporan'>Kode</td>
     <td width='300'  align='center' class='header_laporan'>Uraian</td>
	 <td width='90'  align='center' class='header_laporan'>Anggaran</td>
	 <td width='90'  align='center' class='header_laporan'>Realisasi</td>
	 <td width='90'  align='center' class='header_laporan'>Saldo</td>
     </tr> 
";
		$sql="select a.kddept+'.'+a.kdunit+'.'+a.kdprogram as kode_program,a.nmprogram,isnull(b.total,0) as total 
				from uin_program a
				inner join (select a.kdprogram,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdprogram='$kdprogram' and substring(a.kode_akun,1,1)='5'
				group by a.kdprogram
						)b on a.kdprogram=b.kdprogram
				where a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdprogram='$kdprogram' 
				order by a.kdprogram
			";
		
		
		$rs = $dbLib->execute($sql);
	
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo " <tr bgcolor='#ccccf8'>
     <td  class='header_laporan'>Prog</td>
	 <td  class='header_laporan'>$row->kode_program</td>
     <td class='header_laporan'>$row->nmprogram</td>
	 <td  align='right' class='header_laporan'>".number_format($row->total,0,",",".")."</td>
	 <td  align='right' class='header_laporan'>".number_format($row->total,0,",",".")."</td>
	 <td  align='right' class='header_laporan'>".number_format($row->total,0,",",".")."</td>
	 
     </tr> ";
			$sql="select a.kdgiat,a.nmgiat,isnull(b.total,0) as total 
				from uin_giat a
				inner join (select a.kdgiat,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.kddept='$kddept' and a.kdunit='$kdunit' and substring(a.kode_akun,1,1)='5'
				group by a.kdgiat
						)b on a.kdgiat=b.kdgiat
				order by a.kdgiat
			";
			
			$rs1 = $dbLib->execute($sql);
				
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo " <tr bgcolor='#b5fbb5'>
     <td  class='header_laporan'>Giat</td>
	 <td  class='header_laporan'>$row1->kdgiat</td>
     <td class='header_laporan'>$row1->nmgiat</td>
	 <td  align='right' class='header_laporan'>".number_format($row1->total,0,",",".")."</td>
	 <td  align='right' class='header_laporan'>".number_format($row1->total,0,",",".")."</td>
	 <td  align='right' class='header_laporan'>".number_format($row1->total,0,",",".")."</td>
	 
     </tr> ";
				$sql="select a.kdoutput,a.nmoutput,isnull(b.total,0) as total 
				from uin_output a
				inner join (select a.kdoutput,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter  and a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and substring(a.kode_akun,1,1)='5' $kdoutput
				group by a.kdoutput
						)b on a.kdoutput=b.kdoutput
				where a.kdgiat='$row1->kdgiat'
				order by a.kdoutput ";
				
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					echo " <tr bgcolor='#fed5d5'>
		 <td  class='header_laporan'>Out</td>
		 <td  class='header_laporan'>$row2->kdoutput</td>
		 <td class='header_laporan'>$row2->nmoutput</td>
		 <td   align='right' class='header_laporan'>".number_format($row2->total,0,",",".")."</td>
		 <td   align='right' class='header_laporan'>".number_format($row2->total,0,",",".")."</td>
		 <td   align='right' class='header_laporan'>".number_format($row2->total,0,",",".")."</td>
		 
		 </tr> ";
					$sql="select a.kdsoutput,a.nmsoutput,isnull(b.total,0) as total 
				from uin_soutput a
				inner join (select a.kdsoutput,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and  a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput' and substring(a.kode_akun,1,1)='5'
				group by a.kdsoutput
						)b on a.kdsoutput=b.kdsoutput
				where a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput'
				order by a.kdsoutput ";
					
					$rs3 = $dbLib->execute($sql);
					while ($row3 = $rs3->FetchNextObject($toupper=false))
					{
						echo " <tr bgcolor='#e0fdb5'>
			 <td  class='header_laporan'>sOut</td>
			 <td  class='header_laporan'>$row3->kdsoutput</td>
			 <td class='header_laporan'>$row3->nmsoutput</td>
			 <td   align='right' class='header_laporan'>".number_format($row3->total,0,",",".")."</td>
			 <td   align='right' class='header_laporan'>".number_format($row3->total,0,",",".")."</td>
			 <td   align='right' class='header_laporan'>".number_format($row3->total,0,",",".")."</td>
			 
			 </tr> ";
						$sql="select a.kdkmpnen,a.nmkmpnen,isnull(b.total,0) as total 
				from uin_kmpnen a
				inner join (select a.kdkmpnen,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and substring(a.kode_akun,1,1)='5'
				group by a.kdkmpnen
						)b on a.kdkmpnen=b.kdkmpnen
				where a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput'  and a.kdsoutput='$row3->kdsoutput'
				order by a.kdsoutput";
						
						$rs4 = $dbLib->execute($sql);
						while ($row4 = $rs4->FetchNextObject($toupper=false))
						{
							echo " <tr bgcolor='#d7e4f6'>
				 <td  class='header_laporan'>Kmp</td>
				 <td  class='header_laporan'>$row4->kdkmpnen</td>
				 <td class='header_laporan'>$row4->nmkmpnen</td>
				 <td   align='right' class='header_laporan'>".number_format($row4->total,0,",",".")."</td>
				 <td   align='right' class='header_laporan'>".number_format($row4->total,0,",",".")."</td>
				 <td   align='right' class='header_laporan'>".number_format($row4->total,0,",",".")."</td>
				 
				 </tr> ";
							$sql="select a.kdskmpnen,a.urskmpnen,isnull(b.total,0) as total 
				from uin_d_skmpnen a
				inner join (select a.kdskmpnen,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and b.tahun='2019' and a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and substring(a.kode_akun,1,1)='5'
				group by a.kdskmpnen
						)b on a.kdskmpnen=b.kdskmpnen
				where a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput'  and a.kdkmpnen='$row4->kdkmpnen'
				order by a.kdskmpnen";
							
							$rs5 = $dbLib->execute($sql);
							while ($row5 = $rs5->FetchNextObject($toupper=false))
							{
								echo " <tr bgcolor='#bafcce'>
					 <td  class='header_laporan'>sKmp</td>
					 <td  class='header_laporan'>$row5->kdskmpnen</td>
					 <td class='header_laporan'>$row5->urskmpnen</td>
					 <td   align='right' class='header_laporan'>".number_format($row5->total,0,",",".")."</td>
					 <td   align='right' class='header_laporan'>".number_format($row5->total,0,",",".")."</td>
					 <td   align='right' class='header_laporan'>".number_format($row5->total,0,",",".")."</td>
					 </tr> ";
								$sql="select a.kdakun,a.nmakun,isnull(b.total,0) as total 
				from uin_akun a
				inner join (select a.kode_akun,sum(a.total) as total
				from uin_usul_d a
				inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				$this->filter and  a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdgiat='$row1->kdgiat' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen' and substring(a.kode_akun,1,1)='5'
				group by a.kode_akun
						)b on a.kdakun=b.kode_akun
				order by a.kdakun";
								
								
								$rs6 = $dbLib->execute($sql);
								while ($row6 = $rs6->FetchNextObject($toupper=false))
								{
									echo " <tr >
						 <td  class='header_laporan'>Akun</td>
						 <td  class='header_laporan'>$row6->kdakun</td>
						 <td class='header_laporan'>$row6->nmakun</td>
						 <td   align='right' class='header_laporan'>".number_format($row6->total,0,",",".")."</td>
						 <td   align='right' class='header_laporan'>".number_format($row6->total,0,",",".")."</td>
						 <td   align='right' class='header_laporan'>".number_format($row6->total,0,",",".")."</td>
						 
						 </tr> ";
									$sql="select a.keterangan as nmitem,a.vol as volkeg,a.satuan as satkeg,a.tarif as hargasat,a.total as jumlah 
									from uin_usul_d a 
									$this->filter and  a.kdgiat='$row1->kdgiat' and a.kddept='$kddept' and a.kdunit='$kdunit' and a.kdprogram='$kdprogram' and a.kdoutput='$row2->kdoutput' and a.kdsoutput='$row3->kdsoutput' and a.kdkmpnen='$row4->kdkmpnen' and a.kdskmpnen='$row5->kdskmpnen' and a.kode_akun='$row6->kdakun'
									order by a.nu";
									
									$rs7 = $dbLib->execute($sql);
									while ($row7 = $rs7->FetchNextObject($toupper=false))
									{
										echo " <tr>
							 <td  class='isi_laporan'>&nbsp;</td>
							 <td  class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'> - $row7->nmitem</td>
							 <td   align='right' class='isi_laporan'>".number_format($row7->jumlah,0,",",".")."</td>
							 <td   align='right' class='isi_laporan'>".number_format($row7->jumlah,0,",",".")."</td>
							 <td   align='right' class='isi_laporan'>".number_format($row7->jumlah,0,",",".")."</td>
							 </tr> ";
										
									}
									
								}
								
							}
						}
					}
				
				}
			}
			$i=$i+1;
		}
		return "";
	}
	
}

?>
