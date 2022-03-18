<section id='blog' class='container'>
    <div class='blog'>
        <div class='row'>
            <div class='col-md-8'>
                <?php
					
                    $strperiode="";
                    if(ISSET($_GET['page'])){
                        $tmp=explode("/",$_GET['page']);
                        $page=intval($tmp[1]);
                        if(ISSET($tmp[2]) AND ISSET($tmp[3]) ){
                            $strperiode = "and month(tanggal) = ".$tmp[2]." and year(tanggal) = ".$tmp[3];
                        }
                    }else{
                        $page=1;                        
                    }

                    $sql="select count(a.id) as jml from lab_konten a where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' $strperiode ";
                    $rs = execute($sql);
                  
                    $jumlah_artikel=$rs->fields[0];
                    $items_per_page=5;
                    $active_page=$page;

                    $offset = ($page - 1) * $items_per_page;

                    if($jumlah_artikel > 0){
						$id=$_GET['id'];
                        $sql2="select a.id, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as header_url, c.file_type 
						from lab_konten a 
						left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
						left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
						where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' and a.id=$id";
                        $rs2 = execute($sql2);
						
                       

                        while ($row = $rs2->FetchNextObject($toupper=false))
                        {
                            $daftar_artikel[] = (array)$row;
                        }
                        
                    }else{
                        $daftar_artikel[]=array();
                    }

                    foreach($daftar_artikel as $row){
                        //$url = "fMainJava.php?hal=".generateSEO($row["id"], $row["judul"]);
						$url = "fMainJava.php?hal=".generateSEO($row["id"], $row["judul"]);
                        $arr = explode('/', $row['file_type']);
                        //$cut_on = strpos(strip_tags($row["keterangan"]), ".", strpos(strip_tags($row["keterangan"]), ".")  + strlen("."));
						
						$path_file=$path."web".$row["header_url"];
                        echo "
                            <div class='blog-item'>
                                <div class='row' style='margin-bottom:15px;'>
                                    <div class='col-xs-12 col-sm-2 text-center'>
                                        <div class='entry-meta'>
                                            <span id='publish_date'>".convertDate($row["tgl_input"])."</span>
                                        </div>
                                    </div>
                                    <div class='col-xs-12 col-sm-10'>
                                        <h2 style='margin-top:5px;'><a href='$url' style='color:#0066ff;'>".$row["judul"]."</a></h2>
                                    </div>
                                </div>
                                        
                                <div class='row'>
                                    <div class='col-xs-12 col-sm-12 blog-content'>
                                        <div style='overflow:hidden; max-height:400px;'>".
                                                ($arr[0] == 'video' ? "<video controls  style='min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><source src='".$row["header_url"]."' type='".$row['file_type']."'></video>"  : "
                                                <a href='$url'><img class='img-responsive img-blog' src='$path_file' style='width:100%; display:block;' alt='' />
                                                </a>")

                                                
                                            ."
                                        </div>

                                        <h3>".$row["keterangan"]."</h3>
                                        
                                    </div>
                                </div>    
                            </div>
                        ";
                    }
                ?>
                
                
            </div><!--/.col-md-8-->

            <aside class="col-md-4">
                <div class="widget search">
                    <form role="form" action='fMainGladiola.php?hal=app/gladiola/fSearch.php&param=news/string/1' method='GET'>
                        <input type="text" name='str' class="form-control search_box" autocomplete="on" placeholder="Search" required>
                    </form>
                </div><!--/.search-->

                <div class="widget categories">
                    <h3>Categories</h3>
                    <div class="row">
                        <div class="col-sm-6">
                            <ul class="blog_category">
                                <?php

                                $rsc =  execute("select count(id) as jml, b.kode_kategori, b.nama 
									from lab_konten a 
									inner join lab_konten_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi 
									where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' group by b.nama, b.kode_kategori");

                                if($rsc->RecordCount()){

                                    while ($row = $rsc->FetchNextObject($toupper=false)){
                                        $categories[] = (array)$row;
                                    }

                                    foreach($categories as $cat){
                                        echo "<li><a href='fMainGladiola.php?hal=app/gladiola/fSearch.php&param=news/categories/1/".$cat['kode_kategori']."'>".$cat['nama']." <span class='badge'>".$cat['jml']."</span></a></li>";
                                    }
                                }
                                ?>
                            </ul>
                        </div>
                    </div>                     
                </div><!--/.categories-->
                
                <div class="widget archieve">
                    <h3>Archive</h3>
                    <div class="row">
                        <div class="col-sm-12">
                            <ul class="blog_archieve">
                                <?php

                                $rsa = execute("select count(a.id) as jml, month(tanggal) as bulan, year(tanggal) as tahun 
								from lab_konten a 
								where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' group by month(tanggal), year(tanggal)");

                                if($rsa->RecordCount()){

                                    while ($row = $rsa->FetchNextObject($toupper=false)){
                                        $archive[] = (array)$row;
                                    }
                                        
                                    foreach($archive as $arc){
                                        echo "<li><a href='fMainGladiola.php?hal=app/gladiola/fNews.php&page=/1/".$arc['bulan']."/".$arc['tahun']."'><i class='fa fa-angle-double-right'></i> ".getNamaBulan($arc['bulan'])." ".$arc['tahun']." <span class='pull-right'>(".$arc['jml'].")</span></a></li>";
                                    }
                                }
                                ?>
                            </ul>
                        </div>
                    </div>                     
                </div><!--/.archieve-->
            </aside>  
        </div><!--/.row-->
    </div>
</section><!--/#blog-->

