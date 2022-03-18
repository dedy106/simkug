window.app_saku3_transaksi_tarbak_fHrPrestasi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrPrestasi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrPrestasi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Prestasi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Prestasi","Data Prestasi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
		            colTitle:["Kode Unit","Nama","Klp SDM","Nama Klp","Prestasi","Prestasi"],
					colWidth:[[4,3,2,1,0],[80,200,100,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_unit = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Unit", multiSelection:false,tag:2,change:[this,"doChange"]});
		this.cb_klp = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,13,220,20],caption:"Kelompok SDM", multiSelection:false,tag:2,change:[this,"doChange"]});
		this.c_prestasi = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Prestasi",items:["A","B","C"], readOnly:true,tag:2,change:[this,"doChange"]});  		
		this.e_persen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,18,200,20],caption:"Persentase", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_kjm = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"KJM/Honor Guru", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_inval = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"Inval", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_hdosen = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Honor Dosen", tag:1, tipeText:ttNilai, text:"0"});						
		this.e_ikat = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Tunj. Pengikat", tag:1, tipeText:ttNilai, text:"0"});						

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_unit.setSQL("select kode_unit,nama from hr_unit where kode_lokasi='"+this.app._lokasi+"'",["kode_unit","nama"],false,["Kode","Nama"],"and","Data Unit",true);	
			this.cb_klp.setSQL("select kode_klp,nama from hr_sdmklp where kode_lokasi='"+this.app._lokasi+"'",["kode_klp","nama"],false,["Kode","Nama"],"and","Data Kelompok",true);	

			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrPrestasi.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrPrestasi.implement({
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
					sql.add("insert into hr_gaji_prestasi(kode_unit,kode_klp,kode_lokasi,prestasi,p_nilai,kjm,inval,h_dosen,pengikat) values "+
							"('"+this.cb_unit.getText()+"','"+this.cb_klp.getText()+"','"+this.app._lokasi+"','"+this.c_prestasi.getText()+"',"+nilaiToFloat(this.e_persen.getText())+","+nilaiToFloat(this.e_kjm.getText())+","+nilaiToFloat(this.e_inval.getText())+","+nilaiToFloat(this.e_hdosen.getText())+","+nilaiToFloat(this.e_ikat.getText())+")");
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
					sql.add("delete from hr_gaji_prestasi where kode_unit='"+this.cb_unit.getText()+"' and kode_klp = '"+this.cb_klp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into hr_gaji_prestasi(kode_unit,kode_klp,kode_lokasi,prestasi,p_nilai,kjm,inval,h_dosen,pengikat) values "+
							"('"+this.cb_unit.getText()+"','"+this.cb_klp.getText()+"','"+this.app._lokasi+"','"+this.c_prestasi.getText()+"',"+nilaiToFloat(this.e_persen.getText())+","+nilaiToFloat(this.e_kjm.getText())+","+nilaiToFloat(this.e_inval.getText())+","+nilaiToFloat(this.e_hdosen.getText())+","+nilaiToFloat(this.e_ikat.getText())+")");
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
					sql.add("delete from hr_gaji_prestasi where kode_unit='"+this.cb_unit.getText()+"' and kode_klp = '"+this.cb_klp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
					this.doLoad();
				}
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
			if ((sender == this.cb_unit || sender == this.cb_klp || sender == this.c_prestasi) && this.cb_unit.getText() != "" && this.cb_klp.getText() != "" && this.c_prestasi.getText() != ""){	
				var strSQL = "select * from hr_gaji_prestasi where kode_unit='"+this.cb_unit.getText()+"' and kode_klp ='"+this.cb_klp.getText()+"' and prestasi='"+this.c_prestasi.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_persen.setText(floatToNilai(line.p_nilai));						
						this.e_kjm.setText(floatToNilai(line.kjm));						
						this.e_inval.setText(floatToNilai(line.inval));	
						this.e_hdosen.setText(floatToNilai(line.h_dosen));						
						this.e_ikat.setText(floatToNilai(line.pengikat));	
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
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_unit.setText(this.sg1.cells(0,row));	
				this.cb_klp.setText(this.sg1.cells(2,row));		
				this.c_prestasi.setText(this.sg1.cells(4,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.kode_unit,a.nama as nama_unit, b.kode_klp,b.nama as nama_klp,c.prestasi "+
					 "from hr_gaji_prestasi c inner join hr_unit a on a.kode_unit=c.kode_unit and a.kode_lokasi=c.kode_lokasi "+
					 "					      inner join hr_sdmklp b on b.kode_klp=c.kode_klp and b.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_unit,b.kode_klp ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_unit,line.nama_unit,line.kode_klp,line.nama_klp,line.prestasi]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});