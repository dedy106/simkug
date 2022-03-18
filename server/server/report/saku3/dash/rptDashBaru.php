<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashBaru extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}

	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        
        // $sql = "select * from db_rasio_m where kode_lokasi='32' ";
        // $rs = $dbLib->execute($sql);

        // while ($row = $rs->FetchNextObject(false))
        // {
        //     $sql2 ="
        //     select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end as nilai
        //                from db_rasio_d a
        //                inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
        //                where a.kode_lokasi='32' and b.periode='201812' and a.kode_rasio='$row->kode_rasio' ";
		// 	$rs2 = $dbLib->execute($sql2);
        //     while ($row2 = $rs2->FetchNextObject(false))
        //     {
		// 		// $a[$row2->kode_neraca] = $row2->nilai;
		// 		// echo "\$a[$row2->kode_neraca] = ".$row2->nilai."<br/>";
		// 		$name_of_var = "a".$row2->kode_neraca;
		// 		$$name_of_var = $row2->nilai;
		// 		echo $name_of_var." = ".$$name_of_var." <br/>";

		// 	}

			
			
		// 	$hasil = round(( $a7/$a4 ) * 100);
		// 	// $hasil2 = $row->rumus;

		// 	// $string = $row->rumus;
		// 	// extract(array($string => $string));
		// 	echo $row->rumus;
		// 	echo "<br/>";

		// 	// var_dump($row->rumus);
		// 	// echo "<br/>";
		// 	echo " rasio ".$row->nama." = ".$hasil." <br/>";
		// 	$string = $row->rumus;

		// 	eval('return '.$row->rumus.';');

		
			
			
		// 	$resource = $_GET["resource"];
		// 	$fullId = $_GET["fullId"];

		// }
		
		$rs = $dbLib->execute('select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun="Pendapatan" then -b.n4 else b.n4 end as nilai, c.rumus, c.nama as nama_rasio
        from db_rasio_d a
        inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
        inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
		where a.kode_lokasi="'.$kode_lokasi.'" and b.periode="'.$periode.'" order by a.kode_rasio');
		if ($rs){
			while ($row = $rs->FetchNextObject(false)){
				$nilai[] = (array)$row;
			}
		}
		

        $daftar = array();

        for($i=0; $i<count($nilai); $i++){
            if(!ISSET($daftar[$nilai[$i]['kode_rasio']])){
                $daftar[$nilai[$i]['kode_rasio']] = array('nama_rasio' => $nilai[$i]['nama_rasio'], 'rumus' => $nilai[$i]['rumus'], 'par'=>array());
            }

            $daftar[$nilai[$i]['kode_rasio']]['par'][] = array(
                'kode_neraca'=>$nilai[$i]['kode_neraca'],
                'nilai'=>$nilai[$i]['nilai']
            );
        }

        $tbl = '';

        foreach($daftar as $data){
                $par = '';
                for($x=0; $x<count($data['par']); $x++){
					$kode_neraca= str_replace("-","",$data['par'][$x]['kode_neraca']);
                    $par .= $kode_neraca." = ".$data['par'][$x]['nilai']."<br>";

					${"a" . $kode_neraca} = $data['par'][$x]['nilai'];
				
                }
    
                $tbl .= "
                    <tr>
                        <td>".$data['nama_rasio']."</td>
                        <td>".$data['rumus']."</td>
                        <td>".$par."</td>
                        <td>".round(eval('return '.$data['rumus'].';'),4)."</td>
                    </tr>
                ";
        }

        echo "<table border='1' width='80%'>
                <tr>
                    <td>Nama Rasio</td>
                    <td>Rumus</td>
                    <td>Nilai</td>
                    <td>Hasil</td>
                </tr>
        ";
        echo $tbl;
        echo "</table>";



	
		

		return "";
	}
	
}
?>
