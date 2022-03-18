window.app_saku3_transaksi_sapyakes_fTpkkTarif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fTpkkTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fTpkkTarif";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data TPKK", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_lokasi = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"Lokasi",tag:2,multiSelection:false,change:[this,"doChange"]}); 										
		this.c_periode = new saiCB(this,{bound:[20,14,200,20],caption:"Periode", readOnly:true,tag:2,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar TPKK","Data TPKK","Copy Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Tarif"],
					colWidth:[[2,1,0],[100,350,100]],
					colFormat:[[2],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});

		this.cb_tpkk = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"TPKK",tag:2,multiSelection:false,change:[this,"doChange"]}); 												
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Tarif", tag:1, tipeText:ttNilai, text:"0"});		

		this.cb_lokasi1 = new portalui_saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Lokasi",tag:2,multiSelection:false,change:[this,"doChange"]}); 										
		this.c_periode1 = new saiCB(this.pc1.childPage[2],{bound:[20,14,200,20],caption:"Periode Asal", readOnly:true,tag:1});
		this.c_periode2 = new saiCB(this.pc1.childPage[2],{bound:[20,15,200,20],caption:"Periode Tujuan", readOnly:true,tag:1});
		this.bCopy = new button(this.pc1.childPage[2],{bound:[120,18,80,18],caption:"Copy Data",click:[this,"doCopy"]});			

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
			
			this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			this.cb_lokasi.setText(this.app._lokasi);
			this.cb_lokasi1.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi <> '00' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);

			this.c_periode.items.clear();
			this.c_periode1.items.clear();
			this.c_periode2.items.clear();

			var data = this.dbLib.getDataProvider("select distinct periode from periode order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																		
					this.c_periode.addItem(i,line.periode);
					this.c_periode1.addItem(i,line.periode);
					this.c_periode2.addItem(i,line.periode);
				}
			} 


		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fTpkkTarif.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fTpkkTarif.implement({
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
	doCopy: function(){	
		if (this.cb_lokasi1.getText()!="" && this.c_periode1.getText()!="" && this.c_periode2.getText()!="") {
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();	
			
			sql.add("delete from yk_tpkk_tarif where periode='"+this.c_periode2.getText()+"' and kode_lokasi='"+this.cb_lokasi1.getText()+"' ");			

			sql.add("insert into yk_tpkk_tarif(kode_tpkk,kode_lokasi,periode,tarif)  "+
					"select kode_tpkk,kode_lokasi,'"+this.c_periode2.getText()+"',tarif from yk_tpkk_tarif where kode_lokasi='"+this.cb_lokasi1.getText()+"' and periode='"+this.c_periode1.getText()+"'");
			
			setTipeButton(tbAllFalse);
			this.dbLib.execArraySQL(sql);
		}
		else system.alert(this,"Lokasi,Periode Asal dan Tujuan harus terisi","");
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					
					sql.add("insert into yk_tpkk_tarif(kode_tpkk,kode_lokasi,periode,tarif) values "+
						    "('"+this.cb_tpkk.getText()+"','"+this.cb_lokasi.getText()+"','"+this.c_periode.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+")");
					
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

					sql.add("delete from yk_tpkk_tarif where kode_tpkk = '"+this.cb_tpkk.getText()+"' and periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' ");			

					sql.add("insert into yk_tpkk_tarif(kode_tpkk,kode_lokasi,periode,tarif) values "+
						    "('"+this.cb_tpkk.getText()+"','"+this.cb_lokasi.getText()+"','"+this.c_periode.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+")");

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
					sql.add("delete from yk_tpkk where kode_tpkk = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"'");			
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
			if ((sender == this.cb_lokasi) && this.cb_lokasi.getText()!="") {				
				this.cb_tpkk.setSQL("select a.kode_tpkk, a.nama from yk_tpkk a "+
									"where a.kode_lokasi = '"+this.cb_lokasi.getText()+"' ",
									["kode_tpkk","nama"],false,["Kode","Nama"],"and","Data TPKK",true);
			}

			if ((sender == this.cb_lokasi || sender == this.c_periode) && this.cb_lokasi.getText()!="" && this.c_periode.getText()!="") {
				this.doLoad();	
			}

			if ((sender == this.cb_tpkk || sender == this.c_periode) && this.cb_tpkk.getText()!="" && this.c_periode.getText()!="") {
				
				this.e_tarif.setText("0");							
				setTipeButton(tbSimpan);

				var strSQL = "select * from yk_tpkk_tarif where kode_tpkk ='"+this.cb_tpkk.getText()+"' and periode='"+this.c_periode.getText()+"' and kode_lokasi='"+this.cb_lokasi.getText()+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_tarif.setText(floatToNilai(line.tarif));		
						setTipeButton(tbUbahHapus);					
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
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_tpkk.setText(this.sg1.cells(0,row));					
							
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan ("+ this.cb_tpkk.getText()+")");							
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
		var strSQL = "select a.kode_tpkk, a.nama,isnull(b.tarif,0) as tarif from yk_tpkk a left join yk_tpkk_tarif b on a.kode_tpkk=b.kode_tpkk and a.kode_lokasi=b.kode_lokasi  and b.periode='"+this.c_periode.getText()+"' "+
					 "where  a.kode_lokasi = '"+this.cb_lokasi.getText()+"'";
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
			this.sg1.appendData([line.kode_tpkk,line.nama,floatToNilai(line.tarif)]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
