window.app_saku3_transaksi_yakes_inves_fKustodi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fKustodi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fKustodi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kustodi", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Kustodi","Data Kustodi"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Pilih"],
					colWidth:[[2,1,0],[70,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[2],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,500,20],caption:"Nama", maxLength:100, tag:1});	
		this.e_pic = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,500,20],caption:"PIC", maxLength:50, tag:1});	
		this.e_up = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,500,20],caption:"UP", maxLength:200, tag:1});	
		this.e_alamat = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,13,500,20],caption:"Alamat", maxLength:200, tag:1});	
		this.e_namarek = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,14,300,20],caption:"Nama Rekening", maxLength:50, tag:1});	
		this.e_norek = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,300,20],caption:"No Rekening", maxLength:50, tag:1});	
		this.e_bank = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,500,20],caption:"Bank", maxLength:100, tag:1});	
				
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
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fKustodi.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fKustodi.implement({
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
					sql.add("insert into inv_kustodi(kode_kustodi,nama,pic,alamat,nama_rek,no_rek,bank,up) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.e_pic.getText()+"','"+this.e_alamat.getText()+"','"+this.e_namarek.getText()+"','"+this.e_norek.getText()+"','"+this.e_bank.getText()+"','"+this.e_up.getText()+"')");					
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
					sql.add("update inv_kustodi "+
							"set nama='"+this.e_nama.getText()+"',pic='"+this.e_pic.getText()+"',alamat='"+this.e_alamat.getText()+"',nama_rek='"+this.e_namarek.getText()+"',no_rek='"+this.e_norek.getText()+"',bank='"+this.e_bank.getText()+"',up='"+this.e_up.getText()+"' "+
							"where kode_kustodi='"+this.cb_kode.getText()+"'");			
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
		}
	},	
	doLoad3:function(sender){														
		var strSQL = "select kode_kustodi,nama from inv_kustodi order by kode_kustodi";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.sg3.clear();
			this.page = 1;
			for (var i=0;i<this.dataJU3.rs.rows.length;i++){
				line = this.dataJU3.rs.rows[i];													
				this.sg3.appendData([line.kode_kustodi,line.nama,"Pilih"]); 
			}			
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.doSelectPage(page);								
		this.page = page;
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 2) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			var baris = ((this.page-1) * 20) + row;
			if (this.sg3.cells(0,baris) != "") {			
				this.pc2.setActivePage(this.pc2.childPage[1]);														
				this.cb_kode.setText(this.sg3.cells(0,baris));	
				this.e_nama.setText(this.sg3.cells(1,baris));																	
			}
		} catch(e) {alert(e);}
	},
	doChange: function(sender){
		try{
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from inv_kustodi where kode_kustodi ='"+this.cb_kode.getText()+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						this.e_pic.setText(line.pic);						
						this.e_alamat.setText(line.alamat);						
						this.e_namarek.setText(line.nama_rek);						
						this.e_norek.setText(line.no_rek);						
						this.e_bank.setText(line.bank);
						this.e_up.setText(line.up);														
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