window.app_hris_master_adm_fStsTrans = function(owner)
{
	if (owner)
	{
		window.app_hris_master_adm_fStsTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_master_adm_fStsTrans";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transport", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_jenis = new saiCBBL(this,{bound:[20,11,200,20],caption:"Jenis Angkutan",maxLength:10,multiSelection:false});
		this.e_asal = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Asal", maxLength:50});
		this.e_tujuan = new saiLabelEdit(this,{bound:[20,13,400,20],caption:"Tujuan", maxLength:50});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Tarif", text:"0",tipeText:ttNilai, maxLength:100});
		
		this.bTampil = new button(this,{bound:[529,14,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});			
		
		this.p1 = new panel(this,{bound:[10,23,600,433],caption:"Daftar Transport"});
		this.sg1 = new saiGrid(this.p1,{bound:[0,20,595,380],tag:9,readOnly:true,colTitle: ["Kode","Asal","Tujuan","Jenis","Tarif"]});		
		this.sgn = new sgNavigator(this.p1,{bound:[0,408,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_jenis.setSQL("select kode_jenis, nama from gr_spj_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Status Cuti",false);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_master_adm_fStsTrans.extend(window.childForm);
window.app_hris_master_adm_fStsTrans.implement({
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
					sql.add("insert into gr_spj_trans(kode_trans,asal,tujuan,kode_jenis,nilai,kode_lokasi) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.app._lokasi+"')");
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
					sql.add("update gr_spj_trans set asal = '"+this.e_asal.getText()+"',tujuan='"+this.e_tujuan.getText()+"',kode_jenis='"+this.cb_jenis.getText()+"',nilai="+parseNilai(this.e_nilai.getText())+" where kode_trans= '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
	doBtnClick: function(sender, event){
		try{
			if (sender == this.cb_kode) {   
			    this.standarLib.showListData(this, "Daftar Transportasi",sender,undefined, 
											  "select kode_trans,kode_jenis,asal,tujuan  from gr_spj_trans where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_trans)  from gr_spj_trans where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_trans","kode_jenis","asal","tujuan"],"and",["Kode","Jenis","Asal","Tujuan"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select asal,tujuan,kode_jenis,nilai "+
				           " from gr_spj_trans where kode_trans='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_asal.setText(line.asal);
						this.e_tujuan.setText(line.tujuan);
						this.cb_jenis.setText(line.kode_jenis);
						this.e_nilai.setText(floatToNilai(line.nilai));
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
	doTampilClick: function(sender){
		try{			
			var temp = this.dbLib.runSQL("select kode_trans,asal,tujuan,kode_jenis,nilai from gr_spj_trans where kode_lokasi='"+this.app._lokasi+"' order by kode_trans");
			if (temp instanceof arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
		}catch(e){
			systemAPI.alert(e);
		}
	},

	doPager: function(sender, page) {
		this.sg1.selectPage(page);
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