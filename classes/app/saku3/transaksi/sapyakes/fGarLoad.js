window.app_saku3_transaksi_sapyakes_fGarLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fGarLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fGarLoad";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transfer Data Anggaran", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.e_usersap = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],tag:2,readOnly:true,caption:"User SAP",text:""});
		this.e_pwdsap = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],tag:2,readOnly:true,caption:"Password SAP",text:"",password:true});
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],tag:2,caption:"Tahun",text:"2016"});
		this.c_status = new saiCB(this,{bound:[20,15,200,20],caption:"Status Data",items:["1. RUNNING"], readOnly:true,tag:2});//"0. PPBS",				
		this.i_gen = new portalui_imageButton(this,{bound:[225,15,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});
		
		this.p1 = new panel(this,{bound:[20,23,900,400],caption:"Daftar Budget"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,				
				colTitle:["Kode","Nama","Nilai"],
				colWidth:[[2,1,0],[100,400,80]],
				readOnly:true,	colFormat:[[2],[cfNilai]],					
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select sap_user,sap_pwd from hakakses where nik='"+this.app._userLog+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.e_usersap.setText(line.sap_user);
				this.e_pwdsap.setText(line.sap_pwd);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fGarLoad.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fGarLoad.implement({
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
					
					if (this.c_status.getText().substr(0,1) == "1") 
						var strSQL = "select a.kode_akun,a.kode_pp,a.periode, "+
									 "	  SUM(case a.dc when 'D' then nilai else -nilai end) as nilai "+
									 "from anggaran_d a "+
									 "		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
									 "where a.periode like '"+this.e_tahun.getText()+"%' and a.no_agg ='SAP2016' "+
									 "group by a.kode_akun,a.kode_pp,periode ";
					/*else
						var strSQL = "select a.kode_akun,a.kode_pp,a.periode, "+
									 "	  SUM(nilai) as nilai "+
									 "from agg_d a "+
									 "		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
									 "		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi  "+
									 "where a.periode like '"+this.e_tahun.getText()+"%' "+
									 "group by a.kode_akun,a.kode_pp,a.periode "+
									 "order by a.kode_akun,a.kode_pp,a.periode";*/
					
					var databudget = this.dbLib.getDataProvider(strSQL,true);
					if (typeof databudget == "object" && databudget.rs.rows[0] != undefined){
						var data = databudget.rs.rows;
						this.app.services.transportSAP(data, this.e_tahun.getText(), this.e_usersap.getText(), this.e_pwdsap.getText(), function(data){ alert(data);  });
					}
					
					//di php simpannya	
					//sql.add("insert into sap_budget_m(no_bukti,tahun,tgl_input,user_input,user_sap,tipe,dok_sap) values "+
					//		"('"+this.e_nb.getText()+"','"+this.e_tahun.getText()+"',getdate(),'"+this.app._userLog+"','"+this.e_usersap.getText()+"','"+this.c_status.getText().substr(0,1)+"','-')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_flag);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doLoad: function(sender){
		try{		
			if (this.c_status.getText().substr(0,1) == "1") 
				var strSQL = "select a.kode_neraca,a.nama,a.rowindex,sum(case dc when 'D' then nilai else -nilai end) as gar "+
							 "from neracagar a "+
							 "inner join relakungar b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
							 "inner join anggaran_d c on b.kode_akun=c.kode_akun and c.periode like '"+this.e_tahun.getText()+"%'  and c.no_agg ='SAP2016' "+
							 "where a.kode_lokasi = '00' "+
							 "group by a.kode_neraca,a.nama,a.rowindex "+
							 "order by a.rowindex ";
			/*
			else 
				var strSQL = "select a.kode_neraca,a.nama,a.rowindex,sum(nilai) as gar "+
							 "from neracagar a "+ 
							 "inner join relakungar b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs "+
							 "inner join agg_d c on b.kode_akun=c.kode_akun and c.periode like '"+this.e_tahun.getText()+"%' "+
							 "where a.kode_lokasi = '00' "+
						 	 "group by a.kode_neraca,a.nama,a.rowindex "+
							 "order by a.rowindex";*/
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_neraca,line.nama,floatToNilai(line.gar)]);
				}
			} else this.sg.clear(1);										
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
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