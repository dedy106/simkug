window.app_saku3_transaksi_fitnes_fPeserta = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_fitnes_fPeserta.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_fitnes_fPeserta";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Peserta", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Peserta","Data Peserta","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Alamat","Status","Nikes"],
					colWidth:[[4,3,2,1,0],[100,100,300,200,80]],
					readOnly:true, autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",readOnly:true,maxLength:10,change:[this,"doChange"]});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_klp = new saiCBBL(this.pc1.childPage[1],{bound:[20,23,220,20],caption:"Kelompok", multiSelection:false, maxLength:10, tag:2});										
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Lahir", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18]}); 				
		this.e_nikkes = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"NiKes", maxLength:50, tag:1});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});			
		this.e_loker = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Lokasi Kerja", maxLength:50, tag:1});			
		this.c_sex = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Sex",items:["L","P"], readOnly:true,tag:2});
		this.c_goldar = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Gol Darah",items:["A","B","AB","O"], readOnly:true,tag:2});
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,500,20],caption:"Alamat", maxLength:150, tag:1});					
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,300,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_mail = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,300,20],caption:"Email", maxLength:50, tag:1});	
		this.e_rsakit = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,500,20],caption:"Riwayat Penyakit", maxLength:50, tag:1});		
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Kode",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_klp.setSQL("select kode_klp, nama from fi_peserta_klp where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_fitnes_fPeserta.extend(window.childForm);
window.app_saku3_transaksi_fitnes_fPeserta.implement({
	doClick:function(sender){		
		var data = this.dbLib.getDataProvider("select substring(convert(varchar,GETDATE(),112),3,2) as tahun",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line = data.rs.rows[0];							
			this.tahun = line.tahun;
		} 
		
		this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"fi_anggota","kode_agg",this.tahun+".","00000"));						
		this.cb_klp.setFocus();
		setTipeButton(tbSimpan);			
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
					sql.add("insert into fi_anggota(kode_agg,nikkes,kode_lokasi,nama,alamat,no_tel,email,kode_klp,tgl_lahir,r_sakit,sex,goldar,loker,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nikkes.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.cb_klp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_rsakit.getText()+"','"+this.c_sex.getText()+"','"+this.c_goldar.getText()+"','"+this.e_loker.getText()+"','"+this.app._kodePP+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from fi_anggota where kode_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into fi_anggota(kode_agg,nikkes,kode_lokasi,nama,alamat,no_tel,email,kode_klp,tgl_lahir,r_sakit,sex,goldar,loker,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nikkes.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.e_mail.getText()+"','"+this.cb_klp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_rsakit.getText()+"','"+this.c_sex.getText()+"','"+this.c_goldar.getText()+"','"+this.e_loker.getText()+"','"+this.app._kodePP+"')");
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
					sql.add("delete from fi_anggota where kode_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);					
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * "+
				             "from fi_anggota "+
						     "where kode_agg ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.e_nama.setText(line.nama);
						this.c_sex.setText(line.sex);
						this.c_goldar.setText(line.goldar);
						this.e_rsakit.setText(line.r_sakit);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);						
						this.e_mail.setText(line.email);												
						this.e_nikkes.setText(line.nikkes);
						this.cb_klp.setText(line.kode_klp);
						this.dp_d1.setText(line.tgl_lahir);
						this.e_loker.setText(line.loker);
						setTipeButton(tbUbahHapus);
					}					
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Anggota",sender,undefined, 
											  "select kode_agg, nama  from fi_anggota where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  "select count(kode_agg) from fi_anggota where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",
											  ["kode_agg","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");														
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doCari:function(sender){								
		try {
			if (this.e_kode2.getText() != "") var filter = " kode_agg like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select * "+
						 "from fi_anggota "+					 
						 "where "+filter+" kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' order by kode_agg";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.sg1.clear();
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.kode_agg,line.nama,line.alamat,line.kode_klp,line.nikkes]); 
				}
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select kode_agg,nama,alamat,nikkes,kode_klp "+
						 "from fi_anggota "+					 
						 "where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' order by kode_agg";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				
				this.sg1.clear();
				for (var i=0;i<this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.kode_agg,line.nama,line.alamat,line.kode_klp,line.nikkes]); 
				}
				
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.doSelectPage(page);	
		this.page = page-1;		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);	
				
				if (this.page == undefined) this.page = 0;
				row = row + (this.page * 20);								
								
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});