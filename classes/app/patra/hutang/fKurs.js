window.app_patra_hutang_fKurs = function(owner)
{
	if (owner)
	{
		window.app_patra_hutang_fKurs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_patra_hutang_fKurs";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kurs", 0);	
		
		uses("saiCB;saiCBBL;datePicker;saiEdit");
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tgl Awal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doChange"]}); 
		this.l_tgl2 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tgl Akhir", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doChange"]}); 		
		this.c_curr = new saiCB(this,{bound:[20,20,150,20],caption:"Mt Uang - Kurs",readOnly:true,tag:2,change:[this,"doChange"]});
		this.e_kurs = new saiLabelEdit(this,{bound:[180,20,50,20],caption:"Kurs", tag:1, labelWidth:0, tipeText:ttNilai, text:"0"});				
		this.bTampil = new button(this,{bound:[460,20,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		
		this.p1 = new panel(this,{bound:[20,23,520,430],caption:"Data Kurs"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:3,tag:9,
		            colTitle:["Tgl Awal","Tgl Akhir","Kurs"],
					colWidth:[[2,1,0],[100,100,100]],					
					readOnly:true,					
					colFormat:[[2],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});						
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr where kode_curr<>'IDR'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("USD");
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_patra_hutang_fKurs.extend(window.childForm);
window.app_patra_hutang_fKurs.implement({
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
			var strSQL = "select convert(varchar,tgl_awal,103)+' - '+convert(varchar,tgl_akhir,103) as tgl from gr_kurs where kode_curr ='"+this.c_curr.getText()+"' and (('"+this.dp_d1.getDateString()+"' between tgl_awal and tgl_akhir) or ('"+this.dp_d2.getDateString()+"' between tgl_awal and tgl_akhir)) ";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																		
					system.alert(this,"Transaksi tidak valid.","Tgl Awal dan Akhir sudah ada dalam range tanggal lainnya ("+line.tgl+").");
					return false;						
				}					
			}
				
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_kurs(kode_curr,kode_lokasi,tgl_awal,tgl_akhir,kurs) values "+
						    "('"+this.c_curr.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"',"+parseNilai(this.e_kurs.getText())+")");
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
					sql.add("update gr_kurs set kurs="+parseNilai(this.e_kurs.getText())+" "+
					        "where tgl_awal='"+this.dp_d1.getDateString()+"' and tgl_akhir ='"+this.dp_d2.getDateString()+"' and kode_curr = '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					sql.add("delete from gr_kurs where tgl_awal='"+this.dp_d1.getDateString()+"' and tgl_akhir ='"+this.dp_d2.getDateString()+"' and kode_curr = '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.c_curr);
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
	doTampil: function(sender){
		var data = this.dbLib.getDataProvider("select convert(varchar,tgl_awal,103) as awal,convert(varchar,tgl_akhir,103) as akhir,kurs "+
					"from gr_kurs "+
					"where kode_curr= '"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by tgl_awal",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			this.sg.clear();
			for (var i in data.rs.rows){
				line = data.rs.rows[i];							
				this.sg.appendData([line.awal,line.akhir,floatToNilai(line.kurs)]);
			}
		} else this.sg.clear(1);			
	},
	doChange: function(sender){
		try{			
			if (this.c_curr.getText() != ""){
				var strSQL = "select kurs from gr_kurs where tgl_awal='"+this.dp_d1.getDateString()+"' and tgl_akhir ='"+this.dp_d2.getDateString()+"' and kode_curr ='"+this.c_curr.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){																		
						this.e_kurs.setText(floatToNilai(line.kurs));						
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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