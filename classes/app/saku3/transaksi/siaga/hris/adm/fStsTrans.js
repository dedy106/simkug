window.app_saku3_transaksi_siaga_hris_adm_fStsTrans = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_adm_fStsTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_adm_fStsTrans";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transport", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.cb_filter = new saiCBBL(this,{bound:[20,11,220,20],caption:"Action Type",maxLength:10,multiSelection:false,tag:3,change:[this,"doLoad"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["List Tarif Transportasi","Data Tarif Transportasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Jenis Angkutan","Asal","Tujuan","Tarif"],
					colWidth:[[4,3,2,1,0],[80,250,250,100,100]],
					colFormat:[[4],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});
		this.cb_jenis = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Jenis Angkutan",maxLength:10,multiSelection:false});
		this.e_asal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,400,20],caption:"Asal", maxLength:50});
		this.e_tujuan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,400,20],caption:"Tujuan", maxLength:50});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Tarif", text:"0",tipeText:ttNilai, maxLength:100});
       	this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Status",items:["1 AKTIF","0 NONAKTIF"], readOnly:true,tag:2});
		
		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 23);					
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_filter.setSQL("select kode_jenis, nama from gr_spj_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data ActionType",false);

			this.cb_jenis.setSQL("select kode_jenis, nama from gr_spj_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",false);

			// this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_adm_fStsTrans.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_adm_fStsTrans.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var fAktif = this.c_status.getText().substr(0,1);
					sql.add("insert into gr_spj_trans(kode_trans,asal,tujuan,kode_jenis,nilai,kode_lokasi,flag_aktif) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"','"+fAktif+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var fAktif = this.c_status.getText().substr(0,1);
					sql.add("delete from gr_spj_trans where kode_trans = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into gr_spj_trans(kode_trans,asal,tujuan,kode_jenis,nilai,kode_lokasi,flag_aktif) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"','"+fAktif+"')");
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_spj_trans where kode_trans = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
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
				var data = this.dbLib.getDataProvider("select asal,tujuan,kode_jenis,nilai,flag_aktif "+
				           " from gr_spj_trans where kode_trans='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_asal.setText(line.asal);
						this.e_tujuan.setText(line.tujuan);
						this.cb_jenis.setText(line.kode_jenis);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.c_status.setText(line.flag_aktif)
						setTipeButton(tbUbahHapus);
					}
					else{
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

	doLoad:function(sender){						
		var strSQL = "select * from gr_spj_trans where kode_jenis='"+this.cb_filter.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by kode_trans";		
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
			this.sg1.appendData([line.kode_trans,line.kode_jenis,line.asal,line.tujuan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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