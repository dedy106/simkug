<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRekapPbl extends server_report_basic
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
        $periode=$tmp[1];
        
        $sql="select a.kode_lokasi,a.no_shmbeli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_set,'%d/%m/%Y') as tgl_set,a.keterangan,
		a.kode_kelola,b.nama as nama_kelola
from inv_shmbeli_m a
inner join inv_kelola b on a.kode_kelola=b.kode_kelola
$this->filter order by a.no_shmbeli";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
        echo "<style type='text/css' media='print'>
            @page { size: landscape; }
        </style>";
        while ($row = $rs->FetchNextObject($toupper=false))
		{
        echo "<div align='center'>";
        
        echo"<table border='0' cellspacing='0' cellpadding='0'>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>REKAPITULASI REALISASI PEMBELIAN SAHAM BURSA</td>
        </tr>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>TANGGAL TRANSAKSI : ".substr($row->tanggal,0,2)." ".$AddOnLib->ubah_periode(substr($row->tanggal,6,4).substr($row->tanggal,3,2))."</td>
        </td>
        <tr>
            <td style='font-weight:bold;font-size: 14px;'>TANGGAL SETTLEMENT : ".substr($row->tgl_set,0,2)." ".$AddOnLib->ubah_periode(substr($row->tgl_set,6,4).substr($row->tgl_set,3,2))."</td>
        </tr>
        <tr>
            <td style='text-align:right;font-size:10px;padding-bottom:10px'>$row->no_shmbeli/$row->nama_kelola</td>
        </tr>
        <tr>
            <td>";
            echo "<table border='1' cellspacing='2' cellpadding='1' class='kotak'>  
            <tr>
                <td width='30'  rowspan='2' align='center' class='header_laporan'>No</td>
                <td width='200'  align='center' class='header_laporan' rowspan='2'>Nama Saham</td>
                <td width='240'  align='center' class='header_laporan' colspan='3'>Pembelian</td>
                <td width='240'  align='center' class='header_laporan' colspan='3'>Cost</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>Total Harga Pembelian  (termasuk Cost) (Rp)</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>PPh Pasal 23 atas Komisi Broker (Rp)</td>
                <td width='90'  align='center' class='header_laporan' rowspan='2'>Pembayaran kepada Broker (Rp)</td>
                <td width='150'  align='center' class='header_laporan' rowspan='2'>Broker</td>
            </tr>
            <tr>
                <td  width='80' align='center' class='header_laporan'>Harga Per Lembar (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Jumlah Lembar</td>
                <td  width='80' align='center' class='header_laporan'>Total Harga Pembelian (sebelum Fee Broker & Tax) (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Komisi  Broker (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>VAT (Rp)</td>
                <td  width='80' align='center' class='header_laporan'>Biaya (Rp) </td>
            </tr> 
            <tr>
                <td  align='center' class='header_laporan'>1</td>
                <td  align='center' class='header_laporan'>2</td>
                <td  align='center' class='header_laporan'>3</td>
                <td  align='center' class='header_laporan'>4</td>
                <td  align='center' class='header_laporan'>5=3x4</td>
                <td  align='center' class='header_laporan'>6</td>
                <td  align='center' class='header_laporan'>7</td>
                <td  align='center' class='header_laporan'>8</td>
                <td  align='center' class='header_laporan'>9=5+6+7+8</td>
                <td  align='center' class='header_laporan'>10=6x2,0%</td>
                <td  align='center' class='header_laporan'>11=9-10</td>
                <td  align='center' class='header_laporan'>12</td>
            </tr> ";
            $sql2="select a.kode_saham,a.nama,round(b.harga,2) as harga,b.jumlah,b.n_beli,b.komisi,b.vat,b.levi,b.n_beli+b.komisi+b.vat+b.levi as total,b.pph,b.n_beli+b.komisi+b.vat+b.levi-b.pph as bayar, c.nama as nama_broker
            from inv_saham a
            left join inv_shmbeli_d b on a.kode_saham=b.kode_saham
            left join inv_broker c on b.kode_broker=c.kode_broker
            where b.no_shmbeli='$row->no_shmbeli' ";
    
            $rs2 = $dbLib->execute($sql2);
            $jum=0;$n_beli=0;$komisi=0;$vat=0;$levi=0;$total=0;$pph;$bayar=0;
            $nu=1;
            while ($row2 = $rs2->FetchNextObject($toupper=false))
            {
                $jum+=$row2->jum;
                $n_beli+=$row2->n_beli;	
                $komisi+=$row2->komisi;
                $vat+=$row2->vat;
                $levi+=$row2->levi;
                $pph+=$row2->pph;
                $bayar+=$row2->bayar;	
    
            echo "<tr >
                <td class='isi_laporan' align='center'>$nu</td>
                <td class='isi_laporan'>$row2->kode_saham-$row2->nama</td>
                <td class='isi_laporan' align='right'>".number_format($row2->harga,2,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row2->jumlah,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row2->n_beli,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->komisi,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->vat,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->levi,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->total,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->pph,0,",",".")."
                </td>
                <td class='isi_laporan' align='right'>".number_format($row2->bayar,0,",",".")."
                </td>
                <td class='isi_laporan'>$row2->nama_broker
                </td>
                </tr>";
                $nu++;
        
            }
            echo "<tr >
                    <td class='isi_laporan' align='center'></td>
                    <td class='isi_laporan'><b><i>TOTAL (Rp)</i><b></td>
                    <td class='isi_laporan' align='right'>&nbsp;</td>
                    <td class='header_laporan' align='right'> &nbsp;</td>
                    <td class='header_laporan' align='right'>".number_format($n_beli,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($komisi,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($vat,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($levi,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($total,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($pph,0,",",".")."
                    </td>
                    <td class='header_laporan' align='right'>".number_format($bayar,0,",",".")."
                    </td>
                    <td class='header_laporan'>-
                    </td>
                    </tr>
                </table>";
        echo"</td>
        </tr>
        </table>";
       
        echo "</div>";
        }
		return "";
		
	}
	
}
?>
