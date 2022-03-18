window.app_saku2_transaksi_kopeg_kbitt_fDokApp = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_kbitt_fDokApp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_kbitt_fDokApp";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Approval Dokumen Fisik", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,460], childPage:["Data Pengajuan","Detail Pengajuan"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });

		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:13,tag:0,
		            colTitle:["Status","No Agenda","Tanggal","Modul","Bagian / Unit","Akun","DRK","Uraian","Nominal","Tgl Input","User","No SPB","No BK"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[100,100,150,60,80,200,60,150,150,60,60,80,80]],
					readOnly:true,colFormat:[[8],[cfNilai]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APPROVE","INPROG"]})]],checkItem:true,
					change:[this,"doChangeCells"], dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Verifikasi",maxLength:30,readOnly:true,visible:false});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"],visible:false});
		
		this.e_noaju = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"No Agenda", tag:9, readOnly:true});						
		this.e_modul = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Modul", tag:9,eadOnly:true});						
		this.e_akun = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,450,20],caption:"Akun", tag:9,readOnly:true});								
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,15,450,20],caption:"Bagian/Unit", tag:9,readOnly:true});												
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,450,20],caption:"Deskripsi", tag:9,readOnly:true});								
		this.e_drk = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,16,450,20],caption:"DRK", tag:9,readOnly:true});												
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,450,20],caption:"Tanggal", tag:9,readOnly:true});								
		this.e_tglinput = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,18,450,20],caption:"Tgl Input", tag:9,readOnly:true});												
		this.e_user = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,450,20],caption:"User Input", tag:9,readOnly:true});								
		this.e_nikpj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,19,450,20],caption:"NIK Panjar", readOnly:true, tag:9});								
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai Pengajuan", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.e_npajak = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Nilai Pajak", tag:9, readOnly:true, tipeText:ttNilai, text:"0", tag:9});		
		this.e_nilaipj = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,17,200,20],caption:"Nilai Panjar (Ptg)", tag:9, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,42,996,288], childPage:["Rekening","File Dok"]});    
		this.sgRek = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-10],colCount:10,tag:9,
				colTitle:["Kd Mitra","Bruto","Pot. Pajak","Netto","Berita/Penerima","Nama Rek","Bank","No Rekening","Kode Pajak","NPWP"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[80,80,150,150,150,150,80,80,80,60]],
				readOnly:true,				
				colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],												
				change:[this,"doChangeCellRek"],
				defaultRow:1,autoAppend:false});
		
		this.sgUpld = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-10],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Nama File","DownLoad","Jenis"],
				colWidth:[[4,3,2,1,0],[50,80,300,200,80]], 
				readOnly:true,				
				colFormat:[[3],[cfButton]], 					
				click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]],
				readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		
		// this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,200,20],caption:"No Agenda",tag:9});
		// this.e_nominal = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,200,20],caption:"Nominal", tipeText:ttNilai, text:"0",tag:9});		
		// this.bCari = new button(this.pc1.childPage[2],{bound:[230,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		// this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			var data = this.dbLib.getDataProvider("select convert(varchar,getdate(),103) as tgl ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.dp_d1.setText(line.tgl);
			}
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.stsCol = [0, 0, 0, 0, 0];
			this.c_show.setText("25");
			this.timeout = null;
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_kbitt_fDokApp.extend(window.childForm);
window.app_saku2_transaksi_kopeg_kbitt_fDokApp.implement({
	doSgBtnClick: function(sender, col, row){
		try{			
			if (col === 3) {
				if(this.sgUpld.getCell(4,row) == "1"){
					window.open(this.sgUpld.getCell(2,row));
				}else{
					window.open("server/media/"+this.sgUpld.getCell(2,row));
				}
			}
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
			var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"it_dok_app","no_app",this.app._lokasi+"-DOK"+this.e_periode.getText().substr(2,4)+".","00000");		
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "APPROVE") {
							sql.add("insert into it_dok_app(no_app,no_aju,kode_lokasi,tgl_input,nik_user) values "+
										"('"+nb+"','"+line.no_aju+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"')");
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
					this.sg.clear(1); 
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				var isAda = "0";				
				for (var i=0;i < this.dataJU.rs.rows.length;i++){				
					if (this.dataJU.rs.rows[i].status.toUpperCase() == "APPROVE") {
						isAda = "1";											
					}
				}											
				if (isAda == "0"){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status APPROVE.");
					return false;
				}	
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.doClick();
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"it_dok_app","no_app",this.app._lokasi+"-DOK"+this.e_periode.getText().substr(2,4)+".","00000"));		
	},		
	doChangeCells: function(sender, col , row) {		
		if (col == 0) {
			var show = parseInt(this.c_show.getText());	
			this.dataJU.rs.rows[((this.page-1)*show) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);						
				this.e_noaju.setText(this.sg.cells(1,row));			
				this.e_modul.setText(this.sg.cells(3,row));			
				this.e_akun.setText(this.sg.cells(5,row));			
				this.e_pp.setText(this.sg.cells(4,row));			
				this.e_ket.setText(this.sg.cells(7,row));			
				this.e_drk.setText(this.sg.cells(6,row));			
				this.e_tgl.setText(this.sg.cells(2,row));			
				this.e_tglinput.setText(this.sg.cells(9,row));			
				this.e_user.setText(this.sg.cells(10,row));						
				this.e_total.setText(this.sg.cells(8,row));									

				var data = this.dbLib.getDataProvider("select npajak from it_aju_m where no_aju='"+this.e_noaju.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){										
						this.e_npajak.setText(floatToNilai(line.npajak));
					}
				}
				
				this.sgUpld.clear(); 
				var data = this.dbLib.getDataProvider(							 
							 "select a.kode_jenis,a.nama,b.no_gambar,b.jenis "+
							 "from dok_jenis a left join it_aju_dok b on a.kode_jenis='DOK' and a.kode_lokasi=b.kode_lokasi and b.no_bukti='"+this.e_noaju.getText()+"' "+
							 "where a.kode_lokasi='"+this.app._lokasi+"' and b.no_gambar is not null ",true);							 							 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];													
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar,"DownLoad",line.jenis]);						
					}
				} else this.sgUpld.clear(1);
			
				if (this.e_modul.getText() == "PANJAR") {
					var strSQL = "select a.kode_drk+' - '+isnull(b.nama,'-') as drk "+						 
								 "from angg_r a left join drk b on a.kode_drk=b.kode_drk and a.kode_lokasi=b.kode_lokasi "+						
								 "where a.no_bukti='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_drk.setText(line.drk);													
						} 
					}
				}
				
				if (this.e_modul.getText() == "PJPTG") {
					var strSQL = "select a.nik_panjar+' - '+isnull(e.nama,'-') as nik_panjar "+						 
								 "from it_aju_m a left join karyawan e on a.nik_panjar=e.nik and a.kode_lokasi=e.kode_lokasi "+						
								 "				  left join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
								 "where b.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){															
							this.e_nikpj.setText(line.nik_panjar);													
						} 
					}
					//jika close ambil nilai panjar, jika open ambil nilaiptg sbg npanjar
					var data = this.dbLib.getDataProvider("select case when b.no_ref1='CLOSE' then a.nilai else b.nilai+b.npajak end as nilai_pj "+
			           "from it_aju_m a inner join it_aju_m b on a.no_aju=b.no_ptg and a.kode_lokasi=b.kode_lokasi "+
					   "where b.no_aju='"+this.e_noaju.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){																			
							this.e_nilaipj.setText(floatToNilai(line.nilai_pj));						
						} 
					}					
				}

				var strSQL = "select isnull(b.kode_dosen,'-') as kode_dosen,a.nilai+isnull(a.pajak,0) as bruto,a.pajak,a.nilai,case when c.form <> 'NONPEG' then '"+this.e_ket.getText()+"' else a.berita end as berita,"+ //7-5-18 rudi....a.berita							
							 " a.bank as bank, a.no_rek as rek, a.nama_rek as nama, "+
							
							 "isnull(a.kode_pajak,'-') as kode_pajak,a.npwp "+
							 "from it_aju_rek a inner join it_aju_m c on a.no_aju=c.no_aju and a.kode_lokasi=c.kode_lokasi "+
							 "left join it_dosen b on a.keterangan=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_aju='"+this.e_noaju.getText()+"' and a.kode_lokasi ='"+this.app._lokasi+"' ";	
							 											 
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgRek.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sgRek.appendData([line.kode_dosen,floatToNilai(line.bruto),floatToNilai(line.pajak),floatToNilai(line.nilai),line.berita,line.nama,line.bank,line.rek,line.kode_pajak,line.npwp]);
					}
					this.sgRek.validasi();
				} else this.sgRek.clear(1);											
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){			
		var show = parseInt(this.c_show.getText());	
		var strSQL = "select 'INPROG' as status,a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,a.tanggal as tgl,a.no_spb,a.no_kas "+
		             "from it_aju_m a "+					 
					 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app "+					 					 
					 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
					 "left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
					 "left join it_dok_app e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi "+
					 "where a.progress='3' and e.no_aju is null and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal ";			
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/show));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},
	// doCari:function(sender){				
	// 	var filter = "";		
	// 	if (this.e_nobukti.getText()!="") filter = " where e.no_aju is null and a.progress in ('3') and a.no_aju='"+this.e_nobukti.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";
	// 	if (nilaiToFloat(this.e_nominal.getText())!=0) filter = " where e.no_aju is null and a.progress in ('3') and a.nilai="+nilaiToFloat(this.e_nominal.getText())+" and a.kode_lokasi='"+this.app._lokasi+"'";		
		
	// 	var strSQL = "select 'INPROG' as status,no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user "+
	// 				 "from it_aju_m a "+					 
	// 				 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
	// 				 "inner join it_ajuapp_m f on a.no_aju=f.no_aju and a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' "+					 					 
	// 				 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
	// 				 "left join it_dok_app e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi "+
	// 				 "left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+filter;					
	// 	var data = this.dbLib.getDataProvider(strSQL,true);
	// 	if (typeof data == "object" && data.rs.rows[0] != undefined){
	// 		this.dataJU = data;
	// 		this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
	// 		this.sgn.rearrange();
	// 		this.doTampilData(1);
	// 	} else this.sg.clear(1);
	// 	this.pc1.setActivePage(this.pc1.childPage[0]);
	// },
	doTampilData: function(page) {
		var show = parseInt(this.c_show.getText());
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * show;
		var finish = (start + show > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+show);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];										
			this.sg.appendData([line.status.toUpperCase(),line.no_aju,line.tanggal,line.modul,line.pp,line.akun,line.drk,line.keterangan,floatToNilai(line.nilai),line.tgl_input,line.nik_user,line.no_spb,line.no_kas]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doChangeCellRek: function(sender, col, row){
		if (col == 1 || col == 2) {			
			if (this.sgRek.cells(1,row) != "" && this.sgRek.cells(2,row) != "") {
				var neto = nilaiToFloat(this.sgRek.cells(1,row)) - nilaiToFloat(this.sgRek.cells(2,row));
				this.sgRek.cells(3,row,floatToNilai(neto));				
			}
		}		
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['a.no_aju', 'a.no_spb', 'a.no_kas'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}
			
			var strSQL = "select 'INPROG' as status,a.no_aju,convert(varchar,a.tanggal,103) as tanggal,a.modul,b.kode_pp+' - '+b.nama as pp,c.kode_akun+' - '+isnull(c.nama,'-') as akun,a.kode_drk+' - '+isnull(d.nama,'-') as drk,a.keterangan,a.nilai,convert(varchar,a.tgl_input,103) as tgl_input,a.user_input as nik_user,a.tanggal as tgl,a.no_spb,a.no_kas "+
						 "from it_aju_m a "+					 
						 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+					 					 
						 "inner join it_ajuapp_m f on a.kode_lokasi=f.kode_lokasi and f.jenis='ONLINE' and a.no_app=f.no_app "+					 					 
						 "left join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
						 "left join it_dok_app e on a.no_aju=e.no_aju and a.kode_lokasi=e.kode_lokasi "+
						 "where (" + filter_string + ") and a.progress='3' and e.no_aju is null and a.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal ";			
			
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length / show));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch (e) {
			alert(e);
		}
	}
});