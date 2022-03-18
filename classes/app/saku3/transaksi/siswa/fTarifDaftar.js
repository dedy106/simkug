window.app_saku3_transaksi_siswa_fTarifDaftar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fTarifDaftar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fTarifDaftar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Tarif Sekolah/PP", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);	

		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Sekolah/PP", readOnly:true, tag:2});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Tarif","Data Tarif"]});						
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Thn Ajaran","Nama","Tarif"],
					colWidth:[[2,1,0],[100,350,130]],
					colFormat:[[2],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_ta = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Thn Ajaran", multiSelection:false, tag:0,change:[this,"doChange"]});
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Tarif Pendafaran", maxLength:50, tag:1, tipeText:ttNilai, text:"0"});							
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and  kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);

			this.cb_ta.setSQL("select kode_ta, nama from sis_ta where flag_aktif='1' and kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_ta","nama"],false,["Kode","Nama"],"and","Data TA",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fTarifDaftar.extend(window.childForm);
window.app_saku3_transaksi_siswa_fTarifDaftar.implement({
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
					sql.add("insert into sis_tarif_daftar(kode_pp,kode_lokasi,tarif,kode_ta) values "+
						    "	('"+this.cb_pp.getText()+"','"+this.app._lokasi+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.cb_ta.getText()+"')");
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
					sql.add("delete from sis_tarif_daftar where kode_ta='"+this.cb_ta.getText()+"' and kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					sql.add("insert into sis_tarif_daftar(kode_pp,kode_lokasi,tarif,kode_ta) values "+
						    "	('"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.e_tarif.getText()+"','"+this.cb_ta.getText()+"')");
					setTipeButton(tbSimpan);
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
					sql.add("delete from sis_tarif_daftar where kode_ta='"+this.cb_ta.getText()+"' and kode_pp = '"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");			
					setTipeButton(tbSimpan);
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
			if (sender == this.cb_ta && this.cb_ta.getText() != ""){
				var strSQL = "select tarif from sis_tarif_daftar where kode_ta='"+this.cb_ta.getText()+"' and kode_pp ='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_tarif.setText(floatToNilai(line.tarif));																
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
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_ta.setText(this.sg1.cells(0,row));					
							
			}
		} catch(e) {alert(e);}
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
	},

	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"));
			this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.doClick();
		} catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		var strSQL = "select b.kode_ta, b.nama, a.tarif from sis_tarif_daftar a inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp "+
					 "where b.kode_lokasi='"+this.app._lokasi+"' and b.kode_pp='"+this.app._kodePP+"' order by a.kode_ta";		
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
			this.sg1.appendData([line.kode_ta,line.nama,line.tarif]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
