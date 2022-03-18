window.app_saku3_transaksi_apparindo_fRelJab = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_apparindo_fRelJab.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_apparindo_fRelJab";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Relasi Jabatan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox"); 
		uses("saiGrid",true);		
				
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Relasi Jabatan","Data Relasi Jabatan"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:4,tag:9,
		            colTitle:["Kode Cust","Kode Jabatan","Nama","No. Telepon"],
					colWidth:[[3,2,1,0],[100,300,80,80]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_cust = new saiCBBL(this.pc2.childPage[1],{bound:[20,11,220,20],caption:"Kode Anggota", multiSelection:false, maxLength:10, tag:2,,change:[this,"doChange"]});
		this.cb_jab = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Kode Jabatan", multiSelection:false, maxLength:10, tag:2,,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"Nama", maxLength:50, tag:1});				
		this.e_tel = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"No. Telepon", maxLength:50, tag:1});				

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_apparindo_fRelJab.extend(window.childForm);
window.app_saku3_transaksi_apparindo_fRelJab.implement({
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
					sql.add("insert into ape_rel_jab(kode_cust,kode_jab,kode_lokasi,nama,no_hp) values "+
							"('"+this.cb_cust.getText()+"','"+this.cb_jab.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_tel.getText()+"')");
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
					sql.add("delete from ape_rel_jab where kode_jab = '"+this.cb_jab.getText()+"' and kode_cust = '"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into ape_rel_jab(kode_cust,kode_jab,kode_lokasi,nama,no_hp) values "+
							"('"+this.cb_cust.getText()+"','"+this.cb_jab.getText()+"','"+this.app._lokasi+"','"+this.e_nama.getText()+"','"+this.e_tel.getText()+"')");
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
					sql.add("delete from ape_rel_jab where kode_jab = '"+this.cb_jab.getText()+"' and kode_cust = '"+this.cb_cust.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
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
			if (sender == this.cb_cust || this.cb_jab && this.cb_cust.getText() != "" && this.cb_jab.getText() != ""){
				var strSQL = "select * from ape_rel_jab where kode_jab ='"+this.cb_jab.getText()+"' and kode_cust ='"+this.cb_cust.getText()+"'  and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);
						this.e_tel.setText(line.no_hp);
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
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
	doLoad:function(sender){								
		try {			
			var strSQL = "select kode_cust,kode_jab,nama,no_hp where kode_lokasi='"+this.app._lokasi+"' ";								
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
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
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];								
			this.sg1.appendData([line.kode_cust,line.kode_jab,line.nama,line.no_hp]); 
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
				this.pc1.setActivePage(this.pc1.childPage[1]);													
				this.cb_cust.setText(this.sg1.cells(0,row));						
				this.cb_jab.setText(this.sg1.cells(1,row));						
			}
		} catch(e) {alert(e);}
	}
});