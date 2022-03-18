window.app_saku3_transaksi_yakes_inves_fRDMI = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fRDMI.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fRDMI";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Manager Investasi Reksadana", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List MI","Data MI"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Sts Aktif","Sts Universe","Pilih"],
					colWidth:[[4,3,2,1,0],[70,80,80,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});			
		this.c_aktif = new saiCB(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Status Aktif",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});		
		this.c_uni = new saiCB(this.pc2.childPage[1],{bound:[20,13,200,20],caption:"Status Universe",items:["1. YA","0. TIDAK"], readOnly:true,tag:2});		
		this.e_foto = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,32,370,20],caption:"Foto", readOnly:true, maxLength:100, tag:9});		
		this.uploader = new uploader(this.pc2.childPage[1],{bound:[410,32,80,18],caption:"Browse", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",autoSubmit:true, afterUpload:[this,"doAfterLoad"]}); 
		this.img = new image(this.pc2.childPage[1],{bound:[120,20,160,180]});

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
				
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('FIMG') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "FIMG") this.folderImg = line.flag;											
				}
			}
			this.uploader.param4 = this.folderImg;	

			this.doLoad3();		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fRDMI.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fRDMI.implement({
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
					sql.add("insert into inv_rdkelola(kode_rdkelola,nama,flag_aktif,flag_uni,gambar) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.c_aktif.getText().substr(0,1)+"','"+this.c_uni.getText().substr(0,1)+"','"+this.e_foto.getText()+"')");
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
					sql.add("update inv_rdkelola set nama='"+this.e_nama.getText()+"',flag_aktif='"+this.c_aktif.getText().substr(0,1)+"',flag_uni='"+this.c_uni.getText().substr(0,1)+"',gambar='"+this.e_foto.getText()+"' "+
					        "where kode_rdkelola='"+this.cb_kode.getText()+"'");
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
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "ubah" :	
				this.ubah();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				var sql = new server_util_arrayList();
				sql.add("delete from inv_rdkelola where kode_rdkelola='"+this.cb_kode.getText()+"'");			
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_rdkelola,nama,flag_aktif,flag_uni, "+
					 "case flag_aktif when '0' then 'T' else 'Y' end as aktif, "+
					 "case flag_uni when '0' then 'T' else 'Y' end as universe "+
					 "from inv_rdkelola order by flag_uni desc,flag_aktif desc,kode_rdkelola";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.page = 1;
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
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
			this.sg3.appendData([line.kode_rdkelola,line.nama,line.aktif.toUpperCase(),line.universe.toUpperCase(),"Pilih"]); 
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
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {							
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));									
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from inv_rdkelola where kode_rdkelola ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);												
						if (line.flag_aktif == "0") this.c_aktif.setText("0. TIDAK");
						else this.c_aktif.setText("1. YA");
						if (line.flag_uni == "0") this.c_uni.setText("0. TIDAK");
						else this.c_uni.setText("1. YA");

						this.e_foto.setText(line.gambar);
						this.img.setImage(this.uploader.param4 + line.gambar);
						this.fileBfr = line.gambar;	

						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
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
						if (result.toLowerCase().search("error") == -1) {
						
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_foto.getText()) this.fileUtil.deleteFile(this.rootDir+"/"+this.folderImg+this.fileBfr);
							}																
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);
							
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});