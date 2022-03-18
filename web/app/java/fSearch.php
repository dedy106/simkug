<section id='blog' class='container'>
    <div class='blog'>
        <div class='row'>
            <?php
                $konten="";
                $jenis="";
                $str="";
                $page=1;
                if(ISSET($_GET['param'])){
                    $tmp=explode("/",$_GET['param']);
                    $konten=$tmp[0];
                    $jenis=$tmp[1];
                    $str=$tmp[3];
                    $page=intval($tmp[2]);
                
                }

                $search_string = $str;

                // var_dump($tmp);

                if(($konten != null OR in_array($konten, array('all', 'news', 'article'))) AND $jenis != null AND ISSET($search_string)){

                    $acceptable = array('tag','categories','string');

                    if(in_array($jenis, $acceptable)){
                        if($konten == 'news'){
                            $kode_klp = "and a.kode_klp = 'KLP01' ";
                        }else if($konten =='article'){
                            $kode_klp = "and a.kode_klp = 'KLP03' ";
                        }else{
                            $kode_klp = "and (a.kode_klp = 'KLP01' OR a.kode_klp = 'KLP03') ";
                        }

                        switch($jenis){
                            case 'tag': 
                                $where = "a.tag like '%".$search_string."%' ";
                            break;
                            case 'categories': 
                                $where = "a.kode_kategori = '".$search_string."' ";
                            break;
                            case 'string': 
                                $where = "a.keterangan like '%".$search_string."%' ";
                            break;
                        }
                    
                        $active_page = $page;
                        $items_per_page = 5;

                        $sqlc="select count(a.id) as jml from lab_konten a where a.kode_lokasi='$kode_lokasi' $kode_klp and $where ";
                        $count = execute($sqlc);

                        $offset = ($page - 1) * $items_per_page;

                        $item_per_page = $items_per_page;
                        $jumlah_artikel = $count->fields[0];

                        if($jumlah_artikel > 0){

                            $sql="select a.id, tanggal, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar as header_url, c.file_type from lab_konten a left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi where a.kode_lokasi='$kode_lokasi' $kode_klp and $where order by tanggal desc OFFSET $offset ROWS FETCH NEXT $items_per_page ROWS ONLY";
                            $rs = execute($sql);

                            while ($row = $rs->FetchNextObject($toupper=false))
                            {
                                $daftar_artikel[] = (array)$row;
                            }

                        }else{
                            $daftar_artikel = array();
                        }
                    }else{
                        $daftar_artikel = array();
                        echo "Not Found";
                    }
                }else{
                    $daftar_artikel = array();
                    echo "Not Found";
                }
                
                // echo $sqlc;
                // echo $sql;
                // print_r($daftar_artikel);

                if(count($daftar_artikel > 0)){
                    foreach($daftar_artikel as $row){
                        
                        if($konten == 'news'){
                            $url = "fMainJava.php?hal=app/java/fNewsDetail.php&id=".$row["id"];
                        }else if($konten =='article'){
                            $url = "fMainJava.php?hal=app/java/fArticleDetail.php&id=".$row["id"];
                        }else{
                            $url = "fMainJava.php?hal=app/java/";
                        }

                        $arr = explode('/', $row['file_type']);
                        $cut_on = strpos(strip_tags($row["keterangan"]), ".", strpos(strip_tags($row["keterangan"]), ".")  + strlen("."));
						$path_file=$path."web".$row["header_url"];

                        echo "
                            <div class='blog-item col-md-6'>
                                <div class='row' style='margin-bottom:15px;'>
                                    <div class='col-xs-12 col-sm-3 text-center'>
                                        <div class='entry-meta'>
                                            <span id='publish_date'>".convertDate($row["tgl_input"])."</span>
                                        </div>
                                    </div>
                                    <div class='col-xs-12 col-sm-9'>
                                        <h2 style='margin-top:5px;'><a href='$url' style='color:#0066ff;'>".$row["judul"]."</a></h2>
                                    </div>
                                </div>
                                        
                                <div class='row'>
                                    <div class='col-xs-12 col-sm-12 blog-content'>
                                        <div style='overflow:hidden; max-height:400px;'>
                                            <a href='$url'>
                                                <img class='img-responsive img-blog' src='".$path_file."' style='width:100%; display:block;' alt='' />
                                            </a>
                                        </div>

                                        <h3>".substr(strip_tags($row["keterangan"]), 0, $cut_on+1)."</h3>
                                        <a class='btn btn-sm btn-primary readmore' style='padding: 8px 8px;' href='$url'>Read More <i class='fa fa-angle-right'></i></a>
                                    </div>
                                </div>    
                            </div>
                        ";
                    }
                }else{
                    echo "No result found";
                }
                
                // print_r($daftar_artikel);
            ?>
            
                
        </div>
        <div class='row'>
            <div class='col-xs-12'>
                <center>
                    <?php 
                        $url_paging="fMainJava.php?hal=app/java/fSearch.php&param=$konten/$jenis";
                        $list = ($active_page > 1 ? "<li><a href='$url_paging/".($active_page - 1)."/$search_string'><i class='fa fa-long-arrow-left'></i>Previous Page</a></li>" : '');
                
                        for($i=1; $i<=ceil($jumlah_artikel/$item_per_page); $i++){
                            $list .= ($i == $active_page ? "<li class='active'><a href='#'>$i</a></li>" : "<li><a href='$url_paging/".$i."/$search_string'>$i</a></li>");
                        }
                
                        $list .= ($active_page < ceil($jumlah_artikel/$item_per_page) ? "<li><a href='$url_paging/".($active_page + 1)."/$search_string'>Next Page<i class='fa fa-long-arrow-right'></i></a></li>" : '');
                
                        echo "  <ul class='pagination pagination-lg'>$list</ul>";
                    ?>
                </center>
            </div>
        </div>
    </div>
</section>
