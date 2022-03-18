window.app_saku2_master_sppd_fStsTrans = function(owner)
{
	if (owner)
	{
		window.app_saku2_master_sppd_fStsTrans.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_master_sppd_fStsTrans";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transport", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.cb_kode = new saiCBBL(this,{bound:[20,10,200,20],caption:"Kode",maxLength:10,btnClick:[this,"doBtnClick"],rightLabelVisible:false,change:[this,"doChange"]});
		this.cb_jenis = new saiCBBL(this,{bound:[20,11,200,20],caption:"Jenis Angkutan",maxLength:10,multiSelection:false});
		this.e_asal = new saiLabelEdit(this,{bound:[20,12,400,20],caption:"Asal", maxLength:50});
		this.e_tujuan = new saiLabelEdit(this,{bound:[20,13,400,20],caption:"Tujuan", maxLength:50});
		this.e_nilai = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Tarif", text:"0",tipeText:ttNilai, maxLength:100});
		this.c_status = new saiCB(this,{bound:[20,10,200,20],caption:"Status Aktif",items:["1","0"], readOnly:true,tag:2});
		
		this.bTampil = new button(this,{bound:[579,10,80,18],caption:"Lihat Data",click:[this,"doTampilClick"]});				
		this.p1 = new panel(this,{bound:[10,23,650,433],caption:"Daftar Transport"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,
		            colTitle: ["Kode","Asal","Tujuan","Jenis","Tarif"],
					colWidth:[[4,3,2,1,0],[100,80,165,165,80]], readOnly:true,					
					colFormat:[[4],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_jenis.setSQL("select kode_jenis, nama from yk_spj_jenis ",["kode_jenis","nama"],false,["Kode","Nama"],"where","Data Jenis PD",false);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_master_sppd_fStsTrans.extend(window.childForm);
window.app_saku2_master_sppd_fStsTrans.implement({
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
					sql.add("insert into yk_spj_trans(kode_trans,asal,tujuan,kode_jenis,nilai,flag_aktif) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.e_asal.getText()+"','"+this.e_tujuan.getText()+"','"+this.cb_jenis.getText()+"',"+parseNilai(this.e_nilai.getText())+",'"+this.c_status.getText()+"')");
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
					sql.add("update yk_spj_trans set asal = '"+this.e_asal.getText()+"',tujuan='"+this.e_tujuan.getText()+"',kode_jenis='"+this.cb_jenis.getText()+"',nilai="+parseNilai(this.e_nilai.getText())+",flag_aktif='"+this.c_status.getText()+"' where kode_trans= '"+this.cb_kode.getText()+"'");
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
					sql.add("delete from yk_spj_trans where kode_trans = '"+this.cb_kode.getText()+"'");			
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
											  "select kode_trans,kode_jenis,asal,tujuan  from yk_spj_trans where flag_aktif='1'",
											  "select count(kode_trans)  from yk_spj_trans where flag_aktif='1' ",
											  ["kode_trans","kode_jenis","asal","tujuan"],"and",["Kode","Jenis","Asal","Tujuan"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChange: function(sender){		
		try{
			if (sender == this.cb_kode) {
				if (this.cb_kode.getText() != ""){
					var data = this.dbLib.getDataProvider("select a.asal,a.tujuan,a.kode_jenis,a.nilai,b.nama as nama_jenis,a.flag_aktif "+
							   " from yk_spj_trans a inner join yk_spj_jenis b on a.kode_jenis=b.kode_jenis where a.kode_trans='"+this.cb_kode.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.e_asal.setText(line.asal);
							this.e_tujuan.setText(line.tujuan);
							this.cb_jenis.setText(line.kode_jenis,line.nama_jenis);
							this.e_nilai.setText(floatToNilai(line.nilai));
							this.c_status.setText(line.flag_aktif);
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilClick: function(sender){
		try{						
			var data = this.dbLib.getDataProvider("select kode_trans,asal,tujuan,kode_jenis,nilai from yk_spj_trans where flag_aktif='1' order by kode_trans",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doTampilData: function(page) {
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_trans,line.asal,line.tujuan,line.kode_jenis,floatToNilai(line.nilai)]);
		}
		this.sg.setNoUrut(start);
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