window.app_saku3_transaksi_yakes21_gl_fPosting = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_gl_fPosting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_gl_fPosting";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Jurnal", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;saiMemo");
		//this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode Aktif",tag:2,readOnly:true,change:[this,"doChange"],visible:true});
		this.e_periode = new saiCB(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:2, change:[this,"doChange"],visible:true});		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],tag:2,caption:"Deskripsi", maxLength:150,text:"-"});				
		this.bLoad = new button(this,{bound:[830,17,80,18],caption:"Load Data",click:[this,"doLoad"]});			
		this.bPost = new button(this,{bound:[930,17,80,18],caption:"Posting All",click:[this,"doClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,370], childPage:["Modul","List Jurnal","Item Jurnal","File Dok","Pesan Error","Filter++"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,				
					colTitle:["Status","Modul","Deskripsi"],
					colWidth:[[2,1,0],[250,100,80]],
					columnReadOnly:[true,[0,1,2],[]],
					dblClick:[this,"doDoubleClick1"],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["PILIH","TIDAK"]})]],checkItem:true,
					defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
		            colTitle:["Status","No Bukti","PP / Dokumen","Tanggal","Keterangan","Modul","Pilih"],
					colWidth:[[6,5,4,3,2,1,0],[70,80,300,70,200,150,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					colFormat:[[6],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[6],[alCenter]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","UNPOST"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:8,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Kode DRK","Jenis"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,80,80,100,300,50,180,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.sgUpld = new saiGrid(this.pc1.childPage[3],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4, tag:9,
					colTitle:["KdDok","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]], 
					columnReadOnly:[true,[0,1,2,3],[]],					
					colFormat:[[3],[cfButton]], 
					click:[this,"doSgBtnClickUpld"], colAlign:[[3],[alCenter]],
					readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.e_memo = new saiMemo(this.pc1.childPage[4],{bound:[5,10,590,330],labelWidth:0,tag:9,readOnly:true});
		this.cb_akun = new saiCBBL(this.pc1.childPage[5],{bound:[20,10,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:9});						
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[4].rearrangeChild(10, 23);	
		this.pc1.childPage[5].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			var strSQL = "select modul,keterangan from modul_aktif order by nu";													
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.sg1.appendData(["PILIH",line.modul.toUpperCase(),line.keterangan]);					
				}
			} else this.sg1.clear(1);
			
			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select max(periode) as periode from periode where kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_periode.addItem(i,line.periode);
					this.perNext = closePeriode(line.periode);					
				}
			}			
			this.e_periode.addItem(i+1,this.perNext);

			this.dataJU = {rs:{rows:[]}};
			this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
			this.e_periode.setText(this.app._periode);

			//filter posting akun kasbank
			this.cb_akun.setSQL("select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.block='0' and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data AkunKB",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_gl_fPosting.extend(window.childForm);
window.app_saku3_transaksi_yakes21_gl_fPosting.implement({		
	doSgBtnClickUpld: function(sender, col, row){
		try{
			if (col === 3) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},				
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{									
			this.doClick(this.i_gen);		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					sql.add("delete from gldt where no_bukti in ("+this.nobukti+") and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),'-','"+this.e_ket.getText()+"','"+this.app._userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0)");
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "POSTING"){
							sql.add("insert into posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode) values "+
									"	('"+this.e_nb.getText()+"','"+line.form.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
							sql.add("call sp_post_bukti ('"+line.form.toUpperCase()+"','"+this.app._lokasi+"','"+line.no_bukti+"')");
						}
					}				
					
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);					
					this.dataJU = {rs:{rows:[]}};
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				var msg  = "";
				var isAda = false;				
				this.nobukti = "";
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "POSTING") {
						isAda = true;
						this.nobukti += ",'"+this.dataJU.rs.rows[i].no_bukti+"'";
					}
				}	
				
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status POSTING.");
					return false;
				}				
				this.nobukti = this.nobukti.substr(1);											
				var strSQL = "select no_bukti+' | '+modul as buktimodul "+
							 "from ( "+						
							 //cek periode di masing2 lokasi (lintas lokasi)
							 "	select a.no_ju as no_bukti,'JU' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from ju_j a inner join (select kode_lokasi from (select kode_lokasi,max(periode) as periode from periode group by kode_lokasi) x where periode='"+this.e_periode.getText()+"') b on a.kode_lokasi=b.kode_lokasi "+
							 "	where a.no_ju in ("+this.nobukti+") group by a.no_ju "+														 
							 
							 "	union all "+
							 "	select a.no_hutang as no_bukti,'HU' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from hutang_j a "+
							 "	where a.no_hutang in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_hutang "+														 

							 "	union all "+
							 "	select a.no_hutang as no_bukti,'HK' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from yk_hutang_j a "+
							 "	where a.no_hutang in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_hutang "+														 

							 "	union all "+
							 "	select a.no_rekon as no_bukti,'HR' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from yk_rekon_j a "+
							 "	where a.no_rekon in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rekon "+														 
							 
							 "	union all "+
							 "	select a.no_bpjs as no_bukti,'JS' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from yk_bpjs_j a "+
							 "	where a.no_bpjs in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bpjs "+														 

							 "	union all "+
							 "	select a.no_terima as no_bukti,'TT' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from takterima_j a inner join (select kode_lokasi from (select kode_lokasi,max(periode) as periode from periode group by kode_lokasi) x where periode='"+this.e_periode.getText()+"') b on a.kode_lokasi=b.kode_lokasi "+
							 "	where a.no_terima in ("+this.nobukti+") group by a.no_terima "+	//multi lokasi = lokasi loss--> takterima												 

							 "	union all "+
							 "	select a.no_kas as no_bukti,'KB' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from kas_j a inner join (select kode_lokasi from (select kode_lokasi,max(periode) as periode from periode group by kode_lokasi) x where periode='"+this.e_periode.getText()+"') b on a.kode_lokasi=b.kode_lokasi "+
							 "	where a.no_kas in ("+this.nobukti+") group by a.no_kas "+	//multi lokasi = lokasi loss --> costsharing													 

							// posting dr IF07 : app_saku3_transaksi_yakes21_ifund_fIFVerif
							//  "	union all "+
							//  "	select a.no_aju as no_bukti,'IF' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							//  "	from if_aju_j a "+
							//  "	where a.no_aju in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_aju "+														 
							
							 "	union all "+
							 "	select a.no_fasusut as no_bukti,'ST' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from fasusut_j a "+
							 "	where a.no_fasusut in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_fasusut "+														 
							
							 //--------------- investasi ------------
							 "	union all "+
							 "	select a.no_akru as no_bukti,'DA' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_depoakru_j a "+
							 "	where a.no_akru in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_akru "+														 
							 "	union all "+
							 "	select a.no_cair as no_bukti,'DC' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_depocair_j a "+
							 "	where a.no_cair in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_cair "+														 
							 "	union all "+
							 "	select a.no_tutup as no_bukti,'DT' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_depotutup_j a "+
							 "	where a.no_tutup in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_tutup "+														 

							 "	union all "+
							 "	select a.no_shmbeli as no_bukti,'SHB' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_shmbeli_j a "+
							 "	where a.no_shmbeli in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_shmbeli "+														 
							 "	union all "+
							 "	select a.no_shmjual as no_bukti,'SHJ' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_shmjual_j a "+
							 "	where a.no_shmjual in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_shmjual "+														 
							 "	union all "+
							 "	select a.no_shmdev as no_bukti,'SHD' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_shmdev_j a "+
							 "	where a.no_shmdev in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_shmdev "+														 
							 "	union all "+
							 "	select a.no_spi as no_bukti,'SHS' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_shmspi_j a "+
							 "	where a.no_spi in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spi "+														 
							 "	union all "+
							 "	select a.no_bukti as no_bukti,'MIF' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_discre_j a "+
							 "	where a.no_bukti in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_bukti "+														 
							 "	union all "+
							 "	select a.no_shmreklas as no_bukti,'SHR' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_shmreklas_j a "+
							 "	where a.no_shmreklas in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_shmreklas "+														 
							 
							 "	union all "+
							 "	select a.no_rdbeli as no_bukti,'RDB' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_rdbeli_j a "+
							 "	where a.no_rdbeli in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rdbeli "+														 
							 "	union all "+
							 "	select a.no_rdjual as no_bukti,'RDJ' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_rdjual_j a "+
							 "	where a.no_rdjual in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rdjual "+														 
							 "	union all "+
							 "	select a.no_rddev as no_bukti,'RDD' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_rddev_j a "+
							 "	where a.no_rddev in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_rddev "+														 
							 "	union all "+
							 "	select a.no_spi as no_bukti,'RDS' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_rdspi_j a "+
							 "	where a.no_spi in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spi "+														 

							 "	union all "+
							 "	select a.no_spbeli as no_bukti,'BSP' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_spbeli_j a "+
							 "	where a.no_spbeli in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spbeli "+														 
							 "	union all "+
							 "	select a.no_spjual as no_bukti,'JSP' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_spjual_j a "+
							 "	where a.no_spjual in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spjual "+														 
							 "	union all "+
							 "	select a.no_spdev as no_bukti,'DSP' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_spdev_j a "+
							 "	where a.no_spdev in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spdev "+														 
							 "	union all "+
							 "	select a.no_spi as no_bukti,'SSP' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_spspi_j a "+
							 "	where a.no_spi in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spi "+														 

							 "	union all "+
							 "	select a.no_beli as no_bukti,'OBB' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_oblibeli_j a "+
							 "	where a.no_beli in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_beli "+														 
							 "	union all "+
							 "	select a.no_oblijual as no_bukti,'OBJ' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_oblijual_j a "+
							 "	where a.no_oblijual in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_oblijual "+														 
							 "	union all "+
							 "	select a.no_spi as no_bukti,'OBS' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_oblispi_j a "+
							 "	where a.no_spi in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_spi "+														 
							 "	union all "+
							 "	select a.no_amor as no_bukti,'OBA' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_obliamor_j a "+
							 "	where a.no_amor in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_amor "+														 
							 "	union all "+
							 "	select a.no_akru as no_bukti,'OBK' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_obliakru_j a "+
							 "	where a.no_akru in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_akru "+														 
							 "	union all "+
							 "	select a.no_cair as no_bukti,'OBC' as modul,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total "+
							 "	from inv_oblicair_j a "+
							 "	where a.no_cair in ("+this.nobukti+") and a.kode_lokasi='"+this.app._lokasi+"' group by a.no_cair "+														 

							 "	) x "+
							 "where round(x.total,0) <> 0 ";						 							 

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;			
					for (var i in data.rs.rows){						
						line = data.rs.rows[i];													
						msg+= "Data Bukti Tidak Balance/Lokasi berbeda Periode Aktif.(Bukti - Modul : "+line.buktimodul+")\n";
					}
				}
				
				this.e_memo.setText(msg);
				if (msg != "") {
					system.alert(this,"Posting tidak valid.","Terdapat Bukti Jurnal tidak Balance/Berbeda Periode Aktif Lihat Pesan Error.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"posting_m","no_post",this.app._lokasi+"-PT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}
		if (sender == this.bPost) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "POSTING";
			}
			this.doTampilData(this.page);
		}	
	},
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) == "PILIH") this.sg1.cells(0,row,"TIDAK");
		else this.sg1.cells(0,row,"PILIH");
	},	
	doLoad:function(sender){
		var strSQL = "";		
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(0,i)=="PILIH") {	
				if (this.sg1.cells(1,i) == "JU") {
					strSQL += 
					      "union all "+
						  "select 'UNPOST' as status,a.no_ju as no_bukti,isnull(b.kode_pp,'-')  as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'JU' as form "+
				 		  "from ju_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";								
				}
				if (this.sg1.cells(1,i) == "HU") {
					strSQL += 
					      "union all "+
						  "select 'UNPOST' as status,a.no_hutang as no_bukti,isnull(b.kode_pp,'-')  as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'HU' as form "+
				 		  "from hutang_m a  left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+							

						  "union all "+
						  "select 'UNPOST' as status,a.no_hutang as no_bukti,isnull(b.kode_pp,'-')  as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'HK' as form "+
				 		  "from yk_hutang_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.progress='1' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						   
						  "union all "+
						  "select 'UNPOST' as status,a.no_rekon as no_bukti,isnull(b.kode_pp,'-')  as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'HR' as form "+
				 		  "from yk_rekon_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.progress='1' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+						  

						  "union all "+
						  "select 'UNPOST' as status,a.no_bpjs as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'JS' as form "+
				 		  "from yk_bpjs_m a  left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.progress='1' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";						  
				}	

				if (this.sg1.cells(1,i) == "PU") {
					strSQL += 
						  "union all "+
						  "select 'UNPOST' as status,a.no_terima as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'TT' as form "+
				 		  "from takterima_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";	
				}

				if (this.sg1.cells(1,i) == "KB") {
					if (this.cb_akun.getText() == "") {
						var filterKB = "select 'UNPOST' as status,a.no_kas as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'KB' as form "+
									   "from kas_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
									   "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";
									   
									// posting dr IF07 : app_saku3_transaksi_yakes21_ifund_fIFVerif   
									//    "union all "+
									//    "select 'UNPOST' as status,a.no_aju as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'IF' as form "+
									//    "from if_aju_m a left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
									//    "where progress = '1' and a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";	
					} 
					else {
						//hanya akun yg dipilih
						var filterKB = "select distinct 'UNPOST' as status,a.no_kas as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'KB' as form "+
									   "from kas_m a "+
									   "inner join kas_j c on a.no_kas=c.no_kas "+  
									   "left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+									   
									   "where c.kode_akun ='"+this.cb_akun.getText()+"' and a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";							
					}

					strSQL += 
						  "union all "+filterKB;						  				
				}
				if (this.sg1.cells(1,i) == "AT") {
					strSQL += 
					      "union all "+
						  "select 'UNPOST' as status,a.no_fasusut as no_bukti,isnull(b.kode_pp,'-') as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'ST' as form "+
				 		  "from fasusut_m a  left join pp b on a.kode_pp=b.kode_pp and b.kode_lokasi <> '00' "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ";								
				}

				if (this.sg1.cells(1,i) == "IV") {
					strSQL += 					
					      "union all "+
						  "select 'UNPOST' as status,a.no_akru as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'DA' as form "+
				 		  "from inv_depoakru_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+							
						  "union all "+
						  "select 'UNPOST' as status,a.no_cair as no_bukti,a.no_depo as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'DC' as form "+
				 		  "from inv_depocair_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+							
						  "union all "+
						  "select 'UNPOST' as status,a.no_tutup as no_bukti,a.no_depo as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'DT' as form "+
				 		  "from inv_depotutup_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						   
						  "union all "+
						  "select 'UNPOST' as status,a.no_shmbeli as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SHB' as form "+
						  "from inv_shmbeli_m a  "+
						  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_shmjual as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SHJ' as form "+
				 		  "from inv_shmjual_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_shmdev as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SHD' as form "+
				 		  "from inv_shmdev_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spi as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SHS' as form "+
				 		  "from inv_shmspi_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_bukti as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'MIF' as form "+
				 		  "from inv_discre_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_shmreklas as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SHR' as form "+
				 		  "from inv_shmreklas_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+

						  "union all "+
						  "select 'UNPOST' as status,a.no_rdbeli as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'RDB' as form "+
						  "from inv_rdbeli_m a  "+
						  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_rdjual as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'RDJ' as form "+
				 		  "from inv_rdjual_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_rddev as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'RDD' as form "+
				 		  "from inv_rddev_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spi as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'RDS' as form "+
				 		  "from inv_rdspi_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+

						  "union all "+
						  "select 'UNPOST' as status,a.no_spbeli as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'BSP' as form "+
						  "from inv_spbeli_m a  "+
						  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spjual as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'JSP' as form "+
				 		  "from inv_spjual_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spdev as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'DSP' as form "+
				 		  "from inv_spdev_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spi as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'SSP' as form "+
				 		  "from inv_spspi_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+

						  "union all "+
						  "select 'UNPOST' as status,a.no_beli as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBB' as form "+
						  "from inv_oblibeli_m a  "+
						  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_oblijual as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBJ' as form "+
				 		  "from inv_oblijual_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_akru as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBK' as form "+
				 		  "from inv_obliakru_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_cair as no_bukti,'-' as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBC' as form "+
				 		  "from inv_oblicair_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						  "union all "+
						  "select 'UNPOST' as status,a.no_spi as no_bukti,a.no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBS' as form "+
				 		  "from inv_oblispi_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+ 
						  "union all "+
						  "select 'UNPOST' as status,a.no_amor as no_bukti,'-' as no_dokumen,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,'OBA' as form "+
				 		  "from inv_obliamor_m a  "+
					 	  "where a.posted='F' and a.periode ='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+ 
						
						  " ";

				}

			}	
		}		
		strSQL = strSQL.substr(9);
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);						
		this.pc1.setActivePage(this.pc1.childPage[1]);		
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.form.toUpperCase(),"Pilih"]);
		}
		this.sg.setNoUrut(start);		
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1) * 20) + row].status = this.sg.cells(0,row);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 6) {
				if (this.sg.cells(1,row) != "") {
					if (this.sg.cells(5,row) == "JU") {
						var namaTabel = "ju_j";
						var noBukti = "no_ju";
					}
					if (this.sg.cells(5,row) == "HU") {
						var namaTabel = "hutang_j";
						var noBukti = "no_hutang";
					}
					if (this.sg.cells(5,row) == "HK") {
						var namaTabel = "yk_hutang_j";
						var noBukti = "no_hutang";
					}
					if (this.sg.cells(5,row) == "HR") {
						var namaTabel = "yk_rekon_j";
						var noBukti = "no_rekon";
					}
					if (this.sg.cells(5,row) == "JS") {
						var namaTabel = "yk_bpjs_j";
						var noBukti = "no_bpjs";
					}
					if (this.sg.cells(5,row) == "TT") {
						var namaTabel = "takterima_j";
						var noBukti = "no_terima";
					}
					if (this.sg.cells(5,row) == "KB") {
						var namaTabel = "kas_j";
						var noBukti = "no_kas";
					}
					//if07: app_saku3_transaksi_yakes21_ifund_fIFVerif
					// if (this.sg.cells(5,row) == "IF") {
					// 	var namaTabel = "if_aju_j";
					// 	var noBukti = "no_aju";
					// }
					if (this.sg.cells(5,row) == "ST") {
						var namaTabel = "fasusut_j";
						var noBukti = "no_fasusut";
					}
		
					if (this.sg.cells(5,row) == "DA") {
						var namaTabel = "inv_depoakru_j";
						var noBukti = "no_akru";
					}
					if (this.sg.cells(5,row) == "DC") {
						var namaTabel = "inv_depocair_j";
						var noBukti = "no_cair";
					}
					if (this.sg.cells(5,row) == "DT") {
						var namaTabel = "inv_depotutup_j";
						var noBukti = "no_tutup";
					}
		
					if (this.sg.cells(5,row) == "SHB") {
						var namaTabel = "inv_shmbeli_j";
						var noBukti = "no_shmbeli";
					}
					if (this.sg.cells(5,row) == "SHJ") {
						var namaTabel = "inv_shmjual_j";
						var noBukti = "no_shmjual";
					}
					if (this.sg.cells(5,row) == "SHD") {
						var namaTabel = "inv_shmdev_j";
						var noBukti = "no_shmdev";
					}
					if (this.sg.cells(5,row) == "SHS") {
						var namaTabel = "inv_shmspi_j";
						var noBukti = "no_spi";
					}
					if (this.sg.cells(5,row) == "MIF") {
						var namaTabel = "inv_discre_j";
						var noBukti = "no_bukti";
					}
					if (this.sg.cells(5,row) == "SHR") {
						var namaTabel = "inv_shmreklas_j";
						var noBukti = "no_shmreklas";
					}
		
					if (this.sg.cells(5,row) == "RDB") {
						var namaTabel = "inv_rdbeli_j";
						var noBukti = "no_rdbeli";
					}
					if (this.sg.cells(5,row) == "RDJ") {
						var namaTabel = "inv_rdjual_j";
						var noBukti = "no_rdjual";
					}
					if (this.sg.cells(5,row) == "RDD") {
						var namaTabel = "inv_rddev_j";
						var noBukti = "no_rddev";
					}
					if (this.sg.cells(5,row) == "RDS") {
						var namaTabel = "inv_rdspi_j";
						var noBukti = "no_spi";
					}
		
					if (this.sg.cells(5,row) == "BSP") {
						var namaTabel = "inv_spbeli_j";
						var noBukti = "no_spbeli";
					}
					if (this.sg.cells(5,row) == "JSP") {
						var namaTabel = "inv_spjual_j";
						var noBukti = "no_spjual";
					}
					if (this.sg.cells(5,row) == "DSP") {
						var namaTabel = "inv_spdev_j";
						var noBukti = "no_spdev";
					}
					if (this.sg.cells(5,row) == "SSP") {
						var namaTabel = "inv_spspi_j";
						var noBukti = "no_spi";
					}
		
					if (this.sg.cells(5,row) == "OBB") {
						var namaTabel = "inv_oblibeli_j";
						var noBukti = "no_beli";
					}
					if (this.sg.cells(5,row) == "OBJ") {
						var namaTabel = "inv_oblijual_j";
						var noBukti = "no_oblijual";
					}
					if (this.sg.cells(5,row) == "OBS") {
						var namaTabel = "inv_oblispi_j";
						var noBukti = "no_spi";
					}
					if (this.sg.cells(5,row) == "OBK") {
						var namaTabel = "inv_obliakru_j";
						var noBukti = "no_akru";
					}
					if (this.sg.cells(5,row) == "OBC") {
						var namaTabel = "inv_oblicair_j";
						var noBukti = "no_cair";
					}
					if (this.sg.cells(5,row) == "OBA") {
						var namaTabel = "inv_obliamor_j";
						var noBukti = "no_amor";
					}
		
					var strSQL = "select a.kode_akun,b.nama,a.dc,a.keterangan,a.nilai,a.jenis,a.kode_pp,a.kode_drk "+
								 "from "+namaTabel+" a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+					
								 "where "+noBukti+" = '"+this.sg.cells(1,row)+"' order by a.dc desc";								
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg2.appendData([line.kode_akun,line.nama,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.kode_drk,line.jenis]);
						}
					} else this.sg2.clear(1);

					this.sgUpld.clear();
					var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar "+
								"from pbh_dok a inner join pbh_dok_ver b on a.kode_jenis=b.kode_jenis "+							 
								"where a.no_bukti = '"+this.sg.cells(1,row)+"' order by a.nu",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;					
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad"]);						
						}
					} else this.sgUpld.clear(1);
					
					this.pc1.setActivePage(this.pc1.childPage[2]);
				}

			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (sender.cells(0,row) == "UNPOST") sender.cells(0,row,"POSTING");
		else sender.cells(0,row,"UNPOST");

		this.dataJU.rs.rows[((this.page-1) * 20) + row].status = this.sg.cells(0,row);
 	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.doClick(this.i_gen);
			this.sg.clear(1);
			this.sg2.clear(1);
			this.dataJU = {rs:{rows:[]}};
		}		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							//this.nama_report="server_report_saku2_gl_rptBuktiJurnal";
							//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
							this.filter = this.filter2;
							this.viewer.prepare();
							this.viewer.setVisible(true);
							this.app._mainForm.pButton.setVisible(false);
							this.app._mainForm.reportNavigator.setVisible(true);
							this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
							this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
							this.app._mainForm.reportNavigator.rearrange();
							this.showFilter = undefined;
							this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
							this.page = 1;
							this.allBtn = false;
							this.pc1.hide();								
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}						
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.setTag("0");
			this.dataJU = {rs:{rows:[]}};
			this.sg.clear(1); this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});
