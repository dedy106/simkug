window.app_saku3_transaksi_produk_fJadwalUjian = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fJadwalUjian.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fJadwalUjian";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Jadwal Ujian", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_ta = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Tahun Ajaran",multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.c_sem = new saiCB(this,{bound:[20,12,200,20],caption:"Semester",items:["GANJIL","GENAP"], readOnly:true,tag:1,change:[this,"doChange"]});
		this.cb_tingkat = new portalui_saiCBBL(this,{bound:[20,13,220,20],caption:"Tingkat",multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.cb_jenis = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"Jenis Ujian",multiSelection:false,tag:1,change:[this,"doChange"]});		

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Jadwal Ujian"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:0,
		            colTitle:["Tanggal","Jam","Kode Matpel","Keterangan"],					
					colWidth:[[3,2,1,0],[250,150,150,150]],					
					columnReadOnly:[true,[3]],								
					buttonStyle:[[0,2],[bsDate,bsEllips]], 
					ellipsClick:[this,"doEllipseClick"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			//this.doLoad();		

			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where kode_lokasi = '"+this.app._lokasi+"' ",["kode_ta","nama"],false,["Kode TA","nama"],"and","Data TA",true);			
			this.cb_tingkat.setSQL("select kode_tingkat, nama from sis_tingkat where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_tingkat","nama"],false,["Kode Tingkat","Nama"],"and","Data Tingkat",true);		
			this.cb_jenis.setSQL("select kode_jenis, nama from sis_jenisnilai where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_jenis","nama"],false,["Kode Jenis","Nama"],"and","Data Jenis",true);		
			
			var strSQL = "select kode_ta from sis_ta where flag_aktif='1' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line3 = data.rs.rows[0];							
				if (line3 != undefined){																			
					this.cb_ta.setText(line3.kode_ta);	
				}
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fJadwalUjian.extend(window.childForm);
window.app_saku3_transaksi_produk_fJadwalUjian.implement({
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
						
						sql.add("delete from sis_jadwal_ujian where kode_ta = '"+this.cb_ta.getText()+"' and kode_sem = '"+this.c_sem.getText()+"' and kode_tingkat = '"+this.cb_tingkat.getText()+"' and kode_jenis = '"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");						
		
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																				
									sql.add("insert into sis_jadwal_ujian(kode_pp,kode_lokasi,kode_ta,kode_sem,kode_tingkat,kode_jenis,tanggal,jam,kode_matpel) values "+
						    				"('"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.cb_ta.getText()+"','"+this.c_sem.getText()+"','"+this.cb_tingkat.getText()+"','"+this.cb_jenis.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"')");
							}
						}						
					}
					
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
					sql.add("delete from sis_jadwal_ujian where kode_ta = '"+this.cb_ta.getText()+"' and kode_sem = '"+this.c_sem.getText()+"' and kode_tingkat = '"+this.cb_tingkat.getText()+"' and kode_jenis = '"+this.cb_jenis.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");						
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbSimpan);
				this.sg.clear(1); 
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :
			case "ubah" :	
				this.simpan();
				break;								
			case "hapus" :	
				this.hapus();
				break;				
		}
	},

	doChange: function(sender){
		try{
			if ((sender == this.cb_ta || this.cb_tingkat || c_sem || cb_jenis) && this.cb_ta.getText()!="" && this.cb_tingkat.getText()!="" && this.c_sem.getText()!="" && this.cb_jenis.getText()!="") {
				setTipeButton(tbUbahHapus);
				var strSQL = "select a.tanggal,a.jam,a.kode_matpel,b.nama from sis_jadwal_ujian a "+
							 "inner join sis_matpel b on a.kode_matpel=b.kode_matpel "+
							 "where a.kode_ta='"+this.cb_ta.getText()+"' and a.kode_sem='"+this.c_sem.getText()+"' and a.kode_tingkat='"+this.cb_tingkat.getText()+"' and a.kode_jenis='"+this.cb_jenis.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";		
				var data = this.dbLib.getDataProvider(strSQL,true);		
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
					this.sgn.rearrange();
					this.doTampilData(1);
					setTipeButton(tbUbahHapus);	
				} else this.sg.clear(1);
			}
		} catch(e) {alert(e);}
	},

	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 2){
				this.standarLib.showListData(this, "Daftar Matpel",sender,undefined, 
											  "select kode_matpel,nama from sis_matpel where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ",
											  "select count(kode_matpel) from sis_matpel where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'  and kode_pp='"+this.app._kodePP+"' ",
											  ["kode_matpel","nama"],"and",["Kode","Nama"],false);				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},

	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.tanggal,line.jam,line.kode_matpel,line.nama]); 
		}
		this.sg.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
