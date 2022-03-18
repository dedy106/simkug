window.app_saku3_transaksi_produk_fPotJual = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fPotJual.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fPotJual";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Satuan Brg", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Potongan","Data Pot. Jual"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["Kode Pot.","Tgl. Mulai","Tgl Selesai","Nilai Min.","Nilai Max.","Nilai Pot."],
					colWidth:[[5,4,3,2,1,0],[80,80,80,150,150,100]],
					colFormat:[[3,4,5],[cfNilai,cfNilai,cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Nilai Min.", maxLength:50, tag:1,tipeText:ttNilai, text:"0"});							
		this.e_nilaimax = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Nilai Max.", maxLength:50, tag:1,tipeText:ttNilai, text:"0"});							
		this.e_pot = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai Pot.", maxLength:50, tag:1,tipeText:ttNilai, text:"0"});							
		
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
window.app_saku3_transaksi_produk_fPotJual.extend(window.childForm);
window.app_saku3_transaksi_produk_fPotJual.implement({
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
					sql.add("insert into brg_potjual(kode_pot,kode_lokasi,kode_pp,tgl_input,tgl_mulai,tgl_selesai,nilai_min,nilai_pot,nilai_max) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_pot.getText())+","+nilaiToFloat(this.e_nilaimax.getText())+")");
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
					sql.add("delete from brg_potjual where kode_pot = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");												
					sql.add("insert into brg_potjual(kode_pot,kode_lokasi,kode_pp,tgl_input,tgl_mulai,tgl_selesai,nilai_min,nilai_pot,nilai_max) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.app._kodePP+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_pot.getText())+","+nilaiToFloat(this.e_nilaimax.getText())+")");
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
					sql.add("delete from brg_potjual where kode_pot = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from brg_potjual where kode_pot ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d1.setText(line.tgl_mulai);
						this.e_nilai.setText(floatToNilai(line.nilai_min));
						this.e_nilaimax.setText(floatToNilai(line.nilai_max));
						this.e_pot.setText(floatToNilai(line.nilai_pot));
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
							
			}
		} catch(e) {alert(e);}
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
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		var strSQL = "select * from brg_potjual where kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_pot,line.tgl_mulai,line.tgl_selesai,line.nilai_min,line.nilai_max,line.nilai_pot]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
