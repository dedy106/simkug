<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_siaga_rptSpb2 extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(a.no_spb)
from gr_spb_m a
inner join gr_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
 $this->filter ";
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
		$sql = "select a.no_spb,a.tanggal,a.keterangan,a.nilai,date_format(a.tanggal,'%d/%m/%Y') as tgl,
	   b.nama as nama_vendor,b.alamat,a.no_po,a.no_dok,a.no_ref,date_format(a.tgl_po,'%d/%m/%Y') as tgl_po,
	   date_format(a.tgl_ba,'%d/%m/%Y') as tgl_ba,date_format(a.tgl_dok,'%d/%m/%Y') as tgl_dok,substring(a.periode,1,4) as tahun,
	   b.bank,b.cabang,b.no_rek,b.nama_rek,a.nik_setuju,c.nama as nama_setuju,a.nik_gar,d.nama as nama_gar,e.nama as nama_curr,
	   isnull(f.pph,0) as pph,isnull(g.tagihan,0) as tagihan,case a.kode_curr when 'IDR' then 'Rp' else a.kode_curr end as kode_curr
from gr_spb_m a
inner join gr_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_setuju=c.nik
inner join karyawan d on a.nik_gar=d.nik
left join curr e on a.kode_curr=e.kode_curr
left join (select no_spb,sum(nilai_curr) as pph 
		   from gr_spb_j 
		   where kode_akun='2103.03'
		   group by no_spb
		   )f on a.no_spb=f.no_spb   
left join (select no_spb,sum(nilai_curr) as tagihan
		   from gr_spb_j 
		   where dc='D'
		   group by no_spb
		   )g on a.no_spb=g.no_spb 		   
$this->filter order by a.no_spb ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "image/gratika.jpg";
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_curr=="Rp")
			{
				$nilai=$AddOnLib->terbilang($row->nilai);
			}
			else
			{
				$nilai=$AddOnLib->terbilang_curr($row->nilai,$row->nama_curr);
			} 
			echo	"<table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='146'><img src=$pathfoto width='80' height='99' /></td>
        <td width='640' align='center' class='istyle17'>SURAT PERINTAH BAYAR</td>
      </tr>
      <tr>
        <td colspan='2' align='center'>DIREKTORAT KEUANGAN</td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>No. PO </td>
        <td width='182'>: $row->no_po</td>
      </tr>
      <tr>
        <td>Tgl. PO </td>
        <td>: $row->tgl_po</td>
      </tr>
      <tr>
        <td>No./Tgl BA/Log TR </td>
        <td>: $row->no_ba / $row->tgl_ba</td>
      </tr>
      <tr>
        <td>No Dokumen </td>
        <td>: $row->no_dok</td>
      </tr>
      <tr>
        <td>No. Ref. Dokumen </td>
        <td>: $row->no_ref</td>
      </tr>
      <tr>
        <td>Tgl. Dok </td>
        <td>: $row->tgl_dok</td>
      </tr>
      <tr>
        <td>Kode Perkiraan </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Kode Lokasi </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Cost Centre </td>
        <td>:</td>
      </tr>
    </table></td>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td>No. SPB </td>
        <td width='182'>: $row->no_spb</td>
      </tr>
      <tr>
        <td>Tgl. SPB </td>
        <td>: $row->tgl</td>
      </tr>
      <tr>
        <td>No./Tgl. PRPK </td>
        <td>:</td>
      </tr>
      <tr>
        <td>No. DRK/TRIW </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Keg. Menurut DRK </td>
        <td>:</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>:</td>
      </tr>
      <tr>
        <td>Beban Angg Thn </td>
        <td>: $row->tahun</td>
      </tr>
      <tr>
        <td>Rekening </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Jenis Transaksi </td>
        <td>:</td>
      </tr>
    </table></td>
  </tr>
  <tr align='left'>
    <td colspan='2'><table width='400' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='23'>&nbsp;</td>
        <td width='367'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Dokumen Penagihan disahkan oleh</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Mgr. Finanace/GM Fin. &amp; Acc.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td height='60' valign='bottom'>$row->nama_setuju</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2'><table width='750' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='25'>&nbsp;</td>
        <td width='178'>Harap dibayarkan :<br></td>
        <td width='220'>&nbsp;</td>
        <td width='309'>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Sebesar </td>
        <td colspan='2'>: ".number_format($row->nilai,0,",",".")."</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Terbilang </td>
        <td colspan='2'>: $nilai</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Kepada </td>
        <td colspan='2'>: $row->nama_vendor</td>
       </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Alamat </td>
        <td colspan='2'>: $row->alamat</td>
       </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Bank </td>
        <td colspan='2'>: $row->bank</td>
     </tr>
      <tr>
        <td>&nbsp;</td>
        <td>No. Rekening </td>
        <td colspan='2'>: $row->no_rek</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Alamat Bank </td>
        <td colspan='2'>: $row->alamat</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Untuk Pembayaran </td>
        <td colspan='2'>: $row->keterangan</td>
        </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>GM Fin. &amp; Acc. / Dir. Adm. &amp; Keu.</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td height='60' valign='bottom'>$row->nama_gar</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align='center'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='158'>Catatan Pembayaran: </td>
        <td width='182'>:</td>
      </tr>
      <tr>
        <td>JUMLAH TAGIHAN </td>
        <td>: $row->kode_curr. ".number_format($row->tagihan,0,",",".")." </td>
      </tr>
      <tr>
        <td>POTONGAN</td>
        <td>: $row->kode_curr. 0</td>
      </tr>
      <tr>
        <td>          PPh </td>
        <td>: $row->kode_curr. ".number_format($row->pph,0,",",".")."</td>
      </tr>
      <tr>
        <td>SubTotal (a) </td>
         <td>: $row->kode_curr. ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>Potongan lain: </td>
        <td>:</td>
      </tr>
      <tr>
        <td>Jumlah Potongan lain (b) </td>
        <td>: $row->kode_curr. 0</td>
      </tr>
      <tr>
        <td>Jumlah dibayarkan (a-b) </td>
        <td>: $row->kode_curr. ".number_format($row->nilai,0,",",".")."</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td></td>
      </tr>
    </table></td>
    <td align='center' valign='top'><table width='350' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2'>Catatan Penerimaan : </td>
        </tr>
      <tr>
        <td colspan='2'>Telah diterima uang sejumlah : $row->kode_curr . ".number_format($row->nilai,0,",",".")." </td>
        </tr>
      <tr>
        <td width='68' valign='top'>Terbilang :</td>
        <td width='272' valign='top'>$nilai</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
      	<td colspan='2'>Jakarta, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='60' valign='top'>&nbsp;&nbsp; &nbsp;Catatan Perpajakan </td>
    <td valign='top'>&nbsp;&nbsp;&nbsp;&nbsp;Catatan Perbendaharaan:</td>
  </tr>
</table>
<br><DIV style='page-break-after:always'></DIV>
";
		
		}
		echo "</div>";
		return "";
	}
}
?>