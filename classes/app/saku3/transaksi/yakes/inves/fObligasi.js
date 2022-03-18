window.app_saku3_transaksi_yakes_inves_fObligasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fObligasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fObligasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Seri Obligasi", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.pc2 = new pageControl(this,{bound:[10,10,1000,450], childPage:["List Seri","Data Seri","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:9,
		            colTitle:["Kode","Nama","Emiten","Pilih"],
					colWidth:[[3,2,1,0],[70,200,400,100]],
					readOnly:true, readOnly:true, autoPaging:true, rowPerPage:20,
					colFormat:[[3],[cfButton]],
					click:[this,"doSgBtnClick3"], colAlign:[[3],[alCenter]],													 
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"No Seri",maxLength:20,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,11,500,20],caption:"Nama Seri", maxLength:200, tag:1});			
		this.e_isin = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"ISIN", maxLength:50, tag:1});			
		this.cb_obligor = new saiCBBL(this.pc2.childPage[1],{bound:[20,12,220,20],caption:"Emiten", multiSelection:false, maxLength:10, tag:2});
		this.cb_rating = new saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Rating", multiSelection:false, maxLength:50, tag:2});
		this.e_persen = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,15,200,20],caption:"% Kupon", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});
		this.l_tgl1 = new portalui_label(this.pc2.childPage[1],{bound:[20,11,100,18],caption:"Issue Date", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,11,98,18]}); 
		this.l_tgl2 = new portalui_label(this.pc2.childPage[1],{bound:[20,12,100,18],caption:"Maturity Date", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc2.childPage[1],{bound:[120,12,98,18]}); 
			
		this.e_nama2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,11,400,20],caption:"by Nama Seri", maxLength:100, tag:9});	
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,15,98,18],caption:"Cari",click:[this,"doCari"]});			

		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);		
		this.pc2.childPage[2].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			
			this.stsSimpan = 1;						
			this.standarLib = new util_standar();
	
			this.cb_obligor.setSQL("select kode_obligor, nama from inv_obligor ",["kode_obligor","nama"],false,["Kode","Nama"],"where","Daftar Emiten",true);			
			this.cb_rating.setSQL("select kode_rating, nama from inv_obli_rating ",["kode_rating","nama"],false,["Kode","Nama"],"where","Daftar Rating",true);			

			this.doLoad3();			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fObligasi.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fObligasi.implement({			
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
					sql.add("insert into inv_oblijenis(kode_jenis,nama,kode_obligor,kode_rating,persen,isin,tgl_mulai,tgl_selesai) values "+
						    "('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_obligor.getText()+"','"+this.cb_rating.getText()+"',"+nilaiToFloat(this.e_persen.getText())+",'"+this.e_isin.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"')");	
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
					sql.add("delete from inv_oblijenis where kode_jenis='"+this.cb_kode.getText()+"'");			
					sql.add("insert into inv_oblijenis(kode_jenis,nama,kode_obligor,kode_rating,persen,isin,tgl_mulai,tgl_selesai) values "+
							"('"+this.cb_kode.getText()+"','"+this.e_nama.getText()+"','"+this.cb_obligor.getText()+"','"+this.cb_rating.getText()+"',"+nilaiToFloat(this.e_persen.getText())+",'"+this.e_isin.getText()+"','"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"')");	
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
				var sql = new server_util_arrayList();
				sql.add("delete from inv_oblijenis where kode_jenis='"+this.cb_kode.getText()+"'");			
				setTipeButton(tbAllFalse);
				this.dbLib.execArraySQL(sql);
				break;				
		}
	},	
	doCari:function(sender){														
		var strSQL = "select a.kode_jenis,a.nama,b.nama as emiten from inv_oblijenis a inner join inv_obligor b on a.kode_obligor=b.kode_obligor where a.nama like '%"+this.e_nama2.getText()+"%' order by b.nama,a.kode_jenis";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){			
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();	
			this.doTampilData3(1);		
			this.pc2.setActivePage(this.pc2.childPage[0]);																			
		} else this.sg3.clear(1);			
	},
	doLoad3:function(sender){														
		var strSQL = "select a.kode_jenis,a.nama,b.nama as emiten from inv_oblijenis a inner join inv_obligor b on a.kode_obligor=b.kode_obligor order by b.nama,a.kode_jenis";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){			
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();	
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
			this.sg3.appendData([line.kode_jenis,line.nama,line.emiten.toUpperCase(),"Pilih"]); 
		}
		this.sg3.setNoUrut(start);	
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},	
	doSgBtnClick3: function(sender, col, row){
		try{
			if (col == 3) this.doDoubleClick3(this.sg3,0,row); 				
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick3: function(sender, col , row) {
		try{
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
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select * from inv_oblijenis where kode_jenis ='"+this.cb_kode.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);												
						this.e_isin.setText(line.isin);												
						this.cb_obligor.setText(line.kode_obligor);												
						this.cb_rating.setText(line.kode_rating);									
						this.e_persen.setText(floatToNilai(line.persen));	
						this.dp_d1.setText(line.tgl_mulai);																				
						this.dp_d2.setText(line.tgl_selesai);																										
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
						if (result.toLowerCase().search("error") == -1)	{											
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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

