window.app_saku3_transaksi_siaga_hris_karyawan_fSkala = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fSkala.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fSkala";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Skala Tunjangan Prestasi dan Insentif", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,9,1000,450], childPage:["Daftar Skala Penilaian","Data Skala Penilaian"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode","Kategori","Jenis Jabatan","Skala Min.","Skala Max."],
					colWidth:[[4,3,2,1,0],[80,80,100,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Kode Skala",maxLength:10,multiSelection:false,change:[this,"doChange"],tag:0});
		this.c_jenis = new saiCB(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Jenis Jab",readOnly:true,items:["MGR","NON"],tag:1,change:[this,"doChange"]}); 
		this.cb_kategori = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Kategori", multiSelection:false, maxLength:10,tag:1});		
		this.e_min = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Nilai Min", tipeText:ttNilai, maxLength:10, text:"0",tag:1});		
		this.e_max = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Nilai Maks", tipeText:ttNilai, maxLength:10, text:"0",tag:1});		
		

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
			
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.doLoad();		
			this.cb_kategori.setSQL("select kode_kategori, nama from gr_kategori where kode_lokasi='"+this.app._lokasi+"' ",["kode_kategori","nama"],false,["Kode","Nama"],"and","Data Kategori",true);
			this.cb_kode.setSQL("select kode_skala, kode_kategori from gr_skala where kode_lokasi='"+this.app._lokasi+"' ",["kode_skala","kode_kategori"],false,["Kode","Nama"],"and","Data Skala",false);
	
		}catch(e){
			systemAPI.alert(e);
		}
	}
};

window.app_saku3_transaksi_siaga_hris_karyawan_fSkala.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fSkala.implement({
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
					sql.add("insert into gr_skala(kode_skala,kode_kategori,jml_min,jml_max,kode_lokasi,jenis) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kategori.getText()+"',"+parseNilai(this.e_min.getText())+","+parseNilai(this.e_max.getText())+",'"+this.app._lokasi+"','"+this.c_jenis.getText()+"')");
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
					sql.add("delete from gr_skala where jenis = '"+this.c_jenis.getText()+"' and kode_skala = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into gr_skala(kode_skala,kode_kategori,jml_min,jml_max,kode_lokasi,jenis) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.cb_kategori.getText()+"',"+parseNilai(this.e_min.getText())+","+parseNilai(this.e_max.getText())+",'"+this.app._lokasi+"','"+this.c_jenis.getText()+"')");
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
					sql.add("delete from gr_skala where jenis = '"+this.c_jenis.getText()+"' and kode_skala = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
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
			if (this.cb_kode.getText() != "" && this.c_jenis.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.kode_kategori,b.nama,a.jml_min,a.jml_max,a.jenis "+
				           " from gr_skala a inner join gr_kategori b on a.kode_kategori=b.kode_kategori and a.kode_lokasi=b.kode_lokasi "+
						   " where a.jenis = '"+this.c_jenis.getText()+"' and a.kode_skala ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.cb_kategori.setText(line.kode_kategori);
						this.e_min.setText(floatToNilai(line.jml_min));
						this.e_max.setText(floatToNilai(line.jml_max));
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
		var strSQL = "select a.kode_skala,a.kode_kategori+' | '+b.nama as kategori,a.jenis,a.jml_min,a.jml_max from gr_skala a inner join gr_kategori b on a.kode_kategori=b.kode_kategori order by a.kode_skala";		
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
			this.sg1.appendData([line.kode_skala,line.kategori,line.jenis,line.jml_min,line.jml_max]); 
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