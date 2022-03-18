<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptGajiSlip extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.nik)
from karyawan a
left join (select distinct nik,kode_lokasi,periode
           from fri_gaji_d 
           where periode='$periode' and kode_lokasi='$kode_lokasi'
           )d on a.nik=d.nik and a.kode_lokasi=d.kode_lokasi";
		
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
		$sql="select a.nik,a.nama,a.jabatan,a.sts_pajak,a.npwp,c.tanggal,datepart(month,c.tanggal) as bulan,datepart(year,c.tanggal) as tahun,
		d.nama as nama_lok,d.npwp as npwp_lok,e.nilai as ptkp,
	   isnull(b.gpok,0) as gpok,isnull(b.pasu,0) as pasu,isnull(b.phad,0) as phad,isnull(b.pjam,0) as pjam,
	   isnull(b.pkan,0) as pkan,isnull(b.pkes,0) as pkes,isnull(b.pkop,0) as pkop,isnull(b.plain,0) as plain,
	   isnull(b.ppjk,0) as ppjk,isnull(b.tins,0) as tins,isnull(b.tjab,0) as tjab,isnull(b.tjam,0) as tjam,
	   isnull(b.tkel,0) as tkel,isnull(b.tkes,0) as tkes,isnull(b.tlemb,0) as tlemb,isnull(b.ttrans,0) as ttrans,
	   isnull(b.gpok,0)+isnull(b.tjab,0)+isnull(b.tkel,0)+isnull(b.tjam,0)+isnull(b.tins,0)+isnull(b.tlemb,0) as pdpt,
	   isnull(b.gpok,0)+isnull(b.tjab,0)+isnull(b.tkel,0)+isnull(b.tjam,0)+isnull(b.tins,0)+isnull(b.tlemb,0)+isnull(b.ttrans,0)+isnull(b.tkes,0) as bruto,
	   isnull(b.pasu,0)+isnull(b.phad,0)+isnull(b.pjam,0)+isnull(b.pkan,0)+isnull(b.pkes,0)+isnull(b.pkop,0)+isnull(b.plain,0)+isnull(b.ppjk,0)+isnull(b.padp,0) as pot,
	   isnull(b.padp,0) as padp
	   
from karyawan a 
left join (select a.nik,a.kode_lokasi,a.no_gaji,
				  sum(case a.kode_param when 'GPOK' then isnull(a.nilai,0) else 0 end) as gpok,
				  sum(case a.kode_param when 'PASU' then isnull(a.nilai,0) else 0 end) as pasu,
				  sum(case a.kode_param when 'PHAD' then isnull(a.nilai,0) else 0 end) as phad,
				  sum(case a.kode_param when 'PJAM' then isnull(a.nilai,0) else 0 end) as pjam,
				  sum(case a.kode_param when 'PKAN' then isnull(a.nilai,0) else 0 end) as pkan,
				  sum(case a.kode_param when 'PKES' then isnull(a.nilai,0) else 0 end) as pkes,
				  sum(case a.kode_param when 'PKOP' then isnull(a.nilai,0) else 0 end) as pkop,
				  sum(case a.kode_param when 'PLAIN' then isnull(a.nilai,0) else 0 end) as plain,
				  sum(case a.kode_param when 'PPJK' then isnull(a.nilai,0) else 0 end) as ppjk,
				  sum(case a.kode_param when 'TINS' then isnull(a.nilai,0) else 0 end) as tins,
				  sum(case a.kode_param when 'TJAB' then isnull(a.nilai,0) else 0 end) as tjab,
				  sum(case a.kode_param when 'TJAM' then isnull(a.nilai,0) else 0 end) as tjam,
				  sum(case a.kode_param when 'TKEL' then isnull(a.nilai,0) else 0 end) as tkel,
			      sum(case a.kode_param when 'TKES' then isnull(a.nilai,0) else 0 end) as tkes,
				  sum(case a.kode_param when 'TLEMB' then isnull(a.nilai,0) else 0 end) as tlemb,
				  sum(case a.kode_param when 'TTRANS' then isnull(a.nilai,0) else 0 end) as ttrans,
				  sum(case a.kode_param when 'PADP' then isnull(a.nilai,0) else 0 end) as padp 
			from fri_gaji_d a 
			where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
			group by a.nik,a.kode_lokasi,a.no_gaji 
			)b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 
left join fri_gaji_m c on b.no_gaji=c.no_gaji and b.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=b.kode_lokasi
inner join fri_status_pajak e on a.sts_pajak=e.sts_pajak and a.kode_lokasi=e.kode_lokasi
where c.kode_lokasi='$kode_lokasi' and c.periode='$periode' ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/frigia2.jpg";
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=strtoupper($AddOnLib->ubah_bulan($row->bulan));
			echo "<table width='1000' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td valign='top'><table width='500' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='180' rowspan='2'><img src='$pathfoto' /></td>
              <td width='320' valign='bottom'> PT. FRIGIA AIR CONDITIONING</td>
            </tr>
            <tr>
              <td valign='top'>Jl. Naripan No. 34 Bandung</td>
            </tr>
        </table></td>
      </tr>
     
      <tr>
        <td align='center'>PERINCIAN GAJI</td>
      </tr>
      <tr>
        <td align='center'>BULAN : April 2011 </td>
      </tr>
           <tr>
        <td align='center'><table width='400' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='96'>Nama</td>
              <td width='392'>: $row->nama ($row->sts_pajak)</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td>: $row->jabatan </td>
            </tr>
            <tr>
              <td>NIP</td>
              <td>: $row->nik </td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='20' align='center'>1</td>
              <td width='200'>Gaji Pokok </td>
              <td width='30'>: Rp</td>
              <td width='89' align='right'>".number_format($row->gpok,0,',','.')."</td>
              <td width='18'>&nbsp;</td>
              <td width='30'>&nbsp;</td>
              <td width='95'>&nbsp;</td>
              <td width='20'>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>2</td>
              <td>Tunjangan Jabatan</td>
              <td>: Rp</td>
               <td width='89' align='right'>".number_format($row->tjab,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>3</td>
              <td>Tunjangan Keluarga</td>
              <td>: Rp</td>
               <td width='89' align='right'>".number_format($row->tkel,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>4</td>
              <td>Premi Asuransi Jamsostek</td>
              <td>: Rp</td>
               <td width='89' align='right'>".number_format($row->tjam,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>5</td>
              <td>Insentif</td>
              <td>: Rp</td>
               <td width='89' align='right'>".number_format($row->tins,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>6</td>
              <td>Lembur</td>
              <td>: Rp</td>
              <td width='89' align='right'>".number_format($row->tlemb,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>7</td>
              <td>Transport</td>
              <td>: Rp</td>
               <td width='89' align='right'>".number_format($row->ttrans,0,',','.')."</td>
              <td align='center'>+</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Rp.</td>
              <td align='right'>".number_format($row->pdpt,0,',','.')."</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>8</td>
              <td>Penggantian biaya kesehatan</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Rp.</td>
              <td align='right'>".number_format($row->tkes,0,',','.')."</td>
              <td align='center'>+</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>Gaji Bruto </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Rp.</td>
              <td align='right'>".number_format($row->bruto,0,',','.')."</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>&nbsp;</td>
              <td>Pengurang</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>1</td>
              <td>Asuransi Dibayar Perusahaan</td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->pjam,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>2</td>
              <td>Asuransi Dibayar Pekerja</td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->padp,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>3</td>
              <td>Pajak Penghasilan</td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->ppjk,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>4</td>
              <td>Potongan Kehadiran</td>
              <td>: Rp</td>
             <td align='right'>".number_format($row->phad,0,',','.')."</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'>5</td>
              <td>Angsuran Pinjaman </td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->pkan,0,',','.')."</td>
              <td align='center'>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
			 <tr>
              <td align='center'>6</td>
              <td>Angsuran Koperasi </td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->pkop,0,',','.')."</td>
              <td align='center'>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
			 <tr>
              <td align='center'>7</td>
              <td>Potongan Lain-Lain </td>
              <td>: Rp</td>
              <td align='right'>".number_format($row->plain,0,',','.')."</td>
              <td align='center'>+</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Rp.</td>
              <td align='right'>".number_format($row->pot,0,',','.')."</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>Gaji Bersih </td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>Rp.</td>
              <td align='right'>".number_format($row->bruto-$row->pot,0,',','.')."</td>
              <td>&nbsp;</td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'><table width='500' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='365'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
              <td width='325'>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>Yang Menerima </td>
            </tr>
            <tr>
              <td height='50'>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>Kiagoos Syahbany Ghany Aziz</td>
              <td>$row->nik</td>
            </tr>
            <tr>
              <td>Direktur Keuangan</td>
              <td>$row->nama</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
    <td><table width='500' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td align='center'>BUKTI PEMOTONGAN PAJAK PENGHASILAN (PPh Pasal 21)</td>
      </tr>
      <tr>
        <td align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'><table width='400' border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='150'>Nama</td>
              <td width='250'>: $row->nama </td>
            </tr>
            <tr>
              <td>NPWP</td>
              <td>: $row->npwp </td>
            </tr>
            <tr>
              <td>Bulan</td>
              <td>: $bulan $row->tahun </td>
            </tr>
        </table></td>
      </tr>
      <tr>
        <td><table border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='18' align='center'>&nbsp;</td>
            <td colspan='2'>Penghasilan/Gaji Bruto</td>
            <td width='89'>&nbsp;</td>
            <td width='17'>&nbsp;</td>
            <td width='29'>Rp.</td>
            <td align='right'>".number_format($row->bruto,0,',','.')."</td>
            <td width='20'>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='2'>Penghasilan/Gaji (Disetahunkan)</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format($row->bruto*12,0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td width='200'>Penghasilan Lainnya</td>
            <td width='30'>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td>Jumlah Bruto (Setahun)</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(($row->bruto*12),0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td>Biaya Jabatan (5%)</td>
            <td>: Rp</td>
            <td align='right'>".number_format(($row->bruto*0.05)*12,0,',','.')."</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td>Asuransi Dibayar Pekerja</td>
            <td>: Rp</td>
           <td align='right'>".number_format($row->padp*12,0,',','.')."</td>
            <td align='center'>+</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td align='center'>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(($row->padp*12)+(($row->bruto*0.05)*12),0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(($row->bruto*12)-($row->padp*12)-(($row->bruto*0.05)*12),0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='3'>Penghasilan Tidak Kena Pajak (TK/0)</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format($row->ptkp,0,',','.')."</td>
            <td align='center'>+</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td colspan='3'>Penghasilan Kena Pajak (PhKP)</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(($row->bruto*12)-($row->padp*12)-(($row->bruto*0.05)*12)-$row->ptkp,0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td colspan='3'>PPh Pasal 21 Setahun</td>
            <td>&nbsp;</td>
             <td>Rp.</td>
            <td align='right'>".number_format((($row->bruto*12)-($row->padp*12)-(($row->bruto*0.05)*12)-$row->ptkp)*0.05,0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='3'>PPh Pasal 21 Bulan ini</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(((($row->bruto*12)-($row->padp*12)-(($row->bruto*0.05)*12)-$row->ptkp)*0.05)/12,0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='3'>PPh Ps. 21 Yang Ditanggung Pemerintah</td>
            <td>&nbsp;</td>
             <td>Rp.</td>
            <td align='right'>0</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td align='center'>&nbsp;</td>
            <td colspan='3'>PPh. Ps. 21 Yang Dipotong</td>
            <td>&nbsp;</td>
            <td>Rp.</td>
            <td align='right'>".number_format(((($row->bruto*12)-($row->padp*12)-(($row->bruto*0.05)*12)-$row->ptkp)*0.05)/12,0,',','.')."</td>
            <td>&nbsp;</td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'><table border='0' cellspacing='2' cellpadding='1'>
            <tr>
              <td width='172'>&nbsp;</td>
              <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
              </tr>
            <tr>
              <td>&nbsp;</td>
              <td colspan='2'>Pemotong Pajak </td>
              </tr>
            <tr>
              <td>&nbsp;</td>
              <td width='63'>&nbsp;</td>
              <td width='245'>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>Nama</td>
              <td>: $row->nama_lok </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>NPWP</td>
              <td>: $row->npwp_lok </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td height='50'>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td colspan='2'>Kiagoos Syahbany Ghany Aziz</td>
              </tr>
            <tr>
              <td>&nbsp;</td>
              <td colspan='2'>Direktur Keuangan</td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table><br><br>";

		 
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
