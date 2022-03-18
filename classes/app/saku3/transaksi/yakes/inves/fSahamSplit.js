window.app_saku3_transaksi_yakes_inves_fSahamSplit = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fSahamSplit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fSahamSplit";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Stock Split", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;checkBox;pageControl");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Split","List Split"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
				colTitle:["No Bukti","Tanggal","Deskripsi","Saham","Pilih"],
				colWidth:[[4,3,2,1,0],[70,100,350,80,100]],
				colFormat:[[4],[cfButton]],readOnly:true,
				click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],
				dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,452,20],caption:"Deskripsi", maxLength:150});								
		this.cb_plan = new saiCBBL(this.pc2.childPage[0],{bound:[20,16,220,20],caption:"Plan Asset", multiSelection:false, maxLength:10, tag:2,readOnly:true, change:[this,"doChange"]});						
		this.cb_saham = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Saham", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});						
		this.e_kali = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,200,20],caption:"Jml Pengali", tipeText:ttNilai, text:"1",tag:2});
		this.bTampil = new button(this.pc2.childPage[0],{bound:[230,17,80,18],caption:"Load Saham",click:[this,"doTampil"]});			
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,200,20],caption:"Total Lbr", tipeText:ttNilai, text:"0", readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,22,996,282], childPage:["Data Saham","Rekap Data","File Dok"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:9,tag:0,				
				colTitle:["Kelola","Nama","Kd Saham","Nama Saham","Harga Oleh","Harga Buku","Lbr Awal","Lbr Tambah","Lbr Akhir"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[90,90,90,100,100,150,80,150,60]],
				columnReadOnly:[true,[0,1,2,3,4,5,6,7,8],[]],
				colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],				
				nilaiChange:[this,"doNilaiChange"],
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-10],colCount:2,tag:9, 
		        colTitle:["Saham","Jml Lbr"],
				colWidth:[[1,0],[100,80]],
				colFormat:[[1],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});

		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc1.childPage[2],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
				colTitle:["namaFile","status"],
				colWidth:[[1,0],[80,180]],
				readOnly: true,autoAppend:false,defaultRow:1});			
					
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
					
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
									
			this.cb_plan.setSQL("select kode_plan, nama from inv_plan",["kode_plan","nama"],false,["Kode","Nama"],"where","Daftar Plan Asset",true);			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('PLAN') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "PLAN") this.cb_plan.setText(line.flag);																										
				}
			}
			this.cb_saham.setSQL("select kode_saham, nama from inv_saham where flag_aktif='1'",["kode_saham","nama"],false,["Kode","Nama"],"and","Daftar Saham",true);									

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fSahamSplit.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fSahamSplit.implement({
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
				this.sgUpld.cells(2,row, data.tmpfile);       
				this.sgUpld.cells(4,row, "DownLoad");                
			}
		}catch(e){
			alert(e+" "+data);
		}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
					"select kode_jenis,nama   from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SB'",
					"select count(kode_jenis) from inv_dok_jenis where kode_lokasi = '"+this.app._lokasi+"' and modul ='SB'",
					["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4) window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
	},	
	doTampil : function() {		
		if (this.cb_saham.getText() != "" && this.cb_plan.getText() != "") {
			
			this.nik_user=this.app._nikUser;						
			var strSql = "call sp_get_hsahamkelola ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";								
			this.dbLib.execQuerySync(strSql);	
									
			var strSQL = "select a.kode_kelola,b.nama as nama_kelola,a.kode_saham,c.nama as nama_saham,a.jumlah,a.h_oleh,a.h_buku,round(a.jumlah * "+nilaiToFloat(this.e_kali.getText())+",0) - a.jumlah as tambah, round(a.jumlah * "+nilaiToFloat(this.e_kali.getText())+",0) as lbr_akhir "+
						 "from inv_saham_tmp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola and b.flag_aktif='1' "+
						 "                     inner join inv_saham c on a.kode_saham=c.kode_saham "+
						 "where a.kode_plan='"+this.cb_plan.getText()+"' and a.kode_saham='"+this.cb_saham.getText()+"' and a.nik_user='"+this.nik_user+"' order by a.kode_kelola";
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg.appendData([line1.kode_kelola,line1.nama_kelola,line1.kode_saham,line1.nama_saham,floatToNilai(line1.h_oleh),floatToNilai(line1.h_buku),floatToNilai(line1.jumlah),floatToNilai(line1.tambah),floatToNilai(line1.lbr_akhir)]);
				}
			} else this.sg.clear(1);							
			this.sg.validasi();
		}
		else system.alert(this,"Data Saham tidak valid.","Data saham harus terisi.");		
	},
	doRekap : function() {
		this.sg2.clear();
		var jumlah = nilai = 0;
		for (var i=0;i < this.sg.rows.getLength();i++){						
			if (this.sg.rowValid(i)) {
				jumlah = nilaiToFloat(this.sg.cells(8,i));				
				var isAda = false;
				var idx = totaljml = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg.cells(0,i) == this.sg2.cells(0,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				
				if (!isAda) {
					this.sg2.appendData([this.sg.cells(0,i),floatToNilai(jumlah)]);
				} 
				else { 
					totaljml = nilaiToFloat(this.sg2.cells(1,idx));
					totaljml = totaljml + jumlah;
					this.sg2.setCell(1,idx,totaljml);					
				}								
			}
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from inv_shmbeli_m where no_shmbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from inv_shmbeli_d where no_shmbeli='"+this.e_nb.getText()+"' ");						
						sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='SHMSPLIT'");			
					}
					
					sql.add("insert into inv_shmbeli_m(no_shmbeli,kode_lokasi,periode,tanggal,nik_user,tgl_input,posted,no_kas,progress,nik_buat,  no_dokumen,keterangan,kode_drk,kode_kelola,tgl_set,nilai_komisi,nilai_ppn,nilai_levy,nilai_pph,modul,nilai,no_app1,no_spb,kode_pp, kode_plan) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._userLog+"',getdate(),'X','SHMSPLIT','0','"+this.app._userLog+"','-','"+this.e_ket.getText()+"','-','"+this.cb_saham.getText()+"','"+this.dp_d1.getDateString()+"',"+nilaiToFloat(this.e_kali.getText())+",0,0,0,'SHMSPLIT',0,'-','-','"+this.kodepp+"','"+this.cb_plan.getText()+"')");
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i) && this.sg.cells(7,i) != "" && this.sg.cells(7,i) != "0"){							
							sql.add("insert into inv_shmbeli_d (no_shmbeli,kode_kelola,kode_saham,h_oleh,h_buku,harga,jumlah,n_beli,  komisi,vat,levi,pph,kode_broker,h_buku2,kode_plan) values "+
								    "('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(4,i))+","+nilaiToFloat(this.sg.cells(5,i))+",0,"+nilaiToFloat(this.sg.cells(7,i))+",0, 0,0,0,0,'-',0,'"+this.cb_plan.getText()+"')");
						}						
					}
					
					//dokumen						
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}							
							sql.add("insert into inv_dok(no_bukti,no_gambar,nu,kode_jenis,kode_lokasi,modul,no_ref) values ('"+this.e_nb.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"','SHMSPLIT','"+this.e_nb.getText()+"')");															
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
					this.sg3.clear(1);
					this.sg2.clear(1);
					this.sgUpld.clear(1);
					this.sgFile.clear(1);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;
					this.doClick(this.i_gen);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);			
				break;
			case "simpan" :	
			case "ubah" :	
				this.doRekap();					
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from inv_shmbeli_m where no_shmbeli='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_shmbeli_d where no_shmbeli='"+this.e_nb.getText()+"' ");
					sql.add("delete from inv_dok where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='SHMSPLIT'");			
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doChange:function(sender){		
		if (sender == this.cb_plan && this.cb_plan.getText()!="") {		
			if (this.stsSimpan == 1) {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
			var data = this.dbLib.getDataProvider("select kode_param,flag from inv_saham_param where kode_plan = '"+this.cb_plan.getText()+"' and kode_param in ('PPINV')",true);						
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_param == "PPINV") this.kodepp = line.flag;																															
				}
			}					
		}	
		if (sender == this.cb_saham && this.cb_saham.getText()!="") {			
			if (this.stsSimpan == 1) {
				this.sg.clear(1);
				this.sg2.clear(1);
				this.sgUpld.clear(1);
				this.sgFile.clear(1);
			}
		}		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0){
				this.sg.clear(1); 
				this.sg2.clear(1); 
				this.sg3.clear(1);	
				this.sgUpld.clear(1);
				this.sgFile.clear(1);		
			}
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;			
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_shmbeli_m","no_shmbeli",this.app._lokasi+"-SPL"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
		}		
	},		
	doNilaiChange: function(){
		try{			
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(8,i) != ""){
					tot += nilaiToFloat(this.sg.cells(8,i));					
				}
			}			
			this.e_total.setText(floatToNilai(tot));									
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kb_rptKbBuktiJurnal";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}							
						}else system.info(this,result,"");
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
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();
				this.pc2.show();   
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);										
			this.sg.clear(1);
			this.sg3.clear(1);
			this.sg2.clear(1);
			this.sgUpld.clear(1);
			this.sgFile.clear(1);
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
			this.doClick(this.i_gen);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select a.no_shmbeli,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_kelola "+
		             "from inv_shmbeli_m a "+					 
					 "where a.progress in ('0','M') and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul='SHMSPLIT'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);							
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_shmbeli,line.tgl,line.keterangan,line.kode_kelola,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,baris));								
								
				var strSQL = "select * from inv_shmbeli_m where no_shmbeli= '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																			
						this.dp_d1.setText(line.tanggal);											
						this.e_ket.setText(line.keterangan);
						this.e_kali.setText(floatToNilai(line.nilai_komisi));						
						this.cb_plan.setText(line.kode_plan);
						this.cb_saham.setText(line.kode_kelola);						
					}
				}
				
				this.nik_user=this.app._nikUser;						
				var sql = "call sp_get_hsahamkelola ('"+this.cb_plan.getText()+"','"+this.e_periode.getText()+"','"+this.nik_user+"','"+this.e_nb.getText()+"')";														
				this.dbLib.execQuerySync(sql);	
				
				var strSQL = "select a.kode_kelola,b.nama as nama_kelola,a.kode_saham,c.nama as nama_saham,a.jumlah,a.h_oleh,a.h_buku,round(a.jumlah * "+nilaiToFloat(this.e_kali.getText())+",0) - a.jumlah as tambah, round(a.jumlah * "+nilaiToFloat(this.e_kali.getText())+",0) as lbr_akhir "+
							 "from inv_saham_tmp a inner join inv_kelola b on a.kode_kelola=b.kode_kelola  "+
							 "                     inner join inv_saham c on a.kode_saham=c.kode_saham "+
							 "					   inner join inv_shmbeli_d d on a.kode_kelola=d.kode_kelola and a.kode_saham=d.kode_saham and a.kode_plan=d.kode_plan "+
							 "where a.kode_plan='"+this.cb_plan.getText()+"' and d.no_shmbeli='"+this.e_nb.getText()+"' and a.nik_user='"+this.nik_user+"' order by a.kode_kelola";

				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg.appendData([line1.kode_kelola,line1.nama_kelola,line1.kode_saham,line1.nama_saham,floatToNilai(line1.h_oleh),floatToNilai(line1.h_buku),floatToNilai(line1.jumlah),floatToNilai(line1.tambah),floatToNilai(line1.lbr_akhir)]);
					}
				} else this.sg.clear(1);							
				this.sg.validasi();

				this.sgUpld.clear(); this.sgFile.clear();							
				var data = this.dbLib.getDataProvider(
							 "select b.kode_jenis,b.nama,a.no_gambar "+
							 "from inv_dok a inner join inv_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_bukti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;					
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar,"HAPUS"]);
						this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);						
					}
				} else this.sgUpld.clear(1);
				
				this.doRekap();
			}
		} catch(e) {alert(e);}
	}	
});