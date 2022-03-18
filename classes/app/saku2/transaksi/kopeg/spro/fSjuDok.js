window.app_saku2_transaksi_kopeg_spro_fSjuDok = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_spro_fSjuDok.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_spro_fSjuDok";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Inisial Dokumen", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:5,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this,{bound:[20,11,500,20],caption:"Nama", maxLength:50, tag:1});	
		this.cb_lokasi = new saiCBBL(this,{bound:[20,17,200,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2});		
		
		this.p1 = new panel(this,{bound:[20,23,500,300],caption:"Modul"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:2,tag:0,				
				colTitle:["Status","Modul"],
				colWidth:[[1,0],[300,80]],
				columnReadOnly:[true,[1],[0]],				
				buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["TRUE","FALSE"]})]],checkItem:true,
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where flag_konsol='0'",["kode_lokasi","nama"],false,["kode","Nama"],"and","Data Lokasi",true);								
			this.sg.clear();				
			this.sg.appendData(["FALSE","JU"]);
			this.sg.appendData(["FALSE","AR"]);
			this.sg.appendData(["FALSE","KB"]);
			this.sg.appendData(["FALSE","FA"]);
			this.sg.appendData(["FALSE","PJ"]);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_spro_fSjuDok.extend(window.childForm);
window.app_saku2_transaksi_kopeg_spro_fSjuDok.implement({
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
					sql.add("delete from sju_dokumen where no_dokumen='"+this.cb_kode.getText()+"'");
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="TRUE") {							
							sql.add("insert into sju_dokumen(no_dokumen,kode_lokasi,nama,modul) values "+
									"	('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.sg.cells(1,i)+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_dokumen where no_dokumen='"+this.cb_kode.getText()+"'");
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i) && this.sg.cells(0,i)=="TRUE") {							
							sql.add("insert into sju_dokumen(no_dokumen,kode_lokasi,nama,modul) values "+
									"	('"+this.cb_kode.getText()+"','"+this.cb_lokasi.getText()+"','"+this.e_nama.getText()+"','"+this.sg.cells(1,i)+"')");
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
					sql.add("delete from sju_dokumen where no_dokumen = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.sg.clear();				
					this.sg.appendData(["FALSE","JU"]);
					this.sg.appendData(["FALSE","AR"]);
					this.sg.appendData(["FALSE","KB"]);
					this.sg.appendData(["FALSE","FA"]);
					this.sg.appendData(["FALSE","PJ"]);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
				if (this.cb_kode.getText().length != 5) {
					system.alert(this,"Data tidak valid.","Kode harus 5 digit.");
					return false;						
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (this.cb_kode.getText().length != 5) {
					system.alert(this,"Data tidak valid.","Kode harus 5 digit.");
					return false;						
				}
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){			
				this.sg.clear();				
				this.sg.appendData(["FALSE","JU"]);
				this.sg.appendData(["FALSE","AR"]);
				this.sg.appendData(["FALSE","KB"]);
				this.sg.appendData(["FALSE","FA"]);
				this.sg.appendData(["FALSE","PJ"]);
				var strSQL = "select distinct nama,kode_lokasi from sju_dokumen where no_dokumen ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.cb_lokasi.setText(line.kode_lokasi);						
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)) {
								var strSQL = "select modul from sju_dokumen where no_dokumen ='"+this.cb_kode.getText()+"' and modul='"+this.sg.cells(1,i)+"'";
								var data = this.dbLib.getDataProvider(strSQL,true);
								if (typeof data == "object"){
									var line = data.rs.rows[0];							
									if (line != undefined){						
										this.sg.cells(0,i,"TRUE");
									}									
								}
							}							
						}						
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Inisial Dokumen",sender,undefined, 
											  "select distinct no_dokumen, nama  from sju_dokumen",
											  "select count(distinct no_dokumen) from sju_dokumen",
											  ["no_dokumen","nama"],"and",["Kode","Nama"],false);				
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
	}
});