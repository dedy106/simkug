<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_kb_rptKbPjSaldo extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
        $filter2=$tmp[2];
        $periode=$tmp[0];
        $tampil=$tmp[1];

        if ($tampil == "Karyawan"){
            $sql = "select a.nik_pengaju,b.nama,a.kode_pp,d.nama as nama_pp,a.no_pj,a.no_kas,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,date_format(a.due_date,'%d/%m/%Y') as due_date,a.keterangan,a.nilai,a.no_kas as kaspj, c.no_ptg,c.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,isnull(c.nilai,0) as nilai_ptg,case when isnull(c.nilai_kas,0)=0 then isnull(a.nilai,0)-isnull(c.nilai,0)+isnull(c.nilai_kas,0) else 0 end as saldo, case when isnull(c.nilai_kas,0)<>0 then isnull(c.nilai_kas,0) else 0 end as nilai_kas 
            from panjar_m a 
            inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi 
            inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
            left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi $filter2 $this->filter 
            ";
            // echo $sql;
				
			$header = array("NIK","Nama","Kode PP","Nama PP","No Panjar","No Kas PJ","Tgl Panjar","Tgl Jatuh Tempo","Keterangan","Nilai Panjar","No PTG","No Kas PTG","Tgl PTG","Nilai PTG","Nilai Kasbank","Saldo Panjar");
            $width = array(60,150,60,120,120,120,60,60,200,120,120,120,60,80,80);
            

        }else{
            
            $sql = "select a.kode_pp,a.nama,isnull(b.nilai,0) as nilai,isnull(c.nilai_ptg,0) as nilai_ptg, isnull(b.nilai,0)-isnull(c.nilai_ptg,0)+isnull(c.nilai_kas,0) as saldo,isnull(c.nilai_kas,0) as nilai_kas 
            from pp a 
            left join (select a.kode_pp,sum(a.nilai) as nilai 
                        from panjar_m a $this->filter 
                        group by a.kode_pp
                        )b on a.kode_pp=b.kode_pp 
            left join (select a.kode_pp,sum(b.nilai) as nilai_ptg,sum(b.nilai_kas) as nilai_kas
                        from panjar_m a
                        inner join ptg_m b on a.no_pj=b.no_pj and a.kode_lokasi=b.kode_lokasi $this->filter group by a.kode_pp 
                        )c on a.kode_pp=c.kode_pp
             $filter2 
             order by a.kode_pp ";
            
            $header=array("Kode PP","Nama PP","Nilai Panjar","Nilai PTG","Nilai Kasbank","Saldo Panjar");
            $width =array(60,200,80,80,80,80);
			
        }
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
        echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));

		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
        <td width='30'  align='center' class='header_laporan'>No</td>";

        for ($h=0;$h<count($header);$h++){
            echo "<td width='".$width[$h]."'  align='center' class='header_laporan'>".$header[$h]."</td>";
        }
        echo"
        </tr>  ";
      
        if($tampil == "Karyawan"){

            $nilai=0;$nilai_ptg=0;$saldo=0;$nilai_kas=0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $nilai=$nilai+$row->nilai;
                $nilai_ptg=$nilai_ptg+$row->nilai_ptg;
                $saldo=$saldo+$row->saldo;
                $nilai_kas=$nilai_kas+$row->nilai_kas;


                echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>".$row->nik_pengaju."</td>
                <td class='isi_laporan'>".$row->nama."</td>
                <td class='isi_laporan'>".$row->kode_pp."</td>
                <td class='isi_laporan'>".$row->nama_pp."</td>
                <td class='isi_laporan'>".$row->no_pj."</td>
                <td class='isi_laporan'>".$row->kaspj."</td>
                <td class='isi_laporan'>".$row->tgl_panjar."</td>
                <td class='isi_laporan'>".$row->due_date."</td>
                <td class='isi_laporan'>".$row->keterangan."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
                <td class='isi_laporan'>".$row->no_ptg."</td>
                <td class='isi_laporan'>".$row->no_kas."</td>
                <td class='isi_laporan'>".$row->tgl_ptg."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }

            echo "<tr >
            <td class='isi_laporan' align='center' colspan='10'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'></td>
            <td class='isi_laporan' align='right'></td>
            <td class='isi_laporan' align='right'></td>
            <td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
            </tr>";
        }
        
        else{

            $nilai=0;$nilai_ptg=0;$saldo=0;$nilai_kas=0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $nilai=$nilai+$row->nilai;
                $nilai_ptg=$nilai_ptg+$row->nilai_ptg;
                $saldo=$saldo+$row->saldo;
                $nilai_kas=$nilai_kas+$row->nilai_kas;
                echo "<tr >
                <td class='isi_laporan' align='center'>$i</td>
                <td class='isi_laporan'>".$row->kode_pp."</td>
                <td class='isi_laporan'>".$row->nama."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
                <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
                </tr>";
                $i=$i+1;
            }

            echo "<tr >
            <td class='isi_laporan' align='center' colspan='3'>Total</td>
            <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
            <td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
            </tr>";
        }
       
		
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
  
