<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptStrukturKeuangan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		
		if ($this->filter2=='COA')
		{
			$sql = "select count(kode_neraca) from neraca ".$this->filter;
		}else
		{
			$sql = "select count(n.kode_neraca) ".
					"from neraca n left outer join relakun r on n.kode_neraca=r.kode_neraca and n.kode_fs=r.kode_fs and n.kode_lokasi=r.kode_lokasi ".
					"left outer join masakun m on r.kode_akun=m.kode_akun and r.kode_lokasi=m.kode_lokasi ".$this->filter;
		}
		$rs = $dbLib->execute($sql);		
		//error_log($this->filter2." ".$sql);
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
		if ($this->filter2=='COA')
		{
			$sql = "select kode_neraca,nama,jenis_akun,modul,level_spasi from neraca ".$this->filter." order by rowindex ";
		}else
		{
			$sql = "select n.kode_neraca,n.nama as nm,m.nama as nmakun,r.kode_akun,m.modul,m.jenis,m.kode_curr,m.block,level_spasi ".
					"from neraca n left outer join relakun r on n.kode_neraca=r.kode_neraca and n.kode_fs=r.kode_fs and n.kode_lokasi=r.kode_lokasi  ".
					"left outer join masakun m on r.kode_akun=m.kode_akun and r.kode_lokasi=m.kode_lokasi ".$this->filter." order by n.rowindex,r.kode_akun ";
		}			
		echo $sql;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan Struktur Keuangan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		if ($this->filter2=='COA')
		{
			echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
					<tr bgcolor='#CCCCCC'>
					 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
					 <td width='400' class='header_laporan'><div align='center'>Nama</div></td>
					 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
					 <td width='60' class='header_laporan'><div align='center'>Modul</div></td>
					</tr>";		
			while ($row = $rs->FetchNextObject($toupper=false))
			{
			    echo "<tr>
						 <td height='20' class='isi_laporan'>".$row->kode_neraca."</td>
						 <td class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
						 <td class='isi_laporan'>".$row->jenis_akun."</td>
						 <td class='isi_laporan'>".$row->modul."</td>
						</tr>";
			}
			echo "</table>";
		}else
		{
			echo "<table width='730' border='0' cellspacing='0' cellpadding='0' class='kotak'>
					<tr>
					 <td width='60' height='23' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='350' class='header_laporan'><div align='center'>&nbsp;</div></td>					 
					 <td width='60' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='50' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='100' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='60' class='header_laporan'><div align='center'>&nbsp;</div></td>
					 <td width='50' class='header_laporan'><div align='center'>&nbsp;</div></td>
					</tr>";
			$length=0;
			$cek=false;
			$jumrow=1;
			while ($row = $rs->FetchNextObject($toupper=false))
			{
			    if ($row->kode_akun=="")
				{
					if ($cek)
					{
						echo "</table></td>";
						echo "</tr>";
					}
					echo "<tr>
							 <td height='20' class='isi_laporan'>".$row->kode_neraca."</td>
							 <td class='isi_laporan'>".$AddOnLib->spasi($row->nm,$row->level_spasi)."</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							</tr>";
					$length=strlen($row->kode_neraca);
					$kode=substr($row->kode_neraca,0,$length);
					$cek=false;
					$firstrow=true;
				}else
				{
					
					if (substr($row->kode_neraca,0,$length)==$kode)
					{						
						if ($firstrow)
						{
							echo "<tr><td colspan='7'>";
							echo "<table border='1' width='730' cellspacing='0' cellpadding='0' class='kotak'>
								<tr bgcolor='#CCCCCC'>
								 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
								 <td width='350' class='header_laporan'><div align='center'>Nama</div></td>
								 <td width='60' class='header_laporan'><div align='center'>Neraca</div></td>
								 <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
								 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
								 <td width='60' class='header_laporan'><div align='center'>Curr</div></td>
								 <td width='50' class='header_laporan'><div align='center'>Block</div></td>
								</tr>";
							echo "<tr>
								 <td height='20' class='isi_laporan'>".$row->kode_akun."</td>
								 <td class='isi_laporan'>".$AddOnLib->spasi($row->nmakun,$row->level_spasi)."</td>
								 <td class='isi_laporan'>".$row->kode_neraca."</td>
								 <td class='isi_laporan'>".$row->modul."</td>
								 <td class='isi_laporan'>".$row->jenis."</td>
								 <td class='isi_laporan'>".$row->kode_curr."</td>
								 <td class='isi_laporan'>".$row->block."</td>
								</tr>";
								
						}else
						{
								
							if ($jumrow==1)
							{
								echo "<tr><td colspan='7'>";
								echo "<table border='1' width='730' cellspacing='0' cellpadding='0' class='kotak'>
									<tr bgcolor='#CCCCCC'>
									 <td width='60' height='23' class='header_laporan'><div align='center'>Kode</div></td>
									 <td width='350' class='header_laporan'><div align='center'>Nama</div></td>
									 <td width='60' class='header_laporan'><div align='center'>Neraca</div></td>
									 <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
									 <td width='100' class='header_laporan'><div align='center'>Jenis</div></td>
									 <td width='60' class='header_laporan'><div align='center'>Curr</div></td>
									 <td width='50' class='header_laporan'><div align='center'>Block</div></td>
									</tr>";	
							}
							echo "<tr>
								 <td height='20' class='isi_laporan'>".$row->kode_akun."</td>
								 <td class='isi_laporan'>".$AddOnLib->spasi($row->nmakun,$row->level_spasi)."</td>
								 <td class='isi_laporan'>".$row->kode_neraca."</td>
								 <td class='isi_laporan'>".$row->modul."</td>
								 <td class='isi_laporan'>".$row->jenis."</td>
								 <td class='isi_laporan'>".$row->kode_curr."</td>
								 <td class='isi_laporan'>".$row->block."</td>
								</tr>";
							if ($jumrow==50)
							{
								echo "</table></td>";
								echo "</tr>";
							}	
						}
					}
					$cek=true;					
					$firstrow=false;
					
				}
				$jumrow++;
			}
			echo "</table>";
		}
				
		echo "/div";
		return "";
	}
	
}
?>
