<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptShmMutasi extends server_report_basic
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
        $periode=$tmp[0];
        $filter2=$tmp[1];

        $sql = "select distinct a.kode_kelola,b.nama as nama_kelola 
        from inv_shmjual_d a
        inner join inv_kelola b on a.kode_kelola=b.kode_kelola
        $this->filter

        union 
        select distinct a.kode_kelola,b.nama as nama_kelola 
        from inv_shmbeli_d a
        inner join inv_kelola b on a.kode_kelola=b.kode_kelola
        $this->filter
        
        order by a.kode_kelola ";

        $rs=$dbLib->execute($sql);

		$AddOnLib=new server_util_AddOnLib();	
        $i=1;
       
            echo "<div align='center'>";
        echo"<table style='border-collapse: collapse;margin:10px' cellspacing='2' cellpadding='1' width='1400'>
                <style>
                    td{
                        border:1px solid black;
                        padding:2px;
                        font-size:12px !important
                    }
                </style>
                <thead>
                    <tr>
                        <th colspan='14' style='font-size:14px;text-align:left'>LAPORAN MUTASI SAHAM YAKES TELKOM </th>
                    </tr>
                    <tr style='height: 12.0pt;'>
                        <th style='font-size:14px;text-align:left'>Periode</th>
                        <th style='font-size:14px;text-align:left' colspan='13'>&nbsp;".$AddOnLib->ubah_periode($periode)."</th>
                    </tr>
                    <tr style=''>
                        <th style='' colspan='14'>&nbsp;</th>
                    </tr>
                </thead>
                <tbody style='font-size:12px !important'>
                    <tr style=''>
                        <td style='text-align:center' width='10' rowspan='2'>No</td>
                        <td style='text-align:center' width='100' rowspan='2'>Jenis Dana</td>
                        <td style='text-align:center' width='50' rowspan='2'>Kode Saham</td>
                        <td style='text-align:center' width='300' colspan='3'>Hasil Transaksi </td>
                        <td style='text-align:center' width='200' colspan='2'>Harga Perolehan</td>
                        <td style='text-align:center' width='200' colspan='2'>Nilai Buku</td>
                        <td style='text-align:center' width='200' colspan='2'>Gain (loss) Net</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Transaksi</td>
                        <td style='text-align:center' width='90' rowspan='2'>Tgl Settlement/Bayar</td>
                    </tr>
                    <tr style=''>
                        <td style='text-align:center' width='100' >Jumlah Saham</td>
                        <td style='text-align:center' width='100' >Harga per Saham (Net)</td>
                        <td style='text-align:center' width='100' >Jumlah (Net)</td>
                        <td style='text-align:center' width='100' >Per Saham</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Per Saham</td>
                        <td style='text-align:center' width='100' >Jumlah</td>
                        <td style='text-align:center' width='100' >Dari Harga Perolehan</td>
                        <td style='text-align:center' width='100' >Dari Harga Buku</td>
                    </tr>";
                    $jumlah1=0;$n_jual1=0;$n_oleh1=0;$n_buku1=0;$gl_oleh1=0;$gl_buku1=0;
                    while ($row = $rs->FetchNextObject($toupper=false))
                    {

                        echo" <tr style='font-weight:bold'>
                            <td style=' border-top: medium none;font-weight' colspan='14'>$row->nama_kelola</td>
                        </tr>";
                        
                        echo" <tr style='font-weight:bold'>
                            <td style=' border-top: medium none;font-weight' colspan='14'>PENJUALAN</td>
                        </tr>";
                        //JUAL
                        $no=1;
                        
                        $sql = "select 'Penjualan' as jenis, d.nama as nama_mi,e.nama as nama_plan, c.kode_saham, a.jumlah, a.n_jual/a.jumlah as hjual, a.n_jual-(komisi+vat+levi) as n_jual,
                        a.h_oleh, a.h_oleh * a.jumlah as n_oleh, a.h_buku, a.h_buku * a.jumlah as nbuku, (a.n_jual-(komisi+vat+levi) ) - (a.h_oleh * a.jumlah) as gl_oleh, (a.n_jual-(komisi+vat+levi) ) - (a.h_buku * a.jumlah) as gl_buku, convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set
                        from inv_shmjual_d a 
                        inner join inv_shmjual_m b on a.no_shmjual=b.no_shmjual 
                        inner join inv_saham c on a.kode_saham=c.kode_saham
                        inner join inv_kelola d on a.kode_kelola=d.kode_kelola
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $filter2 and a.kode_kelola = '$row->kode_kelola'
                        order by b.tanggal,c.kode_saham
                        ";
                        
                        $rs2 = $dbLib->execute($sql);
                        $jumlah_jl=0;$n_jual_jl=0;$n_oleh_jl=0;$n_buku_jl=0;$gl_oleh_jl=0;$gl_buku_jl=0;
                        while ($row2 = $rs2->FetchNextObject($toupper=false))
                        {
                            $jumlah_jl+=$row2->jumlah;
                            $n_jual_jl+=$row2->n_jual;
                            $n_oleh_jl+=$row2->n_oleh;
                            $n_buku_jl+=$row2->nbuku;
                            $gl_oleh_jl+=$row2->gl_oleh;
                            $gl_buku_jl+=$row2->gl_buku;
                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row2->nama_plan</td>
                            <td style='border-top: medium none;text-align:left'>$row2->kode_saham</td>
                            <td style='border-top: medium none;text-align:right'>". ($row2->jumlah != 0 ? number_format($row2->jumlah,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->hjual != 0 ? number_format($row2->hjual,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->n_jual != 0 ? number_format($row2->n_jual,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->h_oleh != 0 ? number_format($row2->h_oleh,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->n_oleh != 0 ? number_format($row2->n_oleh,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->h_buku != 0 ? number_format($row2->h_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->nbuku != 0 ? number_format($row2->nbuku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->gl_oleh != 0 ? number_format($row2->gl_oleh,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row2->gl_buku != 0 ? number_format($row2->gl_buku,4,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:left'>$row2->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row2->tgl_set</td>
                        </tr>";
                        $no++;

                        }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold' colspan='3'>TOTAL PENJUALAN</td>
                            <td style='text-align:right;' >".($jumlah_jl != 0 ? number_format($jumlah_jl,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_jual_jl != 0 ? number_format($n_jual_jl,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_oleh_jl != 0 ? number_format($n_oleh_jl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_buku_jl != 0 ? number_format($n_buku_jl,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_oleh_jl != 0 ? number_format($gl_oleh_jl,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_buku_jl != 0 ? number_format($gl_buku_jl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";

                        // BELI
                        
                        echo" <tr style=''>
                            <td style='border-top: medium none;font-weight:bold' colspan='14'>PEMBELIAN</td>
                        </tr>";
                        $no=1;
                        
                        $sql = "                        
                        select 'Pembelian' as jenis, d.nama as nama_mi,e.nama as nama_plan, c.kode_saham, a.jumlah, a.n_beli/a.jumlah as hbeli, a.n_beli,
                        0 as h_oleh, 0 as n_oleh, 0 as h_buku, 0 as nbuku,0 as gl_oleh, 0 as gl_buku,  convert(varchar,b.tanggal,103) as tanggal, convert(varchar,b.tgl_set,103) as tgl_set
                        from inv_shmbeli_d a 
                        inner join inv_shmbeli_m b on a.no_shmbeli=b.no_shmbeli
                        inner join inv_saham c on a.kode_saham=c.kode_saham
                        inner join inv_kelola d on a.kode_kelola=d.kode_kelola
                        inner join inv_plan e on a.kode_plan=e.kode_plan
                        $filter2 and a.kode_kelola = '$row->kode_kelola'
                        
                        order by b.tanggal,c.kode_saham ";
                        
                        $rs1 = $dbLib->execute($sql);
                        $jumlah_bl=0;$n_jual_bl=0;$n_oleh_bl=0;$n_buku_bl=0;$gl_oleh_bl=0;$gl_buku_bl=0;
                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                        {
                            $jumlah_bl+=$row1->jumlah;
                            $n_jual_bl+=$row1->n_beli;
                            $n_oleh_bl+=$row1->n_oleh;
                            $n_buku_bl+=$row1->nbuku;
                            $gl_oleh_bl+=$row1->gl_oleh;
                            $gl_buku_bl+=$row1->gl_buku;

                            echo" <tr style=''>
                            <td style=' border-top: medium none;'>$no</td>
                            <td style='border-top: medium none;text-align:left'>$row1->nama_plan</td>
                            <td style='border-top: medium none;text-align:left'>$row1->kode_saham</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->jumlah != 0 ? number_format($row1->jumlah,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->hbeli != 0 ? number_format($row1->hbeli,0,",",".") : "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_beli != 0 ? number_format($row1->n_beli,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_oleh != 0 ? number_format($row1->h_oleh,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->n_oleh != 0 ? number_format($row1->n_oleh,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->h_buku != 0 ? number_format($row1->h_buku,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->nbuku != 0 ? number_format($row1->nbuku,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_oleh != 0 ? number_format($row1->gl_oleh,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:right'>".($row1->gl_buku != 0 ? number_format($row1->gl_buku,0,",","."): "")."</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tanggal</td>
                            <td style='border-top: medium none;text-align:left'>$row1->tgl_set</td></tr>";


                        $no++;
                        }
                        echo"
                        <tr style='font-weight:bold'>
                            <td style='font-weight:bold' colspan='3'>TOTAL PEMBELIAN</td>
                            <td style='text-align:right;' >".($jumlah_bl != 0 ? number_format($jumlah_bl,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_jual_bl != 0 ? number_format($n_jual_bl,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_oleh_bl != 0 ? number_format($n_oleh_bl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_buku_bl != 0 ? number_format($n_buku_bl,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_oleh_bl != 0 ? number_format($gl_oleh_bl,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_buku_bl != 0 ? number_format($gl_buku_bl,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >&nbsp;</td>
                        </tr>";
                        $jumlah1+=$jumlah_bl+$jumlah_jl;
                        $n_jual1+=$n_jual_bl+$n_jual_jl;
                        $n_oleh1+=$n_oleh_bl+$n_oleh_jl;
                        $n_buku1+=$n_buku_bl+$n_buku_jl;
                        $gl_oleh1+=$gl_oleh_bl+$gl_oleh_jl;
                        $gl_buku1+=$gl_buku_bl+$gl_buku_jl;


                    }
                    echo"
                    <tr style='font-weight:bold'>
                        <td style='font-weight:bold' colspan='3'>TOTAL</td>
                        <td style='text-align:right;' >".($jumlah1 != 0 ? number_format($jumlah1,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_jual1 != 0 ? number_format($n_jual1,0,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_oleh1 != 0 ? number_format($n_oleh1,4,",",".") : "")."</td>
                            <td style='text-align:right' >&nbsp;</td>
                            <td style='text-align:right' >".($n_buku1 != 0 ? number_format($n_buku1,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_oleh1 != 0 ? number_format($gl_oleh1,4,",",".") : "")."</td>
                            <td style='text-align:right' >".($gl_buku1 != 0 ? number_format($gl_buku1,4,",",".") : "")."</td>
                        <td style='text-align:right' >&nbsp;</td>
                        <td style='text-align:right' >&nbsp;</td>
                    </tr>";
                    echo"
                </tbody>
            </table>
            <br>
            </div>
            <DIV style='page-break-after:always'></DIV>";
        // }
		return "";
		
	}
	
}
?>
