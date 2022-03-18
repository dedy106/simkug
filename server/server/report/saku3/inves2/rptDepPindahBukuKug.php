<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDepPindahBukuKug extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		
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
		$periode=$tmp[0];
		
		
		$sql="select a.no_shop,a.kode_lokasi,a.nodin,a.kepada1,a.dari1,a.lamp1,a.hal1,a.nikttd1,a.jab1,a.tanggal,
		substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,
		c.nama as nama_bank,c.no_fax,a.keterangan
from inv_shop_m a
inner join inv_depo2_m b on a.no_shop=b.no_shop and a.kode_lokasi=b.kode_lokasi
inner join inv_bank c on b.bdepo=c.kode_bank
$this->filter order by a.no_shop";
		
		$rs=$dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		
		echo "<div align='center'>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='right'>NOTA KONFIRMASI </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='147'>Nomor</td>
        <td width='643'>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;$row->nodin </td>
      </tr>
      <tr>
        <td>Kepada Yth </td>
        <td>: Pompinan $row->nama_bank </td>
      </tr>
      <tr>
        <td>Fax No </td>
        <td>: $row->no_fax</td>
      </tr>
      <tr>
        <td>Dari</td>
        <td>: $row->kepada1 </td>
      </tr>
      <tr>
        <td>Perihal</td>
        <td>: $row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='40'>1.</td>
        <td width='760'>Sesuai kesepakatan / persetujuan per telepon : </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Tanggal a antara a dari Kantor Pusat YAKES TELKOM , dengan a dari Bank Saudara , Mohon pemindahbukuan dana sebagai berikut : </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><table width='760' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='156'>Dari</td>
            <td width='594'>: $row->dari1 </td>
          </tr>
          <tr>
            <td>No Rekening </td>
            <td>: a </td>
          </tr>
          <tr>
            <td>Atas Nama </td>
            <td>: a </td>
          </tr>
          <tr>
            <td>Jumlah Dana </td>
            <td>: a </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Kepada</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td><table width='760' border='0' cellspacing='2' cellpadding='1'>
          <tr>
            <td width='150'>Bank</td>
            <td width='610'>: a </td>
          </tr>
          <tr>
            <td>No Rekening </td>
            <td>: a </td>
          </tr>
          <tr>
            <td>Atas Nama </td>
            <td>: a </td>
          </tr>
          <tr>
            <td>Jumlah Dana </td>
            <td>: a </td>
          </tr>
          <tr>
            <td>Untuk</td>
            <td>: a </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Pelaksanaan</td>
            <td>: a </td>
          </tr>
        </table></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>2.</td>
        <td>Demikian harap maklum, dan terima kasih atas perhatian serta kerjasama yang diberikan. </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Bandung , a </td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='221' height='60'>&nbsp;</td>
        <td width='329'>&nbsp;</td>
        <td width='236'>&nbsp;</td>
      </tr>
      <tr>
        <td align='center'>a</td>
        <td>&nbsp;</td>
        <td align='center'>a</td>
      </tr>
      <tr>
        <td align='center'>a</td>
        <td>&nbsp;</td>
        <td align='center'>a</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>
			<br>";
			
			
		}
	echo "</td>
  </tr>
</table>";
		echo "</div>";
		return "";
		
	}
	
}
?>
