window.app_saku3_transaksi_sapyakes_panjar_fNikPj = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_panjar_fNikPj.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_panjar_fNikPj";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pemegang Panjar", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");	
		this.cb_lokasi = new saiCBBL(this,{bound:[20,13,220,20],caption:"Lokasi", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});			
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Pemegang","Data Panjar"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"NIK",tag:0,multiSelection:false,change:[this,"doChange"]});				
		this.e_jum = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Jumlah Panjar", tag:1, tipeText:ttNilai, text:"0"});
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,26,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});
		
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

			if (this.app._userStatus == "A")
				this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi<>'00' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);
			else this.cb_lokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokasi='"+this.app._lokasi+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Lokasi",true);

			this.cb_lokasi.setText(this.app._lokasi);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_panjar_fNikPj.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_panjar_fNikPj.implement({
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
					sql.add("insert into panjar2_nik(nik,jumlah,nilai_max,flag_aktif) values "+
						    "('"+this.cb_nik.getText()+"',"+nilaiToFloat(this.e_jum.getText())+",0,'"+this.c_status.getText().substr(0,1)+"')");
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
					sql.add("delete from panjar2_nik where nik='"+this.cb_nik.getText()+"' ");
					sql.add("insert into panjar2_nik(nik,jumlah,nilai_max,flag_aktif) values "+
						    "('"+this.cb_nik.getText()+"',"+nilaiToFloat(this.e_jum.getText())+",0,'"+this.c_status.getText().substr(0,1)+"')");
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
					sql.add("delete from panjar2_nik where nik='"+this.cb_nik.getText()+"' ");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					this.doLoad();
				setTipeButton(tbAllFalse);
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
			if (sender == this.cb_lokasi && this.cb_lokasi.getText()!="") {
				this.doLoad();
				this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' ",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);						
			}

			if (sender == this.cb_nik && this.cb_nik.getText() != ""){
				var strSQL = "select * from panjar2_nik where nik ='"+this.cb_nik.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){		
						this.e_jum.setText(floatToNilai(line.jumlah));
						
						if (line.flag_aktif == "1") this.c_status.setText("1. AKTIF"); 
						else this.c_status.setText("0. NONAKTIF"); 
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
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
		if (this.cb_lokasi.getText()!="") {							
			var strSQL = "select a.nik,a.nama "+
						 "from karyawan a inner join panjar2_nik c on a.nik=c.nik "+
					 	 "where a.kode_lokasi='"+this.cb_lokasi.getText()+"' order by a.nik";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
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
			this.sg1.appendData([line.nik,line.nama]); 
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
				this.cb_nik.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	}
});