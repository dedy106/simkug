window.app_saku3_transaksi_rtrw_versi2_fRumah2 = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_versi2_fRumah2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_versi2_fRumah2";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Rumah", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Rumah","Daftar Rumah","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:3,tag:9,
		            colTitle:["No Rumah","Alamat","RT"],
					colWidth:[[2,1,0],[100,300,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		

		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Rumah",maxLength:10,change:[this,"doChange"]});		
		this.e_id = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,120,20],caption:"ID Rumah", maxLength:10, tag:1, tipeText:ttNilai, text:"0"});				
		this.cb_milik = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Pemilik", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});				
		this.cb_kk = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"Kepala Keluarga", multiSelection:false, maxLength:10, tag:2});				
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,22,200,20],caption:"Status Huni",items:["PEMILIK","KONTRAK","MHS"], readOnly:true,tag:2});	

		this.cb_pp = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,220,20],caption:"RT", multiSelection:false, maxLength:10, tag:2});				
		this.e_alamat = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"Alamat", maxLength:200, tag:1});								

		this.e_tel = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,350,20],caption:"No Telpon", maxLength:50, tag:1});							
		this.e_tel2 = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,350,20],caption:"Emergency Call", maxLength:100, tag:1});							
		this.e_pbb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,350,20],caption:"No PBB", maxLength:200, tag:1});						
		this.e_pln = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,350,20],caption:"No Meter PLN", maxLength:200, tag:1});						
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"No Rumah",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Alamat",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.cb_pp.setSQL("select kode_pp,nama from pp where kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_milik.setSQL("select nik,nama from rt_warga ",["nik","nama"],false,["N I K","Nama"],"where","Data Warga",true);
			this.cb_kk.setSQL("select nik,nama from rt_warga ",["nik","nama"],false,["N I K","Nama"],"where","Data Warga",true);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_versi2_fRumah2.extend(window.childForm);
window.app_saku3_transaksi_rtrw_versi2_fRumah2.implement({
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
					sql.add("insert into rt_rumah(kode_rumah,kode_lokasi,alamat,no_tel,rt,rw,status_huni,kode_pemilik,kode_penghuni,nu,keterangan,pbb,pln,emerg_call) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.cb_milik.getText()+"','"+this.cb_kk.getText()+"',"+nilaiToFloat(this.e_id.getText())+",'-','"+this.e_pbb.getText()+"','"+this.e_pln.getText()+"','"+this.e_tel2.getText()+"')");
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
					sql.add("delete from rt_rumah where kode_rumah='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("insert into rt_rumah(kode_rumah,kode_lokasi,alamat,no_tel,rt,rw,status_huni,kode_pemilik,kode_penghuni,nu,keterangan,pbb,pln,emerg_call) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.e_alamat.getText()+"','"+this.e_tel.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.c_status.getText()+"','"+this.cb_milik.getText()+"','"+this.cb_kk.getText()+"',"+nilaiToFloat(this.e_id.getText())+",'-','"+this.e_pbb.getText()+"','"+this.e_pln.getText()+"','"+this.e_tel2.getText()+"')");
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
					sql.add("delete from rt_rumah where kode_rumah='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
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
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select * from rt_rumah where kode_rumah='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){				
						this.e_alamat.setText(line.alamat);	
						this.e_tel.setText(line.no_tel);	
						this.e_pbb.setText(line.pbb);	
						this.e_pln.setText(line.pln);	
						this.c_status.setText(line.status_huni);
						this.e_id.setText(line.nu);
						this.cb_milik.setText(line.kode_pemilik);
						this.cb_kk.setText(line.kode_penghuni);
						this.cb_pp.setText(line.rt);
						this.e_tel2.setText(line.emerg_call);
							
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
			    this.standarLib.showListData(this, "Daftar Rumah",sender,undefined, 
											  "select kode_rumah, alamat  from rt_rumah where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_rumah) from rt_rumah where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_rumah","alamat"],"and",["kode_rumah","Alamat"],false);				
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
			if (this.e_kode2.getText() != "") var filter = " a.kode_rumah like '%"+this.e_kode2.getText()+"%' and ";
			else var filter = " a.alamat like '%"+this.e_nama2.getText()+"%' and ";
			
			var strSQL = "select a.kode_rumah,a.alamat,a.rt "+
						 "from rt_rumah a "+					 
						 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rumah";				
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
			var strSQL = "select a.kode_rumah,a.alamat,a.rt "+
						 "from rt_rumah a "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_rumah";				
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
		var fikode_rumahh = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<fikode_rumahh;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.kode_rumah,line.alamat,line.rt]); 
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
				this.e_alamat.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}
});