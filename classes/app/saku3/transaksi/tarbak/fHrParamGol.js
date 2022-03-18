window.app_saku3_transaksi_tarbak_fHrParamGol = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrParamGol.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrParamGol";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Tarif Golongan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Parameter","Data Parameter"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:4,tag:9,
		            colTitle:["Kode","Nama","MK","Tarif"],
					colWidth:[[3,2,1,0],[100,50,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Golongan", multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_mk = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Masa Kerja (Tahun)", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});				
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Tarif Gaji", tag:1,  tipeText:ttNilai, text:"0"});				

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
			this.cb_kode.setSQL("select kode_gol,nama from hr_gol where kode_lokasi='"+this.app._lokasi+"'",["kode_gol","nama"],false,["Kode","Nama"],"and","Data Golongan",true);	
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrParamGol.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrParamGol.implement({
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
					sql.add("insert into hr_gol_tarif(kode_gol,kode_lokasi,mk,tarif) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_mk.getText())+","+nilaiToFloat(this.e_tarif.getText())+")");
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
					sql.add("delete from hr_gol_tarif where kode_gol = '"+this.cb_kode.getText()+"' and mk="+nilaiToFloat(this.e_mk.getText())+" and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("insert into hr_gol_tarif(kode_gol,kode_lokasi,mk,tarif) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_mk.getText())+","+nilaiToFloat(this.e_tarif.getText())+")");
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
					sql.add("delete from hr_gol_tarif where kode_gol = '"+this.cb_kode.getText()+"' and mk="+nilaiToFloat(this.e_mk.getText())+" and kode_lokasi='"+this.app._lokasi+"'");	
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
			if ((sender == this.cb_kode || sender == this.e_mk) && this.cb_kode.getText() != "" && this.e_mk.getText() != ""){
				var strSQL = "select b.tarif "+
							 "from hr_gol_tarif b "+
							 "where b.kode_gol ='"+this.cb_kode.getText()+"' and b.mk="+nilaiToFloat(this.e_mk.getText())+" and b.kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_tarif.setText(floatToNilai(line.tarif));							
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
				this.e_mk.setText(this.sg1.cells(2,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_gol,a.nama,b.mk,b.tarif "+
					 "from hr_gol a inner join hr_gol_tarif b on a.kode_gol=b.kode_gol and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+
					 "order by a.kode_gol,b.mk";						   				
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_gol,line.nama,floatToNilai(line.mk),floatToNilai(line.tarif)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});