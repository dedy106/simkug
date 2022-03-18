window.app_saku3_transaksi_kredit_fAgg = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_kredit_fAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_kredit_fAgg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Anggota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Anggota","Daftar Anggota","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["No Anggota","Nama","Alamat","No Telpon"],
					colWidth:[[3,2,1,0],[150,400,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Anggota",maxLength:10,change:[this,"doChange"],readOnly:true});		
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1,change:[this,"doChange"]});	
		this.e_id = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"No KTP", maxLength:50, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,500,20],caption:"Alamat", maxLength:200, tag:1});		
		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,500,20],caption:"No Telpon", maxLength:50, tag:1});									
		this.c_flag = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Flag Aktif",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});	
		this.cb_pp = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Cabang",tag:2,multiSelection:false});         				
		this.e_foto = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,400,20],caption:"Foto", readOnly:true, maxLength:300, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[430,15,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"No Anggota",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		this.img = new image(this.pc1.childPage[0],{bound:[550,20,160,180]});			
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select substring(cast(year(getdate()) as varchar),3,2) as tahun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.tahun = line.tahun;
			}
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' ",["kode_pp","nama"],false,["Kode","Nama"],"where","Data Cabang",true);			
			this.cb_pp.setText(this.app._kodePP);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_kredit_fAgg.extend(window.childForm);
window.app_saku3_transaksi_kredit_fAgg.implement({
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_foto.setText(data.filedest);
			this.dataUpload = data;
			this.img.setImage(this.uploader.param2 +this.dataUpload.tmpfile);
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into kre_agg(no_agg,kode_lokasi,nama,alamat,no_tel,flag_aktif,no_ktp,foto,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.c_flag.getText().substr(0,1)+"','"+this.e_id.getText()+"','"+this.e_foto.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from kre_agg where no_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into kre_agg(no_agg,kode_lokasi,nama,alamat,no_tel,flag_aktif,no_ktp,foto,kode_pp) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.c_flag.getText().substr(0,1)+"','"+this.e_id.getText()+"','"+this.e_foto.getText()+"','"+this.cb_pp.getText()+"')");
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
					sql.add("delete from kre_agg where no_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
	doClick:function(sender){
		try {
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kre_agg","no_agg",this.tahun+".","0000"));						
			this.e_nama.setFocus();
			setTipeButton(tbSimpan);			
		}
		catch(e) {
			alert(e);
		}
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select * from kre_agg where kode_pp='"+this.cb_pp.getText()+"' and no_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_id.setText(line.no_ktp);
						this.e_nama.setText(line.nama);
						this.e_alamat.setText(line.alamat);
						this.e_tel.setText(line.no_tel);	
						this.cb_pp.setText(line.kode_pp);					
						if (line.flag_aktif == "1") this.c_flag.setText("1. YA");
						else this.c_flag.setText("0. TIDAK");
						
						
						var strSQL = "select foto from kre_agg where no_agg='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line != undefined){							
								this.e_foto.setText(line.foto);
								this.img.setImage(this.uploader.param4+line.foto);
								this.fileBfr = line.foto;
							}
						}
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
											  "select no_agg, nama  from kre_agg where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(no_agg) from kre_agg where kode_lokasi='"+this.app._lokasi+"'",
											  ["no_agg","nama"],"and",["no_agg","Nama"],false);				
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
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							system.info(this,"Data Sukses Tersimpan",".");							
							this.app._mainForm.bClear.click();
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			if (this.e_kode2.getText() != "") var filter = " a.no_agg like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.no_agg,a.nama,a.alamat,a.no_tel "+
						 "from kre_agg a "+					 
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"' order by a.no_agg";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {
			var strSQL = "select a.no_agg,a.nama,a.alamat,a.no_tel "+
						 "from kre_agg a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp = '"+this.app._kodePP+"' order by a.no_agg";				
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[1]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var fino_aggh = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<fino_aggh;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.no_agg,line.nama,line.alamat,line.no_tel]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});