window.app_saku3_transaksi_sapyakes_fGarRelease = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fGarRelease.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fGarRelease";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Release Data Anggaran", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.e_usersap = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],tag:2,caption:"User SAP",text:""});
		this.e_pwdsap = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],tag:2,caption:"Password SAP",text:"",password:true});
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],tag:2,caption:"Tahun",text:"2016"});
		this.c_bulan = new saiCB(this,{bound:[20,15,200,20],caption:"Bulan",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});				
		this.i_gen = new portalui_imageButton(this,{bound:[225,15,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});
		
		this.p1 = new panel(this,{bound:[20,23,900,400],caption:"Daftar Budget"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:9,				
				colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Nilai"],
				colWidth:[[4,3,2,1,0],[100,200,80,200,80]],
				readOnly:true,	colFormat:[[4],[cfNilai]],					
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
window.app_saku3_transaksi_sapyakes_fGarRelease.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fGarRelease.implement({
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
					
					/*
					var strSQL = "select b.kode_akun,c.kode_pp,periode, sum(case a.dc when 'D' then a.nilai else -a.nilai end) as nilai "+
								 "from anggaran_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								 "					inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								 "where a.kode_pp = '12000' and a.periode='"+this.e_tahun.getText()+this.c_bulan.getText()+"'  "+
								 "group by b.kode_akun,c.kode_pp,a.periode ";
					*/
					
					
					var strSQL = "select * from sap_gar_release where kode_akun = '51020119' and kode_pp='992100'";
					
					var databudget = this.dbLib.getDataProvider(strSQL,true);
					if (typeof databudget == "object" && databudget.rs.rows[0] != undefined){
						var data = databudget.rs.rows;
						this.app.services.releaseSAP(data, this.e_tahun.getText(), "yks-func1", "yks2016", function(data){ alert(data);  });
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
			
			var strSQL = "select b.kode_akun,b.nama as nama_akun, c.kode_pp,c.nama as nama_pp, sum(case a.dc when 'D' then a.nilai else -a.nilai end) as gar "+
						 "from anggaran_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "					inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where a.kode_pp ='12000' and a.periode='"+this.e_tahun.getText()+this.c_bulan.getText()+"'  "+
						 "group by b.kode_akun,b.nama,c.kode_pp,c.nama "+
						 "order by b.kode_akun ";
			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,floatToNilai(line.gar)]);
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