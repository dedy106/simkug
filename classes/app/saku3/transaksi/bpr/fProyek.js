window.app_saku3_transaksi_bpr_fProyek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fProyek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fProyek";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["Data Proyek","List Proyek"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["No Proyek","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,multiSelection:false, change:[this,"doChange"]}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.c_status = new saiCB(this.pc2.childPage[0],{bound:[20,10,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2,visible:false});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,20,996,370], childPage:["Data RAB","Data Proyek","File Dokumen","Rekap Transaksi"]});		
		this.sgr = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,337],colCount:5,tag:1,
		            colTitle:["Kegiatan","Quantity","Satuan","Harga Satuan","SubTotal"],
					colWidth:[[4,3,2,1,0],[100,100,100,100,500]],
					columnReadOnly:[true,[4],[]],					
					colFormat:[[1,3,4],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste2"], 
					nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCells2"],autoAppend:true,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
		this.e_totrab = new saiLabelEdit(this.sgnr,{bound:[780,1,200,20],caption:"Total RAB", tag:1, tipeText:ttNilai, text:"0", readOnly:true});						

		this.e_dok = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,430,20],caption:"No Kontrak", maxLength:50, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,430,20],caption:"Deskripsi", maxLength:200, tag:1});			
		this.cb_cust = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false});	
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,14,98,18],selectDate:[this,"doSelectDate2"]}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Jenis",tag:2,multiSelection:false}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0"});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,14,20,20],hint:"Hitung PPN",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doPPN"]});						
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Persentase OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true});										
		
		this.sgUpld = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,
					    colTitle:["Kd Jenis","Jenis Dokumen","Path File","Upload"],
					    colWidth:[[3,2,1,0],[80,480,200,80]], 
						colFormat:[[3],[cfUpload]], buttonStyle:[[0],[bsEllips]], 
						ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width-1,25],buttonStyle:1, grid:this.sgUpld});


		this.e_totalINV = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,200,20],caption:"Rekap Tagihan", tag:8, tipeText:ttNilai, text:"0",readOnly:true});
		this.e_totalOR = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,17,200,20],caption:"Rekap OR", tag:8, tipeText:ttNilai, text:"0",readOnly:true});


		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from pr_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.cb_pp.setText(this.app._kodePP);		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fProyek.extend(window.childForm);
window.app_saku3_transaksi_bpr_fProyek.implement({	
	doAfterPaste2: function(sender,totalRow){
		try {
			this.sgr.validasi();
		} catch(e) {alert(e);}
	},
	doChangeCells2: function(sender, col, row){
		if ((col == 1 || col == 3) && this.sgr.cells(1,row) != "" && this.sgr.cells(2,row) != "") this.sgr.validasi();				
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sgr.getRowCount();i++){
				if (this.sgr.cells(1,i) != "" && this.sgr.cells(3,i) != ""){
					var subttl = Math.round(nilaiToFloat(this.sgr.cells(1,i)) * nilaiToFloat(this.sgr.cells(3,i)) * 100) / 100; 
					this.sgr.cells(4,i,subttl);
					tot += nilaiToFloat(this.sgr.cells(4,i));					
				}
			}						
			this.e_totrab.setText(floatToNilai(tot));			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from pr_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
						sql.add("delete from pr_proyek_dok where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from pr_rab_d where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into pr_proyek(kode_proyek,nama,flag_aktif,kode_lokasi,no_pks,kode_pp,kode_cust,tgl_mulai,tgl_selesai,nilai,nilai_or,p_or,kode_jenis,nilai_ppn, kode_drkp,kode_drkb, nik_app,progress,no_app) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_status.getText().substr(0,1)+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.cb_pp.getText()+"','"+this.cb_cust.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_nilaior.getText())+","+nilaiToFloat(this.e_persenor.getText())+",'"+this.cb_jenis.getText()+"',"+nilaiToFloat(this.e_nilaippn.getText())+",'-','-','-','0','-')");
				
					
					for (var i=0;i < this.sgr.getRowCount();i++){
						if (this.sgr.rowValid(i)){								
							sql.add("insert into pr_rab_d(no_rab,kode_proyek,kode_lokasi,nu,keterangan,jumlah,harga,total,satuan) values "+
									"('"+this.cb_kode.getText()+"','"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sgr.cells(0,i)+"',"+nilaiToFloat(this.sgr.cells(1,i))+","+nilaiToFloat(this.sgr.cells(3,i))+","+nilaiToFloat(this.sgr.cells(4,i))+",'"+this.sgr.cells(2,i)+"')");
						}
					}
					
					var ix=0;
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							ix++;
							sql.add("insert into pr_proyek_dok(kode_proyek,no_gambar,nu,kode_jenis,kode_lokasi) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+ix+"','"+this.sgUpld.cells(0,i)+"','"+this.app._lokasi+"')");								
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from pr_proyek where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("delete from pr_proyek_dok where kode_proyek='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from pr_rab_d where no_rab='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					
					this.deletedFiles = "";	
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){
							if (this.deletedFiles != "") this.deletedFiles += ";";
							this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(2,i);
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.stsSimpan = 1;									
					this.sg3.clear(1);
					this.sgr.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
				break;
			case "simpan" :	
			case "ubah" :			
					if (nilaiToFloat(this.e_totrab.getText()) != nilaiToFloat(this.e_nilaior.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai OR dan Total RAB tidak sama.");
						return false;
					}				
					if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai tidak boleh nol atau kurang.");
						return false;
					}
					if (nilaiToFloat(this.e_nilai.getText()) <= nilaiToFloat(this.e_totalINV.getText())) {
						system.alert(this,"Nilai Proyek tidak valid.","Nilai tidak boleh kurang dari yang sudah ditagihkan.");
						return false;
					}
					if (nilaiToFloat(this.e_nilaior.getText()) <= nilaiToFloat(this.e_totalOR.getText())) {
						system.alert(this,"Nilai OR tidak valid.","Nilai OR tidak boleh kurang dari yang sudah dibiayakan.");
						return false;
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
							
			case "hapus" :					
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = y+""+m;	

		if (this.stsSimpan == 1) this.doClick();		
	},	
	doClick:function(sender){		
		try {
			if (this.stsSimpan==0) {
				this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true); //kode_pp='"+this.app._kodePP+"' and						
				this.sgr.clear(1);		
				this.sg.clear(1);	
			}
			setTipeButton(tbSimpan);
			
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_proyek","kode_proyek",this.cb_pp.getText()+"-"+this.periode.substr(2,4)+".","0000"));						
			this.e_dok.setFocus();	
			this.stsSimpan = 1;		
		}
		catch(e) {
			alert(e);
		}
	},
	doPPN:function(sender){	
		if (this.e_nilai.getText() != "") {				
			var nilaiPPN = Math.round(nilaiToFloat(this.e_nilai.getText()) * 10/100);
			this.e_nilaippn.setText(floatToNilai(nilaiPPN));				
		}			
	},				
	doChange: function(sender){
		try{
			if (sender == this.cb_pp && this.cb_pp.getText() != "" && this.stsSimpan==1) {
				this.doClick();
			}			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select a.* from pr_proyek a  "+
							 "where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);
						this.cb_cust.setText(line.kode_cust);
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));

						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						
						this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

						if (line.flag_aktif == "0") this.c_status.setText("0. NONAKTIF");
						else this.c_status.setText("1. AKTIF");
						
						this.sgUpld.clear();
						this.deleteFiles = [];
						this.listFiles = new arrayMap();			
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from pr_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.listFiles.set(line.no_gambar,line.no_gambar); 
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar}]);
							}
						} else this.sgUpld.clear(1);

						var data = this.dbLib.getDataProvider("select * from pr_rab_d where no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgr.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),line.satuan,floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 						
					}					
				}

				// cek nilai yg sudah ditransaksikan..(tidak boleh kurang)
				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as nilai_piu "+
							 "from trans_j "+
							 "where modul='PR' and jenis in ('PIUTANG','HPPN','UNBILL','REVUNBILL') and no_dokumen='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_totalINV.setText(floatToNilai(parseFloat(line.nilai_piu)));
					}
				}		

				var strSQL = "select isnull(sum(case dc when 'D' then nilai else -nilai end),0) as tot_bdd "+
						 	 "from pr_or_d where kode_proyek = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object") {
					var line = data.rs.rows[0];							
					if (line != undefined){	
						this.e_totalOR.setText(floatToNilai(parseFloat(line.tot_bdd)));
					}
				}


			}
			
			if ((sender == this.e_persenor || sender == this.e_nilai) && this.e_persenor.getText() != "" && this.e_nilai.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
			
						
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
												  "select kode_jenis,nama   from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_jenis) from dok_jenis where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}					
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 3){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
                this.sgUpld.cells(2,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1) {
							if (this.preView == "1") {								
								this.nama_report="server_report_saku3_produk_rptProyekMasterr";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bukti='"+this.cb_kode.getText()+"' ";
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
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.nb+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataPR = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataPR.set(line.kode_proyek, line.nama);										
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
	doLoad3:function(sender){																				
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from pr_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_pp='"+this.app._kodePP+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress in ('0','R') ";		
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
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.stsSimpan = 0;
				setTipeButton(tbUbahHapus);

				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	}
});