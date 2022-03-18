<section>
    <div class="container">
        <div class="center">
            <h2><?php echo $video['judul']; ?></h2>
            <p class="lead">
                <?php echo "By ".$video["nik_user"]." ".convertDateTime($video["tgl_input"]); ?>
            </p>
        </div>

        <div class="row">
            <center>
                <?php echo "<iframe width='90%' height='50%' style='width:80%; height:50%; min-height:280px; min-width:280px; max-width:560px;' src='https://www.youtube.com/embed/".$video["link"]."'></iframe>"; ?>
            </center>
        </div>

        <br><br>

        <center>
            <div class="row" style="text-align: justify; text-justify: inter-word; width:95%;">
                <?php echo $video['keterangan']; ?>
            </div>
        </center>
    </div>
</section>