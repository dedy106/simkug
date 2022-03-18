window.app_saku3_transaksi_yakes21_inves_fBankCabang = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_inves_fBankCabang.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_inves_fBankCabang";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Bank Cabang", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["List Bank","Data Bank"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:5,tag:9,
		            colTitle:["Kode","Nama","Alamat","Kode Bank","Pilih"],
					colWidth:[[4,3,2,1,0],[70,80,350,300,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[4],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[4],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:100, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,400,20],caption:"Alamat", maxLength:150, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,400,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,400,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		this.e_fax = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,400,20],caption:"No Fax", maxLength:50, tag:1});					
		this.e_jml = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"Basis [Hari]", tag:2, tipeText:ttNilai, text:"360"});
		this.cb_klp = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Bank", multiSelection:false, maxLength:10, tag:2});				
		this.cb_rek = new saiCBBL(this.pc2.childPage[1],{bound:[20,21,220,20],caption:"Kode Rek", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_akun = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,200,20],caption:"Kode Akun", tag:2, readOnly:true});					
		this.cb_kelola = new saiCBBL(this.pc2.childPage[1],{bound:[20,21,220,20],caption:"Pengelola", multiSelection:false, maxLength:10, tag:2});
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,20,200,20],caption:"Default B Sumber",items:["0. TIDAK","1. YA"], readOnly:true,tag:2});				
		this.c_bdepo = new saiCB(this.pc2.childPage[1],{bound:[20,21,200,20],caption:"Bank Deposito",items:["0. TIDAK","1. YA"], readOnly:true,tag:2});				
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
				
			this.doLoad3();
			
			this.cb_rek.setSQL("select kode_rek, nama from bank_rek union select '-','-' ",["kode_rek","nama"],false,["Kode","Nama"],"where","Data Rekening Bank",true);			
			this.cb_klp.setSQL("select kode_bankklp, nama from inv_bankklp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_bankklp","nama"],false,["Kode","Nama"],"where","Data Bank",true);			
			this.cb_kelola.setSQL("select kode_kelola, nama from inv_kelola",["kode_kelola","nama"],false,["Kode","Nama"],"where","Daftar Pengelola",true);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_inves_fBankCabang.extend(window.childForm);
window.app_saku3_transaksi_yakes21_inves_fBankCabang.implement({
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
					
					if (this.c_status.getText().substr(0,1) == "1") sql.add("update inv_bank set flag_default='0' where kode_kelola='"+this.cb_kelola.getText()+"' and kode_bankklp='"+this.cb_klp.getText()+"' ");					
					if (this.c_bdepo.getText().substr(0,1) == "1") sql.add("update inv_bank set flag_bdepo='0' where kode_kelola='"+this.cb_kelola.getText()+"' and kode_bankklp='"+this.cb_klp.getText()+"' ");					
					
					
					var vStatus = this.c_status.getText().substr(0,1);	
									
					sql.add("insert into inv_bank(kode_bank,nama,alamat,kode_bankklp,jml_hari,p_bunga,kode_akun,no_rek,nama_rek,kode_rek,no_fax,flag_default,kode_kelola,flag_bdepo) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_klp.getText()+"',"+parseNilai(this.e_jml.getText())+",0,'"+this.e_akun.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_rek.getText()+"','"+this.e_fax.getText()+"','"+vStatus+"','"+this.cb_kelola.getText()+"','"+this.c_bdepo.getText().substr(0,1)+"')");
					
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
					sql.add("update inv_bank set flag_default='0' where kode_kelola='"+this.cb_klp.getText()+"'");					
					var vStatus = this.c_status.getText().substr(0,1);					
					
					
					if (this.c_status.getText().substr(0,1) == "1") sql.add("update inv_bank set flag_default='0' where kode_kelola='"+this.cb_kelola.getText()+"' and kode_bankklp='"+this.cb_klp.getText()+"'");					
					if (this.c_bdepo.getText().substr(0,1) == "1") sql.add("update inv_bank set flag_bdepo='0' where kode_kelola='"+this.cb_kelola.getText()+"' and kode_bankklp='"+this.cb_klp.getText()+"'");					
					
					
					sql.add("delete from inv_bank where kode_bank='"+this.cb_kode.getText()+"'");
					sql.add("insert into inv_bank(kode_bank,nama,alamat,kode_bankklp,jml_hari,p_bunga,kode_akun,no_rek,nama_rek,kode_rek,no_fax,flag_default,kode_kelola,flag_bdepo) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.cb_klp.getText()+"',"+parseNilai(this.e_jml.getText())+",0,'"+this.e_akun.getText()+"','"+this.e_norek.getText()+"','"+this.e_namarek.getText()+"','"+this.cb_rek.getText()+"','"+this.e_fax.getText()+"','"+vStatus+"','"+this.cb_kelola.getText()+"','"+this.c_bdepo.getText().substr(0,1)+"')");
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
					this.doLoad3();
					this.pc2.setActivePage(this.pc2.childPage[0]);														
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "ubah" :	
				this.ubah();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_bank,nama,alamat,kode_bankklp from inv_bank order by kode_bank";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();			
			this.sg3.clear();
			this.doTampilData3(1);			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_bank,line.nama,line.alamat,line.kode_bankklp,"Pilih"]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 4) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			//var baris = ((this.page-1) * 20) + row;
			//alert(row);
			var baris = row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));								
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_rek && this.cb_rek.getText() != ""){
				var data = this.dbLib.getDataProvider("select kode_akun from bank_rek where kode_rek ='"+this.cb_rek.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_akun.setText(line.kode_akun);
					}					
				}
			}
		
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select * from inv_bank where kode_bank ='"+this.cb_kode.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.e_alamat.setText(line.alamat);
						this.e_norek.setText(line.no_rek);
						this.e_namarek.setText(line.nama_rek);
						this.e_fax.setText(line.no_fax);
						this.e_jml.setText(floatToNilai(line.jml_hari));
						this.cb_klp.setText(line.kode_bankklp);
						this.cb_rek.setText(line.kode_rek);						
						this.cb_kelola.setText(line.kode_kelola);						
						if (line.flag_default == "0") this.c_status.setText("0. TIDAK");
						else this.c_status.setText("1. YA");
						
						if (line.flag_bdepo == "0") this.c_bdepo.setText("0. TIDAK");
						else this.c_bdepo.setText("1. YA");
						
						setTipeButton(tbUbah);
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