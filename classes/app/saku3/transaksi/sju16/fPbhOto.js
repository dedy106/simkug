window.app_saku3_transaksi_sju16_fPbhOto = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fPbhOto.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fPbhOto";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Otorisasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Otorisasi","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["Level","NIK","Nama","Jabatan"],
					colWidth:[[3,2,1,0],[200,300,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Level",items:["VPFIN","DIRKUG","DIRUT","MANTS"], readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_nik = new saiCBBL(this.pc1.childPage[1],{bound:[20,16,220,20],caption:"NIK", multiSelection:false, maxLength:10, tag:0,change:[this,"doChange"]});
		this.e_jab = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Jabatan", maxLength:100, tag:1});
		this.c_def = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Default",items:["1-DEFAULT","0-NON"], readOnly:true,tag:2});
		this.e_awal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Range Mulai", maxLength:50, tag:1, tipeText:ttNilai,text:"0"});
		this.e_akhir = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"S/D Nilai", maxLength:50, tag:1, tipeText:ttNilai,text:"0"});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK",true);
			this.doLoad();		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fPbhOto.extend(window.childForm);
window.app_saku3_transaksi_sju16_fPbhOto.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();							
					if (this.c_def.getText().substr(0,1) == "1") {
						sql.add("update sju_oto set flag_def='0' where status='"+this.c_status.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					}			
					sql.add("insert into sju_oto(status,kode_lokasi,nik,jabatan,flag_def,awal,akhir) values "+
							"('"+this.c_status.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.e_jab.getText()+"','"+this.c_def.getText().substr(0,1)+"',"+parseNilai(this.e_awal.getText())+","+parseNilai(this.e_akhir.getText())+")");					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();		
					if (this.c_def.getText().substr(0,1) == "1") {
						sql.add("update sju_oto set flag_def='0' where status='"+this.c_status.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");	
					}			
					sql.add("delete from sju_oto where status = '"+this.c_status.getText()+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into sju_oto(status,kode_lokasi,nik,jabatan,flag_def,awal,akhir) values "+
							"('"+this.c_status.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.e_jab.getText()+"','"+this.c_def.getText().substr(0,1)+"',"+parseNilai(this.e_awal.getText())+","+parseNilai(this.e_akhir.getText())+")");					
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sju_oto where status = '"+this.c_status.getText()+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.c_status);
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
			if (sender == this.c_status || sender == this.cb_nik) {				
				if (this.c_status.getText() != "" && this.cb_nik.getText() != ""){
					var strSQL = "select b.nama,a.jabatan,a.flag_def,a.awal,a.akhir from sju_oto a inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
								 "where a.status ='"+this.c_status.getText()+"' and a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   				
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){											
							this.e_jab.setText(line.jabatan);
							this.e_awal.setText(floatToNilai(line.awal));
							this.e_akhir.setText(floatToNilai(line.akhir));
							if (line.flag_def == "1") this.c_def.setText("1-DEFAULT");																							
							else this.c_def.setText("0-NON");
							setTipeButton(tbUbahHapus);
						}
						else{							
							this.standarLib.clearByTag(this, new Array("1"),undefined);
							setTipeButton(tbSimpan);
						}
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
				this.c_status.setText(this.sg1.cells(0,row));	
				this.cb_nik.setText(this.sg1.cells(1,row));	
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
		var strSQL = "select a.status,a.nik,b.nama,a.jabatan "+
		             "from sju_oto a inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.status,a.nik";		
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
			this.sg1.appendData([line.status,line.nik,line.nama,line.jabatan]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
