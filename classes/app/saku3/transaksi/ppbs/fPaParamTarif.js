window.app_saku3_transaksi_ppbs_fPaParamTarif = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_fPaParamTarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ppbs_fPaParamTarif";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Parameter Revenue : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_tahun = new saiCB(this,{bound:[20,9,180,20],caption:"Tahun",readOnly:true,tag:2,change:[this,"doChange"]});
		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,18,200,20],caption:"Prodi",tag:2,multiSelection:false,change:[this,"doChange"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,390], childPage:["Daftar Tarif","Data Tarif","Upload Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Angkt.","Kode","Nama","Tahun","Akun","DRK","Tarif"],
					colWidth:[[6,5,4,3,2,1,0],[80,200,200,50,200,80,60]],
					readOnly:true,
					colFormat:[[6],[cfNilai]],		
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});				
		
		this.cb_angkat = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,10,220,20],caption:"Kode Angkt.",tag:2,multiSelection:false,change:[this,"doChange"]});
		this.cb_param = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Kode Param",tag:2,multiSelection:false,change:[this,"doChange"]});
		this.cb_akun = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Kode Akun",tag:2,multiSelection:false});
		this.cb_drk = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,19,220,20],caption:"Kode DRK",tag:2,multiSelection:false});
		this.e_tarif = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Tarif", tag:1, tipeText:ttNilai, text:"0"});	
		
			
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["Angkatan","Kode Param","Tahun","Tarif","Kode Akun","Kode DRK"],
					colWidth:[[5,4,3,2,1,0],[100,100,100,100,100,100]],
					readOnly:true,
					colFormat:[[3],[cfNilai]],												
					pasteEnable:true,autoPaging:true,rowPerPage:200,afterPaste:[this,"doAfterPaste"],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.bUpload = new button(this.sgn,{bound:[900,2,80,18],caption:"Simpan Upload",click:[this,"doUpload"]});
		
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
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}
			
			this.c_tahun.setText("");
			this.cb_akun.setSQL("select kode_akun, nama from masakun where jenis='Pendapatan' and kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);						
			this.cb_angkat.setSQL("select kode_angkat, nama from agg_angkat where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' ",["kode_angkat","nama"],false,["Kode","Nama"],"and","Data Angkatan",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ppbs_fPaParamTarif.extend(window.childForm);
window.app_saku3_transaksi_ppbs_fPaParamTarif.implement({
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();
			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
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
					sql.add("delete from agg_param_tarif where kode_pp='"+this.cb_pp.getText()+"' and kode_param='"+this.cb_param.getText()+"' and kode_angkat='"+this.cb_angkat.getText()+"' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into agg_param_tarif(kode_pp,kode_angkat,kode_param,kode_lokasi,tahun,tarif,kode_drk,kode_akun) values "+
							"('"+this.cb_pp.getText()+"','"+this.cb_angkat.getText()+"','"+this.cb_param.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"',"+nilaiToFloat(this.e_tarif.getText())+",'"+this.cb_drk.getText()+"','"+this.cb_akun.getText()+"')");
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
	doUpload: function(){
		system.confirm(this, "upload", "Apa data sudah benar?","data diform ini apa sudah benar.");
		
	},
	simpan2: function(){			
		try{						
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();
			if (this.sg.getRowValidCount() > 0){
				sql.add("delete from agg_param_tarif where kode_pp='"+this.cb_pp.getText()+"' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i)){
						sql.add("insert into agg_param_tarif(kode_pp,kode_angkat,kode_param,kode_lokasi,tahun,tarif,kode_akun,kode_drk) values "+
							"('"+this.cb_pp.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"',"+nilaiToFloat(this.sg.cells(3,i))+",'"+this.sg.cells(4,i)+"','"+this.sg.cells(5,i)+"')");
					}
				}
			}						
			setTipeButton(tbAllFalse);
			this.dbLib.execArraySQL(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_param);					
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "upload" :	
				this.simpan2();
				break;	
		}
	},
	doChange: function(sender){
		try{			
			if (sender == this.c_tahun && this.c_tahun.getText()!="") {
				this.cb_pp.setSQL("select kode_pp, nama from agg_pp where flag_aktif='1' and tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Prodi",true);
				this.cb_drk.setSQL("select kode_drk, nama from agg_drk where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
			}
			if (sender == this.cb_pp && this.cb_pp.getText()!="") {
				this.cb_param.setSQL("select kode_param, nama from agg_param_klp where tahun='"+this.c_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Kelompok Parameter",true);
			}
			if ((sender == this.cb_angkat || sender == this.cb_param) && this.cb_pp.getText()!="" && this.c_tahun.getText()!="" && this.cb_param.getText()!="" && this.cb_angkat.getText()!="") {				
				var strSQL = "select b.kode_akun,b.kode_drk,b.tarif "+
				             "from agg_param_tarif b "+
				             "where b.tahun='"+this.c_tahun.getText()+"' and b.kode_pp='"+this.cb_pp.getText()+"' and b.kode_angkat='"+this.cb_angkat.getText()+"' and b.kode_param ='"+this.cb_param.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.cb_akun.setText(line.kode_akun);						
						this.cb_drk.setText(line.kode_drk);						
						this.e_tarif.setText(floatToNilai(line.tarif));												
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_param.getText()+")");							
							this.app._mainForm.bClear.click();							
							setTipeButton(tbSimpan);
						}else system.info(this,result,"");
	    			break;
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
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_angkat.setText(this.sg1.cells(0,row));					
				this.cb_param.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		if (this.cb_pp.getText() != "" && this.c_tahun.getText() != "") {
			var strSQL = "select a.kode_angkat,a.kode_param,d.nama,a.tahun,c.kode_akun+' - '+c.nama as akun,b.kode_drk+' - '+b.nama  as drk,a.tarif "+
						 "from agg_param_tarif a inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi "+
						 "					   	 inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+						 
						 "					   	 inner join agg_param_klp d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun "+						 
						 "where a.tahun='"+this.c_tahun.getText()+"' and a.kode_pp='"+this.cb_pp.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_angkat,a.kode_param ";		
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else system.alert(this,"Request tidak valid.","Tahun dan Prodi harus diisi."); 
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_angkat,line.kode_param,line.nama,line.tahun,line.akun,line.drk,floatToNilai(line.tarif)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});