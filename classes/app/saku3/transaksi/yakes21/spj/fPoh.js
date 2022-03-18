window.app_saku3_transaksi_yakes21_spj_fPoh = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_spj_fPoh.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_spj_fPoh";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Setting POH", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");		
		this.cb_nik = new saiCBBL(this,{bound:[20,11,220,20],caption:"NIK", multiSelection:false, maxLength:10, tag:1,change:[this,"doLoad"]});		
		this.cb_nik2 = new saiCBBL(this,{bound:[20,12,220,20],caption:"NIK POH", multiSelection:false, maxLength:10, tag:1});		
		this.cb_nik3 = new saiCBBL(this,{bound:[20,13,220,20],caption:"NIK Login", multiSelection:false, maxLength:10, tag:1});		
		
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});		
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,98,18]});	
			
		this.p1 = new panel(this,{bound:[20,23,600,300],caption:"Daftar Historis"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:4,tag:9,
				colTitle:["Tgl Mulai","Tgl Selesai","NIK POH","NIK Login"],
				colWidth:[[3,2,1,0],[80,80,80,80]],								
				readOnly:true,
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		this.dataAkun = this.app._masakun;
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_nik.setSQL("select nik, nama from karyawan where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);
			this.cb_nik2.setSQL("select nik, nama from karyawan where  flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);
			this.cb_nik3.setSQL("select nik, nama from karyawan where  flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"where","Data Karyawan",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_spj_fPoh.extend(window.childForm);
window.app_saku3_transaksi_yakes21_spj_fPoh.implement({
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
					var nb = this.standarLib.noBuktiOtomatis(this.dbLib,"pdss_poh_nik","no_bukti",this.cb_nik.getText()+".","0000");															
					sql.add("update pdss_poh_nik set flag_aktif='0' where nik = '"+this.cb_nik.getText()+"'");					
					
					sql.add("insert into pdss_poh_nik (no_bukti,nik,nik2,nik_log,tgl_awal,tgl_akhir,flag_aktif) values "+
							"('"+nb+"','"+this.cb_nik.getText()+"','"+this.cb_nik2.getText()+"','"+this.cb_nik3.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','1')");
													
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
	doSelectDate: function(sender, y,m,d){
		this.doLoad();
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) 
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_nik);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
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
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doLoad : function(){
		try {
			if (this.cb_nik.getText() != "") {
				var strSQL = "select convert(varchar,tgl_awal,103) as tgl1,convert(varchar,tgl_akhir,103) as tgl2,nik2,nik_log  "+
				             "from pdss_poh_nik where nik='"+this.cb_nik.getText()+"' order by tgl_awal desc ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.tgl1,line.tgl2,line.nik2,line.nik_log]);
					}
				} else this.sg.clear(1);									
			}
		}
		catch(e) {
			alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (NIK : "+ this.cb_nik.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});


